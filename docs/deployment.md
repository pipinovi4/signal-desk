# Deployment and operations

Docker Compose now defines separate development and production-oriented environments. The containers and minimal process entry points are runnable scaffolds; integrations, persistence code, migrations, RabbitMQ consumers, and notification delivery are not implemented yet.

## Environment

Configuration is owned by each service rather than a shared root .env.
Provision these files from their committed examples:

```bash
cp backend/.env.example backend/.env
cp bot/.env.example bot/.env
cp postgres/.env.example postgres/.env
cp rabbitmq/.env.example rabbitmq/.env
```

Both Compose configurations load those service files directly. Development
values may use Docker service names such as postgres; production values and
secrets must be replaced or injected securely by the deployment
infrastructure. Never commit the real files.

See [environment configuration](environment.md) for the variable reference,
secret classification, CORS format, and host-versus-container networking.

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

After provisioning the service-owned environment files above, run:

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
