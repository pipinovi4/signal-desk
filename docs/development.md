# Local development

Status: Python packaging is configured in the root `pyproject.toml`. The application entry points and deployment files are still placeholders; there is no runnable notification pipeline yet.

## Shared Python project

Use Python 3.12, 3.13, or 3.14. Python 3.12 is the baseline currently checked locally; later versions have not been tested. The upper bound follows the declared aiogram Python compatibility. All Python services share one dependency manifest and can use one virtual environment.

Run from the repository root in WSL/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
```

The installation exposes `backend`, `bot`, and `ai_worker`. Use package-qualified imports such as `backend.app.db` and `ai_worker.providers`. The worker package is mapped from `ai-worker/ai_worker`; changing directories or manually setting `PYTHONPATH` is unnecessary after installation.

## Dependency management

Manage runtime dependencies in `[project].dependencies` in the root `pyproject.toml`. The shared set includes FastAPI and Uvicorn for the backend, aiogram for the bot, SQLAlchemy with asyncio support and asyncpg for PostgreSQL access, and Pydantic for validation. PostgreSQL itself is a separate server, not a Python dependency. Database connections and application startup are not implemented yet. Do not recreate per-service `requirements.txt` files. Introduce optional dependency groups if services later need separate installation sets.

A lockfile workflow and development tools have not been selected. The manifest alone does not provide a fully locked environment. JavaScript dependencies for the future Next.js frontend will remain in its own `package.json`.

## Complete with the first runnable service

- [ ] Choose a reproducible dependency-locking workflow and add further dependencies as needed.
- [ ] Add test and lint tooling and document verified commands.
- [ ] Add sanitized `.env.example` files and document purpose, required status, default, and owning service for each variable.
- [ ] Define local PostgreSQL and RabbitMQ configuration in Compose.
- [ ] Document service startup, health checks, and shutdown commands.
- [ ] Initialize Alembic and document migration creation and application.
- [ ] Document Telegram delivery with AI disabled.
- [ ] Select a Node.js version when a frontend is added.

Keep real credentials in ignored local environment files or a deployment secret store. Examples must contain placeholders only. A provider key should not be required for the future non-AI delivery path.
