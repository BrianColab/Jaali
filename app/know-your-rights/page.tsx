import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata(
  "Know Your Rights",
  "/know-your-rights",
);

export default function KnowYourRightsPage() {
  return <PlaceholderPage title="Know Your Rights" />;
}
