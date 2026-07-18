import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata(
  "Share Your Experience",
  "/share-your-experience",
);

export default function ShareYourExperiencePage() {
  return <PlaceholderPage title="Share Your Experience" />;
}
