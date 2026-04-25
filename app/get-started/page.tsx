"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BUSINESS_TYPES = [
  "Restaurant",
  "Cafe",
  "Bar",
  "Hotel",
  "Pub",
  "Bakery",
  "Other",
];

function GetStartedForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") === "founder" ? "founder" : "standard";

  const [form, setForm] = useState({
    email: "",
    business_name: "",
    business_type: "Restaurant",
    city: "",
    plan: initialPlan,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a href="/" className="font-heading text-xl font-bold text-[#111827]">
            Propos
          </a>
          <h1 className="font-heading text-2xl font-bold text-[#111827] mt-6 mb-2">
            Get started
          </h1>
          <p className="text-[#6B7280] text-sm">
            Tell us about your business and we&apos;ll set everything up.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8">
          {/* Plan toggle */}
          <div className="mb-6">
            <p className="text-sm font-medium text-[#111827] mb-2">Choose your plan</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => set("plan", "founder")}
                className={`border rounded-xl p-3 text-left transition-colors ${
                  form.plan === "founder"
                    ? "border-[#2563EB] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] hover:border-[#2563EB]"
                }`}
              >
                <p className="text-sm font-bold text-[#111827]">$12.99/mo</p>
                <p className="text-xs text-[#6B7280]">Founder — first 50 only</p>
              </button>
              <button
                type="button"
                onClick={() => set("plan", "standard")}
                className={`border rounded-xl p-3 text-left transition-colors ${
                  form.plan === "standard"
                    ? "border-[#2563EB] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] hover:border-[#2563EB]"
                }`}
              >
                <p className="text-sm font-bold text-[#111827]">$19.99/mo</p>
                <p className="text-xs text-[#6B7280]">Standard</p>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Your email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Business name
              </label>
              <input
                type="text"
                required
                value={form.business_name}
                onChange={(e) => set("business_name", e.target.value)}
                placeholder="The Harbour Kitchen"
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Business type
              </label>
              <select
                value={form.business_type}
                onChange={(e) => set("business_type", e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                City
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Townsville"
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Redirecting to checkout..." : "Continue to payment"}
            </button>
          </form>

          <p className="text-xs text-[#9CA3AF] text-center mt-4">
            Payments handled securely by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense>
      <GetStartedForm />
    </Suspense>
  );
}
