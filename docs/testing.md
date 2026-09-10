# Testing

Status: no tests or test runner are configured. Test directories are placeholders; package initializers do not constitute tests.

## Planned coverage

| Layer | Examples |
| --- | --- |
| Unit | Normalization, filter rules, deduplication keys, message formatting |
| Contract | Adapter payload mappings and event-schema compatibility |
| Integration | PostgreSQL persistence, broker redelivery, provider-client boundaries |
| End to end | Source event through the pipeline to a controlled Telegram recipient |

## Critical acceptance scenarios

- An event reaches delivery with AI disabled.
- AI timeout, provider failure, and invalid output all fall back to usable content.
- A duplicate or redelivered event does not cause unintended repeated effects.
- A failed delivery is retried according to a bounded policy.
- Events from different accounts cannot be mixed or delivered to the wrong recipient.

Use synthetic fixtures, isolated databases and queues, and mocked external APIs by default. Keep live-provider tests opt-in with dedicated test accounts. Document verified test commands and cleanup procedures once tooling exists.
