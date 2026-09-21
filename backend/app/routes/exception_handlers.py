from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.services.auth.register import UserAlreadyExistsError


async def handle_user_already_exists(
    _request: Request,
    _error: Exception,
) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={
            "detail": "A user with this email or username already exists",
        },
    )


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(
        UserAlreadyExistsError,
        handle_user_already_exists,
    )
