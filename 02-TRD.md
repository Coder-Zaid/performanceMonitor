# ITSPRELUDE Performance System — Technical Requirements Document (TRD)

**Version:** 1.0
**Date:** 2026-05-14
**Author:** Zaid (AI Assistant for ITSPRELUDE)
**Status:** Draft

---

## 1. Architecture Overview

### 1.1 Architecture Type
Multi-tenant SaaS with microservices-inspired monolith (NestJS) + separate frontend (Next.js).

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐                │
│  │   Next.js Frontend   │  │  Mobile (Future)     │                │
│  │   (TypeScript/React) │  │  (React Native)      │                │
│  └──────────┬───────────┘  └──────────┬───────────┘                │
│             │                         │                            │
└─────────────┼─────────────────────────┼────────────────────────────┘
              │                         │
              ▼                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                                  │
│              (Nginx / AWS ALB / Vercel Edge)                        │
│  - Rate Limiting  - SSL Termination  - Request Routing              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Core API       │ │  WebSocket       │ │  Background      │
│   (NestJS)       │ │  Server          │ │  Workers         │
│                  │ │  (Real-time)     │ │  (Bull/Agenda)   │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                     │
         ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                   │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ PostgreSQL   │  │  Redis   │  │  S3      │  │  AI Engine    │  │
│  │  (Primary)   │  │  (Cache) │  │ (Files)  │  │  (Service)    │  │
│  └──────────────┘  └──────────┘  └──────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                            │
│  Email (SendGrid) │ WhatsApp API │ Slack API │ Google Sheets API   │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.3 Design Principles
- **Tenant isolation** — All queries scoped by `organization_id`
- **API-first design** — RESTful APIs as the single source of truth
- **Stateless API servers** — horizontal scaling enabled
- **Event-driven background processing** — notifications, reports, AI analysis

---

## 2. Frontend Technical Specifications

### 2.1 Framework & Libraries

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x (App Router) | SSR/SSG/ISR framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| ShadCN UI | Latest | Accessible component library |
| Framer Motion | Latest | Animations & transitions |
| Recharts | Latest | Data visualization |
| TanStack Query (React Query) | Latest | Server state management |
| React Hook Form + Zod | Latest | Form handling & validation |
| Zustand / Jotai | Latest | Client state management |
| NextAuth.js / Clerk | Latest | Authentication client |

