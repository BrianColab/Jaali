import { getDb } from "@/lib/db";
import { deleteMemoryImage } from "@/lib/storage";
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
     FROM memories WHERE status = 'approved'
     ORDER BY sort_order ASC NULLS LAST, created_at DESC`,
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
  await db.query(
    `UPDATE memories
     SET status = 'approved',
         sort_order = COALESCE((SELECT MAX(sort_order) FROM memories WHERE status = 'approved'), 0) + 1
     WHERE id = $1`,
    [id],
  );
}

export async function updateMemoryDetails(
  id: string,
  input: { uploaderName: string | null; caption: string | null },
): Promise<void> {
  const db = await getDb();
  await db.query(
    `UPDATE memories SET uploader_name = $1, caption = $2 WHERE id = $3`,
    [input.uploaderName, input.caption, id],
  );
}

export async function deleteMemory(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`DELETE FROM memories WHERE id = $1`, [id]);
}

export async function removeMemoryAndImage(id: string): Promise<boolean> {
  const memory = await getMemoryById(id);
  if (!memory) return false;

  await deleteMemoryImage(memory.imageKey);
  await deleteMemory(id);
  return true;
}

export async function reorderApprovedMemories(
  orderedIds: readonly string[],
): Promise<void> {
  const db = await getDb();
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    for (const [index, id] of orderedIds.entries()) {
      await client.query(
        `UPDATE memories SET sort_order = $1 WHERE id = $2 AND status = 'approved'`,
        [index, id],
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
