import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Propos",
  description:
    "Terms of Service for Propos, the automated Google review reply service for hospitality businesses.",
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-[36px] md:text-[48px] font-bold leading-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-12">
          Effective Date: April 2026
        </p>

        <div className="space-y-10 text-[16px] leading-[1.7] text-[var(--color-text-primary)]">
          <div>
            <h2 className="font-heading text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Propos platform at getpropos.com (the &ldquo;Service&rdquo;),
              you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not
              agree to these Terms, do not use the Service. These Terms constitute a legally binding
              agreement between you (&ldquo;Client&rdquo;) and Propos (ABN: 61 592 377 156).
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="mb-4">
              Propos provides an automated review response management service. Specifically, Propos
              will:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Automatically generate and post replies to positive Google reviews on behalf of the
                Client.
              </li>
              <li>
                Generate draft replies to negative Google reviews and hold them in the Client&rsquo;s
                portal for review and approval before posting.
              </li>
              <li>
                Clear existing unanswered reviews (the &lsquo;backlog&rsquo;) upon signup, subject to
                the applicable one-time backlog fee.
              </li>
              <li>
                Improve reply tone and style over time based on the Client&rsquo;s approved
                responses.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">3. Client Responsibilities</h2>
            <p className="mb-4">The Client agrees to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate business information during onboarding.</li>
              <li>
                Connect their Google Business Profile account via OAuth authorisation.
              </li>
              <li>
                Review and approve or edit all draft responses for negative reviews before posting.
              </li>
              <li>
                Ensure their Google Business Profile remains connected and accessible throughout the
                subscription period.
              </li>
              <li>
                Comply with Google&rsquo;s terms of service regarding review responses.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">
              4. AI-Generated Responses &amp; Liability
            </h2>
            <p className="mb-4">The Client acknowledges and agrees that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Positive reviews are replied to automatically without prior Client approval. By
                connecting their Google Business Profile, the Client authorises Propos to post
                responses on their behalf.
              </li>
              <li>
                The Client accepts full responsibility for all automatically posted responses to
                positive reviews.
              </li>
              <li>
                Negative review responses are drafted by Propos and submitted to the Client for
                approval. The Client is solely responsible for any response they approve and
                authorise to be posted.
              </li>
              <li>
                Propos makes no guarantee regarding the tone, accuracy, or outcome of any
                AI-generated response.
              </li>
              <li>
                Propos is not liable for any reputational damage, loss of revenue, or any other loss
                arising from review responses, whether posted automatically or approved by the
                Client.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">5. Pricing &amp; Payment</h2>
            <p className="mb-4">
              Subscription fees are charged monthly in advance via Stripe. The current pricing is as
              follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>$12 AUD per month, per location.</li>
              <li>Additional locations: $6 AUD per month, per location.</li>
              <li>
                One-time backlog fee charged at signup: $49 (1–25 reviews), $99 (26–100 reviews),
                $149 (101–200 reviews), $199 (200+ reviews).
              </li>
            </ul>
            <p className="mt-4">
              All fees are in Australian Dollars (AUD) unless otherwise stated. Prices may be subject
              to change with 30 days notice.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">6. Refund Policy</h2>
            <p>
              All backlog fees are non-refundable once the backlog has been processed. Monthly
              subscription fees are non-refundable for any period already paid. Propos may, at its
              sole discretion, offer a partial credit in exceptional circumstances. No refunds will
              be issued for cancellations mid-billing cycle.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">7. Cancellation</h2>
            <p>
              The Client may cancel their subscription at any time via the Stripe Customer Portal.
              Cancellation takes effect at the end of the current billing period. No further charges
              will be made after cancellation. The Client&rsquo;s Google Business Profile will be
              disconnected and access to the Service will cease at the end of the billing period.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">8. Account Termination</h2>
            <p className="mb-4">
              Propos reserves the right to terminate or suspend any account at its sole discretion,
              with or without notice, for any of the following reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Breach of these Terms.</li>
              <li>Misuse of the Service.</li>
              <li>Non-payment of fees.</li>
              <li>Conduct that is harmful, abusive, or unlawful.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">9. Intellectual Property</h2>
            <p>
              All software, content, and technology underlying the Propos platform remain the
              intellectual property of Propos. The Client retains ownership of their business data
              and review content.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Australian law, Propos&rsquo;s total liability to
              the Client for any claims arising from or related to these Terms or the Service shall
              not exceed the total fees paid by the Client in the three months preceding the claim.
              Propos is not liable for indirect, incidental, consequential, or punitive damages of
              any kind.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Queensland, Australia. Any disputes shall be
              subject to the exclusive jurisdiction of the courts of Queensland.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">12. Changes to Terms</h2>
            <p>
              Propos reserves the right to update these Terms at any time. Clients will be notified
              of material changes via email. Continued use of the Service after notification
              constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">13. Contact</h2>
            <p>
              For any questions regarding these Terms, please contact us at:{" "}
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
