from collections.abc import AsyncIterator

import app.models  # noqa: F401
import pytest
import pytest_asyncio
from app.db import Base
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    create_async_engine,
)
from sqlalchemy.pool import NullPool

from tests.database import require_test_database_url
from tests.settings import TestSettings


@pytest.fixture(scope="session")
def test_database_url() -> str:
    settings = TestSettings()

    return require_test_database_url(settings.TEST_DATABASE_URL)


@pytest_asyncio.fixture(
    scope="session",
    loop_scope="session",
)
async def test_engine(
    test_database_url: str,
) -> AsyncIterator[AsyncEngine]:
    engine = create_async_engine(
        test_database_url,
        poolclass=NullPool,
    )

    try:
        yield engine
    finally:
        await engine.dispose()


@pytest_asyncio.fixture(
    scope="session",
    loop_scope="session",
)
async def database_schema(
    test_engine: AsyncEngine,
) -> AsyncIterator[None]:
    async with test_engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    try:
        yield test_engine
    finally:
        async with test_engine.begin() as connection:
            await connection.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def db_session(
    database_schema: AsyncEngine,
) -> AsyncIterator[AsyncSession]:
    async with database_schema.connect() as connection:
        outer_transaction = await connection.begin()

        session: AsyncSession = AsyncSession(
            bind=connection,
            expire_on_commit=False,
            join_transaction_mode="create_savepoint",
        )

        try:
            yield session
        finally:
            await session.close()

            if outer_transaction.is_active:
                await outer_transaction.rollback()
