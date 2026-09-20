import pytest
from app.services.session.tokens.refresh_token_manager import (
    RefreshTokenInvalidError,
    RefreshTokenManager,
)


@pytest.mark.parametrize(
    ("token", "expected_hash"),
    [
        ("", RefreshTokenManager.hash("valid_token")),
        ("valid_token", ""),
        ("valid_token", RefreshTokenManager.hash("another_valid_token")),
    ],
    ids=[
        "empty-token",
        "empty-expected-hash",
        "non-matching-token",
    ],
)
def test_verify_rejects_invalid_token_or_hash(
    token: str,
    expected_hash: str,
) -> None:
    result = RefreshTokenManager.verify(
        token=token,
        expected_hash=expected_hash,
    )

    assert result is False


def test_hash_returns_same_digest_for_same_token() -> None:
    # Arrange
    token = "main_refresh_token"

    # Act
    first_hash = RefreshTokenManager.hash(token)
    second_hash = RefreshTokenManager.hash(token)

    # Assert
    assert first_hash == second_hash


def test_hash_does_not_return_plaintext_token() -> None:
    # Arrange
    token = "main_refresh_token"

    # Act
    token_hash = RefreshTokenManager.hash(token)

    # Assert
    assert token_hash != token


def test_hash_rejects_empty_refresh_token() -> None:
    with pytest.raises(RefreshTokenInvalidError):
        RefreshTokenManager.hash("")


def test_verify_accepts_token_matching_expected_hash() -> None:
    token = "main_refresh_token"
    expected_hash = RefreshTokenManager.hash(token)

    result = RefreshTokenManager.verify(token=token, expected_hash=expected_hash)

    assert result is True
