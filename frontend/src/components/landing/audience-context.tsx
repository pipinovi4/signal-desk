"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Audience = "personal" | "developer";

const AUDIENCE_STORAGE_KEY = "signaldesk-audience";
const AUDIENCE_CHANGE_EVENT = "signaldesk-audience-change";
let sessionAudience: Audience = "personal";

type AudienceContextValue = Readonly<{
  audience: Audience;
  selectAudience: (audience: Audience) => void;
}>;

const AudienceContext = createContext<AudienceContextValue | null>(null);

function getAudienceSnapshot(): Audience {
  try {
    const savedAudience = localStorage.getItem(AUDIENCE_STORAGE_KEY);

    return savedAudience === "personal" || savedAudience === "developer"
      ? savedAudience
      : sessionAudience;
  } catch {
    return sessionAudience;
  }
}

function getServerAudienceSnapshot(): Audience {
  return "personal";
}

function subscribeToAudience(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUDIENCE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUDIENCE_CHANGE_EVENT, callback);
  };
}

export function AudienceProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const audience = useSyncExternalStore(
    subscribeToAudience,
    getAudienceSnapshot,
    getServerAudienceSnapshot,
  );

  const value = useMemo<AudienceContextValue>(
    () => ({
      audience,
      selectAudience(nextAudience) {
        sessionAudience = nextAudience;

        try {
          localStorage.setItem(AUDIENCE_STORAGE_KEY, nextAudience);
        } catch {
          // Persistence is optional; the current page still uses the selected mode.
        }

        window.dispatchEvent(new Event(AUDIENCE_CHANGE_EVENT));
      },
    }),
    [audience],
  );

  return (
    <AudienceContext.Provider value={value}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);

  if (!context) {
    throw new Error("useAudience must be used within AudienceProvider");
  }

  return context;
}
