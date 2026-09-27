from fastapi import APIRouter, status

from app.dependencies import CurrentUser
from app.errors import ErrorResponse
from app.schemas.user import UserRead

router = APIRouter(tags=["me"])


@router.get(
    "/me",
    operation_id="session_me",
    response_model=UserRead,
    summary="Return the current user",
    status_code=status.HTTP_200_OK,
    response_description="The authenticated user's profile.",
    responses={
        status.HTTP_401_UNAUTHORIZED: {
            "model": ErrorResponse,
            "description": "Authentication is required.",
        },
    },
)
async def me(user: CurrentUser) -> UserRead:
    return UserRead.model_validate(user)
