from fastapi import Response

from app.core.settings import settings


def set_auth_cookies(response: Response, access_token: str, refresh_token: str) -> None:
    access_max_age = settings.ACCESS_EXPIRE_SECONDS
    refresh_max_age = settings.REFRESH_EXPIRE_SECONDS

    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=access_max_age,
        httponly=True,
        secure=settings.SECURE,
        samesite=settings.SAMESITE,
        path=settings.COOKIE_PATH,
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=refresh_max_age,
        httponly=True,
        secure=settings.SECURE,
        samesite=settings.SAMESITE,
        path=settings.COOKIE_PATH,
    )
