from typing import Generator
from app.core.database import AsyncSessionLocal

async def get_db() -> Generator:
    async with AsyncSessionLocal() as session:
        yield session
