from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PaymentCreate(BaseModel):
    phone_number: str = Field(..., description="M-Pesa phone number (e.g., 254712345678)")
    amount: float = Field(..., gt=0, description="Amount to pay in KES")
    booking_id: str = Field(..., description="ID of the booking being paid for")

class PaymentResponse(BaseModel):
    CheckoutRequestID: str
    MerchantRequestID: str
    ResponseCode: str
    ResponseDescription: str
    CustomerMessage: str

class PaymentCallbackBody(BaseModel):
    # Simplified schema for the callback stub
    MerchantRequestID: str
    CheckoutRequestID: str
    ResultCode: int
    ResultDesc: str
