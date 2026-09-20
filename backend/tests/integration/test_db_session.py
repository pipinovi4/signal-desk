from app.models import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession


async def test_db_session_commit_does_not_escape_outer_transaction(
    db_session: AsyncSession,
    test_engine: AsyncEngine,
) -> None:
    # Arrange
    email = "transaction-isolation@example.com"
    user = User(
        email=email,
        username="transaction_isolation",
        display_name="transaction-isolation",
    )
    db_session.add(user)

    # Act
    await db_session.commit()

    # Assert: current test-session see the record
    user_inside_transaction = await db_session.scalar(select(User).where(User.email == email))
    assert user_inside_transaction is not None

    # Assert: independent connection doesn't see the record
    async with AsyncSession(
        bind=test_engine,
        expire_on_commit=False,
    ) as observer_session:
        user_outside_transaction = await observer_session.scalar(
            select(User).where(User.email == email)
        )

    assert user_outside_transaction is None
