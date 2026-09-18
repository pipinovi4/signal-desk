import Link from "next/link";
import { ReactNode } from "react";

import { LegalHeader } from "@/features/legal/legal-header";
import { LegalSidebar } from "@/features/legal/legal-sidebar";

type LegalProps = Readonly<{
  children: ReactNode;
  description: string;
  navigation: ReadonlyArray<Readonly<{ href: string; label: string }>>;
  title: string;
  updatedAt: string;
}>;

export default function LegalPage({
  children,
  description,
  navigation,
  title,
  updatedAt,
}: LegalProps) {
  return (
    <section className="min-h-dvh w-full overflow-hidden border-border bg-surface sm:min-h-[calc(100dvh-3rem)] sm:rounded-2xl sm:border">
      <LegalHeader title={title} />

      <div className="px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to SignalDesk
        </Link>

        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Legal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: <time>{updatedAt}</time>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,720px)_200px] lg:justify-between">
          <article className="space-y-10">{children}</article>
          <LegalSidebar items={navigation} />
        </div>
      </div>

      <footer className="border-t border-border px-5 py-6 sm:px-8 lg:px-10">
        <nav
          aria-label="Legal pages"
          className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          <Link className="transition-colors hover:text-foreground" href="/legal/privacy">
            Privacy
          </Link>
          <Link className="transition-colors hover:text-foreground" href="/legal/terms">
            Terms
          </Link>
          <Link className="transition-colors hover:text-foreground" href="/legal/cookies">
            Cookies
          </Link>
          <span className="sm:ml-auto">© 2026 SignalDesk</span>
        </nav>
      </footer>
    </section>
  );
}
