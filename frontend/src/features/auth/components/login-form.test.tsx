import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HttpError } from "@/lib/http/error";

import { LoginForm } from "./login-form";

const mocks = vi.hoisted(() => ({
  login: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  setCurrentUser: vi.fn(),
}));

vi.mock("@/features/auth/context/auth-context", () => ({
  useAuth: () => ({ setCurrentUser: mocks.setCurrentUser }),
}));

vi.mock("@/lib/auth", () => ({
  login: mocks.login,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mocks.replace,
    refresh: mocks.refresh,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mocks.login.mockReset();
    mocks.replace.mockReset();
    mocks.refresh.mockReset();
    mocks.setCurrentUser.mockReset();
  });

  it("logs the user in and redirects after success", async () => {
    const user = userEvent.setup();
    mocks.login.mockResolvedValue({
      id: "019d0000-0000-7000-8000-000000000001",
      email: "alice@example.com",
      username: "alice",
      display_name: "Alice",
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mocks.login).toHaveBeenCalledWith({
        email: "alice@example.com",
        password: "Password123!",
      });
    });

    expect(mocks.setCurrentUser).toHaveBeenCalledWith(
      expect.objectContaining({ email: "alice@example.com" }),
    );
    expect(mocks.replace).toHaveBeenCalledWith("/dashboard");
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("shows an error and stays on the page for invalid credentials", async () => {
    const user = userEvent.setup();
    mocks.login.mockRejectedValue(
      new HttpError({
        status: 401,
        code: "invalid_credentials",
        message: "Invalid email or password",
        details: undefined,
      }),
    );

    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "WrongPassword123!");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password.",
    );
    expect(mocks.replace).not.toHaveBeenCalled();
    expect(mocks.refresh).not.toHaveBeenCalled();
  });
});
