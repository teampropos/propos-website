"use client";

import { motion } from "framer-motion";
import { Link2, MessageSquare, Shield } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Link2,
    title: "Connect your Google profile in 60 seconds",
    description: "One click to link your Google Business Profile. No technical setup, no developer needed.",
  },
  {
    number: "2",
    icon: MessageSquare,
    title: "Every review gets replied to instantly",
    description: "Propos generates a personalised reply in your voice and posts it within seconds of the review landing.",
  },
  {
    number: "3",
    icon: Shield,
    title: "You approve sensitive replies before they go live",
    description: "Negative or tricky reviews are held for you. Approve, edit, or discard in one tap.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold mb-4">
            Up and running in minutes.
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Three steps and you&rsquo;re live. No technical setup required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <p className="font-heading text-5xl font-bold text-blue-100 mb-4">
                {step.number}
              </p>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 flex items-center justify-center">
                <step.icon size={24} className="text-[var(--color-accent)]" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
