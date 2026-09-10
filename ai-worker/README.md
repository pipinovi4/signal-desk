# AI worker

Status: scaffold only. The entry point, dependency file, and Dockerfile are empty; processing and AI enrichment are not implemented yet.

`ai-worker/` is the service directory. `ai_worker/` is the Python package containing consumers, prompts, provider adapters, schemas, and processing services. Future imports should use `ai_worker` when the service directory is on the Python import path or the package has been installed.

The worker is intended to consume normalized events and optionally enrich them. AI failure must preserve delivery using the original or normalized title and content.

See the [event contract proposal](../docs/events.md), [architecture](../docs/architecture.md), and [development checklist](../docs/development.md). Packaging and startup commands remain to be implemented and verified.
