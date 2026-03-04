from fastapi import APIRouter, HTTPException
from backend.models.world import WorldCreate
from backend.services import worlds_service

router = APIRouter()

@router.get("")
def list_worlds():
    return {"ok": True, "items": worlds_service.list_worlds()}

@router.post("")
def create_world(payload: WorldCreate):
    created = worlds_service.create_world(payload)
    return {"ok": True, "item": created}

@router.get("/{world_id}")
def get_world(world_id: str):
    item = worlds_service.get_world(world_id)
    if not item:
        raise HTTPException(status_code=404, detail="World not found")
    return {"ok": True, "item": item}

@router.put("/{world_id}")
def update_world(world_id: str, payload: WorldCreate):
    item = worlds_service.update_world(world_id, payload)
    if not item:
        raise HTTPException(status_code=404, detail="World not found")
    return {"ok": True, "item": item}

@router.delete("/{world_id}")
def delete_world(world_id: str):
    worlds_service.delete_world(world_id)
    return {"ok": True}
