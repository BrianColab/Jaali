import { siteConfig } from "@/lib/site-config";
import type { SiteEvent } from "@/types/events";

/** ISO dates sort lexicographically. Newest date first, so a freshly added event leads. */
export function sortEventsByDateDesc(
  events: readonly SiteEvent[],
): readonly SiteEvent[] {
  return [...events].sort((a, b) => b.date.localeCompare(a.date));
}

const monthAbbreviations = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * Formatted from the ISO parts rather than `Date`, so the rendered day is
 * identical on the server and in every reader's time zone.
 */
export function formatEventDateTile(date: string): {
  month: string;
  day: string;
} {
  const [, month, day] = date.split("-");
  const monthAbbr = monthAbbreviations[Number(month) - 1] ?? "";

  return { month: monthAbbr, day: day ? String(Number(day)) : "" };
}

/** schema.org Event markup so search engines can surface these as event rich results. */
export function buildEventJsonLd(event: SiteEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    eventStatus:
      event.status === "past"
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.address ?? event.location,
    },
    description: event.summary,
    image: [new URL(event.image, siteConfig.url).toString()],
    url: new URL("/events", siteConfig.url).toString(),
  };
}
