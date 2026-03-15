"use client";

import { useState, useEffect, useMemo } from "react";
import {
  X,
  CheckCircle,
  Loader2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Phone,
  DollarSign,
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Quick questions
  const [serviceInterest, setServiceInterest] = useState("");
  const [urgency, setUrgency] = useState("");
  const [currentSetup, setCurrentSetup] = useState("");

  // Contact info
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    project_description: "",
    budget_range: "",
  });

  // Build the week days array
  const weekDays = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    // Get Monday of current week + offset
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(today.getDate() + mondayOffset + weekOffset * 7);

    const days = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      days.push({
        date: d.toISOString().split("T")[0],
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        dayNum: d.getDate(),
        isPast: d < new Date(new Date().toDateString()),
      });
    }
    return days;
  }, [weekOffset]);

  useEffect(() => {
    if (!isOpen) return;
    setLoadingSlots(true);

    const start = weekDays[0].date;
    const end = weekDays[4].date;

    fetch(`/api/availability?start=${start}&end=${end}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => {
        setSlots([]);
        setLoadingSlots(false);
      });
  }, [isOpen, weekOffset, weekDays]);

  // Reset selections when week changes
  useEffect(() => {
    setSelectedDate(null);
    setSelectedSlot(null);
  }, [weekOffset]);

  if (!isOpen) return null;

  // Group slots by date
  const slotsByDate = slots.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
      return acc;
    },
    {} as Record<string, Slot[]>
  );

  // Dates that have available slots
  const datesWithSlots = new Set(Object.keys(slotsByDate));

  // Time slots for selected date
  const timeSlotsForDate = selectedDate ? slotsByDate[selectedDate] || [] : [];

  const formatTime = (time: string) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const formatDateFull = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const canSubmit =
    selectedSlot &&
    serviceInterest &&
    urgency &&
    currentSetup &&
    form.name &&
    form.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    const description = [
      `Service interest: ${serviceInterest}`,
      `Timeline: ${urgency}`,
      `Current setup: ${currentSetup}`,
      form.project_description ? `Details: ${form.project_description}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availability_id: selectedSlot.id,
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          project_description: description,
          budget_range: form.budget_range,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  // Step badge component
  const StepBadge = ({ num }: { num: number }) => (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-black text-sm font-bold shrink-0">
      {num}
    </span>
  );

  // Option button for quick questions
  const OptionButton = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
        selected
          ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
          : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
        <div
          className="bg-[#0d1117] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You&apos;re Booked!</h3>
          <p className="text-gray-400 mb-2">
            <strong className="text-white">
              {selectedSlot && formatDateFull(selectedSlot.date)}
            </strong>{" "}
            at{" "}
            <strong className="text-white">
              {selectedSlot && formatTime(selectedSlot.start_time)}
            </strong>
          </p>
          <p className="text-gray-400 mb-6">
            Check your inbox for a confirmation email. We&apos;ll send a meeting
            link before the call.
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
        className="bg-[#0d1117] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0d1117] border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Book Your Discovery Call</h3>
            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> 30 min call
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone or video
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> 100% free
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
          {/* STEP 1: Pick a Date */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StepBadge num={1} />
              <h4 className="text-sm font-bold uppercase tracking-wider">Pick a Date</h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                disabled={weekOffset === 0}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-20 transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2 flex-1 overflow-x-auto">
                {weekDays.map((day) => {
                  const hasSlots = datesWithSlots.has(day.date);
                  const isSelected = selectedDate === day.date;
                  const disabled = day.isPast || !hasSlots;

                  return (
                    <button
                      key={day.date}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedSlot(null);
                      }}
                      className={`flex-1 min-w-[80px] py-3 rounded-lg border text-center transition-all ${
                        isSelected
                          ? "border-yellow-500 bg-yellow-500/10"
                          : disabled
                            ? "border-white/5 bg-white/[0.01] opacity-30 cursor-not-allowed"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div
                        className={`text-xs font-semibold tracking-wider ${
                          isSelected ? "text-yellow-400" : "text-gray-400"
                        }`}
                      >
                        {day.dayName}
                      </div>
                      <div
                        className={`text-lg font-bold mt-0.5 ${
                          isSelected ? "text-yellow-300" : "text-white"
                        }`}
                      >
                        {day.dayNum}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setWeekOffset(weekOffset + 1)}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {loadingSlots && (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              </div>
            )}
          </div>

          {/* STEP 2: Pick a Time */}
          {selectedDate && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <StepBadge num={2} />
                <h4 className="text-sm font-bold uppercase tracking-wider">
                  Pick a Time
                </h4>
                <span className="text-xs text-gray-500">(Central Time)</span>
              </div>

              {timeSlotsForDate.length === 0 ? (
                <p className="text-gray-500 text-sm">No slots available for this day.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlotsForDate.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedSlot?.id === slot.id
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                          : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {formatTime(slot.start_time)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Quick Questions */}
          {selectedSlot && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <StepBadge num={3} />
                <h4 className="text-sm font-bold uppercase tracking-wider">
                  Quick Questions
                </h4>
              </div>

              <div className="space-y-5">
                {/* Question 1: Service Interest */}
                <div>
                  <p className="font-medium mb-1">
                    What are you most interested in?
                  </p>
                  <p className="text-xs text-gray-500 mb-3">Select one *</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI & Automation",
                      "SaaS / Web App",
                      "Both",
                      "Not sure yet",
                    ].map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={serviceInterest === opt}
                        onClick={() => setServiceInterest(opt)}
                      />
                    ))}
                  </div>
                </div>

                {/* Question 2: Urgency */}
                <div>
                  <p className="font-medium mb-1">
                    How soon are you looking to get started?
                  </p>
                  <p className="text-xs text-gray-500 mb-3">Select one *</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "ASAP",
                      "Within a month",
                      "Next few months",
                      "Just exploring",
                    ].map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={urgency === opt}
                        onClick={() => setUrgency(opt)}
                      />
                    ))}
                  </div>
                </div>

                {/* Question 3: Current Setup */}
                <div>
                  <p className="font-medium mb-1">
                    Do you currently use any automation or custom software?
                  </p>
                  <p className="text-xs text-gray-500 mb-3">Select one *</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "No, everything is manual",
                      "Some tools (Zapier, etc.)",
                      "Yes, but it needs improvement",
                    ].map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={currentSetup === opt}
                        onClick={() => setCurrentSetup(opt)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Your Info */}
          {selectedSlot && serviceInterest && urgency && currentSetup && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <StepBadge num={4} />
                <h4 className="text-sm font-bold uppercase tracking-wider">
                  Your Info
                </h4>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Company / Business Name
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Estimated Budget
                  </label>
                  <select
                    value={form.budget_range}
                    onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0d1117]">Select a range...</option>
                    <option value="under-5k" className="bg-[#0d1117]">Under $5,000</option>
                    <option value="5k-15k" className="bg-[#0d1117]">$5,000 – $15,000</option>
                    <option value="15k-50k" className="bg-[#0d1117]">$15,000 – $50,000</option>
                    <option value="50k-plus" className="bg-[#0d1117]">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Anything else you&apos;d like us to know?
                  </label>
                  <textarea
                    value={form.project_description}
                    onChange={(e) =>
                      setForm({ ...form, project_description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                    placeholder="Tell us briefly about your business and what you're hoping to accomplish..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {errorMsg && (
            <p className="text-red-400 text-sm">{errorMsg}</p>
          )}

          {/* Submit */}
          <div className="pb-2">
            <button
              type="submit"
              disabled={!canSubmit || status === "loading"}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 pulse-cta"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book My Free Discovery Call"
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Free 30-minute call. No obligation. The consultation fee only applies if we move forward with scoping.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
