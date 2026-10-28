from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_v1_router
from app.core.config import settings
from app.core.errors import setup_exception_handlers
from app.schemas.health import HealthResponse


def create_app() -> FastAPI:
    """
    Application factory for ResourceLoop FastAPI backend.
    """
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="Backend API for ResourceLoop - institutional resource sharing & TrustFlow protocol",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json"
    )

    # Configure CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Configure standardized exception handlers
    setup_exception_handlers(app)

    # Root health check endpoint for load balancers
    @app.get(
        "/health",
        response_model=HealthResponse,
        tags=["Health"],
        summary="Basic service health probe",
        description="Returns basic liveness and version info for edge load balancers."
    )
    def health_check() -> HealthResponse:
        return HealthResponse(
            status="healthy",
            service=settings.APP_NAME,
            version=settings.APP_VERSION
        )

    # Mount API v1 routes
    app.include_router(api_v1_router, prefix=settings.API_V1_STR)

    return app


app = create_app()
