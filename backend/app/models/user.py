from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, String, true
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from app.db.mixins import TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from app.models.auth_identity import AuthIdentity
    from app.models.auth_session import AuthSession
    from app.models.membership import Membership
    from app.models.password_credential import PasswordCredential


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    memberships: Mapped[list["Membership"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )

    password_credential: Mapped["PasswordCredential | None"] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        uselist=False,
    )

    auth_identities: Mapped[list["AuthIdentity"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )

    auth_sessions: Mapped[list["AuthSession"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )

    email: Mapped[str] = mapped_column(
        String(320),
        unique=True,
        nullable=False,
    )

    display_name: Mapped[str] = mapped_column(
        String(320),
        nullable=False,
    )

    username: Mapped[str | None] = mapped_column(
        String(120),
        nullable=True,
        unique=True,
    )

    avatar_url: Mapped[str | None] = mapped_column(
        String(2048),
        nullable=True,
    )

    email_verified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        server_default=true(),
        nullable=False,
    )
