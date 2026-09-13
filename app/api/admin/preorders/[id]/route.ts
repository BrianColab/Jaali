import { NextResponse } from "next/server";

import { deletePreorder } from "@/lib/preorders";
import { hasAdminSession } from "@/lib/require-admin";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  await deletePreorder(id);
  return NextResponse.json({ status: "deleted" });
}
