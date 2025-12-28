import uuid
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Time, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_request_id = Column(UUID(as_uuid=True), ForeignKey("job_requests.id"))
    provider_id = Column(UUID(as_uuid=True), ForeignKey("providers.user_id"))
    
    # Financials
    quoted_price = Column(Float, nullable=False)
    accepted_price = Column(Float, nullable=True)
    deposit_amount = Column(Float, default=0)
    final_amount = Column(Float, nullable=True)
    
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
