import uuid
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, func, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False, unique=True)
    
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending") # pending, paid
    
    # Store line items as JSON: [{ "description": "Labor", "amount": 2500 }, ...]
    items = Column(JSON, default=[])
    
    # Legal/Contract text
    contract_terms = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    booking = relationship("Booking", backref="invoice")
