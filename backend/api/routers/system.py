from fastapi import APIRouter

router = APIRouter()

# Mock in-memory server state (replaced later by real process manager)
_SERVER_STATE = {
    "state": "STOPPED",
    "activeProfileId": None,
    "activeWorldId": None
}

@router.get("/status")
def get_status():
    return {"ok": True, **_SERVER_STATE}

@router.post("/start")
def start_server():
    _SERVER_STATE["state"] = "RUNNING"
    return {"ok": True, "message": "Mock server started", **_SERVER_STATE}

@router.post("/stop")
def stop_server():
    _SERVER_STATE["state"] = "STOPPED"
    return {"ok": True, "message": "Mock server stopped", **_SERVER_STATE}
