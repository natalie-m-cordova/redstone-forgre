# Deployment Overview

This section documents how to deploy Redstone Forge in different environments.

Redstone Forge supports multiple deployment models depending on the host operating system and whether the machine is acting as a **server** or a **controller**.

---

# Deployment Types

## Linux Server

Recommended for long-term hosting.

Runs:

- Redstone Forge API
- Minecraft Server
- Servers and Worlds storage
- Automated backups

See:

→ [deployment-linux-server.md](deployment-linux-server.md)

---

## Local Development (Windows)

Used for early development or testing only.

Runs:

- Redstone Forge API (local)
- Mock or test Minecraft server
- UI and backend development

See:

→ [deployment-local-windows-server.md](deployment-local-windows-server.md)

---

## Windows Controller

Client machine used to manage the server.

Runs:

- Web browser (control panel)
- Optional API client tools
- Minecraft client

Does NOT host the backend or Minecraft server.

See:

→ [deployment-windows-controller.md](deployment-windows-controller.md)

---

# Recommended Architecture

Production deployment:

```
Windows Controller (Client)
│
│ HTTP (LAN)
▼
Linux Server (Backend)
│
├─ Redstone Forge API
├─ Minecraft Server
├─ Servers
├─ Worlds
└─ Backups
```

---

# Security Model

Redstone Forge is designed for **LAN-only environments**.

Recommended configuration:

- Private LAN network
- No public internet exposure
- Host firewall enabled
- Standard OS security practices

Redstone Forge **does not replace host security protections** such as antivirus or OS patching.

---

# Future Improvements

Planned improvements aligned with later stages include:

- Stage 2 (Stabilization):
  - Backup scheduling
  - System monitoring
  - Improved reliability tooling

- Stage 3+ (Enhancements):
  - Automated installers
  - Docker support (optional)
  - Remote management features