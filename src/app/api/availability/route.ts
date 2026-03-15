import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET available slots (public)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  let query = supabase
    .from("availability")
    .select("id, date, start_time, end_time")
    .eq("is_booked", false)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (startDate) query = query.gte("date", startDate);
  if (endDate) query = query.lte("date", endDate);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slots: data });
}

// POST new availability slot (admin only)
export async function POST(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { date, start_time, end_time } = body;

    if (!date || !start_time || !end_time) {
      return NextResponse.json(
        { error: "date, start_time, and end_time are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("availability")
      .insert({ date, start_time, end_time })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ slot: data });
  } catch {
    return NextResponse.json(
      { error: "Failed to create availability slot" },
      { status: 500 }
    );
  }
}

// DELETE availability slot (admin only)
export async function DELETE(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Slot ID required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("availability")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
