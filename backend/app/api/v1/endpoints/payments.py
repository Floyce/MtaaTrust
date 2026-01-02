from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.payment import PaymentCreate, PaymentResponse
from app.services.mpesa import mpesa_service
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/stk-push", response_model=PaymentResponse)
async def initiate_payment(
    payment_in: PaymentCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Initiate M-Pesa STK Push payment.
    Use this endpoint to trigger a payment request to the user's phone.
    """
    try:
        response = await mpesa_service.initiate_stk_push(
            phone_number=payment_in.phone_number,
            amount=payment_in.amount,
            booking_id=payment_in.booking_id
        )
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Payment initiation failed: {str(e)}"
        )
