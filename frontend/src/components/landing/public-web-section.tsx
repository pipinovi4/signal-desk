"use client";

import { useAudience } from "./audience-context";
import { LandingSection } from "./landing-section";

const publicSources = [
  "News",
  "Public posts",
  "Repositories",
  "Documentation",
  "Public APIs",
  "Web pages",
  "Feeds",
] as const;

const watchSteps = [
  { value: "12", label: "sources watched" },
  { value: "4", label: "new documents" },
  { value: "2", label: "relevant changes" },
  { value: "1", label: "high-priority signal" },
] as const;

export function PublicWebSection() {
  const { audience } = useAudience();

  return (
    <LandingSection
      eyebrow="Public web"
      title="The internet is also a source."
      intro={
        audience === "personal"
          ? "Follow topics and receive relevant changes without returning to every page, feed, or public source manually."
          : "Treat appropriate public-source ingestion and monitoring as another input to a consistent processing pipeline."
      }
      className="bg-surface"
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div>
          <p className="text-foreground text-sm font-semibold">
            Designed for sources such as
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {publicSources.map((source) => (
              <span
                key={source}
                className="border-border bg-background rounded-md border px-3 py-2 text-sm"
              >
                {source}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-6">
            Public information can still contain personal data or protected
            material. Monitoring must respect applicable law, source access, and
            relevant platform terms.
          </p>
        </div>

        <div className="border-border bg-background rounded-xl border p-5 sm:p-7">
          <div className="border-border flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">
                Watching
              </p>
              <p className="text-foreground mt-2 max-w-lg text-base font-medium sm:text-lg">
                “New EU AI regulation affecting SaaS providers”
              </p>
            </div>
            <span className="border-border bg-surface-secondary text-muted-foreground shrink-0 rounded-md border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase">
              Demo
            </span>
          </div>

          <div className="border-border bg-border mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-4">
            {watchSteps.map((step, index) => (
              <div key={step.label} className="bg-surface p-4">
                <p
                  className={
                    index === watchSteps.length - 1
                      ? "text-accent text-2xl font-semibold"
                      : "text-foreground text-2xl font-semibold"
                  }
                >
                  {step.value}
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          <div className="border-primary/30 bg-primary/10 mt-5 rounded-lg border p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-primary text-[10px] font-semibold tracking-[0.14em] uppercase">
                {audience === "personal" ? "What changed" : "Structured signal"}
              </span>
              <span className="text-muted-foreground text-[10px]">
                Example output
              </span>
            </div>
            <p className="text-foreground mt-3 text-sm leading-6">
              Draft obligations changed for providers deploying general-purpose
              AI features in the EU.
            </p>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
