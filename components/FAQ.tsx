"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does Propos reply on my behalf?",
    a: "Propos connects to your Google Business Profile via Google’s official API. When you sign up, you authorise Propos to manage your reviews. We never have access to your Google account password.",
  },
  {
    q: "What happens with negative reviews?",
    a: "Any review under 4 stars is held automatically. We send you a weekly email with a link to review and approve any pending replies before they go live.",
  },
  {
    q: "Can I change the tone of the replies?",
    a: "Yes. You choose your preferred tone when you sign up and can change it at any time from your account preferences.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel anytime from your billing portal. No lock-in, no cancellation fees. Your data is retained for 30 days in case you change your mind.",
  },
  {
    q: "Do you offer a free trial?",
    a: "We don’t offer a free trial, but at $12/month it’s priced to make it an easy decision. If you’re not happy in the first month, reach out and we’ll sort it out.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-[var(--color-text-primary)] pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`text-[var(--color-text-secondary)] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[var(--color-text-secondary)] leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="max-w-[700px]">
      <h2 className="font-heading text-[28px] md:text-[36px] font-semibold mb-10">
        Frequently asked questions
      </h2>
      <div className="border-t border-[var(--color-border)]">
        {faqs.map((faq) => (
          <FAQItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
}
