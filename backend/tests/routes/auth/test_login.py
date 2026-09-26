import pytest
from app.models import AuthSession
from app.services.session.tokens import AccessTokenManager, RefreshTokenManager
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from tests.conftest import RegisteredUserFactory


async def test_login_returns_user_and_cookies(
    client: AsyncClient,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    user_email = "random_email@example.com"
    user_password = "Password123!"

    expected_user = await registered_user_factory(
        email=user_email,
        password=user_password,
        username="alice",
        display_name="Alice",
    )

    await db_session.commit()

    payload = {
        "email": user_email,
        "password": user_password,
    }

    # Act
    response = await client.post(
        "/v1/auth/login",
        json=payload,
    )

    # Assert
    assert response.status_code == 200, response.json()

    body = response.json()

    assert body["id"] == str(expected_user.id)
    assert body["email"] == user_email
    assert body["display_name"] == expected_user.display_name
    assert body["username"] == expected_user.username

    assert "password" not in body
    assert "password_hash" not in body

    assert response.cookies.get("access_token") is not None
    assert response.cookies.get("refresh_token") is not None
    assert "id" in body
    assert "password" not in body
    assert "password_hash" not in body


async def test_login_creates_session_and_valid_tokens(
    client: AsyncClient,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Assert
    user_email = "random_email@example.com"
    user_password = "Password123!"

    await registered_user_factory(
        email=user_email,
        password=user_password,
        username="alice",
        display_name="Alice",
    )

    await db_session.commit()

    db_session.expunge_all()

    payload = {
        "email": user_email,
        "password": user_password,
    }

    # Act
    response = await client.post("/v1/auth/login", json=payload)

    # Assert: successful request
    assert response.status_code == 200

    db_session.expunge_all()

    body = response.json()

    auth_session = await db_session.scalar(
        select(AuthSession).where(AuthSession.user_id == body["id"])
    )

    assert auth_session.revoked_at is None

    raw_refresh_token = response.cookies.get("refresh_token")

    assert raw_refresh_token is not None

    assert auth_session.refresh_token_hash != raw_refresh_token

    assert RefreshTokenManager.verify(
        token=raw_refresh_token, expected_hash=auth_session.refresh_token_hash
    )

    raw_access_token = response.cookies.get("access_token")

    assert raw_access_token is not None

    access_claims = AccessTokenManager.decode(raw_access_token)

    assert access_claims["sub"] == str(body["id"])
    assert access_claims["sid"] == str(auth_session.id)
    assert access_claims["type"] == "access"


@pytest.mark.parametrize(
    ("email", "password"),
    [
        (
            "alice@example.com",
            "IncorrectPassword123!",
        ),
        (
            "unknown@example.com",
            "CorrectPassword123!",
        ),
    ],
    ids=[
        "incorrect-password",
        "unknown-email",
    ],
)
async def test_login_rejects_invalid_credentials(
    client: AsyncClient,
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
    email: str,
    password: str,
) -> None:
    # Arrange
    await registered_user_factory(
        email="alice@example.com",
        password="CorrectPassword123!",
        username="alice",
        display_name="Alice",
    )
    await db_session.commit()

    payload = {
        "email": email,
        "password": password,
    }

    # Act
    response = await client.post(
        "/v1/auth/login",
        json=payload,
    )

    # Assert: HTTP response
    assert response.status_code == 401

    assert response.json() == {
        "error": {
            "code": "invalid_credentials",
            "message": "Invalid email or password",
        },
    }

    # Assert: cookies were not created
    assert response.cookies.get("access_token") is None
    assert response.cookies.get("refresh_token") is None
