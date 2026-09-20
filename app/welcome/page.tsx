import { MailCheck } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-10">
          <MailCheck size={28} className="text-[var(--color-accent)] mx-auto mb-5" strokeWidth={1.75} />
          <h1 className="font-heading text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
            You&apos;re in. Check your email.
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6">
            We&apos;ve sent you a setup link to get your account configured. It usually arrives within a minute or two — check your spam folder if you don&apos;t see it.
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Questions? Email us at{" "}
            <a href="mailto:support@getpropos.com" className="text-[var(--color-accent)] hover:underline">
              support@getpropos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
