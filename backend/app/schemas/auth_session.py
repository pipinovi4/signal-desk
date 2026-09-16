from datetime import datetime
from uuid import UUID

from pydantic import Field

from app.schemas.base import BaseSchema


class AuthSessionBase(BaseSchema):
    expires_at: datetime
    user_agent: str | None = Field(
        default=None,
        max_length=512,
    )
    agent_ip: str | None = None


class AuthSessionShort(AuthSessionBase):
    id: UUID


class AuthSessionProfile(AuthSessionShort):
    last_used_at: datetime | None = None
    revoked_at: datetime | None = None
    created_at: datetime


class AuthSessionOut(AuthSessionProfile):
    user_id: UUID
    updated_at: datetime


class AuthSessionCreate(BaseSchema):
    user_id: UUID
    refresh_token_hash: str = Field(
        min_length=64,
        max_length=64,
    )
    expires_at: datetime
    user_agent: str | None = Field(
        default=None,
        max_length=512,
    )
    agent_ip: str | None = None


class AuthSessionUpdate(BaseSchema):
    refresh_token_hash: str | None = Field(
        default=None,
        min_length=64,
        max_length=64,
    )
    expires_at: datetime | None = None
    last_used_at: datetime | None = None
    revoked_at: datetime | None = None
