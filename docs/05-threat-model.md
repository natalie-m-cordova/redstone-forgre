# Threat Model

This document enumerates realistic risks within the LAN-first deployment model.

Redstone Forge assumes a **trusted LAN environment**, but all inputs and operations are treated defensively.

---

## 1. Untrusted Mod Upload

Threat:
- Malicious or corrupted `.jar` file uploaded via Web UI

Impact:
- Server crash
- Unexpected behavior
- Disk pollution
- Potential execution of unsafe code within Minecraft runtime

Mitigations:
- Quarantine upload directory
- SHA-256 hash calculation
- File extension validation (`.jar` only)
- File size limits
- Validation pipeline before moving to mod library
- Stage 3+: curated/allowlisted mod sources

---

## 2. Accidental World Loss

Threat:
- Overwriting world during server change
- User error during restore

Impact:
- Permanent world data loss

Mitigations:
- Automatic backup before world or mod changes
- Restore confirmation prompts
- Backup retention policy
- Clear UI warnings for destructive actions

---

## 3. Resource Exhaustion

Threat:
- Minecraft server consumes excessive RAM/CPU
- Future multi-instance usage causes contention

Impact:
- Host instability
- Service crash
- System slowdown

Mitigations:
- Single-instance design (Stage 0–2)
- Process monitoring
- Stage 3+: resource limits per instance (CPU/RAM)
- Clear visibility of resource usage in UI

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
- Crash detection and error state in UI
- Stage 2+: restart policy and recovery handling

---

## 5. Path Traversal / Unsafe Input

Threat:
- Crafted upload attempts to escape intended directories

Impact:
- File system corruption
- Unauthorized file overwrite

Mitigations:
- Strict server-side path validation
- Controlled storage root
- No user-controlled absolute paths
- No blind file writes

---

## 6. Disk Exhaustion

Threat:
- Backups, logs, or uploads consume all disk space

Impact:
- System instability
- Failed server operations
- Potential data loss

Mitigations:
- Backup retention policy (rotation)
- Size-based cleanup
- Disk usage monitoring
- Upload size limits

---

## 7. Destructive Operations (World Apply / Restore)

Threat:
- User applies incorrect world or restores wrong backup

Impact:
- Accidental data loss

Mitigations:
- Explicit confirmation prompts
- “This will overwrite X” messaging
- Automatic backup before destructive operations
- Advanced Mode gating (optional)
- Restore preview metadata (timestamp, world name, size)

---

## 8. Upload Abuse / Oversized Uploads

Threat:
- Large or repeated uploads degrade performance or fill disk

Impact:
- Disk exhaustion
- Slow or failed operations

Mitigations:
- File size limits
- Upload progress + cancellation
- Quarantine validation pipeline
- Disk threshold checks before accepting uploads

---

## 9. Telemetry / Polling Overload

Threat:
- Excessive polling or inefficient UI loops overload backend

Impact:
- Increased CPU usage
- UI instability or lag

Mitigations:
- Server-Sent Events (SSE) for push updates
- Rate-limited polling where necessary
- Backpressure handling for streaming endpoints

---

## 10. Unauthorized LAN Access

Threat:
- Another device on the LAN accesses the UI or API

Impact:
- Unauthorized server control
- Potential destructive actions

Mitigations:
- LAN-only exposure (no WAN)
- No port forwarding
- Stage 2–3: optional local authentication
- Limit exposure to trusted network segments

---

## 11. Backend Misconfiguration

Threat:
- Incorrect service binding (e.g., 0.0.0.0 exposed unintentionally)
- Firewall misconfiguration

Impact:
- Accidental public exposure
- Increased attack surface

Mitigations:
- Bind backend to private interface only
- Firewall restricted to LAN subnet
- No public routing or DNS
- Clear deployment documentation

---

## 12. Log / Data Leakage

Threat:
- Logs expose sensitive paths or system details

Impact:
- Information disclosure
- Easier exploitation if system is exposed

Mitigations:
- Sanitize logs in UI (Simple Mode)
- Avoid exposing full filesystem paths
- Separate internal logs from UI-facing logs

---

# Summary

Redstone Forge operates under a **defensive LAN model**:

- All inputs are treated as untrusted
- All destructive actions require safeguards
- System exposure is minimized by design
- Stability and data safety are prioritized over feature complexity

The threat model evolves with system stages:

- Stage 0–1: Focus on safe execution and input validation
- Stage 2: Focus on stability, recovery, and hardening
- Stage 3+: Expand capabilities while maintaining strict security boundaries