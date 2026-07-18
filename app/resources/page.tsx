import { resourcesPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata("Resources", "/resources");

export default function ResourcesPage() {
  return <ContentPage content={resourcesPageContent} />;
}
