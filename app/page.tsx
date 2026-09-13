import { createPageMetadata } from "@/lib/seo";
import { Homepage } from "@/sections/homepage";

export const metadata = createPageMetadata(
  "Justice for Jaali",
  "/",
  "In memory of Jaali Weenie-Sutherland, this site calls for accountability, safe and equitable maternal health care, and an Indigenous-led patient-safety network.",
);

export default function HomePage() {
  return <Homepage />;
}
