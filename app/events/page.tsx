import { createPageMetadata } from "@/lib/seo";
import { EventsPage } from "@/sections/events-page";

export const metadata = createPageMetadata(
  "Community Events",
  "/events",
  "Walks, gatherings and ceremonies where Jaali is remembered and the call for justice continues. See past events and check back for future dates.",
);

export default function Events() {
  return <EventsPage />;
}
