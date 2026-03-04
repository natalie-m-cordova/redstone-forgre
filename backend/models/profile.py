from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

LoaderType = Literal["vanilla", "forge", "fabric"]

class ProfileCreate(BaseModel):
    name: str = Field(min_length=1, max_length=64)
    loader: LoaderType
    minecraftVersion: str = Field(min_length=1, max_length=32)
    loaderVersion: Optional[str] = Field(default=None, max_length=32)

class Profile(ProfileCreate):
    id: str
    createdAt: datetime
    updatedAt: datetime
