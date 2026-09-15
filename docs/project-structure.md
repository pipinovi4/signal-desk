# Repository structure

Status: current scaffold. Package boundaries are established; application behavior is not implemented.

```text
pyproject.toml  Shared Python metadata, dependencies, and package discovery
backend/
  app/
    db/         Database connections and persistence infrastructure
    core/       Core configuration and application concerns
    jobs/       Background job logic
    models/     Database models
    routes/     API routes
    schemas/    Request and response schemas
    services/   Application services
    types/      Shared application types
    utils/      Focused utility functions
  alembic/      Empty migration directory; Alembic is not initialized
  scripts/      Empty utility-script directory
  tests/        Python test package
  main.py       Empty entry point
ai-worker/
  ai_worker/
    consumers/  Queue consumers
    prompts/    Prompt definitions
    providers/  AI provider adapters
    schemas/    Worker message schemas
    services/   Processing and enrichment services
  tests/        Python test package
  main.py       Empty entry point
bot/
  config/       Configuration package
  constants/    Constants package
  core/         Core package
  handlers/     Telegram interaction handlers
  keyboards/    Telegram buttons and inline/reply keyboards
  rabbitmq/     RabbitMQ client package
  ui/           Tables, charts, and other complex presentation components
  tests/        Python test package
  main.py       Empty entry point
rabbitmq/       RabbitMQ image, definitions, and test directory
nginx/          Development and production proxy configuration
docs/           Design and development documentation
```

Descriptions indicate intended responsibilities, not implemented features. Git does not store empty directories, so `backend/alembic/` and `backend/scripts/` may be absent after cloning until their first files are added.

## Package boundaries

- `ai-worker/` is the service directory. Its importable Python package is `ai_worker/`; retain that package name in future imports and packaging configuration.
- `backend/app/db/` belongs to the backend application package alongside models and services. Alembic tooling stays outside the application package.
- `bot/keyboards/` builds Telegram buttons and inline/reply keyboard layouts.
- `bot/ui/` prepares richer presentation such as tables, charts, and composed visual reports. It stays separate from keyboard construction.
- Bot handlers can coordinate a UI result with a keyboard. Avoid duplicating presentation logic in handlers or making UI renderers responsible for sending Telegram messages.

`__init__.py` marks application and Python test packages. Infrastructure configuration, documentation, standalone scripts, and Alembic directories do not need it merely to preserve folders.

## Future additions

Add integration adapters when implementing the first source. Keep `bot/rabbitmq/` focused on RabbitMQ-specific operations; introduce a broader messaging abstraction only if needed. Avoid growing generic `utils`, `types`, or `core` packages without a specific responsibility.
