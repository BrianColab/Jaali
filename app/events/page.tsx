import { createPageMetadata } from "@/lib/seo";
import { EventsPage } from "@/sections/events-page";

export const metadata = createPageMetadata(
  "Events",
  "/events",
  "Find upcoming walks, gatherings and ceremonies for the Justice for Jaali movement, including the Late Tony Cote Welcome Back Traditional Pow Wow honouring Jaali Sutherland.",
);

export default function Events() {
  return <EventsPage />;
}
