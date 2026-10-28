# ResourceLoop — API Contract & Specification

## 1. API Conventions

* **Format**: RESTful API communicating with UTF-8 JSON payloads.
* **Base Paths**:
  * Root health: `/health` (Top-level service readiness/liveness)
  * Versioned endpoints: `/api/v1/*`
* **Headers**:
  * `Content-Type: application/json`
  * `Accept: application/json`
* **Error Response Standard**:
  Consistent error structure across all endpoints:
  ```json
  {
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "Resource with ID 3fa85f64-5717-4562-b3fc-2c963f66afa6 was not found",
      "details": []
    }
  }
  ```

---

## 2. Implemented Health Endpoints

### 2.1 Basic Service Health
* **Endpoint**: `GET /health`
* **Description**: Lightweight health probe for load balancers and container orchestrators.
* **Response `200 OK`**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-10-28T07:30:00.000Z",
    "service": "ResourceLoop Backend",
    "version": "0.1.0"
  }
  ```

### 2.2 API v1 Operational Health
* **Endpoint**: `GET /api/v1/health`
* **Description**: Comprehensive API check reporting API version and database connectivity status.
* **Response `200 OK`**:
  ```json
  {
    "status": "healthy",
    "version": "v1",
    "timestamp": "2026-10-28T07:30:00.000Z",
    "database": {
      "connected": true,
      "details": "PostgreSQL connection active"
    }
  }
  ```
  *(Note: If database is unreachable in development mode, `"status": "degraded"` or `"database": {"connected": false, "details": "..."}` is returned without crashing the service).*

---

## 3. Planned Resource & TrustFlow Endpoints (Phase 2+)

> The following endpoints define the agreed interface contract for future implementation.

### 3.1 Resource Discovery

#### `GET /api/v1/resources`
Retrieve a paginated, filterable list of institutional resources.
* **Query Parameters**:
  * `department_id` (UUID, optional)
  * `category` (string, optional)
  * `status` (string, optional: `AVAILABLE`, `MAINTENANCE`)
  * `search` (string, optional: title/description keyword)
  * `page` (int, default 1), `size` (int, default 20)
* **Response `200 OK`**:
  ```json
  {
    "items": [
      {
        "id": "c7a6e60b-4e08-4991-8ad2-668b813b19a1",
        "name": "High-Resolution SEM Microscope",
        "category": "LAB_EQUIPMENT",
        "department": "Materials Science & Engineering",
        "location": "Nanotech Center, Room 204",
        "status": "AVAILABLE",
        "specifications": { "magnification": "500,000x", "vacuum": "Ultra-high" }
      }
    ],
    "total": 1,
    "page": 1,
    "size": 20
  }
  ```

#### `GET /api/v1/resources/{id}`
Retrieve detailed resource specifications, eligibility rules, and custodian contact.

---

### 3.2 Booking & TrustFlow Lifecycle

#### `POST /api/v1/bookings`
Submit a booking request for an eligible resource.
* **Request Body**:
  ```json
  {
    "resource_id": "c7a6e60b-4e08-4991-8ad2-668b813b19a1",
    "start_time": "2026-10-29T09:00:00Z",
    "end_time": "2026-10-29T13:00:00Z",
    "purpose": "Sample analysis for NSF Grant #402"
  }
  ```
* **Response `201 Created`**:
  ```json
  {
    "id": "893dfbd8-ec4f-4d2d-9476-802baec4472f",
    "status": "PENDING_APPROVAL",
    "resource_id": "c7a6e60b-4e08-4991-8ad2-668b813b19a1",
    "start_time": "2026-10-29T09:00:00Z",
    "end_time": "2026-10-29T13:00:00Z"
  }
  ```

#### `PATCH /api/v1/bookings/{id}/decision`
Custodian approval or rejection.
* **Request Body**: `{"action": "APPROVE" | "REJECT", "reason": "Approved for lab session"}`

#### `POST /api/v1/bookings/{id}/check-in`
Handoff check-in with baseline condition attestation (TrustFlow Stage 6 & 7).
* **Request Body**:
  ```json
  {
    "condition_rating": "PRISTINE",
    "checklist_answers": {
      "optics_clean": true,
      "calibration_verified": true,
      "safety_shield_present": true
    },
    "notes": "Equipment operational, baseline sample tray clear."
  }
  ```

#### `POST /api/v1/bookings/{id}/return`
Post-use return and final condition reconciliation (TrustFlow Stage 8 & 9).
* **Request Body**:
  ```json
  {
    "condition_rating": "PRISTINE",
    "checklist_answers": {
      "optics_clean": true,
      "calibration_verified": true,
      "power_cycled": true
    },
    "notes": "Finished session on schedule, no anomalies observed."
  }
  ```

#### `POST /api/v1/bookings/{id}/incidents`
Log damage, malfunction, or operational dispute (TrustFlow Stage 10).
