from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Enum, ForeignKey, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from app.db.mixins import TimestampMixin, UUIDMixin
from app.types.authidentity import AuthIdentityType

if TYPE_CHECKING:
    from app.models.user import User


class AuthIdentity(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "auth_identities"

    __table_args__ = (
        UniqueConstraint(
            "provider",
            "provider_subject",
            name="uq_auth_identity_provider_subject",
        ),
    )

    user_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    provider: Mapped[AuthIdentityType] = mapped_column(
        Enum(
            AuthIdentityType,
            name="auth_identity_type",
            native_enum=False,
        ),
        nullable=False,
    )

    provider_subject: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    provider_email: Mapped[str | None] = mapped_column(
        String(320),
        nullable=True,
    )

    user: Mapped[User] = relationship(
        back_populates="auth_identities",
    )
