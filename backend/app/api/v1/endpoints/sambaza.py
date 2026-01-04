from typing import Any, List
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from app.api import deps
from app.models.sambaza import SambazaGroup
from app.api.v1.endpoints.auth import get_current_user
from app.models.user import User

router = APIRouter()

class SambazaCreate(BaseModel):
    title: str
    service_category: str
    suburb: str
    target_count: int = 10
    duration_days: int = 7

class SambazaResponse(BaseModel):
    id: str
    title: str
    suburb: str
    participant_count: int
    target_count: int
    discount_tier: str
    status: str
    expires_at: datetime

@router.post("/create", response_model=SambazaResponse)
async def create_sambaza(
    group_in: SambazaCreate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Start a new Sambaza Group.
    """
    expires = datetime.now() + timedelta(days=group_in.duration_days)
    
    group = SambazaGroup(
        title=group_in.title,
        service_category=group_in.service_category,
        suburb=group_in.suburb,
        organizer_id=str(current_user.id),
        target_count=group_in.target_count,
        expires_at=expires,
        status="forming"
    )
    
    db.add(group)
    await db.commit()
    await db.refresh(group)
    
    return {
        "id": str(group.id),
        "title": group.title,
        "suburb": group.suburb,
        "participant_count": group.participant_count,
        "target_count": group.target_count,
        "discount_tier": group.discount_tier,
        "status": group.status,
        "expires_at": group.expires_at
    }

@router.get("/active", response_model=List[SambazaResponse])
async def list_active_sambazas(
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    List active Sambaza groups.
    """
    # In real app, filter by user suburb. For now, list all active.
    result = await db.execute(select(SambazaGroup).where(SambazaGroup.status == "forming"))
    groups = result.scalars().all()
    
    return [
        {
            "id": str(g.id),
            "title": g.title,
            "suburb": g.suburb,
            "participant_count": g.participant_count,
            "target_count": g.target_count,
            "discount_tier": g.discount_tier,
            "status": g.status,
            "expires_at": g.expires_at
        }
        for g in groups
    ]

@router.post("/{group_id}/join", response_model=dict)
async def join_sambaza(
    group_id: str,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Join an existing Sambaza group.
    """
    result = await db.execute(select(SambazaGroup).where(SambazaGroup.id == group_id))
    group = result.scalars().first()
    
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
        
    # Logic to add user to participant list (omitted, assuming just count increment for MVP)
    group.participant_count += 1
    
    # Update discount tier logic (simplified)
    ratio = group.participant_count / group.target_count
    if ratio >= 1.0:
        group.discount_tier = "25%"
        group.status = "active" # Ready to execute
    elif ratio >= 0.5:
        group.discount_tier = "15%"
    elif ratio >= 0.2:
        group.discount_tier = "5%"
        
    await db.commit()
    
    return {"message": f"Successfully joined {group.title}! Current discount: {group.discount_tier}"}
