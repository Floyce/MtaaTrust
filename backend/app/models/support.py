import uuid
from sqlalchemy import Column, String, DateTime, func, Text
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class CallbackRequest(Base):
    __tablename__ = "callback_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # Optional user_id if logged in, but allowing guests for general inquiries
    user_id = Column(String, nullable=True) 
    
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    reason = Column(String, nullable=False) # 'booking_issue', 'payment', 'general'
    notes = Column(Text, nullable=True)
    
    status = Column(String, default="pending") # pending, called, resolved
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
