"use client";

import {
  CreditCard,
  LayoutDashboard,
  Radar,
  Radio,
  Send,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

import { BrandLogo } from "@/components/brand-logo";

type DashboardSidebarProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

type NavigationItem = Readonly<{
  href: string;
  label: string;
  icon: ReactNode;
  exact?: boolean;
}>;

const navigation: readonly NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    exact: true,
  },
  {
    href: "/dashboard/trackers",
    label: "Trackers",
    icon: <Radar size={20} />,
  },
  {
    href: "/dashboard/signals",
    label: "Signals",
    icon: <Radio size={20} />,
  },
  {
    href: "/dashboard/destinations",
    label: "Destinations",
    icon: <Send size={20} />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <Settings size={20} />,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: <CreditCard size={20} />,
  },
];

function SidebarContent({
  pathname,
  onNavigate,
}: Readonly<{
  pathname: string;
  onNavigate?: () => void;
}>) {
  return (
    <>
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="focus-visible:outline-primary mb-8 inline-flex w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
        aria-label="SignalDesk dashboard"
      >
        <BrandLogo className="h-8 w-40" priority />
      </Link>

      <nav aria-label="Dashboard navigation">
        <ul className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "focus-visible:outline-primary flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                    isActive
                      ? "bg-surface-hover text-accent"
                      : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground",
                  ].join(" ")}
                >
                  <span className="size-5 shrink-0" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const desktopQuery = window.matchMedia?.("(min-width: 64rem)");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    desktopQuery?.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery?.removeEventListener("change", handleDesktopChange);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <>
      <aside
        aria-label="Dashboard sidebar"
        className="border-border bg-surface sticky top-0 hidden h-dvh w-60 flex-col border-r px-4 py-6 lg:flex"
      >
        <SidebarContent pathname={pathname} />
      </aside>

      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={[
          "fixed inset-0 z-50 lg:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close navigation"
          className={[
            "absolute inset-0 bg-black/60 transition-[opacity,backdrop-filter] duration-300 ease-out motion-reduce:transition-none",
            isOpen
              ? "opacity-100 backdrop-blur-xs"
              : "opacity-0 backdrop-blur-none",
          ].join(" ")}
          onClick={onClose}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile dashboard navigation"
          className={[
            "border-border bg-surface relative flex h-dvh w-[min(20rem,calc(100vw-3rem))] flex-col overflow-y-auto border-r px-4 py-5 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            isOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="text-muted-foreground hover:bg-surface-hover hover:text-foreground focus-visible:outline-primary absolute top-4 right-4 grid size-10 place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <SidebarContent pathname={pathname} onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}
