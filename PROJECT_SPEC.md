# MtaaTrust Project Specification

A Kenyan-first local services platform where trust is built through verified community connections, not just reviews. Protecting both consumers and providers through transparent systems.

## USER TYPES & ACCESS CONTROL

### 1. PUBLIC VISITORS (No Login)
*   **Can view:** Homepage, Provider public profiles, How it works
*   **CANNOT:** Book services, Message providers, See prices
*   **CTA:** "Login to Book" or "Sign Up Now"

### 2. CONSUMERS (I Need Help)
**Registration:**
*   Simple form: Name, Phone, Email, Password
*   Password: 8+ chars, 1 special char, 1 number
*   Real-time validation showing missing requirements
*   No public profile - Privacy first
*   **After signup:** Redirect to Consumer Dashboard

**Profile (Private):**
*   Name, phone, email, profile picture
*   Primary location (optional)
*   Contact preferences
*   Payment methods (M-Pesa saved)
*   NO public address sharing

### 3. PROVIDERS (I Offer Services)
**Registration (Thorough Verification):**
*   **Stage 1:** Basic info (Name, Phone, Service category)
*   **Stage 2:** Verification documents (National ID mandatory)
    *   ID photo upload
    *   Live photo verification (match face to ID)
    *   ID number validation with government API
*   **Stage 3:** Business details
    *   Services offered (select specialties)
    *   Locations served (suburbs/estates)
    *   Experience level
    *   Portfolio photos (optional during signup)
*   **Stage 4:** Payment setup
    *   M-Pesa till/business number
    *   Bank details (optional)

**Verification Levels:**
*   **Pending:** Can create profile but cannot receive jobs
*   **Basic Verified:** ID verified, can receive jobs
*   **Premium Verified:** Additional checks, badges, priority

**Public Profile:**
*   Visible to everyone
*   Shows: Name, services, location, portfolio
*   Ratings & reviews
*   Certifications
*   Response time statistics

## TRUST & SAFETY SYSTEM

### Consumer Trust Score (PRIVATE to Providers Only)
*   Not visible to other consumers
*   Visible to providers when they receive job request
*   Based on: Payment history, Reliability, Review quality
*   **Purpose:** Help providers avoid problematic clients

### Provider Trust Score (PUBLIC)
*   Visible to all consumers
*   Calculated from: Reviews, Rehire rate, Response time, Completion rate
*   0-100 scale with badges

### Verification Process
*   **Automated ID Check:** National ID validation via API
*   **Manual Review Queue:** For flagged accounts
*   **Continuous Monitoring:** Regular check of active providers
*   **Community Reporting:** Users can report suspicious activity

## PAYMENT SYSTEM

### Payment Flow
1.  CONSUMER posts job request
2.  PROVIDERS send quotes (including deposit %)
3.  CONSUMER accepts one quote
4.  DEPOSIT (20-50%) via M-Pesa escrow
5.  Job completed
6.  Consumer releases remaining payment
7.  Both leave reviews

### M-Pesa Escrow for Large Jobs (>KES 10,000)
*   Platform holds payment until job verified
*   24-hour release window after completion
*   Consumer can dispute within 24h

### Deposit System
*   Provider sets deposit percentage (20-50%)
*   Minimum deposit: KES 500
*   Held in escrow, released after job start

## EMERGENCY SOS SYSTEM

### Consumer Side
*   Red SOS button on dashboard
*   Form: Emergency type, description, photos
*   Location auto-detected
*   Response expectation: <15 minutes acknowledgment, <30 minutes arrival

### Provider Side
*   Emergency alert with sound/notification
*   Multiple providers notified simultaneously
*   First to accept gets the job
*   Others see "Job Taken"
*   Premium pricing allowed (set by provider)

### Process
1.  Consumer hits SOS
2.  All available providers within 5km get alert
3.  Provider accepts -> Others see "Assigned"
4.  Provider arrives -> Consumer confirms
5.  Job completed -> Escrow payment released

