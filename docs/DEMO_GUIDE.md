# ResourceLoop — End-to-End Demo Guide & Acceptance Criteria

This document describes the planned demonstration scenario for ResourceLoop at the conclusion of the 48-hour hackathon, as well as the strict acceptance criteria required for project completion.

---

## 1. Intended End-to-End Demo Narrative

The hackathon pitch will showcase a complete 3-minute lifecycle walkthrough demonstrating how ResourceLoop resolves institutional friction and equipment disputes:

### Scenario: "Dr. Chen's High-Resolution Electron Microscope Booking"
* **Actor 1**: Dr. Aris Chen (Postdoctoral Researcher, Materials Science)
* **Actor 2**: Sarah Miller (Nanotechnology Core Facility Manager / Custodian)

### Act 1: The Bottleneck & Discovery (Minute 0:00 - 0:45)
1. Dr. Chen needs high-resolution imaging for a time-sensitive grant submission. Her own lab's microscope is down for scheduled calibration.
2. She opens ResourceLoop and navigates to the **Resource Discovery** catalog.
3. She filters by category (`Laboratory Equipment`), department (`Nanotechnology Core`), and verified availability for tomorrow.
4. She reviews the resource card: specs, training requirements, location, and the custodian contact.

### Act 2: TrustFlow Request & Custodian Verification (Minute 0:45 - 1:30)
1. Dr. Chen submits a booking request specifying purpose and time window.
2. The system checks her qualifications: "Laser Safety Level 2: Verified", "Electron Beam Operator: Certified".
3. Manager Sarah Miller receives the pending request on her custodian dashboard.
4. Sarah reviews Dr. Chen’s credentials and approves the request with a single click.

### Act 3: Physical Check-In & Initial Condition Attestation (Minute 1:30 - 2:15)
1. At the booked start time, Dr. Chen arrives at the Nano Center.
2. She initiates the **Check-In** process on her mobile device.
3. Both Dr. Chen and custodian complete the initial condition checklist:
   * Stage calibration: Passed
   * Lens vacuum chamber: Clear
   * Baseline condition rating: `PRISTINE`
4. Custody transfer is digitally signed and logged.

### Act 4: Return, Reconciliation & Dispute Prevention (Minute 2:15 - 3:00)
1. Following the 3-hour experiment, Dr. Chen returns the instrument.
2. Both parties execute the **Return Protocol**:
   * Objective checklist verification.
   * Condition recorded: `PRISTINE` (or capturing any minor consumables used).
3. The booking status transitions to `COMPLETED`.
4. The audit log updates instantaneously, proving mutual satisfaction and eliminating subsequent wear-and-tear blame games.

---

## 2. Hackathon Completion Checklist (Must-Work Criteria)

Before the project is considered hackathon-complete, the following capabilities must be fully operational:

- [ ] **Live Service Health**: Both `/health` and `/api/v1/health` respond with `200 OK` and accurate system telemetry.
- [ ] **Resource Catalog UI**: Interactive Next.js discovery interface with search and category filtering.
- [ ] **TrustFlow State Engine**: Automated progression across states (`REQUESTED` -> `APPROVED` -> `CHECKED_IN` -> `RETURNED` -> `COMPLETED`).
- [ ] **Condition Logging**: Functional dual-attestation forms (initial check-in condition vs. return condition).
- [ ] **Responsive Design**: Professional institutional SaaS layout verified across desktop and mobile screens.
- [ ] **Automated Backend Tests**: Pytest suite executing cleanly with zero regressions.
- [ ] **Deployment Readiness**: Frontend configured for Vercel deployment and backend prepared for Render deployment with environment variables.
