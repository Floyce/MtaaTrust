import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship as sa_relationship
from app.core.database import Base

class FamilyLink(Base):
    __tablename__ = "family_links"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    primary_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    # in a real app, linked_user_id would be a FK to users.id if they have an account
    # for MVP, we might just store a name/phone if they are "shadow" accounts managed by primary
    # But let's assume they are users or potential users.
    # For MVP simplicity: We'll store basic details directly if they aren't fully registered, 
    # or just use a shadow setup.
    
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    relationship = Column(String, nullable=False) # Parent, Child, Spouse
    can_book_on_behalf = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    primary_user = sa_relationship("User", backref="family_members")
