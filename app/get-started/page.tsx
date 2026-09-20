"use client";

import { useState } from "react";

const BUSINESS_TYPES = [
  "Restaurant",
  "Cafe",
  "Bar",
  "Hotel",
  "Pub",
  "Bakery",
  "Other",
];

export default function GetStartedPage() {
  const [form, setForm] = useState({
    email: "",
    business_name: "",
    business_type: "Restaurant",
    city: "",
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
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a href="/" className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
            Propos
          </a>
          <h1 className="font-heading text-2xl font-semibold text-[var(--color-text-primary)] mt-6 mb-2">
            Get started
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Tell us about your business and we&apos;ll set everything up.
          </p>
        </div>

        <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-8">
          <div className="mb-6 border border-[var(--color-border)] p-3">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">$12/month</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Additional locations $6/month each</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                Your email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                Business name
              </label>
              <input
                type="text"
                required
                value={form.business_name}
                onChange={(e) => set("business_name", e.target.value)}
                placeholder="The Harbour Kitchen"
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                Business type
              </label>
              <select
                value={form.business_type}
                onChange={(e) => set("business_type", e.target.value)}
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)] bg-[var(--color-paper)]"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                City
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Townsville"
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-text-primary)] text-white text-sm font-medium py-3 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Redirecting to checkout..." : "Continue to payment"}
            </button>
          </form>

          <p className="text-xs text-[var(--color-text-secondary)] text-center mt-4">
            Payments handled securely by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
