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
    body: "Negative reviews are held and sent to you before anything posts. You’re always in control.",
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
      <div className="max-w-[1160px] mx-auto px-6">
        <h2 className="font-heading text-[28px] md:text-[36px] font-semibold mb-12 max-w-[520px]">
          Everything you need. Nothing you don&rsquo;t.
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {features.map((feature) => (
            <div key={feature.title} className="bg-[var(--color-paper)] p-8">
              <feature.icon size={22} className="text-[var(--color-accent)] mb-4" strokeWidth={1.75} />
              <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
