from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.user import User
from app.schemas.auth.auth import LoginSchema
from app.services.auth.password import PasswordManager


class InvalidCredentials(Exception):
    pass


async def login(
    data: LoginSchema,
    db: AsyncSession,
) -> User:
    email = data.email.strip().lower()

    user: User | None = await db.scalar(
        select(User).options(selectinload(User.password_credential)).where(User.email == email)
    )

    if user is None:
        raise InvalidCredentials

    credential = user.password_credential

    if credential is None:
        raise InvalidCredentials

    if not PasswordManager.verify(
        password=data.password,
        password_hash=credential.password_hash,
    ):
        raise InvalidCredentials

    return user
