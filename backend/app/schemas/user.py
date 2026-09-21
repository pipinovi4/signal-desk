# app/schemas/user.py

from datetime import datetime
from uuid import UUID

from httpx import AsyncClient
from pydantic import EmailStr, Field, field_validator

from app.constants import (
    RESERVED_USERNAMES,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_PATTERN,
)
from app.core.settings import settings
from app.schemas.auth.password import RegistrationPassword
from app.schemas.base import BaseSchema


class UserBase(BaseSchema):
    username: str = Field(
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        pattern=USERNAME_PATTERN,
    )

    display_name: str | None = Field(
        default=None,
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
    )

    avatar_url: str | None = None

    @field_validator("username", mode="before")
    @classmethod
    def normalize_username(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("username")
    @classmethod
    def validate_reserved_username(cls, value: str) -> str:
        if value in RESERVED_USERNAMES:
            raise ValueError("This username is reserved")

        return value


class UserShort(UserBase):
    id: UUID


class UserProfile(UserShort):
    created_at: datetime


class UserOut(UserProfile):
    email: EmailStr
    email_verified_at: datetime | None
    is_active: bool
    updated_at: datetime


class UserCreate(BaseSchema):
    username: str = Field(
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        pattern=USERNAME_PATTERN,
    )
    display_name: str = Field(
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
    )
    email: EmailStr
    password: RegistrationPassword

    @field_validator("username", mode="before")
    @classmethod
    def normalize_username(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("username")
    @classmethod
    def validate_reserved_username(cls, value: str) -> str:
        if value in RESERVED_USERNAMES:
            raise ValueError("This username is reserved")

        return value


class UserRead(BaseSchema):
    id: UUID
    email: EmailStr
    display_name: str
    username: str | None


class UserUpdate(BaseSchema):
    username: str | None = Field(
        default=None,
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        pattern=USERNAME_PATTERN,
    )
    display_name: str | None = Field(
        default=None,
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
    )

    @field_validator("username", mode="before")
    @classmethod
    def normalize_username(cls, value: str | None) -> str | None:
        if value is None:
            return None

        return value.strip().lower()

    @field_validator("username")
    @classmethod
    def validate_reserved_username(cls, value: str | None) -> str | None:
        if value is not None and value in RESERVED_USERNAMES:
            raise ValueError("This username is reserved")

        return value


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
