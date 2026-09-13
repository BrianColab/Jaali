import { getDb } from "@/lib/db";
import type { PreorderRecord } from "@/types/preorders";

type PreorderRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  size: string;
  color: string;
  quantity: number;
  created_at: Date;
};

function toRecord(row: PreorderRow): PreorderRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    size: row.size,
    color: row.color,
    quantity: row.quantity,
    createdAt: row.created_at.toISOString(),
  };
}

export async function insertPreorder(input: {
  name: string;
  email: string;
  phone: string;
  size: string;
  color: string;
  quantity: number;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO shirt_preorders (name, email, phone, size, color, quantity)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      input.name,
      input.email,
      input.phone,
      input.size,
      input.color,
      input.quantity,
    ],
  );
}

export async function getAllPreorders(): Promise<PreorderRecord[]> {
  const db = await getDb();
  const result = await db.query<PreorderRow>(
    `SELECT id, name, email, phone, size, color, quantity, created_at
     FROM shirt_preorders ORDER BY created_at DESC`,
  );
  return result.rows.map(toRecord);
}

export async function deletePreorder(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`DELETE FROM shirt_preorders WHERE id = $1`, [id]);
}
