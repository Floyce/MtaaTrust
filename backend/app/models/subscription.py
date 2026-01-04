from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum
from datetime import datetime
from app.core.database import Base

class Frequency(str, enum.Enum):
    WEEKLY = "weekly"
    BIWEEKLY = "biweekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"

class MaintenanceSubscription(Base):
    __tablename__ = "maintenance_subscriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    provider_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True) # Optional preferred provider
    service_type = Column(String, index=True)
    frequency = Column(String) # Stored as string, validated by schema
    status = Column(String, default="Active") # Active, Paused, Cancelled
    next_run_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", foreign_keys=[user_id], backref="subscriptions")
    provider = relationship("User", foreign_keys=[provider_id])
