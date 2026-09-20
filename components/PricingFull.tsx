import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingFull() {
  return (
    <div className="max-w-[420px]">
      <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-8">
        <p className="font-heading text-3xl font-semibold mb-1">$12<span className="text-base font-normal text-[var(--color-text-secondary)]">/month</span></p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">Additional locations $6/month each</p>
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
          href="/get-started"
          className="block text-center text-sm font-medium bg-[var(--color-text-primary)] text-white px-6 py-3 hover:bg-black transition-colors duration-150"
        >
          Get started
        </Link>
      </div>

      {/* Additional locations */}
      <div className="mt-10 border-t border-[var(--color-border)] pt-8">
        <h3 className="font-semibold mb-2">Additional locations</h3>
        <p className="text-[var(--color-text-secondary)]">
          Managing more than one venue? Add extra locations to your account for $6/month each.
        </p>
      </div>
    </div>
  );
}
