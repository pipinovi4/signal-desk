import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
  { href: "/legal/privacy", label: "Privacy" },
] as const;

export function LandingHeader() {
  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:h-18 sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          className="focus-visible:outline-primary flex shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="SignalDesk home"
        >
          <BrandLogo className="h-7 w-36 sm:h-8 sm:w-40" priority />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-primary rounded-sm text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground focus-visible:outline-primary hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Get started
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
