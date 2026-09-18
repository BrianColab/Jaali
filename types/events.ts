export type EventDetail = Readonly<{
  label: string;
  value: string;
}>;

export type SiteEvent = Readonly<{
  actionLabel?: string;
  address?: string;
  calendarFile?: string;
  /** ISO `YYYY-MM-DD`. Sorting key. */
  date: string;
  dateDisplay: string;
  details?: readonly EventDetail[];
  highlight?: string;
  id: string;
  image: string;
  imageAlt: string;
  location: string;
  summary: string;
  title: string;
  status?: "upcoming" | "past";
  url?: string;
}>;
