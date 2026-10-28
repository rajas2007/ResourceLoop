from fastapi.testclient import TestClient


def test_root_health_returns_200(client: TestClient) -> None:
    """
    Verify that GET /health returns HTTP 200 with service metadata.
    """
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert "ResourceLoop" in data["service"]
    assert "version" in data
    assert "timestamp" in data


def test_api_v1_health_returns_200_and_structured_status(client: TestClient) -> None:
    """
    Verify that GET /api/v1/health returns HTTP 200, reports v1, and includes database status.
    """
    response = client.get("/api/v1/health")
    assert response.status_code == 200

    data = response.json()
    assert data["version"] == "v1"
    assert data["status"] in ["healthy", "degraded"]
    assert "database" in data
    assert isinstance(data["database"]["connected"], bool)
    assert isinstance(data["database"]["details"], str)


def test_standardized_error_handling_on_unknown_route(client: TestClient) -> None:
    """
    Verify that an unmapped endpoint produces the standardized error schema.
    """
    response = client.get("/api/v1/nonexistent-route-for-testing")
    assert response.status_code == 404

    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "HTTP_404"
    assert "Not Found" in data["error"]["message"]
