import type { Metadata } from "next";

import LegalPage from "@/features/legal/legal-page";
import { LegalSection } from "@/features/legal/legal-section";

export const metadata: Metadata = {
  title: "Terms of Service | Signal Desk",
  description: "Read the terms that govern access to and use of Signal Desk.",
};

const navigation = [
  { href: "#agreement", label: "Agreement to the Terms" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#accounts", label: "Accounts and security" },
  { href: "#service", label: "The Signal Desk service" },
  { href: "#third-party-services", label: "Third-party services" },
  { href: "#public-sources", label: "Public sources" },
  { href: "#ai-output", label: "AI and automated output" },
  { href: "#critical-reliance", label: "No critical reliance" },
  { href: "#content", label: "Content and permissions" },
  { href: "#intellectual-property", label: "Intellectual property" },
  { href: "#acceptable-use", label: "Acceptable use" },
  { href: "#api", label: "API and automation" },
  { href: "#plans", label: "Plans and payment" },
  { href: "#termination", label: "Cancellation and termination" },
  { href: "#availability", label: "Availability and changes" },
  { href: "#disclaimers", label: "Disclaimers" },
  { href: "#liability", label: "Liability" },
  { href: "#indemnity", label: "Indemnity" },
  { href: "#law", label: "Law and consumer rights" },
  { href: "#changes", label: "Changes to the Terms" },
  { href: "#contact", label: "Contact" },
] as const;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These Terms explain the rules and responsibilities that apply when you access or use Signal Desk."
      updatedAt="September 19, 2026"
      navigation={navigation}
    >
      <LegalSection id="agreement" title="1. Agreement to the Terms">
        <p>
          These Terms of Service form an agreement between you and [LEGAL ENTITY
          NAME], [BUSINESS ADDRESS], Poland, concerning your use of Signal Desk.
          By creating an account or using the service, you agree to these Terms
          and the Privacy Policy.
        </p>
        <p>
          Signal Desk is under active development. This document is a draft for
          professional legal review before public launch. If you do not agree to
          these Terms, do not use the service.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="2. Eligibility">
        <p>
          You must be at least [MINIMUM USER AGE] and legally capable of
          entering into this agreement. If you use Signal Desk for an
          organization, you confirm that you have authority to bind that
          organization and that “you” includes the organization.
        </p>
        <p>
          Mandatory consumer protections and age-related requirements in your
          country continue to apply. Eligibility rules must be confirmed before
          public registration is enabled.
        </p>
      </LegalSection>

      <LegalSection id="accounts" title="3. Accounts and account security">
        <p>
          You must provide accurate information, keep it current, and protect
          your credentials. You are responsible for activity carried out through
          your account unless applicable law provides otherwise. Contact
          [PRIVACY CONTACT EMAIL] promptly if you suspect unauthorized access.
        </p>
        <p>
          Signal Desk&apos;s data model supports personal and team workspaces
          with membership roles. Workspace owners and administrators are
          responsible for granting appropriate access and for ensuring that
          members are authorized to use workspace data.
        </p>
      </LegalSection>

      <LegalSection id="service" title="4. The Signal Desk service">
        <p>
          Signal Desk is intended to aggregate information from authorized
          connected services and public sources, normalize events, reduce noise,
          filter and deduplicate content, optionally classify or summarize it,
          and deliver relevant updates through supported channels.
        </p>
        <p>
          The current product is an early-stage implementation. Account models
          and infrastructure are being built, while source integrations, the
          event-processing pipeline, AI enrichment, and end-user notification
          delivery are not yet complete. A feature described in these Terms
          applies only when it is made available.
        </p>
      </LegalSection>

      <LegalSection
        id="third-party-services"
        title="5. Connected third-party services"
      >
        <p>
          If integrations are enabled, they will rely on third-party APIs,
          webhooks, feeds, or other services that Signal Desk does not control.
          Their availability, permissions, rate limits, terms, and functionality
          may change without notice.
        </p>
        <p>
          You may connect only accounts and data that you own or are authorized
          to access and process. You remain responsible for complying with the
          connected provider&apos;s terms and for selecting appropriate
          permissions. Signal Desk is not responsible for a third-party outage,
          restriction, deletion, or change.
        </p>
      </LegalSection>

      <LegalSection id="public-sources" title="6. Public sources">
        <p>
          Where supported, Signal Desk may monitor or process information made
          publicly accessible through websites, feeds, public APIs, public
          posts, documentation, repositories, news sources, or other online
          sources.
        </p>
        <p>
          Public availability does not make content unrestricted. You must use
          public-source features for lawful and legitimate purposes and respect
          privacy, copyright, database rights, contractual limits, robots or
          access controls where legally relevant, and applicable platform terms.
        </p>
        <p>
          Public-source material remains owned by its respective owners. Signal
          Desk does not claim ownership merely because it receives, indexes,
          extracts, transforms, or displays that material. Source information
          may be incomplete, inaccurate, unavailable, changed, or removed at any
          time.
        </p>
      </LegalSection>

      <LegalSection id="ai-output" title="7. AI and automated output">
        <p>
          When enabled, automated systems and third-party AI models may
          classify, prioritize, summarize, extract, deduplicate, filter,
          categorize, or generate alerts and derived insights from content.
        </p>
        <p>
          AI output can contain errors, omit context, misclassify priority, or
          become outdated. Signal Desk does not guarantee that every relevant
          event will be detected, that every notification will be delivered, or
          that any summary or classification is complete or correct. Verify
          important information at the original source before acting on it.
        </p>
        <p>
          No production AI provider is currently configured. Provider-specific
          terms may apply when this functionality is introduced.
        </p>
      </LegalSection>

      <LegalSection id="critical-reliance" title="8. No critical reliance">
        <p>
          Signal Desk must not be your sole monitoring or alerting mechanism for
          emergencies, personal safety, medical care, life-support systems,
          critical infrastructure, or other situations where a missed, delayed,
          or inaccurate notification could reasonably cause death, personal
          injury, or severe damage.
        </p>
        <p>
          Maintain appropriate primary monitoring, escalation, and backup
          procedures for high-risk systems.
        </p>
      </LegalSection>

      <LegalSection id="content" title="9. User content and permissions">
        <p>
          You retain ownership of content and data that you own. You grant
          Signal Desk a limited, non-exclusive permission to host, copy,
          process, analyze, transform, transmit, and display that content only
          as reasonably necessary to provide, secure, maintain, and improve the
          service and to comply with law.
        </p>
        <p>
          You confirm that you have the rights and permissions needed for
          content you submit or connect. You are responsible for your
          configuration, filters, prompts, destinations, and the people with
          whom you share outputs.
        </p>
      </LegalSection>

      <LegalSection
        id="intellectual-property"
        title="10. Third-party content and intellectual property"
      >
        <p>
          Signal Desk and its original software, branding, interface, and
          documentation are protected by intellectual-property law. These Terms
          do not transfer ownership of Signal Desk technology to you.
        </p>
        <p>
          User-owned content remains yours. Third-party and public-source
          content remains subject to the rights of its respective owners and any
          applicable licences or terms. Generated or transformed output may
          incorporate facts or material from those sources and should be used
          with appropriate attribution and rights checks where required.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="11. Acceptable use">
        <p>You must not use Signal Desk to:</p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>
            break applicable law or violate another person&apos;s privacy or
            other rights;
          </li>
          <li>
            access an account, system, source, or information without
            authorization;
          </li>
          <li>
            abuse connected accounts, credentials, permissions, or third-party
            APIs;
          </li>
          <li>
            bypass access controls, technical restrictions, security measures,
            or rate limits;
          </li>
          <li>
            introduce malware or attempt to disrupt, probe, or overload
            infrastructure;
          </li>
          <li>
            conduct malicious scraping, abusive automation, spam, or deceptive
            activity;
          </li>
          <li>
            obtain or distribute data that you are not authorized to access or
            use;
          </li>
          <li>
            misrepresent automated output as verified fact where that could
            cause harm.
          </li>
        </ul>
        <p>
          Legitimate monitoring of lawfully accessible public sources is not
          prohibited merely because collection is automated, provided it
          complies with these Terms and applicable law.
        </p>
      </LegalSection>

      <LegalSection id="api" title="12. API, automation, and rate limits">
        <p>
          If Signal Desk provides APIs, webhooks, or automation features, you
          must use documented methods, protect credentials, respect usage and
          rate limits, and avoid activity that harms the service or other users.
          Limits may be applied or changed to maintain security, reliability,
          and fair use.
        </p>
        <p>
          Public customer APIs and webhook delivery are planned concepts and are
          not currently implemented.
        </p>
      </LegalSection>

      <LegalSection id="plans" title="13. Plans, subscriptions, and payment">
        <p>
          Signal Desk does not currently integrate a payment provider or publish
          final commercial plans. If paid plans are introduced, prices, billing
          periods, included usage, taxes, renewal, cancellation, and refund
          terms will be presented before purchase and added to these Terms where
          necessary.
        </p>
        <p>
          Final payment, renewal, cancellation, and refund rules remain [PAYMENT
          AND REFUND TERMS TO BE CONFIRMED]. Nothing in these Terms limits
          mandatory consumer rights.
        </p>
      </LegalSection>

      <LegalSection
        id="termination"
        title="14. Cancellation, suspension, and termination"
      >
        <p>
          You may stop using Signal Desk at any time. Account cancellation and
          self-service deletion controls are still to be implemented. Until
          then, requests may be sent to [PRIVACY CONTACT EMAIL].
        </p>
        <p>
          Signal Desk may restrict, suspend, or terminate access when you
          materially breach these Terms, create a security or legal risk, fail
          to pay an amount properly due under a future paid plan, or use the
          service in a way that could harm Signal Desk, its users, or third
          parties. Where reasonably possible and lawful, notice and an
          opportunity to resolve the issue will be provided.
        </p>
      </LegalSection>

      <LegalSection
        id="availability"
        title="15. Service availability and evolving functionality"
      >
        <p>
          Signal Desk is an evolving service. Features may be added, changed,
          limited, or removed, and beta functions may be incomplete.
          Maintenance, outages, queue delays, provider failures, internet
          conditions, revoked permissions, or third-party API changes can delay
          or prevent processing and delivery.
        </p>
        <p>
          Signal Desk will use reasonable care in operating the service but does
          not promise uninterrupted, error-free, or permanently available
          access.
        </p>
      </LegalSection>

      <LegalSection id="disclaimers" title="16. Disclaimers">
        <p>
          To the extent permitted by applicable law, Signal Desk is provided “as
          is” and “as available.” No warranty is given that source information,
          automated output, integrations, or notifications will be complete,
          accurate, current, secure, or fit for a particular purpose.
        </p>
        <p>
          These disclaimers do not exclude warranties or remedies that cannot
          lawfully be excluded, including mandatory rights available to
          consumers.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="17. Limitation of liability">
        <p>
          To the extent permitted by applicable law, [LEGAL ENTITY NAME] will
          not be liable for indirect, incidental, special, consequential, or
          similar losses arising from use of or inability to use Signal Desk,
          third-party services, public-source content, or automated output.
        </p>
        <p>
          No monetary cap is stated in this draft. The scope of exclusions, any
          liability cap, and exceptions for fraud, wilful misconduct, personal
          injury, data protection obligations, and mandatory consumer law must
          be confirmed by legal counsel.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" title="18. Indemnity">
        <p>
          To the extent permitted by law and appropriate to the final customer
          model, business users may be required to indemnify [LEGAL ENTITY NAME]
          against third-party claims arising from unlawful content, unauthorized
          connected accounts, or a material breach of these Terms. The scope and
          application of this clause must be confirmed before launch and must
          not reduce mandatory consumer protections.
        </p>
      </LegalSection>

      <LegalSection id="law" title="19. Governing law and consumer rights">
        <p>
          These Terms are intended to be governed by [GOVERNING LAW], with
          disputes subject to [COURTS OR VENUE]. Because Signal Desk is operated
          from Poland, Polish and EU requirements are expected to be relevant,
          but the final governing-law and venue wording requires legal
          confirmation.
        </p>
        <p>
          If you are a consumer, nothing in these Terms removes protections
          granted by mandatory law in your country of residence or prevents you
          from using a court or dispute-resolution process available under that
          law.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="20. Changes to the Terms">
        <p>
          Signal Desk may update these Terms as the service changes. Material
          changes will be communicated through the service or another
          appropriate channel before they take effect where required. Continued
          use after the effective date means you accept the updated Terms,
          except where applicable law requires another form of agreement.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="21. Contact">
        <p>Questions about these Terms may be directed to:</p>
        <ul className="list-none space-y-1">
          <li>[LEGAL ENTITY NAME]</li>
          <li>[BUSINESS ADDRESS]</li>
          <li>[PRIVACY CONTACT EMAIL]</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
