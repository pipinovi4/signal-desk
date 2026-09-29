import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DashboardSidebar } from "./dashboard-sidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/signals",
}));

describe("DashboardSidebar", () => {
  it("marks the current dashboard destination", () => {
    render(<DashboardSidebar isOpen={false} onClose={vi.fn()} />);

    expect(
      screen.getByRole("navigation", { name: "Dashboard navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Signals" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders and closes the mobile navigation", () => {
    const onClose = vi.fn();

    render(<DashboardSidebar isOpen onClose={onClose} />);

    const dialog = screen.getByRole("dialog", {
      name: "Mobile dashboard navigation",
    });

    expect(
      within(dialog).getByRole("link", { name: "Signals" }),
    ).toHaveAttribute("aria-current", "page");

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalledOnce();
  });
});
