import { LandingSection } from "./landing-section";

const useCases = [
  {
    title: "Personal information hub",
    description:
      "Keep important messages, mail, alerts, and updates in one prioritized stream.",
  },
  {
    title: "Inbox triage",
    description:
      "Surface items that need attention instead of treating every notification equally.",
  },
  {
    title: "News and web monitoring",
    description:
      "Follow topics and meaningful changes without manually checking every source.",
  },
  {
    title: "Work coordination",
    description:
      "Bring fragmented updates from different work tools into one priority layer.",
  },
  {
    title: "Market and research",
    description:
      "Continuously monitor relevant public information and changing sources.",
  },
  {
    title: "Engineering and operations",
    description:
      "Reduce noise across code, monitoring, infrastructure, and internal event streams.",
  },
  {
    title: "Teams",
    description:
      "Turn incoming information into shared, reviewable, actionable signals.",
  },
] as const;

export function UseCases() {
  return (
    <LandingSection
      id="use-cases"
      eyebrow="Use cases"
      title="One signal layer for personal and technical work."
    >
      <div className="border-border border-t">
        {useCases.map((useCase, index) => (
          <article
            key={useCase.title}
            className="border-border grid gap-3 border-b py-6 sm:grid-cols-[56px_0.7fr_1.3fr] sm:items-baseline sm:gap-6 sm:py-7"
          >
            <span className="text-primary text-xs font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-foreground text-lg font-semibold">
              {useCase.title}
            </h3>
            <p className="text-muted-foreground max-w-2xl text-sm leading-6">
              {useCase.description}
            </p>
          </article>
        ))}
      </div>
    </LandingSection>
  );
}
