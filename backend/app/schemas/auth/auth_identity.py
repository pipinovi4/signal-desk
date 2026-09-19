from datetime import datetime
from uuid import UUID

from app.schemas.base import BaseSchema
from app.types import AuthIdentityType


class AuthIdentityBase(BaseSchema):
    provider: AuthIdentityType
    provider_subject: str
    provider_email: str | None = None


class AuthIdentityShort(AuthIdentityBase):
    id: UUID


class AuthIdentityProfile(AuthIdentityShort):
    created_at: datetime


class AuthIdentityOut(AuthIdentityProfile):
    user_id: UUID
    updated_at: datetime


class AuthIdentityCreate(AuthIdentityBase):
    user_id: UUID
