"use client";

import styles from "./theme-toggle.module.css";

const THEME_STORAGE_KEY = "signaldesk-theme";

type ThemeToggleProps = Readonly<{
  className?: string;
}>;

export function ThemeToggle({ className }: ThemeToggleProps) {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";

    root.dataset.theme = nextTheme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme still applies for the current session when storage is unavailable.
    }
  }

  return (
    <button
      className={[
        "border-border bg-surface text-muted-foreground hover:bg-surface-secondary hover:text-foreground focus-visible:outline-primary inline-flex size-10 items-center justify-center rounded-lg border transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={toggleTheme}
    >
      <SunIcon className={styles.sun} />
      <MoonIcon className={styles.moon} />
    </button>
  );
}

type ThemeIconProps = Readonly<{
  className: string;
}>;

function SunIcon({ className }: ThemeIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5V5m0 14v2.5M4.25 4.25 6 6m12 12 1.75 1.75M2.5 12H5m14 0h2.5M4.25 19.75 6 18M18 6l1.75-1.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MoonIcon({ className }: ThemeIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.2 15.35A8.5 8.5 0 0 1 8.65 3.8 8.5 8.5 0 1 0 20.2 15.35Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
