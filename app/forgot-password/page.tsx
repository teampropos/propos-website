"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
    } catch {
      // Backend always returns 200 to avoid email enumeration — nothing to
      // show differently here even if this somehow throws.
    } finally {
      setLoading(false);
      setSent(true);
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-semibold mb-2">Propos</p>
          <h1 className="font-heading text-[32px] font-semibold">Reset your password.</h1>
        </div>

        {sent ? (
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              If an account exists for <span className="text-[var(--color-text-primary)]">{email}</span>, we&apos;ve
              sent a link to reset your password. It usually arrives within a minute or two — check your spam
              folder if you don&apos;t see it.
            </p>
            <Link href="/login" className="inline-block mt-6 text-sm text-[var(--color-accent)] hover:underline">
              &larr; Back to login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--color-text-secondary)] text-center mb-6">
              Enter the email you signed up with and we&apos;ll send you a link to reset your password.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[var(--color-border)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
                  placeholder="you@business.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-text-primary)] text-white font-medium py-2.5 hover:bg-black transition-colors duration-150 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
              <Link href="/login" className="text-[var(--color-accent)] hover:underline">
                &larr; Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
