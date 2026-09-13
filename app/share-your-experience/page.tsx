import { shareExperiencePageContent } from "@/data/pages";
import { createPageMetadata } from "@/lib/seo";
import { ContentPage } from "@/sections/content-page";
import { ShareExperienceFormSection } from "@/sections/share-experience-form-section";

export const metadata = createPageMetadata(
  "Share Your Experience",
  "/share-your-experience",
  "If you or someone you love experienced racism, discrimination, neglect or unsafe care during pregnancy, childbirth or postpartum, share your experience here.",
);

export default function ShareYourExperiencePage() {
  return (
    <>
      <ContentPage content={shareExperiencePageContent} />
      <ShareExperienceFormSection />
    </>
  );
}
