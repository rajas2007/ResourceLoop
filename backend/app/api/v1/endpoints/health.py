from fastapi import APIRouter
from app.db.session import check_db_connection
from app.schemas.health import ApiV1HealthResponse, DatabaseStatus

router = APIRouter()


@router.get(
    "/health",
    response_model=ApiV1HealthResponse,
    summary="API v1 subsystem health check",
    description="Returns API v1 status and checks connectivity to the PostgreSQL database."
)
def api_v1_health() -> ApiV1HealthResponse:
    connected, details = check_db_connection()
    status_str = "healthy" if connected else "degraded"
    return ApiV1HealthResponse(
        status=status_str,
        version="v1",
        database=DatabaseStatus(connected=connected, details=details)
    )
