import { createPageMetadata } from "@/lib/seo";
import { DonationPage } from "@/sections/donation-page";

export const metadata = createPageMetadata("Donate", "/donate");

export default function DonatePage() {
  return <DonationPage />;
}
