import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider, useAuth } from "./auth-context";

const mocks = vi.hoisted(() => ({
  me: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  me: mocks.me,
}));

function AuthState() {
  const { status, user } = useAuth();

  return (
    <p>
      {status}:{user?.email ?? "none"}
    </p>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    mocks.me.mockReset();
  });

  it("restores the authenticated user on mount", async () => {
    mocks.me.mockResolvedValue({
      id: "019d0000-0000-7000-8000-000000000001",
      email: "alice@example.com",
      username: "alice",
      display_name: "Alice",
    });

    render(
      <AuthProvider>
        <AuthState />
      </AuthProvider>,
    );

    expect(
      await screen.findByText("authenticated:alice@example.com"),
    ).toBeInTheDocument();
  });

  it("marks the visitor as anonymous without an active session", async () => {
    mocks.me.mockResolvedValue(null);

    render(
      <AuthProvider>
        <AuthState />
      </AuthProvider>,
    );

    expect(await screen.findByText("anonymous:none")).toBeInTheDocument();
  });
});
