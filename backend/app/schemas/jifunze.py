from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

class DIYGuideBase(BaseModel):
    title: str
    category: str
    difficulty: str
    content: str
    video_url: Optional[str] = None
    tools_required: List[str] = []
    estimated_time_minutes: int = 30

class DIYGuideCreate(DIYGuideBase):
    pass

class DIYGuideOut(DIYGuideBase):
    id: UUID

    class Config:
        orm_mode = True
