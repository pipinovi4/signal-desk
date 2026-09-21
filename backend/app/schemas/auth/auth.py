from pydantic import EmailStr

from app.schemas.base import BaseSchema
from app.schemas.user import UserCreate


class RegisterSchema(UserCreate):
    pass


class LoginSchema(BaseSchema):
    email: EmailStr
    password: str
