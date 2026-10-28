from datetime import datetime, timezone
from pydantic import BaseModel, Field


class DatabaseStatus(BaseModel):
    connected: bool = Field(..., description="Whether active connection to the database succeeded")
    details: str = Field(..., description="Detailed status or failure summary")


class HealthResponse(BaseModel):
    status: str = Field(..., description="Operational status: healthy, degraded, or unhealthy")
    service: str = Field(..., description="Service identifier")
    version: str = Field(..., description="Application release version")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="UTC timestamp of the check")


class ApiV1HealthResponse(BaseModel):
    status: str = Field(..., description="Operational status: healthy or degraded")
    version: str = Field("v1", description="API version")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="UTC timestamp of the check")
    database: DatabaseStatus = Field(..., description="Subsystem database status")
