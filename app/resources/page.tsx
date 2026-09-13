import { resourcesPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Resources",
  "/resources",
  "Find Indigenous patient navigators, maternal-health supports, legal referrals and complaint processes for Indigenous patients and families across Canada.",
);

export default function ResourcesPage() {
  return <ContentPage content={resourcesPageContent} />;
}
