class ApplicationError(Exception):
    status_code = 500
    code = "application_error"
    detail = "An application error occurred"


class InvalidCredentialsError(Exception):
    status_code = 401
    code = "invalid_credentials"
    detail = "Invalid email or password"


class UserAlreadyExistsError(Exception):
    status_code = 409
    code = "user_already_exists"
    detail = "A use with this email or username already exists "


class InvalidRefreshTokenError(ApplicationError):
    status_code = 401
    code = "invalid_refresh_token"
    detail = "Invalid refresh token"


class AuthenticationRequiredError(ApplicationError):
    status_code = 401
    code = "authentication_required"
    detail = "Authentication is required"


class PermissionDeniedError(ApplicationError):
    status_code = 403
    code = "permission_denied"
    detail = "You do not have permission to perform this action"
