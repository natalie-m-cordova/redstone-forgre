<p align="center">
  <img src="assets/branding/redstone-forge-logo.png" width="300" />
</p>

<h1 align="center">Redstone Forge</h1>

<p align="center">
  <img src="https://img.shields.io/badge/python-3.11+-blue.svg" />
  <img src="https://img.shields.io/badge/framework-FastAPI-009688.svg" />
  <img src="https://img.shields.io/badge/deployment-LAN%20Only-green.svg" />
  <img src="https://img.shields.io/badge/OS-Windows%20→%20Linux-lightgrey.svg" />
  <img src="https://img.shields.io/badge/stage-Stage%200%20(MVP%20Dev)-orange.svg" />
</p>

---

# Overview

Redstone Forge is a **LAN-first, self-hosted Minecraft server control panel** designed for family environments.

It provides a browser-based interface for managing:

- Minecraft server lifecycle
- Profiles (Forge, Fabric, Vanilla)
- Worlds
- Mod ingestion and validation
- Backups and guardrails

The system evolves through clearly defined development stages and is designed for long-term maintainability and OS portability.

---

# Design Philosophy

Redstone Forge is built around the following principles:

- **LAN-first security**
- **Single authoritative backend**
- **Guardrails before convenience**
- **Migration before orchestration**
- **Infrastructure stability before feature expansion**
- **No hardcoded environment assumptions**

## Architecture

See the full system architecture diagram and technical design:

➡️ [Architecture Documentation](docs/01-architecture.md)

---

# Security Posture

Default posture:

- LAN-only access
- No WAN exposure
- No reverse proxy
- No port forwarding
- Uploaded/downloaded files treated as untrusted input
- Strict server-side validation

Public internet exposure is explicitly out of scope unless the architecture is intentionally redesigned.

Full details:  
➡️ See [Architecture](#core-documents) and [Threat Model](#core-documents)

---

# Current Status

The project is currently in:

**Stage 0 – Development MVP**

For authoritative stage definitions and progression criteria:

➡️ See [Roadmap](#core-documents)

---

# Documentation

Redstone Forge maintains canonical documentation outside of this README.

## Core Documents

- 📐 [Architecture](docs/01-architecture.md)
- 🗺️ [Roadmap](docs/02-roadmap.md)
- 📘 [Decision Log](docs/decisions.md)
- 🔐 [Threat Model](docs/05-threat-model.md)
- 🌐 [Boundary Posture](docs/04-network-boundary.md)

These documents are the source of truth for:

- System invariants
- Security decisions
- Migration constraints
- Feature staging
- Deployment models

The README intentionally avoids duplicating staged feature details.

---

# Intended Environment

Primary use case:

- Private home LAN
- Two kid clients
- Single backend host
- Windows-first deployment
- Planned Linux NAS migration

This is not intended to be a public hosting platform or multi-tenant service.

---

# Development Workflow

- Issues map to branches
- `main` is protected
- Pull Requests required
- Squash at Epic completion
- No direct commits to `main`

Stage alignment is tracked via GitHub Milestones.

---

# Future Direction

Redstone Forge is designed to evolve without architectural rewrites.

Planned evolution includes:

- Linux-native deployment
- Backend-managed mod acquisition
- Optional desktop client
- Optional containerized deployment
- Multi-instance foundation (resource-controlled)

All expansion must preserve architectural invariants.

See:

➡️ [Roadmap](#core-documents)
➡️ [Decision Log](#core-documents)

---

# License

Private project (family LAN use).  
License may be formalized in the future.

---

# Closing

Redstone Forge is designed as a stable, secure foundation first —  
features grow only after invariants are protected.