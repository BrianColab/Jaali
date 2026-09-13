import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactRecipient = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !contactRecipient) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const experience =
    typeof body?.experience === "string" ? body.experience.trim() : "";
  const followUp = body?.followUp === true;

  if (!name || !email || !experience) {
    return NextResponse.json(
      { error: "Name, email and your experience are required." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Justice for Jaali Share Your Experience <contact@j4j.ca>",
    to: contactRecipient,
    replyTo: email,
    subject: "New experience shared",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nWould like follow-up: ${followUp ? "Yes" : "No"}\n\n${experience}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
