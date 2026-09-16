import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create account | SignalDesk",
  description: "Create your SignalDesk account.",
};

export default function RegisterPage() {
  return (
    <section className="border-border bg-surface w-full rounded-2xl border px-5 py-7 sm:rounded-[22px] sm:px-8 sm:py-9 md:px-10 md:py-10">
      <div className="mb-8 text-center">
        <div
          className="mb-5 flex items-center justify-center gap-2.5"
          aria-label="SignalDesk"
        >
          <span className="bg-accent size-2 rounded-sm" aria-hidden="true" />
          <span className="text-foreground/80 text-xs font-semibold tracking-[0.24em] uppercase">
            SignalDesk
          </span>
        </div>

        <h1 className="text-foreground text-2xl font-semibold tracking-[-0.025em] sm:text-[26px]">
          Create your SignalDesk account
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          Bring important updates into one place.
        </p>
      </div>

      <RegisterForm />
    </section>
  );
}
