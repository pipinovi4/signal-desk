from datetime import datetime
from uuid import UUID

from app.schemas.base import BaseSchema
from app.types import MembershipRole


class MembershipBase(BaseSchema):
    user_id: UUID
    workspace_id: UUID
    role: MembershipRole


class MembershipShort(MembershipBase):
    id: UUID


class MembershipProfile(MembershipShort):
    created_at: datetime


class MembershipOut(MembershipProfile):
    updated_at: datetime


class MembershipCreate(BaseSchema):
    user_id: UUID
    workspace_id: UUID
    role: MembershipRole


class MembershipUpdate(BaseSchema):
    role: MembershipRole | None = None
