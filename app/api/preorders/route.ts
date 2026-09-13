import { NextResponse } from "next/server";

import { insertPreorder } from "@/lib/preorders";
import { SHIRT_COLORS, SHIRT_SIZES } from "@/types/preorders";

export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const size = typeof body?.size === "string" ? body.size.trim() : "";
  const color = typeof body?.color === "string" ? body.color.trim() : "";
  const quantity =
    typeof body?.quantity === "number"
      ? body.quantity
      : Number.parseInt(String(body?.quantity ?? ""), 10);

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email and phone number are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!SHIRT_SIZES.includes(size as (typeof SHIRT_SIZES)[number])) {
    return NextResponse.json({ error: "Please select a size." }, { status: 400 });
  }

  if (!SHIRT_COLORS.includes(color as (typeof SHIRT_COLORS)[number])) {
    return NextResponse.json({ error: "Please select a color." }, { status: 400 });
  }

  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
    return NextResponse.json(
      { error: "Quantity must be between 1 and 50." },
      { status: 400 },
    );
  }

  await insertPreorder({ name, email, phone, size, color, quantity });

  return NextResponse.json({ ok: true });
}
