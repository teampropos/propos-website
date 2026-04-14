import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Propos",
  description:
    "Privacy Policy for Propos. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-[36px] md:text-[48px] font-bold leading-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-12">
          Effective Date: April 2026
        </p>

        <div className="space-y-10 text-[16px] leading-[1.7] text-[var(--color-text-primary)]">
          <div>
            <h2 className="font-heading text-xl font-bold mb-3">1. Introduction</h2>
            <p>
              Propos (ABN: 61 592 377 156) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, store, and protect your personal information when
              you use our Service at getpropos.com.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">2. Information We Collect</h2>
            <p className="mb-4">We collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Business name, email address, and contact details provided during signup.
              </li>
              <li>
                Google Business Profile access credentials via OAuth (we do not store your Google
                password).
              </li>
              <li>
                Review data from your Google Business Profile, including review content and reviewer
                names.
              </li>
              <li>
                Payment information processed securely by Stripe (we do not store card details).
              </li>
              <li>Usage data including login activity and Service interactions.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and operate the Propos Service.</li>
              <li>Generate AI-powered review responses on your behalf.</li>
              <li>Process payments via Stripe.</li>
              <li>
                Send service notifications, including magic link approval emails for negative
                reviews.
              </li>
              <li>Send monthly performance reports.</li>
              <li>Improve our Service and AI response quality.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">4. Data Storage &amp; Security</h2>
            <p>
              Your data is stored on secure cloud servers. We implement industry-standard security
              measures including encryption in transit and at rest. Access to your data is restricted
              to authorised personnel only. We retain your data for as long as your account is active
              and for a period of 12 months following cancellation, after which it is securely
              deleted.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">5. Third-Party Services</h2>
            <p className="mb-4">
              We use the following third-party services to operate Propos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Google Business Profile API — to access and post review responses.
              </li>
              <li>Stripe — to process payments securely.</li>
              <li>Anthropic — to generate AI review responses.</li>
            </ul>
            <p className="mt-4">
              Each of these providers has their own privacy policy governing how they handle your
              data. We do not sell your data to any third party.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">
              6. International Data Transfers
            </h2>
            <p>
              Propos operates globally. Your data may be processed in countries outside Australia,
              including the United States. We ensure appropriate safeguards are in place for any
              international data transfers in accordance with applicable privacy laws.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">7. Your Rights</h2>
            <p className="mb-4">
              Under the Australian Privacy Act 1988, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>
                Request deletion of your data, subject to legal retention requirements.
              </li>
              <li>
                Lodge a complaint with the Office of the Australian Information Commissioner (OAIC).
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at:{" "}
              <a
                href="mailto:support@getpropos.com"
                className="text-[var(--color-accent)] hover:underline"
              >
                support@getpropos.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">8. GDPR Compliance</h2>
            <p>
              For clients based in the European Union or United Kingdom, we comply with the General
              Data Protection Regulation (GDPR). You have the right to data portability, the right to
              be forgotten, and the right to object to processing. Contact us to exercise these
              rights.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">
              9. California Privacy Rights (CCPA)
            </h2>
            <p className="mb-4">
              If you are a resident of California, USA, you have the following rights under the
              California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The right to know what personal information we collect, use, disclose, and sell.
              </li>
              <li>
                The right to delete personal information we have collected from you, subject to
                certain exceptions.
              </li>
              <li>
                The right to opt-out of the sale of your personal information. Propos does not sell
                personal information to third parties.
              </li>
              <li>The right to non-discrimination for exercising your CCPA rights.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, California residents may contact us at:{" "}
              <a
                href="mailto:support@getpropos.com"
                className="text-[var(--color-accent)] hover:underline"
              >
                support@getpropos.com
              </a>
              . We will respond to verified requests within 45 days as required by law.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">10. Cookies</h2>
            <p>
              Our website may use cookies for session management and analytics. You may disable
              cookies in your browser settings, however this may affect the functionality of the
              Service.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes via email. Continued use of the Service constitutes acceptance of the updated
              Policy.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold mb-3">12. Contact</h2>
            <p>
              For privacy-related enquiries, contact us at:{" "}
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
