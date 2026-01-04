from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_current_user
# from app.api.deps import get_db # Commented out as DB is down, using mock response
from app.schemas.review import ReviewCreate, ReviewResponse
from app.services.trust_score import trust_score_service
from app.models.user import User
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/", response_model=ReviewResponse)
async def create_review(
    review_in: ReviewCreate,
    current_user: User = Depends(get_current_user),
    # db: AsyncSession = Depends(get_db)
):
    """
    Submit a review for a provider.
    Triggers a Trust Score recount.
    """
    # 1. Save dummy review (DB skipped)
    # db_review = Review(**review_in.model_dump(), user_id=current_user.id)
    # db.add(db_review)
    # await db.commit()
    
    # 2. Recalculate Trust Score
    # new_score = await trust_score_service.calculate_score(review_in.provider_id, db)
    # provider.trust_score = new_score
    # await db.commit()
    
    # Return mock response
    return ReviewResponse(
        id=uuid.uuid4(),
        provider_id=review_in.provider_id,
        user_id=current_user.id,
        rating=review_in.rating,
        comment=review_in.comment,
        booking_id=review_in.booking_id,
        created_at=datetime.utcnow()
    )
