// Simple email notification helper
// Uses Supabase Edge Functions or a simple SMTP relay
// For now, this logs and can be extended with Resend, SendGrid, etc.

const OWNER_EMAIL = process.env.OWNER_EMAIL || "hello@yourdomain.com";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  // If Resend API key is configured, use it
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
        }),
      });
      return res.ok;
    } catch (error) {
      console.error("Email send failed:", error);
      return false;
    }
  }

  // Fallback: log the email (replace with your preferred provider)
  console.log("📧 Email notification:", {
    to: payload.to,
    subject: payload.subject,
  });
  return true;
}

export function buildBookingConfirmationEmail(booking: {
  name: string;
  date: string;
  time: string;
}) {
  return {
    subject: `Discovery Call Confirmed — ${booking.date} at ${booking.time}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #0f172a;">Your Discovery Call is Booked</h2>
        <p>Hi ${booking.name},</p>
        <p>Thanks for booking a discovery call. Here are your details:</p>
        <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0;"><strong>Date:</strong> ${booking.date}</p>
          <p style="margin: 8px 0 0;"><strong>Time:</strong> ${booking.time}</p>
        </div>
        <p>I'll send you a meeting link before the call. If you need to reschedule, just reply to this email.</p>
        <p>Looking forward to learning about your project!</p>
      </div>
    `,
  };
}

export function buildOwnerNotificationEmail(booking: {
  name: string;
  email: string;
  company?: string;
  date: string;
  time: string;
  projectDescription?: string;
  budgetRange?: string;
}) {
  return {
    to: OWNER_EMAIL,
    subject: `New Discovery Call: ${booking.name} — ${booking.date}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #0f172a;">New Discovery Call Booked</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          ${booking.company ? `<p><strong>Company:</strong> ${booking.company}</p>` : ""}
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          ${booking.budgetRange ? `<p><strong>Budget:</strong> ${booking.budgetRange}</p>` : ""}
          ${booking.projectDescription ? `<p><strong>Project:</strong> ${booking.projectDescription}</p>` : ""}
        </div>
      </div>
    `,
  };
}

export function buildWaitlistEmail(name: string) {
  return {
    subject: "You're on the List — We'll Be in Touch Soon",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #0f172a;">Welcome to the Waitlist</h2>
        <p>Hi ${name},</p>
        <p>Thanks for your interest! You're now on our priority list. We take on a limited number of projects each month to ensure every client gets our full attention.</p>
        <p>We'll reach out soon to discuss how we can help you scale your business through custom automation and development.</p>
        <p>In the meantime, if you'd like to get started sooner, you can book a discovery call directly on our site.</p>
      </div>
    `,
  };
}
