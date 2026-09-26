from typing import Never

import pytest
from app.core.settings import settings
from app.models import AuthSession, PasswordCredential, User
from app.services.auth.password import PasswordManager
from app.services.session.tokens import AccessTokenManager, RefreshTokenManager, Tokens
from httpx import AsyncClient
from sqlalchemy import func, select
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

    raw_access_token = response.cookies.get("access_token")

    assert raw_access_token is not None

    access_claims = AccessTokenManager.decode(raw_access_token)

    assert access_claims["sub"] == str(user.id)
    assert access_claims["sid"] == str(auth_session.id)
    assert access_claims["type"] == "access"


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


@pytest.mark.parametrize(
    ("email", "username"),
    [
        (
            "existing@example.com",
            "different_username",
        ),
        (
            "different@example.com",
            "existing_username",
        ),
    ],
    ids=[
        "duplicate-email",
        "duplicate-username",
    ],
)
async def test_register_returns_conflict_for_duplicate_identity(
    client: AsyncClient,
    email: str,
    username: str,
) -> None:
    # Arrange
    existing_payload = {
        "email": "existing@example.com",
        "username": "existing_username",
        "display_name": "Existing User",
        "password": "ExistingPassword123!",
    }
    first_response = await client.post(
        "/v1/auth/register",
        json=existing_payload,
    )
    assert first_response.status_code == 200

    duplicate_payload = {
        "email": email,
        "username": username,
        "display_name": "Duplicate User",
        "password": "DuplicatePassword123!",
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=duplicate_payload,
    )

    # Assert
    assert response.status_code == 409
    assert response.json() == {
        "error": {
            "code": "user_already_exists",
            "message": "A user with this email or username already exists",
        },
    }


async def test_register_rolls_back_if_auth_session_creation_fails(
    client: AsyncClient,
    db_session: AsyncSession,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    # Arrange
    error_message = "Simulated auth session creation failure"

    async def fail_to_create_auth_session(**_kwargs: object) -> Never:
        raise RuntimeError(error_message)

    monkeypatch.setattr(
        Tokens,
        "create_refresh_token",
        fail_to_create_auth_session,
    )

    payload = {
        "email": "rollback@example.com",
        "username": "rollback_user",
        "display_name": "Rollback User",
        "password": "RollbackPassword123!",
    }

    # Act / Assert
    with pytest.raises(RuntimeError, match=error_message):
        await client.post(
            "/v1/auth/register",
            json=payload,
        )

    db_session.expunge_all()

    user_count = await db_session.scalar(select(func.count()).select_from(User))
    credential_count = await db_session.scalar(select(func.count()).select_from(PasswordCredential))
    auth_session_count = await db_session.scalar(select(func.count()).select_from(AuthSession))

    assert user_count == 0
    assert credential_count == 0
    assert auth_session_count == 0


@pytest.mark.parametrize(
    "invalid_username",
    [
        "",
        "ab",
        "a" * 33,
        "invalid-username",
        "admin",
    ],
    ids=[
        "empty",
        "shorter-than-three",
        "longer-than-32",
        "invalid-character",
        "reserved",
    ],
)
async def test_register_rejects_invalid_username(
    client: AsyncClient,
    invalid_username: str,
) -> None:
    payload = {
        "email": "invalid-username@example.com",
        "username": invalid_username,
        "display_name": "Valid Display Name",
        "password": "ValidPassword123!",
    }

    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    assert response.status_code == 422

    errors = response.json()["detail"]

    assert any(error["loc"] == ["body", "username"] for error in errors)


@pytest.mark.parametrize(
    "invalid_display_name",
    [
        "",
        "ab",
        "a" * 33,
    ],
    ids=[
        "empty",
        "shorter-than-three",
        "longer-than-32",
    ],
)
async def test_register_rejects_invalid_display_name(
    client: AsyncClient,
    invalid_display_name: str,
) -> None:
    payload = {
        "email": "invalid-display-name@example.com",
        "username": "valid_username",
        "display_name": invalid_display_name,
        "password": "ValidPassword123!",
    }

    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    assert response.status_code == 422

    errors = response.json()["detail"]

    assert any(error["loc"] == ["body", "display_name"] for error in errors)


@pytest.mark.parametrize(
    "missing_field",
    [
        "email",
        "password",
        "username",
        "display_name",
    ],
)
async def test_register_rejects_missing_required_field(
    client: AsyncClient,
    missing_field: str,
) -> None:
    payload = {
        "email": "missing-field@example.com",
        "username": "missing_field",
        "display_name": "Missing Field",
        "password": "ValidPassword123!",
    }
    payload.pop(missing_field)

    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    assert response.status_code == 422

    errors = response.json()["detail"]

    assert any(
        error["loc"] == ["body", missing_field] and error["type"] == "missing" for error in errors
    )

    assert response.cookies.get("access_token") is None
    assert response.cookies.get("refresh_token") is None


def get_cookie_header(
    headers: list[str],
    cookie_name: str,
) -> str:
    return next(header for header in headers if header.startswith(f"{cookie_name}="))


async def test_register_sets_secure_auth_cookies(
    client: AsyncClient,
) -> None:
    # Arrange
    payload = {
        "email": "cookie-user@example.com",
        "username": "cookie_user",
        "display_name": "Cookie User",
        "password": "ValidPassword123!",
    }

    # Act
    response = await client.post(
        "/v1/auth/register",
        json=payload,
    )

    # Assert
    assert response.status_code == 200

    cookie_headers = response.headers.get_list("set-cookie")

    access_cookie = get_cookie_header(
        cookie_headers,
        "access_token",
    )
    refresh_cookie = get_cookie_header(
        cookie_headers,
        "refresh_token",
    )

    for cookie in (access_cookie, refresh_cookie):
        normalized_cookie = cookie.lower()

        assert "httponly" in normalized_cookie
        assert "path=/" in normalized_cookie
        assert f"samesite={settings.SAMESITE.lower()}" in normalized_cookie

        if settings.SECURE:
            assert "secure" in normalized_cookie
        else:
            assert "secure" not in normalized_cookie
