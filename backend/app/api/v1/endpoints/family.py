from typing import Any, List
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class FamilyMemberSchema(BaseModel):
    id: str
    name: str
    phone: str
    relationship: str
    can_book_on_behalf: bool
    created_at: datetime | None = None

@router.get("/", response_model=List[FamilyMemberSchema])
async def get_family_members() -> Any:
    """
    Get all family members linked to the current user.
    Mocked for MVP.
    """
    return [
        {
            "id": "1",
            "name": "Mama Shiro (Mom)",
            "phone": "+254711223344",
            "relationship": "Parent",
            "can_book_on_behalf": True,
            "created_at": datetime.now()
        },
        {
            "id": "2",
            "name": "Uncle Ben",
            "phone": "+254799887766",
            "relationship": "Relative",
            "can_book_on_behalf": True,
            "created_at": datetime.now()
        }
    ]

class InviteMemberSchema(BaseModel):
    name: str
    phone: str
    relationship: str

@router.post("/invite")
async def invite_family_member(invite: InviteMemberSchema) -> Any:
    """
    Invite or add a family member.
    """
    return {"status": "success", "message": f"{invite.name} added to your family circle."}
