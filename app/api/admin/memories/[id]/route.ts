import { NextResponse } from "next/server";

import { getMemoryById, updateMemoryDetails } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";

const maxNameLength = 120;
const maxCaptionLength = 500;

export async function PATCH(
  request: Request,
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

  const body = (await request.json().catch(() => null)) as {
    uploaderName?: unknown;
    caption?: unknown;
  } | null;

  if (
    !body ||
    (body.uploaderName !== undefined &&
      typeof body.uploaderName !== "string") ||
    (body.caption !== undefined && typeof body.caption !== "string")
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const uploaderName =
    typeof body.uploaderName === "string" && body.uploaderName.trim()
      ? body.uploaderName.trim().slice(0, maxNameLength)
      : null;
  const caption =
    typeof body.caption === "string" && body.caption.trim()
      ? body.caption.trim().slice(0, maxCaptionLength)
      : null;

  await updateMemoryDetails(id, { uploaderName, caption });
  return NextResponse.json({ status: "updated" });
}
