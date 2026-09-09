import { NextResponse } from "next/server";

import { getPendingMemories } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const memories = await getPendingMemories();
  return NextResponse.json({ memories });
}
