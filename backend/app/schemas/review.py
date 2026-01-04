from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from uuid import UUID

class ReviewCreate(BaseModel):
    provider_id: UUID
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    comment: Optional[str] = Field(None, min_length=10, max_length=500)
    booking_id: UUID

class ReviewResponse(ReviewCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True
