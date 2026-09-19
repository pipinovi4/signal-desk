import { LandingSection } from "./landing-section";

const sources = [
  "Telegram",
  "Public web",
  "RSS / feeds",
  "APIs",
  "Webhooks",
  "Future integrations",
] as const;

const destinations = [
  "Telegram",
  "Dashboard",
  "Webhooks",
  "Future destinations",
] as const;

export function SourcesDestinations() {
  return (
    <LandingSection
      eyebrow="Open-ended architecture"
      title="Sources in. Useful signals out."
      intro="SignalDesk is designed around sources and destinations, not around one specific platform."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr] lg:items-stretch">
        <ArchitectureList label="Sources" items={sources} />

        <ArchitectureArrow />

        <div className="border-primary/35 bg-primary/10 flex min-h-44 flex-col items-center justify-center rounded-xl border p-7 text-center">
          <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">
            SignalDesk
          </p>
          <p className="text-foreground mt-3 text-lg font-semibold">
            Processing pipeline
          </p>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-6">
            Normalize, filter, understand, and route.
          </p>
        </div>

        <ArchitectureArrow />

        <ArchitectureList label="Destinations" items={destinations} />
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        These categories describe intended architecture. Availability will
        depend on implemented integrations and plan support.
      </p>
    </LandingSection>
  );
}

type ArchitectureListProps = Readonly<{
  items: readonly string[];
  label: string;
}>;

function ArchitectureList({ items, label }: ArchitectureListProps) {
  return (
    <div className="border-border bg-surface rounded-xl border p-5">
      <p className="text-muted-foreground mb-4 text-[10px] font-semibold tracking-[0.16em] uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border-border bg-background rounded-md border px-3 py-2 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchitectureArrow() {
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
