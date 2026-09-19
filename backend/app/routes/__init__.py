from fastapi import APIRouter


def create_api_router() -> APIRouter:
    from app.routes.auth import create_auth_router

    router = APIRouter(prefix="/v1", tags=["api"])

    router.include_router(create_auth_router())

    return router


__all__ = ["create_api_router"]
