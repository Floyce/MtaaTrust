from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class SubscriptionBase(BaseModel):
    service_type: str
    frequency: str
    next_run_date: datetime
    provider_id: Optional[int] = None

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionOut(SubscriptionBase):
    id: UUID
    status: str
    created_at: datetime
    
    class Config:
        orm_mode = True
