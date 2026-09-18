import type { Metadata } from "next";

import LegalPage from "@/features/legal/legal-page";
import { LegalSection } from "@/features/legal/legal-section";

export const metadata: Metadata = {
  title: "Cookie Policy | Signal Desk",
  description:
    "Learn how Signal Desk uses cookies and similar browser storage technologies.",
};

const navigation = [
  { href: "#introduction", label: "Introduction" },
  { href: "#technologies", label: "Technologies covered" },
  { href: "#current-use", label: "Current use" },
  { href: "#necessary", label: "Strictly necessary" },
  { href: "#authentication", label: "Authentication and security" },
  { href: "#preferences", label: "Preferences" },
  { href: "#analytics", label: "Analytics" },
  { href: "#marketing", label: "Marketing" },
  { href: "#third-parties", label: "Third-party technologies" },
  { href: "#consent", label: "Consent" },
  { href: "#controls", label: "Your controls" },
  { href: "#changes", label: "Changes to this policy" },
  { href: "#contact", label: "Contact" },
] as const;

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="This policy explains the cookies and similar storage technologies used by Signal Desk, including the theme preference currently stored in your browser."
      updatedAt="September 19, 2026"
      navigation={navigation}
    >
      <LegalSection id="introduction" title="1. Introduction">
        <p>
          This Cookie Policy applies to the Signal Desk website and
          browser-based application operated by [LEGAL ENTITY NAME], [BUSINESS
          ADDRESS], Poland. It should be read together with the Privacy Policy.
        </p>
        <p>
          Signal Desk is under active development. This draft describes the
          current repository and distinguishes existing browser storage from
          technologies that may be introduced later.
        </p>
      </LegalSection>

      <LegalSection
        id="technologies"
        title="2. Technologies covered by this policy"
      >
        <p>
          Cookies are small text records that a website asks a browser to store
          and return with later requests. They can support sessions, security,
          preferences, analytics, and other functions.
        </p>
        <p>
          Local storage and session storage are separate browser technologies.
          They store values in the browser but are not automatically sent with
          each web request. Signal Desk does not describe local storage as a
          cookie in this policy.
        </p>
      </LegalSection>

      <LegalSection id="current-use" title="3. Current use">
        <p>
          The current Signal Desk frontend stores one preference in the
          browser&apos;s local storage:
        </p>
        <div className="border-border bg-surface-secondary overflow-x-auto rounded-lg border px-4 py-3">
          <code className="text-foreground text-sm">signaldesk-theme</code>
        </div>
        <p>
          This value records whether you selected the light or dark theme. If no
          saved value exists, Signal Desk uses your operating-system
          color-scheme preference. If local storage cannot be read, the
          interface falls back to the dark theme.
        </p>
        <p>
          The current application code does not set analytics cookies, marketing
          cookies, authentication cookies, or session-storage values. It also
          does not load an active analytics, advertising, payment, or
          error-tracking provider.
        </p>
      </LegalSection>

      <LegalSection id="necessary" title="4. Strictly necessary technologies">
        <p>
          Strictly necessary technologies are required to provide a function you
          request, maintain security, or operate the service. The current
          browser implementation does not set its own strictly necessary cookie.
        </p>
        <p>
          As account functionality is completed, Signal Desk may introduce
          strictly necessary storage for authentication, security, load
          balancing, or abuse prevention. This policy will be updated before
          those technologies are used in production.
        </p>
      </LegalSection>

      <LegalSection id="authentication" title="5. Authentication and security">
        <p>
          The backend contains data models and configuration for password
          authentication, signed access tokens, and hashed refresh sessions.
          Authentication routes and frontend token storage are not currently
          implemented, so no authentication cookie is documented as active.
        </p>
        <p>
          If authentication cookies are introduced, their names, purpose,
          duration, security attributes, and whether they are first-party or
          third-party must be added to this policy. Strictly necessary
          authentication and security cookies generally do not require consent,
          but users must still receive clear information about them.
        </p>
      </LegalSection>

      <LegalSection id="preferences" title="6. Preference storage">
        <p>
          Signal Desk writes{" "}
          <code className="text-foreground">signaldesk-theme</code> to local
          storage only when you choose a theme. The preference remains until you
          change it, clear site data, or your browser removes it. It is used
          only to display the requested theme and is not used to identify you
          across unrelated websites.
        </p>
        <p>
          This preference supports a setting expressly requested by the user.
          Whether any future preference storage requires consent will be
          assessed according to its purpose and applicable law.
        </p>
      </LegalSection>

      <LegalSection id="analytics" title="7. Analytics and error tracking">
        <p>
          Signal Desk does not currently use a browser analytics or
          error-tracking provider. No analytics provider is identified in the
          application dependencies or configuration.
        </p>
        <p>
          If analytics or client-side error tracking is introduced, Signal Desk
          will identify the provider and purpose, document the relevant storage
          duration, and request consent where required before activating
          non-essential technologies.
        </p>
      </LegalSection>

      <LegalSection id="marketing" title="8. Marketing cookies">
        <p>
          Signal Desk does not currently use advertising, behavioral profiling,
          cross-site tracking, or marketing cookies. These technologies will not
          be described as active unless they are actually introduced.
        </p>
      </LegalSection>

      <LegalSection id="third-parties" title="9. Third-party technologies">
        <p>
          The current Google and GitHub buttons on the account screens are
          interface placeholders and do not initiate OAuth or load provider
          scripts. Source integrations and payment services are also not
          currently implemented in the frontend.
        </p>
        <p>
          If you later choose to authenticate with or connect a third-party
          service, that provider may use its own cookies or storage on its
          website according to its privacy and cookie policies. Signal Desk will
          update this policy when such flows become active.
        </p>
      </LegalSection>

      <LegalSection id="consent" title="10. Cookie consent">
        <p>
          Signal Desk does not treat continued browsing as consent. The current
          frontend uses only the theme preference described above and does not
          activate analytics or marketing technologies.
        </p>
        <p>
          If non-essential cookies or similar technologies are introduced,
          Signal Desk will provide an appropriate consent choice before using
          them where required by EU or other applicable law. Refusing
          non-essential technologies will not prevent access to functions that
          do not depend on them.
        </p>
      </LegalSection>

      <LegalSection
        id="controls"
        title="11. How to control cookies and storage"
      >
        <p>
          You can inspect or delete Signal Desk site data through your browser
          settings. You may also remove{" "}
          <code className="text-foreground">signaldesk-theme</code> through
          browser developer tools or by clearing the site&apos;s stored data.
          Removing it resets the theme to your current system preference on the
          next visit.
        </p>
        <p>
          Browsers also allow you to block cookies. If strictly necessary
          authentication or security cookies are added later, blocking them may
          prevent sign-in or other protected functions from working.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="12. Changes to this policy">
        <p>
          This policy will be updated when Signal Desk adds or changes cookies,
          local storage, session storage, analytics, authentication, embedded
          content, or similar technologies. The “Last updated” date identifies
          the latest version.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="13. Contact">
        <p>Questions about cookies or browser storage may be directed to:</p>
        <ul className="list-none space-y-1">
          <li>[LEGAL ENTITY NAME]</li>
          <li>[BUSINESS ADDRESS]</li>
          <li>[PRIVACY CONTACT EMAIL]</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
