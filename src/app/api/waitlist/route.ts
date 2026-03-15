import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, buildWaitlistEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("waitlist")
      .insert({ name, email, company, interest, message });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the waitlist!" },
          { status: 409 }
        );
      }
      throw error;
    }

    // Send confirmation to the user
    const confirmEmail = buildWaitlistEmail(name);
    await sendEmail({ to: email, ...confirmEmail });

    // Notify the owner
    await sendEmail({
      to: process.env.OWNER_EMAIL || "hello@yourdomain.com",
      subject: `New Waitlist Signup: ${name}`,
      html: `<p><strong>${name}</strong> (${email}) just joined the waitlist.</p>
             ${company ? `<p>Company: ${company}</p>` : ""}
             ${interest ? `<p>Interest: ${interest}</p>` : ""}
             ${message ? `<p>Message: ${message}</p>` : ""}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
