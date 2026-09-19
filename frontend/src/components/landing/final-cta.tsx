import Link from "next/link";

import { BrandSpark } from "@/components/brand-spark";

export function FinalCta() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-7 flex justify-center">
          <BrandSpark size="lg" animated delay={250} duration={900} />
        </div>
        <h2 className="text-foreground text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Stop checking everything.
          <br />
          Start receiving what matters.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">
          Build inside SignalDesk or build with SignalDesk as the platform
          grows.
        </p>
        <Link
          href="/register"
          className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary mt-9 inline-flex h-12 items-center justify-center rounded-lg px-7 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Create account
        </Link>
      </div>
    </section>
  );
}
