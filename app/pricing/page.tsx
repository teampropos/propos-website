import PricingFull from "@/components/PricingFull";
import BacklogPricing from "@/components/BacklogPricing";
import FAQ from "@/components/FAQ";

export default function PricingPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="max-w-[520px] mb-14">
            <h1 className="font-heading text-[38px] md:text-[52px] font-semibold mb-4">
              Simple, honest pricing.
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg">
              One plan. Reply to every review automatically. Cancel anytime.
            </p>
          </div>
          <PricingFull />
        </div>
      </section>

      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <BacklogPricing />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <FAQ />
        </div>
      </section>
    </>
  );
}
