from pydantic import BaseModel
from typing import List, Optional

class MaterialEstimate(BaseModel):
    name: str
    estimated_price: float

class ScanResult(BaseModel):
    issue_detected: str
    confidence: float
    category: str
    estimated_price_min: float
    estimated_price_max: float
    urgency: str
    materials_needed: List[MaterialEstimate]
    description: str
