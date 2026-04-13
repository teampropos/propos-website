import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ComparisonTable from "@/components/ComparisonTable";
import PricingSnapshot from "@/components/PricingSnapshot";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <HowItWorks />
      <Features />
      <ComparisonTable />
      <PricingSnapshot />
      <FinalCTA />
    </>
  );
}
