# World Library

Worlds are managed as a global library and can be attached to servers.

---

# World List

Worlds are displayed in a **list view** rather than cards, with hoverable information.

Example:

```
FoDWorld
FaDWorld
VaDWorld
survival_world
creative_world
```

Hovering a world name opens a preview popup.

---

# World Preview Popup

The popup appears beside the hovered element.

The position shifts dynamically to remain visible on screen.

Example:

```
┌──────────────────────────────────┐
│ World: FoDWorld │
│ │
│ [ world thumbnail ] │
│ │
│ Last Played: 2026-03-04 │
│ Servers using world: │
│ - Forge Survival │
│ - Forge Creative │
└──────────────────────────────────┘
```

---

# World Thumbnail

World preview thumbnails are included in MVP.

Mock thumbnail path:

```
assets/mock-worlds/survival_world.png
```

Recommended source image:

```
512 x 288
PNG
16:9 aspect ratio
```

Display sizes:

| Location | Size |
|--------|------|
List row thumbnail | 64x36 |
World popup preview | 256x144 |

## Worlds List Wireframe

```
WORLDS

Search: [______________] [ Upload World ]

WORLD LIST (rows)
[thumb] FoDWorld
[thumb] FaDWorld
[thumb] VaDWorld
[thumb] Talon
[thumb] Asher
[thumb] OurWorld
[thumb] FNAFWorld
[thumb] TestWorld
```

Hover on any world row opens the **World Popup** (see [UI-components.md](UI-components.md).

---

## World Popup Use
World Popup answers:
- “Used by Servers”
- Includes thumbnail
- Shows world metadata placeholders (size/last played)

(Defined centrally in [UI-components.md](UI-components.md))

---

# World Usage

Worlds are shared between servers.

Example:

FoDWorld is used by:

- Forge Survival
- Forge Creative

Gamemode is controlled by server configuration.