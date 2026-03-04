from pydantic import BaseModel, Field
from datetime import datetime

class WorldCreate(BaseModel):
    name: str = Field(min_length=1, max_length=64)

class World(WorldCreate):
    id: str
    createdAt: datetime
    updatedAt: datetime
