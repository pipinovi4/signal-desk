"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { useTypingSignal } from "@/features/auth/hooks/use-typing-signal";
import { register } from "@/lib/auth";
import { HttpError } from "@/lib/http/error";

import { AuthField } from "./auth-field";
import { SocialAuthButtons } from "./social-auth-buttons";

type RegistrationField = "username" | "email" | "password";

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { typingField, markFieldAsTyping } =
    useTypingSignal<RegistrationField>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await register({
        username: String(formData.get("username") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      router.replace("/");
      router.refresh();
    } catch (error) {
      if (error instanceof HttpError) {
        setSubmitError(
          error.status === 422
            ? "Please check the entered details and try again."
            : error.message,
        );
      } else {
        setSubmitError("Unable to create your account. Please try again.");
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
        id="username"
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="your_username"
        isTyping={typingField === "username"}
        onTyping={() => markFieldAsTyping("username")}
        disabled={isSubmitting}
        minLength={3}
        maxLength={32}
        pattern="[a-z0-9_]+"
      />

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
        autoComplete="new-password"
        placeholder="Create a password"
        isTyping={typingField === "password"}
        onTyping={() => markFieldAsTyping("password")}
        disabled={isSubmitting}
        minLength={8}
        maxLength={128}
        pattern="\S+"
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
        className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary mt-2 h-12 w-full rounded-lg px-4 text-sm font-semibold transition-colors hover:shadow-[0_0_0_1px_var(--color-primary-glow),0_0_22px_var(--color-primary-glow)] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account…" : "Create account"}
      </button>

      <SocialAuthButtons />

      <p className="text-muted-foreground pt-2 text-center text-xs leading-5 sm:pt-3">
        By creating an account, you agree to our{" "}
        <Link
          className="text-foreground decoration-border hover:text-primary underline underline-offset-4"
          href="/legal/terms"
        >
          Terms of Service
        </Link>{" "}
        and acknowledge our{" "}
        <Link
          className="text-foreground decoration-border hover:text-primary underline underline-offset-4"
          href="/legal/privacy"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          className="text-foreground decoration-border hover:text-primary underline underline-offset-4"
          href="/legal/cookies"
        >
          Cookie Policy
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
