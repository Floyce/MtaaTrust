import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class ProviderBadge(Base):
    __tablename__ = "provider_badges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    provider_id = Column(UUID(as_uuid=True), ForeignKey("providers.user_id"), nullable=False)
    badge_id = Column(UUID(as_uuid=True), ForeignKey("badges.id"), nullable=False)
    
    issued_at = Column(DateTime(timezone=True), server_default=func.now())
    verification_doc_url = Column(String, nullable=True) # Proof of certification
