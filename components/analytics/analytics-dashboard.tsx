"use client";

import { useState, useTransition } from "react";

import { TextField } from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
import { Card, CardGrid } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { formatDurationSeconds } from "@/lib/format-duration";
import type {
  AnalyticsDateRange,
  AnalyticsRangePreset,
  AnalyticsSnapshot,
  ContentItem,
  RankedItem,
  RecentVisitor,
} from "@/types/analytics";

import { RecentVisitorsTable } from "./recent-visitors-table";
import { TrafficChart } from "./traffic-chart";

type AnalyticsDashboardProps = Readonly<{
  initialError: string | null;
  initialRange: AnalyticsDateRange;
  initialRecentVisitors: readonly RecentVisitor[];
  initialRecentVisitorsError: string | null;
  initialSnapshot: AnalyticsSnapshot | null;
}>;

const RANGE_OPTIONS: ReadonlyArray<{
  label: string;
  value: AnalyticsRangePreset;
}> = [
  { label: "Today", value: "today" },
  { label: "7 Days", value: "7days" },
  { label: "30 Days", value: "30days" },
  { label: "Custom", value: "custom" },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AnalyticsDashboard({
  initialError,
  initialRange,
  initialRecentVisitors,
  initialRecentVisitorsError,
  initialSnapshot,
}: AnalyticsDashboardProps) {
  const [preset, setPreset] = useState<AnalyticsRangePreset>(
    initialRange.preset,
  );
  const [customFrom, setCustomFrom] = useState(initialRange.from ?? todayIso());
  const [customTo, setCustomTo] = useState(initialRange.to ?? todayIso());
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [error, setError] = useState(initialError);
  const [recentVisitors, setRecentVisitors] = useState(initialRecentVisitors);
  const [recentVisitorsError, setRecentVisitorsError] = useState(
    initialRecentVisitorsError,
  );
  const [isPending, startTransition] = useTransition();

  async function loadRange(range: AnalyticsDateRange) {
    const params = new URLSearchParams({ range: range.preset });
    if (range.preset === "custom") {
      params.set("from", range.from ?? "");
      params.set("to", range.to ?? "");
    }

    const response = await fetch(`/api/admin/analytics?${params.toString()}`);
    const body = await response.json().catch(() => null);

    if (!response.ok || !body || body.error) {
      setError(body?.error ?? "Failed to load analytics data.");
      return;
    }

    setSnapshot(body.snapshot);
    setRecentVisitors(body.recentVisitors ?? []);
    setRecentVisitorsError(body.recentVisitorsError ?? null);
    setError(null);
  }

  function handlePresetChange(nextPreset: AnalyticsRangePreset) {
    setPreset(nextPreset);
    if (nextPreset === "custom") return;
    startTransition(() => {
      loadRange({ preset: nextPreset });
    });
  }

  function handleCustomApply() {
    startTransition(() => {
      loadRange({ preset: "custom", from: customFrom, to: customTo });
    });
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-range">
        <div
          className="analytics-range__presets"
          role="group"
          aria-label="Date range"
        >
          {RANGE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={preset === option.value ? "primary" : "secondary"}
              disabled={isPending}
              onClick={() => handlePresetChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {preset === "custom" ? (
          <div className="analytics-range__custom">
            <TextField
              id="analytics-from"
              label="From"
              type="date"
              value={customFrom}
              max={todayIso()}
              onChange={(event) => setCustomFrom(event.target.value)}
            />
            <TextField
              id="analytics-to"
              label="To"
              type="date"
              value={customTo}
              max={todayIso()}
              onChange={(event) => setCustomTo(event.target.value)}
            />
            <Button
              type="button"
              disabled={isPending}
              onClick={handleCustomApply}
            >
              Apply
            </Button>
          </div>
        ) : null}
      </div>

      {isPending ? (
        <Text size="small" muted>
          Loading analytics…
        </Text>
      ) : null}

      {error ? (
        <Text size="small" className="form-error" role="alert">
          Analytics data is unavailable: {error}
        </Text>
      ) : null}

      {snapshot ? (
        <>
          <CardGrid columns={3} className="analytics-overview">
            <Card>
              <Text size="small" muted>
                Visitors
              </Text>
              <Heading level={2} variant="card">
                {snapshot.overview.visitors.toLocaleString()}
              </Heading>
            </Card>
            <Card>
              <Text size="small" muted>
                Unique Visitors
              </Text>
              <Heading level={2} variant="card">
                {snapshot.overview.uniqueVisitors.toLocaleString()}
              </Heading>
            </Card>
            <Card>
              <Text size="small" muted>
                Page Views
              </Text>
              <Heading level={2} variant="card">
                {snapshot.overview.pageViews.toLocaleString()}
              </Heading>
            </Card>
            <Card>
              <Text size="small" muted>
                Average Time on Site
              </Text>
              <Heading level={2} variant="card">
                {formatDurationSeconds(
                  snapshot.overview.averageTimeOnSiteSeconds,
                )}
              </Heading>
            </Card>
            <Card>
              <Text size="small" muted>
                Bounce Rate
              </Text>
              <Heading level={2} variant="card">
                {snapshot.overview.bounceRatePercent.toFixed(1)}%
              </Heading>
            </Card>
          </CardGrid>

          <section className="analytics-section">
            <Heading level={2} variant="card">
              Traffic Over Time
            </Heading>
            <TrafficChart points={snapshot.traffic} />
          </section>

          <div className="analytics-columns">
            <section className="analytics-section">
              <Heading level={2} variant="card">
                Traffic Sources
              </Heading>
              <RankedList
                items={snapshot.trafficSources}
                emptyLabel="No traffic source data."
              />
            </section>

            <section className="analytics-section">
              <Heading level={2} variant="card">
                Referrers
              </Heading>
              <RankedList
                items={snapshot.referrers}
                emptyLabel="No referring sites recorded."
              />
            </section>
          </div>

          <section className="analytics-section">
            <Heading level={2} variant="card">
              Top Content
            </Heading>
            <div className="analytics-columns analytics-columns--three">
              <div>
                <Text size="small" muted>
                  Top Pages
                </Text>
                <ContentList items={snapshot.content.topPages} />
              </div>
              <div>
                <Text size="small" muted>
                  Top Landing Pages
                </Text>
                <ContentList items={snapshot.content.topLandingPages} />
              </div>
              <div>
                <Text size="small" muted>
                  Top Exit Pages
                </Text>
                <ContentList items={snapshot.content.topExitPages} />
              </div>
            </div>
          </section>

          <section className="analytics-section">
            <Heading level={2} variant="card">
              Audience
            </Heading>
            <div className="analytics-columns analytics-columns--three">
              <div>
                <Text size="small" muted>
                  Countries
                </Text>
                <RankedList
                  items={snapshot.audience.countries}
                  emptyLabel="No data."
                  compact
                />
              </div>
              <div>
                <Text size="small" muted>
                  Cities
                </Text>
                <RankedList
                  items={snapshot.audience.cities}
                  emptyLabel="No data."
                  compact
                />
              </div>
              <div>
                <Text size="small" muted>
                  Browsers
                </Text>
                <RankedList
                  items={snapshot.audience.browsers}
                  emptyLabel="No data."
                  compact
                />
              </div>
              <div>
                <Text size="small" muted>
                  Operating Systems
                </Text>
                <RankedList
                  items={snapshot.audience.operatingSystems}
                  emptyLabel="No data."
                  compact
                />
              </div>
              <div>
                <Text size="small" muted>
                  Devices
                </Text>
                <RankedList
                  items={snapshot.audience.devices}
                  emptyLabel="No data."
                  compact
                />
              </div>
            </div>
          </section>

          <section className="analytics-section">
            <Heading level={2} variant="card">
              Recent Activity
            </Heading>
            <RecentVisitorsTable
              visitors={recentVisitors}
              error={recentVisitorsError}
            />
          </section>
        </>
      ) : null}
    </div>
  );
}

function RankedList({
  compact,
  emptyLabel,
  items,
}: Readonly<{
  compact?: boolean;
  emptyLabel: string;
  items: readonly RankedItem[];
}>) {
  if (items.length === 0) {
    return (
      <Text size="small" muted>
        {emptyLabel}
      </Text>
    );
  }

  return (
    <ul
      className={
        compact
          ? "analytics-ranked-list analytics-ranked-list--compact"
          : "analytics-ranked-list"
      }
    >
      {items.slice(0, 8).map((item) => (
        <li key={item.title} className="analytics-ranked-list__item">
          <span className="analytics-ranked-list__title">{item.title}</span>
          <span className="analytics-ranked-list__value">
            {item.visits.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ContentList({ items }: Readonly<{ items: readonly ContentItem[] }>) {
  if (items.length === 0) {
    return (
      <Text size="small" muted>
        No data.
      </Text>
    );
  }

  return (
    <ul className="analytics-ranked-list">
      {items.slice(0, 6).map((item) => (
        <li
          key={item.url || item.title}
          className="analytics-ranked-list__item"
        >
          <span className="analytics-ranked-list__title" title={item.url}>
            {item.title}
          </span>
          <span className="analytics-ranked-list__value">
            {item.visits.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
