from typing import Any, List
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import datetime

from app.api import deps

router = APIRouter()

class PortfolioItemSchema(BaseModel):
    id: str
    title: str
    description: str | None
    before_image_url: str
    after_image_url: str
    created_at: datetime | None

@router.get("/{provider_id}", response_model=List[PortfolioItemSchema])
async def get_portfolio(provider_id: str) -> Any:
    """
    Get portfolio items for a provider.
    Mocked for MVP.
    """
    # Mock Data
    return [
        {
            "id": "1",
            "title": "Full House Rewiring",
            "description": "Replaced old dangerous wiring with modern standards.",
            "before_image_url": "https://images.unsplash.com/photo-1565514020121-197170a4dc0e?auto=format&fit=crop&q=80&w=400",
            "after_image_url": "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=400",
            "created_at": datetime.now()
        },
        {
            "id": "2",
            "title": "Kitchen Lighting Upgrade",
            "description": "Installed ambient LED strips and new fixtures.",
            "before_image_url": "https://images.unsplash.com/photo-1556912173-3db9963f4b0e?auto=format&fit=crop&q=80&w=400",
            "after_image_url": "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=400",
            "created_at": datetime.now()
        }
    ]
