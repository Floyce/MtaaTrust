import uuid
from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class SupplyStore(Base):
    __tablename__ = "supply_stores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False) # e.g. Electrical, Plumbing, Paint
    suburb = Column(String, nullable=False) # e.g. Kilimani
    
    verified = Column(Boolean, default=True)
    partner_discount = Column(String, nullable=True) # e.g. "5% OFF"
    logo_url = Column(String, nullable=True)
