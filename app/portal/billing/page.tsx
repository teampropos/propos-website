"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CreditCard, ExternalLink } from "lucide-react";

interface Client {
  founder_tier: boolean;
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
        <h1 className="font-heading text-3xl font-bold text-[#111827]">Billing</h1>
        <p className="text-[#6B7280] mt-1">Manage your subscription and payment details.</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
            <CreditCard size={20} className="text-[#2563EB]" />
          </div>
          <div>
            <p className="font-medium text-[#111827]">Current plan</p>
            {client ? (
              <p className="text-sm text-[#6B7280]">
                {client.founder_tier ? "Founder — $12.99/month" : "Standard — $19.99/month"}
              </p>
            ) : (
              <p className="text-sm text-[#6B7280]">Loading...</p>
            )}
          </div>
          {client?.founder_tier && (
            <span className="ml-auto bg-[#EFF6FF] text-[#2563EB] text-xs font-medium px-2.5 py-1 rounded-full">
              Founder
            </span>
          )}
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            api.post<{ url: string }>("/api/billing/portal", {})
              .then(({ url }) => window.open(url, "_blank"))
              .catch(() => alert("Unable to open billing portal. Please contact support@getpropos.com"));
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors"
        >
          Manage billing <ExternalLink size={14} />
        </a>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
        <p className="font-medium text-[#111827] mb-1">Need help?</p>
        <p className="text-sm text-[#6B7280]">
          Email us at{" "}
          <a href="mailto:support@getpropos.com" className="text-[#2563EB] hover:underline">
            support@getpropos.com
          </a>
        </p>
      </div>
    </div>
  );
}
