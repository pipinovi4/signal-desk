import pytest
from app.models import User
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession


@pytest.mark.parametrize(
    (
        "first_email",
        "second_email",
        "first_username",
        "second_username",
    ),
    [
        (
            "same@example.com",
            "same@example.com",
            "first_username",
            "second_username",
        ),
        (
            "first@example.com",
            "second@example.com",
            "same_username",
            "same_username",
        ),
    ],
    ids=[
        "duplicate-email",
        "duplicate-username",
    ],
)
async def test_database_rejects_duplicate_identity(
    db_session: AsyncSession,
    first_email: str,
    first_username: str,
    second_email: str,
    second_username: str,
) -> None:
    # Arrannge
    first_user = User(
        email=first_email,
        username=first_username,
        display_name="First User",
    )

    second_user = User(
        email=second_email,
        username=second_username,
        display_name="Second User",
    )

    db_session.add_all([first_user, second_user])

    # Act / Assert
    with pytest.raises(IntegrityError):
        await db_session.flush()
