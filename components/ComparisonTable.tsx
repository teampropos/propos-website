"use client";

import { motion } from "framer-motion";
import { Check, X, Clock } from "lucide-react";

export default function ComparisonTable() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold mb-4">
            The maths speaks for itself.
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            See how Propos stacks up against the alternatives.
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-4 pr-4 font-medium text-[var(--color-text-secondary)]"></th>
                <th className="py-4 px-4 text-center">
                  <div className="bg-[var(--color-accent)] text-white rounded-lg px-4 py-2 font-bold text-base">
                    Propos
                  </div>
                </th>
                <th className="py-4 px-4 text-center font-medium text-[var(--color-text-secondary)]">
                  Marketing agency
                </th>
                <th className="py-4 px-4 text-center font-medium text-[var(--color-text-secondary)]">
                  Do it yourself
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Monthly cost</td>
                <td className="py-4 px-4 text-center font-bold text-[var(--color-accent)]">$12.99</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">$300–$500+</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">Free (but...)</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Time per month</td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <Check size={16} /> 0 hours
                  </span>
                </td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">1–2 hours managing</td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                    <Clock size={16} /> 5–10 hours
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Reply speed</td>
                <td className="py-4 px-4 text-center font-medium text-green-600">Under 60 seconds</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">24–48 hours</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">When you remember</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Sounds like you</td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-600" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X size={18} className="mx-auto text-red-400" />
                </td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-600" />
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Learns your voice over time</td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-600" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X size={18} className="mx-auto text-red-400" />
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-[var(--color-text-secondary)]">N/A</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 pr-4 font-medium">Catches negative reviews</td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-600" />
                </td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-600" />
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-red-400 text-xs font-medium">
                    If you notice
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
