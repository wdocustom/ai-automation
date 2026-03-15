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
  Star,
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
            <span className="font-bold text-lg tracking-tight">Arcline</span>
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
            Stop doing busy work.
            <br />
            <span className="gradient-text">We&apos;ll automate it.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            You didn&apos;t start your business to copy-paste data between spreadsheets
            or chase invoices manually. We build custom AI systems and software that
            handle the repetitive stuff — so you can focus on what actually grows
            your business.
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

          {/* Social proof / trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span>Trusted by founders & business owners</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Most projects launch in 2–6 weeks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Agitation Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sound familiar?
            </h2>
            <p className="text-gray-400 text-lg">
              These are the problems our clients had before they called us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Drowning in manual tasks",
                description:
                  "You're spending hours every week on data entry, report generation, or syncing information between tools that should be talking to each other.",
              },
              {
                title: "Your tech is held together with tape",
                description:
                  "You've got a Zapier here, a spreadsheet there, and a prayer holding it all together. It works... until it doesn't.",
              },
              {
                title: "You know you should build, but when?",
                description:
                  "You've got an idea for a tool, dashboard, or app that could transform your business — but you're too busy running it to actually build it.",
              },
              {
                title: "You've been burned before",
                description:
                  "You hired a developer or agency, paid upfront, and got something that didn't work. Now you're skeptical — and rightfully so.",
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
              Two ways we make your life easier
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you need to automate what you&apos;ve got or build something
              entirely new, we handle the technical heavy lifting.
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
                We plug AI into your existing business so things just...happen.
                Automatically. No more babysitting spreadsheets or manually
                moving data around.
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
                Got an idea for a product? Need an internal tool? We build
                polished, production-ready web applications from scratch — the
                kind that actually work and your users will love.
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
              Here&apos;s exactly how it works
            </h2>
            <p className="text-gray-400 text-lg">
              No runaround. No mystery. Just a clear path from idea to launch.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery Call (Free)",
                description:
                  "We hop on a 30-minute call to understand your business, your pain points, and what you're trying to accomplish. No pitch — just listening.",
                color: "blue",
              },
              {
                step: "02",
                title: "Architecture & Scoping",
                description:
                  "We map out exactly what needs to be built, how long it'll take, and what it'll cost. This is a paid consultation — but 100% of that fee is credited toward the build if you move forward.",
                color: "purple",
              },
              {
                step: "03",
                title: "We Build It",
                description:
                  "You get regular updates, demos, and the chance to give feedback at every stage. No disappearing for months and hoping for the best.",
                color: "cyan",
              },
              {
                step: "04",
                title: "Launch & Support",
                description:
                  "We deploy, test, and make sure everything runs smoothly. Need ongoing support? We offer monthly retainers so your systems keep getting better.",
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
              Flexible engagement, fair pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No bloated retainers or surprise invoices. Pick the model that fits
              your stage and budget.
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

      {/* Why Us / Trust Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why founders choose us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "No risk consultation",
                desc: "The consultation fee gets credited 100% if we move forward. You only pay for results.",
              },
              {
                icon: TrendingUp,
                title: "Built to scale",
                desc: "We don't build throwaway prototypes. Everything is production-grade from day one.",
              },
              {
                icon: Clock,
                title: "Fast turnaround",
                desc: "Most projects go from call to launch in 2–6 weeks. We move fast without cutting corners.",
              },
              {
                icon: Code2,
                title: "You own everything",
                desc: "Full source code ownership. No vendor lock-in. It's your business, it's your code.",
              },
              {
                icon: Users,
                title: "Plain English updates",
                desc: "We explain everything in terms you actually understand. No jargon, no hand-waving.",
              },
              {
                icon: Zap,
                title: "One team, full stack",
                desc: "Design, frontend, backend, AI, deployment — we handle the full picture, not just a piece.",
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
              Questions? We&apos;ve got answers.
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "I'm not technical at all. Is that a problem?",
                a: "Not even a little. Most of our clients aren't technical — that's literally why they hire us. We handle all the tech and explain everything in plain English. You just tell us what your business needs, and we figure out how to build it.",
              },
              {
                q: "What's this consultation fee about?",
                a: "Before we build anything, we need to properly understand your business and map out the right solution. That takes real work — so we charge a consultation fee to cover the architecture and scoping phase. But here's the thing: if you decide to move forward with the build, 100% of that fee gets applied to your project cost. So it's really just a deposit on the work.",
              },
              {
                q: "How much does a typical project cost?",
                a: "It depends entirely on scope. A simple automation might be a few thousand dollars, while a full SaaS product could be significantly more. That's exactly what the discovery call is for — we'll give you an honest assessment before you spend a dime.",
              },
              {
                q: "How long does a project usually take?",
                a: "Most projects launch within 2–6 weeks. Automations are usually on the faster end, while full web applications take a bit longer. We'll give you a clear timeline during the scoping phase — and we stick to it.",
              },
              {
                q: "What if I'm not ready to commit to a full project?",
                a: "That's totally fine. Join the waitlist, and when you're ready, you'll have priority access. Or book a discovery call — it's free, no commitment, and you'll walk away with clarity on what's possible even if you don't move forward right now.",
              },
              {
                q: "Do you offer ongoing support after launch?",
                a: "Absolutely. We offer monthly retainers for ongoing development, optimization, and support. Many of our clients start with a project and then transition to a retainer once they see results. But it's never required — you own your code either way.",
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
              ? <>Ready to stop duct-taping<br />your business together?</>
              : <>We&apos;re fully booked right now.<br />But you can skip the line.</>
            }
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {isAccepting
              ? "Whether you need to automate the chaos or build something entirely new — let's figure it out together. One call. No pressure. Just clarity."
              : "Join the waitlist and you'll be the first to know when a spot opens up. We'll reach out personally to get your project started."}
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
              ? "Limited spots available each month. We keep our client list small so every project gets our full attention."
              : "We take on a limited number of clients each month to ensure quality. Waitlist members get first priority."}
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
            <span className="font-semibold text-sm">Arcline</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Arcline. Custom engineering & automation.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
