# Local development

Status: setup documentation scaffold. No validated install or startup command is available yet.

## Complete with the first runnable service

- [ ] Select supported Python and, when a frontend exists, Node.js versions.
- [ ] Declare service dependencies and choose a reproducible dependency-locking workflow.
- [ ] Add sanitized `.env.example` files and document each variable: purpose, required status, default, and owning service.
- [ ] Define local PostgreSQL and RabbitMQ configuration in Compose.
- [ ] Document working directories, installation, startup, health checks, and shutdown commands.
- [ ] Initialize Alembic and document migration creation and application.
- [ ] Document how to run Telegram delivery with AI disabled.

## Configuration conventions

Keep real credentials in ignored local environment files or a deployment secret store. Examples must contain placeholders only. A provider key should not be required for the future non-AI delivery path.

Run services in separate environments until package names and import paths are explicitly configured. Do not infer supported runtime versions or dependencies from empty Dockerfiles and requirements files.
