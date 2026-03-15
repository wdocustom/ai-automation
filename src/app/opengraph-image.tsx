import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Arcline — Custom AI Automation & SaaS Development for Small Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a1040 50%, #0a0a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            fontSize: 32,
          }}
        >
          ⚡
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Stop doing busy work.
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 32,
            letterSpacing: "-0.02em",
          }}
        >
          We&apos;ll automate it.
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 40,
          }}
        >
          Custom AI automation, workflow systems, and SaaS development for small
          businesses, contractors, clinics, agencies, and startups.
        </div>

        {/* CTA bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 16,
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ade80",
              }}
            />
            <span>Accepting new projects</span>
          </div>
          <span>•</span>
          <span>Free discovery call</span>
          <span>•</span>
          <span>2–6 week delivery</span>
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 18,
            fontWeight: 700,
            color: "#475569",
            letterSpacing: "0.05em",
          }}
        >
          ARCLINE
        </div>
      </div>
    ),
    { ...size }
  );
}
