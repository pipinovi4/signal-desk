import Link from "next/link";

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
            className="text-foreground/90 shrink-0 text-xs font-semibold tracking-[0.28em] uppercase transition-colors hover:text-foreground sm:text-sm"
          >
            SignalDesk
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
