from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.alert import CommunityAlert
from app.schemas import alert as schemas
from app.models.user import User

router = APIRouter()

@router.get("/feed", response_model=List[schemas.AlertOut])
def read_alerts(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 50,
) -> Any:
    """
    Get recent community alerts.
    """
    alerts = db.query(CommunityAlert).order_by(CommunityAlert.created_at.desc()).offset(skip).limit(limit).all()
    return alerts

@router.post("/report", response_model=schemas.AlertOut)
def create_alert(
    *,
    db: Session = Depends(deps.get_db),
    alert_in: schemas.AlertCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Report a new community alert.
    """
    alert = CommunityAlert(
        user_id=current_user.id,
        title=alert_in.title,
        description=alert_in.description,
        type=alert_in.type,
        severity=alert_in.severity,
        location_name=alert_in.location_name,
        lat=alert_in.lat,
        lng=alert_in.lng
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert
