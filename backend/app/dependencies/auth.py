from datetime import UTC, datetime
from typing import Annotated
from uuid import UUID

from fastapi import Cookie, Depends
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.errors import AuthenticationRequiredError
from app.models import AuthSession, User
from app.services.session.tokens.access_token_manager import (
    AccessTokenError,
    AccessTokenManager,
)
from app.utils import DbSession


async def require_session(
    db: DbSession,
    access_token: Annotated[str | None, Cookie()] = None,
) -> AuthSession:
    if access_token is None:
        raise AuthenticationRequiredError

    try:
        claims = AccessTokenManager.decode(access_token)
        user_id = UUID(claims["sub"])
        session_id = UUID(claims["sid"])
    except (AccessTokenError, KeyError, TypeError, ValueError) as error:
        raise AuthenticationRequiredError from error

    session = await db.scalar(
        select(AuthSession)
        .options(joinedload(AuthSession.user))
        .where(
            AuthSession.id == session_id,
            AuthSession.user_id == user_id,
            AuthSession.expires_at > datetime.now(UTC),
            AuthSession.revoked_at.is_(None),
        )
    )

    if session is None or not session.user.is_active:
        raise AuthenticationRequiredError

    return session


CurrentSession = Annotated[AuthSession, Depends(require_session)]


async def require_user(session: CurrentSession) -> User:
    return session.user


CurrentUser = Annotated[User, Depends(require_user)]
