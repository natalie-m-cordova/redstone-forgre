# Servers and Worlds Design

 Servers and Worlds Design

This document defines how servers and worlds are structured and managed.

---

# 1. Definitions

## Loader
One of:
- forge
- fabric
- vanilla

Forge and Fabric cannot mix.

---

## Server

A server defines:

- Name
- Loader type
- Minecraft version
- Loader version
- Selected mods (multi-select)
- Assigned world
- Memory allocation

Servers are configuration containers.

Each server may have:
- Its own dedicated world
- Or an assigned shared world (advanced usage)

---

## World

A world:
- Is stored in its own folder
- Can be assigned to a server
- Can be created, cloned, or archived (future)
- Is backed up automatically when mod configuration changes

Switching mods on an existing world may corrupt it.
Backups are mandatory before launch if configuration changes.

---

# 2. Guardrails

- Forge and Fabric separation enforced
- Servers pinned to Minecraft version
- Mod selection stored in server configuration
- Configuration change triggers backup
- Default: server uses its own world

---

# 3. Storage (MVP)

Servers and worlds will initially be stored as JSON files on disk.

No database will be used in MVP.

---

# COMING SOON

## Server Structure
- JSON schema definition
- Loader configuration
- Mod selection storage
- Memory settings
- World association

## World Structure
- Folder structure
- Naming conventions
- Metadata storage
- Backup handling

## Mod Guardrails
- Loader separation (Forge vs Fabric)
- Version compatibility boundaries
- Backup triggers when configuration changes

## Future Enhancements
- Server export/import
- World cloning
- Mod dependency validation