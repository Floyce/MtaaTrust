
import uuid
import asyncio
from app.schemas.payment import PaymentResponse

class MockMpesaService:
    """
    Simulates M-Pesa Daraja API interactions.
    """
    async def initiate_stk_push(self, phone_number: str, amount: float, booking_id: str) -> PaymentResponse:
        # Simulate network delay available in real world
        await asyncio.sleep(1)
        
        # Generate mock IDs
        checkout_request_id = str(uuid.uuid4())
        merchant_request_id = str(uuid.uuid4())
        
        # Return success response simulation
        return PaymentResponse(
            CheckoutRequestID=checkout_request_id,
            MerchantRequestID=merchant_request_id,
            ResponseCode="0",
            ResponseDescription="Success. Request accepted for processing",
            CustomerMessage=f"Success. Request accepted for processing for {amount} KES to {phone_number}"
        )

mpesa_service = MockMpesaService()
