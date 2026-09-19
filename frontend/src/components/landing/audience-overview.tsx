"use client";

import { useAudience } from "./audience-context";
import { LandingSection } from "./landing-section";

const content = {
  personal: {
    eyebrow: "One unified stream",
    title: "One place for everything that matters.",
    intro:
      "SignalDesk is intended to reduce constant context switching by bringing important information into one clear, prioritized view.",
    sources: [
      "Mail",
      "Messages",
      "Alerts",
      "News",
      "Feeds",
      "Public web",
      "Work tools",
      "Notifications",
    ],
    middle: "Unified information stream",
    output: "What needs your attention",
  },
  developer: {
    eyebrow: "Composable infrastructure",
    title: "A processing layer for raw information.",
    intro:
      "Send events from different systems into one pipeline, apply deterministic and semantic processing, then consume consistent structured signals.",
    sources: [
      "APIs",
      "Webhooks",
      "Feeds",
      "Public streams",
      "System events",
      "Internal tools",
    ],
    middle: "Normalized event pipeline",
    output: "Structured output",
  },
} as const;

export function AudienceOverview() {
  const { audience } = useAudience();
  const selected = content[audience];

  return (
    <LandingSection
      id="product"
      eyebrow={selected.eyebrow}
      title={selected.title}
      intro={selected.intro}
      className="bg-surface"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_0.9fr_auto_0.9fr] lg:items-stretch">
        <div className="border-border bg-background rounded-xl border p-5">
          <p className="text-muted-foreground mb-4 text-[10px] font-semibold tracking-[0.16em] uppercase">
            Sources such as
          </p>
          <div className="flex flex-wrap gap-2">
            {selected.sources.map((source) => (
              <span
                key={source}
                className="border-border bg-surface rounded-md border px-3 py-2 text-xs"
              >
                {source}
              </span>
            ))}
          </div>
        </div>

        <OverviewArrow />

        <div className="border-primary/35 bg-primary/10 flex min-h-36 items-center justify-center rounded-xl border p-6 text-center">
          <div>
            <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">
              SignalDesk core
            </p>
            <p className="text-foreground mt-3 text-base font-semibold">
              {selected.middle}
            </p>
          </div>
        </div>

        <OverviewArrow />

        <div className="border-border bg-background flex min-h-36 items-center justify-center rounded-xl border p-6 text-center">
          <div>
            <span className="bg-accent mx-auto block size-2 rounded-full" />
            <p className="text-foreground mt-3 text-base font-semibold">
              {selected.output}
            </p>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        Source availability will depend on implemented integrations.
      </p>
    </LandingSection>
  );
}

function OverviewArrow() {
  return (
    <div
      className="text-muted-foreground flex items-center justify-center text-sm"
      aria-hidden="true"
    >
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </div>
  );
}
