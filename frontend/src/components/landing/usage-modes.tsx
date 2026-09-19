import { LandingSection } from "./landing-section";

const modes = [
  {
    label: "Use SignalDesk",
    audience: "For individuals and teams",
    points: [
      "Connect supported sources",
      "Bring important information into one place",
      "Define what deserves attention",
      "Receive prioritized signals",
      "Use the core without building infrastructure",
    ],
  },
  {
    label: "Build with SignalDesk",
    audience: "For developers and businesses",
    points: [
      "Send events through future APIs and webhooks",
      "Create processing pipelines",
      "Combine rules with optional AI",
      "Produce structured output",
      "Integrate results downstream",
    ],
  },
] as const;

export function UsageModes() {
  return (
    <LandingSection
      eyebrow="One core, two entry points"
      title="Build inside SignalDesk or build with SignalDesk."
      intro="Both experiences use the same core for ingestion, normalization, filtering, deduplication, understanding, priority, and delivery."
      className="bg-surface"
    >
      <div className="border-primary/30 bg-primary/10 mb-5 rounded-lg border px-5 py-4 text-center">
        <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">
          Shared SignalDesk core
        </p>
        <p className="text-foreground mt-2 text-sm">
          Ingest → Normalize → Filter → Understand → Prioritize → Deliver
        </p>
      </div>
      <div className="border-border grid border-y lg:grid-cols-2">
        {modes.map((mode, index) => (
          <div
            key={mode.label}
            className={[
              "py-8 lg:px-10 lg:py-10",
              index === 0
                ? "border-border border-b lg:border-r lg:border-b-0 lg:pl-0"
                : "lg:pr-0",
            ].join(" ")}
          >
            <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
              {mode.audience}
            </p>
            <h3 className="text-foreground mt-3 text-2xl font-semibold tracking-tight">
              {mode.label}
            </h3>
            <ul className="mt-7 space-y-4">
              {mode.points.map((point) => (
                <li
                  key={point}
                  className="text-muted-foreground flex items-start gap-3 text-sm"
                >
                  <span className="text-accent mt-0.5" aria-hidden="true">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        Customer APIs, configurable pipelines, and webhook outputs describe
        planned product direction.
      </p>
    </LandingSection>
  );
}
