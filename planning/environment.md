# Environment Notes

## Backend Host (Linux NAS)
- Hosts:
    - FastAPI backend
    - Minecraft server process
    - All runtime storage (severs, worlds, mods, backups, logs)
- Service management: systemd
- LAN-only access (no WAN exposure)
- Static IP or DHCP reservation (required)

Runtime:
- Python 3.12+
- Temurin JDK 17+

Notes:
- This is the authoritative system host
- Must be treated as a dedicated service machine (not a personal workstation)

---

## Kid PCs (Windows 11)
- Connect via browser to backend (LAN)
- Used for:
  - Starting/stopping servers
  - Selecting worlds and mods
  - Uploading mods (MVP flow)
- Connect to Minecraft server via LAN

Local Tools:
- CurseForge (optional, client-side mod browsing/downloading)

Constraints:
- No direct filesystem access to backend
- No server control outside API

---

## Developer Machine (Optional / Natalie PC)

- Used for development and testing only
- Not a production host
- May run:
  - Local FastAPI server (short-lived)
  - Frontend development environment
  - Mock backend testing

Constraints:
- Must NOT be used for:
  - Persistent server hosting
  - Long-running Minecraft server
  - Primary backend deployment
  - Runtime data storage

Purpose:
- Safe iteration without impacting live environment