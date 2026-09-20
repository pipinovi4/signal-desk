from app.services.auth.password import PasswordManager


def test_hash_does_not_return_plaintext_password() -> None:
    password = "Password123!"

    hashed_password = PasswordManager.hash(password)

    assert hashed_password != password


def test_verify_accepts_matching_password() -> None:
    password = "Password123!"
    hashed_password = PasswordManager.hash(password)

    assert PasswordManager.verify(password, hashed_password)


def test_verify_returns_false_when_password_does_not_match() -> None:
    password = "Password123!"
    hashed_password = PasswordManager.hash(password)

    assert not PasswordManager.verify(password + "different", hashed_password)


def test_hash_uses_unique_salt_for_same_password() -> None:
    password = "Password123!"
    first_hashed_password = PasswordManager.hash(password)
    second_hashed_password = PasswordManager.hash(password)

    assert PasswordManager.verify(password, first_hashed_password)
    assert PasswordManager.verify(password, second_hashed_password)

    assert first_hashed_password != second_hashed_password
