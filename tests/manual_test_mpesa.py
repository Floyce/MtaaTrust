import asyncio
from app.services.mpesa import mpesa_service

async def test_mpesa_stub():
    print("Testing M-Pesa Stub...")
    response = await mpesa_service.initiate_stk_push(
        phone_number="254712345678",
        amount=1000,
        booking_id="booking-123"
    )
    print("Response received:")
    print(response.model_dump_json(indent=2))
    assert response.ResponseCode == "0"
    print("Test Passed: STK Push initiated successfully (Mock).")

if __name__ == "__main__":
    asyncio.run(test_mpesa_stub())
