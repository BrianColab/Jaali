import { NextResponse } from "next/server";

import { reorderApprovedMemories } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    ids?: unknown;
  } | null;

  if (
    !body ||
    !Array.isArray(body.ids) ||
    body.ids.some((id) => typeof id !== "string")
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  await reorderApprovedMemories(body.ids as string[]);
  return NextResponse.json({ status: "reordered" });
}
