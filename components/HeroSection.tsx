"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)]" />

      <div className="relative max-w-[1100px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)] mb-4">
            Built for restaurants, cafes &amp; hospitality
          </p>

          <h1 className="font-heading text-[40px] md:text-[64px] font-bold leading-[1.1] text-[var(--color-text-primary)] mb-6">
            Every Google review<br />
            replied to — on autopilot.
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-[560px] mx-auto leading-relaxed mb-4">
            Reply to every review instantly, build trust, and win more
            customers — without lifting a finger.
          </p>

          <p className="text-sm text-[var(--color-text-secondary)] mb-8">
            From $12.99/month. Cancel anytime.
          </p>

          {/* Urgency — emotional punch */}
          <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Your competitors are replying. Are you?
          </p>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <p className="text-sm text-[var(--color-text-secondary)]">
              78% of customers read reviews before choosing a business.
              Every unanswered review is costing you customers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/coming-soon"
              className="inline-flex items-center justify-center text-base font-semibold bg-[var(--color-accent)] text-white px-8 py-3.5 rounded-lg shadow-sm hover:bg-[var(--color-accent-hover)] transition-colors duration-150"
            >
              Automate my reviews
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center text-base font-medium border border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors duration-150"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        {/* Before / After showcase — moved up tight, made bigger */}
        <motion.div
          className="mt-12 max-w-[880px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          {/* Rating improvement banner */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center px-6 py-3 bg-red-50 rounded-xl">
              <p className="text-[10px] uppercase tracking-wide text-red-400 font-medium mb-1">Before Propos</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-heading text-3xl font-bold text-red-400">4.1</span>
                <span className="text-yellow-400 text-xl">&#9733;</span>
              </div>
              <p className="text-xs text-red-400 mt-1">12% reply rate</p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <svg width="48" height="16" viewBox="0 0 48 16" fill="none" className="text-[var(--color-accent)]">
                <path d="M4 8h36M36 3l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center px-6 py-3 bg-green-50 rounded-xl">
              <p className="text-[10px] uppercase tracking-wide text-green-600 font-medium mb-1">With Propos</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-heading text-3xl font-bold text-green-700">4.6</span>
                <span className="text-yellow-400 text-xl">&#9733;</span>
              </div>
              <p className="text-xs text-green-600 font-medium mt-1">100% reply rate</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Before card — unanswered review */}
            <div className="relative bg-white border border-[var(--color-border)] rounded-xl shadow-sm p-7 opacity-55">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-semibold uppercase tracking-wide bg-red-50 text-red-500 px-2.5 py-1 rounded-full">
                  Unanswered
                </span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-400">
                  JL
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">James Liu</p>
                  <p className="text-yellow-400 text-sm">&#9733;&#9733;&#9733;&#9733;&#9734;</p>
                </div>
              </div>
              <p className="text-[15px] text-gray-400 leading-relaxed">
                &ldquo;Great coffee and friendly staff. Nice spot for a weekend brunch.&rdquo;
              </p>
              <div className="border-t border-dashed border-gray-200 mt-5 pt-4">
                <p className="text-xs text-gray-300 italic">No reply — 3 weeks ago</p>
              </div>
            </div>

            {/* After card — Propos auto-reply */}
            <div className="relative bg-white border-2 border-[var(--color-accent)] rounded-xl shadow-xl p-7">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-semibold uppercase tracking-wide bg-green-50 text-green-600 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                  Replied in 30 seconds
                </span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-[var(--color-accent)]">
                  SM
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Mitchell</p>
                  <p className="text-yellow-500 text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                </div>
              </div>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-5">
                &ldquo;Absolutely incredible experience! The wagyu steak was cooked to
                perfection and the tiramisu was the best I&rsquo;ve ever had.&rdquo;
              </p>
              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wide">Auto-replied by Propos</p>
                </div>
                <p className="text-[15px] text-[var(--color-text-primary)] leading-relaxed">
                  Sarah, we&rsquo;re thrilled the wagyu and tiramisu hit the spot! Tom will
                  be chuffed to hear he looked after you so well. Can&rsquo;t wait to see
                  you both for the next anniversary.
                </p>
                <p className="text-[15px] text-[var(--color-text-primary)] mt-2">Cheers, Marco</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
