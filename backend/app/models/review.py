import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Text, Boolean, ARRAY, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), unique=True)
    reviewer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    reviewee_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Ratings (1-5 scale)
    overall_rating = Column(Integer, nullable=False)
    quality_rating = Column(Integer, nullable=True)
    communication_rating = Column(Integer, nullable=True)
    punctuality_rating = Column(Integer, nullable=True)
    
    # Flags
    would_rehire = Column(Boolean, default=False)
    within_budget = Column(Boolean, default=True)
    
    # Content
    title = Column(String, nullable=True)
    comment = Column(Text, nullable=True)
    photos = Column(ARRAY(String), default=[])
    private_feedback = Column(Text, nullable=True)
    
    # Response
    provider_response = Column(Text, nullable=True)
    responded_at = Column(DateTime(timezone=True), nullable=True)
    
    # Verification
    is_verified = Column(Boolean, default=True)
    helpful_count = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    booking = relationship("Booking")
