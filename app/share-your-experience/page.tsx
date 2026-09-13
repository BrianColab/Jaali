import { shareExperiencePageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";
import { ShareExperienceFormSection } from "@/sections/share-experience-form-section";

export const metadata = createPageMetadata(
  "Share Your Experience",
  "/share-your-experience",
);

export default function ShareYourExperiencePage() {
  return (
    <>
      <ContentPage content={shareExperiencePageContent} />
      <ShareExperienceFormSection />
    </>
  );
}
