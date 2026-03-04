from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse

from backend.api.routers import system, profiles, worlds

# backend/main.py -> backend/ -> repo root
REPO_ROOT = Path(__file__).resolve().parents[1]
FAVICON_PATH = REPO_ROOT / "assets" / "branding" / "redstone-forge.ico"

app = FastAPI(title="Redstone Forge API", version="0.0.1")


@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    if not FAVICON_PATH.exists():
        raise HTTPException(status_code=404, detail="favicon not found")
    return FileResponse(FAVICON_PATH)


app.include_router(system.router)
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(worlds.router, prefix="/worlds", tags=["worlds"])