# Deployment – Linux NAS

Deployment target: Linux NAS (Phase 2).

---

# Expected Environment

- Linux distribution with systemd
- Python 3.12
- Temurin JDK 17
- LAN network access

---

# Directory Layout (Planned)

Example:

/srv/minecraft/
    controller/
    profiles/
    worlds/
    backups/
    logs/

---

# Systemd Integration (Planned)

- Controller service
- Minecraft server service
- Automatic restart policies

---

# Migration from Windows

- Move profile JSON files
- Move world directories
- Adjust path configuration
- Replace Windows subprocess runner with Linux runner

---

# COMING SOON

## System Setup
- Required Linux distribution
- Required packages
- Python installation
- Java installation

## Directory Layout
- /srv/minecraft or /opt/minecraft
- Profiles storage
- Worlds storage
- Backups storage

## Systemd Service Setup
- Controller service
- Minecraft server service
- Automatic restart behavior

## Firewall Configuration
- UFW or firewalld rules
- LAN-only exposure

## Migration from Windows Host
- Moving profile JSON
- Moving world folders
- Path adjustments
- Runner changes