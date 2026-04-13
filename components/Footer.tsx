import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span className="font-heading text-xl font-bold">Propos</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-white transition-colors duration-150">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-white transition-colors duration-150">
              Login
            </Link>
            <a href="mailto:hello@getpropos.com" className="hover:text-white transition-colors duration-150">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2025 Propos. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors duration-150">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
