import uuid
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Time, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_request_id = Column(UUID(as_uuid=True), ForeignKey("job_requests.id"), nullable=True)
    provider_id = Column(UUID(as_uuid=True), ForeignKey("providers.user_id"), nullable=False)
    consumer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Financials
    quoted_price = Column(Float, nullable=False)
    accepted_price = Column(Float, nullable=True)
    deposit_amount = Column(Float, default=0)
    final_amount = Column(Float, nullable=True)
    
    # Payment Plan
    payment_plan = Column(String, default="full") # 'full' or 'installments'
    installment_count = Column(Float, default=1) # Using Float just in case, but Integer makes more sense. Let's stick to existing Float pattern or use Integer if imported. 
    # Logic note: standard is Integer for counts. Checking imports.
    paid_amount = Column(Float, default=0.0)
    remaining_amount = Column(Float, default=0.0)
    next_payment_due = Column(DateTime(timezone=True), nullable=True)
    
    # Scheduling
    scheduled_date = Column(DateTime(timezone=True), nullable=False)
    scheduled_time = Column(Time, nullable=False)
    actual_start = Column(DateTime(timezone=True), nullable=True)
    actual_end = Column(DateTime(timezone=True), nullable=True)
    
    # Status
    status = Column(String, default="quoted", index=True)
    
    # Payment
    mpesa_transaction_id = Column(String, nullable=True)
    payment_status = Column(String, default="pending")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    job = relationship("JobRequest")
    provider = relationship("Provider")
    consumer = relationship("User", foreign_keys=[consumer_id])
