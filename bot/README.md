# Telegram bot

Status: scaffold only. The entry point, dependency file, and Dockerfile are empty; Telegram delivery is not implemented yet.

## Responsibilities

The bot is intended to deliver notifications and handle Telegram interactions.

| Package | Intended responsibility |
| --- | --- |
| `handlers/` | Handle interactions and coordinate responses |
| `keyboards/` | Build buttons and inline/reply keyboard layouts |
| `ui/` | Prepare tables, charts, and other complex presentation components |
| `rabbitmq/` | RabbitMQ-specific communication |
| `config/`, `constants/`, `core/` | Configuration and supporting application code |

Keep `ui/` and `keyboards/` separate. A handler may combine a generated table or chart with navigation buttons; the renderer should not own Telegram delivery.

See the [architecture](../docs/architecture.md) and [development checklist](../docs/development.md). Startup instructions will be added with a working implementation.
