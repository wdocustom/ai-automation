import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") || "30");

  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceISO = since.toISOString();

  // Fetch all page views in the range
  const { data: views, error } = await supabaseAdmin
    .from("page_views")
    .select("*")
    .gte("created_at", sinceISO)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = views || [];

  // Total views
  const totalViews = rows.length;

  // Unique sessions
  const uniqueSessions = new Set(rows.map((r) => r.session_id).filter(Boolean)).size;

  // Views by day
  const viewsByDay: Record<string, number> = {};
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    viewsByDay[day] = (viewsByDay[day] || 0) + 1;
  }

  // Views by page
  const viewsByPage: Record<string, number> = {};
  for (const row of rows) {
    viewsByPage[row.path] = (viewsByPage[row.path] || 0) + 1;
  }

  // Referrers (exclude empty/null)
  const viewsByReferrer: Record<string, number> = {};
  for (const row of rows) {
    if (row.referrer) {
      // Extract hostname from referrer URL
      let source = row.referrer;
      try {
        source = new URL(row.referrer).hostname;
      } catch {
        // keep raw value
      }
      viewsByReferrer[source] = (viewsByReferrer[source] || 0) + 1;
    }
  }

  // UTM sources
  const viewsByUtmSource: Record<string, number> = {};
  for (const row of rows) {
    if (row.utm_source) {
      viewsByUtmSource[row.utm_source] = (viewsByUtmSource[row.utm_source] || 0) + 1;
    }
  }

  // Device types
  const viewsByDevice: Record<string, number> = {};
  for (const row of rows) {
    const device = row.device_type || "unknown";
    viewsByDevice[device] = (viewsByDevice[device] || 0) + 1;
  }

  // Browsers
  const viewsByBrowser: Record<string, number> = {};
  for (const row of rows) {
    if (row.browser) {
      viewsByBrowser[row.browser] = (viewsByBrowser[row.browser] || 0) + 1;
    }
  }

  // Countries
  const viewsByCountry: Record<string, number> = {};
  for (const row of rows) {
    if (row.country) {
      viewsByCountry[row.country] = (viewsByCountry[row.country] || 0) + 1;
    }
  }

  // Sort helper: object to sorted array
  const sorted = (obj: Record<string, number>) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    totalViews,
    uniqueSessions,
    viewsByDay,
    pages: sorted(viewsByPage),
    referrers: sorted(viewsByReferrer),
    utmSources: sorted(viewsByUtmSource),
    devices: sorted(viewsByDevice),
    browsers: sorted(viewsByBrowser),
    countries: sorted(viewsByCountry),
  });
}
