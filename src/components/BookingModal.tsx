"use client";

import { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  Loader2,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Slot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [weekOffset, setWeekOffset] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    project_description: "",
    budget_range: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setLoadingSlots(true);

    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() + weekOffset * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    fetch(
      `/api/availability?start=${start.toISOString().split("T")[0]}&end=${end.toISOString().split("T")[0]}`
    )
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => {
        setSlots([]);
        setLoadingSlots(false);
      });
  }, [isOpen, weekOffset]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availability_id: selectedSlot.id,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setStep("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  // Group slots by date
  const slotsByDate = slots.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
      return acc;
    },
    {} as Record<string, Slot[]>
  );

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
        <div
          className="bg-[#12121a] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You&apos;re Booked!</h3>
          <p className="text-gray-400 mb-2">
            <strong className="text-white">
              {selectedSlot && formatDate(selectedSlot.date)}
            </strong>{" "}
            at{" "}
            <strong className="text-white">
              {selectedSlot && formatTime(selectedSlot.start_time)}
            </strong>
          </p>
          <p className="text-gray-400 mb-6">
            Check your inbox for a confirmation email with all the details.
            We&apos;ll send you a meeting link before the call.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
      <div
        className="bg-[#12121a] border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">
              {step === "select" ? "Pick a Time" : "Your Details"}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {step === "select"
                ? "30-minute discovery call — no strings attached"
                : "Tell us about you and your project"}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === "select" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                disabled={weekOffset === 0}
                className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-400">
                {weekOffset === 0 ? "This Week" : `${weekOffset} week${weekOffset > 1 ? "s" : ""} ahead`}
              </span>
              <button
                onClick={() => setWeekOffset(weekOffset + 1)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              </div>
            ) : Object.keys(slotsByDate).length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 mb-1">No available times this week</p>
                <p className="text-gray-500 text-sm">
                  Try checking the next week, or join the waitlist and we&apos;ll reach out.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(slotsByDate).map(([date, dateSlots]) => (
                  <div key={date}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-gray-300">
                        {formatDate(date)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {dateSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all text-sm ${
                            selectedSlot?.id === slot.id
                              ? "border-blue-500 bg-blue-500/10 text-blue-400"
                              : "border-white/10 hover:border-white/20 hover:bg-white/5"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          {formatTime(slot.start_time)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setStep("form")}
              disabled={!selectedSlot}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-2 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="font-medium">
                  {selectedSlot && formatDate(selectedSlot.date)}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedSlot && formatTime(selectedSlot.start_time)} –{" "}
                  {selectedSlot && formatTime(selectedSlot.end_time)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("select")}
                className="ml-auto text-sm text-blue-400 hover:text-blue-300"
              >
                Change
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Estimated Budget
              </label>
              <select
                value={form.budget_range}
                onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none"
              >
                <option value="" className="bg-[#12121a]">Select a range...</option>
                <option value="under-5k" className="bg-[#12121a]">Under $5,000</option>
                <option value="5k-15k" className="bg-[#12121a]">$5,000 – $15,000</option>
                <option value="15k-50k" className="bg-[#12121a]">$15,000 – $50,000</option>
                <option value="50k-plus" className="bg-[#12121a]">$50,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tell us about your project
              </label>
              <textarea
                value={form.project_description}
                onChange={(e) =>
                  setForm({ ...form, project_description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="What does your business do? What problem are you trying to solve?"
              />
            </div>

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 pulse-cta"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book My Discovery Call"
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Free 30-minute call. The consultation fee is only charged if we move forward with scoping.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
