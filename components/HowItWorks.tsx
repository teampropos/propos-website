const steps = [
  {
    number: "01",
    title: "Connect your Google profile in 60 seconds",
    description: "One click to link your Google Business Profile. No technical setup, no developer needed.",
  },
  {
    number: "02",
    title: "Every review gets replied to instantly",
    description: "Propos generates a personalised reply in your voice and posts it within seconds of the review landing.",
  },
  {
    number: "03",
    title: "You approve sensitive replies before they go live",
    description: "Negative or tricky reviews are held for you. Approve, edit, or discard in one tap.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[520px] mb-14">
          <h2 className="font-heading text-[28px] md:text-[36px] font-semibold mb-3">
            Up and running in minutes.
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Three steps and you&rsquo;re live. No technical setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 border-t border-b border-[var(--color-border)]">
          {steps.map((step) => (
            <div
              key={step.number}
              className="py-8 md:py-10 pr-6 md:border-r border-[var(--color-border)] last:border-r-0"
            >
              <p className="font-heading text-sm font-medium text-[var(--color-accent)] mb-4">
                {step.number}
              </p>
              <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
