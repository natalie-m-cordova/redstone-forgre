from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.api.routers import system, servers, worlds
from backend.ui.router import router as ui_router

# backend/main.py -> backend/ -> repo root
REPO_ROOT = Path(__file__).resolve().parents[1]
FAVICON_PATH = REPO_ROOT / "assets" / "branding" / "redstone-forge.ico"
ASSETS_DIR = REPO_ROOT / "assets"
STATIC_DIR = Path(__file__).resolve().parent / "ui" / "static"

app = FastAPI(title="Redstone Forge API", version="0.0.1")

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    if not FAVICON_PATH.exists():
        raise HTTPException(status_code=404, detail="favicon not found")
    return FileResponse(FAVICON_PATH)

# UI + static mounts
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

# UI routes
app.include_router(ui_router)

# API routes
app.include_router(system.router)
app.include_router(servers.router, prefix="/servers", tags=["servers"])
app.include_router(worlds.router, prefix="/worlds", tags=["worlds"])
