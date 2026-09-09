import { NextResponse } from "next/server";

import { removeMemoryAndImage } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const removed = await removeMemoryAndImage(id);
  if (!removed) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ status: "deleted" });
}
