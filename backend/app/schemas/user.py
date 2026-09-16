# app/schemas/user.py

from datetime import datetime
from uuid import UUID

from pydantic import EmailStr, Field, field_validator

from app.constants import (
    RESERVED_USERNAMES,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_PATTERN,
)
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


class UserUpdate(BaseSchema):
    username: str | None = Field(
        default=None,
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        pattern=USERNAME_PATTERN,
    )

    avatar_url: str | None = None

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
