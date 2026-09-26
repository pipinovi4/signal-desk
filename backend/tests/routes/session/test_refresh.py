from typing import Never

import pytest
from app.core.settings import settings
from app.models import AuthSession
from app.services.session.tokens import (
    AccessTokenManager,
    RefreshTokenManager,
    Tokens,
)
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from tests.conftest import RegisteredUserFactory


def get_cookie_header(
    headers: list[str],
    cookie_name: str,
) -> str:
    return next(header for header in headers if header.startswith(f"{cookie_name}="))


async def create_refresh_session(
    *,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
    email: str,
    username: str,
) -> tuple[str, AuthSession]:
    user = await registered_user_factory(
        email=email,
        username=username,
        display_name="Refresh User",
    )
    await db_session.commit()

    refresh_token, session = await Tokens.create_refresh_token(
        user_id=user.id,
        agent_ip="127.0.0.1",
        user_agent="refresh-tests",
        db=db_session,
    )
    await db_session.commit()

    return refresh_token, session


async def test_refresh_rotates_token_and_sets_valid_auth_cookies(
    client: AsyncClient,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    old_refresh_token, created_session = await create_refresh_session(
        db_session=db_session,
        registered_user_factory=registered_user_factory,
        email="refresh-user@example.com",
        username="refresh_user",
    )
    old_hash = created_session.refresh_token_hash
    created_session_id = created_session.id

    client.cookies.set("refresh_token", old_refresh_token)

    # Act
    response = await client.post("/v1/session/refresh")

    # Assert
    assert response.status_code == 200

    new_refresh_token = response.cookies.get("refresh_token")
    access_token = response.cookies.get("access_token")

    assert new_refresh_token is not None
    assert access_token is not None
    assert new_refresh_token != old_refresh_token

    db_session.expunge_all()
    persisted_session = await db_session.get(
        AuthSession,
        created_session_id,
    )

    assert persisted_session is not None
    assert persisted_session.refresh_token_hash != old_hash
    assert RefreshTokenManager.verify(
        token=new_refresh_token,
        expected_hash=persisted_session.refresh_token_hash,
    )
    assert not RefreshTokenManager.verify(
        token=old_refresh_token,
        expected_hash=persisted_session.refresh_token_hash,
    )

    claims = AccessTokenManager.decode(access_token)

    assert claims["sub"] == str(persisted_session.user_id)
    assert claims["sid"] == str(persisted_session.id)
    assert claims["type"] == "access"

    cookie_headers = response.headers.get_list("set-cookie")
    expected_cookies = {
        "access_token": settings.ACCESS_EXPIRE_SECONDS,
        "refresh_token": settings.REFRESH_EXPIRE_SECONDS,
    }

    assert len(cookie_headers) == len(expected_cookies)

    for cookie_name, expected_max_age in expected_cookies.items():
        cookie_header = get_cookie_header(
            cookie_headers,
            cookie_name,
        )
        attributes = {part.strip().lower() for part in cookie_header.split(";")[1:]}

        assert "httponly" in attributes
        assert f"path={settings.COOKIE_PATH.lower()}" in attributes
        assert f"samesite={settings.SAMESITE.lower()}" in attributes
        assert f"max-age={expected_max_age}" in attributes
        assert ("secure" in attributes) is settings.SECURE


@pytest.mark.parametrize(
    "refresh_token",
    [
        None,
        "invalid-refresh-token",
    ],
    ids=[
        "missing-token",
        "invalid-token",
    ],
)
async def test_refresh_rejects_missing_or_invalid_token(
    client: AsyncClient,
    refresh_token: str | None,
) -> None:
    # Arrange
    if refresh_token is not None:
        client.cookies.set("refresh_token", refresh_token)

    # Act
    response = await client.post("/v1/session/refresh")

    # Assert
    assert response.status_code == 401
    assert response.json() == {
        "error": {
            "code": "invalid_refresh_token",
            "message": "Invalid refresh token",
        },
    }
    assert response.cookies.get("access_token") is None
    assert response.cookies.get("refresh_token") is None


async def test_refresh_rolls_back_rotation_if_access_token_creation_fails(
    client: AsyncClient,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    # Arrange
    old_refresh_token, created_session = await create_refresh_session(
        db_session=db_session,
        registered_user_factory=registered_user_factory,
        email="refresh-rollback@example.com",
        username="refresh_rollback",
    )
    old_hash = created_session.refresh_token_hash
    created_session_id = created_session.id
    old_expires_at = created_session.expires_at
    error_message = "Simulated access token creation failure"

    def fail_to_create_access_token(**_kwargs: object) -> Never:
        raise RuntimeError(error_message)

    monkeypatch.setattr(
        Tokens,
        "create_access_token",
        fail_to_create_access_token,
    )
    client.cookies.set("refresh_token", old_refresh_token)

    # Act / Assert
    with pytest.raises(RuntimeError, match=error_message):
        await client.post("/v1/session/refresh")

    db_session.expunge_all()
    persisted_session = await db_session.get(
        AuthSession,
        created_session_id,
    )

    assert persisted_session is not None
    assert persisted_session.refresh_token_hash == old_hash
    assert persisted_session.expires_at == old_expires_at
    assert RefreshTokenManager.verify(
        token=old_refresh_token,
        expected_hash=persisted_session.refresh_token_hash,
    )
