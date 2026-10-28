# ResourceLoop — Team Workflow & Collaboration Guide

This document establishes the collaboration standards for our 4-person hackathon team operating across **Google Antigravity**, **ChatGPT**, and **GitHub**.

---

## 1. Team Workstream Allocation

To maximize velocity over the 48-hour sprint without merge conflicts, work is divided across four distinct functional streams:

| Member | Primary Focus | Scope & Ownership | Tools |
| :--- | :--- | :--- | :--- |
| **Architect / Lead (Dev 1)** | Core Platform & API Engine | Repository architecture, FastAPI app factory, Database session, Alembic migrations, CI/CD validation. | Antigravity / Git |
| **Frontend Engineer (Dev 2)** | UI Design & Resource Discovery | Next.js App Router, Tailwind layout, Discovery catalog, search/filter components, responsive styling. | Antigravity / ChatGPT |
| **TrustFlow Lead (Dev 3)** | State Engine & Condition Logs | Booking state transitions, Custodian approval UI, Check-in/Return dual-attestation forms, incident logging. | ChatGPT / Git |
| **Data & QA Engineer (Dev 4)** | Data Models, Seed Scripts & Tests | Pydantic schemas, SQLAlchemy models, test suites (Pytest/Playwright), mock demo seeds, API validation. | Antigravity / Git |

---

## 2. Git Branching Strategy

We follow a streamlined GitHub Trunk-Based Workflow with short-lived feature branches:

```
main (Production-ready, protected)
  │
  ├── feature/frontend-catalog-ui      (Dev 2)
  ├── feature/backend-trustflow-engine (Dev 3)
  └── feature/models-and-seeds         (Dev 4)
```

### 2.1 Branch Naming Conventions
* `feature/<short-description>`: New functional capabilities (e.g., `feature/resource-search-filter`)
* `fix/<bug-description>`: Bug and regression patches (e.g., `fix/cors-origin-header`)
* `docs/<topic>`: Documentation updates (e.g., `docs/api-contract-update`)
* `chore/<task>`: Tooling, dependency, or configuration updates (e.g., `chore/alembic-config`)

---

## 3. Pull Request & Integration Protocol

1. **Keep PRs Small & Focused**: Less than 300 lines of change per PR whenever possible to allow rapid review.
2. **Pre-flight Checks Before PR**:
   * Frontend: Run `npm run build` or `npm run lint` cleanly.
   * Backend: Run `pytest` and ensure all tests pass.
   * Verify no unintended environment files or secrets are staged.
3. **Peer Review**: At least one other team member must review and approve before merging to `main`.
4. **Squash and Merge**: Use "Squash and Merge" on GitHub to maintain a clean, readable commit log on the `main` branch.

---

## 4. Shared Coding Conventions

### 4.1 Frontend (Next.js / TypeScript)
* Use TypeScript strict mode without `any` where possible.
* Use `@/*` path alias for all internal module imports (e.g. `@/components/...`).
* Maintain clean separation between Server Components (default) and Client Components (`"use client"`).
* Avoid excessive inline styling; utilize utility classes with Tailwind CSS following design tokens.
* Format code with Prettier and follow `.editorconfig`.

### 4.2 Backend (FastAPI / Python)
* Follow PEP 8 with 4-space indentation and explicit type hints on all functions and routes.
* Keep routes thin: handlers parse requests, call domain services, and return validated Pydantic schemas.
* Never commit hardcoded database credentials or environment variables; always use `core/config.py`.
* Ensure database transactions are managed with context managers or FastAPI dependencies to avoid dangling transactions.

### 4.3 AI Assistant Usage Guidelines (Antigravity & ChatGPT)
* Use AI prompts with reference to `API_CONTRACT.md` and `DATABASE_SCHEMA.md` to prevent interface divergence.
* Always inspect and execute tests locally before pushing AI-generated code.
* Do not allow AI tools to bypass security checks or disable failing assertions.
