from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.user import UserType
import uuid

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

class UserBase(BaseModel):
    phone: str
    email: Optional[EmailStr] = None
    user_type: UserType

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    phone: str
    password: str

class UserResponse(UserBase):
    id: uuid.UUID
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True
