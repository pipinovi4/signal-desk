"""SignalDesk backend application entry point."""

import logging

from app.core import lifespan
from app.core.settings import settings
from app.routes import create_api_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger("signalDesk.backend.main")


def create_app() -> FastAPI:
    app = FastAPI(title="SignalDesk API", version="0.1.0", root_path="/api", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(create_api_router())

    return app


signal_desk_app = create_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(signal_desk_app, host="0.0.0.0", port=8000)
