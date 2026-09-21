import pytest
from app.core.settings import settings
from app.models import User
from app.services.auth.password import PasswordManager
from app.services.session.tokens import RefreshTokenManager
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload


async def test_register_returns_user_and_auth_cookies(
    client: AsyncClient,
) -> None:
    # Arrange
    payload = {
        "email": "alice@example.com",
        "username": "alice",
        "display_name": "Alice",
        "password": "StrongPassword123!",
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    # Assert: HTTP response

    assert response.status_code == 200

    body = response.json()

    assert body["email"] == payload["email"]
    assert body["username"] == payload["username"]
    assert body["display_name"] == payload["display_name"]
    assert "id" in body
    assert "password" not in body
    assert "password_hash" not in body

    # Assert: cookie security attributes
    set_cookie_headers = response.headers.get_list("set-cookie")

    assert len(set_cookie_headers) == 2

    for header in set_cookie_headers:
        normalized_header = header.lower()

        assert "httponly" in normalized_header
        assert f"samesite={settings.SAMESITE}" in normalized_header
        assert "samesite" in normalized_header

        if settings.SECURE:
            assert "secure" in normalized_header


async def test_register_persists_user_credentials_and_auth_session(
    client: AsyncClient,
    db_session: AsyncSession,
) -> None:
    # Arrange
    password = "StrongPassword123!"
    payload = {
        "email": "database-user@example.com",
        "username": "database_user",
        "display_name": "Database User",
        "password": password,
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    # Assert: successful request
    assert response.status_code == 200

    db_session.expunge_all()

    user = await db_session.scalar(
        select(User)
        .options(
            selectinload(User.password_credential),
            selectinload(User.auth_sessions),
        )
        .where(User.email == payload["email"])
    )

    assert user is not None
    assert user.email == payload["email"]
    assert user.username == payload["username"]
    assert user.display_name == payload["display_name"]

    credential = user.password_credential

    assert credential is not None
    assert credential.password_hash != password
    assert PasswordManager.verify(
        password,
        credential.password_hash,
    )

    assert user.auth_sessions is not None

    assert len(user.auth_sessions) == 1

    auth_session = user.auth_sessions[0]

    assert auth_session.user_id == user.id
    assert auth_session.revoked_at is None

    raw_refresh_token = response.cookies.get("refresh_token")

    assert raw_refresh_token is not None

    assert auth_session.refresh_token_hash != raw_refresh_token

    assert RefreshTokenManager.verify(
        token=raw_refresh_token, expected_hash=auth_session.refresh_token_hash
    )


@pytest.mark.parametrize(
    "invalid_email",
    [
        "not-an-email",
        "alice.example.com",
        "alice@",
    ],
    ids=[
        "missing-at-sign",
        "missing-at-sign-with-domain",
        "missing-domain",
    ],
)
async def test_register_rejects_invalid_email(
    client: AsyncClient,
    invalid_email: str,
) -> None:
    # Arrange
    payload = {
        "email": invalid_email,
        "username": "invalid_email_user",
        "display_name": "Invalid Email User",
        "password": "StrongPassword123!",
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    # Assert
    assert response.status_code == 422

    errors = response.json()["detail"]

    assert any(error["loc"] == ["body", "email"] for error in errors)
    assert response.cookies.get("access_token") is None
    assert response.cookies.get("refresh_token") is None


@pytest.mark.parametrize(
    "invalid_password",
    [
        "",
        "1234567",
        "a" * 129,
        "valid password",
        "valid\tpassword",
    ],
    ids=[
        "empty",
        "shorter-than-eight",
        "longer-than-128",
        "contains-space",
        "contains-tab",
    ],
)
async def test_register_rejects_invalid_password(
    client: AsyncClient,
    invalid_password: str,
) -> None:
    # Arrange
    payload = {
        "email": "invalid-password@example.com",
        "username": "invalid_password_user",
        "display_name": "Invalid Password User",
        "password": invalid_password,
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    # Assert
    assert response.status_code == 422

    errors = response.json()["detail"]

    assert any(error["loc"] == ["body", "password"] for error in errors)
    assert response.cookies.get("access_token") is None
    assert response.cookies.get("refresh_token") is None


@pytest.mark.parametrize(
    "valid_password",
    [
        "a" * 8,
        "a" * 128,
    ],
    ids=[
        "minimum-length",
        "maximum-length",
    ],
)
async def test_register_accepts_password_at_length_boundaries(
    client: AsyncClient,
    valid_password: str,
) -> None:
    # Arrange
    password_length = len(valid_password)
    payload = {
        "email": f"password-{password_length}@example.com",
        "username": f"password_{password_length}",
        "display_name": f"Password {password_length}",
        "password": valid_password,
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    # Assert
    assert response.status_code == 200
