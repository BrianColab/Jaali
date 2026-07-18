import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata("Donate", "/donate");

export default function DonatePage() {
  return <PlaceholderPage title="Donate" />;
}
