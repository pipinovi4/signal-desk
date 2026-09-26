from fastapi import APIRouter, Request, Response

from app.errors import InvalidRefreshTokenError
from app.services.session.cookies.set_auth_cookies import set_auth_cookies
from app.services.session.tokens.manager import Tokens
from app.utils.db_session import DbSession

router = APIRouter(tags=["session", "refresh"])


@router.post("/refresh")
async def refresh(
    request: Request,
    response: Response,
    db: DbSession,
) -> None:
    refresh_token = request.cookies.get("refresh_token")

    if refresh_token is None:
        raise InvalidRefreshTokenError

    async with db.begin():
        session = await Tokens.verify_refresh_token(
            refresh_token=refresh_token,
            db=db,
        )

        new_refresh_token = await Tokens.rotate_refresh_token(
            session=session,
            db=db,
        )

        access_token = Tokens.create_access_token(
            user_id=session.user_id,
            session_id=session.id,
        )

    set_auth_cookies(
        response=response,
        access_token=access_token,
        refresh_token=new_refresh_token,
    )
