from datetime import UTC, datetime

from fastapi import APIRouter, Request, Response, status

from app.errors import InvalidRefreshTokenError
from app.services.session.cookies.clear_auth_cookies import clear_auth_cookies
from app.services.session.tokens.manager import Tokens
from app.utils.db_session import DbSession

router = APIRouter(tags=["logout"])


@router.post(
    "/logout",
    operation_id="session_logout",
    summary="Log out the current user",
    status_code=status.HTTP_204_NO_CONTENT,
    response_description="Session ended and authentication cookies cleared.",
)
async def logout(
    request: Request,
    response: Response,
    db: DbSession,
) -> None:
    """
    Revoke the current refresh-token session and clear authentication cookies.

    Also succeeds when the refresh token is missing or invalid, so the
    browser can always complete logout.
    """

    refresh_token = request.cookies.get("refresh_token")

    if refresh_token:
        try:
            async with db.begin():
                session = await Tokens.verify_refresh_token(
                    refresh_token=refresh_token,
                    db=db,
                )

                session.revoked_at = datetime.now(UTC)
        except InvalidRefreshTokenError:
            pass

    clear_auth_cookies(response)
