from typing import Annotated

from pydantic import AfterValidator, Field


def reject_password_whitespace(password: str) -> str:
    if any(character.isspace() for character in password):
        raise ValueError("Password must not contain whitespace")

    return password


RegistrationPassword = Annotated[
    str,
    Field(min_length=8, max_length=128),
    AfterValidator(reject_password_whitespace),
]
