import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ai-automation-five-henna.vercel.app";

export const metadata: Metadata = {
  title: "What We Build — AI Automation & SaaS Case Studies",
  description:
    "See how we've automated healthcare clinics, real estate companies, e-commerce brands, logistics firms, law offices, and more. Real examples of custom AI automation, lead generation websites, and full SaaS product builds.",
  keywords: [
    "AI automation case studies",
    "business automation examples",
    "healthcare automation software",
    "real estate automation",
    "e-commerce automation",
    "logistics software development",
    "law firm software",
    "accounting automation",
    "lead generation website",
    "client onboarding automation",
    "SaaS product development",
    "custom software case studies",
    "small business automation",
    "contractor software solutions",
    "field service automation",
  ],
  openGraph: {
    title: "What We Build — AI Automation & SaaS Case Studies | Arcline",
    description:
      "Real examples of custom AI automation, lead gen websites, and SaaS products we've built for healthcare, real estate, e-commerce, logistics, and more.",
    url: `${siteUrl}/insider`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Arcline — What We Build",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Build — AI Automation & SaaS Case Studies | Arcline",
    description:
      "Real examples of custom AI automation, lead gen websites, and SaaS products we've built across industries.",
  },
  alternates: {
    canonical: `${siteUrl}/insider`,
  },
};

export default function InsiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
