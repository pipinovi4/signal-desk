import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DashboardTopBar } from "./dashboard-top-bar";

vi.mock("@/features/auth/context/auth-context", () => ({
  useAuth: () => ({
    user: {
      id: "2731be45-5bcd-4d41-8432-2556c231b12d",
      email: "alice@example.com",
      display_name: "Alice Walker",
      username: "alice",
    },
    status: "authenticated",
  }),
}));

describe("DashboardTopBar", () => {
  it("renders account controls from AuthContext", () => {
    render(<DashboardTopBar onOpenNavigation={vi.fn()} />);

    expect(screen.getByText("Alice Walker")).toBeInTheDocument();
    expect(screen.getByText("@alice")).toBeInTheDocument();
    expect(screen.getByLabelText("Alice Walker avatar")).toHaveTextContent(
      "AW",
    );
    expect(
      screen.getByRole("button", { name: "Toggle color theme" }),
    ).toBeInTheDocument();
  });

  it("opens the responsive navigation", () => {
    const onOpenNavigation = vi.fn();

    render(<DashboardTopBar onOpenNavigation={onOpenNavigation} />);

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));

    expect(onOpenNavigation).toHaveBeenCalledOnce();
  });
});
