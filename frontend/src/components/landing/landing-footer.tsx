import Link from "next/link";

import { BrandSpark } from "@/components/brand-spark";

const footerLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/login", label: "Sign in" },
  { href: "/register", label: "Get started" },
] as const;

export function LandingFooter() {
  return (
    <footer className="border-border border-t px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="focus-visible:outline-primary flex items-center gap-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <BrandSpark size="sm" />
          <span className="text-foreground text-xs font-semibold tracking-[0.22em] uppercase">
            SignalDesk
          </span>
        </Link>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-muted-foreground text-sm sm:ml-auto">
          © 2026 SignalDesk
        </p>
      </div>
    </footer>
  );
}
