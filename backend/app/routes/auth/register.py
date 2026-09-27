from fastapi import APIRouter, Request, Response, status

from app.errors import ErrorResponse
from app.models.user import User
from app.schemas.auth.auth import RegisterSchema
from app.schemas.user import UserCreate, UserRead
from app.services.auth.register import register as register_handler
from app.services.session.cookies.set_auth_cookies import set_auth_cookies
from app.services.session.tokens import Tokens
from app.utils import DbSession

router = APIRouter(
    tags=["register"],
)


@router.post(
    "/register",
    operation_id="auth_register",
    response_model=UserRead,
    summary="Register a user",
    status_code=status.HTTP_201_CREATED,
    response_description="The register user's profile",
    responses={
        409: {
            "model": ErrorResponse,
            "description": "The email or username is already taken.",
        },
    },
)
async def register(
    data: RegisterSchema,
    request: Request,
    response: Response,
    db: DbSession,
) -> User:
    """
    Create a user account and start an authenticated session.

    Sets access and refresh tokens as HttpOnly cookies.
    Tokens are not included in the response body.
    """

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
