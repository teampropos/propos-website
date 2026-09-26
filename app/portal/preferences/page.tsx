"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Client {
  tone_preference: string | null;
  reply_cadence: string | null;
  owner_name: string | null;
  signoff_style: string | null;
  custom_instructions: string | null;
  business_name: string;
  business_type: string;
}

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

const CADENCES = [
  { value: "INSTANT", label: "Instantly", description: "The moment a positive review lands" },
  { value: "WITHIN_24H", label: "Within 24 hours", description: "A short, natural delay" },
  { value: "FEW_DAYS", label: "Within 3–4 days", description: "Batched every few days" },
  { value: "WEEKLY", label: "Weekly", description: "Once a week, Monday mornings" },
  { value: "MONTHLY", label: "Monthly", description: "Once a month, on the 1st" },
];

const SIGNOFF_STYLES = [
  { value: "NONE", label: "No sign-off", description: "The reply ends on its own — no name at all" },
  { value: "OWNER_NAME", label: "My name", description: "Sign off personally, e.g. “Cheers, Ben”" },
  { value: "BUSINESS_NAME", label: "Business name", description: "Sign off as the business, e.g. “The Ampic Group Team”" },
];

export default function PreferencesPage() {
  const [tone, setTone] = useState<string | null>(null);
  const [cadence, setCadence] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState("");
  const [signoffStyle, setSignoffStyle] = useState("NONE");
  const [customInstructions, setCustomInstructions] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Client>("/api/auth/me").then((c) => {
      setTone(c.tone_preference);
      setCadence(c.reply_cadence || "INSTANT");
      setOwnerName(c.owner_name || "");
      setSignoffStyle(c.signoff_style || "NONE");
      setCustomInstructions(c.custom_instructions || "");
      setLoading(false);
    });
  }, []);

  function handleSave() {
    setSaving(true);
    api.post("/api/preferences", {
      tone_preference: tone,
      reply_cadence: cadence,
      owner_name: ownerName,
      signoff_style: signoffStyle,
      custom_instructions: customInstructions,
    })
      .then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      })
      .finally(() => setSaving(false));
  }

  if (loading) {
    return <div className="p-8 text-sm text-[var(--color-text-secondary)]">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-[var(--color-text-primary)]">Preferences</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Customise how Propos sounds — and how often it posts — on your behalf.</p>
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 mb-4">
        <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-1">Reply tone</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Choose the voice that best suits your venue. Changing tone does not reset your reply history.
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`text-left border p-4 transition-colors duration-150 ${
                tone === t.value
                  ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-text-primary)]"
              }`}
            >
              <p className={`font-medium text-sm ${tone === t.value ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
                {t.label}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{t.description}</p>
            </button>
          ))}
        </div>

        {TONES.find((t) => t.value === tone) && (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">Sample reply</p>
            <p className="text-sm text-[var(--color-text-primary)] italic leading-relaxed">
              &ldquo;{TONES.find((t) => t.value === tone)?.sample}&rdquo;
            </p>
          </div>
        )}
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 mb-4">
        <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-1">Anything else Propos should know?</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
          Optional. Free-form guidance for how you&apos;d like replies to sound — a phrase you always use, something
          to avoid, a detail worth mentioning. This gets added to every reply Propos drafts.
        </p>
        <textarea
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="e.g. Mention we're dog-friendly when it's relevant. Keep it casual, not corporate."
          className="w-full border border-[var(--color-border)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)] resize-none"
        />
        <p className="text-xs text-[var(--color-text-secondary)] text-right mt-1">{customInstructions.length}/1000</p>
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 mb-4">
        <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-1">Reply speed</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          How quickly should Propos post replies to positive reviews? This doesn&apos;t affect
          negative reviews — those always wait for your approval, however fast this is set.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {CADENCES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCadence(c.value)}
              className={`text-left border p-4 transition-colors duration-150 ${
                cadence === c.value
                  ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-text-primary)]"
              }`}
            >
              <p className={`font-medium text-sm ${cadence === c.value ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
                {c.label}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{c.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 mb-6">
        <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-1">Sign-off</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          How should replies be signed off, if at all? Entirely your call — plenty of businesses prefer no
          personal name attached to public replies.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {SIGNOFF_STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => setSignoffStyle(s.value)}
              className={`text-left border p-4 transition-colors duration-150 ${
                signoffStyle === s.value
                  ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-text-primary)]"
              }`}
            >
              <p className={`font-medium text-sm ${signoffStyle === s.value ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
                {s.label}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{s.description}</p>
            </button>
          ))}
        </div>

        {signoffStyle === "OWNER_NAME" && (
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Your name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g. Marco"
              className="w-full border border-[var(--color-border)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2.5 bg-[var(--color-text-primary)] text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-60"
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save preferences"}
      </button>
    </div>
  );
}
