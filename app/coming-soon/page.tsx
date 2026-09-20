"use client";

import Link from "next/link";
import { useState } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message === "Already on the list" ? "You're already on the list!" : "You're in! We'll email you at launch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Please enter a valid email.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-24 px-6">
      <div className="text-center max-w-[480px]">
        <p className="font-heading text-2xl font-semibold mb-2">Propos</p>
        <h1 className="font-heading text-[36px] md:text-[48px] font-semibold leading-tight mb-4">
          Coming soon.
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
          We&rsquo;re putting the finishing touches on Propos. Leave your email
          and we&rsquo;ll let you know the moment we launch.
        </p>

        {status === "success" ? (
          <div className="border border-[var(--color-border)] px-6 py-4 mb-6">
            <p className="text-[var(--color-text-primary)] font-medium">{message}</p>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 max-w-[400px] mx-auto mb-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@business.com"
              className="flex-1 border border-[var(--color-border)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[var(--color-text-primary)] text-white font-medium text-sm px-6 py-2.5 hover:bg-black transition-colors duration-150 whitespace-nowrap disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Notify me"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-red-500 mb-4">{message}</p>
        )}

        <p className="text-sm text-[var(--color-text-secondary)]">
          No spam. Just a one-time launch email.
        </p>
        <Link href="/" className="inline-block mt-8 text-sm text-[var(--color-accent)] hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </section>
  );
}
