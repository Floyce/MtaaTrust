from typing import Any, List
from datetime import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api import deps

router = APIRouter()

class GateLogEntry(BaseModel):
    id: str
    time: str
    provider_name: str
    company_name: str
    service: str
    house_number: str
    vehicle_reg: str
    status: str

@router.get("/gate-log", response_model=List[GateLogEntry])
async def get_gate_log() -> Any:
    """
    Get the daily log of providers expected or checked in.
    Mocked data for MVP.
    """
    # In real app, query Bookings where scheduled_date is today
    return [
        {
            "id": "1",
            "time": "08:30 AM",
            "provider_name": "Juma Ochieng",
            "company_name": "Juma's Electricals",
            "service": "Electrical Repair",
            "house_number": "B4",
            "vehicle_reg": "KBC 123A",
            "status": "Checked In"
        },
        {
            "id": "2",
            "time": "10:00 AM",
            "provider_name": "Sarah Wanjiku",
            "company_name": "Sparkle Clean",
            "service": "Deep Cleaning",
            "house_number": "A12",
            "vehicle_reg": "Walk-in",
            "status": "Expected"
        },
        {
            "id": "3",
            "time": "02:15 PM",
            "provider_name": "Peter Kamau",
            "company_name": "Pete the Plumber",
            "service": "Leak Repair",
            "house_number": "C7",
            "vehicle_reg": "KDA 890Z",
            "status": "Expected"
        }
    ]
