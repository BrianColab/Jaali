import type {
  AnalyticsAudience,
  AnalyticsContent,
  AnalyticsDateRange,
  AnalyticsOverview,
  AnalyticsResult,
  AnalyticsSnapshot,
  ContentItem,
  RankedItem,
  RecentVisitor,
  TrafficPoint,
} from "@/types/analytics";

const CLICKY_API_URL = "https://api.clicky.com/api/stats/4";

const OVERVIEW_TYPES = [
  "visitors",
  "visitors-unique",
  "actions-pageviews",
  "time-average",
  "bounce-rate",
] as const;

const RANKED_TYPES = [
  "traffic-sources",
  "links-domains",
  "pages",
  "pages-entrance",
  "pages-exit",
  "countries",
  "cities",
  "web-browsers",
  "operating-systems",
  "hardware",
] as const;

type ClickyRawItem = Record<string, string | undefined>;
type ClickyRawDateEntry = { date: string; items: ClickyRawItem[] };
type ClickyRawTypeResult = { type: string; dates?: ClickyRawDateEntry[] };

function getSiteId(): string | undefined {
  return process.env.CLICKY_SITE_ID;
}

function getSiteKey(): string | undefined {
  return process.env.CLICKY_SITE_KEY;
}

export function isClickyConfigured(): boolean {
  return Boolean(getSiteId() && getSiteKey());
}

function isValidIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

type ResolvedRange = Readonly<{
  dateParam: string;
  granularity: "hourly" | "daily";
}>;

function resolveDateRange(
  range: AnalyticsDateRange,
): ResolvedRange | { error: string } {
  switch (range.preset) {
    case "today":
      return { dateParam: "today", granularity: "hourly" };
    case "7days":
      return { dateParam: "last-7-days", granularity: "daily" };
    case "30days":
      return { dateParam: "last-30-days", granularity: "daily" };
    case "custom": {
      const { from, to } = range;
      if (!from || !to || !isValidIsoDate(from) || !isValidIsoDate(to)) {
        return { error: "Enter a valid start and end date." };
      }

      const fromDate = new Date(`${from}T00:00:00Z`);
      const toDate = new Date(`${to}T00:00:00Z`);
      const today = new Date(
        `${new Date().toISOString().slice(0, 10)}T00:00:00Z`,
      );

      if (fromDate.getTime() > toDate.getTime()) {
        return { error: "The start date must be before the end date." };
      }
      if (toDate.getTime() > today.getTime()) {
        return { error: "The end date cannot be in the future." };
      }
      const maxRangeMs = 1000 * 60 * 60 * 24 * 366;
      if (toDate.getTime() - fromDate.getTime() > maxRangeMs) {
        return { error: "Custom date ranges cannot exceed 366 days." };
      }

      return { dateParam: `${from},${to}`, granularity: "daily" };
    }
    default:
      return { error: "Unknown date range." };
  }
}

