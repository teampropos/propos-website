"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

function ResetPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!resetToken) {
      setError("This reset link is invalid or missing. Please request a new one.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { reset_token: resetToken, password });
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "That reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-semibold mb-2">Propos</p>
          <h1 className="font-heading text-[32px] font-semibold">Set a new password.</h1>
        </div>

        {done ? (
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Your password has been updated.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-[var(--color-text-primary)] text-white font-medium py-2.5 hover:bg-black transition-colors duration-150"
            >
              Log in
            </button>
          </div>
        ) : (
          <>
            {!resetToken && (
              <p className="text-sm text-red-500 text-center mb-6">
                This reset link is invalid or missing. Please request a new one from{" "}
                <Link href="/forgot-password" className="text-[var(--color-accent)] hover:underline">
                  the forgot password page
                </Link>
                .
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-[var(--color-border)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-[var(--color-border)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-text-primary)] text-white font-medium py-2.5 hover:bg-black transition-colors duration-150 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  );
}
