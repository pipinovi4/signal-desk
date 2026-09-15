# Testing

Status: pytest and pytest-asyncio are configured in the root `pyproject.toml`. There are no actual tests yet; package initializers do not constitute tests. Running `pytest` currently exits with code 5 (no tests collected). This also keeps `make check` and CI failing until meaningful tests exist.

## Running tests

Install the `dev` extra and activate the project environment as described in [local development](development.md), then run `pytest` or `make test` from the repository root.

Discovery covers `backend/tests`, `bot/tests`, `ai-worker/tests`, and `rabbitmq/tests`. Add real tests using pytest naming conventions (`test_*.py` and `test_*` functions) alongside implemented behavior. Async tests use automatic asyncio mode and function-scoped event loops.

Unknown markers and configuration options fail validation. Warnings are treated as errors; there are currently no warning exceptions. If a future third-party warning cannot be resolved, document and scope any exception to its precise message and category.

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

Use synthetic fixtures, isolated databases and queues, and mocked external APIs by default. Keep live-provider tests opt-in with dedicated test accounts. Document service-specific fixtures and cleanup procedures when integration tests are added.
