# Deployment – Windows Host

This document describes deployment on Windows 10 Pro (TEMP PC).

---

# Prerequisites

- Python 3.12 (for backend)
- Temurin JDK 17
- Git
- LAN network configured as Private

---

# High-Level Steps

1. Clone repository
2. Create virtual environment
3. Install dependencies
4. Start FastAPI server
5. Install Minecraft server files
6. Configure Forge / Fabric loaders
7. Configure firewall rules

---

# Runner Design (Phase 1)

- Python subprocess used to launch Minecraft server
- PID stored for stop handling
- Logs captured from console or latest.log
- Automatic backup before configuration changes

Detailed step-by-step instructions will be added during Phase 1.

---

# Coming Soon

## Host Security Assumption
- Host operating system is maintained with standard security practices.
- Windows hosts are expected to run Windows Defender.
- Redstone Forge does not replace host-level antivirus protections.

## Log Handling
- Location of latest.log
- Console capture strategy

## Troubleshooting
- Port conflicts
- Java errors
- Permission issues