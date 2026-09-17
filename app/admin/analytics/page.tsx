import { redirect } from "next/navigation";
import { ImageIcon, ShoppingBag } from "lucide-react";

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
    <div className="analytics-page">
      <Container className="admin-queue__container analytics-page__container">
        <header className="analytics-page__header">
          <div className="analytics-page__heading">
            <div className="analytics-page__title-row">
              <Heading level={1} variant="section">
                Analytics
              </Heading>
              <span className="analytics-page__status">
                <span aria-hidden="true" />
                Clicky connected
              </span>
            </div>
            <p>Website traffic and audience activity</p>
          </div>
          <div className="analytics-page__actions">
            <ButtonLink
              href="/admin/memories"
              variant="secondary"
              className="admin-queue__nav-link"
            >
              <ImageIcon aria-hidden="true" size={16} />
              Memory photos
            </ButtonLink>
            <ButtonLink
              href="/admin/preorders"
              variant="secondary"
              className="admin-queue__nav-link"
            >
              <ShoppingBag aria-hidden="true" size={16} />
              Pre-orders
            </ButtonLink>
            <AdminLogoutButton />
          </div>
        </header>
        <div className="analytics-page__rule" />
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
    </div>
  );
}
