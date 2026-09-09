import { NextResponse } from "next/server";

import { deleteMemory, getMemoryById } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";
import { deleteMemoryImage } from "@/lib/storage";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const memory = await getMemoryById(id);
  if (!memory) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  await deleteMemoryImage(memory.imageKey);
  await deleteMemory(id);
  return NextResponse.json({ status: "declined" });
}
