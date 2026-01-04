import random
from app.schemas.scan import ScanResult, MaterialEstimate

class ScanService:
    @staticmethod
    async def analyze_image(filename: str) -> ScanResult:
        """
        Mock AI analysis based on randomness or keywords in filename for demo.
        In production, this would call a TensorFlow model.
        """
        
        # Simulate processing time
        # await asyncio.sleep(2) 
        
        scenarios = [
            {
                "issue": "Leaking Pipe Joint",
                "category": "Plumbing",
                "price_min": 1500,
                "price_max": 2500,
                "urgency": "High",
                "materials": [
                    {"name": "PVC Elbow Joint", "estimated_price": 150},
                    {"name": "Teflon Tape", "estimated_price": 50},
                    {"name": "PVC Glue", "estimated_price": 300}
                ],
                "desc": "Water leakage detected at the elbow joint. Requires immediate replacement to prevent water damage."
            },
            {
                "issue": "Burnt Power Socket",
                "category": "Electrical",
                "price_min": 1000,
                "price_max": 1800,
                "urgency": "Critical",
                "materials": [
                    {"name": "Double Wall Socket", "estimated_price": 450},
                    {"name": "Wire Nut Connectors", "estimated_price": 100}
                ],
                "desc": "Signs of arcing and heat damage on the socket faceplate. Fire hazard - replace immediately."
            },
            {
                "issue": "Peeling Paint",
                "category": "Painting",
                "price_min": 3500,
                "price_max": 5000,
                "urgency": "Low",
                "materials": [
                    {"name": "Primer (1L)", "estimated_price": 800},
                    {"name": "Interior Paint (4L)", "estimated_price": 2500},
                    {"name": "Sandpaper", "estimated_price": 200}
                ],
                "desc": "Moisture infiltration causing paint adhesion failure. Surface preparation and repainting required."
            }
        ]

        # Randomly select a scenario
        scenario = random.choice(scenarios)
        
        return ScanResult(
            issue_detected=scenario["issue"],
            confidence=round(random.uniform(0.85, 0.98), 2),
            category=scenario["category"],
            estimated_price_min=scenario["price_min"],
            estimated_price_max=scenario["price_max"],
            urgency=scenario["urgency"],
            materials_needed=[MaterialEstimate(**m) for m in scenario["materials"]],
            description=scenario["desc"]
        )
