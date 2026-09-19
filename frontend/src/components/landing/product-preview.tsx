"use client";

import { useAudience } from "./audience-context";
import { LandingSection } from "./landing-section";

const previews = {
  personal: {
    title: "A unified feed built around your attention.",
    intro:
      "A representative inbox showing how updates from different sources could appear after filtering and prioritization.",
    feedLabel: "Unified inbox",
    filters: ["All", "Needs attention", "Sources", "Unread"],
    signals: [
      {
        source: "Email",
        priority: "High",
        title: "Client replied to your proposal",
        summary:
          "The reply includes two questions and asks for a call before Friday.",
        time: "2 min",
        reason: "Important contact · direct reply",
        unread: true,
      },
      {
        source: "Public web",
        priority: "High",
        title: "Policy update affects a topic you follow",
        summary:
          "Two relevant provisions changed across the latest published documents.",
        time: "12 min",
        reason: "Matched: EU SaaS regulation",
        unread: true,
      },
      {
        source: "Feeds",
        priority: "Low",
        title: "Weekly industry digest",
        summary:
          "Seven related updates were grouped into one summary; nothing urgent was detected.",
        time: "1 h",
        reason: "Grouped update",
        unread: false,
      },
    ],
  },
  developer: {
    title: "A structured feed for downstream decisions.",
    intro:
      "A representative signal stream showing normalized events after rules, models, and routing logic.",
    feedLabel: "Structured signals",
    filters: ["All events", "High priority", "Sources", "Unprocessed"],
    signals: [
      {
        source: "public_web",
        priority: "High",
        title: "regulatory_document_changed",
        summary:
          "Two obligations were added and matched the configured compliance rule.",
        time: "10:42",
        reason: "rule: eu-saas-policy",
        unread: true,
      },
      {
        source: "repository",
        priority: "Medium",
        title: "security_release_detected",
        summary:
          "A monitored dependency published a release containing a security fix.",
        time: "09:18",
        reason: "classifier: security-update",
        unread: true,
      },
      {
        source: "feed",
        priority: "Low",
        title: "digest_completed",
        summary:
          "Seven related events were grouped; no high-priority signal was emitted.",
        time: "Yesterday",
        reason: "pipeline: weekly-digest",
        unread: false,
      },
    ],
  },
} as const;

export function ProductPreview() {
  const { audience } = useAudience();
  const preview = previews[audience];

  return (
    <LandingSection
      eyebrow="Product preview"
      title={preview.title}
      intro={preview.intro}
      className="bg-surface"
    >
      <div className="border-border bg-background overflow-hidden rounded-xl border">
        <div className="border-border flex flex-col gap-5 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-foreground text-base font-semibold">
              {preview.feedLabel}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Illustrative product UI
            </p>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {preview.filters.map((filter, index) => (
              <span
                key={filter}
                className={[
                  "shrink-0 rounded-md border px-3 py-2 text-xs",
                  index === 0
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-surface text-muted-foreground",
                ].join(" ")}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="divide-border divide-y">
          {preview.signals.map((signal) => (
            <article
              key={signal.title}
              className="grid gap-4 p-5 sm:grid-cols-[90px_minmax(0,1fr)_70px] sm:p-6"
            >
              <div>
                <span className="text-muted-foreground text-xs">
                  {signal.source}
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={[
                      "size-1.5 rounded-full",
                      signal.priority === "High"
                        ? "bg-accent"
                        : signal.priority === "Medium"
                          ? "bg-primary"
                          : "bg-muted-foreground",
                    ].join(" ")}
                  />
                  <span className="text-foreground text-xs">
                    {signal.priority}
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-start gap-2">
                  {signal.unread && (
                    <span
                      className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
                      aria-label="Unread"
                    />
                  )}
                  <h3 className="text-foreground text-sm leading-6 font-semibold sm:text-base">
                    {signal.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {signal.summary}
                </p>
                <p className="text-primary mt-3 text-xs">{signal.reason}</p>
              </div>
              <time className="text-muted-foreground text-xs sm:text-right">
                {signal.time}
              </time>
            </article>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}
