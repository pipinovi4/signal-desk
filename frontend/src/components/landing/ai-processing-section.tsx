import { LandingSection } from "./landing-section";

const deterministic = ["Rules", "Filters", "Schemas"] as const;
const semantic = [
  "Classification",
  "Summarization",
  "Extraction",
  "Relevance",
] as const;

export function AiProcessingSection() {
  return (
    <LandingSection
      eyebrow="Processing"
      title="AI where it is useful. Deterministic processing where it isn't."
      intro="Models are one tool inside the pipeline. Predictable work stays explicit; semantic work can use AI when the feature is enabled."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1.1fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-[0.16em] uppercase">
            Predictable processing
          </p>
          {deterministic.map((item) => (
            <div
              key={item}
              className="border-border bg-surface flex items-center justify-between rounded-lg border px-4 py-3"
            >
              <span className="text-sm font-medium">{item}</span>
              <span className="text-muted-foreground text-xs">
                deterministic
              </span>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground flex items-center justify-center gap-2 py-2 lg:flex-col">
          <span className="bg-border h-px w-full lg:h-12 lg:w-px" />
          <span
            className="border-border bg-surface rounded-md border px-3 py-2 text-xs"
            aria-hidden="true"
          >
            →
          </span>
          <span className="bg-border h-px w-full lg:h-12 lg:w-px" />
        </div>

        <div className="border-border bg-surface rounded-xl border p-5 sm:p-6">
          <div className="border-border mb-5 flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-foreground text-sm font-semibold">
                Semantic layer
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Optional model-assisted tasks
              </p>
            </div>
            <span className="bg-primary size-2 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {semantic.map((item) => (
              <div
                key={item}
                className="border-primary/25 bg-primary/10 rounded-md border px-3 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-5 text-xs leading-5">
            Original or normalized content remains available when AI processing
            is disabled or unavailable.
          </p>
        </div>
      </div>
    </LandingSection>
  );
}
