# Security Model (LAN Only)

The Minecraft Control Panel is intentionally LAN-only.

---

# 1. Network Scope

- No router port forwarding
- No public internet exposure
- Bound to private network interface
- Accessible only within home network

---

# 2. Windows Phase Security

- Windows Firewall configured for Private network only
- No inbound public exposure
- Minecraft server accessible only via LAN IP

---

# 3. Linux Phase Security

- firewalld or UFW limited to LAN subnet
- Service not bound to public interface

---

# 4. Non-Goals

This system will NOT:
- Be publicly hosted
- Support cloud exposure
- Provide public authentication mechanisms
- Act as a multi-tenant service