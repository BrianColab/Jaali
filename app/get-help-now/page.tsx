import { helpPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata("Get Help Now", "/get-help-now");

export default function GetHelpNowPage() {
  return <ContentPage content={helpPageContent} />;
}
