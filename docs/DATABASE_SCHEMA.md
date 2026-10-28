# ResourceLoop — Planned Database Schema

> **Notice**: This document outlines the planned relational schema for ResourceLoop. These tables represent the target architecture and are **not yet created or migrated** in the initial repository foundation phase. Schema migration will occur via Alembic once models are formally approved.

---

## 1. Entity-Relationship Overview

```
┌────────────────┐          ┌────────────────┐
│  institutions  │◀─────────│  departments   │
└───────┬────────┘          └───────┬────────┘
        │                           │
        ▼                           ▼
┌────────────────┐          ┌────────────────┐
│     users      │◀─────────│   resources    │
└───────┬────────┘          └───────┬────────┘
        │                           │
        │    ┌─────────────────┐    │
        └───▶│    bookings     │◀───┘
             └────────┬────────┘
                      │
       ┌──────────────┴──────────────┐
       ▼                             ▼
┌────────────────┐          ┌────────────────┐
│ condition_logs │          │   incidents    │
└────────────────┘          └────────────────┘
```

---

## 2. Planned Tables

### 2.1 `institutions`
Represents the organizational umbrella (e.g., University or Research Institute).
* `id` (UUID, Primary Key)
* `name` (VARCHAR(255), Not Null)
* `slug` (VARCHAR(100), Unique, Not Null)
* `domain` (VARCHAR(255), Nullable)
* `created_at` (TIMESTAMPTZ, Default NOW())
* `updated_at` (TIMESTAMPTZ, Default NOW())

### 2.2 `departments`
Academic or operational divisions within an institution.
* `id` (UUID, Primary Key)
* `institution_id` (UUID, Foreign Key -> `institutions.id`)
* `name` (VARCHAR(255), Not Null)
* `code` (VARCHAR(50), Not Null)
* `created_at` (TIMESTAMPTZ, Default NOW())

### 2.3 `users`
Institutional actors (requesters, custodians, managers, administrators).
* `id` (UUID, Primary Key)
* `institution_id` (UUID, Foreign Key -> `institutions.id`)
* `department_id` (UUID, Foreign Key -> `departments.id`, Nullable)
* `email` (VARCHAR(255), Unique, Not Null)
* `full_name` (VARCHAR(255), Not Null)
* `role` (ENUM: `REQUESTER`, `CUSTODIAN`, `ADMIN`, Not Null)
* `is_active` (BOOLEAN, Default True)
* `created_at` (TIMESTAMPTZ, Default NOW())

### 2.4 `resources`
Assets available for reservation (laboratories, microscopes, CNC machines, compute rigs).
* `id` (UUID, Primary Key)
* `institution_id` (UUID, Foreign Key -> `institutions.id`)
* `department_id` (UUID, Foreign Key -> `departments.id`)
* `custodian_id` (UUID, Foreign Key -> `users.id`)
* `name` (VARCHAR(255), Not Null)
* `category` (ENUM: `LAB_EQUIPMENT`, `FACILITY_SPACE`, `COMPUTE_RIG`, `FIELD_DEVICE`)
* `description` (TEXT)
* `location` (VARCHAR(255), Not Null)
* `status` (ENUM: `AVAILABLE`, `MAINTENANCE`, `RETIRED`, Default `AVAILABLE`)
* `specifications` (JSONB, Default `{}`)
* `created_at` (TIMESTAMPTZ, Default NOW())
* `updated_at` (TIMESTAMPTZ, Default NOW())

### 2.5 `eligibility_rules`
Defines prerequisites required to book specific resources.
* `id` (UUID, Primary Key)
* `resource_id` (UUID, Foreign Key -> `resources.id`)
* `required_training_code` (VARCHAR(100), Not Null)
* `min_academic_standing` (VARCHAR(50), Nullable)
* `requires_faculty_sponsor` (BOOLEAN, Default False)

### 2.6 `user_qualifications`
Proof of certified qualifications, training, or safety inductions for a user.
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key -> `users.id`)
* `qualification_code` (VARCHAR(100), Not Null)
* `certified_at` (TIMESTAMPTZ, Not Null)
* `expires_at` (TIMESTAMPTZ, Nullable)

### 2.7 `bookings` (TrustFlow Core Entity)
Tracks the custodial booking through its lifecycle.
* `id` (UUID, Primary Key)
* `resource_id` (UUID, Foreign Key -> `resources.id`)
* `requester_id` (UUID, Foreign Key -> `users.id`)
* `approver_id` (UUID, Foreign Key -> `users.id`, Nullable)
* `start_time` (TIMESTAMPTZ, Not Null)
* `end_time` (TIMESTAMPTZ, Not Null)
* `status` (ENUM: `PENDING_APPROVAL`, `APPROVED`, `REJECTED`, `CHECKED_IN`, `RETURNED`, `CANCELLED`, `COMPLETED`, `DISPUTED`)
* `purpose` (TEXT, Not Null)
* `created_at` (TIMESTAMPTZ, Default NOW())
* `updated_at` (TIMESTAMPTZ, Default NOW())

### 2.8 `condition_logs` (Custody Attestation)
Records the documented condition at check-in (initial) and check-out (final).
* `id` (UUID, Primary Key)
* `booking_id` (UUID, Foreign Key -> `bookings.id`)
* `recorder_id` (UUID, Foreign Key -> `users.id`)
* `stage` (ENUM: `INITIAL_CHECK_IN`, `FINAL_RETURN`)
* `condition_rating` (ENUM: `PRISTINE`, `GOOD`, `ACCEPTABLE`, `DEFECTIVE`, `DAMAGED`)
* `checklist_answers` (JSONB, Default `{}`)
* `notes` (TEXT, Nullable)
* `evidence_urls` (JSONB, Default `[]`)
* `recorded_at` (TIMESTAMPTZ, Default NOW())

### 2.9 `incidents`
Detailed records of operational faults, damages, or discrepancies.
* `id` (UUID, Primary Key)
* `booking_id` (UUID, Foreign Key -> `bookings.id`)
* `reporter_id` (UUID, Foreign Key -> `users.id`)
* `severity` (ENUM: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
* `title` (VARCHAR(255), Not Null)
* `description` (TEXT, Not Null)
* `resolution_status` (ENUM: `OPEN`, `INVESTIGATING`, `RESOLVED`, Default `OPEN`)
* `created_at` (TIMESTAMPTZ, Default NOW())

---

## 3. TrustFlow State Machine Lifecycle

```
[ DRAFT / NEW ]
       │
       ▼
 PENDING_APPROVAL ────(Manager Rejection)────▶ REJECTED
       │
       │ (Manager Approval)
       ▼
   APPROVED ──────────(Cancellation)─────────▶ CANCELLED
       │
       │ (Step 6 & 7: Check-in + Initial Condition Logged)
       ▼
  CHECKED_IN
       │
       │ (Step 8 & 9: Return + Final Condition Logged)
       ▼
   RETURNED ──────────(Discrepancy / Damage)──▶ DISPUTED (Incident Logged)
       │
       │ (Condition Verified Clean)
       ▼
   COMPLETED
```

---

## 4. Audit & Concurrency Rules

1. **Exclusion Constraints**: Time ranges (`tsrange(start_time, end_time)`) for active bookings on a given resource will use PostgreSQL GiST exclusion constraints to guarantee zero overlapping reservations at the storage layer.
2. **Dual-Signoff Requirement**: A transition from `CHECKED_IN` to `COMPLETED` requires both an initial `condition_log` and a matching final `condition_log`.
3. **Immutable History**: `condition_logs` and `incidents` cannot be modified or deleted once persisted; corrections are applied via supplementary log entries.
