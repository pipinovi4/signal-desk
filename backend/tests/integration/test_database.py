from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine


async def test_test_database_accepts_connection(test_engine: AsyncEngine) -> None:
    # Act
    async with test_engine.connect() as connection:
        result = await connection.execute(text("SELECT 1"))

    # Assert
    assert result.scalar() == 1
