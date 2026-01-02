from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_

from app.api import deps
from app.api.v1.endpoints import auth
from app.models.provider import Provider
from app.models.user import User
from app.schemas.provider import ProviderCreate, ProviderResponse, ProviderUpdate

router = APIRouter()

@router.get("/", response_model=List[ProviderResponse])
async def read_providers(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    location: Optional[str] = None,
    category: Optional[str] = None,
) -> Any:
    """
    Retrieve providers with optional search filters.
    """
    query = select(Provider)
    
    if category:
        query = query.filter(Provider.trade_category.ilike(f"%{category}%"))
    
    if location:
        # Check against service_locations array using ANY mechanism or simple string check if simpler
        # For Postgres ARRAY: Provider.service_locations.any(location)
        # Using simple filtering for now assuming MVP
        query = query.filter(Provider.service_locations.contains([location]))
        
    if search:
        query = query.filter(
            or_(
                Provider.business_name.ilike(f"%{search}%"),
                Provider.trade_category.ilike(f"%{search}%"),
                Provider.verification_notes.ilike(f"%{search}%")
            )
        )
        
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    providers = result.scalars().all()
    
    # Map to response (handling the derived is_verified logic here or in schema config)
    results = []
    for p in providers:
        p.is_verified = p.verification_status == "verified"
        results.append(p)
        
    return results

@router.post("/", response_model=ProviderResponse)
async def create_provider_profile(
    *,
    db: AsyncSession = Depends(deps.get_db),
    provider_in: ProviderCreate,
    current_user: User = Depends(auth.get_current_user),
) -> Any:
    """
    Create new provider profile for the current user.
    """
    # Check if profile already exists
    result = await db.execute(select(Provider).where(Provider.user_id == current_user.id))
    existing = result.scalars().first()
    if existing:
         raise HTTPException(
            status_code=400,
            detail="Provider profile already exists for this user",
        )
    
    provider = Provider(
        user_id=current_user.id,
        business_name=provider_in.business_name,
        trade_category=provider_in.trade_category,
        specialization_tags=provider_in.specialization_tags,
        service_locations=provider_in.service_locations,
        operating_radius_km=provider_in.operating_radius_km,
        id_number=provider_in.id_number,
        kra_pin=provider_in.kra_pin,
        mpesa_business_number=provider_in.mpesa_business_number,
    )
    db.add(provider)
    await db.commit()
    await db.refresh(provider)
    
    # Update user type? Optional, but good practice
    if current_user.user_type != "provider":
        current_user.user_type = "provider"
        db.add(current_user)
        await db.commit()

    provider.is_verified = provider.verification_status == "verified"
    return provider

@router.get("/me", response_model=ProviderResponse)
async def read_own_provider_profile(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(auth.get_current_user),
) -> Any:
    """
    Get current user's provider profile.
    """
    result = await db.execute(select(Provider).where(Provider.user_id == current_user.id))
    provider = result.scalars().first()
    if not provider:
        raise HTTPException(status_code=404, detail="Provider profile not found")
        
    provider.is_verified = provider.verification_status == "verified"
    return provider

@router.get("/{provider_id}", response_model=ProviderResponse)
async def read_provider_by_id(
    provider_id: str, # UUID passed as str
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get a specific provider by ID (user_id).
    """
    try:
        import uuid
        uuid_obj = uuid.UUID(provider_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")

    result = await db.execute(select(Provider).where(Provider.user_id == uuid_obj))
    provider = result.scalars().first()
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    provider.is_verified = provider.verification_status == "verified"
    return provider