### 2.2 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Founder Dashboard
│   │   ├── employees/
│   │   ├── departments/
│   │   ├── teams/
│   │   ├── kpi/
│   │   ├── performance/
│   │   ├── leaderboard/
│   │   ├── reports/
│   │   ├── notifications/
│   │   ├── settings/
│   │   └── admin/
│   ├── (employee)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── submit/page.tsx
│   │   ├── profile/page.tsx
│   │   └── leaderboard/page.tsx
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts
│   └── globals.css
├── components/
│   ├── ui/                    # ShadCN base components
│   ├── dashboard/             # Dashboard widgets
│   ├── forms/                 # Reusable form components
│   ├── charts/                # Chart components
│   ├── layout/                # Navbar, Sidebar, Footer
│   └── common/                # Badges, Tags, Modals
├── hooks/                     # Custom React hooks
├── lib/
│   ├── api.ts                 # API client (Axios/TRPC)
│   ├── utils.ts               # Helper functions
│   └── constants.ts           # App constants
├── stores/                    # Global state stores
├── types/                     # TypeScript type definitions
└── middleware.ts              # Auth & role-based routing
```

### 2.3 Key Frontend Requirements
- Server-side rendering for dashboards (SEO + performance)
- Client-side navigation for app-like feel
- Skeleton loaders for all data-dependent views
- Error boundaries and graceful fallbacks
- Offline support with service worker (PWA-ready)
- Responsive breakpoints: 375px → 768px → 1024px → 1440px

### 2.4 Styling Specifications
- **CSS Architecture:** Tailwind with `@layer` customization
- **Theme:** Custom design tokens via CSS variables (not generic defaults)
- **Dark Mode:** `class`-based toggling with Tailwind dark: variants
- **Typography:** Distinctive typeface pairing (e.g., Inter for body, JetBrains Mono for data/mono values — NOT generic defaults like Arial/Helvetica)
- **Color System:** 60-30-10 rule
  - **60% Primary:** Deep navy (#0F172A) surfaces with slate blue (#3B82F6) accents
  - **30% Secondary:** Cool gray (#64748B) for secondary UI elements
  - **10% Accent:** Electric amber (#F59E0B) for CTAs and status highlights

---

## 3. Backend Technical Specifications

### 3.1 Runtime & Framework

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x LTS | Runtime |
| NestJS | 11.x | Application framework |
| Express.js | 5.x | Underlying HTTP server |
| TypeScript | 5.x | Language |
| Prisma | 5.x | ORM & migrations |
| PostgreSQL | 16.x | Primary database |
| Redis | 7.x | Caching & pub/sub |
| Bull (BullMQ) | Latest | Background job queue |

### 3.2 Project Structure

```
src/
├── main.ts                     # Entry point
├── app.module.ts               # Root module
├── config/
│   ├── database.config.ts      # DB connection config
│   ├── redis.config.ts         # Redis config
│   ├── auth.config.ts          # JWT/auth config
│   ├── aws.config.ts           # S3 config
│   └── app.config.ts           # App constants
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   ├── jwt.strategy.ts
│   │   ├── local.strategy.ts
│   │   ├── interfaces/
│   │   ├── dtos/
│   │   └── entities/
│   ├── organization/
│   │   ├── organization.module.ts
│   │   ├── organization.controller.ts
│   │   ├── organization.service.ts
│   │   ├── interfaces/
│   │   ├── dtos/
│   │   └── entities/
│   ├── department/
│   │   └── (same structure)
│   ├── team/
│   │   └── (same structure)
│   ├── user/
│   │   └── (same structure)
│   ├── kpi/
│   │   └── (same structure)
│   ├── performance-entry/
│   │   └── (same structure)
│   ├── target/
│   │   └── (same structure)
│   ├── notification/
│   │   └── (same structure)
│   ├── leaderboard/
│   │   └── (same structure)
│   ├── report/
│   │   └── (same structure)
│   ├── activity/
│   │   └── (same structure)
│   └── ai-engine/
│       ├── ai.module.ts
│       ├── ai.service.ts         # AI inference & API calls
│       ├── prompts/
│       │   ├── performance.prompt.ts
│       │   ├── burnout.prompt.ts
│       │   └── forecasting.prompt.ts
│       └── interfaces/
├── filters/
│   ├── http-exception.filter.ts
│   ├── validation.filter.ts
│   └── all-exceptions.filter.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   └── tenant.guard.ts           # Ensures tenant isolation
├── interceptors/
│   ├── logging.interceptor.ts
│   ├── transform.interceptor.ts
│   └── tenant.interceptor.ts     # Injects tenant context
├── middlewares/
│   ├── rate-limit.middleware.ts
│   ├── security.middleware.ts
│   └── request-id.middleware.ts
├── decorators/
│   ├── current-user.decorator.ts
│   └── public.decorator.ts
├── common/
│   ├── interfaces/
│   ├── enums/
│   ├── constants/
│   └── utils/
└── prisma/
    ├── schema.prisma
    └── migrations/
```

### 3.3 API Design (REST)

**Base URL:** `/api/v1`

**Versioning:** URI-based (`/api/v1/...`)

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
X-Tenant-ID: <organization_id>
X-Request-ID: <uuid>
```

**Response Format:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "data": null,
  "message": "Resource not found",
  "errorCode": "NOT_FOUND",
  "details": {}
}
```

### 3.4 API Endpoints Map

#### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | Employee self-register |
| POST | `/auth/logout` | Logout |
| POST | `/auth/refresh-token` | Refresh JWT |
| POST | `/auth/forgot-password` | Password reset request |
| POST | `/auth/reset-password` | Reset password with token |

#### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | List users (admin only) |
| POST | `/users` | Create user |
| GET | `/users/:id` | Get user profile |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

#### Organizations
| Method | Endpoint | Description |
|---|---|---|
| GET | `/organizations` | List organizations (super admin) |
| POST | `/organizations` | Create organization |
| GET | `/organizations/:id` | Get organization details |
| PUT | `/organizations/:id` | Update organization & branding |
| DELETE | `/organizations/:id` | Delete organization |

#### Departments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/departments` | List departments |
| POST | `/departments` | Create department |
| PUT | `/departments/:id` | Update department |
| DELETE | `/departments/:id` | Delete department |

