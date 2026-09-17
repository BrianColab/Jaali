export type MediaType =
  "News" | "Video & Audio" | "Official Actions" | "Community";

export type MediaFilter = "All" | MediaType;

export type MediaSortOrder = "oldest" | "newest";

export type MediaItem = Readonly<{
  actionLabel?: string;
  author: string | null;
  /** ISO `YYYY-MM-DD`. Sorting key, and the fallback for the displayed date. */
  date: string;
  /** Overrides the formatted `date` when the record covers a range. */
  dateDisplay?: string;
  featured: boolean;
  headline: string;
  id: string;
  majorMilestone?: boolean;
  /** Editorial provenance for maintainers. Never rendered. */
  notes?: string;
  /** Keeps a high-priority item ahead of chronological sorting. */
  pinned?: boolean;
  publish: boolean;
  secondaryLabel?: string;
  secondaryUrl?: string;
  source: string;
  summary: string;
  type: MediaType;
  url: string | null;
  /** Evidence the story exists while its canonical URL is unconfirmed. Never rendered. */
  verificationUrl?: string;
}>;
