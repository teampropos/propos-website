"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingFull() {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Founder card */}
        <motion.div
          className="relative border-2 border-[var(--color-accent)] rounded-xl p-8 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute -top-3 left-6 bg-[var(--color-accent)] text-white text-xs font-medium px-3 py-1 rounded-full">
            Founder — First 50 only
          </span>
          <div className="mt-2">
            <p className="font-heading text-3xl font-bold mb-1">$12.99<span className="text-base font-normal text-[var(--color-text-secondary)]">/month</span></p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Locked in for life</p>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited review replies",
                "Negative review approval flow",
                "Tone personalisation",
                "Monthly win report",
                "Weekly email updates",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-[var(--color-accent)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started?plan=founder"
              className="block text-center text-sm font-medium bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg shadow-sm hover:bg-[var(--color-accent-hover)] transition-colors duration-150"
            >
              Claim your spot
            </Link>
          </div>
        </motion.div>

        {/* Standard card */}
        <motion.div
          className="border border-[var(--color-border)] rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="font-heading text-3xl font-bold mb-1">$19.99<span className="text-base font-normal text-[var(--color-text-secondary)]">/month</span></p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">Per location</p>
          <ul className="space-y-3 mb-8">
            {[
              "Everything in Founder",
              "Additional locations at $12.99/month each",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check size={16} className="text-[var(--color-accent)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/get-started?plan=standard"
            className="block text-center text-sm font-medium border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-150"
          >
            Get started
          </Link>
        </motion.div>
      </div>

      {/* Additional locations */}
      <div className="mt-12 text-center">
        <h3 className="font-bold text-[var(--color-text-secondary)] mb-2">Additional locations</h3>
        <p className="text-[var(--color-text-secondary)]">
          Managing more than one venue? Add extra locations to your account for $12.99/month each.
        </p>
      </div>
    </div>
  );
}
