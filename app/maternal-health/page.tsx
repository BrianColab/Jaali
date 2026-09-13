import { maternalHealthPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Maternal Health",
  "/maternal-health",
  "Recognize maternal warning signs during pregnancy and postpartum, including severe pain, bleeding and breathing difficulty, and know when to seek immediate help.",
);

export default function MaternalHealthPage() {
  return <ContentPage content={maternalHealthPageContent} />;
}
