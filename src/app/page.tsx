"use client";

import { useState } from "react";
import {
  ArrowRight,
  Zap,
  Code2,
  Bot,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  ChevronDown,
  Workflow,
  Database,
  CreditCard,
  BarChart3,
  Users,
} from "lucide-react";
import WaitlistModal from "@/components/WaitlistModal";
import BookingModal from "@/components/BookingModal";

const isAccepting =
  process.env.NEXT_PUBLIC_ACCEPTING_PROJECTS !== "false";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Primary action based on availability
  const openPrimary = () => {
    if (isAccepting) {
      setBookingOpen(true);
    } else {
      setWaitlistOpen(true);
    }
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">AI-Automated</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              Process
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>
          <button
            onClick={openPrimary}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
          >
            {isAccepting ? "Book a Call" : "Join Waitlist"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border rounded-full text-sm mb-8 ${
              isAccepting
                ? "border-green-500/20 text-gray-300"
                : "border-yellow-500/20 text-gray-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isAccepting ? "bg-green-400" : "bg-yellow-400"
              }`}
            />
            {isAccepting
              ? "Currently accepting new projects"
              : "Fully booked — join the waitlist for priority access"}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            We build the software
            <br />
            <span className="gradient-text">your business is missing.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            If you&apos;re still copying data between spreadsheets, sending invoices
            by hand, or duct-taping tools together that don&apos;t talk to each other,
            we can fix that. We write custom software and automation for small businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {isAccepting ? (
              <>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all pulse-cta flex items-center gap-2"
                >
                  Book a Free Discovery Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all pulse-cta flex items-center gap-2"
                >
                  Join the Waitlist — Get Priority Access
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Most projects ship in 2–6 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>You own the code, always</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Agitation Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              This is usually where people start
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Too much manual work",
                description:
                  "You're spending real hours every week on data entry, generating reports, or moving info between tools by hand. It's boring and it's expensive.",
              },
              {
                title: "A stack of tools that barely works",
                description:
                  "A Zapier here, a spreadsheet there, maybe a shared Google Doc with 47 tabs. It gets the job done until someone changes something and the whole thing breaks.",
              },
              {
                title: "A product idea with no time to build it",
                description:
                  "You know exactly what tool or app your business needs. You just don't have the engineering team to make it happen.",
              },
              {
                title: "Bad experiences with developers",
                description:
                  "You paid someone before and got ghosted, or got something half-finished that doesn't actually work. Totally fair to be skeptical.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-xl"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What we do
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We either automate what you already have, or build something new from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Automation Card */}
            <div className="relative group card-hover p-8 bg-gradient-to-b from-blue-500/5 to-transparent border border-white/10 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Bot className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI & Automation</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                We connect your existing tools and build automations so
                the repetitive stuff runs itself. Less manual work, fewer
                mistakes, more time back.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    icon: Workflow,
                    text: "Automated workflows that replace manual processes",
                  },
                  {
                    icon: Database,
                    text: "Smart database syncing across your tools",
                  },
                  {
                    icon: Bot,
                    text: "AI-powered reports, summaries & decision support",
                  },
                  {
                    icon: BarChart3,
                    text: "Real-time dashboards that update themselves",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <item.icon className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SaaS Development Card */}
            <div className="relative group card-hover p-8 bg-gradient-to-b from-purple-500/5 to-transparent border border-white/10 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">SaaS & Web Apps</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Need a customer portal, an internal tool, or a full SaaS product?
                We design and build web applications from the ground up. Real software,
                not a no-code hack.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    icon: Code2,
                    text: "Full-stack web apps built with modern tech",
                  },
                  {
                    icon: Users,
                    text: "User dashboards, portals & admin panels",
                  },
                  {
                    icon: CreditCard,
                    text: "Stripe billing, subscriptions & payments",
                  },
                  {
                    icon: Shield,
                    text: "Authentication, security & scalable architecture",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <item.icon className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-gray-400 text-lg">
              Four steps. Pretty straightforward.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery Call (Free)",
                description:
                  "30 minutes on a call. You tell us what's broken or what you want built, we ask questions and figure out if we can help. No sales pitch.",
                color: "blue",
              },
              {
                step: "02",
                title: "Scoping & Architecture",
                description:
                  "We map out the technical plan, timeline, and cost. This is a paid consultation, but the full fee gets credited to your project if you move forward.",
                color: "purple",
              },
              {
                step: "03",
                title: "Build",
                description:
                  "We build it. You get updates and demos along the way so nothing ends up being a surprise. If something needs to change mid-project, we talk about it.",
                color: "cyan",
              },
              {
                step: "04",
                title: "Launch & Handoff",
                description:
                  "We deploy everything, make sure it works, and hand it over. You own the code. If you want ongoing dev work after that, we do retainers too.",
                color: "green",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 items-start p-6 bg-white/[0.02] border border-white/5 rounded-xl"
              >
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    item.color === "blue"
                      ? "bg-blue-500/10 text-blue-400"
                      : item.color === "purple"
                        ? "bg-purple-500/10 text-purple-400"
                        : item.color === "cyan"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Engagement Models */}
      <section id="pricing" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three ways to work together. Pick what makes sense for your situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Project-Based",
                description: "Best for well-defined builds",
                features: [
                  "Fixed scope, fixed price",
                  "Clear milestones & deliverables",
                  "Ideal for MVPs & automations",
                  "Pay as milestones are completed",
                ],
                highlight: false,
              },
              {
                title: "Monthly Retainer",
                description: "Best for ongoing development",
                features: [
                  "Dedicated development hours",
                  "Priority support & fast turnaround",
                  "Continuous optimization",
                  "Scales with your business",
                ],
                highlight: true,
              },
              {
                title: "Hourly",
                description: "Best for small tasks & consulting",
                features: [
                  "Pay only for what you use",
                  "Great for quick fixes & audits",
                  "No long-term commitment",
                  "Flexible and transparent",
                ],
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all card-hover ${
                  plan.highlight
                    ? "border-blue-500/50 bg-blue-500/5 glow-sm"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openPrimary}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.highlight
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {isAccepting ? "Let\u0027s Talk" : "Join Waitlist"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve — SEO-rich section */}
      <section id="industries" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries we work with
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              If your business has processes that eat up time, we can probably automate them.
              Here are some of the industries we&apos;ve done work in.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "HVAC & Mechanical",
              "Plumbing",
              "Roofing & Siding",
              "Electrical Contractors",
              "General Contractors",
              "Landscaping & Lawn Care",
              "Cleaning Services",
              "Pest Control",
              "Auto Repair & Detailing",
              "Trucking & Logistics",
              "Property Management",
              "Construction",
              "Healthcare & Clinics",
              "Dental Practices",
              "Veterinary Clinics",
              "Law Firms",
              "Accounting & Bookkeeping",
              "Insurance Agencies",
              "Real Estate",
              "Marketing Agencies",
              "Consulting Firms",
              "Fitness & Coaching",
              "E-Commerce & Retail",
              "Restaurants & Food Service",
            ].map((industry, i) => (
              <div
                key={i}
                className="px-4 py-3 bg-white/[0.02] border border-white/5 rounded-lg text-sm text-gray-300 text-center hover:border-white/10 hover:bg-white/[0.04] transition-colors"
              >
                {industry}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t see yours? Doesn&apos;t matter. If there&apos;s a process, we can automate it.
          </p>
        </div>
      </section>

      {/* Why Us / Trust Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why work with us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Consultation fee = deposit",
                desc: "The scoping fee gets applied 100% to your project if you move forward. If you don't, you still walk away with a technical plan.",
              },
              {
                icon: TrendingUp,
                title: "Production-grade code",
                desc: "We don't build throwaway prototypes. What we ship is what you run your business on.",
              },
              {
                icon: Clock,
                title: "2–6 week delivery",
                desc: "Most projects ship within a month or two. We'll give you a real timeline upfront and stick to it.",
              },
              {
                icon: Code2,
                title: "Your code, period",
                desc: "You get the source code. No lock-in, no proprietary platforms, no hostage situations.",
              },
              {
                icon: Users,
                title: "We speak English, not jargon",
                desc: "You'll always know what's happening with your project. If we can't explain it simply, that's on us.",
              },
              {
                icon: Zap,
                title: "Full stack, one team",
                desc: "Design, frontend, backend, AI, infrastructure. You don't need to hire five different people.",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                <item.icon className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "I'm not technical. Is that a problem?",
                a: "No. That's the whole point. You tell us what your business needs, we figure out how to build it. We'll explain things in normal words, not dev speak.",
              },
              {
                q: "What's the consultation fee for?",
                a: "We charge a fee for the scoping and architecture phase because it's real work, not a sales call. We map out exactly what gets built, how, and how much. If you go ahead with the project, that fee gets applied to the total cost. If you don't, you keep the plan.",
              },
              {
                q: "How much does this stuff cost?",
                a: "Depends on what you need. A simple automation could be a few thousand. A full SaaS product is more. The discovery call is free and we'll give you a straight answer on cost before you commit to anything.",
              },
              {
                q: "How long does a project take?",
                a: "Most things ship in 2–6 weeks. Automations are faster, full apps take longer. We give you a timeline during scoping and we stick to it.",
              },
              {
                q: "What if I'm not ready yet?",
                a: "No worries. Join the waitlist or just book a free discovery call to talk through your idea. Zero commitment either way.",
              },
              {
                q: "Do you do ongoing work after launch?",
                a: "Yeah, we offer monthly retainers for continued development and support. A lot of clients start with a project and stay on for ongoing work. But it's optional. You own everything regardless.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/5 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-400 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {isAccepting
              ? <>Let&apos;s talk about<br />what you need built.</>
              : <>We&apos;re at capacity right now.<br />Get on the list.</>
            }
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {isAccepting
              ? "Book a free call. Tell us what's not working. We'll tell you if we can fix it and what it would take."
              : "We'll reach out when a spot opens up. Waitlist members go first."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAccepting ? (
              <button
                onClick={() => setBookingOpen(true)}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all pulse-cta flex items-center gap-2"
              >
                Book Your Free Discovery Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => setWaitlistOpen(true)}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all pulse-cta flex items-center gap-2"
              >
                Join the Waitlist — Get Priority Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-6">
            {isAccepting
              ? "We take on a handful of projects at a time so we can actually do them well."
              : "We cap our project load each month. Waitlist gets first priority."}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm">AI-Automated</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AI-Automated. Custom engineering & automation.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