#### Teams
| Method | Endpoint | Description |
|---|---|---|
| GET | `/teams` | List teams |
| POST | `/teams` | Create team |
| PUT | `/teams/:id` | Update team |
| DELETE | `/teams/:id` | Delete team |

#### KPIs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/kpis` | List KPIs |
| POST | `/kpis` | Create KPI |
| PUT | `/kpis/:id` | Update KPI |
| DELETE | `/kpis/:id` | Delete KPI |

#### Performance Entries
| Method | Endpoint | Description |
|---|---|---|
| POST | `/performance-entries` | Submit daily performance |
| GET | `/performance-entries` | Get entries (with filters) |
| GET | `/performance-entries/:id` | Get specific entry |
| PUT | `/performance-entries/:id` | Update entry |

#### Targets
| Method | Endpoint | Description |
|---|---|---|
| GET | `/targets` | List targets (with filters) |
| POST | `/targets` | Create target |
| PUT | `/targets/:id` | Update target |

#### Leaderboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/leaderboard` | Get leaderboard rankings |
| GET | `/leaderboard/user/:id` | Get user rank |

#### Reports
| Method | Endpoint | Description |
|---|---|---|
| GET | `/reports/daily` | Daily report (PDF/Excel) |
| GET | `/reports/weekly` | Weekly report (PDF/Excel) |
| GET | `/reports/monthly` | Monthly report (PDF/Excel) |
| GET | `/reports/export` | Export reports |

#### AI Insights
| Method | Endpoint | Description |
|---|---|---|
| GET | `/insights/performance` | Performance trend insights |
| GET | `/insights/productivity` | Productivity analysis |
| GET | `/insights/burnout` | Burnout prediction |
| GET | `/insights/forecast` | Revenue/goal forecasting |
| GET | `/insights/summary` | Team performance summary |

#### Notifications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/notifications` | List notifications |
| PATCH | `/notifications/:id/read` | Mark as read |
| DELETE | `/notifications/:id` | Delete notification |

#### Notes & Attachments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/notes` | Create work note |
| POST | `/attachments` | Upload proof/attachment |
| GET | `/attachments/:id` | Download attachment |

---

## 4. Multi-Tenancy Strategy

### 4.1 Approach: Database-per-Tenant (Preferred for Scale)

- Each tenant (organization) gets its own PostgreSQL schema
- Shared schema for auth/tenant management tables
- Tenant resolution via JWT token claims
- Tenant context middleware injects org_id into every request

### 4.2 Tenant Configuration Table

```sql
organizations (shared schema)
├── id (UUID, PK)
├── name
├── slug (unique, URL-friendly)
├── logo_url
├── subscription_plan_id (FK → subscription_plans)
├── primary_color
├── secondary_color
├── accent_color
├── settings (JSONB)
├── stripe_customer_id
├── is_active
├── created_at
└── updated_at
```

### 4.3 Tenant Isolation Checklist
- [x] All queries scoped by `organization_id`
- [x] Tenant guard validates org membership
- [x] File uploads isolated by org bucket/path prefix
- [x] Leaderboard scoped by org
- [x] Reports filtered by org
- [x] AI insights scoped by org data
- [x] RBAC enforcement at application + DB level

---

## 5. Authentication & Security Design

### 5.1 Authentication Flow

```
1. User enters credentials → POST /auth/login
2. Server validates → Check user, password hash, org membership
3. On success → Generate JWT (access: 15min, refresh: 7d)
4. Client stores tokens → httpOnly + Secure cookies
5. On API request → JWT guard validates → Tenant guard checks org access
6. On token expiry → Automatic refresh via /auth/refresh-token
7. On logout → Invalidate refresh token, clear cookies
```

### 5.2 Security Stack

