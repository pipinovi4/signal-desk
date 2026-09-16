USERNAME_MIN_LENGTH = 3
USERNAME_MAX_LENGTH = 32

USERNAME_PATTERN = r"^[a-z0-9_]+$"

RESERVED_USERNAMES = frozenset(
    {
        "admin",
        "api",
        "support",
        "settings",
        "login",
        "logout",
        "register",
        "signup",
        "signin",
        "account",
        "me",
        "root",
        "system",
        "signaldesk",
    }
)
