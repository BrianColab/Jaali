import { getDb } from "@/lib/db";
import type { MemoryRecord } from "@/types/memories";

type MemoryRow = {
  id: string;
  image_key: string;
  uploader_name: string | null;
  caption: string | null;
  status: "pending" | "approved" | "declined";
  created_at: Date;
};

function toRecord(row: MemoryRow): MemoryRecord {
  return {
    id: row.id,
    imageKey: row.image_key,
    uploaderName: row.uploader_name,
    caption: row.caption,
    status: row.status,
    createdAt: row.created_at.toISOString(),
  };
}

export async function getApprovedMemories(): Promise<MemoryRecord[]> {
  const db = await getDb();
  const result = await db.query<MemoryRow>(
    `SELECT id, image_key, uploader_name, caption, status, created_at
     FROM memories WHERE status = 'approved' ORDER BY created_at DESC`,
  );
  return result.rows.map(toRecord);
}

export async function getPendingMemories(): Promise<MemoryRecord[]> {
  const db = await getDb();
  const result = await db.query<MemoryRow>(
    `SELECT id, image_key, uploader_name, caption, status, created_at
     FROM memories WHERE status = 'pending' ORDER BY created_at ASC`,
  );
  return result.rows.map(toRecord);
}

export async function insertPendingMemory(input: {
  imageKey: string;
  uploaderName: string | null;
  caption: string | null;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO memories (image_key, uploader_name, caption) VALUES ($1, $2, $3)`,
    [input.imageKey, input.uploaderName, input.caption],
  );
}

export async function getMemoryById(id: string): Promise<MemoryRecord | null> {
  const db = await getDb();
  const result = await db.query<MemoryRow>(
    `SELECT id, image_key, uploader_name, caption, status, created_at
     FROM memories WHERE id = $1`,
    [id],
  );
  const row = result.rows[0];
  return row ? toRecord(row) : null;
}

export async function approveMemory(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`UPDATE memories SET status = 'approved' WHERE id = $1`, [id]);
}

export async function deleteMemory(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`DELETE FROM memories WHERE id = $1`, [id]);
}
