"use client";

import { motion } from "framer-motion";

const tiers = [
  { range: "1–25 reviews", price: "$49", note: "one-time" },
  { range: "26–100 reviews", price: "$99", note: "one-time" },
  { range: "101–200 reviews", price: "$149", note: "one-time" },
  { range: "200+ reviews", price: "$199", note: "capped at 200" },
];

export default function BacklogPricing() {
  return (
    <div className="max-w-[900px] mx-auto">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-[28px] md:text-[36px] font-bold mb-3">
          Got unanswered reviews?
        </h2>
        <p className="text-[var(--color-text-secondary)] text-lg">
          We&rsquo;ll catch up on your existing reviews in one go. One-time fee, no ongoing cost.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.range}
            className="border border-[var(--color-border)] rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">{tier.range}</p>
            <p className="font-heading text-2xl font-bold mb-1">{tier.price}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{tier.note}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-[13px] text-[var(--color-text-secondary)] mt-6">
        Backlog processing is available at checkout after selecting your plan.
      </p>
    </div>
  );
}
