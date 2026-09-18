import type { SiteEvent } from "@/types/events";

/** ISO dates sort lexicographically. Newest date first, so a freshly added event leads. */
export function sortEventsByDateDesc(
  events: readonly SiteEvent[],
): readonly SiteEvent[] {
  return [...events].sort((a, b) => b.date.localeCompare(a.date));
}
