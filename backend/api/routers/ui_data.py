from fastapi import APIRouter
import backend.services.servers_service as servers_service

router = APIRouter()

@router.get("/servers")
def ui_servers():
    return {"ok": True, "items": servers_service.list_servers()}