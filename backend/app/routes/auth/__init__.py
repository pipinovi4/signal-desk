from fastapi import APIRouter


def create_auth_router() -> APIRouter:
    from app.routes.auth.login import router as login_auth_router
    from app.routes.auth.register import router as register_auth_router

    router = APIRouter(prefix="/auth", tags=["auth"])

    router.include_router(register_auth_router)
    router.include_router(login_auth_router)

    return router


__all__ = ["create_auth_router"]
