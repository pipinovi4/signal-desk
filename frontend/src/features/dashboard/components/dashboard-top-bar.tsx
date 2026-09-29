"use client";

import { Bell, Menu, Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/features/auth/context/auth-context";
import Link from "next/link";

type DashboardTopBarProps = Readonly<{
  onOpenNavigation: () => void;
}>;

function getInitials(displayName: string): string {
  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "?";
}

export function DashboardTopBar({ onOpenNavigation }: DashboardTopBarProps) {
  const { user, status } = useAuth();
  const displayName = user?.display_name ?? "Guest";
  const username = user?.username ? `@${user.username}` : user?.email;

  return (
    <header className="border-border bg-surface/95 sticky top-0 z-30 flex h-14 min-w-0 items-center gap-2 border-b px-3 backdrop-blur sm:gap-3 sm:px-4 lg:px-6">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onOpenNavigation}
        className="text-muted-foreground hover:bg-surface-hover hover:text-foreground focus-visible:outline-primary grid size-10 shrink-0 place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
        <ThemeToggle />

        <button
          type="button"
          aria-label="Notifications"
          className="text-muted-foreground hover:bg-surface-hover hover:text-foreground focus-visible:outline-primary relative grid size-10 shrink-0 place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="bg-accent absolute top-2.5 right-2.5 size-2 rounded-full" />
        </button>

        <div
          className="bg-border-elevated mx-1 hidden h-8 w-px sm:block"
          aria-hidden="true"
        />

        <div className="hidden min-w-0 text-right xl:block">
          <p className="max-w-48 truncate text-sm font-medium">{displayName}</p>
          <p className="text-muted-foreground max-w-48 truncate text-xs">
            {status === "loading" ? "Loading account..." : username}
          </p>
        </div>

        <Link href="/profile" aria-label="Profile page">
          <div
            className="from-accent to-primary-hover text-accent-foreground grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold sm:ml-1"
            aria-label={`${displayName} avatar`}
            title={status === "loading" ? "Loading account..." : displayName}
          >
            {getInitials(displayName)}
          </div>
        </Link>
      </div>
    </header>
  );
}
