# 1. Inbound Network Scope

- No router port forwarding
- No public internet exposure
- Backend bound to private network interface only
- Accessible only within home network
- No reverse proxy
- No cloud deployment

Inbound access from the public internet is not supported in any stage unless explicitly redesigned.

---

# 2. Outbound Network Scope

- Outbound internet access is permitted.
- MVP: Mods are downloaded on client machines and uploaded via LAN Web UI.
- v2+: Backend may download mods outbound from curated/allowlisted sources.
- Outbound connectivity does not imply inbound exposure.

---

# 3. Windows Phase Security

- Windows Firewall configured for Private network only
- No inbound public exposure
- Minecraft server accessible only via LAN IP

---

# 4. Linux Phase Security

- firewalld or UFW limited to LAN subnet
- Service not bound to public interface
- No public listening ports

---

# 5. Non-Goals

This system will NOT:

- Be publicly hosted
- Support cloud exposure
- Provide public authentication mechanisms
- Act as a multi-tenant service
- Function as a hosted Minecraft provider