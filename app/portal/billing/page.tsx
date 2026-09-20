"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CreditCard, ExternalLink } from "lucide-react";

interface Client {
  email: string;
}

export default function BillingPage() {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    api.get<Client>("/api/auth/me").then(setClient);
  }, []);

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-[var(--color-text-primary)]">Billing</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Manage your subscription and payment details.</p>
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard size={20} className="text-[var(--color-accent)]" strokeWidth={1.75} />
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">Current plan</p>
            {client ? (
              <p className="text-sm text-[var(--color-text-secondary)]">$12/month, plus $6/month per additional location</p>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">Loading...</p>
            )}
          </div>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            api.post<{ url: string }>("/api/billing/portal", {})
              .then(({ url }) => window.open(url, "_blank"))
              .catch(() => alert("Unable to open billing portal. Please contact support@getpropos.com"));
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-text-primary)] text-white text-sm font-medium hover:bg-black transition-colors"
        >
          Manage billing <ExternalLink size={14} />
        </a>
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6">
        <p className="font-medium text-[var(--color-text-primary)] mb-1">Need help?</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Email us at{" "}
          <a href="mailto:support@getpropos.com" className="text-[var(--color-accent)] hover:underline">
            support@getpropos.com
          </a>
        </p>
      </div>
    </div>
  );
}
