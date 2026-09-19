"use client";

import { useAudience } from "./audience-context";
import { LandingSection } from "./landing-section";

const stageContent = {
  personal: [
    {
      number: "01",
      title: "Connect",
      description:
        "Bring information from supported mail, messages, feeds, alerts, and public sources.",
    },
    {
      number: "02",
      title: "Normalize",
      description:
        "Organize different updates into one consistent information stream.",
    },
    {
      number: "03",
      title: "Understand",
      description:
        "Reduce repetition, identify importance, and summarize what changed.",
    },
    {
      number: "04",
      title: "Deliver",
      description:
        "Surface relevant signals in one feed and through supported alerts.",
    },
  ],
  developer: [
    {
      number: "01",
      title: "Connect",
      description:
        "Ingest events from supported APIs, webhooks, feeds, and public sources.",
    },
    {
      number: "02",
      title: "Normalize",
      description:
        "Convert different payloads and schemas into one consistent event model.",
    },
    {
      number: "03",
      title: "Understand",
      description:
        "Process events through rules, deduplication, extraction, and optional models.",
    },
    {
      number: "04",
      title: "Deliver",
      description:
        "Emit structured signals to supported APIs, webhooks, and downstream systems.",
    },
  ],
} as const;

export function HowItWorks() {
  const { audience } = useAudience();
  const stages = stageContent[audience];

  return (
    <LandingSection
      id="how-it-works"
      eyebrow="How SignalDesk works"
      title={
        audience === "personal"
          ? "One core that turns scattered updates into a clear feed."
          : "A processing layer between raw events and downstream systems."
      }
      intro={
        audience === "personal"
          ? "Connect information sources, bring updates into a common stream, understand importance, and receive what matters."
          : "Ingest information from different systems, normalize it, apply deterministic and semantic processing, and emit structured results."
      }
    >
      <div className="border-border grid border-y md:grid-cols-4">
        {stages.map((stage, index) => (
          <div
            key={stage.number}
            className="border-border relative border-b py-7 last:border-b-0 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="text-primary text-xs font-semibold">
                {stage.number}
              </span>
              <span className="bg-border h-px flex-1" />
              {index < stages.length - 1 && (
                <span
                  className="text-muted-foreground hidden text-xs md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
            <h3 className="text-foreground text-xl font-semibold">
              {stage.title}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {stage.description}
            </p>
          </div>
        ))}
      </div>
      <div className="text-muted-foreground mt-7 flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase">
        <span>Source</span>
        <span aria-hidden="true">→</span>
        <span>{audience === "personal" ? "Update" : "Event"}</span>
        <span aria-hidden="true">→</span>
        <span>Processing</span>
        <span aria-hidden="true">→</span>
        <span className="text-primary">Signal</span>
        <span aria-hidden="true">→</span>
        <span>{audience === "personal" ? "Feed" : "Destination"}</span>
      </div>
    </LandingSection>
  );
}
