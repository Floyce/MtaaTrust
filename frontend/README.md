# MtaaTrust 🛡️🛠️

**Trusted Pros for Every Task.**  
MtaaTrust is a next-generation home services marketplace connecting Kenyan households with vetted professionals.

> **Status:** 🚧 Alpha / Work In Progress (Paused for Exams - Jan 2026)

## 🚀 Key Features Implemented

### 1. Unified "Single-Page" Navigation
- **Guest View:** Public landing page with "I Need a Service" and "I Offer Services" gateways.
- **Consumer View:** Seamlessly transforms into a **Consumer Dashboard** upon login (Active Jobs, Quick Actions).
- **Provider View:** Dedicated, professional separate dashboard at `/provider-dashboard`.

### 2. Provider Onboarding Wizard
- **Comprehensive 8-Step Flow** (`/provider/complete-profile`):
  - Identity Verification (ID, Selfie logic)
  - Service Specialization & Experience
  - Location Mapping (Radius based)
  - Pricing Models (Hourly vs Fixed)
  - Portfolio Uploads
- **Tech:** Uses `framer-motion` for smooth step transitions and state preservation.

### 3. Smart Verticals
- **Mtaa Scan AI (`/scan`):** Mock AI tool to diagnose home repair issues via camera.
- **Sambaza Deals (`/sambaza`):** Group booking logic for neighborhood discounts.
- **Mtaa Mesh (`/mesh`):** Offline-first concept for finding pros without data.
- **Pesa Predict (`/pesa-predict`):** Price estimation calculator.

### 4. Authentication & Roles
- **Role-Based Routing:** Smart redirects ensure Consumers never see Provider tools and vice-versa.
- **Gateway Registration:** Streamlined entry points for different user types.

## 🛠️ Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **State/Auth:** React Context + Custom Hooks (`useAuth`)
- **Backend:** (Currently using Mock API in `lib/api.ts` for frontend-only dev)

## 🏃‍♂️ Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Explore:**
   - **Guest:** Visit `http://localhost:3000`
   - **Login:** Use the built-in Mock Auth (random credentials work) to test Consumer vs Provider roles.

## 📝 To-Do / Next Steps (On Resume)
- [ ] Connect Real Backend (Supabase/Django/Node).
- [ ] Implement actual File Uploads for Provider Onboarding.
- [ ] Refine "Mtaa Scan" with real AI Vision API.
- [ ] Polish Mobile Responsive adjustments for the Dashboard.
