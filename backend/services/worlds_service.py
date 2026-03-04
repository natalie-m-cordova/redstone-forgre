from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional, Dict
import uuid

from backend.models.world import World, WorldCreate
from backend.storage.json_store import read_json, write_json, DATA_ROOT

WORLDS_DIR = DATA_ROOT / "worlds"
INDEX_PATH = DATA_ROOT / "index" / "worlds.json"

def _now():
    return datetime.now(timezone.utc)

def _world_path(world_id: str) -> Path:
    return WORLDS_DIR / f"{world_id}.json"

def list_worlds() -> List[Dict]:
    index = read_json(INDEX_PATH, default={"items": []})
    return index.get("items", [])

def get_world(world_id: str) -> Optional[Dict]:
    path = _world_path(world_id)
    if not path.exists():
        return None
    return read_json(path, default=None)

def create_world(payload: WorldCreate) -> Dict:
    world_id = str(uuid.uuid4())
    now = _now()
    world = World(
        id=world_id,
        createdAt=now,
        updatedAt=now,
        **payload.model_dump()
    )
    write_json(_world_path(world_id), world.model_dump())

    index = read_json(INDEX_PATH, default={"items": []})
    items = index.get("items", [])
    items.append({"id": world_id, "name": world.name})
    index["items"] = items
    write_json(INDEX_PATH, index)
    return world.model_dump()

def update_world(world_id: str, payload: WorldCreate) -> Optional[Dict]:
    existing = get_world(world_id)
    if not existing:
        return None
    now = _now()
    updated = {
        **existing,
        **payload.model_dump(),
        "id": world_id,
        "updatedAt": now.isoformat()
    }
    write_json(_world_path(world_id), updated)

    index = read_json(INDEX_PATH, default={"items": []})
    for item in index.get("items", []):
        if item.get("id") == world_id:
            item["name"] = updated.get("name")
    write_json(INDEX_PATH, index)

    return updated

def delete_world(world_id: str) -> bool:
    path = _world_path(world_id)
    if path.exists():
        path.unlink()

    index = read_json(INDEX_PATH, default={"items": []})
    index["items"] = [i for i in index.get("items", []) if i.get("id") != world_id]
    write_json(INDEX_PATH, index)

    return True
