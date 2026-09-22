import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[var(--color-text-primary)] py-16 md:py-24">
      <div className="max-w-[1160px] mx-auto px-6 text-center">
        <h2 className="font-heading text-[28px] md:text-[36px] font-semibold text-white mb-4">
          Start replying to every review today.
        </h2>
        <p className="text-white/60 text-lg mb-8 max-w-[480px] mx-auto">
          Join hospitality businesses already on autopilot. No lock-in, cancel anytime.
        </p>
        <Link
          href="/get-started"
          className="inline-flex items-center justify-center text-base font-medium bg-white text-[var(--color-text-primary)] px-8 py-3.5 hover:bg-[var(--color-surface)] transition-colors duration-150"
        >
          Automate my reviews
        </Link>
      </div>
    </section>
  );
}
