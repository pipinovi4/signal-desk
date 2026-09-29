"use client";

import { type ReactNode, useState } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopBar } from "./dashboard-top-bar";

type DashboardShellProps = Readonly<{
  children: ReactNode;
}>;

export function DashboardShell({ children }: DashboardShellProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <div className="bg-background min-h-dvh lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <DashboardSidebar
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
      />

      <div className="flex min-h-dvh min-w-0 flex-col">
        <DashboardTopBar onOpenNavigation={() => setIsNavigationOpen(true)} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
