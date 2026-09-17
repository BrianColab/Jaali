import { Text } from "@/components/ui/typography";
import { formatDurationSeconds } from "@/lib/format-duration";
import type { RecentVisitor } from "@/types/analytics";

type RecentVisitorsTableProps = Readonly<{
  error: string | null;
  visitors: readonly RecentVisitor[];
}>;

function shortenUrl(url: string | null): string {
  if (!url) return "—";
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}` || "/";
  } catch {
    return url;
  }
}

export function RecentVisitorsTable({
  error,
  visitors,
}: RecentVisitorsTableProps) {
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

  return (
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
          {visitors.map((visitor, index) => (
            <tr key={`${visitor.time}-${index}`}>
              <td>{visitor.time}</td>
              <td>{visitor.location ?? "—"}</td>
              <td>{visitor.trafficSource}</td>
              <td>{shortenUrl(visitor.landingPage)}</td>
              <td>{visitor.pagesViewed}</td>
              <td>{formatDurationSeconds(visitor.timeOnSiteSeconds)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
