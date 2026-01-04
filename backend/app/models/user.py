import uuid
from sqlalchemy import Boolean, Column, String, DateTime, func, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import enum

class UserType(str, enum.Enum):
    CONSUMER = "consumer"
    PROVIDER = "provider"
    ADMIN = "admin"
    MODERATOR = "moderator"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    full_name = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)
    user_type = Column(String, nullable=False) # Simple string storage for enum, or use SQLAlchemy Enum
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
