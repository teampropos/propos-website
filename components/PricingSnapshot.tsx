import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingSnapshot() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-surface)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[520px] mb-14">
          <h2 className="font-heading text-[28px] md:text-[36px] font-semibold mb-3">
            Simple, honest pricing.
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            One plan. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-8 max-w-[420px]">
          <p className="font-heading text-3xl font-semibold mb-1">$12<span className="text-base font-normal text-[var(--color-text-secondary)]">/month</span></p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">Additional locations $6/month each</p>
          <ul className="space-y-3 mb-8">
            {[
              "Unlimited review replies",
              "Negative review approval flow",
              "Tone personalisation",
              "Monthly win report",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check size={16} className="text-[var(--color-accent)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/get-started"
            className="block text-center text-sm font-medium bg-[var(--color-text-primary)] text-white px-6 py-3 hover:bg-black transition-colors duration-150"
          >
            Get started
          </Link>
        </div>

        <p className="text-[13px] text-[var(--color-text-secondary)] mt-6 max-w-[420px]">
          Have unanswered reviews to catch up on? One-time backlog pricing available at checkout.
        </p>
        <p className="mt-2">
          <Link href="/pricing" className="text-sm text-[var(--color-accent)] hover:underline">
            View full pricing &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
