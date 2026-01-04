import uuid
from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Badge(Base):
    __tablename__ = "badges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True) # e.g. "Verified Pro", "NCA Accredited"
    description = Column(Text, nullable=False)
    icon_url = Column(String, nullable=True)
    category = Column(String, default="skill") # skill, safety, trust
