"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useTypingSignal } from "@/features/auth/hooks/use-typing-signal";
import { AuthField } from "./auth-field";
import { SocialAuthButtons } from "./social-auth-buttons";

type RegistrationField = "name" | "email" | "password";

export function RegisterForm() {
  const { typingField, markFieldAsTyping } =
    useTypingSignal<RegistrationField>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <AuthField
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        isTyping={typingField === "name"}
        onTyping={() => markFieldAsTyping("name")}
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
      />

      <button
        className="bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-[0_0_0_1px_var(--color-primary-glow),0_0_22px_var(--color-primary-glow)] focus-visible:outline-primary mt-2 h-12 w-full rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
      >
        Create account
      </button>

      <SocialAuthButtons />

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
