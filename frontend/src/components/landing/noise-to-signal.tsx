import { LandingSection } from "./landing-section";

const transformation = [
  { value: "47", label: "raw events", tone: "text-foreground" },
  { value: "18", label: "duplicates removed", tone: "text-muted-foreground" },
  { value: "11", label: "irrelevant events", tone: "text-muted-foreground" },
  { value: "3", label: "relevant events", tone: "text-primary" },
  { value: "1", label: "urgent signal", tone: "text-accent" },
] as const;

export function NoiseToSignal() {
  return (
    <LandingSection
      eyebrow="From everything"
      title="To what matters."
      intro="An illustrative flow showing how a noisy stream can become one actionable signal."
      className="bg-surface"
    >
      <div className="grid gap-3 sm:grid-cols-5">
        {transformation.map((item, index) => (
          <div
            key={item.label}
            className="relative flex min-w-0 items-center sm:block"
          >
            <div className="border-border bg-background w-full rounded-lg border p-4 sm:min-h-32 sm:p-5">
              <p
                className={`${item.tone} text-3xl font-semibold tracking-tight`}
              >
                {item.value}
              </p>
              <p className="text-muted-foreground mt-1 text-sm leading-5">
                {item.label}
              </p>
            </div>
            {index < transformation.length - 1 && (
              <span
                className="text-muted-foreground mx-2 shrink-0 text-sm sm:absolute sm:top-1/2 sm:-right-2.5 sm:z-10 sm:mx-0 sm:-translate-y-1/2"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        Example only. Counts are not performance claims.
      </p>
    </LandingSection>
  );
}
