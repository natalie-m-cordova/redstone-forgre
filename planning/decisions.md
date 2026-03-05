
# Decision Log

This document records architectural and product decisions for Redstone Forge.

Each entry includes:
- Date
- Decision
- Scope
- Reason
- Rejected Alternatives (when applicable)
- Supersedes (when applicable)
- impact (when applicable)
- Status

---

## 2026-03-02 – Backend Framework
**Decision:** Use Python + FastAPI  
**Scope:** MVP → All Stages  
**Reason:** Cross-platform, simple deployment, easy subprocess control, strong ecosystem.  
**Rejected Alternatives:** Node.js/Express, Flask, full Django stack.

## 2026-03-02 – Storage Model (MVP)
**Decision:** Use JSON files on disk (no database for MVP).  
**Scope:** Stage 0 / Stage 1  
**Reason:** Simplicity and portability to Linux.  
**Future Direction:** SQLite introduced when metadata complexity increases.

## 2026-03-02 – Security Model
**Decision:** LAN-only for inbound access (no public exposure); outbound internet allowed for mod acquisition.  
**Scope:** MVP → v2+  
**Reason:** Home infrastructure use case, security-first posture.  
**Rejected Alternatives:** Reverse proxy + WAN exposure.

## 2026-03-02 – Runner Strategy
**Decision:** Abstract runner layer so Windows and Linux implementations differ but API stays consistent.  
**Scope:** MVP → Stage 2 Migration  
**Reason:** Enables Linux migration without architectural rewrite.

## 2026-03-02 – MVP Single Instance
**Decision:** Only one Minecraft server instance supported in MVP.  
**Scope:** Stage 0 / Stage 1  
**Reason:** Reduce orchestration complexity and stabilize core system first.  
**Deferred:** Multi-instance support (Stage 3+).

## 2026-03-02 – Mod Ingestion Model (MVP)
**Decision:** Web UI upload → quarantine → validation → library → profile.  
**Scope:** MVP  
**Reason:** Centralized validation, no SMB permissions required.  
**Rejected Alternatives:** Direct SMB drop folder ingestion.

## 2026-03-03 – Stage 2 Migration Strategy
**Decision:** Linux migration will be bare metal (no Docker during migration).  
**Scope:** Stage 2  
**Reason:** Reduce migration risk and isolate infrastructure change from deployment model experimentation.  
**Deferred:** Docker experimentation to Stage 3.

## 2026-03-03 – Docker Positioning
**Decision:** Docker is optional and must not replace bare metal as primary supported deployment.  
**Scope:** Stage 3+  
**Reason:** Maintain simplicity; avoid container dependency lock-in.

## 2026-03-03 – Desktop Client Positioning
**Decision:** Desktop client is optional and must remain a thin API-based client.  
**Scope:** Stage 3+  
**Reason:** Prevent duplication of backend logic and filesystem coupling.  
**Constraint:** Web UI remains authoritative.

## 2026-03-03 – Profile Version Locking
**Decision:** Profiles are version-locked to specific Minecraft + loader versions.  
**Scope:** MVP → v2+  
**Reason:** Prevent invalid launch states and compatibility ambiguity.

## 2026-03-03 – Backup Policy Requirement
**Decision:** Backup required before mod or world changes; retention must prevent unbounded disk growth.  
**Scope:** MVP → v2+  
**Reason:** Protect against data loss and disk exhaustion.

## 2026-03-03 – Stage Structure
**Decision:** Use Stage-based roadmap model (Stage 0–3+) instead of mixed Phase/vX naming.  
**Scope:** Project Management  
**Reason:** Maintain chronological clarity across development, migration, and enhancement tracks

## 2026-03-03 – MVP Storage Layout
**Decision:**  
Use `data/` as the runtime storage root with structured subdirectories:
- `data/profiles/`
- `data/worlds/`
- `data/index/`

