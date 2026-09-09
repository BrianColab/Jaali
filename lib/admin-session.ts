import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookieName = "jaali_admin_session";
const sessionDurationMs = 1000 * 60 * 60 * 12;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminSessionToken(): string {
  const expires = Date.now() + sessionDurationMs;
  const value = `${expires}`;
  return `${value}.${sign(value)}`;
}

export function isValidAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [value, signature] = token.split(".");
  if (!value || !signature) return false;

  const expected = sign(value);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  const expires = Number.parseInt(value, 10);
  return Number.isFinite(expires) && expires > Date.now();
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  if (passwordBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(passwordBuffer, expectedBuffer);
}