async function fetchClicky(
  params: Record<string, string>,
): Promise<ClickyRawTypeResult[]> {
  const siteId = getSiteId();
  const siteKey = getSiteKey();
  if (!siteId || !siteKey) {
    throw new Error("Clicky analytics is not configured.");
  }

  const url = new URL(CLICKY_API_URL);
  url.searchParams.set("site_id", siteId);
  url.searchParams.set("sitekey", siteKey);
  url.searchParams.set("output", "json");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Clicky API request failed (${response.status}).`);
  }

  const body: unknown = await response.json();
  const list = Array.isArray(body) ? body : [body];
  const errorEntry = list.find(
    (entry): entry is { error: string } =>
      typeof entry === "object" &&
      entry !== null &&
      "error" in entry &&
      typeof (entry as { error: unknown }).error === "string",
  );
  if (errorEntry) {
    throw new Error(errorEntry.error);
  }

  return list as ClickyRawTypeResult[];
}

function itemsFor(
  results: readonly ClickyRawTypeResult[],
  type: string,
): ClickyRawItem[] {
  return results.find((entry) => entry.type === type)?.dates?.[0]?.items ?? [];
}

function numberValue(item: ClickyRawItem | undefined, key = "value"): number {
  const raw = item?.[key];
  const parsed = raw === undefined ? Number.NaN : Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toRankedItems(items: readonly ClickyRawItem[]): RankedItem[] {
  return items
    .map((item) => ({
      title: item.title ?? "Unknown",
      visits: numberValue(item),
      percent: numberValue(item, "value_percent"),
    }))
    .filter((item) => item.visits > 0);
}

function toContentItems(items: readonly ClickyRawItem[]): ContentItem[] {
  return items
    .map((item) => ({
      title: item.title || item.url || "Unknown",
      url: item.url ?? "",
      visits: numberValue(item),
      percent: numberValue(item, "value_percent"),
    }))
    .filter((item) => item.visits > 0);
}

function formatDailyLabel(rawDate: string): string {
  const datePart = rawDate.split(",")[0]?.trim() ?? rawDate;
  const parsed = new Date(datePart.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) return datePart;

  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatHourLabel(hour: number): string {
  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

// Clicky's hourly breakdown nests one item per hour (each carrying its own
// "hour" field, newest first) inside a single dates[] entry for the day —
// unlike daily breakdowns, which give one dates[] entry per day.
function buildHourlySeries(
  visitorDates: readonly ClickyRawDateEntry[],
  pageviewDates: readonly ClickyRawDateEntry[],
): TrafficPoint[] {
  const pageviewsByHour = new Map<string, number>();
  for (const dateEntry of pageviewDates) {
    for (const item of dateEntry.items) {
      if (item.hour !== undefined) {
        pageviewsByHour.set(item.hour, numberValue(item));
      }
    }
  }

  const rows: Array<{ hour: number; visitors: number; pageViews: number }> = [];
  for (const dateEntry of visitorDates) {
    for (const item of dateEntry.items) {
      if (item.hour === undefined) continue;
      rows.push({
        hour: Number(item.hour),
        visitors: numberValue(item),
        pageViews: pageviewsByHour.get(item.hour) ?? 0,
      });
    }
  }

  return rows
    .sort((a, b) => a.hour - b.hour)
    .map((row) => ({
      label: formatHourLabel(row.hour),
      visitors: row.visitors,
      pageViews: row.pageViews,
    }));
}

async function fetchTrafficSeries(
  dateParam: string,
  granularity: "hourly" | "daily",
): Promise<TrafficPoint[]> {
  const params: Record<string, string> = {
    type: "visitors,actions-pageviews",
    date: dateParam,
  };
  params[granularity === "hourly" ? "hourly" : "daily"] = "1";

  const results = await fetchClicky(params);
  const visitorDates =
    results.find((entry) => entry.type === "visitors")?.dates ?? [];
  const pageviewDates =
    results.find((entry) => entry.type === "actions-pageviews")?.dates ?? [];

  if (granularity === "hourly") {
    return buildHourlySeries(visitorDates, pageviewDates);
  }

  return buildDailySeries(visitorDates, pageviewDates);
}

// Clicky returns daily dates[] entries newest-first; a time series chart
// needs them oldest-first (left to right), so sort by date before mapping.
function buildDailySeries(
  visitorDates: readonly ClickyRawDateEntry[],
  pageviewDates: readonly ClickyRawDateEntry[],
): TrafficPoint[] {
  const pageviewsByDate = new Map<string, number>();
  for (const entry of pageviewDates) {
    pageviewsByDate.set(entry.date, numberValue(entry.items[0]));
  }

  return [...visitorDates]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({
      label: formatDailyLabel(entry.date),
      visitors: numberValue(entry.items[0]),
      pageViews: pageviewsByDate.get(entry.date) ?? 0,
    }));
}

function formatTrafficSource(raw: string | undefined): string {
  if (!raw) return "Unknown";
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export async function getAnalyticsSnapshot(
  range: AnalyticsDateRange,
): Promise<AnalyticsResult<AnalyticsSnapshot>> {
  if (!isClickyConfigured()) {
    return {
      ok: false,
      error:
        "Clicky analytics is not configured. Set CLICKY_SITE_ID and CLICKY_SITE_KEY.",
    };
  }

  const resolved = resolveDateRange(range);
  if ("error" in resolved) {
    return { ok: false, error: resolved.error };
  }

  try {
    const [summaryResults, traffic] = await Promise.all([
      fetchClicky({
        type: [...OVERVIEW_TYPES, ...RANKED_TYPES].join(","),
        date: resolved.dateParam,
        limit: "10",
      }),
      fetchTrafficSeries(resolved.dateParam, resolved.granularity),
    ]);

    const overview: AnalyticsOverview = {
      visitors: numberValue(itemsFor(summaryResults, "visitors")[0]),
      uniqueVisitors: numberValue(
        itemsFor(summaryResults, "visitors-unique")[0],
      ),
      pageViews: numberValue(itemsFor(summaryResults, "actions-pageviews")[0]),
      averageTimeOnSiteSeconds: numberValue(
        itemsFor(summaryResults, "time-average")[0],
      ),
      bounceRatePercent: numberValue(
        itemsFor(summaryResults, "bounce-rate")[0],
      ),
    };

    const content: AnalyticsContent = {
      topPages: toContentItems(itemsFor(summaryResults, "pages")),
      topLandingPages: toContentItems(
        itemsFor(summaryResults, "pages-entrance"),
      ),
      topExitPages: toContentItems(itemsFor(summaryResults, "pages-exit")),
    };

    const audience: AnalyticsAudience = {
      countries: toRankedItems(itemsFor(summaryResults, "countries")),
      cities: toRankedItems(itemsFor(summaryResults, "cities")),
      browsers: toRankedItems(itemsFor(summaryResults, "web-browsers")),
      operatingSystems: toRankedItems(
        itemsFor(summaryResults, "operating-systems"),
      ),
      devices: toRankedItems(itemsFor(summaryResults, "hardware")),
    };

    return {
      ok: true,
      data: {
        range,
        overview,
        traffic,
        trafficSources: toRankedItems(
          itemsFor(summaryResults, "traffic-sources"),
        ),
        referrers: toRankedItems(itemsFor(summaryResults, "links-domains")),
        content,
        audience,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to load analytics data.",
    };
  }
}

export async function getRecentVisitors(
  range: AnalyticsDateRange,
  limit = 20,
): Promise<AnalyticsResult<RecentVisitor[]>> {
  if (!isClickyConfigured()) {
    return {
      ok: false,
      error:
        "Clicky analytics is not configured. Set CLICKY_SITE_ID and CLICKY_SITE_KEY.",
    };
  }

  const resolved = resolveDateRange(range);
  if ("error" in resolved) {
    return { ok: false, error: resolved.error };
  }

  try {
    const results = await fetchClicky({
      type: "visitors-list",
      date: resolved.dateParam,
      limit: String(limit),
      "visitor-details":
        "time_pretty,actions,time_total,landing_page,geolocation,web_browser,operating_system,referrer_type,country_code",
    });

    const visitors: RecentVisitor[] = itemsFor(results, "visitors-list").map(
      (item) => ({
        time: item.time_pretty ?? item.time ?? "",
        location: item.geolocation ?? null,
        countryCode: item.country_code ?? null,
        trafficSource: formatTrafficSource(item.referrer_type),
        landingPage: item.landing_page ?? null,
        pagesViewed: numberValue(item, "actions"),
        timeOnSiteSeconds: numberValue(item, "time_total"),
        browser: item.web_browser ?? null,
        operatingSystem: item.operating_system ?? null,
      }),
    );

    return { ok: true, data: visitors };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to load recent visitors.",
    };
  }
}
