"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Client {
  tone_preference: string | null;
  owner_name: string | null;
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

export default function PreferencesPage() {
  const [tone, setTone] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Client>("/api/auth/me").then((c) => {
      setTone(c.tone_preference);
      setOwnerName(c.owner_name || "");
      setLoading(false);
    });
  }, []);

  function handleSave() {
    setSaving(true);
    api.post("/api/preferences", { tone_preference: tone, owner_name: ownerName })
      .then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      })
      .finally(() => setSaving(false));
  }

  if (loading) {
    return <div className="p-8 text-sm text-[#6B7280]">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#111827]">Preferences</h1>
        <p className="text-[#6B7280] mt-1">Customise how Propos sounds on your behalf.</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-4">
        <h2 className="font-heading text-lg font-bold text-[#111827] mb-1">Reply tone</h2>
        <p className="text-sm text-[#6B7280] mb-4">
          Choose the voice that best suits your venue. Changing tone does not reset your reply history.
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`text-left border rounded-xl p-4 transition-colors duration-150 ${
                tone === t.value
                  ? "border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E5E7EB] hover:border-[#2563EB]/50"
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
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
            <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2">Sample reply</p>
            <p className="text-sm text-[#374151] italic leading-relaxed">
              &ldquo;{TONES.find((t) => t.value === tone)?.sample}&rdquo;
            </p>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-6">
        <h2 className="font-heading text-lg font-bold text-[#111827] mb-1">Owner name</h2>
        <p className="text-sm text-[#6B7280] mb-3">
          If provided, replies will be signed off with your name.
        </p>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="e.g. Marco"
          className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-60"
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save preferences"}
      </button>
    </div>
  );
}
