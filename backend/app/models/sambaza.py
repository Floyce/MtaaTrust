import uuid
from sqlalchemy import Column, String, Integer, DateTime, func, Float
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class SambazaGroup(Base):
    __tablename__ = "sambaza_groups"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    title = Column(String, nullable=False) # e.g., "Kilimani Weekly Fumigation"
    service_category = Column(String, nullable=False) # e.g., "Fumigation"
    suburb = Column(String, nullable=False) # e.g., "Kilimani"
    organizer_id = Column(String, nullable=False) # User ID who started it
    
    participant_count = Column(Integer, default=1)
    target_count = Column(Integer, default=10) # Goal for max discount
    
    discount_tier = Column(String, default="0%") # Current discount unlocked
    
    expires_at = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, default="forming") # forming, active, closed
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
