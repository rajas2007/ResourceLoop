# ResourceLoop — Product Requirements Document (PRD)

## 1. Product Vision
**ResourceLoop** is an institutional resource-sharing platform engineered to unlock the latent value of underutilized laboratory equipment, specialized scientific instrumentation, computational hardware, and technical facilities across educational and research institutions. 

By replacing ad-hoc booking sheets, verbal agreements, and departmental silos with a verified, accountable protocol, ResourceLoop maximizes asset return on investment (ROI) while safeguarding asset condition and institutional compliance.

---

## 2. Target Personas

### 2.1 Requester (Researcher, Faculty Member, Graduate Student)
* **Goal**: Discover and reserve specialized equipment or facilities quickly without friction or bureaucratic opacity.
* **Pain Points**: Lack of visibility into available campus resources, arbitrary approval delays, unclear usage requirements, fear of being unfairly blamed for pre-existing equipment wear or damage.

### 2.2 Resource Owner / Lab Manager
* **Goal**: Maintain control, visibility, and custody over high-value capital assets while maximizing authorized utilization.
* **Pain Points**: Equipment hoarding by certain groups, lack of verified qualifications/training before use, unauthorized wear-and-tear, disputed condition claims upon return.

### 2.3 Institutional Administrator / Compliance Auditor
* **Goal**: Ensure equitable access, maintain auditable custodial chains, track cross-departmental utilization metrics, and mitigate asset risk.
* **Pain Points**: Unauditable paper logs, inability to prove grant compliance or equipment usage ratios, unresolved loss or damage incidents.

---

## 3. Core Problem & Value Proposition

### 3.1 The Problem
In modern academic and technical institutions, millions of dollars worth of specialized instruments (e.g., spectrophotometers, CNC mills, electron microscopes, cleanrooms) operate at less than 30% average capacity. Meanwhile, adjacent departments struggle to purchase duplicate hardware due to budgetary limitations. Traditional booking systems fail because they treat high-value equipment like standard conference rooms—ignoring operator eligibility, custody transfer, condition verification, and dispute resolution.

### 3.2 The Solution: TrustFlow Protocol
ResourceLoop introduces **TrustFlow**, an end-to-end custody and verification state machine that ensures every booking represents a verified, mutually attested agreement from reservation through post-use inspection.

---

## 4. TrustFlow 10-Stage Lifecycle

```
[1. Discovery] ──> [2. Eligibility] ──> [3. Booking Request] ──> [4. Approval] ──> [5. Fair Allocation]
                                                                                        │
[10. Incident / Audit] <── [9. Final Condition] <── [8. Return] <── [7. Initial Condition] <── [6. Check-In]
```

1. **Resource Discovery**: Comprehensive catalog search and filtering by specifications, location, availability window, and prerequisite qualifications.
2. **Eligibility Verification**: Automated compliance check ensuring the requester holds required institutional safety training, certifications, and departmental approvals.
3. **Booking Request**: Structured reservation submission specifying purpose, time window, and expected workload.
4. **Owner / Manager Approval**: Workflow routing to designated custodian with context-rich request evaluation and decision timestamps.
5. **Fair Allocation**: Algorithmic rules preventing monopoly usage, balancing peak-hour demand across departments and project quotas.
6. **Equipment Check-In**: Physical or digital handoff where requester asserts physical presence and assumes operating custody.
7. **Initial Condition Recording**: Baseline condition attestation (including checklists, notes, and photos) signed off by both custodian and requester before operation begins.
8. **Equipment Return**: Scheduled handback sequence marking the end of active operational custody.
9. **Final Condition Recording**: Post-operation reconciliation verifying item health against initial baseline, capturing delta, consumables consumed, or wear.
10. **Incident Reporting & Auditable History**: Immutable audit log of the custodial transaction; immediate incident escalation if damage, misuse, or variance is detected.

---

## 5. MVP Priorities (Hackathon Scope)

1. **Monorepo Foundation & Operational Health**:
   * Production-grade repository skeleton with Next.js App Router and FastAPI backend.
   * Standardized health checking and automated test harnesses.
2. **Resource Catalog & Discovery**:
   * Structured resource listing with department, type, location, and operational status.
   * Resource detail view highlighting eligibility requirements and custodian contact.
3. **TrustFlow Booking Lifecycle**:
   * Request initiation with state machine transitions (`REQUESTED`, `APPROVED`, `ACTIVE`, `RETURNED`, `CLOSED`).
   * Dual-attestation condition checkpoints (Check-in initial state vs. Check-out final state).
4. **Single-Institution Architecture**:
   * Multi-department modeling within a single tenant boundary, laying data-model foundations for multi-institutional federation.

---

## 6. Explicitly Out-of-Scope Features

The following capabilities are deliberately excluded from the initial phase:
* **Monetary Transactions & Deposits**: No credit card processing, internal university billing transfers, or security deposit escrow.
* **Authentication & Identity Provider Integration (Phase 1)**: Initial foundation uses mockable user contexts and explicit headers; SSO/SAML/OAuth2 will follow in later iterations.
* **Hardware IoT & Smart Lock Integration**: Check-in and return are verified via software workflows rather than physical badge readers or automated locker solenoids.
* **Trained Machine Learning Models**: No custom model training. Future intelligent matching will leverage third-party LLM APIs with strict structured outputs.
* **Cross-Institution Resource Sharing**: Inter-institutional federation and guest identity brokering are architectural goals for subsequent releases.
