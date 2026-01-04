from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.api import deps
from app.models.user import User
from app.models.job_request import JobRequest
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

class EmergencyRequest(BaseModel):
    category: str
    location_description: str
    # Latitude/Longitude would go here in real app

class EmergencyResponse(BaseModel):
    job_id: str
    message: str
    providers_notified: int

@router.post("/request", response_model=EmergencyResponse)
async def create_emergency_request(
    request: EmergencyRequest,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create an Emergency SOS request.
    """
    
    # 1. Create Job Request with emergency flag
    job = JobRequest(
        consumer_id=current_user.id,
        category=request.category,
        title=f"SOS: {request.category}",
        description=f"Emergency request at {request.location_description}",
        suburb="Unknown", # Would be derived from lat/long
        urgency="emergency",
        is_emergency=True,
        emergency_fee=500.0, # Fixed fee or calculated
        status="searching"
    )
    
    db.add(job)
    await db.commit()
    await db.refresh(job)
    
    # 2. Mock finding nearest providers
    # In real app: POSTGIS query to find within 5km
    providers_found_count = 3
    
    return {
        "job_id": str(job.id),
        "message": f"SOS Signal sent! Finding nearest {request.category} experts...",
        "providers_notified": providers_found_count
    }
