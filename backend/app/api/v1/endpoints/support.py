from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.api import deps
from app.models.support import CallbackRequest

router = APIRouter()

class CallbackCreate(BaseModel):
    name: str
    phone: str
    reason: str
    notes: str = ""

@router.post("/callback", response_model=dict)
async def request_callback(
    request: CallbackCreate,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Submit a request for a support call-back.
    """
    
    callback = CallbackRequest(
        name=request.name,
        phone=request.phone,
        reason=request.reason,
        notes=request.notes,
        status="pending"
    )
    
    db.add(callback)
    await db.commit()
    
    return {
        "message": "Callback request received. Our team will call you shortly.",
        "id": str(callback.id)
    }
