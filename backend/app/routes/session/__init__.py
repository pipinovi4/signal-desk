from fastapi import APIRouter


def create_session_router() -> APIRouter:
    from app.routes.session.logout import router as logout_auth_router
    from app.routes.session.refresh import router as refresh_auth_router

    router = APIRouter(prefix="/session", tags=["session"])

    router.include_router(refresh_auth_router)
    router.include_router(logout_auth_router)

    return router


__all__ = ["create_session_router"]
