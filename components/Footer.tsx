import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text-primary)] text-white">
      <div className="max-w-[1160px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span className="font-heading text-xl font-semibold">Propos</span>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/pricing" className="hover:text-white transition-colors duration-150">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-white transition-colors duration-150">
              Login
            </Link>
            <a href="mailto:support@getpropos.com" className="hover:text-white transition-colors duration-150">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-white/40">&copy; {new Date().getFullYear()} Propos. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy-policy" className="hover:text-white/70 transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors duration-150">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-white/70 transition-colors duration-150">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
