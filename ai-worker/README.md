# AI worker

Status: runnable lifecycle scaffold. The worker starts, logs its state, waits for a termination signal, and shuts down cleanly. RabbitMQ consumption, processing, and AI enrichment are not implemented yet. Dependencies are managed in the root `pyproject.toml`.

`ai-worker/` is the service directory. `ai_worker/` is the Python package containing consumers, prompts, provider adapters, schemas, and processing services. Install the shared Python project from the repository root to import `ai_worker`.

The worker is intended to consume normalized events and optionally enrich them. AI failure must preserve delivery using the original or normalized title and content.

See the [event contract proposal](../docs/events.md), [architecture](../docs/architecture.md), and [development checklist](../docs/development.md). Shared package installation is documented in the development guide; container startup is documented in the [deployment guide](../docs/deployment.md).
