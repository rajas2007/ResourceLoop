import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure backend root is on sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.main import create_app


@pytest.fixture(scope="session")
def app():
    """Application instance fixture."""
    return create_app()


@pytest.fixture(scope="session")
def client(app):
    """Test client fixture for sending requests to the FastAPI app."""
    with TestClient(app) as test_client:
        yield test_client
