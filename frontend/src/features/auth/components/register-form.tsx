"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <div className="w-full space-y-2">
        <label
          className="text-muted-foreground block text-sm font-medium"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="border-border bg-surface-secondary text-foreground placeholder:text-muted-foreground/60 hover:border-muted-foreground/50 focus:border-primary focus:ring-primary/25 focus-visible:border-primary focus-visible:ring-primary/25 h-12 w-full rounded-lg border px-3.5 text-sm transition-colors focus:ring-2 focus:outline-none"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
        />
      </div>

      <div className="w-full space-y-2">
        <label
          className="text-muted-foreground block text-sm font-medium"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border-border bg-surface-secondary text-foreground placeholder:text-muted-foreground/60 hover:border-muted-foreground/50 focus:border-primary focus:ring-primary/25 focus-visible:border-primary focus-visible:ring-primary/25 h-12 w-full rounded-lg border px-3.5 text-sm transition-colors focus:ring-2 focus:outline-none"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="w-full space-y-2">
        <label
          className="text-muted-foreground block text-sm font-medium"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative w-full">
          <input
            className="border-border bg-surface-secondary text-foreground placeholder:text-muted-foreground/60 hover:border-muted-foreground/50 focus:border-primary focus:ring-primary/25 focus-visible:border-primary focus-visible:ring-primary/25 h-12 w-full rounded-lg border pr-12 pl-3.5 text-sm transition-colors focus:ring-2 focus:outline-none"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            required
          />
          <button
            className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-primary absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg transition-colors"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <button
        className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary mt-2 h-12 w-full rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
      >
        Create account
      </button>

      <div className="flex items-center gap-3 py-4" aria-hidden="true">
        <span className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-xs">or continue with</span>
        <span className="bg-border h-px flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          className="border-border bg-surface-secondary text-foreground focus-visible:outline-primary flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-[#232329]"
          type="button"
          aria-label="Continue with Google"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button
          className="border-border bg-surface-secondary text-foreground focus-visible:outline-primary flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-[#232329]"
          type="button"
          aria-label="Continue with GitHub"
        >
          <GitHubIcon />
          <span>GitHub</span>
        </button>
      </div>

      <p className="text-muted-foreground pt-2 text-center text-xs leading-5 sm:pt-3">
        By creating an account, you agree to our{" "}
        <Link
          className="text-foreground decoration-border hover:text-primary underline underline-offset-4"
          href="#"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-foreground decoration-border hover:text-primary underline underline-offset-4"
          href="#"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <p className="border-border text-muted-foreground border-t pt-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          className="text-primary hover:text-primary-hover font-medium transition-colors"
          href="/login"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px] shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.35 12.18c0-.7-.06-1.2-.2-1.72H12v3.32h5.37a4.58 4.58 0 0 1-1.99 2.94l-.02.11 2.89 2.24h.2c1.82-1.68 2.9-4.16 2.9-6.89ZM12 21.7c2.61 0 4.8-.86 6.4-2.34l-3.05-2.35c-.82.55-1.91.94-3.35.94a5.82 5.82 0 0 1-5.5-4.03l-.1.01-3 2.32-.04.1A9.67 9.67 0 0 0 12 21.7ZM6.5 13.92A5.97 5.97 0 0 1 6.18 12c0-.67.12-1.31.31-1.92v-.11L3.46 7.61l-.1.05A9.68 9.68 0 0 0 2.3 12c0 1.56.37 3.04 1.06 4.35l3.14-2.43ZM12 6.05c1.82 0 3.05.78 3.76 1.44l2.7-2.63A9.16 9.16 0 0 0 12 2.3a9.67 9.67 0 0 0-8.64 5.36l3.13 2.42A5.84 5.84 0 0 1 12 6.05Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px] shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M2.5 12s3.25-6 9.5-6 9.5 6 9.5 6-3.25 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="2.75"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m3 3 18 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M10.6 6.1A9.7 9.7 0 0 1 12 6c6.25 0 9.5 6 9.5 6a14.7 14.7 0 0 1-2.35 3.15M6.25 6.25C3.78 8.1 2.5 12 2.5 12s3.25 6 9.5 6a9.4 9.4 0 0 0 3.1-.5M9.8 9.8a3.1 3.1 0 0 0 4.4 4.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
