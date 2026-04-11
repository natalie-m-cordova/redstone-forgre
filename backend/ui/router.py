from pathlib import Path
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

REPO_ROOT = Path(__file__).resolve().parents[2]
TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"

templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
router = APIRouter()

def _ctx(request: Request, page: str, title: str):
    return {
        "request": request,
        "page": page,
        "title": title,
        "app_name": "Redstone Forge",
    }

@router.get("/", response_class=HTMLResponse)
def dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", _ctx(request, "dashboard", "Dashboard"))

@router.get("/servers", response_class=HTMLResponse)
def servers(request: Request):
    return templates.TemplateResponse("servers.html", _ctx(request, "servers", "Servers"))

@router.get("/worlds", response_class=HTMLResponse)
def worlds(request: Request):
    return templates.TemplateResponse("worlds.html", _ctx(request, "worlds", "Worlds"))

@router.get("/mods", response_class=HTMLResponse)
def mods(request: Request):
    return templates.TemplateResponse("mods.html", _ctx(request, "mods", "Mods"))
