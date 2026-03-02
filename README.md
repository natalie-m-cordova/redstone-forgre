<p>
  <img src="assets/branding/redstone-forge-logo.png">
</p>

# Minecraft Control Panel (LAN)

A LAN-only control panel for managing Minecraft servers (Forge, Fabric, and Vanilla) with kid-friendly profile and world management.

This system allows Minecraft servers to be started, stopped, and configured through a browser-based interface hosted on the server machine.

---

# Project Purpose

This project exists to:

- Provide a safe, LAN-only Minecraft server control system
- Allow flexible mod usage (Forge, Fabric, Vanilla)
- Support multiple user-defined profiles and worlds
- Prevent accidental world corruption through guardrails and backups
- Transition cleanly from Windows host to Linux NAS host
- Grow from MVP to advanced import and validation features

---

# Environment Overview

## Current Machines

| Machine        | OS              | Role |
|---------------|----------------|------|
| ARCADIA      | Windows 11 Pro | Kid PC 1 (Media + Gaming) |
| Natalie's PC (TEMP) | Windows 10 Pro | Temporary Minecraft Server Host |
| GAMESTATION  | Windows 11 Pro | Kid PC 2 (Future Gaming + Editing) |
| NAS (Future) | Linux          | Final Minecraft Server Host + Archive |

---

# System Architecture

The project consists of two primary components:

## 1. Server Controller (Backend)

Runs on:
- TEMP PC (Windows) initially
- Linux NAS in Phase 2

Responsibilities:
- Manage Profiles
- Manage Worlds
- Apply selected mods
- Start/Stop Minecraft server
- Provide server status
- Provide logs
- Perform backups before mod/world changes

## 2. Web UI (Frontend)

Runs in:
- Browser on Kid PCs
- Served from server machine

Modes:
- Simple Mode (default, card-based UI)
- Advanced Mode (detailed configuration tables and logs)

---

# Phased Development Plan

## MVP – LAN Web Control Panel

Includes:
- Forge / Fabric / Vanilla selection
- Profile CRUD
- World CRUD
- Curated mod multi-selection
- Mock start/stop runner
- Status display
- Logs view (mock)
- Simple / Advanced UI toggle

Excludes:
- Real server execution
- CurseForge import
- Linux migration
- Desktop wrapper client

---

## Phase 1 – Windows Host Integration

- Real subprocess execution
- PID tracking
- Log tail reading
- World backup automation
- LAN firewall configuration

---

## v2 – CurseForge Import

- Detect installed modpacks
- Parse manifest
- Create server profiles automatically
- Validate loader + Minecraft version compatibility
- Basic mod conflict detection

---

## Phase 2 – Linux NAS Migration

- Move controller to Linux
- Replace Windows runner with systemd service
- Migrate profile/world paths
- Harden LAN security

---

# Core Concepts

## Loader

- `forge`
- `fabric`
- `vanilla`

Forge and Fabric never mix.

---

## Profile

A profile defines:
- Loader type
- Minecraft version
- Loader version
- Selected mods
- Assigned world
- Memory settings

Profiles are isolated from one another.

---

## World

A world:
- Is stored as its own folder
- Can be attached to a profile
- Is automatically backed up when mod configuration changes

Switching mods on an existing world may corrupt it. Backups are mandatory before launch if configuration changes.

---

# Security Model

- LAN-only access
- No router port forwarding
- Bound to private network
- Optional local PIN in UI (future)

This system is not intended for public internet exposure.

---

# Documentation Index

## For System Administration (Technical)

- [Architecture](docs/01-architecture.md)
- [Phases](docs/02-phases.md)
- [Profiles and Worlds Design](docs/03-profiles-worlds.md)
- [Security Model](docs/04-security-lan-only.md)
- [Deployment – Windows](docs/deployment-windows.md) *(future)*
- [Deployment – Linux](docs/deployment-linux.md) *(future)*

---

## For Kids (User Guide)

- [How to Start the Server](docs/user-guide.md)
- [How to Create a Profile](docs/user-guide.md)
- [How to Create a World](docs/user-guide.md)
- [How to Add Mods](docs/user-guide.md)

---

# Development Workflow

- GitHub Issues track subtasks
- GitHub Projects board tracks status
- Milestones define phase completion
- Always create a new branch before starting work
- Never commit directly to main

---

# Current Status

MVP is under active development.

Refer to the GitHub Project board for live progress.

---

# Future Expansion Ideas

- Multiple concurrent server instances
- Role-based UI access
- Automatic mod dependency resolution
- Profile export/import
- Desktop wrapper client app
- Web-based world backups restore interface

---

# Philosophy

This project prioritizes:

- Safety over convenience
- Clarity over complexity
- Iterative growth over premature optimization
- LAN-first architecture
