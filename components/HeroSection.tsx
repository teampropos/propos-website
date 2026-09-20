import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[var(--color-paper)]">
      <div className="max-w-[1160px] mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-sm font-medium text-[var(--color-accent)] mb-5">
              For restaurants, cafés &amp; hospitality
            </p>

            <h1 className="font-heading text-[38px] md:text-[56px] font-semibold leading-[1.06] text-[var(--color-text-primary)] mb-6">
              Every Google review replied to — <span className="italic">on autopilot.</span>
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] max-w-[460px] leading-relaxed mb-8">
              Positive reviews go out the moment they land. Anything sensitive
              comes to you first. From $12/month.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/coming-soon"
                className="inline-flex items-center justify-center text-base font-medium bg-[var(--color-text-primary)] text-white px-7 py-3 hover:bg-black transition-colors duration-150"
              >
                Automate my reviews
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center text-base font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-150"
              >
                See how it works
              </a>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-5 max-w-[420px]">
              78% of customers read reviews before choosing a business.
              An unanswered one is a customer walking to a competitor.
            </p>
          </div>

          {/* Right: single reply artifact, offset for an editorial feel */}
          <div className="relative">
            <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 md:p-7 md:ml-6 shadow-[6px_6px_0_0_var(--color-border)]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-sm font-medium text-[var(--color-text-primary)]">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Mitchell</p>
                    <p className="text-[#B08A2E] text-sm leading-none">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">2 min ago</p>
              </div>

              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-5">
                &ldquo;Absolutely incredible experience! The wagyu steak was cooked to
                perfection and the tiramisu was the best I&rsquo;ve ever had.&rdquo;
              </p>

              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <p className="text-xs font-medium text-[var(--color-accent)] mb-1.5">
                  Replied by Propos, 40 seconds later
                </p>
                <p className="text-[15px] text-[var(--color-text-primary)] leading-relaxed">
                  Sarah, we&rsquo;re thrilled the wagyu and tiramisu hit the spot!
                  Tom will be chuffed to hear he looked after you so well.
                </p>
                <p className="text-[15px] text-[var(--color-text-primary)] mt-2">— Marco</p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] mt-4 md:ml-6">
              4.1★ average → 4.6★ within 90 days, 100% reply rate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
