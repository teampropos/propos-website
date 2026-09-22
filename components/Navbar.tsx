"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-paper)] border-b border-[var(--color-border)]">
      <div className="max-w-[1160px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link href="/" className="font-heading text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">
          Propos
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150">
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150">
            Log in
          </Link>
          <Link
            href="/get-started"
            className="text-sm font-medium bg-[var(--color-text-primary)] text-white px-5 py-2.5 hover:bg-black transition-colors duration-150"
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
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-4 flex flex-col gap-4">
          <Link href="/pricing" className="text-sm text-[var(--color-text-secondary)]" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-[var(--color-text-secondary)]" onClick={() => setMobileOpen(false)}>
            Log in
          </Link>
          <Link
            href="/get-started"
            className="text-sm font-medium bg-[var(--color-text-primary)] text-white px-5 py-2.5 text-center"
            onClick={() => setMobileOpen(false)}
          >
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
