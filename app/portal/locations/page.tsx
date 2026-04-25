"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { MapPin, CheckCircle, XCircle } from "lucide-react";

interface Location {
  id: number;
  name: string;
  city: string;
  tone_preference: string | null;
  active: boolean;
}

const TONE_LABELS: Record<string, string> = {
  WARM_FRIENDLY: "Warm & Friendly",
  PROFESSIONAL: "Professional",
  ENTHUSIASTIC: "Enthusiastic",
  RELAXED_CASUAL: "Relaxed & Casual",
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Location[]>("/api/locations")
      .then(setLocations)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#111827]">Locations</h1>
          <p className="text-[#6B7280] mt-1">Manage the venues Propos is monitoring.</p>
        </div>
        <a
          href="/portal/billing"
          className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors"
        >
          + Add location
        </a>
      </div>

      {loading ? (
        <div className="text-sm text-[#6B7280]">Loading...</div>
      ) : locations.length === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">
          <MapPin size={32} className="text-[#E5E7EB] mx-auto mb-3" />
          <p className="text-[#6B7280] text-sm">No locations connected yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[#111827]">{loc.name}</p>
                  <p className="text-sm text-[#6B7280]">{loc.city}</p>
                  {loc.tone_preference && (
                    <p className="text-xs text-[#6B7280] mt-1">
                      Tone: {TONE_LABELS[loc.tone_preference] || loc.tone_preference}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {loc.active ? (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-sm text-green-600 font-medium">Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">Inactive</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-[#6B7280] mt-6">
        Additional locations are $12.99/month each. Manage billing to add or remove.
      </p>
    </div>
  );
}
