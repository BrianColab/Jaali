import { redirect } from "next/navigation";

import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { AdminLogoutButton } from "@/components/navigation/admin-logout-button";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { getAnalyticsSnapshot, getRecentVisitors } from "@/lib/clicky";
import { hasAdminSession } from "@/lib/require-admin";
import type { AnalyticsDateRange } from "@/types/analytics";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

const DEFAULT_RANGE: AnalyticsDateRange = { preset: "30days" };

export default async function AdminAnalyticsPage() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const [snapshotResult, recentVisitorsResult] = await Promise.all([
    getAnalyticsSnapshot(DEFAULT_RANGE),
    getRecentVisitors(DEFAULT_RANGE),
  ]);

  return (
    <main className="admin-queue">
      <Container className="admin-queue__container">
        <div className="admin-queue__header">
          <Heading level={1} variant="section">
            Analytics
          </Heading>
          <AdminLogoutButton />
        </div>
        <div className="admin-queue__nav-links">
          <ButtonLink
            href="/admin/memories"
            variant="secondary"
            className="admin-queue__nav-link"
          >
            View memory photos →
          </ButtonLink>
          <ButtonLink
            href="/admin/preorders"
            variant="secondary"
            className="admin-queue__nav-link"
          >
            View Pre-Orders Merch →
          </ButtonLink>
        </div>
        <AnalyticsDashboard
          initialRange={DEFAULT_RANGE}
          initialSnapshot={snapshotResult.ok ? snapshotResult.data : null}
          initialError={snapshotResult.ok ? null : snapshotResult.error}
          initialRecentVisitors={
            recentVisitorsResult.ok ? recentVisitorsResult.data : []
          }
          initialRecentVisitorsError={
            recentVisitorsResult.ok ? null : recentVisitorsResult.error
          }
        />
      </Container>
    </main>
  );
}
