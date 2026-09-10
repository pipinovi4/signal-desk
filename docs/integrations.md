# Integrations and delivery

Status: no source integrations or delivery channels are implemented.

Candidate sources include Gmail, Outlook, GitHub, Slack, calendar services, and monitoring systems. Telegram is the first planned delivery channel.

## Document each source adapter

- Provider, supported event types, and scope of the initial implementation.
- Authentication, minimum permissions, account ownership, and credential lifecycle.
- Webhook or polling setup, event authenticity checks, and rate limits.
- Mapping into the [event contract](events.md), including stable source identifiers.
- Pagination or polling checkpoints, duplicate handling, and recovery behavior.
- Sanitized sample events and adapter tests.

## Document each delivery channel

- Recipient registration and ownership verification.
- Message format, content escaping, size limits, and splitting behavior.
- Timeout, retry, and duplicate-delivery behavior.
- How original or normalized content is used when enrichment fails.

Treat source content as untrusted input. When using AI, define which fields may leave the system and keep credentials out of prompts, logs, and examples.