| Layer | Implementation |
|---|---|
| Transport | HTTPS + HSTS |
| Authentication | JWT + Refresh Tokens (httpOnly cookies) |
| Authorization | RBAC via Guards |
| Input Validation | Zod + class-validator |
| SQL Injection | Prisma ORM (parameterized queries) |
| XSS Prevention | Helmet.js + CSP + output encoding |
| CSRF Protection | Same-site cookies + CSRF tokens |
| Rate Limiting | Rate-limiter-flexible (login: 5/min, general: 100/min) |
| Audit Logging | Login activity + action history |
| Password Policy | bcrypt (salt rounds: 12), min 8 chars, complexity |
| 2FA | TOTP (optional, Time-based One-Time Password) |

---

## 6. Database Schema Design

### 6.1 Schema Overview

```
┌──────────────────┐     ┌──────────────────┐
│   auth_schema    │     │ tenant_schema     │
├──────────────────┤     ├──────────────────┤
│ auth_accounts    │     │ organizations     │
│ auth_sessions    │     │ users             │
│ auth_tokens      │     │ departments       │
│ auth_roles       │     │ teams             │
│ auth_permissions │     │ roles             │
│                  │     │ kpis              │
│   shared_schema  │     │ targets           │
│                  │     │ performance_logs  │
├──────────────────┤     │ leaderboards      │
│ shared_schema    │     │ notifications     │
│                  │     │ reports           │
│ organizations    │     │ activity_logs     │
│ subscriptions    │     │ attachments       │
│ audit_logs       │     │ notes             │
│                  │     │ settings          │
└──────────────────┘     └──────────────────┘
```

### 6.2 Tenant Schema — Tables

#### users
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK, auto-generated |
| org_id | UUID | FK → organizations |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| phone | VARCHAR(20) | NULL |
| designation | VARCHAR(200) | NULL |
| department_id | UUID | FK → departments |
| manager_id | UUID | FK → users (self-referential) |
| role_id | UUID | FK → roles |
| branch | VARCHAR(200) | NULL |
| joining_date | DATE | NOT NULL |
| employment_status | ENUM | DEFAULT 'active' |
| profile_image_url | TEXT | NULL |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

#### organizations
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| name | VARCHAR(255) | NOT NULL |
| slug | VARCHAR(255) | UNIQUE, NOT NULL |
| logo_url | TEXT | NULL |
| subscription_plan | VARCHAR(50) | DEFAULT 'free' |
| primary_color | VARCHAR(7) | DEFAULT '#0F172A' |
| secondary_color | VARCHAR(7) | DEFAULT '#64748B' |
| accent_color | VARCHAR(7) | DEFAULT '#F59E0B' |
| settings | JSONB | DEFAULT '{}' |
| stripe_customer_id | VARCHAR(255) | NULL |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

#### departments
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| name | VARCHAR(200) | NOT NULL |
| head_id | UUID | FK → users (nullable) |
| description | TEXT | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### teams
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| name | VARCHAR(200) | NOT NULL |
| department_id | UUID | FK → departments |
| lead_id | UUID | FK → users |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### roles
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations (nullable for super admin) |
| name | VARCHAR(100) | NOT NULL |
| description | TEXT | NULL |
| permissions | JSONB | NOT NULL (array of permission keys) |
| is_system | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### permissions
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| name | VARCHAR(100) | UNIQUE, NOT NULL |
| description | TEXT | NULL |
| resource | VARCHAR(100) | NOT NULL |
| action | VARCHAR(50) | NOT NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### kpis
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| department_id | UUID | FK → departments (nullable) |
| team_id | UUID | FK → teams (nullable) |
| name | VARCHAR(200) | NOT NULL |
| metric_type | VARCHAR(50) | NOT NULL (number, percentage, boolean, currency, text) |
| description | TEXT | NULL |
| target_value | DECIMAL(10,2) | NULL |
| unit | VARCHAR(50) | DEFAULT 'count' |
| weightage | INT | DEFAULT 1 |
| scoring_logic | JSONB | NULL (custom scoring rules) |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

