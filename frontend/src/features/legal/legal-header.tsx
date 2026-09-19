import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { BrandSpark } from "@/components/brand-spark";
import { ThemeToggle } from "@/components/theme-toggle";

type LegalHeaderProps = Readonly<{
  title: string;
}>;

export function LegalHeader({ title }: LegalHeaderProps) {
  return (
    <header className="border-border border-b">
      <div className="flex min-h-18 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="focus-visible:outline-primary flex shrink-0 rounded-sm transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-label="SignalDesk home"
          >
            <BrandLogo className="h-7 w-34 sm:h-8 sm:w-40" priority />
          </Link>
          <BrandSpark size="sm" animated={false} />
          <span className="text-muted-foreground truncate text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm sm:tracking-[0.28em]">
            {title}
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
