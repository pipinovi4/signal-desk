from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import UUID

import jwt

from app.core.settings import settings


class AccessTokenError(Exception):
    pass


class AccessTokenExpiredError(AccessTokenError):
    pass


class AccessTokenInvalidError(AccessTokenError):
    pass


class AccessTokenManager:
    _algorithm = "HS256"

    @classmethod
    def encode(
        cls,
        *,
        user_id: UUID,
        session_id: UUID,
    ) -> str:
        now = datetime.now(UTC)

        claims = {
            "sub": str(user_id),
            "sid": str(session_id),
            "type": "access",
            "iat": now,
            "exp": now + timedelta(seconds=settings.ACCESS_EXPIRE_SECONDS),
        }

        return jwt.encode(
            claims,
            settings.JWT_SECRET,
            algorithm=cls._algorithm,
        )

    @classmethod
    def decode(cls, token: str) -> dict[str, Any]:
        try:
            claims: dict[str, Any] = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=[cls._algorithm],
                options={
                    "require": [
                        "sub",
                        "sid",
                        "type",
                        "iat",
                        "exp",
                    ],
                },
            )
        except jwt.ExpiredSignatureError as error:
            raise AccessTokenExpiredError from error
        except jwt.InvalidTokenError as error:
            raise AccessTokenInvalidError from error

        if claims.get("type") != "access":
            raise AccessTokenInvalidError

        try:
            UUID(claims["sub"])
            UUID(claims["sid"])
        except (KeyError, TypeError, ValueError) as error:
            raise AccessTokenInvalidError from error

        return claims
