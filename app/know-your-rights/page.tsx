import { rightsPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Know Your Rights",
  "/know-your-rights",
);

export default function KnowYourRightsPage() {
  return <ContentPage content={rightsPageContent} />;
}
