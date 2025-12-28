import uuid
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Text, ARRAY, func
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geography
from app.core.database import Base

class JobRequest(Base):
    __tablename__ = "job_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    consumer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    photos = Column(ARRAY(String), default=[])
    
    # Location
    location = Column(Geography(geometry_type='POINT', srid=4326), nullable=True)
    suburb = Column(String, nullable=False, index=True)
    address = Column(Text, nullable=True)
    
    # Details
    urgency = Column(String, default="normal")
    preferred_date = Column(DateTime(timezone=True), nullable=True)
    budget_min = Column(Float, nullable=True)
    budget_max = Column(Float, nullable=True)
    
    # Status
    status = Column(String, default="open", index=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
