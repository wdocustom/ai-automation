"use client";

import { useEffect } from "react";

function getSessionId(): string {
  const key = "_sid";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getDeviceType(width: number): string {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  return "Other";
}

export default function Analytics() {
  useEffect(() => {
    // Don't track admin pages or bots
    if (window.location.pathname.startsWith("/admin")) return;
    if (navigator.userAgent.includes("bot")) return;

    const params = new URLSearchParams(window.location.search);

    const payload = {
      path: window.location.pathname,
      referrer: document.referrer || null,
      utm_source: params.get("utm_source") || null,
      utm_medium: params.get("utm_medium") || null,
      utm_campaign: params.get("utm_campaign") || null,
      device_type: getDeviceType(window.innerWidth),
      browser: getBrowser(),
      screen_width: window.innerWidth,
      session_id: getSessionId(),
    };

    // Use sendBeacon for reliability, fall back to fetch
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", { method: "POST", body: blob, keepalive: true });
    }
  }, []);

  return null;
}
