"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, SlidersHorizontal, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant auto-replies",
    body: "Positive reviews replied to the moment they land. No delays, no drafts, no involvement from you.",
  },
  {
    icon: ShieldCheck,
    title: "You approve the sensitive ones",
    body: "Negative reviews are held and sent to you before anything posts. You\u2019re always in control.",
  },
  {
    icon: SlidersHorizontal,
    title: "Replies that sound like you",
    body: "Choose your tone at setup. Propos learns from every reply you approve and gets more like you over time.",
  },
  {
    icon: BarChart3,
    title: "Monthly win report",
    body: "A monthly summary of your reviews, reply rate, and standout mentions. See the impact at a glance.",
  },
];

export default function Features() {
  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold">
            Everything you need. Nothing you don&rsquo;t.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-white border border-[var(--color-border)] rounded-xl p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-[var(--color-accent)]" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
