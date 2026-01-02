import requests
import sys

BASE_URL = "http://localhost:8000/api/v1"

def print_result(step, response):
    if response.status_code in [200, 201]:
        print(f"✅ {step} Successful")
        return response.json()
    else:
        print(f"❌ {step} Failed: {response.status_code} - {response.text}")
        sys.exit(1)

# 1. Register User
print("\n--- 1. Register User ---")
user_data = {
    "phone": "+254712345678",
    "email": "provider@test.com",
    "password": "password123",
    "user_type": "provider"
}
# Try to login first to delete if exists? No delete endpoint. just use random phone if fails.
import random
user_data["phone"] = f"+2547{random.randint(10000000, 99999999)}"
user_data["email"] = f"provider{random.randint(1000,9999)}@test.com"

res = requests.post(f"{BASE_URL}/auth/register", json=user_data)
user = print_result("Registration", res)

# 2. Login
print("\n--- 2. Login ---")
login_data = {
    "phone": user_data["phone"],
    "password": user_data["password"]
}
res = requests.post(f"{BASE_URL}/auth/login", json=login_data)
token_data = print_result("Login", res)
headers = {"Authorization": f"Bearer {token_data['access_token']}"}

# 3. Create Provider Profile
print("\n--- 3. Create Provider Profile ---")
provider_data = {
    "business_name": "Juma's Electric",
    "trade_category": "Electrical",
    "specialization_tags": ["wiring", "lighting"],
    "service_locations": ["Kilimani", "Kileleshwa"],
    "operating_radius_km": 15,
    "id_number": "12345678",
    "kra_pin": "A123456789Z"
}
res = requests.post(f"{BASE_URL}/providers/", json=provider_data, headers=headers)
provider = print_result("Create Profile", res)

# 4. Get Own Profile
print("\n--- 4. Get Own Profile ---")
res = requests.get(f"{BASE_URL}/providers/me", headers=headers)
print_result("Get Me", res)

# 5. Search Providers
print("\n--- 5. Search Providers ---")
params = {"location": "Kilimani", "category": "Electrical"}
res = requests.get(f"{BASE_URL}/providers/", params=params)
results = print_result("Search", res)
print(f"Found {len(results)} providers")

if len(results) > 0:
    print("✅ Logic Verified")
else:
    print("❌ Search Logic Failed (No results found)")
