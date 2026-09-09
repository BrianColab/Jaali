import { Pool } from "pg";

let pool: Pool | undefined;
let ensureTablePromise: Promise<void> | undefined;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("railway.internal")
        ? undefined
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function ensureTable(): Promise<void> {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS memories (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      image_key text NOT NULL,
      uploader_name text,
      caption text,
      status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  await getPool().query(
    `ALTER TABLE memories ADD COLUMN IF NOT EXISTS sort_order integer;`,
  );
  await getPool().query(`
    UPDATE memories AS m
    SET sort_order = backfill.rn
    FROM (
      SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) AS rn
      FROM memories
      WHERE status = 'approved' AND sort_order IS NULL
    ) AS backfill
    WHERE m.id = backfill.id;
  `);
}

export async function getDb(): Promise<Pool> {
  ensureTablePromise ??= ensureTable();
  await ensureTablePromise;
  return getPool();
}
