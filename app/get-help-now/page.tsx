import { helpPageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";

export const metadata = createPageMetadata(
  "Get Help Now",
  "/get-help-now",
  "If something feels wrong during pregnancy, birth or postpartum care, learn how to use direct language, request reassessment and escalate your concerns.",
);

export default function GetHelpNowPage() {
  return <ContentPage content={helpPageContent} />;
}
