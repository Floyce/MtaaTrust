# Contributing to MtaaTrust

Thank you for your interest in contributing to MtaaTrust! We welcome contributions from the community to help build the most trusted local services platform in Kenya.

## Project Overview

MtaaTrust is a full-stack platform:
- **Backend**: Python (FastAPI), PostgreSQL, Redis.
- **Frontend**: TypeScript (Next.js 14), Tailwind CSS.

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

### Database Setup
1. Create a PostgreSQL database named `mtaatrust`.
2. Ensure you have the PostGIS extension enabled if working on location features:
   ```sql
   CREATE EXTENSION postgis;
   ```

### Backend Setup (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Copy `.env.example` to `.env` (if available) or create a `.env` file with:
     ```
     DATABASE_URL=postgresql+asyncpg://user:password@localhost/mtaatrust
     SECRET_KEY=your_secret_key
     ```
5. Run migrations:
   ```bash
   alembic upgrade head
   ```
6. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Code Style

### Backend
- Follow PEP 8 guidelines.
- Use `pydantic` for data validation.
- Type hints are mandatory.

### Frontend
- Use TypeScript for all components.
- Use Tailwind CSS for styling (avoid custom CSS files where possible).
- Follow the directory structure:
  - `components/ui`: Reusable atomic components.
  - `app/`: Page routes and layouts.

## Pull Request Process
1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Issue that pull request!

## License
By contributing, you agree that your contributions will be licensed under the project's MIT License.
