import pytest
from app.errors import InvalidCredentialsError
from app.models import User
from app.schemas.auth.auth import LoginSchema
from app.services.auth.login import login
from sqlalchemy.ext.asyncio import AsyncSession

from tests.conftest import RegisteredUserFactory


async def test_login_returns_user_for_valid_credentials(
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    password = "Password123!"

    expected_user = await registered_user_factory(
        email="alice@example.com",
        password=password,
        username="alice",
        display_name="Alice",
    )

    data = LoginSchema(
        email="alice@example.com",
        password=password,
    )

    # Act
    authenticated_user = await login(
        data=data,
        db=db_session,
    )

    assert authenticated_user.id == expected_user.id


async def test_login_rejects_unknown_email(db_session: AsyncSession):
    # Arrange
    data = LoginSchema(
        email="unknown_email@example.com",
        password="ValidPassword123!",
    )

    with pytest.raises(InvalidCredentialsError):
        await login(
            data=data,
            db=db_session,
        )


async def test_login_rejects_incorrect_password(
    db_session: AsyncSession, registered_user_factory: RegisteredUserFactory
) -> None:
    # Arrange
    correct_password = "CorrectPassword123!"
    incorrect_password = "IncorrectPassword123!"

    email = "random_email@example.com"

    await registered_user_factory(
        email=email,
        password=correct_password,
        display_name="random_display_name",
        username="random_username",
    )

    data = LoginSchema(
        email=email,
        password=incorrect_password,
    )

    with pytest.raises(InvalidCredentialsError):
        await login(data=data, db=db_session)


async def test_login_accepts_email_with_different_case(
    db_session: AsyncSession,
    registered_user_factory: RegisteredUserFactory,
) -> None:
    # Arrange
    expected_user = await registered_user_factory(
        email="alice@example.com",
    )

    data = LoginSchema(
        email="ALICE@EXAMPLE.COM",
        password="ValidPassword123!",
    )

    # Act
    authenticated_user = await login(
        data=data,
        db=db_session,
    )

    # Assert
    assert authenticated_user.id == expected_user.id


async def test_login_rejects_user_without_password_credential(
    db_session: AsyncSession,
) -> None:
    # Arrange
    user = User(
        email="passwordless@example.com",
        username="passwordless_user",
        display_name="Passwordless User",
    )
    db_session.add(user)
    await db_session.flush()

    data = LoginSchema(
        email=user.email,
        password="ValidPassword123!",
    )

    # Act / Assert
    with pytest.raises(InvalidCredentialsError):
        await login(
            data=data,
            db=db_session,
        )
