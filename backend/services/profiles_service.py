from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional, Dict
import uuid

from backend.models.profile import Profile, ProfileCreate
from backend.storage.json_store import read_json, write_json, DATA_ROOT

PROFILES_DIR = DATA_ROOT / "profiles"
INDEX_PATH = DATA_ROOT / "index" / "profiles.json"

def _now():
    return datetime.now(timezone.utc)

def _profile_path(profile_id: str) -> Path:
    return PROFILES_DIR / f"{profile_id}.json"

def list_profiles() -> List[Dict]:
    index = read_json(INDEX_PATH, default={"items": []})
    return index.get("items", [])

def get_profile(profile_id: str) -> Optional[Dict]:
    path = _profile_path(profile_id)
    if not path.exists():
        return None
    return read_json(path, default=None)

def create_profile(payload: ProfileCreate) -> Dict:
    profile_id = str(uuid.uuid4())
    now = _now()
    profile = Profile(
        id=profile_id,
        createdAt=now,
        updatedAt=now,
        **payload.model_dump()
    )
    write_json(_profile_path(profile_id), profile.model_dump())

    index = read_json(INDEX_PATH, default={"items": []})
    items = index.get("items", [])
    items.append({"id": profile_id, "name": profile.name, "loader": profile.loader})
    index["items"] = items
    write_json(INDEX_PATH, index)
    return profile.model_dump()

def update_profile(profile_id: str, payload: ProfileCreate) -> Optional[Dict]:
    existing = get_profile(profile_id)
    if not existing:
        return None
    now = _now()
    updated = {
        **existing,
        **payload.model_dump(),
        "id": profile_id,
        "updatedAt": now.isoformat()
    }
    write_json(_profile_path(profile_id), updated)

    index = read_json(INDEX_PATH, default={"items": []})
    for item in index.get("items", []):
        if item.get("id") == profile_id:
            item["name"] = updated.get("name")
            item["loader"] = updated.get("loader")
    write_json(INDEX_PATH, index)

    return updated

def delete_profile(profile_id: str) -> bool:
    path = _profile_path(profile_id)
    if path.exists():
        path.unlink()

    index = read_json(INDEX_PATH, default={"items": []})
    index["items"] = [i for i in index.get("items", []) if i.get("id") != profile_id]
    write_json(INDEX_PATH, index)

    return True
