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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const insiderUrl = `${siteUrl}/insider`;

  return {
    subject: "You're In — Here's What We Build (Exclusive Look)",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d1b69 100%); padding: 40px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px;">You're on the priority list.</h1>
          <p style="color: #94a3b8; font-size: 14px; margin: 0;">We'll reach out personally when a spot opens up.</p>
        </div>

        <!-- Body -->
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${name},</p>

          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
            Thanks for signing up. We only take on a handful of projects each month so every client gets our full attention — and right now, we're at capacity.
          </p>

          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            But being on the waitlist means you're <strong style="color: #1e293b;">first in line</strong> when a spot opens. No need to do anything — we'll come to you.
          </p>

          <!-- Divider -->
          <div style="border-top: 1px solid #e2e8f0; margin: 24px 0;"></div>

          <!-- Exclusive content teaser -->
          <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0 0 8px;">
            In the meantime, we put something together for you:
          </p>

          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
            A behind-the-scenes look at exactly how we've helped businesses in healthcare, real estate, e-commerce, logistics, and more — with the specific automations, websites, and SaaS products we built for them.
          </p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 28px 0;">
            <a href="${insiderUrl}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 10px;">
              See What We Build &rarr;
            </a>
          </div>

          <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 0 0 24px;">
            This page is only for waitlist members.
          </p>

          <!-- Divider -->
          <div style="border-top: 1px solid #e2e8f0; margin: 24px 0;"></div>

          <!-- What happens next -->
          <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 12px;">
            What happens next:
          </p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top;">
                <div style="width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; color: #2563eb;">1</div>
              </td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                A spot opens up (usually within 1–2 weeks)
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top;">
                <div style="width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; color: #2563eb;">2</div>
              </td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                We email you directly to schedule a free discovery call
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top;">
                <div style="width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; color: #2563eb;">3</div>
              </td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                We scope your project, and if it's a fit, we get to work
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <div style="border-top: 1px solid #e2e8f0; margin: 24px 0;"></div>

          <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
            Questions before then? Just hit reply — this email goes straight to a real person, not a support queue.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            Arcline — Custom AI Automation & Software Development
          </p>
        </div>
      </div>
    `,
  };
}
