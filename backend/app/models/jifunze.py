import uuid
from sqlalchemy import Column, String, Text, Integer, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class DIYGuide(Base):
    __tablename__ = "diy_guides"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False) # Plumbing, Electrical, etc.
    difficulty = Column(String, nullable=False) # Easy, Medium, Hard, Pro-Only
    content = Column(Text, nullable=False) # Markdown content
    video_url = Column(String, nullable=True)
    # Note: SQLAlchemy's ARRAY type is supported by PostgreSQL
    tools_required = Column(ARRAY(String), default=[])
    estimated_time_minutes = Column(Integer, default=30)
