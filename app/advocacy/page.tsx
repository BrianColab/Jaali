import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata("Advocacy", "/advocacy");

export default function AdvocacyPage() {
  return <PlaceholderPage title="Advocacy" />;
}