#### targets
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| kpi_id | UUID | FK → kpis |
| user_id | UUID | FK → users (nullable — null = org-level) |
| department_id | UUID | FK → departments (nullable) |
| value | DECIMAL(10,2) | NOT NULL |
| period | ENUM | NOT NULL (daily, weekly, monthly, quarterly) |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### performance_entries
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| user_id | UUID | FK → users |
| kpi_id | UUID | FK → kpis (nullable) |
| submitted_value | DECIMAL(10,2) | NOT NULL |
| notes | TEXT | NULL |
| attachments | JSONB | NULL (array of file URLs) |
| submission_date | DATE | NOT NULL |
| status | ENUM | DEFAULT 'pending' (pending, approved, rejected) |
| reviewed_by | UUID | FK → users (nullable) |
| review_notes | TEXT | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

#### notifications
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → users |
| org_id | UUID | FK → organizations |
| type | VARCHAR(50) | NOT NULL (reminder, alert, achievement, escalation, report, system) |
| title | VARCHAR(200) | NOT NULL |
| message | TEXT | NOT NULL |
| data | JSONB | NULL (target ID, KPI ID, etc.) |
| channel | VARCHAR(20) | DEFAULT 'in_app' (in_app, email, whatsapp, push) |
| is_read | BOOLEAN | DEFAULT false |
| sent_at | TIMESTAMPTZ | DEFAULT NOW() |

#### reports
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| user_id | UUID | FK → users |
| type | VARCHAR(50) | NOT NULL (daily, weekly, monthly, custom) |
| format | VARCHAR(10) | NOT NULL (pdf, excel, csv) |
| title | VARCHAR(255) | NOT NULL |
| filters | JSONB | NULL |
| file_url | TEXT | NULL |
| status | ENUM | DEFAULT 'pending' (pending, generating, completed, failed) |
| generated_at | TIMESTAMPTZ | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### leaderboards
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| period | ENUM | NOT NULL (daily, weekly, monthly) |
| user_id | UUID | FK → users |
| rank | INT | NOT NULL |
| score | DECIMAL(10,2) | NOT NULL |
| kpi_breakdown | JSONB | NULL |
| week_start | DATE | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| UNIQUE(org_id, period, user_id, week_start) |

#### activities
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| user_id | UUID | FK → users |
| action | VARCHAR(100) | NOT NULL |
| entity_type | VARCHAR(50) | NULL |
| entity_id | UUID | NULL |
| ip_address | INET | NULL |
| user_agent | TEXT | NULL |
| device_info | JSONB | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### attachments
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| user_id | UUID | FK → users |
| file_url | TEXT | NOT NULL |
| file_name | VARCHAR(255) | NOT NULL |
| file_type | VARCHAR(50) | NOT NULL |
| file_size | BIGINT | NOT NULL |
| associated_entity_type | VARCHAR(50) | NULL |
| associated_entity_id | UUID | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### notes
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| user_id | UUID | FK → users |
| type | VARCHAR(50) | NOT NULL (daily_summary, blocker, comment, announcement) |
| content | TEXT | NOT NULL |
| visibility | ENUM | DEFAULT 'team' (personal, team, department, organization) |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## 7. Caching Strategy

| Data | Cache Key | TTL | Invalidation |
|---|---|---|---|
| User profile | `user:{id}:profile` | 5 min | On profile update |
| Dashboard stats | `org:{id}:dashboard:stats` | 1 min | On submission |
| Leaderboard | `org:{id}:leaderboard:{period}` | 5 min | On submission |
| KPI configurations | `org:{id}:kpis` | 1 hour | On KPI change |
| User permissions | `user:{id}:permissions` | 1 hour | On role change |

---

## 8. Background Jobs

| Job | Queue | Schedule | Description |
|---|---|---|---|
| Submission reminders | default | Daily 8AM | Send reminders for pending submissions |
| Low performance alerts | critical | Daily 9AM | Alert managers about underperformers |
| Weekly reports | reports | Monday 8AM | Auto-generate weekly reports |
| Monthly reports | reports | 1st of month, 8AM | Auto-generate monthly analytics |
| Leaderboard recalculation | leaderboard | Daily midnight | Recalculate rankings |
| Achievement checks | gamification | Hourly | Check for new achievements/streaks |
| AI insights generation | ai | Daily 10PM | Run AI analysis on latest data |
| Notification cleanup | housekeeping | Daily 1AM | Purge old notifications |
| Audit log cleanup | housekeeping | Weekly 3AM | Purge old audit logs |

