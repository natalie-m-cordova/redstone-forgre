# UI Components

This document defines reusable UI components.

---

# UI Popovers

## Server Popup

### Purpose
Answers: **“What is this server configured to run?”**

### Trigger
Hover on server tile/card.
Hover on server list row
- Optional click to “pin” the popup (not default).

### Contents
- Server name (e.g., Forge Survival)
- Loader + version (Forge / Fabric / Vanilla)
- World name
- World thumbnail image
- Mods summary (count + (scrollable past 5) list preview)
- Quick actions 
  - “Open Server” / “Manage” (future)

### Wireframe (Server Popup)

┌────────────────────────────────────┐  
│ Server: Forge Survival             │  
│ Loader: Forge 1.20.1               │  
│ World: FoDWorld                    │  
│                                    │  
│ [ World Thumbnail ]                │  
│                                    │
│ Mods: 12 (hover for list)          |  
│ [Open Server] | [Manage]           |  
└────────────────────────────────────┘  

## World Preview Popup
### Purpose
Answers: **“Where is this world used?”**

### Trigger
Hover (primary) on the **World name** line anywhere it appears:
- Dashboard grid tiles
- Last Played carousel cards
- Worlds list rows

Optional click to “pin” the popup (not default).

### Contents
- World name
- World thumbnail image
- Metadata (as available; can be placeholders in MVP)
  - Last played
  - Size
- “Used by servers:” list
  - Forge Survival
  - Forge Creative
  - etc.

### Wireframe (World Popup)

┌────────────────────────────────────┐    
│ World: FoDWorld                    │    
│                                    │  
│ [ World Thumbnail ]                │  
│                                    │  
│ Last Played: YYYY-MM-DD (optional) │  
│ Size: --- (optional)               │  
│                                    │  
│ Used by Servers:                   │  
│ - Forge Survival                   │  
│ - Forge Creative                   │
└────────────────────────────────────┘  

Used in:

- Worlds list
- Dashboard cards
- Last Played carousel

Behavior:

- Appears on hover
- Appears beside hovered element
- Dynamically repositions to remain visible

Hover is the primary interaction.

Clicking the world name pins the popup.

## Mod Popup
### Purpose
Answers: **“What is this mod, and where is it used?”**

### Trigger
Hover (primary) on a mod name anywhere it appears:
- Mod Libraries (Forge/Fabric)
- Server editor mod checklist
- Any server summary view that lists mods
- Any future “mods on server” display

Optional click to “pin” the popup (not default).

### Contents
- Mod name
- Mod creator (author)
- Mod URL (source page)
- Mod thumbnail (icon/image)
- Short description (1–2 lines)
- Used by Servers list (servers using this mod)

### Wireframe (Mod Popup)

┌──────────────────────────────────────────┐
│ Mod: Just Enough Items (JEI)             │
│ By: mezz                                 │
│                                          │
│ [ Mod Thumbnail ]                        │
│                                          │
│ Description: Adds item and recipe lookup │
│                                          │
│ URL: https://…                           │
│                                          │
│ Used by Servers:                         │
│ - Forge Survival                         │
│ - Forge Creative                         │
└──────────────────────────────────────────┘

## Interaction Rules (Hover + Dynamic Placement)

### Default behavior
- Hover opens popup.
- Click pins popup (optional; not default).
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