import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10">
          <div className="w-14 h-14 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-5">
            <MailCheck size={28} className="text-[#2563EB]" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#111827] mb-3">
            You&apos;re in. Check your email.
          </h1>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
            We&apos;ve sent you a setup link to get your account configured. It usually arrives within a minute or two — check your spam folder if you don&apos;t see it.
          </p>
          <p className="text-xs text-[#9CA3AF]">
            Questions? Email us at{" "}
            <a href="mailto:support@getpropos.com" className="text-[#2563EB] hover:underline">
              support@getpropos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
