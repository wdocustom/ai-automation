"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Clock,
  Trash2,
  Plus,
  Users,
  Mail,
  Loader2,
  LogIn,
  RefreshCw,
} from "lucide-react";

interface Slot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  project_description: string | null;
  budget_range: string | null;
  created_at: string;
  availability: {
    date: string;
    start_time: string;
    end_time: string;
  } | null;
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"availability" | "bookings">("availability");

  // New slot form
  const [newSlot, setNewSlot] = useState({
    date: "",
    start_time: "09:00",
    end_time: "09:30",
  });

  // Bulk slot generation
  const [bulkDate, setBulkDate] = useState("");
  const [bulkStart, setBulkStart] = useState("09:00");
  const [bulkEnd, setBulkEnd] = useState("17:00");
  const [slotDuration, setSlotDuration] = useState(30);

  const headers = {
    "Content-Type": "application/json",
    "x-admin-key": adminKey,
  };

  const fetchSlots = useCallback(async () => {
    const res = await fetch("/api/availability");
    const data = await res.json();
    setSlots(data.slots || []);
  }, []);

  const fetchBookings = useCallback(async () => {
    const res = await fetch("/api/bookings", { headers: { "x-admin-key": adminKey } });
    if (res.ok) {
      const data = await res.json();
      setBookings(data.bookings || []);
    }
  }, [adminKey]);

  useEffect(() => {
    if (authenticated) {
      fetchSlots();
      fetchBookings();
    }
  }, [authenticated, fetchSlots, fetchBookings]);

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch("/api/bookings", {
      headers: { "x-admin-key": adminKey },
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      alert("Invalid admin key");
    }
    setLoading(false);
  };

  const addSlot = async () => {
    if (!newSlot.date) return;
    await fetch("/api/availability", {
      method: "POST",
      headers,
      body: JSON.stringify(newSlot),
    });
    fetchSlots();
    setNewSlot({ ...newSlot, date: "" });
  };

  const generateBulkSlots = async () => {
    if (!bulkDate) return;
    setLoading(true);

    const startMinutes =
      parseInt(bulkStart.split(":")[0]) * 60 + parseInt(bulkStart.split(":")[1]);
    const endMinutes =
      parseInt(bulkEnd.split(":")[0]) * 60 + parseInt(bulkEnd.split(":")[1]);

    for (let m = startMinutes; m + slotDuration <= endMinutes; m += slotDuration) {
      const startH = String(Math.floor(m / 60)).padStart(2, "0");
      const startM = String(m % 60).padStart(2, "0");
      const endM2 = m + slotDuration;
      const endH = String(Math.floor(endM2 / 60)).padStart(2, "0");
      const endMin = String(endM2 % 60).padStart(2, "0");

      await fetch("/api/availability", {
        method: "POST",
        headers,
        body: JSON.stringify({
          date: bulkDate,
          start_time: `${startH}:${startM}`,
          end_time: `${endH}:${endMin}`,
        }),
      });
    }

    fetchSlots();
    setLoading(false);
  };

  const deleteSlot = async (id: string) => {
    await fetch(`/api/availability?id=${id}`, {
      method: "DELETE",
      headers,
    });
    fetchSlots();
  };

  const formatDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-[#12121a] border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 text-sm mb-6">
            Enter your admin secret key to manage availability and bookings.
          </p>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Admin secret key"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 mb-4"
          />
          <button
            onClick={handleLogin}
            disabled={loading || !adminKey}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => {
              fetchSlots();
              fetchBookings();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <p className="text-sm text-gray-400">Open Slots</p>
            <p className="text-2xl font-bold">{slots.length}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <p className="text-sm text-gray-400">Total Bookings</p>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <p className="text-sm text-gray-400">This Week</p>
            <p className="text-2xl font-bold">
              {
                bookings.filter((b) => {
                  const d = new Date(b.created_at);
                  const now = new Date();
                  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  return d >= weekAgo;
                }).length
              }
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("availability")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "availability"
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Availability
          </button>
          <button
            onClick={() => setTab("bookings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "bookings"
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Users className="w-4 h-4" />
            Bookings
          </button>
        </div>

        {tab === "availability" && (
          <div className="space-y-6">
            {/* Add Single Slot */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add a Single Slot
              </h3>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={newSlot.date}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, date: e.target.value })
                    }
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Start</label>
                  <input
                    type="time"
                    value={newSlot.start_time}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, start_time: e.target.value })
                    }
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">End</label>
                  <input
                    type="time"
                    value={newSlot.end_time}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, end_time: e.target.value })
                    }
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={addSlot}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
                >
                  Add Slot
                </button>
              </div>
            </div>

            {/* Bulk Generate */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Bulk Generate Slots
              </h3>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={bulkDate}
                    onChange={(e) => setBulkDate(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    From
                  </label>
                  <input
                    type="time"
                    value={bulkStart}
                    onChange={(e) => setBulkStart(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">To</label>
                  <input
                    type="time"
                    value={bulkEnd}
                    onChange={(e) => setBulkEnd(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Duration (min)
                  </label>
                  <select
                    value={slotDuration}
                    onChange={(e) => setSlotDuration(parseInt(e.target.value))}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value={15} className="bg-[#12121a]">15 min</option>
                    <option value={30} className="bg-[#12121a]">30 min</option>
                    <option value={45} className="bg-[#12121a]">45 min</option>
                    <option value={60} className="bg-[#12121a]">60 min</option>
                  </select>
                </div>
                <button
                  onClick={generateBulkSlots}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>

            {/* Slot List */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <h3 className="font-semibold mb-4">Open Slots</h3>
              {slots.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No open slots. Add some above.
                </p>
              ) : (
                <div className="space-y-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          {formatDate(slot.date)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {formatTime(slot.start_time)} –{" "}
                          {formatTime(slot.end_time)}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSlot(slot.id)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No bookings yet</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-6 bg-white/[0.02] border border-white/5 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <Mail className="w-4 h-4" />
                        {booking.email}
                      </div>
                    </div>
                    {booking.availability && (
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-2 text-blue-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(booking.availability.date)}
                        </div>
                        <div className="text-gray-400 mt-1">
                          {formatTime(booking.availability.start_time)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {booking.company && (
                      <div>
                        <span className="text-gray-500">Company:</span>{" "}
                        <span className="text-gray-300">{booking.company}</span>
                      </div>
                    )}
                    {booking.phone && (
                      <div>
                        <span className="text-gray-500">Phone:</span>{" "}
                        <span className="text-gray-300">{booking.phone}</span>
                      </div>
                    )}
                    {booking.budget_range && (
                      <div>
                        <span className="text-gray-500">Budget:</span>{" "}
                        <span className="text-gray-300">
                          {booking.budget_range}
                        </span>
                      </div>
                    )}
                  </div>
                  {booking.project_description && (
                    <div className="mt-3 text-sm">
                      <span className="text-gray-500">Project:</span>{" "}
                      <span className="text-gray-300">
                        {booking.project_description}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 text-xs text-gray-600">
                    Booked{" "}
                    {new Date(booking.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
