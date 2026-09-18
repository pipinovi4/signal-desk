from pwdlib import PasswordHash

_password_hash = PasswordHash.recommended()


class PasswordManager:
    @staticmethod
    def hash(password: str) -> str:
        return _password_hash.hash(password)

    @staticmethod
    def verify(
        password: str,
        password_hash: str,
    ) -> bool:
        return _password_hash.verify(
            password,
            password_hash,
        )
