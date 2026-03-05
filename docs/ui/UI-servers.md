# Servers

Servers represent server launch configurations.

Each loader has two server slots:

- Survival
- Creative

Example:

Forge Survival
Forge Creative
Fabric Survival
Fabric Creative
Vanilla Survival
Vanilla Creative

---

# Server Properties

Servers contain:

- Loader
- Minecraft version
- Selected world
- Selected mod set
- Gamemode configuration

---

# Server Editor

The server editor allows selection of:

- world
- mods
- loader version

Example:

```
Server: Forge Survival

World
[ FoDWorld ▼ ]

Mods
[x] JEI
[x] Create
[ ] JourneyMap

[ Save ]
```

---

# Default Worlds (shared across Survival/Creative per loader)
- Forge default: `FoDWorld`
- Fabric default: `FaDWorld`
- Vanilla default: `VaDWorld`

Survival/Creative are server settings; worlds are not inherently survival/creative.

Gamemode differences are handled by server configuration.

## Servers (List + Create)
┬───────────────────────────────────────────────┐
│ Servers                                       |
│                                               │
│  [ + Create Server ]                          │
│                                               │
│  Server List                                  │
│  ┌─────────────────────────────────────────┐  │
│  │ Survival Server                         │  │
│  │ Loader: Forge 1.20.1                    │  │
│  │ World: survival_world                   │  │
│  │ Mods: 12                                │  │
│  │                                         |  │
│  │ [ Edit ] [ Duplicate ] [ Delete ⚠ ]     │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Creative Server                         │  │
│  │ Loader: Fabric 1.20.1                   │  │
│  │ World: creative_world                   │  │
│  │ Mods: 4                                 │  │
│  │                                         │  │
│  │ [ Edit ] [ Duplicate ] [ Delete ⚠ ]     │  │
│  └─────────────────────────────────────────┘  │
│                                               │
┴───────────────────────────────────────────────┘

## Server EDITOR (Create/Edit)

┬───────────────────────────────────────────────┐
│ Server EDITOR                                 │
│  Server Name: [ Survival Server ______ ]     │
│                                               │
│  Loader                                       │
│   [ Forge ▼ ]  [ Version ▼ ]                  │
│                                               │
│  World                                        │
│   [ survival_world ▼ ]   (Browse Worlds)      │
│                                               │
│  Mods (auto-filtered by loader)               │
│   Search: [______________]                    │
│   ┌───────────────────────────────────────┐   │
│   │ [✔] JEI                               │   │
│   │ [✔] Create                            │   │
│   │ [ ] Sodium                            │   │
│   │ [ ] JourneyMap                        │   │
│   │ ...                                   │   │
│   └───────────────────────────────────────┘   │
│                                               │
│  Guardrails (Simple Mode limited)             │
│   - Prevent edit while server RUNNING         │
│                                               │
│  [ Save ]   [ Cancel ]                        │
┴───────────────────────────────────────────────┘

