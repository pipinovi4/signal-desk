"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { useAuth } from "@/features/auth/context/auth-context";
import { useTypingSignal } from "@/features/auth/hooks/use-typing-signal";
import { login } from "@/lib/auth";
import { HttpError } from "@/lib/http/error";

import { AuthField } from "./auth-field";
import { SocialAuthButtons } from "./social-auth-buttons";

type LoginField = "email" | "password";

export function LoginForm() {
  const router = useRouter();
  const { setCurrentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { typingField, markFieldAsTyping } = useTypingSignal<LoginField>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const authenticatedUser = await login({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      setCurrentUser(authenticatedUser);
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      if (error instanceof HttpError) {
        setSubmitError(
          error.status === 401 ? "Invalid email or password." : error.message,
        );
      } else {
        setSubmitError("Unable to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="w-full space-y-5"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
    >
      <AuthField
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        isTyping={typingField === "email"}
        onTyping={() => markFieldAsTyping("email")}
        disabled={isSubmitting}
      />

      <AuthField
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        isTyping={typingField === "password"}
        onTyping={() => markFieldAsTyping("password")}
        disabled={isSubmitting}
        labelAction={
          <Link
            className="text-primary hover:text-primary-hover text-xs font-medium transition-colors"
            href="#"
          >
            Forgot password?
          </Link>
        }
      />

      {submitError ? (
        <p
          className="border-danger/35 bg-danger/10 text-danger rounded-lg border px-3.5 py-3 text-sm"
          role="alert"
          aria-live="polite"
        >
          {submitError}
        </p>
      ) : null}

      <button
        className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary mt-2 h-12 w-full rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>

      <SocialAuthButtons />

      <p className="border-border text-muted-foreground border-t pt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          className="text-primary hover:text-primary-hover font-medium transition-colors"
          href="/register"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
