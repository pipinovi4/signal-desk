"use client";

import { type Audience, useAudience } from "./audience-context";

const options: ReadonlyArray<Readonly<{ label: string; value: Audience }>> = [
  { value: "personal", label: "Organize my information" },
  { value: "developer", label: "Build with SignalDesk" },
];

export function AudienceSwitcher() {
  const { audience, selectAudience } = useAudience();

  return (
    <div>
      <p className="text-muted-foreground mb-3 text-xs font-medium">
        How do you want to use SignalDesk?
      </p>
      <div
        className="border-border bg-surface inline-flex max-w-full flex-col gap-1 rounded-lg border p-1 sm:flex-row"
        role="group"
        aria-label="Choose how you want to use SignalDesk"
      >
        {options.map((option) => {
          const isSelected = audience === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => selectAudience(option.value)}
              className={[
                "focus-visible:outline-primary rounded-md px-4 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-center",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground",
              ].join(" ")}
            >
              {option.label}
              {isSelected && <span className="sr-only">, selected</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
