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

@router.get("/terminal", response_class=HTMLResponse)
def terminal(request: Request):
    return templates.TemplateResponse("terminal.html", _ctx(request, "terminal", "Terminal"))

@router.get("/backups", response_class=HTMLResponse)
def backups(request: Request):
    return templates.TemplateResponse("backups.html", _ctx(request, "backups", "Backups"))

@router.get("/system", response_class=HTMLResponse)
def system(request: Request):
    return templates.TemplateResponse("system.html", _ctx(request, "system", "System"))