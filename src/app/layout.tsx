import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.aiautomated.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Arcline — Custom AI Automation & SaaS Development for Small Business",
    template: "%s | Arcline",
  },
  description:
    "Custom AI automation, workflow systems, and SaaS development for small businesses, contractors, clinics, agencies, and startups. We build the software that eliminates your busywork — so you can focus on growth. Book a free discovery call.",
  keywords: [
    // Core services
    "AI automation for small business",
    "custom software development",
    "SaaS development company",
    "business process automation",
    "workflow automation",
    "custom web application development",
    // Blue-collar industries
    "contractor automation software",
    "HVAC business automation",
    "plumbing company software",
    "roofing company lead generation",
    "construction business automation",
    "field service management software",
    "landscaping business software",
    "electrical contractor software",
    "cleaning company automation",
    "property management automation",
    "fleet management software",
    "trucking company automation",
    "auto repair shop software",
    "home services automation",
    // White-collar industries
    "healthcare clinic automation",
    "law firm software development",
    "accounting firm automation",
    "real estate automation software",
    "marketing agency automation",
    "consulting firm software",
    "insurance agency automation",
    "financial services software",
    "dental practice management",
    "veterinary clinic software",
    // SaaS & product
    "MVP development company",
    "startup software development",
    "Stripe billing integration",
    "user dashboard development",
    "custom CRM development",
    "booking system development",
    "client portal development",
    // General
    "business automation services",
    "AI integration services",
    "custom API development",
    "database automation",
    "Supabase development",
    "Next.js development agency",
    "Vercel deployment services",
  ],
  authors: [{ name: "Arcline" }],
  creator: "Arcline",
  publisher: "Arcline",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Arcline",
    title:
      "Arcline — Custom AI Automation & SaaS Development for Small Business",
    description:
      "Stop doing busy work. We build custom AI automation, workflow systems, and web applications for contractors, clinics, agencies, and startups. Book a free discovery call.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Arcline — Custom AI Automation & SaaS Development",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Arcline — Custom AI Automation & SaaS Development for Small Business",
    description:
      "Stop doing busy work. We build custom AI automation, workflow systems, and web applications for contractors, clinics, agencies, and startups.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  verification: {
    google: "m5yt0dfqOUkvCSyPlmc8TrRlQfwMYTtqWybHpS5f9cU",
  },
  other: {
    "apple-mobile-web-app-title": "Arcline",
  },
};

// Structured Data: Organization + LocalBusiness
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arcline",
  description:
    "Custom AI automation, workflow systems, and SaaS development for small businesses. We build software that eliminates busywork for contractors, clinics, agencies, and startups.",
  url: siteUrl,
  logo: `${siteUrl}/og-image.png`,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English",
  },
  serviceType: [
    "AI Automation",
    "Custom Software Development",
    "SaaS Development",
    "Business Process Automation",
    "Web Application Development",
    "API Integration",
    "Workflow Automation",
    "Database Automation",
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Business Automation",
    "SaaS Development",
    "Web Application Development",
    "API Integration",
    "Stripe Payment Integration",
    "Database Management",
    "Cloud Deployment",
    "Next.js",
    "Supabase",
    "Vercel",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Business Automation",
          description:
            "Automated workflows, database syncing, AI-powered reports, and real-time dashboards for small businesses in healthcare, construction, logistics, real estate, and more.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SaaS & Web Application Development",
          description:
            "Full-stack web applications, user dashboards, client portals, Stripe billing integrations, and custom software products from idea to launch.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lead Generation & Booking Websites",
          description:
            "High-converting websites with automated lead capture, qualification, scheduling, and follow-up for service businesses.",
        },
      },
    ],
  },
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to be technical to work with Arcline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. Most of our clients aren't technical — that's why they hire us. We handle all the tech and explain everything in plain English. You tell us what your business needs, and we figure out how to build it.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a custom AI automation or SaaS project cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on scope. A simple automation might be a few thousand dollars, while a full SaaS product could be significantly more. We offer project-based, hourly, and monthly retainer pricing. The discovery call is free — we'll give you an honest assessment before you spend a dime.",
      },
    },
    {
      "@type": "Question",
      name: "What is the consultation fee and is it refundable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We charge a consultation fee to properly map out the architecture and scope of your project. This covers real work — not a sales pitch. If you decide to move forward with the build, 100% of that fee gets credited toward your project cost. It's essentially a deposit.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical automation or software project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects launch within 2–6 weeks. Automations are usually on the faster end, while full web applications take a bit longer. We provide a clear timeline during the scoping phase and stick to it.",
      },
    },
    {
      "@type": "Question",
      name: "What industries do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with businesses across healthcare, real estate, construction, HVAC, plumbing, roofing, landscaping, e-commerce, logistics, trucking, law firms, accounting firms, marketing agencies, insurance, fitness, and more. If your business has repetitive processes, we can automate them.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer monthly retainers for ongoing development, optimization, and support. Many clients start with a project and then transition to a retainer once they see results. But it's never required — you own your code either way.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
