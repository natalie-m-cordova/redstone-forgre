# Architecture

This document describes the technical architecture of the Minecraft Control Panel system.

It will include:

## 1. High-Level System Diagram
- Server Controller (Backend)
- Web UI (Frontend)
- Minecraft Server Process
- Interaction between components

## 2. Machine Roles
- TEMP PC (Windows host)
- Kid PCs (clients)
- NAS (Linux host in Phase 2)

## 3. Component Responsibilities
- API responsibilities
- Runner responsibilities
- Profile and world storage
- Log handling

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