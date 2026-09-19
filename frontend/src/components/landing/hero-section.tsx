"use client";

import Link from "next/link";

import { AudienceSwitcher } from "./audience-switcher";
import { useAudience } from "./audience-context";

const heroContent = {
  personal: {
    eyebrow: "Intelligent information hub",
    title: "Everything important, in one place.",
    description:
      "SignalDesk is designed to bring together mail, messages, alerts, feeds, and public information, then remove noise and surface what actually needs your attention.",
    note: "Early-stage product. Sources shown in this demo describe intended integrations.",
  },
  developer: {
    eyebrow: "Information processing infrastructure",
    title: "Turn noise into signal.",
    description:
      "Send information from APIs, webhooks, feeds, and public sources into a shared pipeline that normalizes events, applies rules and models, and produces structured signals.",
    note: "Early-stage product. Customer APIs, pipelines, and destinations shown here are planned.",
  },
} as const;

export function HeroSection() {
  const { audience } = useAudience();
  const selected = heroContent[audience];

  return (
    <section className="px-5 pt-16 pb-18 sm:px-8 sm:pt-24 sm:pb-24 lg:px-12 lg:pt-28 lg:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="text-primary mb-5 text-xs font-semibold tracking-[0.2em] uppercase">
            {selected.eyebrow}
          </p>
          <h1 className="text-foreground text-5xl leading-[0.98] font-semibold tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
            {selected.title}
          </h1>
          <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-8 sm:text-xl">
            {selected.description}
          </p>

          <div className="mt-8">
            <AudienceSwitcher />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Get started
            </Link>
            <Link
              href="#how-it-works"
              className="border-border bg-surface hover:bg-surface-secondary focus-visible:outline-primary inline-flex h-12 items-center justify-center rounded-lg border px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              See how it works
            </Link>
          </div>
          <p className="text-muted-foreground mt-5 text-xs leading-5">
            {selected.note}
          </p>
        </div>

        {audience === "personal" ? (
          <UnifiedInboxPreview />
        ) : (
          <DeveloperPipelinePreview />
        )}
      </div>
    </section>
  );
}

const inboxItems = [
  {
    priority: "High",
    title: "Client replied to your proposal",
    source: "Email",
    time: "2 min ago",
  },
  {
    priority: "High",
    title: "Important policy change detected",
    source: "Public web",
    time: "12 min ago",
  },
  {
    priority: "Medium",
    title: "Repository security update",
    source: "GitHub",
    time: "36 min ago",
  },
  {
    priority: "Low",
    title: "Weekly industry digest",
    source: "Feeds",
    time: "1 h ago",
  },
] as const;

function UnifiedInboxPreview() {
  return (
    <div
      className="border-border bg-surface rounded-2xl border p-4 sm:p-6"
      aria-label="Illustrative unified information feed"
    >
      <PreviewHeader
        title="Unified feed"
        subtitle="Illustrative product preview"
      />
      <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-[0.16em] uppercase">
        Today
      </p>
      <div className="divide-border border-border overflow-hidden rounded-lg border">
        {inboxItems.map((item) => (
          <div
            key={item.title}
            className="bg-surface-secondary grid gap-2 p-4 sm:grid-cols-[64px_minmax(0,1fr)_70px] sm:items-center"
          >
            <span
              className={[
                "text-xs font-medium",
                item.priority === "High"
                  ? "text-accent"
                  : item.priority === "Medium"
                    ? "text-primary"
                    : "text-muted-foreground",
              ].join(" ")}
            >
              {item.priority}
            </span>
            <div>
              <p className="text-foreground text-sm font-medium">
                {item.title}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {item.source}
              </p>
            </div>
            <span className="text-muted-foreground text-xs sm:text-right">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const processing = [
  "Normalize",
  "Deduplicate",
  "Filter",
  "Classify",
  "Summarize",
  "Prioritize",
] as const;

function DeveloperPipelinePreview() {
  return (
    <div
      className="border-border bg-surface rounded-2xl border p-4 sm:p-6"
      aria-label="Illustrative SignalDesk event processing pipeline"
    >
      <PreviewHeader
        title="Event pipeline"
        subtitle="Illustrative developer preview"
      />
      <div className="grid gap-3 sm:grid-cols-[0.8fr_auto_1.1fr_auto_0.9fr] sm:items-stretch">
        <FlowBlock label="Input">
          <div className="space-y-2">
            {["API event", "Webhook", "Public feed"].map((item) => (
              <div
                key={item}
                className="border-border bg-surface-secondary rounded-md border px-3 py-2 text-xs"
              >
                {item}
              </div>
            ))}
          </div>
        </FlowBlock>
        <FlowArrow />
        <FlowBlock label="Process">
          <div className="border-primary/40 bg-primary/10 rounded-lg border p-3">
            <div className="flex flex-wrap gap-1.5">
              {processing.map((step) => (
                <span
                  key={step}
                  className="border-primary/30 bg-surface rounded-md border px-2 py-1 text-[11px]"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </FlowBlock>
        <FlowArrow />
        <FlowBlock label="Output">
          <div className="border-border bg-surface-secondary rounded-lg border p-3">
            <p className="text-primary text-[10px] font-semibold tracking-[0.14em] uppercase">
              Structured signal
            </p>
            <p className="text-foreground mt-2 text-sm font-medium">
              priority: high
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              category: policy-change
            </p>
          </div>
        </FlowBlock>
      </div>
    </div>
  );
}

function PreviewHeader({
  title,
  subtitle,
}: Readonly<{ title: string; subtitle: string }>) {
  return (
    <div className="border-border mb-5 flex items-center justify-between border-b pb-4">
      <div>
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground mt-1 text-xs">{subtitle}</p>
      </div>
      <span className="bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase">
        Demo
      </span>
    </div>
  );
}

function FlowBlock({
  children,
  label,
}: Readonly<{ children: React.ReactNode; label: string }>) {
  return (
    <div className="min-w-0">
      <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-[0.16em] uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      className="text-muted-foreground flex items-center justify-center py-1 text-sm"
      aria-hidden="true"
    >
      <span className="sm:hidden">↓</span>
      <span className="hidden sm:inline">→</span>
    </div>
  );
}