## BOOKING SYSTEM

### Status Flow
**CONSUMER:**
Request -> Quotes Received -> Quote Accepted -> Scheduled -> In Progress -> Completed -> Reviewed

**PROVIDER:**
New Request -> Quote Sent -> Quote Accepted -> Scheduled -> In Progress -> Completed -> Paid -> Reviewed

### Smart Matching
*   Providers see jobs in their service areas
*   Priority to: Higher trust score, Better response rate
*   Consumer sees 3 best-matched providers

## SAMBAZA GROUP BOOKINGS

### How It Works
*   Initiator creates group job
*   Gets shareable link/WhatsApp message
*   Neighbors join via link
*   Bulk discount auto-applied (e.g., 5+ homes = 20% off)
*   Equal split payments calculated automatically
*   Provider gets one booking for multiple locations

### Payment Splitting
*   Each participant pays their share
*   Platform manages individual payments
*   Provider sees total amount, not individual splits

## CALL-BACK SYSTEM (Non-Smartphone Users)

### USSD Access
*483*888# -> Service Menu
1.  Plumbing
2.  Electrical
3.  Cleaning
4.  Emergency

### SMS System
Text to 20880: "PLUMB Karen leaking pipe"
-> Auto-response: "We'll call within 15 min"
-> System assigns to available provider
-> Provider calls consumer directly

### Authentication
*   Phone number verification via SMS code
*   Simple PIN for returning users
*   Linked to basic profile

## NOTIFICATION SYSTEM

### Channels
*   In-app (primary)
*   SMS (for critical alerts)
*   Email (daily summaries)
*   WhatsApp (future phase)

### Alerts
**Consumers:**
*   Quote received
*   Booking confirmation
*   Provider on the way
*   Payment reminders
*   Review prompts

**Providers:**
*   New job in area (SMS for high-priority)
*   Quote accepted
*   Payment received
*   New review
*   Emergency alert (SMS + app)

## DASHBOARDS

### Consumer Dashboard
**Active Jobs (2)**
*   John Electrician (Today 2PM)
*   Mary Plumber (Tomorrow 10AM)

**Upcoming (3)**
*   Weekly cleaning (Every Friday)

**Messages (1 unread)**
*   From: Mike Painter

**History**
*   Last month: 4 jobs completed
*   Total spent: KES 25,400

**Quick Actions**
*   [SOS Emergency]
*   [Book New Service]
*   [Create Group Job]

### Provider Dashboard
**Earnings This Month: KES 45,200**
*   Show/Hide toggle for privacy

**Performance**
*   Trust Score: 87/100
*   Response Rate: 92%
*   Rehire Rate: 65%
*   Jobs Completed: 24

**Calendar View**
*   Today's appointments (3)
*   Tomorrow (2)

**Emergency Alerts (1 active)**

**Job Requests (5 new)**
*   Filter by: Location, Service, Budget

**Business Tools**
*   Invoice Generator
*   Contract Templates
*   Portfolio Manager

## ASKMTAA AI ASSISTANT

### No-Loop Conversation Flow
User: "Leaking pipe in Westlands"
AskMtaa:
1.  "Emergency or can it wait?" [Buttons: Emergency | Can Wait]
2.  "Type of property?" [House | Apartment | Office]
3.  "Preferred time?" [Now | Today | This Week]
4.  Shows 3 nearby plumbers with:
    *   Availability
    *   Trust scores
    *   Estimated prices
    *   Response times

### Features
*   Context-aware: Remembers previous answers
*   No repetition: Unique responses each time
*   Action-oriented: Always leads to booking
*   Fallback: "I don't understand, let me connect you to human support"

## GAMIFICATION & RETENTION

### For Consumers
**"Mtaa Explorer" Badges**
*   First Booking: "Welcome Badge"
*   5 Different Services: "Jack of All Trades"
*   10 Reviews: "Community Leader"
*   Emergency User: "Quick Responder"

