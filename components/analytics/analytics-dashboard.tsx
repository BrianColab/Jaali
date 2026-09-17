"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState, useTransition } from "react";
import {
  BarChart3,
  Clock3,
  Download,
  Eye,
  MousePointerClick,
  UserCheck,
  Users,
} from "lucide-react";

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

import { CountryFlag, countryCodeFromTitle } from "./country-flag";
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

function rangeLabel(range: AnalyticsDateRange): string {
  if (range.preset === "today") return "Today";
  if (range.preset === "7days") return "Last 7 days";
  if (range.preset === "30days") return "Last 30 days";
  return `${range.from ?? "Custom start"} to ${range.to ?? "Custom end"}`;
}

async function loadLogoDataUrl(): Promise<string> {
  const response = await fetch("/assets/images/brand/jaali-logo.png");
  if (!response.ok) throw new Error("The report logo could not be loaded.");
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () =>
      reject(new Error("The report logo could not be read."));
    reader.readAsDataURL(blob);
  });
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
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string>();
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

  async function handleExportPdf() {
    if (!snapshot || isExporting) return;

    setIsExporting(true);
    setExportError(undefined);

    try {
      const [[{ default: jsPDF }, autoTable], logoDataUrl] = await Promise.all([
        Promise.all([import("jspdf"), import("jspdf-autotable")]),
        loadLogoDataUrl(),
      ]);
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const reportDate = new Date();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const tableDoc = doc as typeof doc & {
        lastAutoTable?: { finalY: number };
      };
      let nextY = 42;

      doc.addImage(logoDataUrl, "PNG", 14, 10, 22, 22);
      doc.setTextColor(16, 24, 40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Website Analytics", 42, 17);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(102, 112, 133);
      doc.text(rangeLabel(snapshot.range), 42, 23);
      doc.text(`Generated ${reportDate.toLocaleString("en-CA")}`, 42, 28);
      doc.setDrawColor(228, 231, 236);
      doc.line(14, 35, pageWidth - 14, 35);

      const addSection = (
        title: string,
        head: string[][],
        body: Array<Array<string | number>>,
      ) => {
        if (nextY > pageHeight - 32) {
          doc.addPage();
          nextY = 18;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(16, 24, 40);
        doc.text(title, 14, nextY);
        autoTable.default(doc, {
          startY: nextY + 4,
          head,
          body,
          margin: { left: 14, right: 14 },
          styles: {
            font: "helvetica",
            fontSize: 8,
            cellPadding: 2.2,
            lineColor: [218, 223, 231],
            lineWidth: 0.15,
            textColor: [52, 64, 84],
          },
          headStyles: {
            fillColor: [23, 43, 77],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          alternateRowStyles: { fillColor: [247, 249, 252] },
        });
        nextY = (tableDoc.lastAutoTable?.finalY ?? nextY + 12) + 9;
      };

      const pagesPerVisit =
        snapshot.overview.visitors > 0
          ? snapshot.overview.pageViews / snapshot.overview.visitors
          : 0;

      addSection(
        "Performance summary",
        [["Metric", "Value", "Metric", "Value", "Metric", "Value"]],
        [
          [
            "Visitors",
            snapshot.overview.visitors.toLocaleString(),
            "Unique visitors",
            snapshot.overview.uniqueVisitors.toLocaleString(),
            "Page views",
            snapshot.overview.pageViews.toLocaleString(),
          ],
          [
            "Average time",
            formatDurationSeconds(snapshot.overview.averageTimeOnSiteSeconds),
            "Bounce rate",
            `${snapshot.overview.bounceRatePercent.toFixed(1)}%`,
            "Pages / visit",
            pagesPerVisit.toFixed(1),
          ],
        ],
      );

      addSection(
        "Traffic over time",
        [["Period", "Visitors", "Page views"]],
        snapshot.traffic.map((point) => [
          point.label,
          point.visitors,
          point.pageViews,
        ]),
      );

      addSection(
        "Acquisition",
        [["Type", "Source", "Visits", "Share"]],
        [
          ...snapshot.trafficSources
            .slice(0, 10)
            .map((item) => [
              "Traffic source",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.referrers
            .slice(0, 10)
            .map((item) => [
              "Referrer",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
        ],
      );

      addSection(
        "Top content",
        [["Type", "Page", "Visits", "Share"]],
        [
          ...snapshot.content.topPages
            .slice(0, 5)
            .map((item) => [
              "Top page",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.content.topLandingPages
            .slice(0, 5)
            .map((item) => [
              "Landing page",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.content.topExitPages
            .slice(0, 5)
            .map((item) => [
              "Exit page",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
        ],
      );

      addSection(
        "Audience",
        [["Category", "Detail", "Visits", "Share"]],
        [
          ...snapshot.audience.countries
            .slice(0, 5)
            .map((item) => [
              "Country",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.audience.cities
            .slice(0, 5)
            .map((item) => [
              "City",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.audience.browsers
            .slice(0, 5)
            .map((item) => [
              "Browser",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.audience.operatingSystems
            .slice(0, 5)
            .map((item) => [
              "Operating system",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
          ...snapshot.audience.devices
            .slice(0, 5)
            .map((item) => [
              "Device",
              item.title,
              item.visits,
              `${item.percent.toFixed(1)}%`,
            ]),
        ],
      );

      if (recentVisitors.length > 0) {
        addSection(
          "Recent activity",
          [
            [
              "Time",
              "Location",
              "Source",
              "Landing page",
              "Pages",
              "Time on site",
            ],
          ],
          recentVisitors.map((visitor) => [
            visitor.time,
            visitor.location ?? "-",
            visitor.trafficSource,
            visitor.landingPage ?? "-",
            visitor.pagesViewed,
            formatDurationSeconds(visitor.timeOnSiteSeconds),
          ]),
        );
      }

      const filenameRange =
        snapshot.range.preset === "custom" ? "custom" : snapshot.range.preset;
      doc.save(
        `j4j-analytics-${filenameRange}-${reportDate.toISOString().slice(0, 10)}.pdf`,
      );
    } catch (pdfError) {
      setExportError(
        pdfError instanceof Error
          ? pdfError.message
          : "The PDF could not be created.",
      );
    } finally {
      setIsExporting(false);
    }
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
        <Button
          type="button"
          variant="secondary"
          className="analytics-range__export"
          disabled={!snapshot || isExporting || isPending}
          onClick={handleExportPdf}
        >
          <Download aria-hidden="true" />
          {isExporting ? "Preparing PDF..." : "Download PDF"}
        </Button>
      </div>

      {exportError ? (
        <Text size="small" className="form-error" role="alert">
          {exportError}
        </Text>
      ) : null}

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
            <MetricCard
              icon={<Users aria-hidden="true" />}
              label="Visitors"
              value={snapshot.overview.visitors.toLocaleString()}
            />
            <MetricCard
              icon={<UserCheck aria-hidden="true" />}
              label="Unique visitors"
              value={snapshot.overview.uniqueVisitors.toLocaleString()}
            />
            <MetricCard
              icon={<Eye aria-hidden="true" />}
              label="Page views"
              value={snapshot.overview.pageViews.toLocaleString()}
            />
            <MetricCard
              icon={<Clock3 aria-hidden="true" />}
              label="Average time"
              value={formatDurationSeconds(
                snapshot.overview.averageTimeOnSiteSeconds,
              )}
            />
            <MetricCard
              icon={<MousePointerClick aria-hidden="true" />}
              label="Bounce rate"
              value={`${snapshot.overview.bounceRatePercent.toFixed(1)}%`}
            />
            <MetricCard
              icon={<BarChart3 aria-hidden="true" />}
              label="Pages / visit"
              value={
                snapshot.overview.visitors > 0
                  ? (
                      snapshot.overview.pageViews / snapshot.overview.visitors
                    ).toFixed(1)
                  : "0.0"
              }
            />
          </CardGrid>

          <section className="analytics-section">
            <SectionHeading
              title="Traffic over time"
              description="Visitors and page views for the selected period"
            />
            <TrafficChart points={snapshot.traffic} />
          </section>

          <div className="analytics-columns">
            <section className="analytics-section">
              <SectionHeading
                title="Traffic sources"
                description="How people found the website"
              />
              <SourceDistribution items={snapshot.trafficSources} />
            </section>

            <section className="analytics-section">
              <SectionHeading
                title="Referrers"
                description="Sites sending the most visits"
              />
              <RankedList
                items={snapshot.referrers}
                emptyLabel="No referring sites recorded."
                showBars
              />
            </section>
          </div>

          <section className="analytics-section">
            <SectionHeading
              title="Top content"
              description="The pages people enter, view and leave from"
            />
            <div className="analytics-columns analytics-columns--three">
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Top Pages
                </Text>
                <ContentList items={snapshot.content.topPages} />
              </div>
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Top Landing Pages
                </Text>
                <ContentList items={snapshot.content.topLandingPages} />
              </div>
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Top Exit Pages
                </Text>
                <ContentList items={snapshot.content.topExitPages} />
              </div>
            </div>
          </section>

          <section className="analytics-section">
            <SectionHeading
              title="Audience"
              description="Where visitors are and how they browse"
            />
            <div className="analytics-columns analytics-columns--three">
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Countries
                </Text>
                <RankedList
                  items={snapshot.audience.countries}
                  emptyLabel="No data."
                  compact
                  showFlags
                />
              </div>
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Cities
                </Text>
                <RankedList
                  items={snapshot.audience.cities}
                  emptyLabel="No data."
                  compact
                  showFlags
                />
              </div>
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Browsers
                </Text>
                <RankedList
                  items={snapshot.audience.browsers}
                  emptyLabel="No data."
                  compact
                />
              </div>
              <div className="analytics-subsection">
                <Text size="small" muted>
                  Operating Systems
                </Text>
                <RankedList
                  items={snapshot.audience.operatingSystems}
                  emptyLabel="No data."
                  compact
                />
              </div>
              <div className="analytics-subsection">
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
            <SectionHeading
              title="Recent activity"
              description="The latest visits reported by Clicky"
            />
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

function MetricCard({
  icon,
  label,
  value,
}: Readonly<{ icon: ReactNode; label: string; value: string }>) {
  return (
    <Card className="analytics-kpi">
      <span className="analytics-kpi__icon">{icon}</span>
      <div>
        <Text size="small" muted>
          {label}
        </Text>
        <Heading level={2} variant="card">
          {value}
        </Heading>
      </div>
    </Card>
  );
}

function SectionHeading({
  description,
  title,
}: Readonly<{ description: string; title: string }>) {
  return (
    <div className="analytics-section__heading">
      <Heading level={2} variant="card">
        {title}
      </Heading>
      <Text size="small" muted>
        {description}
      </Text>
    </div>
  );
}

const SOURCE_COLORS = ["#165dff", "#18a875", "#f59e0b", "#8b5cf6"];

function SourceDistribution({
  items,
}: Readonly<{ items: readonly RankedItem[] }>) {
  if (items.length === 0) {
    return (
      <Text size="small" muted>
        No traffic source data.
      </Text>
    );
  }

  const visibleItems = items.slice(0, 4);
  const total = visibleItems.reduce((sum, item) => sum + item.visits, 0);
  const segments = visibleItems.map((item, index) => ({
    item,
    offset:
      total > 0
        ? (visibleItems
            .slice(0, index)
            .reduce((sum, previous) => sum + previous.visits, 0) /
            total) *
          100
        : 0,
    share: total > 0 ? (item.visits / total) * 100 : 0,
  }));

  return (
    <div className="analytics-source-layout">
      <div className="analytics-donut" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle className="analytics-donut__track" cx="60" cy="60" r="48" />
          {segments.map(({ item, offset, share }, index) => (
            <circle
              key={item.title}
              className="analytics-donut__segment"
              cx="60"
              cy="60"
              r="48"
              pathLength="100"
              stroke={SOURCE_COLORS[index]}
              strokeDasharray={`${share} ${100 - share}`}
              strokeDashoffset={-offset}
            />
          ))}
        </svg>
        <span>
          <strong>{total.toLocaleString()}</strong>
          visits
        </span>
      </div>
      <RankedList
        items={visibleItems}
        emptyLabel="No traffic source data."
        colorCoded
      />
    </div>
  );
}

function RankedList({
  colorCoded,
  compact,
  emptyLabel,
  items,
  showBars,
  showFlags,
}: Readonly<{
  colorCoded?: boolean;
  compact?: boolean;
  emptyLabel: string;
  items: readonly RankedItem[];
  showBars?: boolean;
  showFlags?: boolean;
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
      {items.slice(0, 5).map((item, index) => (
        <li
          key={item.title}
          className="analytics-ranked-list__item"
          style={
            colorCoded
              ? ({
                  "--analytics-series-color": SOURCE_COLORS[index],
                } as CSSProperties)
              : undefined
          }
        >
          <div className="analytics-ranked-list__row">
            <span className="analytics-ranked-list__title">
              {colorCoded ? <i aria-hidden="true" /> : null}
              {showFlags ? <FlagForTitle title={item.title} /> : null}
              {item.title}
            </span>
            <span className="analytics-ranked-list__value">
              {item.visits.toLocaleString()}
            </span>
          </div>
          {showBars ? (
            <span className="analytics-ranked-list__bar" aria-hidden="true">
              <span style={{ width: `${Math.max(2, item.percent)}%` }} />
            </span>
          ) : null}
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
      {items.slice(0, 5).map((item) => (
        <li
          key={item.url || item.title}
          className="analytics-ranked-list__item"
        >
          <div className="analytics-ranked-list__row">
            <span className="analytics-ranked-list__title" title={item.url}>
              {item.title}
            </span>
            <span className="analytics-ranked-list__value">
              {item.visits.toLocaleString()}
            </span>
          </div>
          <span className="analytics-ranked-list__bar" aria-hidden="true">
            <span style={{ width: `${Math.max(2, item.percent)}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function FlagForTitle({ title }: Readonly<{ title: string }>) {
  return <CountryFlag code={countryCodeFromTitle(title)} label={title} />;
}
