from datetime import datetime
from uuid import UUID

from pydantic import Field

from app.schemas.base import BaseSchema
from app.types import WorkspaceType


class WorkspaceBase(BaseSchema):
    display_name: str = Field(
        min_length=1,
        max_length=320,
    )

    slug: str = Field(
        min_length=3,
        max_length=255,
    )


class WorkspaceShort(WorkspaceBase):
    id: UUID


class WorkspaceProfile(WorkspaceShort):
    type: WorkspaceType
    created_at: datetime


class WorkspaceOut(WorkspaceProfile):
    updated_at: datetime


class WorkspaceUpdate(BaseSchema):
    display_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=320,
    )

    slug: str | None = Field(
        default=None,
        min_length=3,
        max_length=255,
    )


class WorkspaceCreate(BaseSchema):
    display_name: str = Field(
        min_length=1,
        max_length=320,
    )

    slug: str = Field(
        min_length=3,
        max_length=255,
    )
