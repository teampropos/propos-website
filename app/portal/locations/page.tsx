"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { MapPin, CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface Location {
  id: number;
  name: string;
  city: string;
  tone_preference: string | null;
  active: boolean;
}

interface Client {
  gbp_connected: boolean;
}

const TONE_LABELS: Record<string, string> = {
  WARM_FRIENDLY: "Warm & Friendly",
  PROFESSIONAL: "Professional",
  ENTHUSIASTIC: "Enthusiastic",
  RELAXED_CASUAL: "Relaxed & Casual",
};

function LocationsPageInner() {
  const searchParams = useSearchParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [gbpConnected, setGbpConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);

  function loadLocations() {
    return api.get<Location[]>("/api/locations").then(setLocations);
  }

  useEffect(() => {
    Promise.all([
      loadLocations(),
      api.get<Client>("/api/auth/me").then((c) => setGbpConnected(c.gbp_connected)),
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchParams.get("gbp_error")) {
      setConnectError(true);
    }
  }, [searchParams]);

  async function handleConnect() {
    setConnecting(true);
    setConnectError(false);
    try {
      const { url } = await api.get<{ url: string }>("/api/auth/google/connect?redirect=/portal/locations");
      window.location.href = url;
    } catch {
      setConnecting(false);
      setConnectError(true);
    }
  }

  async function handleAddLocation(e: React.FormEvent) {
    e.preventDefault();
    setAddSaving(true);
    setAddError("");
    try {
      await api.post("/api/locations", { name: newName, city: newCity });
      setNewName("");
      setNewCity("");
      setShowAddForm(false);
      await loadLocations();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to add location");
    } finally {
      setAddSaving(false);
    }
  }

  async function handleRemoveLocation(id: number) {
    setRemovingId(id);
    try {
      await api.delete(`/api/locations/${id}`);
      await loadLocations();
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[var(--color-text-primary)]">Locations</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Manage the venues Propos is monitoring.</p>
        </div>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="px-4 py-2 bg-[var(--color-text-primary)] text-white text-sm font-medium hover:bg-black transition-colors"
        >
          {showAddForm ? "Cancel" : "+ Add location"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddLocation} className="border border-[var(--color-border)] p-5 mb-6 flex flex-col gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Venue name"
              className="border border-[var(--color-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
            />
            <input
              type="text"
              required
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="City"
              className="border border-[var(--color-border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-text-primary)]"
            />
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Adding a location adds $6/month to your subscription, effective immediately.
          </p>
          {addError && <p className="text-sm text-red-600">{addError}</p>}
          <button
            type="submit"
            disabled={addSaving}
            className="self-start px-4 py-2 bg-[var(--color-text-primary)] text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-50"
          >
            {addSaving ? "Adding..." : "Add location"}
          </button>
        </form>
      )}

      {connectError && (
        <div className="flex items-center gap-2 border border-red-300 text-red-700 text-sm p-3 mb-6">
          <AlertCircle size={16} />
          Couldn&apos;t connect your Google Business Profile. Please try again.
        </div>
      )}

      {!loading && (
        <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {gbpConnected ? (
              <CheckCircle size={20} className="text-green-700" strokeWidth={1.75} />
            ) : (
              <XCircle size={20} className="text-[var(--color-text-secondary)]" strokeWidth={1.75} />
            )}
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Google Business Profile</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {gbpConnected
                  ? "Connected — Propos can read and reply to your reviews."
                  : "Connect your Google account so Propos can manage your reviews."}
              </p>
            </div>
          </div>
          {!gbpConnected && (
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="px-4 py-2 bg-[var(--color-text-primary)] text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {connecting ? "Connecting..." : "Connect Google"}
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-[var(--color-text-secondary)]">Loading...</div>
      ) : locations.length === 0 ? (
        <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-8 text-center">
          <MapPin size={32} className="text-[var(--color-border)] mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-[var(--color-text-secondary)] text-sm">No locations connected yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-[var(--color-paper)] border border-[var(--color-border)] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{loc.name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{loc.city}</p>
                  {loc.tone_preference && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      Tone: {TONE_LABELS[loc.tone_preference] || loc.tone_preference}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {loc.active ? (
                    <>
                      <CheckCircle size={16} className="text-green-700" strokeWidth={1.75} />
                      <span className="text-sm text-green-700 font-medium">Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-[var(--color-text-secondary)]" strokeWidth={1.75} />
                      <span className="text-sm text-[var(--color-text-secondary)]">Inactive</span>
                    </>
                  )}
                  {loc.active && (
                    <button
                      onClick={() => handleRemoveLocation(loc.id)}
                      disabled={removingId === loc.id}
                      title="Remove location"
                      className="text-[var(--color-text-secondary)] hover:text-red-600 disabled:opacity-50"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-[var(--color-text-secondary)] mt-6">
        Additional locations are $6/month each, billed on your existing subscription.
      </p>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <Suspense>
      <LocationsPageInner />
    </Suspense>
  );
}
