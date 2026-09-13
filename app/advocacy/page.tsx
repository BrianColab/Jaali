import { advocacyPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Advocacy",
  "/advocacy",
  "See what Justice for Jaali is calling for: safe and equitable care, Indigenous patient advocates, independent review of maternal deaths, and accountability in health care.",
);

export default function AdvocacyPage() {
  return <ContentPage content={advocacyPageContent} />;
}
