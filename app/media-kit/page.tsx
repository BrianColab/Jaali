import { createPageMetadata } from "@/lib/seo";
import { MediaKitPage } from "@/sections/media-kit-page";

export const metadata = createPageMetadata(
  "Media Kit",
  "/media-kit",
  "Download the official Justice for JAALI logo, campaign image, and QR code for press coverage and partner materials.",
);

export default function MediaKit() {
  return <MediaKitPage />;
}
