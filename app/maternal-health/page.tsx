import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata(
  "Maternal Health",
  "/maternal-health",
);

export default function MaternalHealthPage() {
  return <PlaceholderPage title="Maternal Health" />;
}
