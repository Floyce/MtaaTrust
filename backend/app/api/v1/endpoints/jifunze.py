from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.models.jifunze import DIYGuide
from app.schemas import jifunze as schemas
from app.models.user import User

router = APIRouter()

@router.get("/guides", response_model=List[schemas.DIYGuideOut])
def read_guides(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve DIY guides.
    """
    # Simply return all guides for now
    guides = db.query(DIYGuide).offset(skip).limit(limit).all()
    return guides

@router.post("/guides", response_model=schemas.DIYGuideOut)
def create_guide(
    *,
    db: Session = Depends(deps.get_db),
    guide_in: schemas.DIYGuideCreate,
    # In a real app, restrict this to admin users
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a new DIY guide.
    """
    guide = DIYGuide(
        title=guide_in.title,
        category=guide_in.category,
        difficulty=guide_in.difficulty,
        content=guide_in.content,
        video_url=guide_in.video_url,
        tools_required=guide_in.tools_required,
        estimated_time_minutes=guide_in.estimated_time_minutes
    )
    db.add(guide)
    db.commit()
    db.refresh(guide)
    return guide
