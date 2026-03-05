# UI Architecture

This document defines the visual structure and interaction model for the Redstone Forge Web UI.

The UI is designed with the following principles:

- Kid-friendly by default (Simple Mode)
- Advanced capabilities available via toggle
- Clean dashboard-driven interaction
- Server configuration driven by **servers**
- Worlds managed as a **global library**
- Mods managed as **loader-specific libraries**

The backend remains authoritative for server lifecycle and validation.

---

# Layout Overview

The UI uses a standard application layout:

```
HEADER
SIDEBAR | MAIN CONTENT
```

---

# Header

Header contains:

- Redstone Forge title/logo
- Simple / Advanced toggle

Example:

```
Redstone Forge | Mode: Simple ▢ Advanced
```

Advanced mode exposes additional UI features but does not change backend permissions.

---

# Sidebar

The sidebar provides navigation.

Expanded mode:

```
Dashboard
Servers
Worlds
Mods
```

Advanced mode adds:

```
Console
Backups
System
```

Sidebar supports **partial collapse**.

Collapsed sidebar shows icons only:

```
🏠
👤
🌍
🧩
```

Hovering icons reveals navigation labels.

---

# UI Mode Model

Two interface modes exist:

## Simple Mode

Default.

Focuses on:

- Dashboard
- Servers
- Worlds
- Mods

No access to:

- Console
- Backup management
- System diagnostics

---

## Advanced Mode

Enabled via header toggle.

Adds access to:

- Live console
- Backup management
- System monitoring

---

# Server Model

Servers represent server definitions.

Each loader has two server slots:

- Survival
- Creative

Example Servers:

```
Forge Survival
Forge Creative
Fabric Survival
Fabric Creative
Vanilla Survival
Vanilla Creative
```

Servers contain:

- Loader type
- Selected world
- Selected mod list
- Gamemode configuration

Worlds are not tied to gamemode.

---

# Default Worlds

Each loader has a default world.

Naming convention:

```
FoDWorld (Forge default)
FaDWorld (Fabric default)
VaDWorld (Vanilla default)
```

The same world can be used by both survival and creative servers.

Gamemode is determined by the servers configuration.