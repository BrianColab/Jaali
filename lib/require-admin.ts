import { cookies } from "next/headers";

import {
  adminSessionCookieName,
  isValidAdminSessionToken,
} from "@/lib/admin-session";

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidAdminSessionToken(
    cookieStore.get(adminSessionCookieName)?.value,
  );
}
