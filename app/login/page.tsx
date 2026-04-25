"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, setToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post<{ token: string; onboarding_complete: boolean }>(
        "/api/auth/login",
        { email, password }
      );
      setToken(res.token);
      if (res.onboarding_complete) {
        router.push("/portal/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-bold mb-2">Propos</p>
          <h1 className="font-heading text-[32px] font-bold">Welcome back.</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
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
              className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              placeholder="you@business.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[var(--color-accent)] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-accent)] text-white font-medium py-2.5 rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors duration-150 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/coming-soon" className="text-[var(--color-accent)] hover:underline">
            Get started &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
