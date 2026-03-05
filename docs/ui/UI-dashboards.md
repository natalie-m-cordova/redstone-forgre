# Dashboard Layout

The dashboard is the primary interaction surface for starting/stopping servers.

It contains three main sections:

1. Last Played carousel
2. Loader grid
3. Servers cards

---

# Last Played Carousel

The top row displays recently used servers.

Up to **five entries** are shown.

Example:

```
◀ [Card] [Card] [Card] [Card] [Card] ▶
```

Each card shows:

- Server name
- Loader
- World name
- Start button

Example:

```
Survival Server
Forge 1.20.1
World: FoDWorld
Mods: 12 ⓘ

[ Start ] [Stop]
```

## Popups used on Dashboard
- Hover on server tile → **Server Popup**
- Hover on world name line → **World Popup**

Popup behavior is defined in [UI-components](UI-components).

---

# Loader Grid

Below the carousel the dashboard displays a loader grid.

Grid rules:
- Rows: Forge / Fabric / Vanilla
- Columns: Survival / Creative
- No visible header rows/columns (pattern-based UI)

Each cell shows a server tile:
- Server name
- World name (hover opens World Popup)
- Mods count (hover shows mods list tooltip)
- Start/Stop buttons (mock calls in Stage 0)

Example layout:

```
Forge
[ Survival ] [ Creative ]

Fabric
[ Survival ] [ Creative ]

Vanilla
[ Survival ] [ Creative ]
```

Each cell represents a **server card**.

Example card:

```
Forge Survival
World: FoDWorld
Mods: 12 ⓘ

[ Start ] [ Stop ]
```

If a server does not yet exist the card shows:

```
Forge Creative
World: FoDWorld

[ Create ]
```

---

# Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Redstone Forge + Mode Toggle                        │
├───────────────-─────────────────────────────────────────────┤
│ Sidebar     │ Dashboard                                     |
|             |                                               |
| [= Collapse]|                                               |
| 🏠Dashboard |   LAST PLAYED (carousel up to 5)              | 
│ 🎮Servers   │ ◀ [Card][Card][Card][Card][Card] ▶           │
│ 🌍Worlds    │                                               │
│ 🧩Mods      │ [ Forge Survival ] [ Forge Creative ]         │
│ <ADVANCED>  | [Fabric Survival ] [ Fabric Creative ]        │      
| 📃Terminal  │ [ Vanilla Survival ] [ Vanilla Creative ]     │  
│ 💾Backups   │                                               |
| 📊System    |                                               |
└───────────────┴─────────────────────────────────────────────┘
```

## Collapsed Sidebar
- Sidebar shrinks to icon rail
- Icons remain clickable
- Each icon has tooltip showing label
- A single button toggles expand/collapse

Example collapsed rail

```
┌─────┐
│[≡]  │
│🏠   │ (hover "Dashboard")
│🎮   │ (hover "Servers")
│🌍   │ (hover "Worlds")
│🧩   | (hover "Mods")
|<ADV>│
|📃   │ (hover "Terminal")
|💾   │ (hover "Backups")
|📊   │ (hover "System")
└─────┘
```
