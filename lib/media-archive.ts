import type {
  MediaFilter,
  MediaItem,
  MediaSortOrder,
  MediaType,
} from "@/types/media";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const primaryActionLabels: Record<MediaType, string> = {
  News: "Read story",
  "Video & Audio": "Watch or listen",
  "Official Actions": "View source",
  Community: "View event",
};

/**
 * Only records cleared for publication.
 *
 * Maintainer-only fields are dropped here: the archive is a client component, so
 * whatever reaches it is serialized into the page source, and editorial notes
 * are not for readers.
 */
export function selectPublished(
  items: readonly MediaItem[],
): readonly MediaItem[] {
  return items
    .filter((item) => item.publish)
    .map((item) => {
      const readerFields = { ...item };
      delete readerFields.notes;
      delete readerFields.verificationUrl;
      return readerFields;
    });
}

/**
 * Formatted from the ISO parts rather than `Date`, so the rendered day is
 * identical on the server and in every reader's time zone.
 */
export function formatMediaDate(item: MediaItem): string {
  if (item.dateDisplay) return item.dateDisplay;

  const [year, month, day] = item.date.split("-");
  const monthName = monthNames[Number(month) - 1];
  if (!year || !day || !monthName) return item.date;

  return `${monthName} ${Number(day)}, ${year}`;
}

export function primaryActionLabel(type: MediaType): string {
  return primaryActionLabels[type];
}

export function searchMediaItems(
  items: readonly MediaItem[],
  query: string,
): readonly MediaItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return items;

  return items.filter((item) =>
    [item.headline, item.source, item.summary, item.author].some((field) =>
      field?.toLowerCase().includes(needle),
    ),
  );
}

export function filterMediaItems(
  items: readonly MediaItem[],
  filter: MediaFilter,
): readonly MediaItem[] {
  if (filter === "All") return items;
  return items.filter((item) => item.type === filter);
}

/** ISO dates sort lexicographically, and a stable sort keeps same-day records in inventory order. */
export function sortMediaItems(
  items: readonly MediaItem[],
  order: MediaSortOrder,
): readonly MediaItem[] {
  return [...items].sort((a, b) =>
    order === "oldest"
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date),
  );
}
