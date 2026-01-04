from typing import Any
from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class InvoiceItem(BaseModel):
    description: str
    amount: float

class InvoiceSchema(BaseModel):
    id: str
    booking_id: str
    amount: float
    status: str
    items: List[InvoiceItem]
    contract_terms: str
    created_at: datetime
    
    provider_name: str
    client_name: str
    service_date: str

@router.get("/{booking_id}", response_model=InvoiceSchema)
async def get_invoice(booking_id: str) -> Any:
    """
    Get invoice for a booking.
    Mocked for MVP.
    """
    # In real app: Fetch from DB. If not exists, generate based on Booking data.
    
    # Mock Response
    return {
        "id": "INV-2024-001",
        "booking_id": booking_id,
        "amount": 3500.0,
        "status": "paid",
        "items": [
            {"description": "Standard Electrical Inspection", "amount": 1500.0},
            {"description": "Socket Replacement (x2)", "amount": 1000.0},
            {"description": "Labor & Transport", "amount": 1000.0}
        ],
        "contract_terms": "1. Services rendered are final. \n2. Warranty of 7 days on all labor. \n3. Disputes must be raised within 48 hours via MtaaTrust Resolution Center.",
        "created_at": datetime.now(),
        "provider_name": "Juma Ochieng",
        "client_name": "User",
        "service_date": "2024-02-15"
    }
