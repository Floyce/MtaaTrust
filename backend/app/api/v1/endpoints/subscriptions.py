from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.subscription import MaintenanceSubscription
from app.schemas import subscription as schemas
from app.models.user import User

router = APIRouter()

@router.post("/create", response_model=schemas.SubscriptionOut)
def create_subscription(
    *,
    db: Session = Depends(deps.get_db),
    sub_in: schemas.SubscriptionCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a new maintenance subscription.
    """
    sub = MaintenanceSubscription(
        user_id=current_user.id,
        service_type=sub_in.service_type,
        frequency=sub_in.frequency,
        next_run_date=sub_in.next_run_date,
        provider_id=sub_in.provider_id,
        status="Active"
    )
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub

@router.get("/me", response_model=List[schemas.SubscriptionOut])
def read_my_subscriptions(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    List my subscriptions.
    """
    subs = db.query(MaintenanceSubscription).filter(MaintenanceSubscription.user_id == current_user.id).all()
    return subs
