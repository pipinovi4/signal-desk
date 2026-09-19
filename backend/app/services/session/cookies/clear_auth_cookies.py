from fastapi import Response

from app.core.settings import settings


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(
        key="access_token",
        path=settings.COOKIE_PATH,
        secure=settings.SECURE,
        httponly=True,
        samesite=settings.SAMESITE,
    )

    response.delete_cookie(
        key="refresh_token",
        path=settings.COOKIE_PATH,
        secure=settings.SECURE,
        httponly=True,
        samesite=settings.SAMESITE,
    )
