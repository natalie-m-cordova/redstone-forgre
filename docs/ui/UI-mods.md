# Mods Library

Mods are stored in loader-specific libraries.

---

# Mod Library Entry Page

```
Forge Mods
Fabric Mods
```

Users select the loader before viewing the library.

---

# Forge Mod Library

Example:

```
JEI.jar
Create.jar
JourneyMap.jar
```

---

# Fabric Mod Library

Example:

```
Sodium.jar
Lithium.jar
Phosphor.jar
```

---

# Mod Selection

Servers select mods from the appropriate loader library.

Example:

Forge server → only Forge mods are visible.

---

# Mod Upload Flow

Uploads follow this pipeline:

Upload → Quarantine → Validation → Library

This prevents corrupted or malicious mods from entering the library.

┬───────────────────────────────────────────────┐
│ MODS                                          │
│                                               │
│  Choose Mod Library                           │
│                                               │
│   ┌───────────────────────────────┐           │
│   │ Forge Mods                    │           │
│   │ 42 mods                       │           │
│   │ [ View Library ] [ Upload ]   │           │
│   └───────────────────────────────┘           │
│                                               │
│   ┌───────────────────────────────┐           │
│   │ Fabric Mods                   │           │
│   │ 18 mods                       │           │
│   │ [ View Library ] [ Upload ]   │           │
│   └───────────────────────────────┘           │
│                                               │
┴───────────────────────────────────────────────┘


## FORGE MOD LIBRARY


┬───────────────────────────────────────────────┐
│ FORGE MOD LIBRARY                             │
│  Search: [______________]   [ Upload Mod ]    │
│                                               │
│  Mods (Validated Library)                     │
│  ┌─────────────────────────────────────────┐  │
│  │ JEI.jar                                 │  │
│  │ SHA: (hidden in Simple; view in Adv)    │  │
│  │ [ Details ]                             │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Create.jar                              │  │
│  │ [ Details ]                             │  │
│  └─────────────────────────────────────────┘  │
│                                               │
┴───────────────────────────────────────────────┘


## FABRIC MOD LIBRARY


┬───────────────────────────────────────────────┐
│ FABRIC MOD LIBRARY                            │
│  Search: [______________]   [ Upload Mod ]    │
│                                               │
│  Mods (Validated Library)                     │
│  ┌─────────────────────────────────────────┐  │
│  │ Sodium.jar                              │  │
│  │ [ Details ]                             │  │
│  └─────────────────────────────────────────┘  │
│                                               │
┴───────────────────────────────────────────────┘

# Mod Popup

Hovering any mod name opens the **Mod Popup**.

The popup provides mod metadata:

- mod name
- creator
- source URL
- thumbnail
- description
- servers using the mod

The popup uses the same behavior defined in `UI-components.md`:

- hover opens popup
- click pins popup
- dynamic placement near hovered element