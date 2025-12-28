# MtaaTrust 🇰🇪

**Find Trusted Local Pros, Not Just Recommendations**

MtaaTrust is a community-driven local services platform built for the Kenyan market, connecting homeowners with verified, neighborhood-trusted service providers. Built on transparency, verified reviews, and community vouches—not just star ratings.

##  Why MtaaTrust?

Traditional platforms fail in local contexts because:
-  Hidden kickbacks inflate prices
- Fake reviews mislead customers
-  No neighborhood-specific reputation tracking
-  Slow response times for emergencies

MtaaTrust solves this with:
- **Community Vouches**: Real neighbors endorse providers they've actually hired
- **Trust Scores**: Algorithm based on rehire rates, response times, and verified work
- **Location-First**: Find pros who specialize in *your* suburb
- **M-Pesa Integration**: Secure deposits and payments

##  Features

###  For Homeowners
-  Search providers by suburb, specialty, and availability
-  Compare transparent trust scores and rehire rates
-  Map view showing nearby vetted professionals
-  Job galleries with before/after photos
-  Emergency booking for urgent needs
-  Real-time chat with providers
-  M-Pesa payment with optional escrow

###  For Service Providers
-  Build verifiable local reputation
-  Receive quality leads (not paid clicks)
-  Performance analytics dashboard
-  Community vouch system
-  Smart booking calendar
-  Business tools (invoicing, contracts)
-  Mobile-first provider app

###  Trust & Verification
- Business registration verification
-  License validation (NCA, plumbing board)
-  Two-way review system
-  "Neighborhood Favorite" badges
-  Dispute resolution center
-  Fraud detection algorithms

##  Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Google Maps API, Africa's Talking API (M-Pesa)

**Backend:** FastAPI (Python 3.11+), PostgreSQL (with PostGIS), Redis, Celery

**Infrastructure:** Docker, Nginx, GitHub Actions CI/CD

**APIs:** M-Pesa STK Push, Africa's Talking SMS, SendGrid Email

##  Project Structure

```
mtaatrust/
├── frontend/          # Next.js 14 application
├── backend/           # FastAPI application
├── database/          # PostgreSQL schemas & migrations
├── docker/           # Docker configurations
└── docs/             # API documentation & guides
```

##  Design Philosophy

**Color Palette:**
- Primary: `#0F766E` (Teal) - Trust & professionalism
- Secondary: `#F59E0B` (Amber) - Kenyan warmth
- Background: `#F8FAFC` - Clean & accessible

**Mobile-First:** Optimized for Kenyan smartphone usage patterns
**Low-Bandwidth Friendly:** Core functionality works on 3G
**Swahili Ready:** i18n prepared for localization

##  Getting Started

1. **Clone & Setup:**
```bash
git clone https://github.com/yourusername/mtaatrust.git
cd mtaatrust
```

2. **Environment Setup:**
```bash
cp .env.example .env
# Configure your environment variables
```

3. **Run with Docker:**
```bash
docker-compose up -d
```

4. **Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📊 Core Algorithms

### Trust Score Calculation (0-100)
```
40% - Review ratings (weighted by recency)
25% - Rehire rate
15% - Average response time
10% - Job completion rate
10% - Community vouch weight
- Penalties for disputes & cancellations
```

### Intelligent Matching
- Geospatial proximity ranking
- Specialization matching
- Availability-based sorting
- Trust score prioritization
- Subscription tier consideration

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgements

- Inspired by the need for transparent local services in African markets
- Built with the Kenyan consumer and service provider in mind
- Thanks to all our early community testers and supporters

##  Contact

**Website:** [mtaatrust.co.ke](https://mtaatrust.co.ke) (coming soon)
**Twitter:** [@MtaaTrust](https://twitter.com/MtaaTrust)
**Email:** hello@mtaatrust.co.ke

---

*Built with ❤️ for Kenyan communities. Because trust should be local, verifiable, and community-driven.*
