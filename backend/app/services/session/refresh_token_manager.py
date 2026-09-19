import hashlib
import hmac
import secrets


class RefreshTokenInvalidError(Exception):
    pass


class RefreshTokenManager:
    _bytes_length = 48

    @staticmethod
    def generate() -> str:
        """Generate a cryptographically secure refresh token."""
        return secrets.token_urlsafe(RefreshTokenManager._bytes_length)

    @staticmethod
    def hash(token: str) -> str:
        """Create a deterministic hash suitable for database storage."""
        if not token:
            raise RefreshTokenInvalidError

        return hashlib.sha256(token.encode("utf-8")).hexdigest()

    @staticmethod
    def verify(
        token: str,
        expected_hash: str,
    ) -> bool:
        """Safety compare a raw refresh token with its stored hash."""

        if not token or not expected_hash:
            return False

        actual_hash = RefreshTokenManager.hash(token)
        return hmac.compare_digest(expected_hash, actual_hash)
