import uuid
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Text, func
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Vouch(Base):
    __tablename__ = "vouches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    provider_id = Column(UUID(as_uuid=True), ForeignKey("providers.user_id"))
    voucher_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), unique=True)
    
    relationship_type = Column(String, default="client")
    endorsement_text = Column(Text, nullable=False)
    weight = Column(Float, default=1.0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
