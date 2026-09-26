from collections.abc import AsyncIterator, Awaitable, Callable, Iterator

import app.models  # noqa: F401
import pytest
import pytest_asyncio
from app.db import Base
from app.db.session import get_db_session
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.auth.register import register
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from main import create_app
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


@pytest.fixture
async def test_app(
    db_session: AsyncSession,
) -> Iterator[FastAPI]:
    app = create_app()

    async def override_db_session() -> AsyncIterator[AsyncSession]:
        yield db_session

    app.dependency_overrides[get_db_session] = override_db_session

    try:
        yield app
    finally:
        app.dependency_overrides.pop(get_db_session, None)


@pytest_asyncio.fixture
async def client(
    test_app: FastAPI,
) -> AsyncIterator[AsyncClient]:
    transport = ASGITransport(app=test_app)

    async with AsyncClient(
        transport=transport,
        base_url="https://testserver",
    ) as async_client:
        yield async_client


RegisteredUserFactory = Callable[..., Awaitable[User]]


@pytest_asyncio.fixture
def registered_user_factory(
    db_session: AsyncSession,
) -> RegisteredUserFactory:
    async def create_user(
        *,
        email: str = "login-user@example.com",
        password: str = "ValidPassword123!",
        username: str = "login_user",
        display_name: str = "Login User",
    ) -> User:
        return await register(
            data=UserCreate(
                email=email,
                password=password,
                username=username,
                display_name=display_name,
            ),
            db=db_session,
        )

    return create_user
