import Link from "next/link";

import { LandingSection } from "./landing-section";

const principles = [
  "Connected data remains under user control.",
  "Public-source information is still treated as data.",
  "AI processing is explicit and optional by design.",
  "Sources can be disconnected when integrations are available.",
  "Users retain ownership of the content they own.",
] as const;

export function TrustSection() {
  return (
    <LandingSection
      eyebrow="Privacy and control"
      title="Built with control in mind."
      intro="Information processing creates responsibility. SignalDesk is being designed to keep sources, processing, and data use understandable."
      className="bg-surface"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <ul className="border-border max-w-3xl border-t">
          {principles.map((principle) => (
            <li
              key={principle}
              className="border-border text-muted-foreground flex items-start gap-3 border-b py-4 text-sm leading-6"
            >
              <span className="text-accent mt-0.5" aria-hidden="true">
                •
              </span>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/legal/privacy"
            className="text-foreground hover:text-primary decoration-border underline underline-offset-4 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/legal/terms"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/legal/cookies"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Cookies
          </Link>
        </div>
      </div>
    </LandingSection>
  );
}
