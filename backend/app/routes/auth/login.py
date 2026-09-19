from fastapi import APIRouter, Request, Response

from app.schemas.auth.auth import LoginSchema
from app.schemas.user import UserRead
from app.services.auth.login import login as login_handler
from app.services.session.cookies.set_auth_cookies import set_auth_cookies
from app.services.session.tokens import Tokens
from app.utils import DbSession

router = APIRouter(tags=["login"])


@router.post("/login", response_model=UserRead)
async def login(data: LoginSchema, response: Response, request: Request, db: DbSession) -> UserRead:
    if request.client is None:
        raise RuntimeError("Client address is unavailable")

    agent_ip = request.client.host
    user_agent = request.headers.get("user-agent", "unknown")

    async with db.begin():
        user = await login_handler(data=data, db=db)

        refresh_token, auth_session = await Tokens.create_refresh_token(
            agent_ip=agent_ip, user_agent=user_agent, user_id=user.id, db=db
        )

        access_token = Tokens.create_access_token(user_id=user.id, session_id=auth_session.id)

    set_auth_cookies(access_token=access_token, refresh_token=refresh_token, response=response)

    return UserRead(
        email=user.email, display_name=user.display_name, username=user.username, id=user.id
    )
