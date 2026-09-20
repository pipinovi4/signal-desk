from datetime import UTC, datetime

from fastapi import APIRouter, Request, Response

from app.services.session.cookies.clear_auth_cookies import clear_auth_cookies
from app.services.session.tokens.manager import Tokens
from app.utils.db_session import DbSession

router = APIRouter(tags=["logout"])


@router.post("/logout")
async def logout(
    request: Request,
    response: Response,
    db: DbSession,
) -> Response:
    refresh_token = request.cookies.get("refresh_token")

    if refresh_token:
        session = await Tokens.verify_refresh_token(
            refresh_token=refresh_token,
            db=db,
        )

        session.revoked_at = datetime.now(UTC)

        await db.commit()

    clear_auth_cookies(response)

    return response
