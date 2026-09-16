"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useTypingSignal } from "@/features/auth/hooks/use-typing-signal";
import { AuthField } from "./auth-field";
import { SocialAuthButtons } from "./social-auth-buttons";

type LoginField = "email" | "password";

export function LoginForm() {
  const { typingField, markFieldAsTyping } = useTypingSignal<LoginField>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
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
        autoComplete="current-password"
        placeholder="Enter your password"
        isTyping={typingField === "password"}
        onTyping={() => markFieldAsTyping("password")}
        labelAction={
          <Link
            className="text-primary hover:text-primary-hover text-xs font-medium transition-colors"
            href="#"
          >
            Forgot password?
          </Link>
        }
      />

      <button
        className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary mt-2 h-12 w-full rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
      >
        Sign in
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
