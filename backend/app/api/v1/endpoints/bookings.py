from typing import Any, Optional
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from pydantic.fields import Field

from app.api import deps
from app.models.user import User
from app.models.booking import Booking
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

class BookingCreate(BaseModel):
    provider_id: str
    service_id: Optional[str] = None # Or just service name/type
    service_name: str
    scheduled_date: datetime
    quoted_price: float
    payment_plan: str = "full" # 'full' or 'installments'

class BookingResponse(BaseModel):
    id: str
    status: str
    total_amount: float
    amount_due_now: float
    message: str

@router.post("/", response_model=BookingResponse)
async def create_booking(
    booking_in: BookingCreate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create a new booking with optional payment plan.
    """
    
    # Calculate amounts based on plan
    amount_due_now = booking_in.quoted_price
    start_msg = "Booking confirmed. Please pay the full amount."
    
    if booking_in.payment_plan == "installments":
        # 70% Upfront, 30% Later
        amount_due_now = booking_in.quoted_price * 0.70
        start_msg = f"Booking confirmed. Please pay the down payment of KES {amount_due_now} (70%)."
    
    booking = Booking(
        # In real app, we would validate provider existence here
        provider_id=booking_in.provider_id, # Assumes valid UUID passed
        consumer_id=current_user.id,
        # job_request_id logic omitted for direct booking for now, or generated
        quoted_price=booking_in.quoted_price,
        accepted_price=booking_in.quoted_price,
        scheduled_date=booking_in.scheduled_date,
        scheduled_time=booking_in.scheduled_date.time(), # Extract time
        
        payment_plan=booking_in.payment_plan,
        installment_count=2 if booking_in.payment_plan == "installments" else 1,
        remaining_amount=booking_in.quoted_price - amount_due_now,
        # Set next due date if installments (e.g., 30 days later or upon completion)
        next_payment_due=booking_in.scheduled_date + timedelta(days=30) if booking_in.payment_plan == "installments" else None,
        
        status="pending_payment"
    )
    
    db.add(booking)
    await db.commit()
    await db.refresh(booking)
    
    return {
        "id": str(booking.id),
        "status": "pending_payment",
        "total_amount": booking_in.quoted_price,
        "amount_due_now": amount_due_now,
        "message": start_msg
    }

from typing import List
from sqlalchemy.orm import selectinload
from sqlalchemy import desc

class BookingListSchema(BaseModel):
    id: str
    provider_name: str
    service_name: str
    date: str
    amount: str
    status: str
    image: str

@router.get("/", response_model=List[BookingListSchema])
async def get_my_bookings(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get current user's bookings.
    """
    stmt = (
        select(Booking)
        .where(Booking.consumer_id == current_user.id)
        .options(selectinload(Booking.provider).selectinload("user")) # Load provider and their user info (for name)
        .order_by(desc(Booking.scheduled_date))
    )
    result = await db.execute(stmt)
    bookings = result.scalars().all()
    
    # Transform to schema
    # Note: Provider model needs to have a way to get name. 
    # Usually provider.user.full_name or similar if Provider links to User.
    # We will assume a simple mapping for now, handling potential missing relations safely.
    
    booking_list = []
    for b in bookings:
        # Mocking provider name/image extraction if relation is complex
        # In a real scenario, we'd access b.provider.business_name or b.provider.user.full_name
        # For this MVP step, we'll try to get it if loaded, else fallback.
        
        provider_name = "Service Provider"
        if b.provider:
             # Assuming Provider model has 'business_name' or we use the linked User's name
             # Let's check if we can access attributes. For safety in this iteration, we use defaults 
             # allowing the frontend to verify 'Real Data' flow even if names are generic initially.
             provider_name = getattr(b.provider, "business_name", "Provider") 

        booking_list.append({
            "id": str(b.id),
            "provider_name": provider_name,
            "service_name": "Service", # We should store service name in booking or derive it
            "date": b.scheduled_date.strftime("%Y-%m-%d %H:%M"),
            "amount": f"KES {b.quoted_price}",
            "status": b.status,
            "image": f"https://api.dicebear.com/7.x/avataaars/svg?seed={provider_name}"
        })
        
    return booking_list
