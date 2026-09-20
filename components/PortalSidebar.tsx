"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  Clock,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { clearToken } from "@/lib/api";

const nav = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/reviews", label: "Reviews", icon: Star },
  { href: "/portal/pending", label: "Pending Approvals", icon: Clock },
  { href: "/portal/locations", label: "Locations", icon: MapPin },
  { href: "/portal/billing", label: "Billing", icon: CreditCard },
  { href: "/portal/preferences", label: "Preferences", icon: Settings },
];

export default function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  return (
    <aside className="w-60 shrink-0 min-h-screen bg-[var(--color-text-primary)] flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/portal/dashboard" className="font-heading text-xl font-semibold text-white">
          Propos
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-white/10 text-white border-l-2 border-[var(--color-accent)] -ml-0.5"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-150 w-full"
        >
          <LogOut size={18} strokeWidth={1.75} />
          Log out
        </button>
      </div>
    </aside>
  );
}
