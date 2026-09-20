from datetime import UTC, datetime, timedelta

import jwt
import pytest
from app.core.settings import settings
from app.services.session.tokens import AccessTokenManager
from app.services.session.tokens.access_token_manager import (
    AccessTokenExpiredError,
    AccessTokenInvalidError,
)
from uuid6 import uuid7


def test_encode_and_decode_preserve_identity_claims() -> None:
    # Arrange
    user_id = uuid7()
    session_id = uuid7()

    # Act
    token = AccessTokenManager.encode(
        user_id=user_id,
        session_id=session_id,
    )
    claims = AccessTokenManager.decode(token)

    # Assert
    assert claims["sub"] == str(user_id)
    assert claims["sid"] == str(session_id)
    assert claims["type"] == "access"


def test_decode_rejects_token_signed_with_different_secret(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    # Arrange
    user_id = uuid7()
    session_id = uuid7()

    token = AccessTokenManager.encode(user_id=user_id, session_id=session_id)

    monkeypatch.setattr(
        settings,
        "JWT_SECRET",
        f"{settings.JWT_SECRET}-different",
    )

    # Act / Assert
    with pytest.raises(AccessTokenInvalidError):
        AccessTokenManager.decode(token)


def test_decode_rejects_token_with_non_access_type(
    monkeypatch: pytest.MonkeyPatch,
):
    now = datetime.now(UTC)
    user_id = uuid7()
    session_id = uuid7()

    token = jwt.encode(
        {
            "sub": str(user_id),
            "sid": str(session_id),
            "type": "refresh",
            "iat": now,
            "exp": now + timedelta(seconds=10),
        },
        settings.JWT_SECRET,
        algorithm="HS256",
    )

    # Act / Assert
    with pytest.raises(AccessTokenInvalidError):
        AccessTokenManager.decode(token)


def test_decode_rejects_expired_token() -> None:
    # Arrange
    now = datetime.now(UTC)

    token = jwt.encode(
        {
            "sub": str(uuid7()),
            "sid": str(uuid7()),
            "type": "access",
            "iat": now - timedelta(minutes=10),
            "exp": now - timedelta(minutes=5),
        },
        settings.JWT_SECRET,
        algorithm="HS256",
    )

    # Act / Assert
    with pytest.raises(AccessTokenExpiredError):
        AccessTokenManager.decode(token)


@pytest.mark.parametrize(
    "invalid_claim",
    ["sub", "sid"],
    ids=["invalid-user-id", "invalid-session-id"],
)
def test_decode_rejects_invalid_uuid_claim(
    invalid_claim: str,
) -> None:
    # Arrange
    now = datetime.now(UTC)

    claims = {
        "sub": str(uuid7()),
        "sid": str(uuid7()),
        "type": "access",
        "iat": now,
        "exp": now + timedelta(minutes=5),
        invalid_claim: "not-a-valid-uuid",
    }

    token = jwt.encode(
        claims,
        settings.JWT_SECRET,
        algorithm="HS256",
    )

    # Act / Assert
    with pytest.raises(AccessTokenInvalidError):
        AccessTokenManager.decode(token)
