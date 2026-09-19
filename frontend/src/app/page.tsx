import type { Metadata } from "next";

import { AiProcessingSection } from "@/components/landing/ai-processing-section";
import { AudienceOverview } from "@/components/landing/audience-overview";
import { AudienceProvider } from "@/components/landing/audience-context";
import { FinalCta } from "@/components/landing/final-cta";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { NoiseToSignal } from "@/components/landing/noise-to-signal";
import { ProductPreview } from "@/components/landing/product-preview";
import { PublicWebSection } from "@/components/landing/public-web-section";
import { SourcesDestinations } from "@/components/landing/sources-destinations";
import { TrustSection } from "@/components/landing/trust-section";
import { UsageModes } from "@/components/landing/usage-modes";
import { UseCases } from "@/components/landing/use-cases";

export const metadata: Metadata = {
  title: "SignalDesk | Everything important, in one place",
  description:
    "SignalDesk brings together the information you care about and turns raw events into useful signals.",
};

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-dvh overflow-x-hidden">
      <LandingHeader />
      <AudienceProvider>
        <HeroSection />
        <AudienceOverview />
        <NoiseToSignal />
        <HowItWorks />
        <PublicWebSection />
        <AiProcessingSection />
        <UsageModes />
        <UseCases />
        <ProductPreview />
        <SourcesDestinations />
        <TrustSection />
        <FinalCta />
      </AudienceProvider>
      <LandingFooter />
    </main>
  );
}
