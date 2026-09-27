from datetime import UTC, datetime
from typing import cast

from app.models import AuthSession, User
from app.services.session.tokens import AccessTokenManager
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession


async def register_user(client: AsyncClient) -> dict[str, object]:
    response = await client.post(
        "/v1/auth/register",
        json={
            "email": "current-user@example.com",
            "username": "current_user",
            "password": "ValidPassword123!",
        },
    )

    assert response.status_code == 201
    return cast(dict[str, object], response.json())


async def test_me_returns_current_database_user(
    client: AsyncClient,
    db_session: AsyncSession,
) -> None:
    expected_user = await register_user(client)

    user = await db_session.get(User, expected_user["id"])
    assert user is not None
    user.display_name = "Updated Name"
    await db_session.flush()

    response = await client.get("/v1/session/me")

    assert response.status_code == 200
    assert response.json() == {
        **expected_user,
        "display_name": "Updated Name",
    }


async def test_me_rejects_request_without_access_token(client: AsyncClient) -> None:
    response = await client.get("/v1/session/me")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "authentication_required"


async def test_me_rejects_invalid_access_token(client: AsyncClient) -> None:
    client.cookies.set("access_token", "invalid-access-token")

    response = await client.get("/v1/session/me")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "authentication_required"


async def test_me_rejects_revoked_session(
    client: AsyncClient,
    db_session: AsyncSession,
) -> None:
    await register_user(client)
    access_token = client.cookies.get("access_token")
    assert access_token is not None

    session_id = AccessTokenManager.decode(access_token)["sid"]
    session = await db_session.get(AuthSession, session_id)
    assert session is not None
    session.revoked_at = datetime.now(UTC)
    await db_session.flush()

    response = await client.get("/v1/session/me")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "authentication_required"


async def test_me_rejects_inactive_user(
    client: AsyncClient,
    db_session: AsyncSession,
) -> None:
    expected_user = await register_user(client)

    user = await db_session.get(User, expected_user["id"])
    assert user is not None
    user.is_active = False
    await db_session.flush()

    response = await client.get("/v1/session/me")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "authentication_required"
