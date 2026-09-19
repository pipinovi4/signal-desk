from datetime import UTC, datetime, timedelta
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.settings import settings
from app.models.auth_session import AuthSession
from app.services.session.access_token_manager import AccessTokenManager
from app.services.session.refresh_token_manager import RefreshTokenManager


class InvalidCredentialsError(Exception):
    pass


class Tokens:
    @staticmethod
    def create_access_token(user_id: UUID, session_id: UUID) -> str:
        return AccessTokenManager.encode(user_id=user_id, session_id=session_id)

    @staticmethod
    async def create_refresh_token(
        user_id: UUID, agent_ip: str, user_agent: str, db: AsyncSession
    ) -> tuple[str, AuthSession]:
        if not user_id or not agent_ip or not user_agent:
            raise InvalidCredentialsError

        refresh_token = RefreshTokenManager.generate()
        hashed_refresh_token = RefreshTokenManager.hash(refresh_token)

        auth_session = AuthSession(
            user_id=user_id,
            refresh_token_hash=hashed_refresh_token,
            user_agent=user_agent,
            agent_ip=agent_ip,
            expires_at=datetime.now(UTC) + timedelta(seconds=settings.REFRESH_EXPIRE_SECONDS),
        )

        db.add(auth_session)
        await db.flush()

        return refresh_token, auth_session

    @staticmethod
    async def verify_refresh_token(refresh_token: str, db: AsyncSession) -> AuthSession:
        hashed_refresh_token = RefreshTokenManager.hash(refresh_token)

        session = await db.scalar(
            select(AuthSession).where(
                AuthSession.refresh_token_hash == hashed_refresh_token,
                AuthSession.expires_at > datetime.now(UTC),
                AuthSession.revoked_at.is_(None),
            )
        )

        if session is None:
            raise InvalidCredentialsError

        return session
