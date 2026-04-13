"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl font-bold text-[var(--color-text-primary)]">
          Propos
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150">
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150">
            Log in
          </Link>
          <Link
            href="/coming-soon"
            className="text-sm font-medium bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[var(--color-accent-hover)] transition-colors duration-150"
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[var(--color-text-primary)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white px-6 py-4 flex flex-col gap-4">
          <Link href="/pricing" className="text-sm text-[var(--color-text-secondary)]" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-[var(--color-text-secondary)]" onClick={() => setMobileOpen(false)}>
            Log in
          </Link>
          <Link
            href="/coming-soon"
            className="text-sm font-medium bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-lg text-center shadow-sm"
            onClick={() => setMobileOpen(false)}
          >
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
