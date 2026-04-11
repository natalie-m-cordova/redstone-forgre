# Network Boundary

This document defines the network exposure and security boundaries of Redstone Forge.

Redstone Forge is designed as a **LAN-first system** and is **not intended for public internet exposure**.

---

# 1. Inbound Network Scope

- No router port forwarding
- No public internet exposure
- Backend bound to private network interface only
- Accessible only within home LAN
- No reverse proxy
- No cloud deployment

Inbound access from the public internet is not supported in any stage unless explicitly redesigned.

---

# 2. Outbound Network Scope

- Outbound internet access is permitted
- Stage 0 / Stage 1:
  - Mods are downloaded on client machines
  - Uploaded to backend via LAN Web UI
- Stage 3+:
  - Backend may download mods from curated / allowlisted sources

Outbound connectivity does **not** imply inbound exposure.

---

# 3. Backend Host Network Controls (Linux NAS)

- Firewall (UFW or firewalld) restricted to LAN subnet only
- Backend service bound to private interface (e.g., 192.168.x.x)
- No services exposed on public interfaces
- Only required ports open:
  - Web UI / API
  - Minecraft server port (LAN only)

---

# 4. Client Access Model

- Kid PCs access backend via browser over LAN
- Minecraft clients connect directly to server via LAN IP
- No direct filesystem access to backend
- All control flows through backend API

---

# 5. Security Invariants

The following must always remain true:

- System is LAN-only unless explicitly redesigned
- No inbound public access
- No external DNS or public routing required
- Backend is the single entry point for control operations
- Uploaded files are treated as untrusted input
- Network exposure must remain minimal and intentional

---

# 6. Non-Goals

Redstone Forge will NOT:

- Be publicly hosted
- Support cloud exposure
- Provide public authentication or internet-facing access
- Act as a multi-tenant service
- Function as a hosted Minecraft provider

---

# Summary

Redstone Forge operates entirely within a **trusted LAN boundary**.

All external interaction is **outbound-only**, and all inbound control is restricted to local network clients.

This model prioritizes:

- Security by default
- Simplicity of deployment
- Protection against unintended exposure