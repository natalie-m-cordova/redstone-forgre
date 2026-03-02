# Architecture

This document describes the technical architecture of the Minecraft Control Panel.

---

# 1. High-Level System Overview
The system consists of two primary components:

## Server Controller (Backend)

Runs on:
- Phase 1: Windows 10 Pro (TEMP PC)
- Phase 2: Linux NAS

Responsibilities:
- Manage Profiles
- Manage Worlds
- Apply selected mod configuration
- Start and stop Minecraft server
- Provide server status
- Provide logs
- Trigger backups when configuration changes

The backend will be implemented using:
- Python
- FastAPI

---

## Web UI (Frontend)

- Browser-based interface
- Served from the server machine
- Accessible only on LAN
- Default Simple Mode
- Optional Advanced Mode toggle

The UI communicates with the backend via HTTP API.

---

# 2. Machine Roles

## TEMP PC (Windows 10 Pro)
- Hosts backend during MVP and Phase 1
- Hosts Minecraft LAN server process

## Kid PCs (Windows 11 Pro)
- Access UI via browser
- Connect to Minecraft server via LAN

## NAS (Linux)
- Future backend host
- Future Minecraft server host

---

# 3. Core Architectural Rules

- Only one Minecraft server instance runs at a time (initial design)
- Forge and Fabric are completely isolated
- Profiles define configuration
- Worlds are separate from profiles but can be attached
- Backup required before mod/world configuration changes
- LAN-only exposure

# COMING SOON

## 4. Data Flow
- Profile selection → mod application → server launch
- World selection and backup process
- Log retrieval and display

## 5. Folder Structure (Planned)
- Backend structure
- Frontend structure
- Profiles storage
- Worlds storage
- Backups storage

## 6. Future Architecture Changes
- Linux systemd integration
- Desktop wrapper client architecture
- Possible multi-instance support