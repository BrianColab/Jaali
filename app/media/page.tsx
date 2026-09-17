import { createPageMetadata } from "@/lib/seo";
import { MediaPage } from "@/sections/media-page";

export const metadata = createPageMetadata(
  "Media & Milestones",
  "/media",
  "Explore news coverage, community events and major milestones in the Justice for Jaali movement, from the first public calls for answers to national action.",
);

export default function Media() {
  return <MediaPage />;
}
