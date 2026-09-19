from typing import Annotated

from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db_session
from app.models.user import User
from app.schemas.auth.auth import RegisterSchema
from app.schemas.user import UserCreate
from app.services.auth.register import register as register_handler
from app.services.auth.set_auth_cookies import set_auth_cookies
from app.services.auth.tokens import Tokens

router = APIRouter(
    tags=["register"],
)

DbSession = Annotated[AsyncSession, Depends(get_db_session)]


@router.post("/register")
async def register(
    data: RegisterSchema,
    request: Request,
    response: Response,
    db: DbSession,
) -> User:
    if request.client is None:
        raise RuntimeError("Client address is unavailable")

    agent_ip = request.client.host
    user_agent = request.headers.get("user-agent", "unknown")

    user_data = UserCreate.model_validate(
        {
            "email": data.email,
            "password": data.password,
            "display_name": data.display_name,
            "username": data.username,
        }
    )

    async with db.begin():
        user = await register_handler(data=user_data, db=db)

        refresh_token, auth_session = await Tokens.create_refresh_token(
            user_id=user.id, agent_ip=agent_ip, user_agent=user_agent, db=db
        )

        access_token = Tokens.create_access_token(user_id=user.id, session_id=auth_session.id)

    set_auth_cookies(refresh_token=refresh_token, access_token=access_token, response=response)

    return user
