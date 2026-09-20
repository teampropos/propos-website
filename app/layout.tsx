import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar, ConditionalFooter } from "@/components/ConditionalNavigation";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Propos — Every Google review replied to, on autopilot",
  description:
    "Propos connects to your Google Business Profile and replies to every review the moment it lands. Positive reviews go out instantly. Sensitive ones come to you for approval first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TZ2YTM0DT0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZ2YTM0DT0');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-text-primary)] font-sans">
        <ConditionalNavbar />
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
