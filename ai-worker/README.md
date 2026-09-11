# AI worker

Status: scaffold only. Dependencies are managed in the root `pyproject.toml`. The entry point and Dockerfile are empty; processing and AI enrichment are not implemented yet.

`ai-worker/` is the service directory. `ai_worker/` is the Python package containing consumers, prompts, provider adapters, schemas, and processing services. Install the shared Python project from the repository root to import `ai_worker`.

The worker is intended to consume normalized events and optionally enrich them. AI failure must preserve delivery using the original or normalized title and content.

See the [event contract proposal](../docs/events.md), [architecture](../docs/architecture.md), and [development checklist](../docs/development.md). Shared package installation is documented in the development guide; worker startup is not implemented yet.
