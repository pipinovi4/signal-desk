import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";

import styles from "./auth-card.module.css";

type AuthCardProps = Readonly<{
  title: string;
  subtitle: string;
  children: ReactNode;
}>;

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <section
      className={[
        styles.card,
        "border-border bg-surface w-full rounded-2xl border px-5 py-7 sm:rounded-[22px] sm:px-8 sm:py-9 md:px-10 md:py-10",
      ].join(" ")}
    >
      <div className="mb-8 text-center">
        <div className="mb-5 flex items-center justify-center">
          <Link
            href="/"
            aria-label="Back to SignalDesk home"
            className="focus-visible:outline-primary inline-flex cursor-pointer rounded-sm transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <BrandLogo className="h-9 w-44 sm:h-10 sm:w-50" priority />
          </Link>
        </div>

        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-[26px]">
          {title}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          {subtitle}
        </p>
      </div>

      {children}
    </section>
  );
}
