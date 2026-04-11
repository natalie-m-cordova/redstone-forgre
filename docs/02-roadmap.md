# Roadmap

This roadmap defines the staged evolution of Redstone Forge across
development, deployment, and system stabilization.

It aligns with the Architecture document and reflects a **Linux NAS-first deployment model**.

---

# Redstone Forge follows a stage-based development model:

## Stage 0: Development MVP  
- Mock system (no real Minecraft execution)  
- UI + backend skeleton  

## Stage 1: Linux Deployment  
- First real usable system  
- Runs on Linux NAS  
- Kids can use it end-to-end  

## Stage 2: Stabilization  
- Bug fixes and reliability improvements  
- Performance tuning  
- Backup, telemetry, and UX hardening  

## Stage 3: Enhancements  
- New features and expansion  
- Optional capabilities (desktop client, backend downloads, multi-instance, etc.)  

---

# Stage 0 -- Development MVP (GitHub Only)

**Goal:** Build the full control panel skeleton without real Minecraft
server execution.

## Deliverables

- FastAPI backend skeleton
- Web UI (Simple + Advanced toggle)
- Server CRUD
  - Forge / Fabric / Vanilla selection
- World CRUD
- Mock start/stop endpoints
- Curated mod multi-selection
- Upload pipeline (mock validation)
- Status display
- Logging simulation
- Clean project structure
- **App-like UI interactions (no refresh)**
- **Progress + “server thinking” UI (mocked)**

## Exit Criteria

- UI functions end-to-end
- Server and world configuration stored properly
- No real subprocess execution yet
- Ready for real host integration
- SPA-like *feel* (no refresh)

## Explicitly Excluded

- Real Minecraft subprocess execution
- Docker deployment
- CurseForge import
- Multi-instance support
- Desktop client
- Backend-managed downloads

---

# Stage 1 – Linux NAS Host Integration (Primary Deployment)

**Goal:** Deploy Redstone Forge to a Linux NAS and enable real Minecraft server execution.

This is the **first real runtime environment**.

## Deliverables

- Real Minecraft subprocess execution (Linux)
- PID tracking and lifecycle control
- Graceful shutdown handling
- systemd service integration
- Real log streaming to UI
- Automatic world backup before configuration changes
- LAN firewall configuration
- Static IP or DHCP reservation
- Stable NAS-based deployment
- Clean installation documentation

### Runtime Features

- **Live console streaming (stdout)**
- **Advanced console input (stdin)**
- **Progress events for real operations**
- **Basic telemetry (CPU/RAM)**

## Exit Criteria

- Kids can launch/stop server from UI
- Logs stream reliably
- Backups trigger correctly
- System stable for daily use
- Backend fully running on Linux NAS

## Explicitly Excluded

- Docker/k8s experimentation
- Multi-instance support
- Desktop client
- Backend-managed downloads

---

# Stage 2 – Stabilization (Post-Deployment Hardening)

**Goal:** Harden the Linux deployment and improve reliability before adding new features.

## Deliverables

- Bug fixes from real-world usage
- Performance tuning:
  - server startup time
  - log streaming reliability
  - backup speed
- Hardened configuration:
  - paths
  - permissions
  - service restart behavior
- Improved observability:
  - clear state machine (STOPPED/STARTING/RUNNING/ERROR)
  - actionable error messages

### UX Enhancements

- Dashboard telemetry (CPU/RAM/disk)
- Operation progress bars
- Activity feed (“what is happening now”)

### Data Safety

- Backup retention policy (rotation/limits)
- Restore workflow (tested + documented)

## Exit Criteria

- System stable for extended daily use
- No critical reliability issues
- Backup/restore fully validated
- UI reflects real system state accurately

---

# Stage 3 – Enhancements (v2+)

**Goal:** Expand capabilities without breaking core architectural invariants.

## Deliverables (Ordered)

### 1) Deployment Enhancements (Optional)
- Docker Compose packaging (optional)
- Documented install paths:
  - Bare metal (primary)
  - Docker (secondary)
- No Kubernetes yet

### 2) Mod Acquisition Enhancements
- Backend-managed downloads
- Allowlist / curated catalog
- Provenance + hash tracking
- Reuse quarantine/validation pipeline

- Optional CurseForge import:
  - Parse modpacks
  - Validate compatibility
  - Generate server configs

### 3) Desktop Client (Optional)
- Thin client (Tauri/Electron)
- Uses backend API only
- No duplicated logic

### 4) Multi-Instance Foundation
- Instance-aware data model
- Per-instance isolation:
  - ports
  - directories
  - logs
  - backups
- Do not enable multi-instance yet

## Exit Criteria

- Linux system remains stable
- Enhancements do not violate architecture
- Install paths clearly documented
- Mod ingestion remains safe and auditable

## Explicitly Excluded

- Public internet exposure
- Multi-tenant system
- Billing or marketplace features
- Guaranteed mod compatibility engine

---

# Guiding Principles

- Infrastructure stability before feature complexity
- No artificial migration stages
- Linux NAS is the primary deployment target
- Add capabilities intentionally, not reactively
- Preserve LAN-first security model
- Avoid over-engineering early

---

# Versioning Strategy (Updated)

- v0.x → Stage 0 (Development MVP)
- v1.x → Stage 1 (Linux deployment)
- v2.x → Stage 2 (Stabilized system)
- v3.x → Stage 3 (Feature expansion)

---

# Future Roadmap Extensions

## Milestone Mapping
- GitHub milestones → stages

## Upgrade Path
- Storage evolution (JSON → SQLite)
- Optional Docker adoption
- Multi-instance enablement