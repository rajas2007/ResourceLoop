# ResourceLoop — System Architecture

## 1. System Overview

ResourceLoop is architected as a modular, decoupled web platform comprising a modern Next.js client interface and a high-performance Python FastAPI service communicating over standard RESTful JSON APIs.

```
┌────────────────────────────────────────────────────────┐
│                   Frontend (Next.js)                   │
│   App Router · TypeScript · Tailwind CSS · Server/Client │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / JSON REST API
                            ▼
┌────────────────────────────────────────────────────────┐
│                  Backend (FastAPI)                     │
│  FastAPI 0.115+ · Pydantic v2 · SQLAlchemy 2.0 Core/ORM │
│    CORS Middleware · Request Validation · Error Handlers│
└───────────────────────────┬────────────────────────────┘
                            │ SQLAlchemy / psycopg
                            ▼
┌────────────────────────────────────────────────────────┐
│               Database (PostgreSQL 16)                 │
│       Relational Schema · Constraints · Audit Logs      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Layer Responsibilities

### 2.1 Frontend Responsibilities (Next.js App Router)
* **Presentation & User Experience**: Deliver responsive, accessible, institutional-grade UI with minimal latency.
* **Client-Side State Management**: Manage local form interactions, search query state, and step-by-step TrustFlow verification flows.
* **Data Fetching & Caching**: Utilize Next.js Server Components for initial page rendering and standard fetch/SWR/React Query patterns for client mutations.
* **Input Validation**: Perform client-side schema pre-validation to provide instant user feedback before submitting payloads to the API.

### 2.2 Backend Responsibilities (FastAPI)
* **Business Logic & State Engine**: Execute TrustFlow state transitions, enforce institutional approval policies, and compute fair allocation metrics.
* **API Routing & Serialization**: Expose versioned (`/api/v1`) REST endpoints with comprehensive Pydantic request/response validation schemas.
* **Database Session Lifecycle**: Provide clean, per-request transactional database sessions via FastAPI dependency injection.
* **Error Normalization**: Intercept domain exceptions and translate them into standardized RFC 7807 problem details or uniform JSON error structures.

### 2.3 Database Responsibilities (PostgreSQL)
* **Relational Integrity**: Enforce foreign keys, unique constraints, and non-null guarantees across all core entities.
* **Concurrency & Locking**: Ensure booking slot reservations prevent double-booking using transactional row locks or temporal exclusion constraints (`tsrange`).
* **Audit Immutability**: Maintain append-only logs for TrustFlow handovers, condition ratings, and incident reports.

---

## 3. API Communication & Protocols

* **Transport**: HTTPS with standard JSON payloads.
* **Base URL**: `/api/v1` for all versioned business endpoints; root-level `/health` for edge load balancers and container orchestrators.
* **Status Codes**: Strict adherence to HTTP semantics:
  * `200 OK` / `201 Created` / `204 No Content` for successful requests.
  * `400 Bad Request` for invalid business requests.
  * `404 Not Found` for nonexistent resources.
  * `422 Unprocessable Entity` for Pydantic schema validation failures.
  * `409 Conflict` for booking collisions or invalid state machine transitions.
  * `500 Internal Server Error` for unhandled exceptions.

---

## 4. Multi-Institution Design Considerations

While the MVP targets a single institutional environment, the architecture incorporates multi-tenancy principles from inception:

1. **Tenant Isolation via Institution Scope**:
   * All primary tables (`users`, `resources`, `departments`, `bookings`) include an `institution_id` foreign key.
   * SQLAlchemy session queries will automatically apply institution filtering through common query mixins or Row Level Security (RLS) in future releases.
2. **Federated Resource Visibility**:
   * Resources can declare visibility scopes (`INTERNAL_DEPARTMENT`, `INSTITUTION_WIDE`, or `FEDERATED_PARTNER`).
   * Cross-institution resource discovery will rely on an explicit trust-broker protocol without merging separate tenant data stores.

---

## 5. Security & Boundary Architecture

* **Least Privilege**: The database user granted to the FastAPI application holds only table DML permissions (no superuser access).
* **CORS Policy**: Configurable through the `CORS_ORIGINS` environment setting, strictly barring arbitrary cross-origin requests.
* **Secret Management**: Credentials and environment configs are isolated in runtime environment variables, never checked into version control or hardcoded in source files.
* **Input Sanitization**: Pydantic v2 validates and sanitizes all incoming payloads against strict data types and constraints.

---

## 6. Future AI Integration Blueprint

Future iterations will incorporate an AI-assisted resource matcher and booking optimizer:
* **Mechanism**: Direct external LLM API calls (e.g., Gemini API) invoked asynchronously through dedicated FastAPI background tasks or worker jobs.
* **No Local ML Training**: The system will not train custom weights; prompt engineering with Retrieval-Augmented Generation (RAG) over structured resource specs and requirements will be used.
* **Deterministic Fallback**: If LLM API connectivity is unavailable, the system defaults to deterministic keyword and attribute filtering without service degradation.
