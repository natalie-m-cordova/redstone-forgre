# Roadmap

This roadmap defines the staged evolution of Redstone Forge across
development, deployment, and infrastructure transitions.

It aligns with the Architecture document and reflects real-world
hardware lifecycle and migration planning.

---

# Stage 0 -- Development MVP (GitHub Only)

**Goal:** Build the full control panel skeleton without real Minecraft
server execution.

## Deliverables

-   FastAPI backend skeleton
-   Web UI (Simple + Advanced toggle)
-   Profile CRUD
    -   Forge / Fabric / Vanilla selection
-   World CRUD
-   Mock start/stop endpoints
-   Curated mod multi-selection
-   Upload pipeline (mock validation)
-   Status display
-   Logging simulation
-   Clean project structure

## Exit Criteria

-   UI functions end-to-end
-   Profile and world configuration stored properly
-   No real subprocess execution yet
-   Ready for Windows host integration

## Explicitly Excluded

-   Real Minecraft subprocess execution
-   Docker deployment
-   CurseForge import
-   Linux migration
-   Multi-instance support
-   Desktop client or wrapper
-   Backend-managed downloads

---

# Stage 1 – Windows Host Integration

**Goal:** Deploy Redstone Forge to Windows TEMP PC with real Minecraft
server execution.

## Deliverables

-   Real Minecraft subprocess execution
-   PID tracking and lifecycle control
-   Proper graceful shutdown handling
-   Real log streaming to UI
-   Automatic world backup before configuration changes
-   LAN firewall configuration
-   Stable local deployment
-   Clean installation process documentation
-   Static IP assignment or DHCP reservation

## Exit Criteria

-   Kids can launch and stop the real Minecraft server from UI
-   Logs stream reliably
-   Backups trigger correctly
-   System stable for daily use

## Explicitly Excluded

-   Linux migration
-   Multi-instance support
-   Backend-managed downloads
-   Docker/k8s experimentation

---

# Stage 2 – Linux Migration (Summer Hardware Event)

**Goal:** Repurpose the old desktop as a dedicated Linux backend host and migrate Redstone Forge from Windows to Linux.

This stage focuses strictly on infrastructure transition and system stability.

This stage coincides with the purchase of the new desktop for the kids, eliminating the need for shared frontend/backend hardware.

## Deliverables

-   Full wipe of old Windows host
-   Linux installation and base configuration
-   Backend deployment on Linux (bare metal)
-   systemd service integration
-   Data migration (profiles, worlds, mod library, backups, logs, database)
-   Validated restore procedure on Linux
-   Static IP assignment or DHCP reservation
-   LAN firewall configuration
-   End-to-end validation testing

## Exit Criteria

-   Backend fully operational on Linux
-   Minecraft server launches and stops successfully
-   Log streaming functional
-   Backup and restore validated on Linux
-   All profiles and worlds migrated successfully
-   System stable for daily use

## Explicitly Excluded

-   Docker or Kubernetes deployment
-   Major feature expansion
-   Multi-instance support
-   Desktop client implementation
-   Backend-managed downloads

---

# Stage 3 – Post-Migration Stabilization + Enhancements (v2+)

**Goal:** Stabilize Redstone Forge on the Linux host, then incrementally add v2+ capabilities without breaking core invariants.

This stage begins only after Stage 2 exit criteria are met (Linux deployment stable for daily use).

## Deliverables (Stabilization First)
-   Bug fixes discovered during Linux migration
-   Performance tuning (startup time, log streaming, backup speed)
-   Hardened configuration defaults (paths, permissions, service restart behavior)
-   Improved observability:
    -   clearer status states (STOPPED/STARTING/RUNNING/STOPPING/ERROR)
    -   actionable error messages in UI
-   Backup retention policy implementation (rotation/limits) consistent with architecture invariants
-   Restore workflow (documented + tested)

## Deliverables (Enhancements – Ordered)
1) **Deployment Enhancements (Optional)**
   -   Docker Compose packaging (optional deployment path; bare metal remains supported)
   -   Documented “Bare Metal vs Docker” install paths
   -   No Kubernetes yet (stretch later)

2) **Mod Acquisition Enhancements**
   -   Backend-managed downloads (allowlist/curated)
   -   Provenance + hash recording
   -   Reuse quarantine/validation pipeline
   -   CurseForge import (optional):
       -   Detect installed CurseForge modpacks
       -   Parse manifest
       -   Generate server profile from modpack
       -   Validate loader and Minecraft version compatibility

3) **Desktop Client (Optional)**
   -   Thin launcher client that uses the same backend API
   -   Option: wrapper around Web UI (Tauri/Electron) with kid-friendly shortcuts

4) **Multi-Instance Foundation (Prep Work)**
   -   Introduce instance-aware data model and routing (even if still running one instance)
   -   Define per-instance ports, directories, and log/backup isolation
   -   Do not enable multiple instances by default until resource limits exist

## Exit Criteria
-   Linux system remains stable under normal use for an extended period
-   Enhancements do not violate architectural invariants
-   Clear install path(s) exist and are documented (bare metal + optional Docker)
-   Mod ingestion and validation remain safe and auditable
-   Desktop client (if implemented) does not duplicate backend logic

## Explicitly Excluded (until explicitly promoted)
-   Kubernetes / k3s deployment as a primary install method
-   Public internet exposure / WAN access
-   Multi-tenant user accounts or hosted-panel behavior
-   “Guaranteed compatibility” mod dependency resolution engine

---

# Guiding Principles

-   Infrastructure stability before feature complexity
-   Migration before orchestration experiments
-   Add capabilities intentionally, not reactively
-   Preserve LAN-first security model unless explicitly redesigned
-   Avoid over-engineering during early stages

---

# Versioning Strategy (Future)

Version tags may begin after Stage 1 (real execution stable).

Suggested approach: 

- v0.x → Stage 0 - Development MVP 
- v1.x → Stage 1 - Stable Windows deployment 
- v2.x → Stage 2 - Stable Linux deployment
- v3.x → Stage 3 - Feature expansion milestones 

---

# Future Roadmap Extensions (Planned Documentation)

## Milestone Mapping
- How GitHub Milestones map to phases

## Upgrade Path
- Windows → Linux migration plan
- Runner abstraction changes
- Storage path migration