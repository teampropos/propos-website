"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HIDDEN_ON = ["/portal", "/onboarding"];

function isHidden(pathname: string) {
  return HIDDEN_ON.some((prefix) => pathname.startsWith(prefix));
}

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (isHidden(pathname)) return null;
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (isHidden(pathname)) return null;
  return <Footer />;
}
