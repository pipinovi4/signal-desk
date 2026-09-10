# Event contract

Status: design proposal, not an implemented schema or a stable API.

## Candidate normalized fields

| Field | Intended meaning |
| --- | --- |
| `schema_version` | Version of the internal event contract |
| `event_id` | Internal identifier for tracing and processing |
| `source` | Integration identifier |
| `source_event_id` | Provider identifier, when available |
| `account_id` | Internal owner/account reference, never a credential |
| `occurred_at` | Source timestamp, when available |
| `received_at` | Ingestion timestamp |
| `title`, `content` | Usable normalized content retained for fallback |
| `source_url` | Optional link to the original event |
| `enrichment` | Optional generated title, summary, priority, and classification |

Before implementation, decide required fields, types, size limits, timestamp format, missing-value handling, and schema evolution. Define whether and how raw payloads are retained; avoid retaining unnecessary personal data.

## Queue and processing decisions to document

- Exchange, queue, and routing-key names, plus producer and consumer ownership.
- Deduplication keys and time windows, scoped to the correct account.
- Acknowledgement timing, retry limits, backoff, and failed-message handling.
- Idempotent delivery and recovery after worker restarts.
- AI timeouts, output validation, and fallback selection.

The normalized event must remain deliverable without enrichment. AI-generated text must not overwrite the only copy of the original or normalized content.
