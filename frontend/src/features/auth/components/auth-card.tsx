import type { ReactNode } from "react";
import styles from "./auth-card.module.css";
import { BrandSpark } from "@/components/brand-spark";

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
        <div
          className="mb-5 flex items-center justify-center"
          aria-label="SignalDesk"
        >
          <BrandSpark size="lg" delay={300} duration={1000}/>
          <span className="text-foreground/80 text-xs font-semibold tracking-[0.24em] uppercase">
            SignalDesk
          </span>
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
