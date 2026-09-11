import { createPageMetadata } from "@/lib/seo";
import { ContactPage } from "@/sections/contact-page";

export const metadata = createPageMetadata("Contact Us", "/contact");

export default function Contact() {
  return <ContactPage />;
}
