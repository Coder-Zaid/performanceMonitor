# ITSPRELUDE Performance System

AI-powered workforce performance & productivity management platform, styled with a **Lamborghini-inspired design system** — true black surfaces, gold accents, dramatic typography.

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (Base UI) |
| **Backend** | NestJS 11, Prisma, Passport/JWT, SQLite |
| **Auth** | NextAuth v5 (Credentials provider) |
| **Charts** | Recharts |
| **Font** | Rosehot (display), Open Sans (body) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Database Setup

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 3. Environment Variables

**Backend** (`backend/.env`):
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="p3rformance_syst3m_s3cr3t_123!"
PORT=3001
```

**Frontend** (`frontend/.env.local`):
```
NEXTAUTH_SECRET=p3rformance_syst3m_s3cr3t_123!
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### 4. Run

```bash
# Terminal 1 — Backend (port 3001)
cd backend
npm run start:dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm run dev
```

Open **http://localhost:3000**

## Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Founder** | founder@prelude.com | password123 |
| **Manager** | manager@prelude.com | password123 |
| **Employee** | employee@prelude.com | password123 |

## Architecture

```
itsprelude-performance-system/
├── backend/                # NestJS API
│   ├── prisma/
│   │   ├── schema.prisma   # DB schema
│   │   ├── seed.ts         # Seed data
│   │   └── dev.db          # SQLite database
│   └── src/                # API modules (auth, users, kpis, etc.)
├── frontend/               # Next.js app
│   └── src/
│       ├── app/
│       │   ├── (auth)/     # Login, Register, Forgot Password
│       │   └── (dashboard)/# Founder, Manager, Employee dashboards
│       ├── components/
│       │   ├── layout/     # Navbar, Sidebar
│       │   └── ui/         # shadcn/ui components
│       └── lib/            # Utilities, API client
├── e2e/                    # Playwright tests
└── DESIGN.md               # Lamborghini design system spec
```

## Features

- **Role-based dashboards** — Founder, Manager, Employee views
- **KPI Management** — Define and track Key Performance Indicators
- **Performance Reviews** — Manager approval workflow
- **Leaderboard** — Gamified rankings (daily/weekly/monthly)
- **AI Insights** — Automated performance analysis
- **Department Management** — Org structure and team assignment
- **Reports Center** — Exportable data reports

## Design System

Inspired by **Lamborghini** — true black (`#000000`) canvas, Lamborghini Gold (`#FFC000`) accents, Rosehot display type for dramatic uppercase headings. Full spec in [`DESIGN.md`](./DESIGN.md).
