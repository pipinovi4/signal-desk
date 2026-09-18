import type { Metadata } from "next";

import LegalPage from "@/features/legal/legal-page";
import { LegalSection } from "@/features/legal/legal-section";

export const metadata: Metadata = {
  title: "Privacy Policy | Signal Desk",
  description:
    "Learn how Signal Desk collects, uses, and protects personal information.",
};

const navigation = [
  { href: "#introduction", label: "Introduction and scope" },
  { href: "#information-we-collect", label: "Information we collect" },
  { href: "#connected-services", label: "Connected services" },
  { href: "#public-sources", label: "Public sources" },
  { href: "#how-we-use-information", label: "How we use information" },
  { href: "#ai-processing", label: "AI processing" },
  { href: "#legal-bases", label: "Legal bases" },
  { href: "#sharing", label: "Sharing and providers" },
  { href: "#international-transfers", label: "International transfers" },
  { href: "#retention", label: "Data retention" },
  { href: "#security", label: "Security" },
  { href: "#deletion", label: "Account and data deletion" },
  { href: "#your-rights", label: "Your privacy rights" },
  { href: "#children", label: "Children's privacy" },
  { href: "#changes", label: "Changes to this policy" },
  { href: "#contact", label: "Contact" },
] as const;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how Signal Desk handles personal information when you use the service or when information is processed from connected or public sources."
      updatedAt="September 19, 2026"
      navigation={navigation}
    >
      <LegalSection id="introduction" title="1. Introduction and scope">
        <p>
          Signal Desk is a notification and information-processing service being
          developed and operated from Poland by [LEGAL ENTITY NAME], with an
          address at [BUSINESS ADDRESS]. For the purposes of applicable data
          protection law, this entity is the controller of the personal
          information described in this policy unless stated otherwise.
        </p>
        <p>
          This policy applies to the Signal Desk website, accounts, workspaces,
          applications, APIs, and related services. Signal Desk is currently
          under active development. Some functions described below are planned
          and will apply only if and when they are enabled.
        </p>
        <p>
          This is a draft for professional legal review before public launch. It
          does not replace any additional notice that may be presented for a
          specific integration or feature.
        </p>
      </LegalSection>

      <LegalSection
        id="information-we-collect"
        title="2. Information we collect"
      >
        <p>
          The information processed depends on the features you use and may
          include:
        </p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Account information:</strong>{" "}
            name, email address, username, profile image, account status, and
            verification timestamps.
          </li>
          <li>
            <strong className="text-foreground">
              Authentication information:
            </strong>{" "}
            password hashes, authentication-provider identifiers, hashed refresh
            tokens, session expiry and revocation data, IP address, and
            user-agent information. Signal Desk is designed not to store
            plaintext passwords or refresh tokens.
          </li>
          <li>
            <strong className="text-foreground">Workspace information:</strong>{" "}
            workspace name, type, slug, membership, and role.
          </li>
          <li>
            <strong className="text-foreground">
              Integration information:
            </strong>{" "}
            connected account identifiers, permissions, configuration, and
            credentials or tokens needed to maintain a connection when
            integrations are introduced.
          </li>
          <li>
            <strong className="text-foreground">Service content:</strong>{" "}
            notifications, messages, events, titles, URLs, timestamps, metadata,
            and other content received through a source you choose to connect.
          </li>
          <li>
            <strong className="text-foreground">Settings:</strong> filters,
            delivery preferences, theme choice, and other configuration.
          </li>
          <li>
            <strong className="text-foreground">Communications:</strong>{" "}
            information you provide when requesting support or otherwise
            contacting Signal Desk.
          </li>
          <li>
            <strong className="text-foreground">Technical information:</strong>{" "}
            operational and security logs reasonably needed to run, diagnose,
            and protect the service.
          </li>
        </ul>
        <p>
          Signal Desk does not currently integrate a payment provider. If paid
          plans are introduced, this policy will be updated to identify the
          relevant billing data and service-provider categories before payment
          processing begins.
        </p>
      </LegalSection>

      <LegalSection
        id="connected-services"
        title="3. Information from connected services"
      >
        <p>
          If you choose to connect a third-party service, Signal Desk may
          receive information through that service&apos;s API, webhook, feed, or
          another authorized method. The exact information depends on the
          service you connect, the permissions you grant, and the features you
          enable.
        </p>
        <p>
          Signal Desk will use connected-service credentials only to provide and
          maintain the requested connection. You should grant only the
          permissions you need. Disconnecting a service stops future collection
          through that connection, but does not automatically delete information
          already processed or information held by the original provider.
        </p>
        <p>
          Source integrations are not yet implemented in the current product.
          Candidate future integrations include email, code-hosting, chat,
          calendar, and monitoring services. Provider-specific notices will be
          added when an integration is enabled.
        </p>
      </LegalSection>

      <LegalSection
        id="public-sources"
        title="4. Publicly available information"
      >
        <p>
          Where supported, Signal Desk may monitor or process information made
          publicly accessible through websites, feeds, public APIs, public
          posts, documentation, repositories, news sources, and other public
          online sources.
        </p>
        <p>This information may include:</p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>page, post, comment, or documentation content and titles;</li>
          <li>
            URLs, domains, source references, timestamps, and public metadata;
          </li>
          <li>
            publicly displayed author, account, or organization identifiers;
          </li>
          <li>
            public technical information, snippets, and extracted structured
            information.
          </li>
        </ul>
        <p>
          Public availability does not remove privacy, copyright, contractual,
          or platform protections. Signal Desk will process public-source
          information only for legitimate product purposes and subject to
          applicable law, source availability, technical limits, and relevant
          third-party terms where applicable.
        </p>
        <p>
          Public-source content may contain personal data. A person whose
          information appears in such content may contact [PRIVACY CONTACT
          EMAIL] to request access, deletion, restriction, or objection where
          legally applicable. Removal from Signal Desk does not remove the
          information from the original website or source.
        </p>
      </LegalSection>

      <LegalSection
        id="how-we-use-information"
        title="5. How we use information"
      >
        <p>Signal Desk processes information as needed to:</p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>
            create and administer accounts, workspaces, memberships, and
            sessions;
          </li>
          <li>connect authorized sources and maintain their configuration;</li>
          <li>
            ingest, normalize, filter, deduplicate, classify, and organize
            information;
          </li>
          <li>
            generate alerts and deliver information through enabled channels;
          </li>
          <li>provide support and respond to requests;</li>
          <li>
            monitor reliability, troubleshoot failures, and improve service
            performance;
          </li>
          <li>
            protect accounts, prevent abuse, and enforce applicable terms;
          </li>
          <li>
            comply with legal obligations and establish or defend legal claims.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="ai-processing" title="6. AI and automated processing">
        <p>
          When AI functions are enabled, Signal Desk may use automated systems
          to classify, prioritize, summarize, extract, deduplicate, assess
          relevance, filter, categorize, and generate alerts or derived insights
          from source content.
        </p>
        <p>
          Relevant portions of content may be sent to a third-party AI provider
          when necessary to perform a requested function. No production AI
          provider is currently configured. The provider, processing location,
          retention terms, and data-use settings must be confirmed before this
          processing is enabled.
        </p>
        <p>
          AI output can be incomplete, inaccurate, misleading, or outdated.
          Signal Desk does not guarantee that every relevant event will be
          detected or that every classification, priority, summary, or delivery
          will be correct. Important information should be checked against the
          original source.
        </p>
        <p>
          Signal Desk is not currently designed to make solely automated
          decisions that produce legal or similarly significant effects about
          individuals. If that changes, an additional notice and any legally
          required safeguards will be provided.
        </p>
      </LegalSection>

      <LegalSection id="legal-bases" title="7. Legal bases for processing">
        <p>Where the GDPR or similar law applies, Signal Desk relies on:</p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Contract:</strong> to create
            your account and provide functions you request.
          </li>
          <li>
            <strong className="text-foreground">Legitimate interests:</strong>{" "}
            to secure, maintain, improve, and understand the service; prevent
            abuse; and process relevant public-source information for legitimate
            monitoring and information-management purposes, balanced against
            individual rights.
          </li>
          <li>
            <strong className="text-foreground">Consent:</strong> where consent
            is required for a particular integration, optional technology, or
            other processing. Consent can be withdrawn at any time without
            affecting earlier lawful processing.
          </li>
          <li>
            <strong className="text-foreground">Legal obligation:</strong> where
            processing is required to comply with applicable law.
          </li>
        </ul>
        <p>
          The applicable basis can vary by feature and context. A
          feature-specific notice may provide more detail.
        </p>
      </LegalSection>

      <LegalSection id="sharing" title="8. How information is shared">
        <p>
          Information may be shared with the following categories of recipients:
        </p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>
            hosting, database, infrastructure, security, and support providers;
          </li>
          <li>AI providers when an AI function is enabled and requested;</li>
          <li>
            connected platforms as needed to authenticate, receive, or deliver
            information;
          </li>
          <li>
            professional advisers, authorities, or other parties when required
            by law or reasonably necessary to protect rights, safety, and
            service security;
          </li>
          <li>
            a buyer, investor, or successor in connection with a merger,
            financing, reorganization, or sale, subject to appropriate
            confidentiality and legal requirements.
          </li>
        </ul>
        <p>
          Signal Desk does not currently maintain a finalized public
          subprocessor list. The infrastructure, AI, email, and other production
          providers must be identified before public launch. Signal Desk does
          not sell personal information for money.
        </p>
      </LegalSection>

      <LegalSection
        id="international-transfers"
        title="9. International data transfers"
      >
        <p>
          Signal Desk is operated from Poland. Future service providers or
          connected platforms may process information outside Poland or the
          European Economic Area. Where required, Signal Desk will use an
          appropriate transfer mechanism and supplementary safeguards. The
          actual production locations and transfer mechanisms must be verified
          after providers are selected.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="10. Data retention">
        <p>
          Signal Desk retains information only as long as reasonably necessary
          for the purposes described in this policy, including service delivery,
          security, dispute resolution, and legal compliance. Retention also
          depends on account status, enabled features, and the type and
          sensitivity of the information.
        </p>
        <ul className="marker:text-primary list-disc space-y-2 pl-5">
          <li>Account and workspace data: [ACCOUNT DATA RETENTION PERIOD]</li>
          <li>
            Connected-service events and messages: [EVENT DATA RETENTION PERIOD]
          </li>
          <li>
            Public-source content and derived information: [PUBLIC-SOURCE DATA
            RETENTION PERIOD]
          </li>
          <li>
            Authentication and security logs: [SECURITY LOG RETENTION PERIOD]
          </li>
          <li>Residual copies in backups: [BACKUP RETENTION PERIOD]</li>
        </ul>
        <p>
          These periods must be defined before production launch. Information
          may be retained longer when required by law, needed to resolve a
          dispute, or necessary to protect the service. It may also be
          anonymized so that it no longer identifies an individual.
        </p>
      </LegalSection>

      <LegalSection id="security" title="11. Security">
        <p>
          Signal Desk uses technical and organizational measures appropriate to
          the nature of the service, including password hashing, hashed
          refresh-session tokens, access controls, environment-based secret
          configuration, and encrypted transport where deployed.
        </p>
        <p>
          No system is completely secure. Signal Desk cannot guarantee that
          information will never be lost, misused, or accessed without
          authorization. You are responsible for protecting your credentials and
          the security of accounts you connect.
        </p>
      </LegalSection>

      <LegalSection id="deletion" title="12. Account and data deletion">
        <p>
          When deletion controls are available, you may request deletion of your
          account and associated information by contacting [PRIVACY CONTACT
          EMAIL]. Signal Desk will delete or anonymize eligible information,
          subject to necessary retention for security, legal compliance,
          disputes, and backups.
        </p>
        <p>
          Removing an integration stops future processing through that
          connection but may not immediately delete previously processed data.
          Deleting data from Signal Desk does not delete it from a connected
          service or public source. You must contact the original source if you
          want information removed there.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="13. Your privacy rights">
        <p>
          Subject to applicable law, you may have rights to access, correct,
          delete, restrict, or object to processing of your personal information
          and to receive portable information where applicable. You may withdraw
          consent where processing relies on consent.
        </p>
        <p>
          Send requests to [PRIVACY CONTACT EMAIL]. Signal Desk may need to
          verify your identity and may retain limited information about the
          request. You may also complain to the competent data protection
          authority. In Poland, this is the President of the Personal Data
          Protection Office (Prezes Urzędu Ochrony Danych Osobowych).
        </p>
      </LegalSection>

      <LegalSection id="children" title="14. Children's privacy">
        <p>
          Signal Desk is not intended for children below [MINIMUM USER AGE]. The
          appropriate minimum age depends on the final target market and account
          model and must be confirmed before launch. If you believe a child has
          provided personal information contrary to applicable law, contact
          [PRIVACY CONTACT EMAIL].
        </p>
      </LegalSection>

      <LegalSection id="changes" title="15. Changes to this policy">
        <p>
          This policy may be updated as Signal Desk develops, providers are
          selected, or legal requirements change. Material changes will be
          communicated through the service or another appropriate channel. The
          “Last updated” date will identify the latest version.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="16. Contact">
        <p>Privacy questions, requests, and complaints may be directed to:</p>
        <ul className="list-none space-y-1">
          <li>[LEGAL ENTITY NAME]</li>
          <li>[BUSINESS ADDRESS]</li>
          <li>[PRIVACY CONTACT EMAIL]</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
