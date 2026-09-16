from fastapi import APIRouter


def create_api_router() -> APIRouter:
    router = APIRouter(prefix="/v0.1.0", tags=["api"])

    return router


__all__ = ["create_api_router"]
