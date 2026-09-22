import pytest
from app.errors import UserAlreadyExistsError
from app.models import PasswordCredential
from app.schemas.user import UserCreate
from app.services.auth.password import PasswordManager
from app.services.auth.register import register as register_user
from sqlalchemy.ext.asyncio import AsyncSession


async def test_register_creates_user_and_password_credential(
    db_session: AsyncSession,
) -> None:
    # Arrange
    password = "random-password"
    data = UserCreate(
        email="Random-Email@Example.COM",
        password=password,
        username="Random_Username",
        display_name="random-display-name",
    )

    # Act
    user = await register_user(
        data=data,
        db=db_session,
    )

    # Assert
    credential = await db_session.get(
        PasswordCredential,
        user.id,
    )

    assert user.email == "random-email@example.com"
    assert user.username == "random_username"
    assert user.display_name == "random-display-name"

    assert credential is not None
    assert credential.password_hash != password
    assert PasswordManager.verify(
        password,
        credential.password_hash,
    )


@pytest.mark.parametrize(
    ("candidate_email", "candidate_username"),
    [
        (
            "existing@example.com",
            "different_username",
        ),
        (
            "different@example.com",
            "existing_username",
        ),
    ],
    ids=[
        "duplicate-email",
        "duplicate-username",
    ],
)
async def test_register_rejects_duplicate_email_or_username(
    db_session: AsyncSession,
    candidate_email: str,
    candidate_username: str,
) -> None:
    # Arrange
    existing_user_data = UserCreate(
        email="existing@example.com",
        username="existing_username",
        display_name="Existing User",
        password="ExistingPassword123!",
    )
    await register_user(
        data=existing_user_data,
        db=db_session,
    )

    candidate_data = UserCreate(
        email=candidate_email,
        username=candidate_username,
        display_name="Candidate User",
        password="CandidatePassword123!",
    )

    # Act / Assert
    with pytest.raises(UserAlreadyExistsError):
        await register_user(
            data=candidate_data,
            db=db_session,
        )
