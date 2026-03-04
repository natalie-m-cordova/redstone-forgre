# Deployment

This section documents how to deploy Redstone Forge in different environments.

Redstone Forge supports multiple deployment models depending on the host operating system and whether the machine is acting as a **server** or a **controller**.

---

# Deployment Types

## Linux Server

Recommended for long-term hosting.

Runs:

- Redstone Forge API
- Minecraft Server
- Profiles and Worlds storage
- Automated backups

See:

→ [deployment-linux-server.md](deployment-linux-server.md)

---

## Windows Server

Used for early development or temporary hosting.

Runs:

- Redstone Forge API
- Minecraft Server
- Profiles and Worlds storage

See:

→ [deployment-windows-server.md](deployment-windows-server.md)

---

## Windows Controller

Optional control machine used to manage the server.

Runs:

- Redstone Forge UI / Controller
- API client tools
- Profile management

Does NOT host Minecraft itself.

See:

→ [deployment-windows-controller.md](deployment-windows-controller.md)

---

# Recommended Architecture

Production deployment:

```
Controller PC (Windows)
│
│ REST API
▼
Linux Server
│
├─ Redstone Forge API
├─ Minecraft Server
├─ Profiles
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

Planned improvements to deployment include:

- Automated installers
- Docker support
- Remote management
- Backup scheduling
- System monitoring