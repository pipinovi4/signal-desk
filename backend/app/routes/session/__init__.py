from fastapi import APIRouter


def create_session_router() -> APIRouter:
    from app.routes.session.logout import router as logout_session_router
    from app.routes.session.me import router as me_session_router
    from app.routes.session.refresh import router as refresh_session_router

    router = APIRouter(prefix="/session", tags=["session"])

    router.include_router(refresh_session_router)
    router.include_router(logout_session_router)
    router.include_router(me_session_router)

    return router


__all__ = ["create_session_router"]
