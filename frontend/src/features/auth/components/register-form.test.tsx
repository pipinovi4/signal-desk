import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HttpError } from "@/lib/http/error";

import { RegisterForm } from "./register-form";

const mocks = vi.hoisted(() => ({
  register: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  register: mocks.register,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mocks.replace,
    refresh: mocks.refresh,
  }),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    mocks.register.mockReset();
    mocks.replace.mockReset();
    mocks.refresh.mockReset();
  });

  it("registers the user and redirects after success", async () => {
    const user = userEvent.setup();

    mocks.register.mockResolvedValue({
      id: "019d0000-0000-7000-8000-000000000001",
      email: "alice@example.com",
      username: "alice",
      display_name: "Alice",
    });

    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Username"), "alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(
      screen.getByRole("button", {
        name: "Create account",
      }),
    );

    await waitFor(() => {
      expect(mocks.register).toHaveBeenCalledWith({
        username: "alice",
        email: "alice@example.com",
        password: "Password123!",
      });
    });

    expect(mocks.replace).toHaveBeenCalledWith("/");
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("shows the API error without redirecting", async () => {
    const user = userEvent.setup();

    mocks.register.mockRejectedValue(
      new HttpError({
        status: 409,
        code: "user_already_exists",
        message: "A user with this email or username already exists",
        details: undefined,
      }),
    );

    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Username"), "alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(
      screen.getByRole("button", {
        name: "Create account",
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "A user with this email or username already exists",
    );
    expect(mocks.replace).not.toHaveBeenCalled();
    expect(mocks.refresh).not.toHaveBeenCalled();
  });
});
