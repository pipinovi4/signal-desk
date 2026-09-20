import pytest

from tests.database import require_test_database_url


def test_require_test_database_url_accepts_test_database() -> None:
    # Arrange
    database_url = "postgresql+asyncpg://user:password@localhost:5432/signaldesk_test"

    # Act
    result = require_test_database_url(database_url)

    # Assert
    assert result == database_url


def test_require_test_database_url_rejects_non_test_database() -> None:
    # Arrange
    database_url = "postgresql+asyncpg://user:password@localhost:5432/signaldesk"

    with pytest.raises(RuntimeError, match="Test database name must end with '_test'"):
        require_test_database_url(database_url)
