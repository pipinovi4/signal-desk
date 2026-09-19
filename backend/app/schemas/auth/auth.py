from pydantic import EmailStr

from app.schemas.base import BaseSchema


class RegisterSchema(BaseSchema):
    email: EmailStr
    password: str
    display_name: str
    username: str


class LoginSchema(BaseSchema):
    email: EmailStr
    password: str
