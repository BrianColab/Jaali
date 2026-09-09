import { NextResponse } from "next/server";

import {
  adminSessionCookieName,
  createAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ status: "ok" });
  response.cookies.set(adminSessionCookieName, createAdminSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
