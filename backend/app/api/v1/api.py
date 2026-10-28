from fastapi import APIRouter
from app.api.v1.endpoints.health import router as health_router

api_v1_router = APIRouter()

# Include versioned health check under /api/v1/health
api_v1_router.include_router(health_router, tags=["Health"])

# Future resource and booking routers will be registered here:
# api_v1_router.include_router(resources_router, prefix="/resources", tags=["Resources"])
# api_v1_router.include_router(bookings_router, prefix="/bookings", tags=["Bookings"])
