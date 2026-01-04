from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class AlertBase(BaseModel):
    title: str
    description: str
    type: str
    severity: str
    location_name: str
    lat: Optional[float] = None
    lng: Optional[float] = None

class AlertCreate(AlertBase):
    pass

class AlertOut(AlertBase):
    id: UUID
    user_id: int
    upvotes: int
    is_verified: bool
    created_at: datetime
    
    class Config:
        orm_mode = True
