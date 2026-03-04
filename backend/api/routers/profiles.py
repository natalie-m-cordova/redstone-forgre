from fastapi import APIRouter, HTTPException
from backend.models.profile import ProfileCreate
from backend.services import profiles_service

router = APIRouter()

@router.get("")
def list_profiles():
    return {"ok": True, "items": profiles_service.list_profiles()}

@router.post("")
def create_profile(payload: ProfileCreate):
    created = profiles_service.create_profile(payload)
    return {"ok": True, "item": created}

@router.get("/{profile_id}")
def get_profile(profile_id: str):
    item = profiles_service.get_profile(profile_id)
    if not item:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"ok": True, "item": item}

@router.put("/{profile_id}")
def update_profile(profile_id: str, payload: ProfileCreate):
    item = profiles_service.update_profile(profile_id, payload)
    if not item:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"ok": True, "item": item}

@router.delete("/{profile_id}")
def delete_profile(profile_id: str):
    profiles_service.delete_profile(profile_id)
    return {"ok": True}
