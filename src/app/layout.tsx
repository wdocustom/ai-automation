import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcline — Custom AI Automation & SaaS Development",
  description:
    "We build custom AI systems and software that handle the repetitive stuff — so you can focus on what actually grows your business. Book a free discovery call.",
  openGraph: {
    title: "Arcline — Custom AI Automation & SaaS Development",
    description:
      "Stop doing busy work. We build custom AI automation and web applications tailored to your exact business goals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
