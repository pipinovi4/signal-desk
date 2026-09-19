import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

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
          className="focus-visible:outline-primary flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="SignalDesk home"
        >
          <BrandLogo className="h-7 w-36" />
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
