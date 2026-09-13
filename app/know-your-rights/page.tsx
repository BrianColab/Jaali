import { rightsPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Know Your Rights",
  "/know-your-rights",
  "Learn how to ask for immediate reassessment, keep a record and use direct language to advocate for yourself or a loved one during pregnancy and childbirth care.",
);

export default function KnowYourRightsPage() {
  return <ContentPage content={rightsPageContent} />;
}
