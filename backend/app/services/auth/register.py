from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.elements import ColumnElement

from app.errors import UserAlreadyExistsError
from app.models import PasswordCredential
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.auth.password import PasswordManager


async def register(
    data: UserCreate,
    db: AsyncSession,
) -> User:
    email = data.email.strip().lower()
    username = data.username.strip().lower() if data.username else None

    conditions: list[ColumnElement[bool]] = [
        User.email == email,
    ]

    if username is not None:
        conditions.append(User.username.in_([username]))

    existing_user_id = await db.scalar(select(User.id).where(or_(*conditions)))

    if existing_user_id is not None:
        raise UserAlreadyExistsError

    user = User(
        email=email,
        username=username,
        display_name=data.display_name,
    )

    db.add(user)
    await db.flush()

    credential = PasswordCredential(
        user_id=user.id,
        password_hash=PasswordManager.hash(data.password),
    )

    db.add(credential)

    await db.refresh(user)
    return user
