import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Boolean, Date, Text, ARRAY, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base
# Import association model to ensure it's registered
from app.models.provider_badge import ProviderBadge
from app.models.badge import Badge

class Provider(Base):
    __tablename__ = "providers"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    business_name = Column(String, nullable=False)
    trade_category = Column(String, nullable=False, index=True)
    specialization_tags = Column(ARRAY(String), default=[])
    
    # Verification
    id_number = Column(String, nullable=True)
    kra_pin = Column(String, nullable=True)
    business_reg_number = Column(String, nullable=True)
    license_number = Column(String, nullable=True)
    insurance_provider = Column(String, nullable=True)
    insurance_expiry = Column(Date, nullable=True)
    
    # Location
    service_locations = Column(ARRAY(String), default=[]) # Array of suburbs
    operating_radius_km = Column(Integer, default=10)
    
    # Subscription
    subscription_tier = Column(String, default="free")
    subscription_expiry = Column(Date, nullable=True)
    
    # Stats
    trust_score = Column(Integer, default=0, index=True)
    rehire_rate = Column(Float, default=0.0)
    response_time_avg = Column(Integer, default=0) # minutes
    jobs_completed = Column(Integer, default=0)
    
    # Payment
    mpesa_business_number = Column(String, nullable=True)
    bank_account = Column(JSON, nullable=True)
    
    # Status
    verification_status = Column(String, default="pending", index=True)
    verification_notes = Column(Text, nullable=True)
    
    user = relationship("User", backref="provider_profile")
    badges = relationship("Badge", secondary="provider_badges", backref="providers")
