import { advocacyPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata("Advocacy", "/advocacy");

export default function AdvocacyPage() {
  return <ContentPage content={advocacyPageContent} />;
}
