"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-[var(--color-accent)] py-16 md:py-24">
      <motion.div
        className="max-w-[1100px] mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-white mb-4">
          Start replying to every review today.
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-[480px] mx-auto">
          Join hospitality businesses already on autopilot. No lock-in, cancel anytime.
        </p>
        <Link
          href="/coming-soon"
          className="inline-flex items-center justify-center text-base font-medium bg-white text-[var(--color-accent)] px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors duration-150"
        >
          Automate my reviews
        </Link>
      </motion.div>
    </section>
  );
}
