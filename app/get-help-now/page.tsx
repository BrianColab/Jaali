import { createPageMetadata } from "@/lib/seo";
import { PlaceholderPage } from "@/sections/placeholder-page";

export const metadata = createPageMetadata("Get Help Now", "/get-help-now");

export default function GetHelpNowPage() {
  return <PlaceholderPage title="Get Help Now" />;
}
