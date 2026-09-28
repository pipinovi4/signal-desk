"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { me } from "@/lib/auth";
import type { components } from "@/shared/api/generated/schema";

type User = components["schemas"]["UserRead"];
type AuthStatus = "loading" | "authenticated" | "anonymous" | "error";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  refreshUser: () => Promise<User | null>;
  setCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const setCurrentUser = useCallback((currentUser: User | null) => {
    setUser(currentUser);
    setStatus(currentUser === null ? "anonymous" : "authenticated");
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await me();
      setCurrentUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      setStatus("error");
      return null;
    }
  }, [setCurrentUser]);

  useEffect(() => {
    let cancelled = false;

    void me()
      .then((currentUser) => {
        if (!cancelled) {
          setCurrentUser(currentUser);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setCurrentUser]);

  const value = useMemo(
    () => ({
      user,
      status,
      refreshUser,
      setCurrentUser,
    }),
    [refreshUser, setCurrentUser, status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
