# UI Components

This document defines reusable UI components.

---

# UI Popovers

Popovers provide lightweight, contextual inspection of entities (Servers, Worlds, Mods) without leaving the current view.

They are designed for:
- Fast hover-based inspection
- Optional persistence (pinning)
- Safe, intentional navigation
- Limited contextual exploration (no deep nesting)

## Core Interaction Model
### Interaction Types

| Interaction      | Behavior              |
|:-----------------|:---------------------:|
| Hover            | Opens Popup           |
| Click (trigger)  | Pins Popup (persists) |
| Click Outside    | Closes pinned popup   |
| Arrow Button (↗) | Navigation            |

## Popup Nesting
### Constraint
Popups are limited to **one level of nesting (depth = 1)***:
- Primary popup -> may open a secondary popup
- Secondary popup -> cannot open additional popups

### Secondary Popup Rules
- Hover-only (no pinning)
- No recursive triggers
- No navigation arrows
- Must not contain further interactive popup elements

## Server Popup
### Purpose
Answers: **“What is this server configured to run?”**

### Trigger
- Hover on **server name.**
- Click to pin popup.

### Contents
- Server name (e.g., Forge Survival)
- Loader + version (Forge / Fabric / Vanilla)
- World name
- World thumbnail image
- Mods summary (count + (scrollable past 5) list preview)
- Quick actions 
  - “Open Server” | “Manage”

### Interactive Elements
| Element     | Behavior             |
|:------------|:--------------------:|
| World name  | Hover -> World Popup |
| Arrow (↗)	  | Navigate to world    |
| Title arrow	| Navigate to server   |

### Wireframe (Server Popup)
```
┌────────────────────────────────────┐  
│ Server: Forge Survival          ↗  │  
│ Loader: Forge 1.20.1               │  
│ World: FoDWorld  ↗                 │  
│                                    │  
│ [ World Thumbnail ]                │  
│                                    │
│ Mods: 12 ↗                         |  
│ [Open Server] | [Manage]           |  
└────────────────────────────────────┘  
```

## World Preview Popup
### Purpose
Answers: **“Where is this world used?”**

### Trigger
- Hover on **World name**
- Click to pin

### Contents
- World name
- World thumbnail
- Metadata (as available)
  - Last played
  - Size
- “Used by servers:” list

### Interactive Elements
| Element     | Behavior               |
|:------------|:----------------------:|
| Server name  | Hover -> Server Popup |
| Arrow (↗)	  | Navigate to Server     |
| Title arrow	| Navigate to World      |

### Wireframe (World Popup)
```
┌────────────────────────────────────┐    
│ World: FoDWorld                  ↗ │    
│                                    │  
│ [ World Thumbnail ]                │  
│                                    │  
│ Last Played: YYYY-MM-DD            │  
│ Size: ---                          │  
│                                    │  
│ Used by Servers:                   │  
│ - Forge Survival ↗                 │  
│ - Forge Creative ↗                 │
└────────────────────────────────────┘  
```

## Mod Popup
### Purpose
Answers: **“What is this mod, and where is it used?”**

### Trigger
- Hover on **Mod name**
- Click to pin

### Contents
- Mod name
- Mod creator (author)
- Mod URL (source page)
- Mod thumbnail (icon/image)
- Short description (1–2 lines)
- Used by Servers list (servers using this mod)

### Wireframe (Mod Popup)
```
┌──────────────────────────────────────────┐
│ Mod: Just Enough Items (JEI)           ↗ │
│ By: mezz                                 │
│                                          │
│ [ Mod Thumbnail ]                        │
│                                          │
│ Description: Adds item and recipe lookup │
│                                          │
│ URL: https://…  ↗                        │
│                                          │
│ Used by Servers:                         │
│ - Forge Survival ↗                       │
│ - Forge Creative ↗                       │
└──────────────────────────────────────────┘
```

## Interaction Rules (Hover + Dynamic Placement)

### Default behavior
- Hover opens popup.
- Click pins popup.
- Double-Click opens world/server to see the properties or manage it.
- Popup appears offset so the hovered tile remains readable.

### Dynamic placement
The popup repositions automatically to remain visible:
- Prefer right side of hovered element
- If near right edge → flip to left
- If near bottom edge → shift upward

### Dismissal
- Hover out closes popup (unless pinned)
- Click outside closes pinned popup

---

# Last Played Carousel

The dashboard includes a horizontal carousel.

Characteristics:

- Maximum of five items
- Scrollable left and right
- Displays recently started servers

Example:

```
◀ Card | Card | Card | Card | Card ▶
```

---

# Server Cards

Used in:

- Dashboard grid
- Carousel

Card contents:

- server name
- loader
- world name
- mod count
- start / stop buttons

Example:

```
Forge Survival
World: FoDWorld
Mods: 12

[ Start ]
```

---

# Sidebar Navigation

Sidebar supports two states:

Expanded:

```
Dashboard
Server
Worlds
Mods
```

Collapsed:

```
🏠
👤
🌍
🧩
```

Hovering icons displays navigation labels.