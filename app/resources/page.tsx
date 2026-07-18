import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata("Resources", "/resources");

export default function ResourcesPage() {
  return <PlaceholderPage title="Resources" />;
}
