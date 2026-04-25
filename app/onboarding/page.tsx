"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, setToken, getToken } from "@/lib/api";
import { CheckCircle } from "lucide-react";

const TONES = [
  {
    value: "WARM_FRIENDLY",
    label: "Warm & Friendly",
    description: "Conversational, approachable, local feel",
    sample: "Thanks so much for visiting us, [Name]! We're really glad you enjoyed your experience and hope to see you again soon.",
  },
  {
    value: "PROFESSIONAL",
    label: "Professional",
    description: "Polished, courteous — suits hotels and fine dining",
    sample: "Thank you for your kind review, [Name]. We are delighted to hear you had an exceptional experience and look forward to welcoming you again.",
  },
  {
    value: "ENTHUSIASTIC",
    label: "Enthusiastic",
    description: "High energy, extra grateful — great for cafes",
    sample: "Wow, thank you [Name]! Reviews like yours absolutely make our day. We can't wait to have you back!",
  },
  {
    value: "RELAXED_CASUAL",
    label: "Relaxed & Casual",
    description: "Laid-back, informal — suits bars and pubs",
    sample: "Cheers [Name]! Really stoked you had a good time. Come back and see us anytime.",
  },
];

const STEPS = [
  "Set password",
  "Connect Google",
  "Choose tone",
  "Your name",
  "Review backlog",
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
              i < current
                ? "bg-[#2563EB] text-white"
                : i === current
                ? "bg-[#2563EB] text-white"
                : "bg-[#E5E7EB] text-[#6B7280]"
            }`}
          >
            {i < current ? <CheckCircle size={14} /> : i + 1}
          </div>
          <span className={`text-xs hidden sm:block ${i === current ? "text-[#111827] font-medium" : "text-[#6B7280]"}`}>
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-6 ${i < current ? "bg-[#2563EB]" : "bg-[#E5E7EB]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setupToken = searchParams.get("token");

  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tone, setTone] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in and onboarding complete, go to portal
    const token = getToken();
    if (token) {
      api.get<{ onboarding_complete: boolean }>("/api/auth/me")
        .then((c) => { if (c.onboarding_complete) router.replace("/portal/dashboard"); })
        .catch(() => {});
    }
  }, [router]);

  async function handleSetPassword() {
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords don't match."); return; }
    setLoading(true);
    try {
      const res = await api.post<{ token: string }>("/api/auth/set-password", {
        setup_token: setupToken,
        password,
      });
      setToken(res.token);
      setStep(1);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePreferences() {
    setLoading(true);
    try {
      await api.post("/api/preferences", { tone_preference: tone, owner_name: ownerName });
      setStep(4);
    } catch {
      setError("Something went wrong saving your preferences.");
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete(withBacklog: boolean) {
    setLoading(true);
    try {
      await api.post("/api/onboarding/complete", { backlog: withBacklog });
      router.push("/portal/dashboard");
    } catch {
      router.push("/portal/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-bold text-[#111827]">Propos</p>
          <p className="text-[#6B7280] mt-1 text-sm">Let&apos;s get you set up.</p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8">

          {/* Step 0: Set password */}
          {step === 0 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#111827] mb-1">Create your password</h2>
              <p className="text-sm text-[#6B7280] mb-6">You&apos;ll use this to log into Propos.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  onClick={handleSetPassword}
                  disabled={loading}
                  className="w-full bg-[#2563EB] text-white font-medium py-2.5 rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-60"
                >
                  {loading ? "Setting up..." : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Connect Google */}
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#111827] mb-1">Connect Google Business Profile</h2>
              <p className="text-sm text-[#6B7280] mb-6">
                Propos needs access to your Google Business Profile to pull reviews and post replies.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800 font-medium mb-1">Coming very soon</p>
                <p className="text-sm text-yellow-700">
                  We&apos;re finalising our Google API approval. You&apos;ll receive an email the moment it&apos;s ready to connect — usually within a few days.
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#2563EB] text-white font-medium py-2.5 rounded-lg hover:bg-[#1D4ED8] transition-colors"
              >
                Continue for now
              </button>
            </div>
          )}

          {/* Step 2: Choose tone */}
          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#111827] mb-1">Choose your reply tone</h2>
              <p className="text-sm text-[#6B7280] mb-6">
                Pick the voice that best suits your venue. You can change this anytime.
              </p>

              <div className="flex flex-col gap-3 mb-5">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`text-left border rounded-xl p-4 transition-colors ${
                      tone === t.value ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E5E7EB] hover:border-[#2563EB]/50"
                    }`}
                  >
                    <p className={`font-medium text-sm ${tone === t.value ? "text-[#2563EB]" : "text-[#111827]"}`}>
                      {t.label}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{t.description}</p>
                  </button>
                ))}
              </div>

              {tone && (
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 mb-5">
                  <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2">Sample reply</p>
                  <p className="text-sm text-[#374151] italic leading-relaxed">
                    &ldquo;{TONES.find((t2) => t2.value === tone)?.sample}&rdquo;
                  </p>
                </div>
              )}

              <button
                onClick={() => tone && setStep(3)}
                disabled={!tone}
                className="w-full bg-[#2563EB] text-white font-medium py-2.5 rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-60"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 3: Owner name */}
          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#111827] mb-1">Your name</h2>
              <p className="text-sm text-[#6B7280] mb-6">
                Optional. If added, replies will be signed off with your name.
              </p>

              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. Marco"
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] mb-5"
              />

              {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

              <button
                onClick={handleSavePreferences}
                disabled={loading}
                className="w-full bg-[#2563EB] text-white font-medium py-2.5 rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-60"
              >
                {loading ? "Saving..." : "Continue"}
              </button>
            </div>
          )}

          {/* Step 4: Backlog */}
          {step === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#111827] mb-1">Reply to your existing reviews?</h2>
              <p className="text-sm text-[#6B7280] mb-6">
                Propos can work through your backlog of unanswered reviews — generating a reply for each one for your approval. One-time fee based on volume.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "1–25 reviews", price: "$49" },
                  { label: "26–100 reviews", price: "$99" },
                  { label: "101–200 reviews", price: "$149" },
                  { label: "200+ reviews", price: "$199" },
                ].map((tier) => (
                  <div key={tier.label} className="border border-[#E5E7EB] rounded-xl p-4 text-center">
                    <p className="text-sm text-[#6B7280]">{tier.label}</p>
                    <p className="font-heading text-xl font-bold text-[#111827] mt-1">{tier.price}</p>
                    <p className="text-xs text-[#6B7280]">one-time</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleComplete(true)}
                  disabled={loading}
                  className="w-full bg-[#2563EB] text-white font-medium py-2.5 rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-60"
                >
                  Yes, reply to my backlog
                </button>
                <button
                  onClick={() => handleComplete(false)}
                  disabled={loading}
                  className="w-full bg-white border border-[#E5E7EB] text-[#6B7280] font-medium py-2.5 rounded-lg hover:border-[#111827] hover:text-[#111827] transition-colors"
                >
                  No thanks, skip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingInner />
    </Suspense>
  );
}
