"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
        <div
          className="bg-[#12121a] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You&apos;re In!</h3>
          <p className="text-gray-400 mb-6">
            Check your inbox for a confirmation. We&apos;ll be in touch soon to discuss
            how we can help your business grow.
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
        className="bg-[#12121a] border border-white/10 rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">Join the Waitlist</h3>
            <p className="text-gray-400 text-sm mt-1">
              Get priority access when we open new project slots
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              Email Address *
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company Name
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
              What are you most interested in?
            </label>
            <select
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none"
            >
              <option value="" className="bg-[#12121a]">Select one...</option>
              <option value="ai-automation" className="bg-[#12121a]">AI & Automation</option>
              <option value="saas-development" className="bg-[#12121a]">SaaS / Web App Development</option>
              <option value="both" className="bg-[#12121a]">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tell us briefly about your project
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="I'm looking to automate..."
            />
          </div>

          {errorMsg && (
            <p className="text-red-400 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the Waitlist"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            No spam, ever. We&apos;ll only reach out about your project.
          </p>
        </form>
      </div>
    </div>
  );
}
