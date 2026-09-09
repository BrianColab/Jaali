import { NextResponse } from "next/server";

import { adminSessionCookieName } from "@/lib/admin-session";

export async function POST() {
  const response = NextResponse.json({ status: "ok" });
  response.cookies.delete(adminSessionCookieName);
  return response;
}
