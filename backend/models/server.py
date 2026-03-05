from pydantic import BaseModel, Field
from typing import Optional, Literal, List
from datetime import datetime

LoaderType = Literal["vanilla", "forge", "fabric"]
ServerMode = Literal["survival", "creative"]

class ServerCreate(BaseModel):
    name: str = Field(min_length=1, max_length=64)
    loader: LoaderType
    minecraftVersion: str = Field(min_length=1, max_length=32)
    loaderVersion: Optional[str] = Field(default=None, max_length=32)

    # MVP UI fields (optional / backwards compatible)
    mode: Optional[ServerMode] = None
    worldId: Optional[str] = None
    worldName: Optional[str] = None
    modIds: Optional[List[str]] = None
    lastPlayedAt: Optional[datetime] = None

class Server(ServerCreate):
    id: str
    createdAt: datetime
    updatedAt: datetime
