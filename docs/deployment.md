# Deployment and operations

Docker Compose now defines separate development and production-oriented environments. The containers and minimal process entry points are runnable scaffolds; integrations, persistence code, migrations, RabbitMQ consumers, and notification delivery are not implemented yet.

## Environment

Copy `.env.example` to `.env` and replace every placeholder before production startup:

- POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD configure PostgreSQL.
- DATABASE_URL is the SQLAlchemy/asyncpg URL used by backend and worker.
- RABBITMQ_USER, RABBITMQ_PASSWORD configure RabbitMQ.
- AMQP_URL is the broker URL used by backend, worker, and bot.

URL-encode credentials embedded in DATABASE_URL and AMQP_URL when they contain reserved URL characters.
- `TELEGRAM_BOT_TOKEN` is required for Telegram long polling.

Development uses local PostgreSQL and RabbitMQ credentials declared in `docker-compose.dev.yml`. Set `TELEGRAM_BOT_TOKEN` in the shell or an untracked `.env` file to keep the bot running; without it, the bot exits with a clear error while the other services remain usable.

## Development

Build on the first run or after changing Dockerfiles, `pyproject.toml`, or `package-lock.json`:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Normal subsequent startup:

```bash
docker compose -f docker-compose.dev.yml up
```

Open the application through nginx at `http://localhost:8080`. Direct debugging ports are Next.js at `3000`, FastAPI at `8000`, PostgreSQL at `5432`, AMQP at `5672`, and RabbitMQ management at `15672`.

Frontend source is bind-mounted while `node_modules` and `.next` stay in named volumes. Next.js runs its dev server with polling enabled for Docker/WSL file events. Backend uses Uvicorn reload. The worker and bot use `watchfiles` to restart their processes after Python changes. PostgreSQL and RabbitMQ data survive ordinary container restarts in named development volumes.

## Production-oriented Compose

Create `.env`, then run:

```bash
docker compose up -d --build
```

Only nginx publishes a host port (`80`). Frontend uses its standalone Next.js build, FastAPI runs without reload, and worker/bot processes run without watchers. Application containers run as the non-root `signaldesk` user; the Next.js image uses its existing `nextjs` user. PostgreSQL and RabbitMQ use persistent named volumes and health-gated dependencies.

The production Compose file is an operational baseline, not a complete internet-facing deployment. Add TLS, backups, resource limits, centralized logs, monitoring, migrations, and a deployment secret manager before public use.

## Routes and health

- `/` and Next.js development WebSockets proxy to `frontend:3000`.
- `/api/*` proxies to `backend:8000` with the `/api` prefix removed upstream.
- `/api/health` returns the FastAPI process health response.

Compose waits for PostgreSQL, RabbitMQ, frontend, and backend health where readiness affects dependent startup. The current backend health endpoint confirms process readiness only; it does not yet verify database or broker connectivity.

## Data and cleanup

Ordinary `docker compose down` preserves named volumes. Commands with `down --volumes` delete PostgreSQL, RabbitMQ, and development dependency/cache volumes and should be used only when that data can be discarded.

## Remaining operational work

- Initialize Alembic and document migration ordering and rollback limits.
- Implement broker/database connections, delivery retries, and graceful consumer shutdown.
- Define backup schedules and verify PostgreSQL restoration.
- Add structured logging, correlation IDs, queue metrics, and failed-message recovery.
- Configure TLS and a production secret manager.
