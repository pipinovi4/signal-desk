from typing import TYPE_CHECKING

from sqlalchemy import Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import SlugMixin, TimestampMixin, UUIDMixin
from app.types import WorkspaceType

if TYPE_CHECKING:
    from app.models.membership import Membership


class Workspace(Base, UUIDMixin, TimestampMixin, SlugMixin):
    __tablename__ = "workspaces"

    memberships: Mapped[list["Membership"]] = relationship(
        back_populates="workspace",
        cascade="all, delete-orphan",
    )
    display_name: Mapped[str] = mapped_column(
        String(320),
        nullable=False,
    )

    type: Mapped[WorkspaceType] = mapped_column(
        Enum(
            WorkspaceType,
            name="workspace_type",
            native_enum=False,
        ),
        nullable=False,
    )
