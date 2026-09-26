from app.core.settings import settings
from app.models import AuthSession
from app.services.session.tokens import Tokens
from httpx import AsyncClient
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from tests.conftest import RegisteredUserFactory


def assert_auth_cookies_cleared(response_headers: list[str]) -> None:
    assert len(response_headers) == 2
    assert any(header.startswith("access_token=") for header in response_headers)
    assert any(header.startswith("refresh_token=") for header in response_headers)

    for header in response_headers:
        attributes = {part.strip().lower() for part in header.split(";")[1:]}

        assert "httponly" in attributes
        assert "max-age=0" in attributes
        assert f"path={settings.COOKIE_PATH.lower()}" in attributes
        assert f"samesite={settings.SAMESITE.lower()}" in attributes
        assert ("secure" in attributes) is settings.SECURE


async def test_logout_revokes_session_and_clears_auth_cookies(
    client: AsyncClient,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    user = await registered_user_factory(
        email="logout-user@example.com",
        username="logout_user",
        display_name="Logout User",
    )
    await db_session.commit()

    refresh_token, created_session = await Tokens.create_refresh_token(
        user_id=user.id,
        agent_ip="127.0.0.1",
        user_agent="logout-tests",
        db=db_session,
    )
    await db_session.commit()
    created_session_id = created_session.id

    # Act
    response = await client.post(
        "/v1/session/logout",
        headers={
            "cookie": (f"access_token=access-token; refresh_token={refresh_token}"),
        },
    )

    # Assert
    assert response.status_code == 200

    db_session.expunge_all()
    persisted_session = await db_session.get(
        AuthSession,
        created_session_id,
    )

    assert persisted_session is not None
    assert persisted_session.revoked_at is not None
    assert persisted_session.revoked_at.tzinfo is not None

    assert_auth_cookies_cleared(response.headers.get_list("set-cookie"))


async def test_logout_without_refresh_cookie_is_idempotent(
    client: AsyncClient,
    db_session: AsyncSession,
) -> None:
    # Act
    response = await client.post(
        "/v1/session/logout",
        headers={
            "cookie": "access_token=access-token",
        },
    )

    # Assert
    assert response.status_code == 200
    assert_auth_cookies_cleared(response.headers.get_list("set-cookie"))

    auth_session_count = await db_session.scalar(select(func.count()).select_from(AuthSession))
    assert auth_session_count == 0


async def test_logout_with_invalid_refresh_cookie_is_idempotent(
    client: AsyncClient,
    db_session: AsyncSession,
) -> None:
    # Act
    response = await client.post(
        "/v1/session/logout",
        headers={
            "cookie": ("access_token=access-token; refresh_token=invalid-refresh-token"),
        },
    )

    # Assert
    assert response.status_code == 200
    assert_auth_cookies_cleared(response.headers.get_list("set-cookie"))

    auth_session_count = await db_session.scalar(select(func.count()).select_from(AuthSession))
    assert auth_session_count == 0
