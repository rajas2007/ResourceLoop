# ResourceLoop

An intelligent institutional resource-sharing platform built around **TrustFlow**—a verified, accountable protocol for sharing underused laboratory equipment, scientific instrumentation, technical devices, and specialized facility spaces.

ResourceLoop replaces siloed departmental spreadsheets and ad-hoc signouts with verified operator eligibility, custodian approvals, fair allocation, baseline-to-return condition attestation, and auditable incident logs.

---

## 1. Repository Structure

ResourceLoop is organized as a clean, decoupled monorepo:

```
ResourceLoop/
├── frontend/                     # Next.js App Router client application
│   ├── app/                      # Next.js pages and routes
│   │   ├── globals.css           # Global Tailwind CSS directives
│   │   ├── layout.tsx            # Root institutional SaaS layout
│   │   ├── page.tsx              # Platform landing page & TrustFlow overview
│   │   └── resources/            # Resource discovery catalog (placeholder)
│   ├── components/               # Modular UI and layout components
│   │   ├── layout/               # Navbar, Footer
│   │   └── ui/                   # Button, Card, Badge primitives
│   ├── lib/                      # Utilities (classnames, styling helpers)
│   ├── types/                    # Core TypeScript domain definitions
│   ├── public/                   # Static web assets
│   ├── package.json              # Frontend scripts & dependencies
│   ├── tsconfig.json             # TypeScript configuration (@/* alias)
│   ├── tailwind.config.ts        # Institutional design tokens & theme
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── next.config.mjs           # Next.js runtime configuration
│   └── .env.example              # Frontend environment variable template
│
├── backend/                      # FastAPI Python REST backend
│   ├── app/                      # Application source package
│   │   ├── api/                  # API routers
│   │   │   └── v1/               # Version 1 endpoints (health, future resources)
│   │   ├── core/                 # Settings, configuration, standardized errors
│   │   ├── db/                   # SQLAlchemy 2.x engine, sessions, connectivity
│   │   ├── models/               # Declarative SQLAlchemy ORM models
│   │   ├── schemas/              # Pydantic v2 validation schemas
│   │   ├── services/             # Domain logic & TrustFlow engine (placeholder)
│   │   └── main.py               # Application factory & entry point
│   ├── tests/                    # Pytest test suite
│   ├── alembic/                  # Alembic database migration environment
│   ├── alembic.ini               # Alembic configuration
│   ├── requirements.txt          # Python dependencies
│   ├── pytest.ini                # Pytest configuration
│   └── .env.example              # Backend environment variable template
│
├── docs/                         # Architecture, PRD, and team specifications
│   ├── PRODUCT_REQUIREMENTS.md   # Product vision, personas, 10-stage TrustFlow
│   ├── ARCHITECTURE.md           # System design, layers, AI integration blueprint
│   ├── DATABASE_SCHEMA.md        # Planned tables, constraints, state machine
│   ├── API_CONTRACT.md           # REST specifications & request/response schemas
│   ├── TEAM_WORKFLOW.md          # 4-person workstream & Git branch conventions
│   └── DEMO_GUIDE.md             # End-to-end demo narrative & acceptance checklist
│
├── .editorconfig                 # Multi-editor code formatting standards
├── .gitignore                    # Comprehensive secrets & artifact exclusions
└── README.md                     # This file
```

---

## 2. Prerequisites

* **Node.js**: v18.18+ (tested with v24+)
* **npm**: v9+ (tested with v11+)
* **Python**: 3.10+ (tested with 3.14 native Windows Python)
* **PostgreSQL**: 14+ (optional for local development health checks; app starts in degraded dev mode if DB is offline)

---

## 3. Installation & Setup

### 3.1 Clone & Environment Setup

```bash
# Clone the repository
git clone https://github.com/<your-org>/ResourceLoop.git
cd ResourceLoop
```

### 3.2 Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

### 3.3 Frontend Setup

```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

---

## 4. Environment Configuration

### Backend (`backend/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `APP_ENV` | Runtime environment (`development`, `production`) | `development` |
| `APP_NAME` | Service identifier | `ResourceLoop Backend` |
| `DEBUG` | Enable debug logs & automatic reload | `true` |
| `API_V1_STR` | Prefix for version 1 endpoints | `/api/v1` |
| `CORS_ORIGINS` | JSON list or comma-separated allowed origins | `["http://localhost:3000"]` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/resourceloop` |

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL for backend REST API | `http://localhost:8000` |

---

## 5. Running the Application

### 5.1 Start the Backend
From the `backend/` directory:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Interactive API documentation will be available at:
* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)
* Root Health Check: [http://localhost:8000/health](http://localhost:8000/health)
* API v1 Health Check: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

### 5.2 Start the Frontend
From the `frontend/` directory:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Running Tests

### Backend Tests (Pytest)
From the `backend/` directory:
```bash
pytest -v
```

### Frontend Typecheck & Build Validation
From the `frontend/` directory:
```bash
npm run build
```

---

## 7. Database Setup & Migrations (PostgreSQL)

If PostgreSQL is running locally:
1. Create the database:
   ```sql
   CREATE DATABASE resourceloop;
   ```
2. Update `DATABASE_URL` in `backend/.env` with your credentials:
   ```
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/resourceloop
   ```
3. When database models are implemented in Phase 2, generate and apply migrations:
   ```bash
   alembic revision --autogenerate -m "create initial models"
   alembic upgrade head
   ```

*Note: In Phase 1 (Foundation), database tables are not yet created. The FastAPI server operates gracefully in development mode, reporting `"status": "degraded"` or `"connected": false` on the database telemetry check without crashing.*

---

## 8. Current Implementation Status

| Component | Status | Notes |
| :--- | :--- | :--- |
| **Monorepo Structure** | Completed | Full modular structure established |
| **Documentation** | Completed | PRD, Architecture, Schema, Contract, Workflow, Demo |
| **FastAPI Core App** | Completed | Factory, CORS, versioned router, standardized errors |
| **Health Endpoints** | Completed | `/health` and `/api/v1/health` with DB status reporting |
| **SQLAlchemy 2.x & Alembic** | Completed | Configured for PostgreSQL, ready for Phase 2 migrations |
| **Backend Test Suite** | Completed | 100% pass on health probes and error handlers |
| **Next.js App Router** | Completed | Responsive institutional landing page & layout |
| **Resource Discovery UI** | Completed (Placeholder) | Clearly marked placeholder awaiting Phase 2 data model |
| **Database Schema** | Planned (Phase 2) | Documented in `DATABASE_SCHEMA.md`, awaiting signoff |
| **TrustFlow Booking Engine**| Planned (Phase 2) | Documented in `API_CONTRACT.md`, awaiting signoff |
| **AI Matching Integration** | Planned (Phase 3) | Architected in `ARCHITECTURE.md` (LLM API only) |
