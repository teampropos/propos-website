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
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    api.get<Client>("/api/auth/me")
      .then((client) => {
        if (!client.onboarding_complete) {
          router.replace("/onboarding");
          return;
        }
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
        {children}
      </div>
    </div>
  );
}
