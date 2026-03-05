# Threat Model

This document enumerates realistic risks within the LAN-only deployment model.

---

## 1. Untrusted Mod Upload

Threat:
- Malicious or corrupted .jar file uploaded via Web UI

Impact:
- Server crash
- Unexpected behavior
- Disk pollution

Mitigations:
- Quarantine folder
- Hash calculation
- File extension validation
- Optional size limits
- Manual curated mod list (v2+)

---

## 2. Accidental World Loss

Threat:
- Overwriting world during server change
- User error during restore

Impact:
- Permanent world data loss

Mitigations:
- Backup before world or mod changes
- Restore confirmation prompts
- Backup retention policy

---

## 3. Resource Exhaustion

Threat:
- Server consumes excessive RAM/CPU
- Multiple instances (future) compete for resources

Impact:
- Host instability
- Linux service crash

Mitigations:
- Single-instance MVP
- Future resource limits per instance
- Monitoring of process state

---

## 4. Process Crash

Threat:
- Minecraft subprocess crashes unexpectedly

Impact:
- Server offline
- Possible world corruption

Mitigations:
- PID tracking
- Graceful shutdown handling
- Restart policy (future)
- Clear ERROR state in UI

---

## 5. Path Traversal / Unsafe Input

Threat:
- Crafted upload attempts to write outside allowed directories

Impact:
- File system corruption

Mitigations:
- Strict server-side path validation
- No blind file writes
- Controlled storage root

---

## 6. Disk Growth

Threat:
- Backups accumulate indefinitely

Impact:
- Disk full → server crash

Mitigations:
- Retention policy
- Size-based cleanup

---

## 7. Destructive Operations (Backup Restore / World Apply)
Threat:
- Kid/simple user restores wrong backup or overwrites a world inadvertently

Impact:
- Accidental world loss

Mitigations:
- Confirmation prompts with clear “this overwrites X” messaging
- Require backups before applying world/mod changes
- Advanced Mode gate for restore operations (optional)
- Restore preview metadata (timestamp, world name, size)

---

## 8. Upload Abuse / Oversized Uploads
Threat:
- Large uploads fill disk or hang operations

Impact:
- Disk exhaustion, degraded performance

Mitigations:
- File size limits
- Quarantine + validation pipeline
- Upload progress + cancel support
- Retention policies + disk free threshold checks

---

## 9. Telemetry + Polling Overload
Threat:
- Aggressive polling or bad UI loops overload backend

Impact:
- UI becomes unresponsive; backend load increases

Mitigations:
- SSE push for events
- Rate-limited metrics polling (if used)
- Backpressure handling on streaming endpoints
