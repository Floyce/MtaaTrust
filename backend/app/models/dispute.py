import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, Text, ARRAY, func
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Dispute(Base):
    __tablename__ = "disputes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"))
    initiator_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    reason = Column(String, nullable=False)
    evidence_photos = Column(ARRAY(String), default=[])
    
    status = Column(String, default="open") # open, in_review, resolved
    resolution = Column(Text, nullable=True)
    moderator_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
