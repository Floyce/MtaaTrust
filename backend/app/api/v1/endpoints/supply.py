from typing import Any, List
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api import deps

router = APIRouter()

class SupplyStoreSchema(BaseModel):
    id: str
    name: str
    category: str
    suburb: str
    verified: bool
    partner_discount: str | None
    logo_url: str | None

@router.get("/stores", response_model=List[SupplyStoreSchema])
async def list_supply_stores(
    category: str | None = None,
    location: str | None = None
) -> Any:
    """
    List verified supply stores.
    Mocked for MVP.
    """
    # Mock Database
    MOCK_STORES = [
        {
            "id": "1",
            "name": "Kilimani Electricals",
            "category": "Electrical",
            "suburb": "Kilimani",
            "verified": True,
            "partner_discount": "5% OFF",
            "logo_url": "https://api.dicebear.com/7.x/initials/svg?seed=KE"
        },
        {
            "id": "2",
            "name": "Nairobi Paints & Hardware",
            "category": "Painting",
            "suburb": "Westlands",
            "verified": True,
            "partner_discount": "10% OFF for Mtaa Users",
            "logo_url": "https://api.dicebear.com/7.x/initials/svg?seed=NP"
        },
        {
            "id": "3",
            "name": "BuildRight Plumbing Depot",
            "category": "Plumbing",
            "suburb": "Kilimani",
            "verified": True,
            "partner_discount": None,
            "logo_url": "https://api.dicebear.com/7.x/initials/svg?seed=BR"
        }
    ]
    
    filtered = MOCK_STORES
    if category:
         filtered = [s for s in filtered if s["category"].lower() == category.lower()]
    if location:
         filtered = [s for s in filtered if s["suburb"].lower() == location.lower()]
         
    return filtered