---

## 9. Real-Time (WebSocket) Requirements

**Use Cases:**
- Live dashboard updates (submission counts, KPI progress)
- Leaderboard position changes
- Real-time notifications
- Team activity feeds

**Technology:** Native WebSocket via NestJS WebSocket Gateway

**Connection Lifecycle:**
```
1. Client connects → Authenticate via JWT
2. Server validates → Join room (org_id + user_id)
3. Events broadcast → Org/team-specific channels
4. On disconnect → Leave rooms, update presence status
```

---

## 10. File Storage

**Primary:** AWS S3
**Structure:**
```
s3://itsprelude/{org_id}/avatars/{user_id}.jpg
s3://itsprelude/{org_id}/proofs/{performance_entry_id}/{filename}
s3://itsprelude/{org_id}/reports/{report_id}.pdf
s3://itsprelude/{org_id}/logos/{org_id}.png
```

**File Validation:**
- Images: JPEG/PNG, max 5MB
- Documents: PDF, max 10MB
- Videos: MP4, max 50MB

---

## 11. Third-Party Integrations

| Service | Purpose | Priority |
|---|---|---|
| SendGrid | Email notifications | Phase 1 |
| WebSocket | Real-time updates | Phase 1 |
| Stripe | Subscription billing | Phase 2 |
| Slack API | Team notifications | Phase 3 |
| Google Sheets API | Data export/sync | Phase 3 |
| Jira API | Project sync | Phase 3 |
| Trello API | Task sync | Phase 3 |
| WhatsApp Business API | Mobile notifications | Phase 3 |
| Notion API | Documentation sync | Phase 4 |
| HRMS APIs | HR data import | Phase 4 |

---

## 12. Performance Requirements

| Metric | Target |
|---|---|
| API response time (p95) | < 200ms |
| API response time (p99) | < 500ms |
| Dashboard load time | < 2 seconds |
| Concurrent users | 10,000+ |
| Database query time (avg) | < 50ms |
| WebSocket message latency | < 100ms |
| Upload speed (file) | < 5 seconds (5MB) |
| Uptime SLA | 99.9% |
| Report generation | < 10 seconds |

---

## 13. Deployment & Infrastructure

### 13.1 Environment Strategy
| Environment | Purpose |
|---|---|
| Development | Local / Docker Compose |
| Staging | Pre-production testing |
| Production | Live system |

### 13.2 Infrastructure Stack
- **Hosting:** AWS (EC2/ECS) + Vercel (frontend-only option)
- **Containerization:** Docker + Docker Compose (local), ECS/EKS (production)
- **CI/CD:** GitHub Actions / GitLab CI
- **Monitoring:** Datadog / New Relic + Sentry (error tracking)
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Load Balancing:** AWS ALB / Nginx
- **CDN:** CloudFront for static assets

### 13.3 Docker Compose Stack
```yaml
services:
  frontend: next.js
  backend: nestjs
  db: postgresql:16
  redis: redis:7-alpine
  queue: redis (bullmq)
  storage: minio (dev) / S3 (prod)
```

---

## 14. Development Standards

### 14.1 Code Quality
- ESLint + Prettier (strict config)
- Husky pre-commit hooks
- SonarQube integration
- Minimum 80% test coverage

### 14.2 Testing Strategy

| Level | Tool | Coverage Target |
|---|---|---|
| Unit | Jest | 80% |
| Integration | Jest + Supertest | API endpoints |
| E2E | Playwright | User flows |
| Load | k6 | Performance benchmarks |
| Security | OWASP ZAP | Security scanning |

---

## 15. Logging & Observability

- Structured logging (JSON format)
- Request ID correlation across services
- Performance metrics collection
- Error tracking with Sentry
- Business event logging (submissions, approvals, escalations)
- Health check endpoints