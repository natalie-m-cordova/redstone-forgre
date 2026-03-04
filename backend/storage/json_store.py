import json
from pathlib import Path
from typing import Any

DATA_ROOT = Path("data")

def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)

def read_json(path: Path, default: Any):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))

def write_json(path: Path, payload: Any) -> None:
    _ensure_dir(path.parent)
    path.write_text(json.dumps(payload, indent=2, default=str), encoding="utf-8")
