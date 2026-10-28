import json
from pathlib import Path
from typing import List, Union

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve the backend directory regardless of the working directory.
BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    """Central application settings loaded from environment variables or .env."""

    APP_ENV: str = "development"
    APP_NAME: str = "ResourceLoop Backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"

    # CORS origins list
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # Database configuration
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/resourceloop"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v_trimmed = v.strip()
            if v_trimmed.startswith("[") and v_trimmed.endswith("]"):
                try:
                    return json.loads(v_trimmed)
                except Exception:
                    pass
            return [i.strip() for i in v_trimmed.split(",") if i.strip()]
        if isinstance(v, list):
            return v
        return ["http://localhost:3000", "http://127.0.0.1:3000"]

    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
