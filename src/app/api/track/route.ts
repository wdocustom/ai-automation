import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, utm_source, utm_medium, utm_campaign, device_type, browser, screen_width, session_id } = body;

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    // Pull country from Vercel's geo headers if available
    const country = req.headers.get("x-vercel-ip-country") || null;

    await supabase.from("page_views").insert({
      path,
      referrer: referrer || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      device_type: device_type || null,
      browser: browser || null,
      country: country,
      screen_width: screen_width || null,
      session_id: session_id || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
