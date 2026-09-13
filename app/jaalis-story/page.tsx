import { storyPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Jaali’s Story",
  "/jaalis-story",
  "Jaali Weenie-Sutherland was preparing to graduate and become a mother. Her family is calling for a full, independent investigation, answers and accountability.",
);

export default function JaalisStoryPage() {
  return <ContentPage content={storyPageContent} />;
}
