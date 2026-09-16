# Local development

Status: Python packaging is configured in the root `pyproject.toml`. Minimal service entry points and Docker Compose environments are configured; there is no implemented notification pipeline yet.

## Environment files

Copy the four service-owned examples before starting the development stack:

```bash
cp backend/.env.example backend/.env
cp bot/.env.example bot/.env
cp postgres/.env.example postgres/.env
cp rabbitmq/.env.example rabbitmq/.env
```

Set a real Telegram token and development secrets locally. Keep the backend
database credentials equal to the PostgreSQL container credentials. See
[environment configuration](environment.md) for the complete variable
reference and Docker-versus-host addresses.

## Shared Python project

Use Python 3.12, 3.13, or 3.14. Python 3.12 is the baseline currently checked locally; later versions have not been tested. The upper bound follows the declared aiogram Python compatibility. All Python services share one dependency manifest and can use one virtual environment.

Run from the repository root in WSL/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
pre-commit install
```

The installation exposes `backend`, `bot`, and `ai_worker`. Use package-qualified imports such as `backend.app.db` and `ai_worker.providers`. The worker package is mapped from `ai-worker/ai_worker`; changing directories or manually setting `PYTHONPATH` is unnecessary after installation.

## Dependency management

Manage runtime dependencies in `[project].dependencies` in the root `pyproject.toml`. The shared set includes FastAPI and Uvicorn for the backend, aiogram for the bot, SQLAlchemy with asyncio support and asyncpg for PostgreSQL access, and Pydantic for validation. PostgreSQL itself is a separate server, not a Python dependency. Database and broker connections are not implemented yet; minimal application startup is available. Do not recreate per-service `requirements.txt` files. Introduce optional dependency groups if services later need separate installation sets.

Development tools are pinned in the `dev` extra: Ruff, mypy, pytest, pytest-asyncio, and pre-commit. A full dependency-locking workflow has not been selected. The manifest alone does not provide a fully locked environment. JavaScript dependencies for the future Next.js frontend will remain in its own `package.json`.

## Quality commands

Activate `.venv` before running these commands from the repository root. GNU Make is available in WSL/Linux; the equivalent commands also work directly from an activated environment.

| Task                | Make command        | Underlying command                        |
| ------------------- | ------------------- | ----------------------------------------- |
| Fix lint and format | `make format`       | `ruff check . --fix` then `ruff format .` |
| Lint                | `make lint`         | `ruff check .`                            |
| Check formatting    | `make format-check` | `ruff format --check .`                   |
| Check types         | `make typecheck`    | `mypy .`                                  |
| Run tests           | `make test`         | `pytest`                                  |
| Run all checks      | `make check`        | Lint, format check, mypy, then pytest     |

Run `pre-commit run --all-files` to check tracked files. Hooks may fix formatting and whitespace; review the diff and rerun after corrections. Ruff and mypy hooks use the active project environment so their versions and imports match development and CI. Install hooks once per clone with `pre-commit install`. GUI commit tools also need the project environment on their PATH.

Configuration lives in `pyproject.toml`; hook wiring lives in `.pre-commit-config.yaml`. Ruff covers linting, import sorting, and formatting. No separate Black, isort, or flake8 installation is needed. mypy uses strict mode and the Pydantic plugin, with no blanket typing exceptions.

GitHub Actions runs the same four read-only check commands on pull requests and pushes to `main`, `master`, and `develop`, using Python 3.12 and pip caching. Python 3.13 and 3.14 remain outside the current CI coverage.

**Scaffold limitation:** there are currently no tests. `pytest` exits with code 5, so `make check` and CI cannot pass until real tests are added with implementation. No dummy tests, skipped placeholders, or success overrides are used.

## Complete with the first runnable service

- [ ] Choose a reproducible dependency-locking workflow and add further dependencies as needed.
- [x] Configure lint, formatting, strict typing, test discovery, and commit hooks.
- [x] Add service-owned .env.example files and document each active variable.
- [x] Define local PostgreSQL and RabbitMQ configuration in Compose.
- [ ] Document service startup, health checks, and shutdown commands.
- [ ] Initialize Alembic and document migration creation and application.
- [ ] Document Telegram delivery with AI disabled.
- [ ] Select a Node.js version when a frontend is added.

Keep real credentials in ignored local environment files or a deployment secret store. Examples must contain placeholders only. A provider key should not be required for the future non-AI delivery path.
