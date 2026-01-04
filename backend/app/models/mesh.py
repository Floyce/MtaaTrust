from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.core.database import Base

class MeshTeam(Base):
    __tablename__ = "mesh_teams"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    specialization = Column(String, nullable=True) # e.g. "Construction", "Events"
    leader_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    leader = relationship("User", backref="led_teams")
    members = relationship("MeshMember", back_populates="team", cascade="all, delete-orphan")

class MeshMember(Base):
    __tablename__ = "mesh_members"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    team_id = Column(UUID(as_uuid=True), ForeignKey("mesh_teams.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    role = Column(String, default="Member") # "Leader", "Admin", "Member"
    status = Column(String, default="Active") # "Active", "Invited", "Left"
    joined_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    team = relationship("MeshTeam", back_populates="members")
    user = relationship("User", backref="team_memberships")
