from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

# Shared properties
class MeshTeamBase(BaseModel):
    name: str
    description: Optional[str] = None
    specialization: Optional[str] = None

# Properties to receive on creation
class MeshTeamCreate(MeshTeamBase):
    pass

# Properties to receive on update
class MeshTeamUpdate(MeshTeamBase):
    pass

# Member Schema
class MeshMemberSchema(BaseModel):
    id: UUID
    user_id: int
    role: str
    status: str
    joined_at: datetime
    
    class Config:
        orm_mode = True

# Properties to return to client
class MeshTeam(MeshTeamBase):
    id: UUID
    leader_id: int
    created_at: datetime
    members: List[MeshMemberSchema] = []

    class Config:
        orm_mode = True

class TeamInvite(BaseModel):
    email: str
    role: str = "Member"
