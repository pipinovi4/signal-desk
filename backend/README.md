# Backend

The backend is a minimal FastAPI scaffold. `backend.main:app` exposes `GET /health`; through nginx it is available at `/api/health`. Database, RabbitMQ, authentication, and integration routes are not implemented yet.

Development uses Uvicorn reload. Production runs Uvicorn without reload. Shared dependencies are managed by the root `pyproject.toml`; see the [development guide](../docs/development.md) and [deployment guide](../docs/deployment.md).
