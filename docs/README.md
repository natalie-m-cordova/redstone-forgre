# Documentation

This directory contains official documentation for the Minecraft Control Panel.

These documents are organized by responsibility and audience.

Use this page as the entry point for all system documentation

---

## System & Architecture (Admin)

These documents describe how the system is designed and deployed.

- [Architecture](01-architecture.md)
- [Stages](02-roadmap.md)
- [Servers and Worlds Design](03-servers-worlds.md)
- [Boundary Posture](04-network-boundary.md)
- [Threat Model](05-threat-model.md)
- [Project Structure](project-structure.md)

---

## Deployment 

These documents describe how to deploy and run the system.

- [Deployment Overview](deployment.md)
- [Deployment – Windows Client](deployment-windows-controller.md)
- [Deployment – Linux Server](deployment-linux-server.md)
- [Deployment – Windows Development](deployment-local-windows-server.md)

---

## Troubleshooting

These documents help diagnose and resolve issues.

- [Troubleshooting - Client](troubleshooting-controllers.md)
- [Troubleshooting - Server](troubleshooting-servers.md)

---

## User Guide

These documents explain how to use the control panel once deployed.

- [User Guide](user-guide.md)

---

## Documentation Philosophy

- Root `README.md` = project overview
- `docs/` = detailed documentation
- `planning/` = internal notes and decisions

User documentation and administrative documentation are intentionally separated.

Deployment instructions are written for system administration (not end users).