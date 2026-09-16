"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./auth-field.module.css";

type AuthFieldProps = Readonly<{
  id: string;
  label: string;
  name: string;
  type: "text" | "email" | "password";
  autoComplete: string;
  placeholder: string;
  isTyping: boolean;
  onTyping: () => void;
  labelAction?: ReactNode;
}>;

export function AuthField({
  id,
  label,
  name,
  type,
  autoComplete,
  placeholder,
  isTyping,
  onTyping,
  labelAction,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full space-y-2">
      {labelAction ? (
        <div className="flex items-center justify-between gap-4">
          <label
            className="text-muted-foreground block text-sm font-medium"
            htmlFor={id}
          >
            {label}
          </label>
          {labelAction}
        </div>
      ) : (
        <label
          className="text-muted-foreground block text-sm font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        className={[
          styles.signalField,
          isTyping ? styles.signalFieldActive : "",
          "w-full",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          className={[
            "border-border bg-surface-secondary text-foreground placeholder:text-muted-foreground/60 hover:border-muted-foreground/50 focus:border-primary focus:ring-primary/25 focus-visible:border-primary focus-visible:ring-primary/25 h-12 w-full rounded-lg border text-sm transition-colors focus:ring-2 focus:outline-none",
            isPassword ? "pr-12 pl-3.5" : "px-3.5",
          ].join(" ")}
          id={id}
          name={name}
          type={inputType}
          autoComplete={autoComplete}
          inputMode={type === "email" ? "email" : undefined}
          placeholder={placeholder}
          required
          onChange={onTyping}
        />

        {isPassword ? (
          <button
            className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-primary absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg transition-colors"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        ) : null}
      </div>
    </div>
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
