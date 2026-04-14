import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Propos",
  description:
    "Refund Policy for Propos. Understand our refund terms for subscriptions and backlog processing.",
};

export default function RefundPolicyPage() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-[36px] md:text-[48px] font-bold leading-tight mb-2">
          Refund Policy
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-12">
          Effective Date: April 2026
        </p>

        <div className="space-y-10 text-[16px] leading-[1.7] text-[var(--color-text-primary)]">
          <div>
            <h2 className="font-heading text-xl font-bold mb-3">1. Backlog Fees</h2>
            <p>
              All one-time backlog fees are non-refundable once the backlog processing has commenced.
              This applies regardless of the number of reviews processed. By paying the backlog fee
              at signup, the Client acknowledges and accepts this policy.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">
              2. Monthly Subscription Fees
            </h2>
            <p>
              Monthly subscription fees are non-refundable for any billing period that has already
              commenced. If a Client cancels mid-billing cycle, they retain access to the Service
              until the end of the paid period. No partial refunds are issued.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">3. Exceptional Circumstances</h2>
            <p className="mb-4">
              Propos may, at its sole discretion, offer a partial account credit (not a cash refund)
              in exceptional circumstances, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Prolonged Service outages directly caused by Propos that significantly impacted the
                Client&rsquo;s ability to use the Service.
              </li>
              <li>Billing errors resulting in duplicate or incorrect charges.</li>
            </ul>
            <p className="mt-4">
              All requests for credits must be submitted within 14 days of the relevant billing date
              by contacting us at{" "}
              <a
                href="mailto:support@getpropos.com"
                className="text-[var(--color-accent)] hover:underline"
              >
                support@getpropos.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">4. Cancellation Process</h2>
            <p>
              Clients may cancel their subscription at any time through the Stripe Customer Portal.
              Cancellation stops future billing but does not entitle the Client to a refund for the
              current billing period.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">5. Australian Consumer Law</h2>
            <p>
              Nothing in this Refund Policy limits or excludes any rights the Client may have under
              the Australian Consumer Law. Where Propos has failed to provide the Service with due
              care and skill, or the Service is not fit for its described purpose, the Client may be
              entitled to a remedy under Australian Consumer Law.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">6. Contact</h2>
            <p>
              For refund or billing enquiries, please contact us at:{" "}
              <a
                href="mailto:support@getpropos.com"
                className="text-[var(--color-accent)] hover:underline"
              >
                support@getpropos.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
