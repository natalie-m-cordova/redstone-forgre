from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional, Dict
import uuid

from backend.models.server import Server, ServerCreate
from backend.storage.json_store import read_json, write_json, DATA_ROOT

SERVERS_DIR = DATA_ROOT / "servers"
INDEX_PATH = DATA_ROOT / "index" / "servers.json"

def _now():
    return datetime.now(timezone.utc)

def _server_path(server_id: str) -> Path:
    return SERVERS_DIR / f"{server_id}.json"

def list_servers() -> List[Dict]:
    # Return full server objects (MVP scale: small list)
    index = read_json(INDEX_PATH, default={"items": []})
    items = index.get("items", [])
    results: List[Dict] = []
    for item in items:
        sid = item.get("id")
        if not sid:
            continue
        path = _server_path(sid)
        if path.exists():
            results.append(read_json(path, default={}))
    return results

def get_server(server_id: str) -> Optional[Dict]:
    path = _server_path(server_id)
    if not path.exists():
        return None
    return read_json(path, default=None)

def create_server(payload: ServerCreate) -> Dict:
    server_id = str(uuid.uuid4())
    now = _now()
    server = Server(
        id=server_id,
        createdAt=now,
        updatedAt=now,
        **payload.model_dump()
    )

    write_json(_server_path(server_id), server.model_dump())

    index = read_json(INDEX_PATH, default={"items": []})
    items = index.get("items", [])
    items.append({"id": server_id})
    index["items"] = items
    write_json(INDEX_PATH, index)

    return server.model_dump()

def update_server(server_id: str, payload: ServerCreate) -> Optional[Dict]:
    existing = get_server(server_id)
    if not existing:
        return None
    now = _now()
    updated = {
        **existing,
        **payload.model_dump(),
        "id": server_id,
        "updatedAt": now.isoformat()
    }
    write_json(_server_path(server_id), updated)
    return updated

def delete_server(server_id: str) -> bool:
    path = _server_path(server_id)
    if path.exists():
        path.unlink()

    index = read_json(INDEX_PATH, default={"items": []})
    index["items"] = [i for i in index.get("items", []) if i.get("id") != server_id]
    write_json(INDEX_PATH, index)
    return True
