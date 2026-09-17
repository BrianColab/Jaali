"use client";

import { useState } from "react";

import { Text } from "@/components/ui/typography";
import { formatDurationSeconds } from "@/lib/format-duration";
import type { RecentVisitor } from "@/types/analytics";

type RecentVisitorsTableProps = Readonly<{
  error: string | null;
  visitors: readonly RecentVisitor[];
}>;

const INITIAL_VISIBLE_ROWS = 8;

function shortenUrl(url: string | null): string {
  if (!url) return "—";
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}` || "/";
  } catch {
    return url;
  }
}

function countryCodeToFlag(countryCode: string | null): string {
  if (!countryCode || !/^[a-z]{2}$/i.test(countryCode)) return "🌐";
  return countryCode
    .toUpperCase()
    .split("")
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join("");
}

export function RecentVisitorsTable({
  error,
  visitors,
}: RecentVisitorsTableProps) {
  const [showAll, setShowAll] = useState(false);

  if (error) {
    return (
      <Text size="small" muted>
        Recent activity is unavailable right now: {error}
      </Text>
    );
  }

  if (visitors.length === 0) {
    return (
      <Text size="small" muted>
        No visits recorded for this period.
      </Text>
    );
  }

  const visibleVisitors = showAll
    ? visitors
    : visitors.slice(0, INITIAL_VISIBLE_ROWS);
  const hasMore = visitors.length > INITIAL_VISIBLE_ROWS;

  return (
    <div className="analytics-table">
      <div className="admin-preorder-table__wrap">
        <table className="admin-preorder-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Source</th>
              <th>Landing page</th>
              <th>Pages</th>
              <th>Time on site</th>
            </tr>
          </thead>
          <tbody>
            {visibleVisitors.map((visitor, index) => (
              <tr key={`${visitor.time}-${index}`}>
                <td>{visitor.time}</td>
                <td>
                  <span className="analytics-table__location">
                    <span className="analytics-flag" aria-hidden="true">
                      {countryCodeToFlag(visitor.countryCode)}
                    </span>
                    {visitor.location ?? "—"}
                  </span>
                </td>
                <td>{visitor.trafficSource}</td>
                <td>{shortenUrl(visitor.landingPage)}</td>
                <td>{visitor.pagesViewed}</td>
                <td>{formatDurationSeconds(visitor.timeOnSiteSeconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore ? (
        <div className="analytics-table__footer">
          <span>
            Showing {visibleVisitors.length} of {visitors.length} visits
          </span>
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? "Show fewer" : "Show all visits"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
