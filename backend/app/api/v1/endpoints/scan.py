from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.scan import ScanResult
from app.services.scan_service import ScanService
import shutil
import os

router = APIRouter()

@router.post("/analyze", response_model=ScanResult)
async def analyze_image(file: UploadFile = File(...)):
    """
    Upload an image for AI diagnosis.
    Returns detected issue, price estimate, and materials.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # In a real app, save the file or process bytes directly
    # For now, we just pass the filename to our mock service
    
    result = await ScanService.analyze_image(file.filename)
    return result
