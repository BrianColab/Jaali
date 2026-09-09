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
}

export async function getDb(): Promise<Pool> {
  ensureTablePromise ??= ensureTable();
  await ensureTablePromise;
  return getPool();
}