**Loyalty Program**
*   Every 5th booking: 10% credit
*   Referral bonus: KES 500 credit
*   Group booking bonus: Extra 5% off

### For Providers
**Level System**
*   Level 1 (0-10 jobs): Basic
*   Level 2 (11-50): Trusted (+5% visibility)
*   Level 3 (51-200): Expert (+10%, premium badge)
*   Level 4 (200+): Master (Featured on homepage)

**Skill Certification**
*   Platform offers free courses
*   "Solar Installation Certified" badge
*   "Emergency Response Trained" badge
*   Increases earning potential

## INVESTOR METRICS

### Key Performance Indicators
**Monthly Active Users (MAU)**
*   Target: 10,000 in Year 1

**Gross Merchandise Value (GMV)**
*   Target: KES 50M in Year 1

**Take Rate**
*   Platform fee: 5-8% per transaction
*   Premium subscriptions: 15% of users

**Retention Rates**
*   Consumer repeat booking: 40%+
*   Provider monthly active: 60%+

**Average Transaction Value**
*   Target: KES 3,500

### Growth Metrics
**Geographic Coverage**
*   Phase 1: Nairobi (20 estates)
*   Phase 2: Nairobi + Kiambu
*   Phase 3: Major cities

**Provider Network**
*   Year 1: 500 verified providers
*   Year 2: 2,000 providers

**Partnerships**
*   10 Estate management companies
*   5 Hardware store chains
*   2 Insurance providers

## TECHNICAL SPECIFICATIONS

### Frontend (Next.js)
*   Mobile-first responsive design
*   Progressive Web App capabilities
*   Offline functionality for job details
*   Swahili language support
*   Accessibility compliant

### Backend (FastAPI + Python)
*   Real-time notifications via WebSocket
*   Background jobs with Celery
*   Redis caching for performance
*   PostgreSQL with PostGIS for location
*   Automated backup system

### Security
*   End-to-end encryption for chats
*   M-Pesa API integration with webhooks
*   Rate limiting on all endpoints
*   Regular security audits
*   Data privacy compliant

## ROADMAP

### Phase 1: MVP Launch (3 Months)
*   Core booking system
*   Provider verification
*   M-Pesa payments
*   Basic reviews
*   Emergency SOS v1
*   Consumer/Provider dashboards

### Phase 2: Growth (Months 4-6)
*   Group bookings (Sambaza)
*   USSD/SMS access
*   AskMtaa AI assistant
*   Estate partnerships
*   Advanced analytics

### Phase 3: Scale (Months 7-12)
*   Nationwide expansion
*   Provider certification programs
*   Insurance partnerships
*   Equipment financing
*   Swahili full localization

## RISK MITIGATION

### Consumer Risks
*   Provider no-show: Automatic refund + find replacement
*   Poor work quality: Escrow protection + warranty
*   Safety concerns: ID verification + emergency contacts

### Provider Risks
*   Non-payment: Escrow system + consumer trust score
*   Damage claims: Insurance partnership
*   Unreliable clients: Consumer trust scores visible

### Platform Risks
*   Payment fraud: M-Pesa verification + limits
*   Fake reviews: AI detection + manual review
*   Market competition: Network effects + local focus

## UNIQUE VALUE PROPOSITIONS

### For Consumers
*   Verified Safety: Every provider ID-verified
*   Emergency Response: <30 minute help guarantee
*   Payment Protection: M-Pesa escrow for large jobs
*   Community Trust: Real neighbors, not strangers

### For Providers
*   Business Growth: Tools to go from fundi to business owner
*   Financial Access: Transaction history for loans
*   Skill Development: Certification programs
*   Predictable Income: Regular jobs through platform

### For Investors
*   Large Market: $500M+ Kenyan home services market
*   Proven Model: Adapted for Kenyan context
*   Multiple Revenue Streams: Transaction fees + subscriptions
*   Scalable: Platform ready for East Africa expansion
