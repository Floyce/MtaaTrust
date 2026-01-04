from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.core.database import Base

class CommunityAlert(Base):
    __tablename__ = "community_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String, index=True)
    description = Column(String)
    type = Column(String) # Security, Utility, LostFound, Event
    severity = Column(String) # High, Medium, Low
    location_name = Column(String) # e.g. "Kileleshwa, Othaya Rd"
    # In a real app we'd use PostGIS geometry types
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    
    upvotes = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", backref="alerts")
