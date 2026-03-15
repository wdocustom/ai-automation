import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  sendEmail,
  buildBookingConfirmationEmail,
  buildOwnerNotificationEmail,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      availability_id,
      name,
      email,
      company,
      phone,
      project_description,
      budget_range,
    } = body;

    if (!availability_id || !name || !email) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Check if the slot is still available
    const { data: slot, error: slotError } = await supabaseAdmin
      .from("availability")
      .select("*")
      .eq("id", availability_id)
      .eq("is_booked", false)
      .single();

    if (slotError || !slot) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another." },
        { status: 409 }
      );
    }

    // Create booking and mark slot as booked (transaction-like)
    const { error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        availability_id,
        name,
        email,
        company,
        phone,
        project_description,
        budget_range,
      });

    if (bookingError) throw bookingError;

    // Mark the slot as booked
    const { error: updateError } = await supabaseAdmin
      .from("availability")
      .update({ is_booked: true })
      .eq("id", availability_id);

    if (updateError) throw updateError;

    // Format date and time for emails
    const dateStr = new Date(slot.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = slot.start_time.slice(0, 5);

    // Send confirmation email to client
    const clientEmail = buildBookingConfirmationEmail({
      name,
      date: dateStr,
      time: timeStr,
    });
    await sendEmail({ to: email, ...clientEmail });

    // Send notification to owner
    const ownerEmail = buildOwnerNotificationEmail({
      name,
      email,
      company,
      date: dateStr,
      time: timeStr,
      projectDescription: project_description,
      budgetRange: budget_range,
    });
    await sendEmail(ownerEmail);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET bookings (admin only)
export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*, availability(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
