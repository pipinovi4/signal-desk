from datetime import UTC, datetime, timedelta

import pytest
from app.errors import InvalidRefreshTokenError
from app.models import AuthSession
from app.services.session.tokens import RefreshTokenManager, Tokens
from sqlalchemy.ext.asyncio import AsyncSession
from tests.conftest import RegisteredUserFactory


async def test_create_and_verify_refresh_token_persists_session(
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    user = await registered_user_factory(
        email="session-user@example.com",
        username="session_user",
        display_name="Session User",
    )
    await db_session.commit()

    # Act
    refresh_token, created_session = await Tokens.create_refresh_token(
        user_id=user.id,
        agent_ip="127.0.0.1",
        user_agent="integration-tests",
        db=db_session,
    )
    await db_session.commit()

    db_session.expunge_all()

    verified_session = await Tokens.verify_refresh_token(
        refresh_token=refresh_token,
        db=db_session,
    )

    # Assert
    assert verified_session.id == created_session.id
    assert verified_session.user_id == user.id
    assert verified_session.user_agent == "integration-tests"
    assert str(verified_session.agent_ip) == "127.0.0.1"
    assert verified_session.revoked_at is None
    assert verified_session.refresh_token_hash != refresh_token
    assert RefreshTokenManager.verify(
        token=refresh_token,
        expected_hash=verified_session.refresh_token_hash,
    )


async def test_verify_refresh_token_rejects_unknown_token(
    db_session: AsyncSession,
) -> None:
    with pytest.raises(InvalidRefreshTokenError):
        await Tokens.verify_refresh_token(
            refresh_token="unknown-refresh-token",
            db=db_session,
        )


async def test_verify_refresh_token_rejects_expired_session(
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    user = await registered_user_factory(
        email="expired-session@example.com",
        username="expired_session",
        display_name="Expired Session",
    )
    await db_session.commit()

    refresh_token = "expired-refresh-token"
    db_session.add(
        AuthSession(
            user_id=user.id,
            refresh_token_hash=RefreshTokenManager.hash(refresh_token),
            expires_at=datetime.now(UTC) - timedelta(seconds=1),
            revoked_at=None,
            user_agent="integration-tests",
            agent_ip="127.0.0.1",
        )
    )
    await db_session.commit()

    # Act / Assert
    with pytest.raises(InvalidRefreshTokenError):
        await Tokens.verify_refresh_token(
            refresh_token=refresh_token,
            db=db_session,
        )


async def test_verify_refresh_token_rejects_revoked_session(
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    user = await registered_user_factory(
        email="revoked-session@example.com",
        username="revoked_session",
        display_name="Revoked Session",
    )
    await db_session.commit()

    refresh_token = "revoked-refresh-token"
    db_session.add(
        AuthSession(
            user_id=user.id,
            refresh_token_hash=RefreshTokenManager.hash(refresh_token),
            expires_at=datetime.now(UTC) + timedelta(minutes=5),
            revoked_at=datetime.now(UTC),
            user_agent="integration-tests",
            agent_ip="127.0.0.1",
        )
    )
    await db_session.commit()

    # Act / Assert
    with pytest.raises(InvalidRefreshTokenError):
        await Tokens.verify_refresh_token(
            refresh_token=refresh_token,
            db=db_session,
        )


async def test_rotate_refresh_token_replaces_old_token(
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    user = await registered_user_factory(
        email="rotate-session@example.com",
        username="rotate_session",
        display_name="Rotate Session",
    )
    await db_session.commit()

    old_token, session = await Tokens.create_refresh_token(
        user_id=user.id,
        agent_ip="127.0.0.1",
        user_agent="integration-tests",
        db=db_session,
    )
    await db_session.commit()

    old_hash = session.refresh_token_hash
    old_expires_at = session.expires_at

    # Act
    new_token = await Tokens.rotate_refresh_token(
        session=session,
        db=db_session,
    )
    await db_session.commit()

    # Assert
    assert new_token != old_token
    assert session.refresh_token_hash != old_hash
    assert session.expires_at >= old_expires_at
    assert RefreshTokenManager.verify(
        token=new_token,
        expected_hash=session.refresh_token_hash,
    )
    assert not RefreshTokenManager.verify(
        token=old_token,
        expected_hash=session.refresh_token_hash,
    )
