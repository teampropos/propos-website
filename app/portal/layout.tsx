"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, api } from "@/lib/api";
import PortalSidebar from "@/components/PortalSidebar";

interface Client {
  id: number;
  email: string;
  business_name: string;
  onboarding_complete: boolean;
  gbp_connected: boolean;
  google_needs_reconnect: boolean;
  subscribed: boolean;
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [subscribed, setSubscribed] = useState(true);
  const [needsReconnect, setNeedsReconnect] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    api.get<Client>("/api/auth/me")
      .then((client) => {
        // Full onboarding isn't required to browse the portal — only having
        // connected Google, so a client can see reviews and draft replies
        // before subscribing. Someone who hasn't connected anything yet has
        // nothing to look at, so send them back into the wizard.
        if (!client.onboarding_complete && !client.gbp_connected) {
          router.replace("/onboarding");
          return;
        }
        setSubscribed(client.subscribed);
        setNeedsReconnect(client.google_needs_reconnect);
        setReady(true);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
        <div className="w-6 h-6 border-2 border-[var(--color-text-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <PortalSidebar />
      <div className="flex-1 overflow-auto">
        {needsReconnect && (
          <div className="bg-orange-600 text-white text-sm px-6 py-2.5 flex items-center justify-between gap-4">
            <span>Propos lost access to your Google Business Profile &mdash; reviews have stopped being read or replied to.</span>
            <a href="/portal/locations" className="underline font-medium whitespace-nowrap">Reconnect &rarr;</a>
          </div>
        )}
        {!subscribed && (
          <div className="bg-[var(--color-accent)] text-white text-sm px-6 py-2.5 flex items-center justify-between gap-4">
            <span>Preview mode &mdash; Propos isn&rsquo;t posting live yet. Subscribe to turn on auto-replies.</span>
            <a href="/onboarding" className="underline font-medium whitespace-nowrap">Subscribe &rarr;</a>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
