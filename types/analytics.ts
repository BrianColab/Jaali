export type AnalyticsRangePreset = "today" | "7days" | "30days" | "custom";

export type AnalyticsDateRange = Readonly<{
  preset: AnalyticsRangePreset;
  /** ISO date (YYYY-MM-DD), required when preset is "custom" */
  from?: string;
  /** ISO date (YYYY-MM-DD), required when preset is "custom" */
  to?: string;
}>;

export type AnalyticsOverview = Readonly<{
  visitors: number;
  uniqueVisitors: number;
  pageViews: number;
  averageTimeOnSiteSeconds: number;
  bounceRatePercent: number;
}>;

export type TrafficPoint = Readonly<{
  label: string;
  visitors: number;
  pageViews: number;
}>;

export type RankedItem = Readonly<{
  title: string;
  visits: number;
  percent: number;
}>;

export type ContentItem = Readonly<{
  title: string;
  url: string;
  visits: number;
  percent: number;
}>;

export type RecentVisitor = Readonly<{
  time: string;
  location: string | null;
  countryCode: string | null;
  trafficSource: string;
  landingPage: string | null;
  pagesViewed: number;
  timeOnSiteSeconds: number;
  browser: string | null;
  operatingSystem: string | null;
}>;

export type AnalyticsAudience = Readonly<{
  countries: readonly RankedItem[];
  cities: readonly RankedItem[];
  browsers: readonly RankedItem[];
  operatingSystems: readonly RankedItem[];
  devices: readonly RankedItem[];
}>;

export type AnalyticsContent = Readonly<{
  topPages: readonly ContentItem[];
  topLandingPages: readonly ContentItem[];
  topExitPages: readonly ContentItem[];
}>;

export type AnalyticsSnapshot = Readonly<{
  range: AnalyticsDateRange;
  overview: AnalyticsOverview;
  traffic: readonly TrafficPoint[];
  trafficSources: readonly RankedItem[];
  referrers: readonly RankedItem[];
  content: AnalyticsContent;
  audience: AnalyticsAudience;
}>;

export type AnalyticsResult<T> =
  { ok: true; data: T } | { ok: false; error: string };
