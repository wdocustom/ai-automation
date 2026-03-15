"use client";

import {
  Zap,
  ArrowRight,
  Building2,
  Stethoscope,
  ShoppingCart,
  Briefcase,
  Home,
  Truck,
  Globe,
  CreditCard,
  Users,
  BarChart3,
  Bot,
  Code2,
  Layers,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function InsiderPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white grid-bg">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">AI-Automated</span>
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
            <Sparkles className="w-3 h-3" />
            Waitlist Exclusive
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
            What we actually build
            <br />
            <span className="gradient-text">(and who we build it for)</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            You&apos;re on our priority list — so we want to show you exactly
            how businesses like yours are saving time, cutting costs, and scaling
            faster with custom automation and software.
          </p>
        </div>
      </section>

      {/* Section 1: Automation Case Studies */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              AI & Automation in Action
            </h2>
          </div>
          <p className="text-gray-400 mb-10 ml-[52px]">
            Real examples of how different industries are eliminating busywork.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Healthcare */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold">Healthcare & Clinics</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A multi-location clinic was spending 20+ hours per week on
                patient intake, appointment reminders, and insurance
                verification — all done manually by front desk staff.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  What we automated
                </p>
                {[
                  "Digital intake forms that auto-populate the patient record system",
                  "AI-powered appointment reminders via SMS and email (reduced no-shows by 40%)",
                  "Insurance eligibility checks that run automatically before each visit",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-sm text-emerald-300">
                Result: Staff reclaimed 20+ hrs/week. Zero missed insurance checks.
              </div>
            </div>

            {/* Real Estate */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold">Real Estate</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A property management company was juggling tenant applications,
                lease renewals, and maintenance requests across spreadsheets,
                email, and paper forms.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  What we automated
                </p>
                {[
                  "Online tenant application pipeline with automated background checks",
                  "Lease renewal reminders with e-signature integration",
                  "Maintenance request system that auto-assigns to vendors by category",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 bg-amber-500/5 border border-amber-500/10 rounded-lg text-sm text-amber-300">
                Result: 3x faster tenant placement. Maintenance response time cut in half.
              </div>
            </div>

            {/* E-Commerce */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl card-hover">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-6 h-6 text-pink-400" />
                <h3 className="text-lg font-bold">E-Commerce & Retail</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                An online retailer was manually tracking inventory across
                multiple warehouses, updating product listings by hand, and
                copy-pasting order data into their fulfillment system.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  What we automated
                </p>
                {[
                  "Real-time inventory sync across Shopify, Amazon, and warehouse systems",
                  "Automated order routing to the nearest fulfillment center",
                  "AI-generated product descriptions and SEO-optimized listings",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 bg-pink-500/5 border border-pink-500/10 rounded-lg text-sm text-pink-300">
                Result: Eliminated overselling. Fulfillment speed doubled.
              </div>
            </div>

            {/* Logistics */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold">Logistics & Field Services</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A field service company was dispatching technicians via phone
                calls and text messages, with no visibility into who was
                available, where, or when jobs were completed.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  What we automated
                </p>
                {[
                  "Smart dispatch system that assigns jobs based on location, skill, and availability",
                  "Automated job completion reports with photo uploads and client sign-off",
                  "Real-time dashboard showing all active jobs, technician locations, and SLA status",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-sm text-cyan-300">
                Result: 35% more jobs completed per day. Zero missed appointments.
              </div>
            </div>

            {/* Professional Services */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-violet-400" />
                <h3 className="text-lg font-bold">Agencies & Consulting</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A marketing agency was spending more time on reporting and
                client updates than on actual strategy work. Every week,
                someone compiled data from 5 different platforms into a slide deck.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  What we automated
                </p>
                {[
                  "Auto-generated weekly performance reports pulling from Google Ads, Meta, and GA4",
                  "Client portal with real-time campaign dashboards (no more slide decks)",
                  "AI-powered brief summaries and recommendations for each account",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 bg-violet-500/5 border border-violet-500/10 rounded-lg text-sm text-violet-300">
                Result: 10 hours/week saved per account manager. Happier clients.
              </div>
            </div>

            {/* Finance */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold">Finance & Accounting</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A bookkeeping firm was manually reconciling transactions,
                chasing clients for receipts, and generating reports that took
                hours to compile each month.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  What we automated
                </p>
                {[
                  "Bank feed auto-categorization with AI that learns each client's patterns",
                  "Automated receipt collection reminders with OCR scanning",
                  "One-click monthly financial report generation across all clients",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg text-sm text-blue-300">
                Result: Month-end close went from 5 days to 1. Scaled from 30 to 80 clients.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Lead Gen / Booking Websites */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Websites That Actually Work for You
            </h2>
          </div>
          <p className="text-gray-400 mb-10 ml-[52px]">
            Not just a pretty page — sites that book calls, capture leads, and
            handle client onboarding while you sleep.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Lead Gen Example */}
            <div className="p-8 bg-gradient-to-b from-purple-500/5 to-transparent border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">
                <Users className="w-4 h-4" />
                Lead Generation
              </div>
              <h3 className="text-xl font-bold mb-3">
                A Roofing Company That Couldn&apos;t Keep Up With Leads
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                They were getting referrals by word of mouth, but had no system
                to capture, qualify, or follow up with leads. Estimates were done
                on pen and paper. Follow-ups fell through the cracks.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-white mb-2">
                    What we built
                  </p>
                  <ul className="space-y-2">
                    {[
                      "A conversion-optimized website with instant quote request forms",
                      "Automated lead qualification — filtered serious buyers from tire-kickers",
                      "Built-in scheduling so homeowners book inspections directly",
                      "Automated follow-up email sequences for leads that didn't convert immediately",
                      "Admin dashboard showing pipeline, revenue, and lead source tracking",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-4 py-3 bg-purple-500/5 border border-purple-500/10 rounded-lg text-sm text-purple-300">
                Result: 4x more booked inspections. 60% of leads now self-qualify
                before the first call.
              </div>
            </div>

            {/* Onboarding Example */}
            <div className="p-8 bg-gradient-to-b from-blue-500/5 to-transparent border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
                <Layers className="w-4 h-4" />
                Client Onboarding
              </div>
              <h3 className="text-xl font-bold mb-3">
                A Law Firm Drowning in Paperwork
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Every new client meant 45 minutes of intake calls, manually
                emailing document checklists, chasing signatures, and re-entering
                data into their case management system.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-white mb-2">
                    What we built
                  </p>
                  <ul className="space-y-2">
                    {[
                      "A branded client portal where new clients complete intake forms online",
                      "Smart document checklist that adapts based on case type",
                      "E-signature integration — clients sign retainers and disclosures digitally",
                      "Auto-sync with their case management system (no double data entry)",
                      "Automated status updates so clients stop calling to ask 'what's next?'",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-4 py-3 bg-blue-500/5 border border-blue-500/10 rounded-lg text-sm text-blue-300">
                Result: Client onboarding dropped from 3 days to 2 hours. Support
                calls cut by 70%.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Full SaaS Builds */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Full SaaS Products — From Idea to Revenue
            </h2>
          </div>
          <p className="text-gray-400 mb-10 ml-[52px]">
            Got an idea for a software product? We take it from napkin sketch to
            paying customers.
          </p>

          <div className="p-8 bg-gradient-to-b from-green-500/5 to-transparent border border-white/10 rounded-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-400 uppercase tracking-wider mb-4">
              <CreditCard className="w-4 h-4" />
              SaaS Product Build
            </div>
            <h3 className="text-xl font-bold mb-3">
              A Fitness Coach Who Wanted to Productize Their Expertise
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              They were running their coaching business through DMs, PDFs, and
              Zoom calls. They had 50 clients and couldn&apos;t scale beyond that
              without hiring more coaches. They wanted a platform that could
              deliver their programs without them being involved in every
              interaction.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-sm font-semibold text-white mb-3">
                  What we built
                </p>
                <ul className="space-y-2">
                  {[
                    "Full SaaS platform with user accounts and subscription tiers",
                    "Workout & nutrition program builder with drag-and-drop editor",
                    "Client progress tracking with photo uploads and measurement logging",
                    "In-app messaging between coaches and clients",
                    "Stripe billing with monthly/annual plans and free trial support",
                    "Admin dashboard with revenue metrics, churn rate, and engagement stats",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-3">
                  The tech behind it
                </p>
                <ul className="space-y-2">
                  {[
                    "Next.js web app with mobile-responsive design",
                    "Supabase for database, auth, and real-time features",
                    "Stripe for subscriptions, invoicing, and payment management",
                    "Vercel for hosting with automatic deployments",
                    "Custom API for program delivery and progress tracking",
                    "Role-based access (admin, coach, client) with granular permissions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <BarChart3 className="w-4 h-4 text-green-400/50 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 py-3 bg-green-500/5 border border-green-500/10 rounded-lg text-sm text-green-300">
              Result: Went from 50 manual clients to 300+ subscribers in 4 months.
              Recurring revenue replaced trading time for money.
            </div>
          </div>

          {/* More SaaS ideas */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Booking Platform",
                desc: "Multi-location appointment scheduling with staff management, automated reminders, and payment collection.",
              },
              {
                title: "Marketplace",
                desc: "Two-sided platforms connecting buyers and sellers with escrow payments, reviews, and search/filtering.",
              },
              {
                title: "Internal Tool",
                desc: "Custom dashboards and workflow tools for your team — replacing the spreadsheet-and-email combo you've outgrown.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-white/[0.02] border border-white/5 rounded-xl"
              >
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See something that fits your business?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            You&apos;re already on our priority list. When a spot opens up,
            you&apos;ll be the first to hear from us — and we&apos;ll hit the
            ground running.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all flex items-center gap-2"
            >
              Back to Home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Have questions in the meantime? Just reply to your confirmation email.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm">AI-Automated</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AI-Automated. Custom engineering &
            automation.
          </p>
        </div>
      </footer>
    </div>
  );
}
