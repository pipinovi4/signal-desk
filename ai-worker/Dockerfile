FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN addgroup --system signaldesk \
    && adduser --system --ingroup signaldesk signaldesk

COPY pyproject.toml README.md LICENSE ./
COPY backend ./backend
COPY bot ./bot
COPY ai-worker ./ai-worker


FROM base AS development

RUN python -m pip install --no-cache-dir -e ".[dev]"

USER signaldesk

CMD ["watchfiles", "python -m ai_worker.main", "ai-worker"]


FROM base AS production

RUN python -m pip install --no-cache-dir .

USER signaldesk

CMD ["python", "-m", "ai_worker.main"]
