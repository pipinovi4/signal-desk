# Environment configuration

SignalDesk keeps runtime configuration beside the service that owns it. Real
environment files are ignored by Git; committed .env.example files contain
only safe development values or placeholders.

## File layout

```text
backend/.env          # API, database client, authentication, and CORS
bot/.env              # Telegram bot
postgres/.env         # PostgreSQL container
rabbitmq/.env         # RabbitMQ container
```

The frontend, AI worker, Redis, and nginx currently read no service-specific
runtime variables, so they do not have committed environment examples. The
frontend uses Compose-only NEXT_TELEMETRY_DISABLED and WATCHPACK_POLLING
settings. Tooling may also read CI; none of these values are application
secrets.

## Development setup

Create each local file from its committed example:

```bash
cp backend/.env.example backend/.env
cp bot/.env.example bot/.env
cp postgres/.env.example postgres/.env
cp rabbitmq/.env.example rabbitmq/.env
```

Replace placeholder secrets before starting services. The backend database
credentials must match the PostgreSQL container credentials:

- backend/.env: DB_USER, DB_PASSWORD, and DB_NAME
- postgres/.env: POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB

docker-compose.dev.yml loads each file with the corresponding service's
env_file. Compose-only runtime controls remain in the Compose file.

## Variable reference

### Backend

| Variable               | Required | Secret | Purpose                                       |
| ---------------------- | -------- | ------ | --------------------------------------------- |
| DB_USER                | Yes      | No     | PostgreSQL application user                   |
| DB_PASSWORD            | Yes      | Yes    | PostgreSQL application password               |
| DB_HOST                | Yes      | No     | PostgreSQL hostname                           |
| DB_PORT                | Yes      | No     | PostgreSQL port                               |
| DB_NAME                | Yes      | No     | PostgreSQL database                           |
| DB_MODE                | No       | No     | Environment label such as development         |
| JWT_SECRET             | Yes      | Yes    | Signs authentication tokens                   |
| JWT_ALGO               | Yes      | No     | JWT signing algorithm                         |
| ACCESS_EXPIRE_SECONDS  | Yes      | No     | Access-token lifetime                         |
| REFRESH_EXPIRE_SECONDS | Yes      | No     | Refresh-token lifetime                        |
| FRONTEND_URL           | Yes      | No     | Public frontend origin                        |
| BACKEND_URL            | Yes      | No     | Public backend base URL                       |
| ALLOWED_ORIGINS        | Yes      | No     | JSON array of browser origins allowed by CORS |

ALLOWED_ORIGINS is a Pydantic list of strings, so use JSON array syntax:

```env
ALLOWED_ORIGINS=["http://localhost:3000"]
```

### Bot

| Variable           | Required | Secret | Purpose                        |
| ------------------ | -------- | ------ | ------------------------------ |
| TELEGRAM_BOT_TOKEN | Yes      | Yes    | Authenticates the Telegram bot |

The bot does not connect to RabbitMQ yet, so no broker variable is defined for
it.

### PostgreSQL

| Variable          | Required | Secret | Purpose                                   |
| ----------------- | -------- | ------ | ----------------------------------------- |
| POSTGRES_DB       | Yes      | No     | Database created by the container         |
| POSTGRES_USER     | Yes      | No     | PostgreSQL administrator/application user |
| POSTGRES_PASSWORD | Yes      | Yes    | Password for that user                    |

### RabbitMQ

| Variable              | Required | Secret | Purpose                   |
| --------------------- | -------- | ------ | ------------------------- |
| RABBITMQ_DEFAULT_USER | Yes      | No     | Initial RabbitMQ user     |
| RABBITMQ_DEFAULT_PASS | Yes      | Yes    | Initial RabbitMQ password |

No application currently consumes RabbitMQ, so broker connection variables will
be added to the consuming services only when that code exists.

## Host and Docker networking

Use published localhost ports from the host:

| Service             | Host address              |
| ------------------- | ------------------------- |
| Frontend            | http://localhost:3000     |
| API through nginx   | http://localhost:8080/api |
| FastAPI directly    | http://localhost:8000     |
| PostgreSQL          | localhost:5432            |
| RabbitMQ AMQP       | localhost:5672            |
| RabbitMQ management | http://localhost:15672    |

Containers resolve one another by Compose service name:

| Service    | Docker address |
| ---------- | -------------- |
| Frontend   | frontend:3000  |
| Backend    | backend:8000   |
| PostgreSQL | postgres:5432  |
| RabbitMQ   | rabbitmq:5672  |

The committed backend example targets Docker and therefore uses
DB_HOST=postgres. Use DB_HOST=localhost when running the backend directly on
the host while PostgreSQL remains published by Compose.

## Public values and secrets

- Never commit real .env files.
- Commit only sanitized .env.example files.
- Inject production secrets through deployment infrastructure or provision the
  service-owned env files securely on the deployment host.
- Replace all development placeholders before production use.
- Variables prefixed with NEXT_PUBLIC_ are bundled for the browser and are
  never secrets. SignalDesk currently defines no NEXT_PUBLIC_ variables.
