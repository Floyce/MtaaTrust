from typing import List, Optional
from pydantic import BaseModel
from datetime import date
import uuid

class ProviderBase(BaseModel):
    business_name: str
    trade_category: str
    specialization_tags: List[str] = []
    service_locations: List[str] = []
    operating_radius_km: Optional[int] = 10
    verification_status: Optional[str] = "pending"

class ProviderCreate(ProviderBase):
    id_number: Optional[str] = None
    kra_pin: Optional[str] = None
    mpesa_business_number: Optional[str] = None

class ProviderUpdate(BaseModel):
    business_name: Optional[str] = None
    trade_category: Optional[str] = None
    specialization_tags: Optional[List[str]] = None
    service_locations: Optional[List[str]] = None
    operating_radius_km: Optional[int] = None
    verification_status: Optional[str] = None # Admin only ideally
    mpesa_business_number: Optional[str] = None
    verification_notes: Optional[str] = None

class ProviderResponse(ProviderBase):
    user_id: uuid.UUID
    subscription_tier: str
    trust_score: int
    jobs_completed: int
    is_verified: bool = False # Derived from verification_status

    class Config:
        from_attributes = True
