import { Check, X, Clock } from "lucide-react";

export default function ComparisonTable() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="max-w-[520px] mb-12">
          <h2 className="font-heading text-[28px] md:text-[36px] font-semibold mb-3">
            The maths speaks for itself.
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            See how Propos stacks up against the alternatives.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--color-text-primary)]">
                <th className="text-left py-4 pr-4 font-medium text-[var(--color-text-secondary)]"></th>
                <th className="py-4 px-4 text-center font-heading font-semibold text-base text-[var(--color-accent)]">
                  Propos
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
                <td className="py-4 px-4 text-center font-semibold text-[var(--color-accent)]">$12</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">$300–$500+</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">Free (but...)</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Time per month</td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                    <Check size={16} /> 0 hours
                  </span>
                </td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">1–2 hours managing</td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-red-700 font-medium">
                    <Clock size={16} /> 5–10 hours
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Reply speed</td>
                <td className="py-4 px-4 text-center font-medium text-green-700">Under 60 seconds</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">24–48 hours</td>
                <td className="py-4 px-4 text-center text-[var(--color-text-secondary)]">When you remember</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Sounds like you</td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-700" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X size={18} className="mx-auto text-[var(--color-text-secondary)]" />
                </td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-700" />
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-4 pr-4 font-medium">Learns your voice over time</td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-700" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X size={18} className="mx-auto text-[var(--color-text-secondary)]" />
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-[var(--color-text-secondary)]">N/A</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 pr-4 font-medium">Catches negative reviews</td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-700" />
                </td>
                <td className="py-4 px-4 text-center">
                  <Check size={18} className="mx-auto text-green-700" />
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-[var(--color-text-secondary)] text-xs font-medium">
                    If you notice
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