**Scope:** Stage 0 / Stage 1  
**Reason:** Maintain simple JSON-on-disk persistence while preserving clean separation between source code and runtime state.  
**Constraints:**
- `data/` is ignored by git.
- All world paths must be stored as relative paths.
- No hardcoded absolute filesystem paths in code.  

**Future Direction:**  May migrate metadata to SQLite in Stage 3+, but filesystem boundaries remain.

## 2026-03-04 – Python Command Standardization
**Decision:** Use `python` command instead of `py`.  
**Scope:** Development + Deployment (Windows / Linux)  
**Reason:**  `python` works consistently across Windows and Linux environments, while `py` is Windows-specific.  Standardizing on `python` ensures cross-platform compatibility and avoids environment ambiguity.  
**Rejected Alternatives:**  - Using `py` launcher on Windows.  
**Impact:**  All documentation and commands will reference `python`.  Install instructions require Python to be available on PATH.  
**Status:** Active  

## 2026-03-04 – Swagger Favicon Customization
**Decision:** Swagger UI favicon customization deferred.  
**Scope:** MVP  
**Reason:**  The default Swagger favicon does not impact system functionality.  Customizing the Swagger UI HTML introduced unnecessary complexity during early development.  
**Rejected Alternatives:**  
- Overriding the Swagger UI HTML.
- Custom Swagger template injection.

**Impact:**  Swagger UI will use the default favicon during MVP development.  
**Status:** Deferred

## 2026-03-04 – Deployment Documentation Structure
**Decision:** Split deployment documentation by machine role and operating system.  
**Scope:** Documentation  
**Reason:** Redstone Forge supports multiple machine roles:
- Backend server host
- Optional controller client  

Separating deployment documentation prevents mixing instructions for different operating systems and roles.  
**Impact:**  Deployment documentation is organized as:
- `deployment.md` (entry point)
- `deployment-linux-server.md`
- `deployment-windows-server.md`
- `deployment-windows-controller.md`

**Status:** Active

## 2026-03-04 – Manual Server Startup (Development)
**Decision:** FastAPI server is started manually during Stage 0 development.  
**Scope:** Stage 0 – Development MVP  
**Reason:**  Manual startup simplifies development and avoids premature process management complexity.  
Automated service management will be introduced when real Minecraft subprocess execution is implemented.  
**Impact:**  Developers start the server manually using:  `python -m uvicorn backend.main:app`  
**Status:** Active

## 2026-03-04 – Event-driven UI Updates
**Decision:** Use an event-driven update model (SSE initially; WebSocket optional later) so the UI can update without full-page refresh.  
**Scope:** Stage 0+ UI interactions; Stage 1 console + progress; Stage 3 telemetry  
**Reason:** Supports Crafty-like UX: live console output, progress bars, and “thinking” popups during long operations.  
**Rejected Alternatives:** Full refresh on actions; polling-only UI (except lightweight metrics polling).  
**Impact:** Backend will expose a streaming endpoint for operation and status events. UI will subscribe and update in place.

## 2026-03-04 - UI Terms: Servers vs Profiles
**Decision:** UI will use the term **Servers** instead of **Profiles**.  
**Scope:** Stage0+  
**Reason:** “Profiles” is ambiguous for non-technical users.  “Servers” matches what the kids think they are controlling.  The product goal is “Start/Stop Minecraft server remotely” and the UI is a control panel, so “Servers” is the natural label.
**Impact:** 
- Navigation label: **Servers**
- Page title: **Servers**
- Dashboard copy: “Server” terminology

Internally (data model), we may still use:
- `Profile` (existing architecture terminology), or
- rename to `ServerProfile` in code later

This is a UX decision for clarity (kid-friendly) and does not change architectural invariants.
Architecture documents may continue to use “Profiles” as the canonical model term to avoid churn, but the UI should consistently present “Servers”.

Future cleanup step:
- Add a short mapping note in `docs/03-profiles-worlds.md` (Servers UI == Profiles model).