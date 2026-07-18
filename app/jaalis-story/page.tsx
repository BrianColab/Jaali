import { storyPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata("Jaali’s Story", "/jaalis-story");

export default function JaalisStoryPage() {
  return <ContentPage content={storyPageContent} />;
}
