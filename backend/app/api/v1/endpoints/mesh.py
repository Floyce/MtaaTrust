from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.mesh import MeshTeam, MeshMember
from app.models.user import User
from app.schemas import mesh as schemas

router = APIRouter()

@router.get("/my-teams", response_model=List[schemas.MeshTeam])
def read_my_teams(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve teams the current user belongs to (as leader or member).
    """
    # Simple query: find teams where user is leader OR member
    # For now, let's just return teams where they are leader for simplicity or join on members
    # A better query would be:
    # teams = db.query(MeshTeam).join(MeshMember).filter(MeshMember.user_id == current_user.id).all()
    # But since we defined backref 'led_teams', we can start there:
    
    # Get teams they lead
    led_teams = db.query(MeshTeam).filter(MeshTeam.leader_id == current_user.id).all()
    
    # Get teams they are a member of
    member_teams = db.query(MeshTeam).join(MeshMember).filter(
        MeshMember.user_id == current_user.id,
        MeshMember.status == "Active"
    ).all()
    
    # Combine and deduplicate
    all_teams = list({t.id: t for t in (led_teams + member_teams)}.values())
    return all_teams

@router.post("/create", response_model=schemas.MeshTeam)
def create_team(
    *,
    db: Session = Depends(deps.get_db),
    team_in: schemas.MeshTeamCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a new team.
    """
    team = MeshTeam(
        name=team_in.name,
        description=team_in.description,
        specialization=team_in.specialization,
        leader_id=current_user.id,
    )
    db.add(team)
    db.commit()
    db.refresh(team)
    
    # Add creator as a member too (Leader role)
    member = MeshMember(
        team_id=team.id,
        user_id=current_user.id,
        role="Leader",
        status="Active"
    )
    db.add(member)
    db.commit()
    
    return team

@router.post("/{team_id}/invite", response_model=schemas.MeshMemberSchema)
def invite_member(
    *,
    db: Session = Depends(deps.get_db),
    team_id: str,
    invite: schemas.TeamInvite,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Invite a user to the team by email.
    """
    # 1. Verify team exists and user is leader
    team = db.query(MeshTeam).filter(MeshTeam.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if team.leader_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the team leader can invite members")
        
    # 2. Find user by email
    user_to_invite = db.query(User).filter(User.email == invite.email).first()
    if not user_to_invite:
        raise HTTPException(status_code=404, detail="User with this email not found")
        
    # 3. Check if already member
    existing = db.query(MeshMember).filter(
        MeshMember.team_id == team_id, 
        MeshMember.user_id == user_to_invite.id
    ).first()
    if existing:
         raise HTTPException(status_code=400, detail="User is already in the team")

    # 4. Add member
    member = MeshMember(
        team_id=team_id,
        user_id=user_to_invite.id,
        role=invite.role,
        status="Invited" # They would need to accept, but for now we auto-add or set as Invited
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return member
