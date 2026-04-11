from fastapi import APIRouter, HTTPException
from backend.models.server import ServerCreate
from backend.services import servers_service

router = APIRouter()

@router.get("")
def list_servers():
    return {"ok": True, "items": servers_service.list_servers()}

@router.post("")
def create_server(payload: ServerCreate):
    created = servers_service.create_server(payload)
    return {"ok": True, "item": created}

@router.get("/{server_id}")
def get_server(server_id: str):
    item = servers_service.get_server(server_id)
    if not item:
        raise HTTPException(status_code=404, detail="Server not found")
    return {"ok": True, "item": item}

@router.put("/{server_id}")
def update_server(server_id: str, payload: ServerCreate):
    item = servers_service.update_server(server_id, payload)
    if not item:
        raise HTTPException(status_code=404, detail="Server not found")
    return {"ok": True, "item": item}

@router.delete("/{server_id}")
def delete_server(server_id: str):
    servers_service.delete_server(server_id)
    return {"ok": True}
