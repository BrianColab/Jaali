import { maternalHealthPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Maternal Health",
  "/maternal-health",
);

export default function MaternalHealthPage() {
  return <ContentPage content={maternalHealthPageContent} />;
}
