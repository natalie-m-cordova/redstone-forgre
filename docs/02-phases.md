# Phases

# Phases

This project is intentionally built in phases to prevent scope creep and maintain stability.

---

# MVP – LAN Web Control Panel

Deliverables:
- Web UI served from server machine
- Forge / Fabric / Vanilla selection
- Profile CRUD
- World CRUD
- Curated mod multi-selection
- Mock start/stop endpoints
- Status display
- Logs view (mock)
- Simple / Advanced toggle

Excludes:
- Real server execution
- CurseForge import
- Linux migration
- Desktop wrapper

---

# Phase 1 – Windows Host Integration

Deliverables:
- Real Minecraft server subprocess execution
- PID tracking
- Proper stop handling
- Real log tailing
- Automatic world backup before configuration change
- LAN firewall configuration

---

# v2 – CurseForge Import

Deliverables:
- Detect installed CurseForge modpacks
- Parse manifest
- Generate server profile from modpack
- Validate loader and Minecraft version compatibility

---

# Phase 2 – Linux NAS Migration

Deliverables:
- Move controller to Linux
- Replace Windows runner with systemd service
- Migrate profile/world storage paths
- Maintain LAN-only security model

---

# COMING SOON

## Phase Overview
- MVP – LAN Web Control Panel
- Phase 1 – Windows Host Integration
- v2 – CurseForge Import
- Phase 2 – Linux NAS Migration
- v3 – Desktop Wrapper Client

## Phase Boundaries
- What qualifies as completion for each phase
- What is intentionally excluded from each phase

## Milestone Mapping
- How GitHub Milestones map to phases

## Upgrade Path
- Windows → Linux migration plan
- Runner abstraction changes
- Storage path migration

## Versioning Strategy (Future)
- When version tags will begin
- Release labeling structure