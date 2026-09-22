from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.errors import ApplicationError


async def handle_application_error(
    _request: Request,
    error: Exception,
) -> JSONResponse:
    if not isinstance(error, ApplicationError):
        raise error

    return JSONResponse(
        status_code=error.status_code,
        content={
            "error": {
                "code": error.code,
                "message": error.detail,
            },
        },
    )


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(
        ApplicationError,
        handle_application_error,
    )
