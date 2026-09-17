import { NextResponse } from "next/server";

import { getAnalyticsSnapshot, getRecentVisitors } from "@/lib/clicky";
import { hasAdminSession } from "@/lib/require-admin";
import type {
  AnalyticsDateRange,
  AnalyticsRangePreset,
} from "@/types/analytics";

const VALID_PRESETS: readonly AnalyticsRangePreset[] = [
  "today",
  "7days",
  "30days",
  "custom",
];

function isValidPreset(value: string | null): value is AnalyticsRangePreset {
  return VALID_PRESETS.includes(value as AnalyticsRangePreset);
}

export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(request.url);
  const presetParam = url.searchParams.get("range");
  if (!isValidPreset(presetParam)) {
    return NextResponse.json(
      { error: "Invalid or missing 'range' parameter." },
      { status: 400 },
    );
  }

  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const range: AnalyticsDateRange = {
    preset: presetParam,
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
  };

  const [snapshotResult, recentVisitorsResult] = await Promise.all([
    getAnalyticsSnapshot(range),
    getRecentVisitors(range),
  ]);

  if (!snapshotResult.ok) {
    return NextResponse.json({ error: snapshotResult.error }, { status: 502 });
  }

  return NextResponse.json({
    snapshot: snapshotResult.data,
    recentVisitors: recentVisitorsResult.ok ? recentVisitorsResult.data : [],
    recentVisitorsError: recentVisitorsResult.ok
      ? null
      : recentVisitorsResult.error,
  });
}
