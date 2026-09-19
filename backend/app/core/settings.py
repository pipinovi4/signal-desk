from pathlib import Path
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"


class Settings(BaseSettings):
    # Database
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_MODE: str | None = None

    # Auth
    JWT_SECRET: str
    JWT_ALGO: str
    ACCESS_EXPIRE_SECONDS: int
    REFRESH_EXPIRE_SECONDS: int
    SECURE: bool
    SAMESITE: Literal["lax", "strict", "none"] = "strict"
    PATH: str

    # App
    FRONTEND_URL: str
    BACKEND_URL: str
    ALLOWED_ORIGINS: list[str]

    model_config = SettingsConfigDict(
        env_file=ENV_PATH,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )


settings = Settings()
