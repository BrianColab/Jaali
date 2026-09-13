import { createPageMetadata } from "@/lib/seo";
import { ContactPage } from "@/sections/contact-page";

export const metadata = createPageMetadata(
  "Contact Us",
  "/contact",
  "Get in touch with Justice for Jaali to share information, ask questions, or connect with the movement for Indigenous maternal-health justice.",
);

export default function Contact() {
  return <ContactPage />;
}
