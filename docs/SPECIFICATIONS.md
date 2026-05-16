# ITSPRELUDE Performance System — Product Requirements Document (PRD)

**Version:** 1.0
**Date:** 2026-05-14
**Author:** Zaid (AI Assistant for ITSPRELUDE)
**Status:** Draft

---

## 1. Product Overview

### 1.1 Product Name
**ITSPRELUDE Performance System**

### 1.2 Product Type
AI-Powered Workforce Performance & Productivity Management Platform (SaaS)

### 1.3 Product Goal
Build a scalable internal SaaS platform that helps organizations track employee performance, monitor KPIs, improve accountability, manage productivity, and generate business intelligence across teams.

### 1.4 Core Value Proposition
- **Real-time team visibility** — instant insight into who's performing, who's lagging, and where bottlenecks exist
- **AI-powered insights** — predictive analytics for burnout, productivity trends, revenue forecasting
- **Gamified engagement** — XP points, badges, streaks, leaderboards to drive intrinsic motivation
- **Zero-config KPI management** — dynamic KPI builder with custom scoring logic per department
- **Multi-tenant by design** — serve startups to mid-sized enterprises from a single codebase

### 1.5 Target Audience
| Segment | Examples |
|---|---|
| Startups | Early-stage companies scaling teams |
| Agencies | Digital, creative, marketing agencies |
| Sales Organizations | Sales teams needing conversion tracking |
| Recruitment Firms | Hiring pipelines with performance metrics |
| Service Businesses | Consulting, IT services, outsourcing firms |
| Mid-sized Enterprises | 50–500 employee companies |

---

## 2. Business Objectives

| # | Objective |
|---|---|
| B1 | Improve team accountability across all departments |
| B2 | Increase productivity tracking granularity and accuracy |
| B3 | Improve sales conversion visibility |
| B4 | Reduce manual reporting effort by 70% |
| B5 | Enable data-driven decision making at all levels |
| B6 | Identify high/low performers quickly with AI analytics |
| B7 | Build a scalable workforce management system |

---

## 3. User Roles & Access Levels

### 3.1 Super Admin
- **Access:** Complete platform control
- **Permissions:** Manage organizations, manage subscription plans, global analytics, system configurations, security monitoring
- **Actions:** Create/delete organizations, configure global settings, monitor platform health

### 3.2 Company Admin / Founder
- **Access:** Full company visibility
- **Permissions:** All departments, revenue analytics, team productivity analytics, KPI settings, employee management
- **Actions:** Add/remove employees, create departments, assign roles, create targets, configure KPIs, view/export reports, access AI insights

### 3.3 Department Head / Team Manager
- **Access:** Only assigned departments
- **Permissions:** Team performance data, team reports, team targets
- **Actions:** Review submissions, approve updates, monitor targets, add comments, escalate issues

### 3.4 Employee / Team Member
- **Access:** Personal dashboard only
- **Permissions:** Personal KPI tracking, assigned tasks
- **Actions:** Submit daily reports, upload work proof, view personal analytics, view leaderboard rank, update profile

---

## 4. System Modules

### 4.1 Authentication & Security Module
**Features:**
- Secure login with JWT authentication
- Role-based access control (RBAC)
- Password hashing (bcrypt)
- Session management with device tracking
- Login activity logs
- Password reset flow
- Optional 2FA support
- HTTPS enforcement
- Rate limiting

### 4.2 Organization Management Module
**Features:**
- Multi-company support
- Department creation and management
- Branch/location management
- Team structure management
- Role assignment
- Employee onboarding workflow
- Company logo upload & branding

### 4.3 Employee Management Module
**Features:**
- Employee profiles
- Designation management
- Department assignment
- Reporting hierarchy management
- Employment status tracking (Active, On Leave, Terminated, Probation)

**Employee Data Fields:**
- Employee ID
- Name
- Email
- Phone Number
- Designation
- Department
- Reporting Manager
- Joining Date
- Employment Status
- Branch
- Profile Image

### 4.4 Daily Performance Tracking Module
**Sales Team KPIs:**
| KPI Field | Description |
|---|---|
| Calls Made | Number of sales calls |
| Messages Sent | Outreach messages |
| Leads Generated | New leads created |
| Meetings Booked | Scheduled meetings |
| Follow-ups Completed | Follow-up actions done |
| Closures Achieved | Deals closed |
| Revenue Generated | Revenue from closures |
| Conversion Percentage | Lead-to-close ratio |

**Content Team KPIs:**
| KPI Field | Description |
|---|---|
| Posts Published | Content published |
| Reels Created | Video reels |
| Stories Posted | Stories/updates |
| Engagement Generated | Likes, comments, shares |
| Reach Achieved | Unique viewers |
| Content Consistency | Posting regularity score |
| Campaigns Completed | Campaign count |
| Engagement Rate | Engagement/reach ratio |
| Reach Growth | Growth over time |
| Content Productivity Score | Composite score |

**Tech Team KPIs:**
| KPI Field | Description |
|---|---|
| Tasks Completed | Finished tasks |
| Bugs Fixed | Resolved issues |
| Features Delivered | Shipped features |
| Sprint Completion | Sprint velocity |
| Code Review Status | Review metrics |
| Deployment Status | Deploy frequency |
| Task Complexity Score | Weighted task difficulty |
| Completion Efficiency | Actual vs estimated |
| Bug Resolution Time | Mean time to resolve |
| Sprint Velocity | Points per sprint |
| Delivery Consistency | On-time delivery rate |

### 4.5 Dynamic KPI Builder
- Create custom KPIs per department/team
- Assign KPI types (numeric, percentage, boolean)
- Define scoring logic with configurable weights
- Set department-specific KPI forms

**Example — HR Team:**
- Interviews Scheduled
- Candidates Hired
- Offer Letters Released

### 4.6 Dashboard System

#### 4.6.1 Founder Dashboard
- Total revenue
- Total leads
- Active employees
- Team productivity score
- Conversion funnel
- Department performance
- AI insights panel

**Charts Required:**
- Revenue graphs
- KPI progress charts
- Conversion analytics
- Team comparison charts
- Heatmaps
- Performance trends

#### 4.6.2 Team Head Dashboard
- Team activity overview
- Pending submissions
- Team target completion
- Team leaderboard
- Employee performance comparison
- Department analytics

#### 4.6.3 Employee Dashboard
- Personal KPI progress
- Daily/weekly targets
- Performance score
- Leaderboard rank
- Achievement streaks
- Personal analytics

### 4.7 Leaderboard & Gamification Module
**Features:**
- Daily, weekly, monthly rankings
- XP points system
- Achievement badges
- Performance streaks
- Team competitions
- Rewards system

**Ranking Logic (Sales):**
- Closures
- Revenue
- Meetings
- Content engagement
- Consistency
- Reach

**Ranking Logic (Tech):**
- Task completion
- Bug fixes
- Sprint performance

### 4.8 KPI & Target Management Module
- Daily/weekly/monthly targets
- Department-level targets
- Organization-level goals
- Goal completion tracking with progress indicators

**Progress Indicators:**
- 🟢 Green = On Track (≥80%)
- 🟡 Yellow = Warning (50–79%)
- 🔴 Red = Critical (<50%)

### 4.9 AI Insights & Analytics Engine
**Purpose:** Provide business intelligence and predictive insights.

**AI Features:**
- Performance trend analysis
- Productivity insights
- Inactivity detection
- Burnout prediction
- Revenue forecasting
- Goal prediction
- Team performance summaries

**Example Outputs:**
- "Sales conversion dropped 18% this week."
- "Content engagement increased after reels."
- "3 employees are underperforming consistently."

### 4.10 Alerts & Notification System
**Notification Types:**
- Daily reminder notifications
- Missed submission alerts
- Low performance alerts
- Achievement notifications
- Weekly report notifications
- Manager escalation alerts

**Channels:**
- In-app notifications
- Email notifications
- WhatsApp integration (future)
- Push notifications

### 4.11 Reporting System
**Reports:**
- Daily, weekly, monthly reports
- Department reports
- Employee reports
- Revenue reports
- KPI reports

**Export Formats:**
- PDF
- Excel
- CSV

**Auto-generated Reports:**
- Weekly summaries
- Monthly analytics
- Performance trends

### 4.12 Notes & Work Updates Module
- Daily summaries
- Blocker/issues reporting
- Manager comments
- Proof uploads (images, documents, PDFs, screenshots)
- Attachment support

### 4.13 Activity Monitoring Module
- Login tracking
- Submission history
- Work consistency tracking
- Active/inactive user detection
- Session monitoring

---

## 5. Multi-Tenant SaaS Architecture Requirements

- Support multiple organizations on a single platform
- Separate databases/schema per tenant
- Tenant isolation at data level
- Organization-level branding (logo, colors)
- Independent user management per organization

---

## 6. Integration Requirements (Future)

| Integration | Type |
|---|---|
| Slack | Communication |
| WhatsApp | Messaging |
| Google Sheets | Data Sync |
| Jira | Project Management |
| Trello | Project Management |
| Notion | Documentation |
| CRM Systems | Sales Pipeline |
| HRMS Platforms | HR Data |

---

## 7. Recommended Technology Stack

### Frontend
- **Framework:** Next.js (React.js)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** ShadCN UI
- **Animations:** Framer Motion
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js
- **Framework:** NestJS / Express.js
- **APIs:** REST API + WebSocket support
- **Database:** PostgreSQL
- **Caching:** Redis
- **ORM:** Prisma

### Authentication
- JWT tokens with refresh token rotation
- Optional: Clerk / Auth0 integration

### Cloud & Deployment
- **Hosting:** AWS / Vercel
- **Containerization:** Docker
- **Storage:** AWS S3 (files, uploads)

---

## 8. Database Structure (High-Level)

| Table | Purpose |
|---|---|
| Organizations | Stores organization info |
| Departments | Department management |
| Teams | Team structure |
| Users | User accounts & profiles |
| Roles | Permission roles |
| Permissions | Access control definitions |
| KPIs | KPI definitions & configurations |
| Targets | Target values & deadlines |
| PerformanceEntries | Daily performance submissions |
| Notifications | Notification queue |
| Reports | Generated reports |
| Leaderboards | Ranking data |
| Activities | User activity logs |
| Attachments | File uploads & proofs |

---

## 9. UI/UX Requirements

### Design Goals
- Minimal and clean interface
- Fast loading dashboards
- Data-driven visual hierarchy
- Mobile-first responsive design
- Easy navigation (maximum 2-click to any feature)
- Dark mode and Light mode support

### UI Features
- KPI cards with status indicators
- Charts and analytics visualizations
- Quick submission forms
- Status indicators (traffic light system)

### UX Principles
- Maximum 2-click navigation to any feature
- Simple data entry workflows
- Fast-loading dashboards (<2s)
- Real-time updates

---

## 10. Performance & Scalability Requirements

- Support 10,000+ concurrent users
- Fast API response times (<200ms for standard queries)
- Real-time dashboard updates via WebSocket
- Optimized database queries with indexing
- Redis caching for frequently accessed data
- API pagination for large datasets
- Lazy loading for dashboard components
- CDN support for static assets

---

## 11. Security Requirements

**Must-Have Security Features:**
- Encrypted passwords (bcrypt, salt rounds ≥ 12)
- Secure API endpoints with middleware validation
- Role-based permissions enforcement
- Login activity logging
- Rate limiting on authentication endpoints
- SQL injection prevention (parameterized queries)
- XSS protection (input sanitization, CSP headers)
- CSRF protection tokens
- HTTPS enforcement (HSTS)

---

## 12. Roadmap (Phased Delivery)

### Phase 1 — Foundation
- Authentication & Security
- Employee Management
- KPI Tracking
- Dashboards
- Reporting System

### Phase 2 — Intelligence
- AI Insights Engine
- Gamification & Leaderboards
- Notifications System
- Mobile Optimization

### Phase 3 — Scale
- Third-party Integrations (Slack, Google Sheets, Jira, etc.)
- Predictive Analytics
- Enterprise Features
- Mobile Apps

### Phase 4 — Maturity
- AI Assistant (conversational insights)
- Voice Reporting
- Advanced Analytics
- White-Label SaaS offering

---

## 13. Success Metrics

### Product KPIs
- Daily active users (DAU)
- Submission completion rate
- Team productivity improvement
- Decision-making speed by managers

### Business KPIs
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate
- Average organization size
- Trial-to-paid conversion rate
- Net Revenue Retention (NRR)

### Customer Success Metrics
- Increase in employee productivity
- Faster decision-making by managers
- Reduction in missed targets
- Increased revenue visibility
- Reduced manual reporting efforts
- Higher team accountability
- Faster execution cycles

---

## 14. Success Metrics

### Product KPIs
- Daily active users (DAU)
- Submission completion rate
- Team productivity improvement
- Decision-making speed by managers

### Business KPIs
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate
- Average organization size
- Trial-to-paid conversion rate
- Net Revenue Retention (NRR)

### Customer Success Metrics
- Increase in employee productivity
- Faster decision-making by managers
- Reduction in missed targets
- Increased revenue visibility
- Reduced manual reporting efforts
- Higher team accountability
- Faster execution cycles
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
# ITSPRELUDE Performance System — Master Build Spec

**Version:** 2.0
**Date:** 2026-05-14
**Target:** AI-Assisted Build (Gemini / Cursor / Copilot)
**Priority:** Load efficiency, bundle size, render performance

---

## 0. Performance Architecture (Why This Is Fast)

### 0.1 Rendering Budget
```
Metric              Target          Enforcement
─────────────────────────────────────────────────
LCP (Largest Contentful Paint)   < 1.8s    Lighthouse CI
TTI (Time to Interactive)        < 2.5s    Lighthouse CI
FID (First Input Delay)          < 50ms    Web Vitals
CLS (Cumulative Layout Shift)    < 0.1     Web Vitals
API response (p95)               < 200ms   Datadog
Chart render                     < 500ms   Manual
List render (1000 rows)          < 200ms   Virtualized
Bundle (initial JS)              < 150KB  Bundle analyzer
Bundle (initial CSS)             < 30KB   Bundle analyzer
```

### 0.2 Component Split Strategy
```
SERVER COMPONENTS (Next.js RSC):
├─ Layout shell (sidebar, navbar, footer)
├─ Static page headers & breadcrumbs
├─ SEO metadata
├─ Initial data loading (parallel fetch)
└─ Permission gates (redirect if unauthorized)

CLIENT COMPONENTS (interactive):
├─ Dashboard widgets (data refresh)
├─ Forms (input, validation, submit)
├─ Charts (Recharts)
├─ Tables (sort, filter, paginate)
├─ Notifications dropdown
├─ Theme toggle
└─ All "use client" boundaries

LAZY LOADED (dynamic import):
├─ Chart components (85KB → 0KB initial)
├─ PDF/Excel export (120KB → 0KB initial)
├─ AI Insights panel (200KB → 0KB initial)
├─ Markdown editor (60KB → 0KB initial)
└─ Leaderboard table (virtualized)
```

### 0.3 Data Loading Strategy
```
┌─ Page Request ─────────────────────────────┐
│                                             │
│  1. Server: Auth check + Permission gate    │
│  2. Server: Parallel data fetch (Suspense)  │
│     ├─ GET /api/user/profile                │
│     ├─ GET /api/dashboard/summary           │
│     └─ GET /api/notifications/unread-count  │
│                                             │
│  3. Stream HTML with Suspense boundaries    │
│     ├─ <Suspense fallback={<Skeleton />}    │
│     │     └─ DashboardWidget                │
│     ├─ <Suspense fallback={<Skeleton />}    │
│     │     └─ ChartsSection                  │
│     └─ <Suspense fallback={<Skeleton />}    │
│           └─ LeaderboardPreview             │
│                                             │
│  4. Client: Hydrate + WebSocket connect     │
│  5. Client: Start polling (if no WS)        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 1. Design Tokens (CSS Custom Properties)

Use Tailwind CSS with these custom tokens. Keep Tailwind config at minimum — only 15 custom colors, 5 spacing values, 3 radii.

### 1.1 Colors (8 total — all others are derived)
```css
:root {
  /* SURFACES (60%) */
  --surface-primary: #0F172A;      /* bg, headers, sidebar */
  --surface-secondary: #1E293B;    /* cards, modals, inputs */
  --surface-tertiary: #334155;     /* borders, dividers */

  /* TEXT & UI (30%) */
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --border-default: #334155;
  --border-hover: #475569;

  /* ACCENT (10%) */
  --accent-action: #F59E0B;        /* CTAs, active states */
  --accent-success: #10B981;       /* on-track, positive */
  --accent-danger: #EF4444;        /* off-track, negative */

  /* SEMANTIC (derived via opacity) */
  --accent-action-hover: #D97706;
  --accent-action-muted: rgba(245, 158, 11, 0.15);
  --accent-success-muted: rgba(16, 185, 129, 0.15);
  --accent-danger-muted: rgba(239, 68, 68, 0.15);
}

[data-theme="light"] {
  --surface-primary: #F8FAFC;
  --surface-secondary: #FFFFFF;
  --surface-tertiary: #E2E8F0;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #94A3B8;
  --border-default: #E2E8F0;
  --border-hover: #CBD5E1;
}
```

### 1.2 Typography (3 fonts, no Google Fonts delay)
```css
/* @font-face with font-display: swap — ZERO layout shift */
/* Load Inter + JetBrains Mono. Manrope is optional — fallback to Inter */
/* Bundle: Inter (~45KB woff2), JetBrains Mono (~30KB woff2) — self-hosted */

:root {
  --font-display: 'Manrope', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace;

  /* Type scale — only 6 sizes needed */
  --text-hero: clamp(1.75rem, 2.5vw, 2rem);     /* 28–32px */
  --text-heading: clamp(1.125rem, 1.5vw, 1.25rem); /* 18–20px */
  --text-body: clamp(0.875rem, 1vw, 1rem);         /* 14–16px */
  --text-small: 0.875rem;                           /* 14px */
  --text-caption: 0.75rem;                          /* 12px */
  --text-data: clamp(1.25rem, 2vw, 1.5rem);         /* 20–24px for KPI numbers */
}
```

### 1.3 Spacing (5 values — keep it simple)
```css
:root {
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px — base unit */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
}
```

### 1.4 Corner Radius (3 values max)
```css
:root {
  --radius-sm: 0.375rem;  /* 6px — inputs, buttons */
  --radius-md: 0.5rem;    /* 8px — cards */
  --radius-lg: 0.75rem;   /* 12px — modals, drawers */
}
/* NO: 16px, 9999px, or custom radii — adds rendering overhead */
```

### 1.5 Shadows (1 level — only for modals)
```css
:root {
  --shadow-modal: 0 4px 24px rgba(0,0,0,0.3);
}
/* NO: card shadows, hover shadows, glow effects — wasted GPU cycles */
/* Cards use 1px border instead of shadows for depth */
```

---

## 2. Component Tree (Build Order)

Build in this exact order — each phase is independently shippable.

### Phase 1: Shell (Day 1-2)
```
app/
├── layout.tsx                    ← RSC, server
│   ├── <ThemeProvider>           ← client, reads localStorage
│   ├── <TopNavbar>              ← RSC shell
│   └── <Sidebar>                ← RSC shell
├── page.tsx                      ← RSC, redirect to /dashboard
├── (auth)/
│   ├── login/page.tsx           ← client form, no JS needed to render
│   ├── register/page.tsx        ← client form
│   └── forgot-password/page.tsx ← client form
└── (dashboard)/
    └── layout.tsx               ← RSC, checks auth, renders sidebar
```

### Phase 2: Employee Dashboard (Day 3-4)
```
(dashboard)/employee/
├── page.tsx                      ← RSC, parallel data fetch
│   ├── <DailyTargetsCard>       ← client, auto-refresh
│   ├── <SubmissionForm>         ← client, dynamic KPI fields
│   ├── <PerformanceSummary>     ← client, Recharts lazy
│   └── <YourRank>               ← server, static data
└── submit/page.tsx              ← client form
```

### Phase 3: Manager Dashboard (Day 5-6)
```
(dashboard)/manager/
├── page.tsx                      ← RSC
│   ├── <TeamActivityOverview>   ← client
│   ├── <PendingReviewsList>     ← client
│   ├── <TargetProgressBar>      ← client
│   └── <UnderperformersTable>   ← client, virtualized
└── review/[id]/page.tsx         ← client
```

### Phase 4: Founder Dashboard (Day 7-8)
```
(dashboard)/founder/
├── page.tsx                      ← RSC
│   ├── <KpiSummaryGrid>         ← client, 4 cards
│   ├── <ConversionFunnel>       ← client, Recharts lazy
│   ├── <WeeklyTrends>           ← client, Recharts lazy
│   ├── <LeaderboardPreview>     ← RSC, top 5 only
│   └── <AiInsightsPanel>        ← client, lazy loaded
└── analytics/page.tsx           ← client, full Recharts
```

### Phase 5: Admin Pages (Day 9-12)
```
(dashboard)/admin/
├── employees/                    ← RSC list, client actions
│   ├── page.tsx                  ← table, virtualized
│   └── [id]/page.tsx            ← form
├── departments/                  ← CRUD
├── teams/                       ← CRUD
├── kpis/                        ← dynamic KPI builder
├── targets/                     ← bulk editor
├── leaderboard/                 ← full table, filters
├── reports/                     ← generate + download
└── settings/                    ← org branding
```

---

## 3. Component Spec — Every Component Needs These States

### 3.1 KpiCard
```
PROPS:
  title: string          // e.g. "Calls Made"
  icon: string           // Lucide icon name
  current: number
  target: number
  trend: 'up' | 'down' | 'flat'
  trendValue: string     // e.g. "+5%"
  unit?: string          // e.g. "calls", "$", "%"

STATES:
  ┌─ loading ──────────────────────────────┐
  │  <Skeleton variant="rounded" h={120} /> │
  └─────────────────────────────────────────┘
  ┌─ empty (no data yet) ─────────────────┐
  │  📞 Calls Made                         │
  │  -- / --                               │
  │  ────────────────────────              │
  │  No data for today                     │
  └─────────────────────────────────────────┘
  ┌─ normal ───────────────────────────────┐
  │  📞 Calls Made                         │
  │  30 / 50                               │
  │  ▓▓▓▓▓▓▓▓▓░░░░░░░░ 60%                │
  │  ▲ +5% from yesterday                  │
  └─────────────────────────────────────────┘
  ┌─ error ───────────────────────────────┐
  │  📞 Calls Made                         │
  │  ┌─ Could not load ──────┐            │
  │  │  [Retry]              │            │
  │  └───────────────────────┘            │
  └─────────────────────────────────────────┘

BEHAVIOR:
  - Re-fetches every 60s via SWR/React Query
  - Trend color: green for up, red for down, gray for flat
  - Progress bar: green (>=80%), amber (50-79%), red (<50%), gray (empty)
  - NO animation on mount — renders final state immediately

SERVER FETCH:
  GET /api/kpis?userId={id}&date=today
  → { kpis: [{ id, name, icon, current, target, trend, trendValue }] }
```

### 3.2 SubmissionForm
```
PROPS:
  kpis: Array<{ id: string; name: string; type: 'number' | 'percentage' | 'boolean' }>
  onSubmit: (data: SubmissionData) => Promise<void>

STATES:
  ┌─ loading ──────────────────────────────┐
  │  3 skeleton input fields               │
  └─────────────────────────────────────────┘
  ┌─ empty ───────────────────────────────┐
  │  "No KPIs configured yet. Ask your    │
  │   manager to set up KPIs."            │
  └─────────────────────────────────────────┘
  ┌─ form ────────────────────────────────┐
  │  [Calls Made]   [30    ] ✓ valid      │
  │  [Messages Sent][50    ] ✓ valid      │
  │  [Leads]        [8     ] ✓ valid      │
  │  [Notes]        [textarea         ]   │
  │  [📎 Attach] [▶ Submit]               │
  └─────────────────────────────────────────┘
  ┌─ submitting ──────────────────────────┐
  │  Button: spinner + "Submitting..."     │
  │  All fields disabled                   │
  └─────────────────────────────────────────┘
  ┌─ success ────────────────────────────┐
  │  ✅ "Submitted! Streak: 5 days 🔥"    │
  │  [View Analytics] [Done]              │
  └─────────────────────────────────────────┘
  ┌─ error ───────────────────────────────┐
  │  ❌ "Connection lost. Saving draft..." │
  │  [Retry] [Save Draft]                 │
  └─────────────────────────────────────────┘

VALIDATION:
  - fields are required if KPI is active
  - numeric fields: min 0, max 100000
  - Notes: max 500 chars
  - Attachments: max 5MB, images/docs only

BEHAVIOR:
  - Auto-saves draft to localStorage every 30s
  - If offline: queue submission, retry on reconnect
  - On submit: POST /api/performance-entries
```

### 3.3 DataTable (Virtualized)
```
PROPS:
  columns: ColumnDef[]
  data: Row[]
  totalRows: number
  pageSize?: number  // default 25
  onSort?: (col: string, dir: 'asc' | 'desc') => void
  onFilter?: (filters: Filter[]) => void
  onRowClick?: (row: Row) => void

STATES:
  loading → 5 skeleton rows (same column widths as real data)
  empty → "No data" illustration + CTA
  error → Error message + Retry button
  normal → Virtualized rows (only render 25 + overscan 5)
  filtering → URL params update, no re-render of header

PERFORMANCE:
  - Virtualized: only render visible rows + 5 overscan
  - Columns: fixed width where known, content-based otherwise
  - Sorting: server-side (send sort params → API)
  - Filtering: debounced 300ms, server-side
  - NO row animations (reduces layout thrashing)
  - useMemo for sorted/filtered data
```

### 3.4 ConversionFunnel
```
PROPS:
  data: Array<{ label: string; value: number; percentage: number }>
  // e.g. [{ label: 'Calls', value: 1200, pct: 100 },
  //        { label: 'Leads', value: 400, pct: 33.3 },
  //        { label: 'Meetings', value: 80, pct: 6.7 },
  //        { label: 'Closures', value: 20, pct: 1.7 }]

STATES:
  loading → <Skeleton variant="rounded" h={300} />
  empty   → "Start tracking to see your funnel"
  normal  → Funnel chart (Recharts)
  error   → "Could not load funnel data"

PERFORMANCE:
  - LAZY LOADED via next/dynamic — 0KB in initial bundle
  - Recharts tree-shakable: only import Funnel + ResponsiveContainer
  - NO custom animations (Recharts default is enough)
  - ResponsiveContainer with debounced resize (100ms)
```

### 3.5 AiInsightsPanel
```
PROPS:
  orgId: string

STATES:
  loading → 3 skeleton cards
  empty   → "AI analysis runs nightly. Check back tomorrow."
  normal  → Cards with NL insight text
  error   → "AI service unavailable" (non-blocking)

PERFORMANCE:
  - LAZY LOADED — never in critical bundle
  - Data fetched from GET /api/insights (cached 1 hour)
  - Insights cached — only refresh on page focus
  - Renders as plain text cards — NO markdown renderer needed
```

---

## 4. Route Design (Next.js App Router)

```
/                                    → redirect to dashboard
/login                               → auth (public)
/register                            → auth (public)
/forgot-password                     → auth (public)

/(dashboard)/employee/dashboard      → employee home
/(dashboard)/employee/submit         → daily submission
/(dashboard)/employee/profile        → user settings

/(dashboard)/manager/dashboard       → team overview
/(dashboard)/manager/team/[id]       → team detail
/(dashboard)/manager/review/[id]     → approve/reject submission

/(dashboard)/founder/dashboard       → org overview
/(dashboard)/founder/employees       → CRUD (admin)
/(dashboard)/founder/departments     → CRUD
/(dashboard)/founder/teams           → CRUD
/(dashboard)/founder/kpis            → KPI builder
/(dashboard)/founder/targets         → target management
/(dashboard)/founder/leaderboard     → full leaderboard
/(dashboard)/founder/reports         → generate & download
/(dashboard)/founder/reports/[id]    → report detail
/(dashboard)/founder/settings        → org settings
/(dashboard)/founder/analytics       → full analytics

/(dashboard)/admin/organizations     → super admin

/api/*                               → API routes (separate NestJS server)
```

**Middleware (permissions):**
```
/login           → no auth needed
/register        → no auth needed
/forgot-password → no auth needed
/employee/*      → role: employee | manager | founder | super_admin
/manager/*       → role: manager | founder | super_admin
/founder/*       → role: founder | super_admin
/admin/*         → role: super_admin only
```

---

## 5. State Management

| State Type | Solution | Why |
|---|---|---|
| Server data | TanStack Query (React Query) | Caching, dedup, refetch, pagination |
| Auth state | NextAuth.js / Clerk session | Built-in, secure, httpOnly cookies |
| Form state | React Hook Form + Zod | Minimal re-renders, validation |
| UI state (sidebar, theme) | Zustand | Tiny (1KB), no boilerplate |
| URL state (filters, page) | useSearchParams | Shareable, back-button |
| Real-time | WebSocket (NestJS Gateway) | Only for live updates on open tab |

**No Redux, Recoil, Jotai** — unnecessary bundle weight.

### 5.1 React Query Config
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,       // 1 min — dashboard data
      gcTime: 5 * 60_000,      // 5 min — keep in cache
      refetchOnWindowFocus: true,
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
    },
  },
});
```

---

## 6. Bundle Optimization

### 6.1 What Goes in the Critical Bundle
```
next.js core          ~50KB (gzip)
react + react-dom     ~45KB (gzip)
zustand               ~1KB
react-hook-form       ~9KB
tanstack query        ~13KB
Custom CSS (Tailwind) ~15KB (purged)
────────────────────────────
TOTAL initial JS      ~133KB (gzip)  ← under 150KB budget
```

### 6.2 Lazy Load Boundaries
```typescript
// These components are NOT in the initial bundle
const DailyChart = dynamic(() => import('@/components/charts/DailyChart'), {
  loading: () => <SkeletonChart />,
  ssr: false,  // charts don't need SSR
});

const ExportButton = dynamic(() => import('@/components/ExportButton'), {
  loading: () => <Button disabled>Export</Button>,
});

const AiPanel = dynamic(() => import('@/components/AiInsightsPanel'), {
  loading: () => <SkeletonCards count={3} />,
});
```

### 6.3 Image Optimization
```typescript
// Use Next.js Image component for ALL images
import Image from 'next/image';

// Organization logos: use remote pattern
// next.config.js:
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'itsprelude-bucket.s3.amazonaws.com' },
  ],
}

// Avatars: use <Avatar> component with fallback initials
// NO external avatar libraries — 5-line utility component
```

### 6.4 Font Loading — Zero CLS
```html
<!-- FOUT with font-display: swap — no invisible text -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" crossorigin />
<link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" crossorigin />
```

---

## 7. CSS Strategy

### 7.1 Tailwind Config (Minimal)
```javascript
// tailwind.config.js — keep under 100 lines
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#0F172A', secondary: '#1E293B', tertiary: '#334155' },
        text: { primary: '#F1F5F9', secondary: '#94A3B8', muted: '#64748B' },
        accent: { action: '#F59E0B', success: '#10B981', danger: '#EF4444' },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '0.375rem', md: '0.5rem', lg: '0.75rem',
      },
      boxShadow: {
        modal: '0 4px 24px rgba(0,0,0,0.3)',
      },
    },
  },
};
```

### 7.2 CSS Rules for Performance
```
1. All animations use transform + opacity only (compositor-friendly)
2. No will-change on static elements
3. CSS containment on widgets: contain: content
4. No @keyframes on heavy-animated elements (use transitions)
5. Sidebar uses position: sticky, not fixed (avoids repaint on scroll)
6. Tables use contain: strict on rows
7. NO CSS @import — all Tailwind, all compiled
8. PurgeCSS removes all unused — keep content glob precise
```

---

## 8. Component Implementation Notes

### 8.1 Sidebar
```typescript
// RENDER: server component (no JS needed)
// INTERACTION: client component wrapper for collapse toggle
// DATA: menu items from constant config + permissions check
// STATE: collapsed/expanded persisted in localStorage
// PERFORMANCE: CSS transition only (transform), no JS animation
// Z-INDEX: 40 (below modals)
// MOBILE: transforms off-screen, overlay when open
```

### 8.2 TopNavbar
```typescript
// RENDER: server component shell
// CLIENT: profile dropdown + notification bell (lazy)
// DATA: session from NextAuth
// HEIGHT: 56px (--space-xl * 1.75) — fixed, no content shift
// STICKY: sticks to top, content scrolls beneath
```

### 8.3 Notifications Bell
```typescript
// RENDER: client, lazy loaded
// STATE: count from React Query (polls every 60s)
// DROPDOWN: <DropdownMenu> from ShadCN — renders on click
// UNREAD BADGE: CSS-only pseudo-element (no JS for number <1)
// WEBSOCKET: subscribe to notification:new event for real-time count
```

---

## 9. API Contract (Frontend Expectations)

### 9.1 Standard Response Format
```typescript
// All API responses follow this shape:
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Error responses:
interface ApiError {
  success: false;
  message: string;
  errorCode: string;
  details?: Record<string, string[]>; // field → error messages
}
```

### 9.2 Endpoints per Component

| Component | Endpoint | Params | Cache |
|---|---|---|---|
| KpiCard x4 | `GET /api/dashboard/kpi-summary` | orgId, date | 60s |
| SubmissionForm | `POST /api/performance-entries` | userId, kpiValues, notes | N/A |
| ConversionFunnel | `GET /api/analytics/conversion-funnel` | orgId, from, to | 300s |
| WeeklyTrends | `GET /api/analytics/weekly-trends` | orgId, deptId | 300s |
| LeaderboardPreview | `GET /api/leaderboard?limit=5` | orgId, period | 60s |
| AiInsightsPanel | `GET /api/insights` | orgId | 3600s |
| DataTable (employees) | `GET /api/users?page=&limit=&sort=&filter=` | orgId | 30s |
| TeamActivityOverview | `GET /api/teams/{id}/activity` | teamId | 30s |
| PendingReviewsList | `GET /api/performance-entries?status=pending` | orgId, reviewerId | 30s |

### 9.3 Optimistic Updates
```typescript
// SubmissionForm uses optimistic update:
// 1. Update UI immediately with submitted value
// 2. POST to server in background
// 3. On success: invalidate KPI cards + leaderboard
// 4. On error: rollback to previous value + show error toast

const mutation = useMutation({
  mutationFn: (data) => api.post('/performance-entries', data),
  onMutate: async (newEntry) => {
    await queryClient.cancelQueries({ queryKey: ['kpis'] });
    const previous = queryClient.getQueryData(['kpis']);
    queryClient.setQueryData(['kpis'], (old) => optimisticUpdate(old, newEntry));
    return { previous };
  },
  onError: (err, newEntry, context) => {
    queryClient.setQueryData(['kpis'], context.previous);
    toast.error('Failed to save. Your draft is safe.');
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['kpis'] });
    queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
  },
});
```

---

## 10. Error Boundaries

### 10.1 Per-Route Boundaries
```
app/
├── error.tsx                    ← global error boundary
├── (auth)/
│   └── error.tsx                ← auth-specific errors
├── (dashboard)/
│   └── error.tsx                ← dashboard-specific errors
│       ├── employee/
│       │   └── error.tsx
│       ├── manager/
│       │   └── error.tsx
│       └── founder/
│           └── error.tsx
└── (dashboard)/founder/reports/
    └── error.tsx                ← report generation errors
```

### 10.2 Error Boundary Component Pattern
```typescript
'use client';

export function ErrorBoundary({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-xl gap-md">
      <AlertCircleIcon className="text-accent-danger" size={48} />
      <h2 className="text-heading text-text-primary">Something went wrong</h2>
      <p className="text-body text-text-secondary text-center max-w-md">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

---

## 11. Accessibility (WCAG 2.1 AA — Minimum)

- All interactive elements: focus-visible ring (2px solid accent)
- All forms: label + error message linked via aria-describedby
- Color: no information conveyed by color alone (add icons/badges)
- Tables: caption element + scope on th
- Modals: focus trap + escape to close + aria-modal
- Skip to content: first focusable element
- Reduced motion: all animations wrapped in @media (prefers-reduced-motion: no-preference)

---

## 12. Tech Stack (Locked)

| Layer | Choice | Bundle (gzip) | Why |
|---|---|---|---|
| Framework | Next.js 14 (App Router) | ~50KB | RSC, streaming, image optimization |
| UI | React 19 | ~40KB | Latest, concurrent features |
| Styling | Tailwind CSS 4 | ~15KB (purged) | Zero runtime CSS |
| Components | ShadCN UI | ~10KB (used only) | Accessible, tree-shakeable |
| Charts | Recharts (lazy) | ~35KB (lazy) | Declarative, SVG-based |
| Forms | React Hook Form + Zod | ~12KB | Minimal re-renders |
| Server state | TanStack Query | ~13KB | Caching, optimistic updates |
| Client state | Zustand | ~1KB | Tiny, no boilerplate |
| Icons | Lucide React | ~0KB (tree-shaken) | Import only what you use |
| Fonts | Inter + JetBrains Mono + Manrope | ~75KB (self-hosted) | font-display: swap |

**Total initial JS:** ~133KB gzip (under 150KB budget)
**Total initial CSS:** ~15KB gzip (purged)
**Fonts:** ~75KB (loaded async, font-display: swap)

---

## 13. Key Page Implementations

### 13.1 Employee Dashboard (page.tsx)
```typescript
// app/(dashboard)/employee/page.tsx — FULL EXAMPLE
// This is the complete page. Build exactly this.

import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DailyTargetsCard } from './_components/DailyTargetsCard';
import { SubmissionForm } from './_components/SubmissionForm';
import { PerformanceSummary } from './_components/PerformanceSummary';
import { YourRank } from './_components/YourRank';
import { CardSkeleton } from '@/components/ui/skeleton';

export default async function EmployeeDashboardPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'employee') redirect(`/${session.user.role}/dashboard`);

  return (
    <div className="flex flex-col gap-lg">
      <div>
        <h1 className="text-hero text-text-primary font-display font-bold">
          Hey, {session.user.firstName} 👋
        </h1>
        <p className="text-body text-text-secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        <div className="lg:col-span-2 flex flex-col gap-md">
          <Suspense fallback={<CardSkeleton />}>
            <DailyTargetsCard />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <SubmissionForm />
          </Suspense>
        </div>
        <div className="flex flex-col gap-md">
          <Suspense fallback={<CardSkeleton />}>
            <PerformanceSummary />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <YourRank />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

### 13.2 DailyTargetsCard (Server Component → Client)
```typescript
// app/(dashboard)/employee/_components/DailyTargetsCard.tsx
import { auth } from '@/lib/auth';
import { DailyTargetsClient } from './DailyTargetsClient';

interface Target {
  id: string; name: string; current: number; target: number; unit: string;
}

export async function DailyTargetsCard() {
  const session = await auth();
  // This runs on the server — no round-trip
  const res = await fetch(`${process.env.API_URL}/api/targets/daily?userId=${session.user.id}`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    next: { revalidate: 60 },  // ISR: revalidate every 60s
  });
  const targets: Target[] = await res.json();

  return <DailyTargetsClient targets={targets} />;
}
```

### 13.3 DailyTargetsClient (Client Component)
```typescript
'use client';
// app/(dashboard)/employee/_components/DailyTargetsClient.tsx

interface Target { id: string; name: string; current: number; target: number; unit: string; }

export function DailyTargetsClient({ targets: initial }: { targets: Target[] }) {
  // Use React Query to keep data fresh without page reload
  const { data: targets } = useQuery({
    queryKey: ['daily-targets'],
    queryFn: () => fetch('/api/targets/daily').then(r => r.json()),
    initialData: initial,
    refetchInterval: 60_000,  // poll every 60s
  });

  if (!targets?.length) {
    return (
      <div className="bg-surface-secondary rounded-md p-md border border-surface-tertiary">
        <p className="text-text-muted text-small">No targets set for today</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-secondary rounded-md p-md border border-surface-tertiary">
      <h2 className="text-heading text-text-primary font-semibold mb-sm">Today's Targets</h2>
      <div className="flex flex-col gap-sm">
        {targets.map(t => {
          const pct = Math.min(100, Math.round((t.current / t.target) * 100));
          const color = pct >= 80 ? 'bg-accent-success' : pct >= 50 ? 'bg-accent-action' : 'bg-accent-danger';
          return (
            <div key={t.id} className="flex items-center gap-sm">
              <span className="text-body text-text-primary w-32 truncate">{t.name}</span>
              <div className="flex-1 h-2 bg-surface-tertiary rounded-sm overflow-hidden">
                <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-small text-text-secondary font-mono w-20 text-right">
                {t.current}/{t.target} {t.unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### 13.4 Founder Dashboard (page.tsx)
```typescript
// app/(dashboard)/founder/page.tsx
// Pattern: parallel data fetch + Suspense per widget

import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { KpiSummaryGrid } from './_components/KpiSummaryGrid';
import { LeaderboardPreview } from './_components/LeaderboardPreview';
import { CardSkeleton } from '@/components/ui/skeleton';

// Charts are lazy loaded — not in initial bundle
const ConversionFunnel = dynamic(() => import('./_components/ConversionFunnel'), {
  loading: () => <div className="bg-surface-secondary rounded-md p-md border border-surface-tertiary h-80 animate-pulse" />,
  ssr: false,
});
const WeeklyTrends = dynamic(() => import('./_components/WeeklyTrends'), {
  loading: () => <div className="bg-surface-secondary rounded-md p-md border border-surface-tertiary h-80 animate-pulse" />,
  ssr: false,
});
const AiInsightsPanel = dynamic(() => import('./_components/AiInsightsPanel'), {
  loading: () => <div className="bg-surface-secondary rounded-md p-md border border-surface-tertiary h-40 animate-pulse" />,
});

export default async function FounderDashboardPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'founder') redirect(`/${session.user.role}/dashboard`);

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="text-hero text-text-primary font-display font-bold">Dashboard</h1>

      <Suspense fallback={<div className="grid grid-cols-4 gap-md">{Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}</div>}>
        <KpiSummaryGrid />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        <ConversionFunnel />
        <WeeklyTrends />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        <div className="lg:col-span-2">
          <Suspense fallback={<CardSkeleton />}>
            <LeaderboardPreview />
          </Suspense>
        </div>
        <AiInsightsPanel />
      </div>
    </div>
  );
}
```

---

## 14. API Client Setup

```typescript
// lib/api-client.ts — single file, no extra library

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: Record<string, string[]>) {
    super(message);
  }
}

async function refreshToken(): Promise<string | null> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',  // httpOnly cookie sent automatically
  });
  if (!res.ok) return null;
  const { accessToken } = await res.json();
  return accessToken;
}

export async function api<T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOpts } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined) search.set(k, String(v)); });
    url += `?${search.toString()}`;
  }

  const res = await fetch(url, {
    ...fetchOpts,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOpts.headers,
    },
    credentials: 'include',
  });

  if (res.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      // Retry with new token
      return api<T>(endpoint, options);
    }
    // Redirect to login
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new ApiError(401, 'UNAUTHORIZED', 'Session expired');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.errorCode || 'UNKNOWN', body.message || 'Request failed', body.details);
  }

  return res.json();
}

// Convenience methods
export const apiClient = {
  get: <T>(url: string, params?: Record<string, string | number | boolean | undefined>) =>
    api<T>(url, { method: 'GET', params }),
  post: <T>(url: string, body?: unknown) =>
    api<T>(url, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body?: unknown) =>
    api<T>(url, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(url: string) =>
    api<T>(url, { method: 'DELETE' }),
};
```

---

## 15. WebSocket Integration

```typescript
// hooks/useWebSocket.ts — single file for real-time

import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface WsMessage {
  type: 'kpi_update' | 'leaderboard_update' | 'notification' | 'submission_reviewed';
  payload: Record<string, unknown>;
}

export function useWebSocket(orgId: string, userId: string) {
  const ws = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const reconnectTimeout = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    const token = document.cookie.split('; ').find(r => r.startsWith('access_token='))?.split('=')[1];
    if (!token) return;

    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`);
    ws.current = socket;

    socket.onopen = () => {
      // Join org room
      socket.send(JSON.stringify({ type: 'join', room: `org:${orgId}` }));
      socket.send(JSON.stringify({ type: 'join', room: `user:${userId}` }));
    };

    socket.onmessage = (event) => {
      const msg: WsMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'kpi_update':
          queryClient.invalidateQueries({ queryKey: ['kpis'] });
          queryClient.invalidateQueries({ queryKey: ['daily-targets'] });
          break;
        case 'leaderboard_update':
          queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
          break;
        case 'notification':
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
          break;
        case 'submission_reviewed':
          queryClient.invalidateQueries({ queryKey: ['performance-entries'] });
          break;
      }
    };

    socket.onclose = () => {
      reconnectTimeout.current = setTimeout(connect, 5000);  // reconnect after 5s
    };

    socket.onerror = () => socket.close();
  }, [orgId, userId, queryClient]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeout.current);
      ws.current?.close();
    };
  }, [connect]);
}
```

---

## 16. Middleware (Auth + Role Guard)

```typescript
// middleware.ts — at project root

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Map routes to allowed roles
const roleRoutes: Record<string, string[]> = {
  '/employee': ['employee', 'manager', 'founder', 'super_admin'],
  '/manager': ['manager', 'founder', 'super_admin'],
  '/founder': ['founder', 'super_admin'],
  '/admin': ['super_admin'],
};

export default withAuth(
  function middleware(req) {
    const path = Object.keys(roleRoutes).find(p => req.nextUrl.pathname.startsWith(p));
    if (!path) return NextResponse.next();

    const userRole = req.nextauth.token?.role as string;
    if (!roleRoutes[path].includes(userRole)) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/employee/:path*', '/manager/:path*', '/founder/:path*', '/admin/:path*'],
};
```

---

## 17. Environment Variables

```bash
# .env.local — all variables needed

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:4000

# Auth
AUTH_SECRET=your-secret-here  # openssl rand -base64 32
AUTH_URL=http://localhost:3000

# If using Clerk:
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
# CLERK_SECRET_KEY=sk_...

# Database (used by server components)
DATABASE_URL=postgresql://user:pass@localhost:5432/itsprelude

# File uploads
NEXT_PUBLIC_S3_BUCKET=itsprelude-uploads
NEXT_PUBLIC_S3_REGION=ap-south-1
```

```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://app.itsprelude.com
NEXT_PUBLIC_API_URL=https://api.itsprelude.com/v1
NEXT_PUBLIC_WS_URL=wss://api.itsprelude.com
```

---

## 18. Testing Strategy

### 18.1 Unit Tests (Jest)
```typescript
// Components: test render + all states
// Hooks: test state transitions
// Utils: test pure functions

// __tests__/KpiCard.test.tsx — example
import { render, screen } from '@testing-library/react';
import { KpiCard } from '@/components/KpiCard';

describe('KpiCard', () => {
  it('renders current/target values', () => {
    render(<KpiCard title="Calls Made" current={30} target={50} trend="up" trendValue="+5%" />);
    expect(screen.getByText('30 / 50')).toBeInTheDocument();
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<KpiCard title="Calls Made" current={0} target={0} trend="flat" trendValue="" />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
```

### 18.2 Integration Tests (React Testing Library)
```typescript
// __tests__/SubmissionForm.test.tsx
// Test: form validation, submission, error states, optimistic update

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmissionForm } from '@/components/SubmissionForm';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const mockKpis = [
  { id: '1', name: 'Calls Made', type: 'number' },
  { id: '2', name: 'Messages Sent', type: 'number' },
];

test('submits form with correct values', async () => {
  const mockSubmit = jest.fn().mockResolvedValue({ success: true });

  render(
    <QueryClientProvider client={new QueryClient()}>
      <SubmissionForm kpis={mockKpis} onSubmit={mockSubmit} />
    </QueryClientProvider>
  );

  await userEvent.type(screen.getByLabelText('Calls Made'), '30');
  await userEvent.type(screen.getByLabelText('Messages Sent'), '50');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ '1': 30, '2': 50 })
  ));
});
```

### 18.3 E2E Tests (Playwright)
```typescript
// e2e/employee-submission.spec.ts
// Test: full user flow from login to submission

import { test, expect } from '@playwright/test';

test('employee submits daily performance', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'employee@testcorp.com');
  await page.fill('[name=password]', 'password123');
  await page.click('button:has-text("Log In")');
  await expect(page).toHaveURL(/\/employee\/dashboard/);

  await page.fill('[name="Calls Made"]', '30');
  await page.fill('[name="Messages Sent"]', '50');
  await page.click('button:has-text("Submit")');
  await expect(page.locator('text=Submitted')).toBeVisible();
});
```

---

## 19. Build & CI/CD Pipeline

```yaml
# .github/workflows/build.yml
name: Build & Deploy
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test -- --coverage
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: './out' }

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --strict",
    "typecheck": "tsc --noEmit",
    "test": "jest --passWithNoTests",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true next build",
    "format": "prettier --write ."
  }
}
```

### Bundle Analysis Command
```bash
# Add to CI to fail if bundle exceeds budget
npx next build && npx next-bundle-analyzer
# Or: npx size-limit
```

---

## 20. ShadCN Component Usage (Exact List)

Only import these ShadCN components — they're tree-shaken, so unused ones cost nothing.

```typescript
// components/ui/index.ts — barrel export
export { Button } from './button';
export { Card, CardHeader, CardContent } from './card';
export { Input } from './input';
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './dropdown-menu';
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { Badge } from './badge';
export { Avatar, AvatarImage, AvatarFallback } from './avatar';
export { Skeleton } from './skeleton';
export { Toast, Toaster } from './toast';
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
// DO NOT import: Carousel, Calendar, Charts (use Recharts), Form (use react-hook-form)
```

---

## 21. Folder Structure (Final)

```
src/
├── app/                           ← Next.js App Router pages
│   ├── (auth)/                    ← public auth routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/               ← protected routes
│   │   ├── layout.tsx             ← sidebar + navbar shell
│   │   ├── employee/
│   │   │   ├── page.tsx
│   │   │   ├── submit/page.tsx
│   │   │   └── _components/       ← only used by employee pages
│   │   ├── manager/
│   │   ├── founder/
│   │   └── admin/
│   ├── api/                       ← Next.js API routes (thin proxy to NestJS)
│   ├── globals.css
│   ├── layout.tsx                 ← root: fonts, providers, metadata
│   └── error.tsx
├── components/                    ← shared components
│   ├── ui/                        ← ShadCN (customized)
│   └── common/                    ← KpiCard, DataTable, etc.
├── hooks/                         ← useWebSocket, useOptimisticSubmit, etc.
├── lib/                           ← api-client, auth, utils, constants
├── stores/                        ← Zustand (theme, sidebar)
├── types/                         ← TypeScript types
├── public/                        ← fonts (self-hosted), icons, og-image
├── e2e/                           ← Playwright tests
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 22. Build Checklist (Handoff to AI Agent)

Before starting, confirm these are ready:

- [ ] **Node.js 20+** installed
- [ ] **PostgreSQL 16** running locally (Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16`)
- [ ] **Redis 7** running locally (`docker run -p 6379:6379 redis:7-alpine`)
- [ ] **npm create next-app** with TypeScript + Tailwind + App Router
- [ ] **npx shadcn@latest init** with the color tokens from Section 1
- [ ] **Fonts downloaded** to `public/fonts/`:
  - Inter Variable (woff2) from fonts.google.com
  - JetBrains Mono (woff2) from jetbrains.com
  - Manrope Variable (woff2) from fonts.google.com
- [ ] **Environment variables** set (Section 17)
- [ ] **Clerk/NextAuth** configured with Google OAuth
- [ ] **API server running** on port 4000 (or mock with MSW)

### Build Order (Optimized for AI)
```
Hour 1-2:  Project init + auth + layout shell + middleware
Hour 3-4:  Employee dashboard (DailyTargetsCard + SubmissionForm)
Hour 5-6:  Manager dashboard (TeamOverview + PendingReviews)
Hour 7-8:  Founder dashboard (KpiSummaryGrid + lazy loaded charts)
Hour 9-10: Admin pages (CRUD for employees, departments, teams, kpis)
Hour 11-12: Leaderboard + Reports + AI insights
Hour 13-14: Notifications + WebSocket + real-time
Hour 15-16: Polish + error boundaries + testing
```

---

## 23. Prompt Template for AI Agent

Copy-paste this into Gemini/Cursor/Claude:

```
Build the ITSPRELUDE Performance System frontend based on the spec at:
src/app/(dashboard)/employee/page.tsx as the reference pattern.

Rules:
1. Every component needs: loading, empty, error, and normal states
2. All data fetching uses React Query (TanStack Query)
3. Server Components for layout, Client Components for interactivity
4. Tailwind CSS only — use the custom tokens (surface-primary, text-secondary, accent-action, etc.)
5. Charts are lazy loaded via next/dynamic — never in critical bundle
6. Forms use React Hook Form + Zod validation
7. API client is in lib/api-client.ts — use apiClient.get/post/put/delete
8. WebSocket is in hooks/useWebSocket.ts for real-time updates
9. Error boundaries per route segment
10. All text uses the font classes: font-display, font-body, font-mono

Start with: src/app/(dashboard)/founder/page.tsx and its _components/
Build the ConversionFunnel, WeeklyTrends, KpiSummaryGrid, and LeaderboardPreview components.
Use the color tokens: surface-secondary for card bg, text-primary for main text,
accent-action (#F59E0B) for CTAs, accent-success (#10B981) for positive indicators.
```

# ITSPRELUDE Performance System — Application Flow (AppFlow)

**Version:** 1.0
**Date:** 2026-05-14
**Author:** Zaid (AI Assistant for ITSPRELUDE)
**Status:** Draft

---

## 1. System-Level Flow Map

```
                    ┌──────────────────────┐
                    │   LANDING / MARKETING │
                    │      PAGE            │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   REGISTRATION /      │
                    │   ORG CREATION        │
                    │   (Super Admin)       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   ORGANIZATION SETUP  │
                    │   - Logo & Branding   │
                    │   - Departments       │
                    │   - Teams             │
                    │   - Roles             │
                    │   - Invite Employees  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   CONFIGURATION      │
                    │   - Create KPIs      │
                    │   - Set Targets      │
                    │   - Define Scoring   │
                    └──────────┬───────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
    ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
    │  FOUNDER /  │    │  TEAM HEAD  │    │   EMPLOYEE  │
    │  ADMIN      │    │  MANAGER    │    │   MEMBER    │
    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
           │                   │                   │
           │    ┌──────────────▼──────────────┐    │
           │    │   DAILY WORKFLOW            │    │
           │    │                              │    │
           │    │  Employee opens dashboard    │    │
           │    │       ↓                      │    │
           │    │  Views today's targets       │    │
           │    │       ↓                      │    │
           │    │  Submits performance entry   │    │
           │    │       ↓                      │    │
           │    │  Uploads proof if needed     │    │
           │    │       ↓                      │    │
           │    │  Submits daily summary/notes │    │
           │    │       ↓                      │    │
           │    │  Confirms submission ✅       │    │
           │    └──────────────┬──────────────┘    │
           │                   │                   │
    ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
    │  REVIEW &   │    │  TRACK &    │    │  LEARN &    │
    │  APPROVE    │    │  ANALYZE    │    │  IMPROVE    │
    │             │    │             │    │             │
    │ • Approve/ │    │ • Dashboard │    │ • Leader-   │
    │ • Reject   │    │   analytics │    │   board     │
    │ • Comment  │    │ • AI insigh-│    │ • Achieve-  │
    │ • Escalate │    │   ts        │    │   ments     │
    │ • Set new  │    │ • Reports   │    │ • Gamifica- │
    │   targets  │    │ • Export    │    │   tion      │
    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │
                    ┌──────────▼───────────┐
                    │   CONTINUOUS         │
                    │   IMPROVEMENT LOOP   │
                    │   (Daily Cycle)      │
                    └──────────────────────┘
```

---

## 2. Authentication Flow

```
┌───────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  [User Opens App]                                         │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────┐                                      │
│  │ Is Authenticated?│──── Yes ──→ Redirect to Dashboard   │
│  │ (check cookie/   │                                     │
│  │  session)        │                                     │
│  └────────┬────────┘                                      │
│           │ No                                            │
│           ▼                                               │
│  ┌─────────────────────┐                                  │
│  │  SHOW LOGIN PAGE    │                                  │
│  │                     │                                  │
│  │  [Email] [Password] │                                  │
│  │  ─────────────────  │                                  │
│  │  [Forgot Password?] │                                  │
│  │  [Register Account]  │                                  │
│  └────────┬────────────┘                                  │
│           │                                                │
│           ▼ (Submit credentials)                           │
│  ┌─────────────────────┐                                  │
│  │  API: POST /login   │                                  │
│  │  Validate email     │                                  │
│  │  Verify password    │                                  │
│  │  Check org access   │                                  │
│  └────────┬────────────┘                                  │
│           │                                                │
│     ┌─────┴─────┐                                         │
│     │            │                                         │
│  Success      Failure                                     │
│     │            │                                         │
│     ▼            ▼                                         │
│  ┌───────┐  ┌──────────┐                                  │
│  │ Set   │  │ Show     │                                  │
│  │ JWT   │  │ Error    │                                  │
│  │ cookie│  │ Message  │                                  │
│  │ Set   │  │          │                                  │
│  │ Refresh│  │ [Retry]  │                                  │
│  │ token │  └──────────┘                                  │
│  └───┬───┘                                                 │
│      │                                                     │
│      ▼                                                     │
│  ┌─────────────────────┐                                  │
│  │  REDIRECT TO        │                                  │
│  │  Role-based         │                                  │
│  │  Dashboard          │                                  │
│  └─────────────────────┘                                  │
│                                                           │
│  Token Refresh Logic:                                     │
│  • Access token expires: 15 min                            │
│  • Refresh token expires: 7 days                           │
│  • On 401 error → auto-attempt token refresh              │
│  • On refresh failure → redirect to login                  │
└───────────────────────────────────────────────────────────┘
```

---

## 3. Employee Daily Workflow

```
┌───────────────────────────────────────────────────────────┐
│                EMPLOYEE DAILY WORKFLOW                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Step 1: LOG IN                                           │
│  ┌────────────────────────────────────────────┐           │
│  │ Employee opens app → Authenticate           │           │
│  │ → Redirected to Employee Dashboard           │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 2: VIEW DASHBOARD                                   │
│  ┌────────────────────────────────────────────┐           │
│  │ • Today's targets (calls, messages, etc.)  │           │
│  │ • Current progress bar                      │           │
│  │ • Yesterday's performance summary          │           │
│  │ • Leaderboard position                     │           │
│  │ • Pending submission reminder              │           │
│  │ • Any notifications / alerts               │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 3: SUBMIT DAILY PERFORMANCE                         │
│  ┌────────────────────────────────────────────┐           │
│  │ Employee fills in daily metrics:            │           │
│  │ • Calls made: [30]                         │           │
│  │ • Messages sent: [50]                      │           │
│  │ • Leads generated: [8]                     │           │
│  │ • Meetings booked: [2]                     │           │
│  │ • Closures achieved: [1]                   │           │
│  │                                             │           │
│  │ • Attach proof (screenshot, doc, image)    │           │
│  │ • Add work notes (optional)                │           │
│  │                                             │           │
│  │ [📎 Attach] [▶ Submit]                     │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 4: SUBMISSION CONFIRMATION                          │
│  ┌────────────────────────────────────────────┐           │
│  │ ✅ "Your performance has been submitted!"  │           │
│  │ • Submitted values shown briefly           │           │
│  │ • Streak count updated (🔥 3 days)         │           │
│  │ • Leaderboard rank shown                   │           │
│  │ [View My Analytics] [Back to Dashboard]    │           │
│  └────────────────────────────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 5: ONGOING TRACKING                                 │
│  ┌────────────────────────────────────────────┐           │
│  │ • Real-time progress updates on dashboard   │           │
│  │ • Achievement badges pop up on milestones   │           │
│  │ • Notifications for:                        │           │
│  │   - Missed submission reminder              │           │
│  │   - New target achieved notification        │           │
│  │   - Rank change alert                       │           │
│  │   - Manager feedback on submission          │           │
│  └────────────────────────────────────────────┘           │
│                                                           │
│  Daily cycle repeats.                                     │
└───────────────────────────────────────────────────────────┘
```

---

## 4. Manager Review Workflow

```
┌───────────────────────────────────────────────────────────┐
│                MANAGER REVIEW WORKFLOW                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Step 1: MANAGER LOGS IN                                  │
│  ┌────────────────────────────────────────────┐           │
│  │ Team Head / Department Head logs in         │           │
│  │ → Redirected to Team Dashboard              │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 2: VIEW TEAM OVERVIEW                               │
│  ┌────────────────────────────────────────────┐           │
│  │ • Team activity summary                    │           │
│  │ • Pending submissions count                │           │
│  │ • Team target completion %                 │           │
│  │ • Underperformers list                     │           │
│  │ • Department comparison charts             │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 3: REVIEW INDIVIDUAL SUBMISSIONS                     │
│  ┌────────────────────────────────────────────┐           │
│  │ Click on employee → View submission details│           │
│  │                                            │           │
│  │ • Submitted KPI values                     │           │
│  │ • Attached proof/documents                 │           │
│  │ • Work notes                              │           │
│  │ • Historical performance trend             │           │
│  │                                            │           │
│  │ Actions:                                   │           │
│  │  [✅ Approve]  [❌ Reject]  [💬 Comment]   │           │
│  │  [📈 Escalate Issue]                      │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 4: TAKE ACTION                                       │
│  ┌────────────────────────────────────────────┐           │
│  │                                            │           │
│  │ Option A: APPROVE                           │           │
│  │   • Submission marked approved             │           │
│  │   • KPI progress updated                   │           │
│  │   • Points awarded (if gamified)           │           │
│  │   • Employee receives notification         │           │
│  │                                            │           │
│  │ Option B: REJECT                            │           │
│  │   • Submission marked rejected             │           │
│  │   • Manager adds rejection reason          │           │
│  │   • Employee notified to resubmit          │           │
│  │                                            │           │
│  │ Option C: ESCALATE                          │           │
│  │   • Issue flagged for HR/Admin attention   │           │
│  │   • Escalation logged in activity trail    │           │
│  │                                            │           │
│  │ Option D: ADD COMMENT                       │           │
│  │   • Inline comment on submission           │           │
│  │   • Employee sees comment in feed          │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 5: SET/ADJUST TARGETS                               │
│  ┌────────────────────────────────────────────┐           │
│  │ Manager can:                                │           │
│  │ • Set daily/weekly/monthly targets          │           │
│  │ • Adjust individual KPI goals               │           │
│  │ • Configure scoring logic                   │           │
│  │ • Assign new KPIs to team members           │           │
│  └────────────────────────────────────────────┘           │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 5. Founder/Admin Dashboard Flow

```
┌───────────────────────────────────────────────────────────┐
│              FOUNDER / ADMIN DASHBOARD FLOW                │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Step 1: GLOBAL OVERVIEW                                   │
│  ┌────────────────────────────────────────────┐           │
│  │ Revenue: $X.XM (chart)                      │           │
│  │ Total Leads: XXXX                             │           │
│  │ Active Employees: XXX / XXX                  │           │
│  │ Avg Team Productivity Score: XX%             │           │
│  │ Conversion Funnel (Calls→Leads→Closure)     │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 2: DRILL DOWN                                        │
│  ┌────────────────────────────────────────────┐           │
│  │ Click any widget → drill into detail view   │           │
│  │                                            │           │
│  │ Revenue → By department, by employee,      │           │
│  │            by product, by time period       │           │
│  │                                            │           │
│  │ Leads → Source, conversion rate,           │           │
│  │          team performance                  │           │
│  │                                            │           │
│  │ Employees → Productivity ranking,          │           │
│  │            KPI progress, activity log      │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 3: AI INSIGHTS                                       │
│  ┌────────────────────────────────────────────┐           │
│  │ "Sales conversion dropped 18% this week"   │           │
│  │ "3 employees underperforming consistently"  │           │
│  │ "Content engagement increased after reels"  │           │
│  │ "Revenue forecast: $X.XM next quarter"     │           │
│  │ "Burnout risk detected: 2 employees"        │           │
│  │                                            │           │
│  │ [View Details] [Take Action]               │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 4: ORGANIZATION MANAGEMENT                           │
│  ┌────────────────────────────────────────────┐           │
│  │ • Manage teams & departments                │           │
│  │ • Onboard/offboard employees                │           │
│  │ • Configure roles & permissions             │           │
│  │ • Manage subscription & billing             │           │
│  │ • Branding & customization                  │           │
│  └────────────────────────────────────────────┘           │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 6. Onboarding Flow (New Organization)

```
┌───────────────────────────────────────────────────────────┐
│                 ORGANIZATION ONBOARDING FLOW                │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Step 1: SIGN UP                                           │
│  ┌────────────────────────────────────────────┐           │
│  │ Name, Email, Password                       │           │
│  │ Company Name & Industry                     │           │
│  │ Team Size (approx)                          │           │
│  │ [Create Organization]                       │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 2: ORGANIZATION SETUP (Wizard)                       │
│  ┌────────────────────────────────────────────┐           │
│  │ Sub-step A: Upload Logo & Set Branding     │           │
│  │ Sub-step B: Add Departments (or use template)│          │
│  │ Sub-step C: Set Up Teams                   │           │
│  │ Sub-step D: Invite Team Members            │           │
│  │ Sub-step E: Configure KPIs (or use template)│          │
│  │ Sub-step F: Set Targets                    │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 3: GUIDED TOUR                                      │
│  ┌────────────────────────────────────────────┐           │
│  │ Interactive tour of key features:           │           │
│  │ "This is your dashboard" → highlight       │           │
│  │ "Here's where you submit" → highlight      │           │
│  │ "Check leaderboard here" → highlight       │           │
│  │ [Skip Tour]     [Next →]                   │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 4: WELCOME DASHBOARD                               │
│  ┌────────────────────────────────────────────┐           │
│  │ "Welcome to ITSPRELUDE! 🎉"                 │           │
│  │ Checklist:                                  │           │
│  │ ☑ Organization created                     │           │
│  │ ☐ Add team members                         │           │
│  │ ☐ Set up KPIs                              │           │
│  │ ☑ Submit first daily report                │           │
│  │                                            │           │
│  │ [Start Using the App]                       │           │
│  └────────────────────────────────────────────┘           │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 7. Notification Flow

```
┌───────────────────────────────────────────────────────────┐
│                  NOTIFICATION SYSTEM FLOW                  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Trigger Event                                            │
│  (Submission, Approval, Alert, Achievement, Reminder)     │
│         │                                                 │
│         ▼                                                 │
│  ┌──────────────────────────────┐                        │
│  │  Notification Service        │                        │
│  │  (Determine type + channel)  │                        │
│  └──────────────┬───────────────┘                        │
│                 │                                         │
│     ┌───────────┼───────────┐                            │
│     │           │           │                            │
│     ▼           ▼           ▼                            │
│  ┌──────┐  ┌────────┐  ┌─────────┐                      │
│  │ In-App│  │ Email  │  │Push Notif│                     │
│  │Toast  │  │SendGrid│  │(Future)  │                     │
│  └──┬───┘  └───┬────┘  └────┬────┘                      │
│     │          │             │                            │
│     ▼          ▼             ▼                            │
│  ┌──────────────────────────────┐                        │
│  │  Update Notification Table   │                        │
│  │  (unread count, timestamp)   │                        │
│  └──────────────────────────────┘                        │
│                                                           │
│  Notification Types:                                      │
│  ─────────────────────────                                │
│  • Daily Reminder          → 8:00 AM daily               │
│  • Missed Submission       → 6:00 PM daily               │
│  • Low Performance Alert   → Immediate (threshold-based) │
│  • Achievement Unlocked    → Immediate                   │
│  • Weekly Report Ready     → Monday 8:00 AM              │
│  • Approval/Rejection      → Immediate                   │
│  • Manager Escalation      → Immediate                   │
│  • New Assignment           → Immediate                   │
└───────────────────────────────────────────────────────────┘
```

---

## 8. Reporting Flow

```
┌───────────────────────────────────────────────────────────┐
│                    REPORTING FLOW                          │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Step 1: USER REQUESTS REPORT                             │
│  ┌────────────────────────────────────────────┐           │
│  │ Navigate to Reports Section                  │           │
│  │ Select: Daily / Weekly / Monthly             │           │
│  │ Select: Format (PDF / Excel / CSV)           │           │
│  │ Select: Date Range                           │           │
│  │ Select: Department / Team / Individual       │           │
│  │ [Generate Report]                            │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 2: BACKEND PROCESSING                                │
│  ┌────────────────────────────────────────────┐           │
│  │ 1. Validate request & permissions          │           │
│  │ 2. Query PerformanceEntries + Targets       │           │
│  │ 3. Calculate metrics & KPIs                 │           │
│  │ 4. Generate visual charts (Recharts → PNG)  │           │
│  │ 5. Compile PDF/Excel/CSV via library        │           │
│  │ 6. Upload to S3                             │           │
│  │ 7. Store in Reports table                   │           │
│  │ 8. Send notification when ready             │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 3: DELIVERY (Async)                                  │
│  ┌────────────────────────────────────────────┐           │
│  │ • Push notification: "Report is ready"     │           │
│  │ • In-app: Download button enabled          │           │
│  │ • Email: Download link (PDF/Excel/CSV)     │           │
│  │ • Auto-download in browser                 │           │
│  └────────────────────────────────────────────┘           │
│                                                           │
│  Auto-Generated Reports (Scheduled):                       │
│  • Weekly summaries → Every Monday 8:00 AM                 │
│  • Monthly analytics → 1st of each month, 8:00 AM         │
│  • Performance trends → Weekly Friday 5:00 PM             │
└───────────────────────────────────────────────────────────┘
```

---

## 9. Gamification Flow

```
┌───────────────────────────────────────────────────────────┐
│                  GAMIFICATION FLOW                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Daily Actions → Points                                    │
│  ┌────────────────────────────────────────────┐           │
│  │ Submit on time          → +50 XP            │           │
│  │ Complete all targets    → +100 XP           │           │
│  │ Submit proof            → +20 XP            │           │
│  │ Complete consecutive days → +25 XP (bonus) │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Achievements (Badges)                                    │
│  ┌────────────────────────────────────────────┐           │
│  │ 🥉 "First Submission"  (1st daily submit) │           │
│  │ 🥈 "Consistent Performer" (7-day streak)  │           │
│  │ 🥇 "Top Performer"   (#1 on weekly board) │           │
│  │ 💎 "Target Crusher"  (100% weekly target) │           │
│  │ ⭐ "Rising Star"     (+20% week-over-week)│           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Leaderboard Calculation                                    │
│  ┌────────────────────────────────────────────┐           │
│  │ Score = Σ(KPI_actual / KPI_target × weight)│           │
│  │ Rank = ORDER BY score DESC                 │           │
│  │ Recalculated daily at midnight             │           │
│  │ Displayed: Daily / Weekly / Monthly        │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Rewards (Future Phase)                                    │
│  ┌────────────────────────────────────────────┐           │
│  │ Redeem XP for: gift cards, extra PTO,      │           │
│  │  company swag, recognition awards          │           │
│  │  Manager-defined custom rewards             │           │
│  └────────────────────────────────────────────┘           │
└───────────────────────────────────────────────────────────┘
```

---

## 10. AI Insights Engine Flow

```
┌───────────────────────────────────────────────────────────┐
│                 AI INSIGHTS ENGINE FLOW                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Step 1: DATA COLLECTION (Daily)                           │
│  ┌────────────────────────────────────────────┐           │
│  │ • Performance entries (all employees)      │           │
│  │ • Target completion rates                  │           │
│  │ • Historical trends (last 30/60/90 days)   │           │
│  │ • Attendance patterns                      │           │
│  │ • Revenue data (if sales team)             │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 2: ANALYSIS (Nightly Batch Job)                      │
│  ┌────────────────────────────────────────────┐           │
│  │ AI Service triggers at 10:00 PM daily      │           │
│  │                                            │           │
│  │ Analysis Types:                             │           │
│  │ • Trend Analysis (performance over time)    │           │
│  │ • Anomaly Detection (sudden drops/spikes)   │           │
│  │ • Predictive Modeling (burnout, forecasting)│           │
│  │ • Comparative Analysis (team vs team)       │           │
│  │ • Pattern Recognition (habits, rhythms)     │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 3: INSIGHT GENERATION                               │
│  ┌────────────────────────────────────────────┐           │
│  │ Natural Language Insights:                  │           │
│  │ • "Sales conversion dropped 18% this week" │           │
│  │ • "3 employees underperforming consistently"│           │
│  │ • "Content engagement up 35% after reels"  │           │
│  │ • "Burnout risk: HIGH for John D. (>12hr   │           │
│  │    daily work for 7 days)"                  │           │
│  │ • "Revenue forecast: $85K next month       │           │
│  │    (confidence: 78%)"                       │           │
│  └──────────────────────┬─────────────────────┘           │
│                         │                                 │
│                         ▼                                 │
│  Step 4: DELIVERY                                         │
│  ┌────────────────────────────────────────────┐           │
│  │ • Dashboard AI Panel (Founder view)        │           │
│  │ • Weekly AI digest email (Monday 8 AM)     │           │
│  │ • Alert notifications for critical insights│           │
│  │ • "Ask AI" chat interface (Phase 4)        │           │
│  └────────────────────────────────────────────┘           │
│                                                           │
│  Technical Implementation:                                │
│  • Python microservice (FastAPI)                          │
│  • LLM integration (OpenAI/Claude API)                   │
│  • Prompt templates per analysis type                     │
│  • Cached results (1 hour TTL)                            │
│  • Async queue (BullMQ) for heavy analysis                │
└───────────────────────────────────────────────────────────┘
```

---

## 11. Complete User Journey Map

### Employee Day-in-Life

```
8:00 AM  ──→ Open app → Login (SSO/email)
          → Dashboard: See today's targets, yesterday's summary
          → Check notifications (any manager feedback?)
         
8:15 AM  ──→ Start work (calls, emails, coding, designing...)
         
8:30 AM  ──→ Reminder notification: "Don't forget to track your work!"
         
Throughout day
          → Log activities continuously
          → Attach proof screenshots as you go
         
5:00 PM  ──→ Open daily submission form
          → Auto-filled metrics where possible
          → Review and adjust values
          → Add notes for manager
          → Attach proof
          → Hit "Submit"
         
5:05 PM  ──→ Confirmation: "✓ Submitted! Streak: 5 days 🔥"
          → See updated leaderboard position
          → Notification: "Your score is up 3% from yesterday!"
          
5:30 PM  ──→ Manager reviews and approves submission
          → Employee gets notification of approval
          
10:00 PM ──→ AI engine runs nightly analysis
          → Updates insights for tomorrow's dashboard
```

### Manager Day-in-Life

```
8:00 AM  ──→ Login → Team Dashboard
          → Review overnight AI insights
          → Check pending submissions (count badge)
          
8:15 AM  ──→ Review individual submissions
          → Approve/Reject/Comment each one
          → Escalate issues as needed
          
9:00 AM  ──→ Set/Adjust daily targets for team
          → View team performance vs. other departments
          
9:30 AM  ──→ Check leaderboard
          → Recognize top performers in team channel
          
Throughout day
          → Respond to employee queries
          → Monitor real-time activity feed
          
5:00 PM  ──→ Final review pass: ensure all submissions approved
          → Review weekly trends (prepare for Monday)
          
Weekly (Friday 4:00 PM)
          → Generate weekly report
          → Review AI weekly insights
          → Plan next week's targets
```

### Founder/Admin Day-in-Life

```
Monday Morning
          → Login → Organization Dashboard
          → AI Weekly Digest Email
          → Review business KPIs
          
Mid-Week
          → Check org-wide performance trends
          → Review department head reports
          → Monitor platform health & usage
          
Monthly
          → Review monthly analytics report
          → Adjust org-wide targets
          → Review AI forecasting insights
          → Manage subscription/plan if needed
          
Quarterly
          → Review business success metrics
          → Assess platform ROI
          → Plan feature requests for ITSPRELUDE team
```

---

## 12. Error Flows

### Failed Submission
```
Employee submits → API error (network/validation)
         │
         ▼
Show inline error messages
         │
         ├── Network error → "Connection lost. [Retry] [Save as Draft]"
         ├── Validation error → "Calls made must be a number ≥ 0"
         ├── Duplicate → "You've already submitted for today. [Edit]"
         └── Server error → "Something went wrong. [Retry] [Contact Support]"
         │
         ▼
On Retry → Resubmit with same data
On Draft → Save locally, show "Continue Draft" card next day
```

### Session Expiry
```
User active → Token expires (15 min)
         │
         ▼
API returns 401
         │
         ▼
Auto-attempt token refresh
         │
    ┌────┴────┐
    │         │
 Success    Failure
    │         │
    ▼         ▼
 Continue   Show modal:
 silently   "Session expired. [Login Again]"
            → Clear local state
            → Redirect to login
```
# ITSPRELUDE Performance System — Backend Schema Design

**Version:** 1.0
**Date:** 2026-05-14
**Status:** Draft

## 1. Schema Overview

Multi-tenant PostgreSQL with shared schema for platform tables and tenant-scoped business tables. Prisma ORM manages migrations, Row-Level Security (RLS) as defense layer.

## 2. Physical Schema Layout

```
postgres://itsprelude_db/
├── public/                      # Shared platform tables
│   ├── organizations
│   ├── subscription_plans
│   ├── auth_tokens
│   └── audit_logs
│
├── tenant_{org_id}/             # Per-tenant schemas
│   ├── users
│   ├── departments
│   ├── teams
│   ├── user_teams              # M:N join
│   ├── roles
│   ├── kpis
│   ├── targets
│   ├── performance_entries
│   ├── leaderboards            # Materialized nightly
│   ├── notifications
│   ├── activities
│   ├── notes
│   ├── attachments
│   └── reports
```

## 3. Complete Table Definitions

### 3.1 organizations

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| name | VARCHAR(255) | NOT NULL |
| slug | VARCHAR(255) | UNIQUE, NOT NULL |
| logo_url | TEXT | NULL |
| subscription_plan_id | UUID | FK |
| settings | JSONB | {} |
| colors | JSONB | {} |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | NOW() |
| updated_at | TIMESTAMPTZ | auto |

### 3.2 users

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK → organizations |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| phone | VARCHAR(20) | NULL |
| designation | VARCHAR(200) | NULL |
| department_id | UUID | NULL, FK |
| manager_id | UUID | NULL, FK → users (self-ref) |
| role_id | UUID | NOT NULL, FK |
| branch | VARCHAR(200) | NULL |
| joining_date | DATE | NOT NULL |
| employment_status | VARCHAR(20) | DEFAULT 'active' |
| profile_image_url | TEXT | NULL |
| is_active | BOOLEAN | DEFAULT true |

### 3.3 departments

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| name | VARCHAR(200) | NOT NULL |
| head_id | UUID | NULL, FK → users |
| description | TEXT | NULL |

### 3.4 teams

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| name | VARCHAR(200) | NOT NULL |
| department_id | UUID | FK |
| lead_id | UUID | FK → users |

### 3.5 user_teams (join)

| Column | Type | Constraints |
|---|---|---|
| user_id | UUID | FK, composite PK |
| team_id | UUID | FK, composite PK |

### 3.6 roles

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| name | VARCHAR(100) | NOT NULL |
| permissions | JSONB | ["users:read"] |
| is_system | BOOLEAN | DEFAULT false |

### 3.7 kpis

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| department_id | UUID | NULL |
| team_id | UUID | NULL |
| name | VARCHAR(200) | NOT NULL |
| metric_type | VARCHAR(50) | NOT NULL |
| description | TEXT | NULL |
| target_value | DECIMAL(10,2) | NULL |
| unit | VARCHAR(50) | NULL |
| weightage | INT | DEFAULT 1 |
| scoring_logic | JSONB | NULL |
| is_active | BOOLEAN | DEFAULT true |

### 3.8 targets

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| kpi_id | UUID | FK |
| user_id | UUID | NULL (=org-wide) |
| department_id | UUID | NULL |
| value | DECIMAL(10,2) | NOT NULL |
| period | VARCHAR(20) | daily/weekly/monthly/quarterly |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |

### 3.9 performance_entries

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | FK |
| kpi_id | UUID | NULL, FK |
| submitted_value | DECIMAL(10,2) | NOT NULL |
| notes | TEXT | NULL |
| attachments | JSONB | NULL |
| submission_date | DATE | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'pending' |
| reviewed_by | UUID | NULL, FK |
| review_notes | TEXT | NULL |

### 3.10 leaderboards

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| period | VARCHAR(20) | daily/weekly/monthly |
| user_id | UUID | FK |
| rank | INT | NOT NULL |
| score | DECIMAL(10,2) | NOT NULL |
| kpi_breakdown | JSONB | NULL |
| week_start | DATE | NULL |

### 3.11 notifications

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | FK |
| type | VARCHAR(50) | NOT NULL |
| title | VARCHAR(200) | NOT NULL |
| message | TEXT | NOT NULL |
| data | JSONB | NULL |
| channel | VARCHAR(20) | DEFAULT 'in_app' |
| is_read | BOOLEAN | DEFAULT false |
| sent_at | TIMESTAMPTZ | NOW() |

### 3.12 attachments

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | FK |
| file_url | TEXT | NOT NULL |
| file_name | VARCHAR(255) | NOT NULL |
| file_type | VARCHAR(50) | NOT NULL |
| file_size | BIGINT | NOT NULL |
| entity_type | VARCHAR(50) | NULL |
| entity_id | UUID | NULL |

### 3.13 reports

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | FK |
| type | VARCHAR(20) | NOT NULL |
| format | VARCHAR(10) | NOT NULL |
| title | VARCHAR(255) | NOT NULL |
| filters | JSONB | NULL |
| file_url | TEXT | NULL |
| status | VARCHAR(20) | DEFAULT 'pending' |
| generated_at | TIMESTAMPTZ | NULL |

### 3.14 notes

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | FK |
| type | VARCHAR(50) | NOT NULL |
| content | TEXT | NOT NULL |
| visibility | VARCHAR(20) | DEFAULT 'team' |

### 3.15 activities

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | FK |
| action | VARCHAR(100) | NOT NULL |
| entity_type | VARCHAR(50) | NULL |
| entity_id | UUID | NULL |
| ip_address | VARCHAR(45) | NULL |
| user_agent | TEXT | NULL |

### 3.16 audit_logs

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| org_id | UUID | FK |
| user_id | UUID | NULL |
| action | VARCHAR(100) | NOT NULL |
| entity_type | VARCHAR(50) | NULL |
| entity_id | UUID | NULL |
| ip_address | VARCHAR(45) | NULL |
| user_agent | TEXT | NULL |

### 3.17 subscription_plans

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| name | VARCHAR(100) | NOT NULL |
| price | DECIMAL(10,2) | NOT NULL |
| interval | VARCHAR(20) | monthly/yearly |
| features | JSONB | {} |
| stripe_price_id | VARCHAR(255) | NULL |

## 4. Entity Relationships

```
organizations
  ├─ one-to-many → users
  ├─ one-to-many → departments
  ├─ one-to-many → teams
  ├─ one-to-many → kpis
  ├─ one-to-many → targets
  ├─ one-to-many → performance_entries
  ├─ one-to-many → notifications
  ├─ one-to-many → leaderboards
  ├─ one-to-many → activities
  ├─ one-to-many → reports
  ├─ one-to-many → notes
  └─ one-to-many → attachments

users
  ├─ belongs-to → roles
  ├─ belongs-to → departments
  ├─ belongs-to (optional) → users (manager_id self-ref)
  ├─ has-many → users (direct reports)
  ├─ many-to-many → teams (via user_teams)
  ├─ has-many → performance_entries
  ├─ has-many → targets
  ├─ has-many → notifications
  ├─ has-many → activities
  ├─ has-many → leaderboards
  ├─ has-many → reports
  ├─ has-many → notes
  └─ has-many → attachments

kpis
  ├─ belongs-to → departments (optional)
  ├─ belongs-to → teams (optional)
  ├─ has-many → performance_entries
  └─ has-many → targets

departments
  ├─ has-many → users
  ├─ has-many → teams
  ├─ has-many → kpis
  └─ has-many → targets

teams
  ├─ belongs-to → departments
  ├─ many-to-many → users (via user_teams)
  ├─ has-many → kpis
  └─ has-many → targets
```

## 5. Indexing Strategy

```sql
-- Users
CREATE INDEX idx_users_org ON users(org_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_dept ON users(department_id);
CREATE INDEX idx_users_mgr ON users(manager_id);

-- Performance Entries
CREATE INDEX idx_perf_org ON performance_entries(org_id);
CREATE INDEX idx_perf_user ON performance_entries(user_id);
CREATE INDEX idx_perf_date ON performance_entries(submission_date);
CREATE INDEX idx_perf_user_date ON performance_entries(user_id, submission_date);
CREATE INDEX idx_perf_status ON performance_entries(status);
CREATE INDEX idx_perf_user_kpi_date ON performance_entries(user_id, kpi_id, submission_date DESC);
CREATE UNIQUE INDEX idx_perf_unique_daily ON performance_entries(user_id, submission_date, kpi_id);

-- Notifications
CREATE INDEX idx_notifs_user_read ON notifications(user_id, is_read, sent_at DESC);

-- Leaderboards
CREATE INDEX idx_leaderboard_rank ON leaderboards(org_id, period, rank);

-- KPIs
CREATE INDEX idx_kpis_org ON kpis(org_id);
CREATE INDEX idx_kpis_dept ON kpis(department_id);

-- Targets
CREATE INDEX idx_targets_org ON targets(org_id);
CREATE INDEX idx_targets_kpi ON targets(kpi_id);
CREATE INDEX idx_targets_user ON targets(user_id);

-- Activities & Audit
CREATE INDEX idx_activities_org ON activities(org_id, user_id);
CREATE INDEX idx_audit_org ON audit_logs(org_id, user_id);
```

## 6. Prisma Schema (schema.prisma)

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

model Organization {
  id          String          @id @default(uuid())
  name        String          @db.VarChar(255)
  slug        String          @unique @db.VarChar(255)
  logoUrl     String?         @map("logo_url")
  subscriptionPlanId String?  @map("subscription_plan_id")
  settings    Json            @default("{}")
  colors      Json            @default("{}")
  isActive    Boolean         @default(true) @map("is_active")
  createdAt   DateTime        @default(now()) @map("created_at")
  updatedAt   DateTime        @updatedAt @map("updated_at")
  users       User[];         departments    Department[]
  teams       Team[];         kpis           Kpi[]
  targets     Target[];       performanceEntries PerformanceEntry[]
  notifications Notification[]; leaderboards Leaderboard[]
  activities  Activity[];     auditLogs      AuditLog[]
  reports     Report[];       notes          Note[]
  attachments Attachment[]
}

model User {
  id              String    @id @default(uuid())
  orgId           String    @map("org_id")
  organization    Organization @relation(fields: [orgId], references: [id])
  firstName       String    @map("first_name") @db.VarChar(100)
  lastName        String    @map("last_name") @db.VarChar(100)
  email           String    @unique @db.VarChar(255)
  passwordHash    String    @map("password_hash")
  phone           String?   @db.VarChar(20)
  designation     String?   @db.VarChar(200)
  departmentId    String?   @map("department_id")
  department      Department? @relation(fields: [departmentId], references: [id])
  managerId       String?   @map("manager_id")
  manager         User?     @relation("UserToManager", fields: [managerId], references: [id])
  directReports   User[]    @relation("UserToManager")
  roleId          String    @map("role_id")
  role            Role      @relation(fields: [roleId], references: [id])
  branch          String?   @db.VarChar(200)
  joiningDate     DateTime  @map("joining_date") @db.Date
  employmentStatus String   @default("active") @map("employment_status")
  profileImageUrl String?   @map("profile_image_url")
  isActive        Boolean   @default(true) @map("is_active")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  performanceEntries PerformanceEntry[]
  notes           Note[];    attachments Attachment[]
  targets         Target[];  reviewsDone PerformanceEntry[] @relation("reviewer")
  activities      Activity[]; leaderboardEntries Leaderboard[]
  reports         Report[];  notifications Notification[]
  userTeams       UserTeam[]
  @@unique([email, orgId])
  @@map("users")
}

model Department {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  name        String    @db.VarChar(200)
  headId      String?   @map("head_id")
  head        User?     @relation(fields: [headId], references: [id])
  description String?
  users       User[];   teams Team[]; kpis Kpi[]; targets Target[]
  @@unique([name, orgId])
  @@map("departments")
}

model Team {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  name         String    @db.VarChar(200)
  departmentId String?   @map("department_id")
  department   Department? @relation(fields: [departmentId], references: [id])
  leadId       String?   @map("lead_id")
  lead         User?     @relation(fields: [leadId], references: [id])
  members      UserTeam[]; kpis Kpi[]; targets Target[]
  @@unique([name, orgId])
  @@map("teams")
}

model UserTeam {
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  teamId    String   @map("team_id")
  team      Team     @relation(fields: [teamId], references: [id])
  joinedAt  DateTime @default(now()) @map("joined_at")
  @@id([userId, teamId])
  @@map("user_teams")
}

model Role {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  name        String    @db.VarChar(100)
  description String?
  permissions Json;     isSystem Boolean @default(false) @map("is_system")
  users       User[]
  @@unique([name, orgId])
  @@map("roles")
}

model Kpi {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  departmentId String?   @map("department_id")
  department   Department? @relation(fields: [departmentId], references: [id])
  teamId       String?   @map("team_id")
  team         Team?     @relation(fields: [teamId], references: [id])
  name         String    @db.VarChar(200)
  metricType   String    @map("metric_type")
  description  String?
  targetValue  Decimal?  @map("target_value") @db.Decimal(10, 2)
  unit         String?   @db.VarChar(50)
  weightage    Int       @default(1)
  scoringLogic Json?     @map("scoring_logic")
  isActive     Boolean   @default(true) @map("is_active")
  entries      PerformanceEntry[]; targets Target[]
  @@unique([name, orgId])
  @@map("kpis")
}

model Target {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  kpiId        String    @map("kpi_id")
  kpi          Kpi       @relation(fields: [kpiId], references: [id])
  userId       String?   @map("user_id")
  user         User?     @relation(fields: [userId], references: [id])
  departmentId String?   @map("department_id")
  department   Department? @relation(fields: [departmentId], references: [id])
  value        Decimal   @db.Decimal(10, 2)
  period       String    @db.VarChar(20)
  startDate    DateTime  @map("start_date") @db.Date
  endDate      DateTime  @map("end_date") @db.Date
  @@map("targets")
}

model PerformanceEntry {
  id              String    @id @default(uuid())
  orgId           String    @map("org_id")
  organization    Organization @relation(fields: [orgId], references: [id])
  userId          String    @map("user_id")
  user            User      @relation(fields: [userId], references: [id])
  kpiId           String?   @map("kpi_id")
  kpi             Kpi?      @relation(fields: [kpiId], references: [id])
  submittedValue  Decimal   @map("submitted_value") @db.Decimal(10, 2)
  notes           String?   @db.Text
  attachments     Json?
  submissionDate  DateTime  @map("submission_date") @db.Date
  status          String    @default("pending")
  reviewedById    String?   @map("reviewed_by")
  reviewer        User?     @relation("reviewer", fields: [reviewedById], references: [id])
  reviewNotes     String?   @map("review_notes") @db.Text
  @@unique([userId, submissionDate, kpiId])
  @@map("performance_entries")
}

model Leaderboard {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  period       String;   userId String @map("user_id")
  user         User      @relation(fields: [userId], references: [id])
  rank         Int;      score Decimal @db.Decimal(10, 2)
  kpiBreakdown Json?     @map("kpi_breakdown")
  weekStart    DateTime? @map("week_start") @db.Date
  @@unique([orgId, period, userId])
  @@map("leaderboards")
}

model Notification {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  type        String;   title String; message String @db.Text
  data        Json?;    channel String @default("in_app")
  isRead      Boolean   @default(false) @map("is_read")
  sentAt      DateTime  @default(now()) @map("sent_at")
  @@map("notifications")
}

model Attachment {
  id         String    @id @default(uuid())
  orgId      String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId     String    @map("user_id")
  user       User      @relation(fields: [userId], references: [id])
  fileUrl    String    @map("file_url")
  fileName   String;   fileType String; fileSize BigInt
  entityType String?;  entityId String?
  @@map("attachments")
}

model Report {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  type        String;   format String; title String
  filters     Json?;    fileUrl String? @map("file_url")
  status      String    @default("pending")
  generatedAt DateTime? @map("generated_at")
  @@map("reports")
}

model Note {
  id         String    @id @default(uuid())
  orgId      String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId     String    @map("user_id")
  user       User      @relation(fields: [userId], references: [id])
  type       String;   content String @db.Text
  visibility String    @default("team")
  @@map("notes")
}

model Activity {
  id         String    @id @default(uuid())
  orgId      String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId     String    @map("user_id")
  user       User      @relation(fields: [userId], references: [id])
  action     String;   entityType String?; entityId String?
  ipAddress  String?;  userAgent String?; deviceInfo Json?
  @@map("activities")
}

model AuditLog {
  id         String    @id @default(uuid())
  orgId      String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId     String?   @map("user_id")
  user       User?     @relation(fields: [userId], references: [id])
  action     String;   entityType String?; entityId String?
  ipAddress  String?;  userAgent String?
  @@map("audit_logs")
}
```

## 7. Storage Layout

```
s3://itsprelude/{org_id}/
├── logos/{org_id}.svg/png
├── avatars/{user_id}.jpg
├── proofs/{perf_entry_id}/{filename}
└── reports/{report_id}.{pdf|xlsx|csv}
```

## 8. Tenant Isolation (NestJS Guard)

```typescript
@Injectable()
export class TenantGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.user?.orgId === req.params.orgId;
  }
}
```

## 9. Backup Strategy

| Backup | Frequency | Retention |
|---|---|---|
| Full pg_dump | Daily | 30 days |
| WAL archiving | Continuous | 7 days |
| Logical per-schema | Weekly | 90 days |
| PITR | On-demand | Configurable |
# ITSPRELUDE Performance System — Implementation Plan

**Version:** 1.0
**Date:** 2026-05-14
**Status:** Final Draft

---

## 1. Project Overview

- **Product:** ITSPRELUDE Performance System — AI-Powered Workforce Performance Management
- **Duration:** 16 weeks (Phase 1+2), 32 weeks (Full product)
- **Team Size:** 6 people (recommended)
- **Methodology:** Scrum (2-week sprints)
- **Repository:** `github.com/itsprelude/performance-system`

---

## 2. Team Structure

| Role | Count | Responsibilities |
|---|---|---|
| Product Manager | 1 | Requirements, prioritization, stakeholder communication |
| Tech Lead / Sr. Full-Stack | 1 | Architecture decisions, code reviews, CI/CD, DevOps |
| Frontend Developer | 2 | Next.js dashboard, reusable components, mobile-responsive UI |
| Backend Developer | 2 | NestJS APIs, database schema, AI engine integration, WebSockets |
| UI/UX Designer | 1 | (Part-time, Phase 0-2) Design system, component specs |

---

## 3. Development Phases

### Phase 0: Foundation (Weeks 1-2)

**Goal:** Set up project infrastructure, CI/CD, dev environment, design system

| Week | Tasks | Deliverables |
|---|---|---|
| W1 | Repository setup, Docker Compose, Prisma schema seed | GitHub repo, docker-compose with NestJS + PostgreSQL + Redis |
| W1 | Tailwind design tokens, ShadCN component library, Storybook | Design system documentation, Storybook instance |
| W1 | JWT auth setup (login, register, refresh, logout) | Auth controller + Prisma User model |
| W2 | RBAC middleware + guard + permission seeding | AuthGuard, RolesGuard, seed script for roles |
| W2 | Tenant isolation (TenantGuard + Interceptor + Prisma middleware) | Multi-tenant infrastructure ready |
| W2 | AWS S3 bucket setup + file upload pipeline | `POST /attachments` endpoint working |

**Milestone:** Auth system, tenant isolation, file upload working end-to-end.

---

### Phase 1: Core Features (Weeks 3-6)

**Goal:** MVP with employee management, KPI tracking, dashboards, reports

| Sprint | Backend Tasks | Frontend Tasks |
|---|---|---|
| **S1 (W3-4)** | Organization CRUD, Department CRUD, User management APIs, Roles APIs | Admin panel: org/department/user management pages, Invite user flow |
| **S2 (W5-6)** | KPI CRUD APIs, Target management APIs, Performance Entry submission APIs (POST/GET), Daily submission validation | Employee submission form, KPI configuration page, Target-setting UI |
| **S2 (W5-6)** | Leaderboard calculation logic (daily cron), Manager review APIs (approve/reject/comment) | Leaderboard page, Manager review queue UI, Status indicators |

**Milestone:** MVP live — employees can submit, managers can review, leaderboard visible.

---

### Phase 1.5: Dashboards & Reports (Weeks 7-8)

| Sprint | Backend Tasks | Frontend Tasks |
|---|---|---|
| **S3 (W7-8)** | Aggregation APIs (revenue/leads/productivity), Recharts JSON endpoints, Report generation (PDF/Excel via BullMQ job) | Founder dashboard with all widgets, Team Head dashboard, Export report UI |

**Milestone:** Role-based dashboards functional, reports downloadable.

---

### Phase 2: Intelligence & Engagement (Weeks 9-12)

**Goal:** Gamification, AI insights, notifications, mobile optimization

| Sprint | Backend Tasks | Frontend Tasks |
|---|---|---|
| **S4 (W9-10)** | Gamification system (XP points per action, achievement triggers, streak counters), Notification table + templates, BullMQ jobs (reminders, alerts), Daily/weekly/monthly leaderboard auto-refresh | Badge/achievement UI, Streak visualizations, Gamification progress page, Notification center UI |
| **S5 (W11-12)** | AI Engine microservice (FastAPI + LLM), Prompt templates (trend/burnout/forecasting), WebSocket gateway for live updates, Hourly/quarterly recalculation jobs | AI Insights panel on founder dashboard, "Ask AI" summary cards, Real-time dashboard updates via WebSocket, In-app notification toast system |

**Milestone:** Gamification active, AI insights panel running, real-time updates, notification system.

---

### Phase 3: Scale & Integrate (Weeks 13-20)

**Goal:** Third-party integrations, performance optimization, enterprise features

| Sprint | Tasks |
|---|---|
| S6 (W13-14) | Slack integration (report summaries, notifications), Google Sheets export API, WhatsApp Business API integration (reminders) |
| S7 (W15-16) | Jira/Trello/Notion integration (import tasks, sync KPIs), CRM/HRMS webhook endpoints, Performance optimization — Redis caching layer, DB query optimization, CDN setup |

**Milestone:** Integrations active, 10K+ users supported.

---

### Phase 4: Maturity (Weeks 21-32)

**Goal:** AI assistant, voice reporting, white-label SaaS

| Sprint | Tasks |
|---|---|
| S8 (W17-20) | AI conversational assistant (chat interface), Voice-to-text reporting, Advanced predictive analytics, Mobile apps (React Native — iOS/Android) |
| S9 (W21-24) | White-label branding per-org (custom domain, logo, colors), Multi-language support, Subscription billing (Stripe integration), Admin billing dashboard |
| S10 (W25-32) | Load testing (10K+ users), Security audit, Penetration testing, Documentation, Launch |

**Milestone:** Full product launch.

---

## 4. Sprint Breakdown (Detailed)

### Sprint 0 — Weeks 1-2 (Infrastructure)

```
Backlog:
  - Initialize monorepo (apps/web, apps/api, packages/shared)
  - Docker: postgres:16, redis:7, nestjs:dev, nextjs:dev
  - Prisma: schema from 05-Backend-Schema.md → migrate + seed
  - NestJS: global pipes, filters, interceptors, guards
  - Auth: JWT strategy, Local strategy, login/register endpoints
  - Tenant: extractTenant middleware → attach to request
  - AWS: S3 bucket, IAM credentials, upload presigned URL flow
  - UI: Tailwind config (colors from design system), ShadCN base
  - CI/CD: GitHub Actions → test → lint → build → deploy staging
```

### Sprint 1 — Weeks 3-4 (Organization & User Management)

```
Backend:
  - POST/GET/PUT/DELETE /organizations (Super Admin only)
  - POST/GET/PUT/DELETE /departments
  - POST/GET/PUT/DELETE /teams
  - POST /users (admin invite employee)
  - GET/PUT /users/:id
  - POST /users/bulk-invite (CSV upload)
  - Role assignment on user create

Frontend:
  - Admin layout with sidebar navigation
  - Organization settings page (logo, name, branding)
  - Department management CRUD UI
  - Team management with member assignment
  - Employee list + invite modal
  - Role management UI (permission checkboxes)
```

### Sprint 2 — Weeks 5-6 (KPI, Targets, Submissions, Leaderboard)

```
Backend:
  - CRUD /kpis (with metricType validation)
  - CRUD /targets (daily/weekly/monthly)
  - POST /performance-entries (daily submit)
  - GET /performance-entries (with filters: date, user, kpi)
  - PUT /performance-entries/:id/review (manager approve/reject)
  - Leaderboard calculation cron (daily midnight)
  - GET /leaderboard (with period filter)

Frontend:
  - Employee submission form (dynamic KPI fields per team)
  - KPI management page (admin configures KPIs)
  - Target-setting dashboard (admin/manager)
  - Leaderboard page (table + top-3 cards)
  - Manager review queue UI
```

### Sprint 3 — Weeks 7-8 (Dashboards & Reports)

```
Backend:
  - GET /analytics/dashboard/{role} — role-specific aggregation
  - GET /analytics/revenue — revenue graphs data
  - GET /analytics/conversion — funnel data
  - GET /analytics/department-comparison
  - Report generation with BullMQ (PDF via puppeteer, Excel via exceljs)
  - GET /reports/download/:id

Frontend:
  - Founder dashboard (4 summary cards, conversion funnel chart,
    weekly trend chart, department comparison, leaderboard,
    AI insights panel placeholder)
  - Team Head dashboard (activity overview, pending count,
    target completion bar, employee comparison)
  - Employee dashboard (personal progress, daily targets,
    streak display, personal rank)
  - Reports page (generate, download, schedule)
```

### Sprint 4 — Weeks 9-10 (Gamification & Notifications)

```
Backend:
  - XP points: +50 on-time submit, +100 all targets, +20 proof upload
  - Achievement badges: first_submit, 7_day_streak, top_performer, etc.
  - Notification triggers + templates (5+ types)
  - Email notification via SendGrid
  - BullMQ jobs: submission reminders (8AM), miss alerts (6PM)
  - Leaderboard auto-refresh

Frontend:
  - Achievement badge showcase component
  - Streak fire emoji counter
  - Gamification progress bar
  - Notification center (dropdown + full page)
  - Notification preferences settings
```

### Sprint 5 — Weeks 11-12 (AI Insights & Real-time)

```
Backend:
  - Python FastAPI microservice for AI
  - Prompt templates for: trend analysis, burnout prediction,
    revenue forecasting, underperformer detection
  - Daily cron triggers AI analysis at 10PM
  - WebSocket gateway in NestJS
  - Event emitter for: submission → broadcast update

Frontend:
  - AI insights panel component (card + expandable details)
  - Weekly AI digest card
  - WebSocket connection manager hook
  - Real-time KPI progress updates
  - Live notification toast system
```

---

## 5. Milestones & Timeline

```
Milestone              Date (Wk)   What's Delivered
─────────────────────────────────────────────────────
M0: Dev Ready          Week 2      Auth, tenant isolation, CI/CD, design system
M1: MVP Launch         Week 6      Employees submit, managers review, leaderboard
M2: Decision-ready     Week 8      All dashboards live, reports downloadable
M3: Engagement         Week 10     Gamification running, notifications active
M4: AI Live            Week 12     AI insights panel, real-time updates
M5: Integrated         Week 16     Slack/Sheets/WhatsApp/Jira integrations done
M6: Optimized          Week 20     ɜ-optimized, 10K capacity verified
M7: Full Launch        Week 32     White-label, mobile apps, billing, security audit
```

---

## 6. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI accuracy low | Medium | Medium | Start with rule-based insights, iterate with LLM |
| Multi-tenant data leak | Low | Critical | RLS at DB level + tenant guard in code + audit logs |
| Performance at 10K users | Medium | High | Redis caching, DB indexing optimization from week 1 |
| Scope creep (feature requests) | High | Medium | Strict sprint zero definition, PM gatekeeping |
| Integration complexity | Medium | Medium | Abstract integration behind adapter pattern |
| Team bandwidth (6 people) | Medium | Medium | Prioritize Phase 1-2, defer Phase 3-4 |
| Mobile responsiveness | Low | Medium | Mobile-first design enforced from Sprint 0 |

---

## 7. Definition of Done

Every user story must meet these criteria before acceptance:
1. **Code:** PR reviewed (2 approvals), lint pass, typecheck pass
2. **Tests:** Unit tests ≥80% coverage for new code
3. **API:** Tested via Postman/Insomnia collection
4. **Frontend:** Renders correctly on 375px, 768px, 1440px
5. **Dark/Light Mode:** Both modes checked
6. **Error States:** Handles loading, empty, error, success
7. **Accessibility:** Keyboard navigable, screen reader labels
8. **Docs:** API endpoint documented in Swagger/ReadMe
9. **Deployed:** Running on staging environment

---

## 8. Estimation Reference (Story Points)

| Item | SP | Team Days |
|---|---|---|
| Simple API (CRUD, no logic) | 3 | 1.5 |
| Complex API (aggregation, multi-step) | 8 | 4 |
| Simple UI page (form, table) | 5 | 2.5 |
| Complex UI page (charts, filters, real-time) | 13 | 6 |
| Integration (Slack, Google Sheets) | 13 | 6 |
| AI feature (prompt engineering, pipeline) | 13 | 6 |
| DB migration + seed | 3 | 1.5 |
| Report generation (PDF) | 5 | 2.5 |
| Gamification system | 8 | 4 |
| Notification system | 8 | 4 |
| WebSocket integration | 5 | 2.5 |

Team velocity: ~30 SP/sprint (6 people × 5 SP/person/week)

Total estimate: ~290 SP across all 4 phases → ~10 sprints → 20 weeks

---

## 9. CI/CD Pipeline

```
Developer commits → GitHub
         │
         ▼
GitHub Actions:
  ├─ Lint (ESLint + Prettier)
  ├─ Typecheck (tsc)
  ├─ Test (Jest + Playwright)
  ├─ Build (next build, nest build)
  ├─ Docker image build + push to ECR
  └─ Deploy:
       ├─ main branch → staging (Vercel + ECS)
       └─ production tag → production (with approval gate)
```

**Environments:**

| Env | URL | Infrastructure |
|---|---|---|
| Local | localhost:3000 | Docker Compose |
| Staging | staging.itsprelude.com | Vercel + ECS free tier |
| Production | app.itsprelude.com | AWS ECS (Fargate) + RDS |

---

## 10. Monitoring & Observability Stack

| Tool | Purpose | When |
|---|---|---|
| Sentry | Error tracking | From Sprint 0 |
| New Relic / Datadog | APM, DB query perf, API latency | From Sprint 3 |
| Logtail / ELK | Centralized logging | From Sprint 0 |
| Grafana + Prometheus | Server metrics, business dashboards | From Sprint 0 |
| Uptime Robot / Better Uptime | External uptime monitoring | Before MVP launch |
| Lighthouse CI | Performance budget checks | CI pipeline |

---

## 11. Quality Gates (per Phase)

| Gate | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|
| Unit test coverage | ≥60% | ≥70% | ≥80% | ≥85% |
| E2E test coverage | — | Key flows | All core flows | All flows |
| Lighthouse score | — | ≥80 | ≥90 | ≥95 |
| API response p95 | <500ms | <300ms | <200ms | <150ms |
| Load test (concurrent) | — | 1,000 | 5,000 | 10,000 |
| Security scan | Pass | Pass | Pass | Pass + pen test |

---

## 12. Cost Estimation (Monthly AWS)

| Service | Estimate | Phase |
|---|---|---|
| ECS Fargate (2× t3.medium) | $120 | Phase 1-2 |
| RDS PostgreSQL (db.t3.medium) | $80 | Phase 1-2 |
| ElastiCache Redis (t3.micro) | $20 | Phase 1-2 |
| S3 storage + CDN | $15 | Phase 1-2 |
| Vercel Pro (frontend) | $20 | Phase 1-2 |
| SendGrid email | $15 | Phase 2+ |
| OpenAI API (AI insights) | $50 | Phase 2+ |
| **Total Phase 1-2** | **~$320/mo** | |
| ECS scale up (4× t3.large) | +$400 | Phase 3+ |
| RDS upgrade (db.r6g.large) | +$200 | Phase 3+ |
| **Total Phase 3+** | **~$920/mo** | |

---

## 13. Launch Checklist

### Pre-Launch (Week 31)
- [ ] Load test passed (10K concurrent)
- [ ] Security penetration test passed
- [ ] GDPR/Data privacy compliance verified
- [ ] All integrations end-to-end tested
- [ ] AI accuracy validated against test dataset
- [ ] Backup & disaster recovery tested
- [ ] Monitoring dashboards set up
- [ ] Runbook documented (incident response)

### Launch (Week 32)
- [ ] DNS pointed to production
- [ ] SSL certificates valid
- [ ] Staging → production promotion
- [ ] Email notifications live
- [ ] Admin onboarding documentation ready
- [ ] Support email active (support@itsprelude.com)
- [ ] Status page live (status.itsprelude.com)
- [ ] Post-launch: 48-hour monitoring watch

### Post-Launch (Weeks 33-36)
- [ ] Bug triage (priority P0-P1 fixes)
- [ ] User feedback collection
- [ ] Performance tuning based on real traffic
- [ ] Feature roadmap refinement based on usage

---

## 14. Communication Plan

| Cadence | Meeting | Attendees |
|---|---|---|
| Daily (15 min) | Standup | Dev team |
| Weekly (30 min) | Sprint review | Dev team + PM |
| Bi-weekly (1 hr) | Sprint planning | Dev team + PM |
| Monthly (30 min) | Stakeholder update | PM + Founder/Client |
| Per-sprint (1 hr) | Retrospective | Dev team |

**Tools:** Slack (daily), Linear/Jira (tickets), Notion (docs), Google Meet (standups)

---

## 15. Key Dependencies

| Dependency | Version | Notes |
|---|---|---|
| Node.js | ≥20 LTS | Runtime |
| PostgreSQL | ≥16 | Database |
| Redis | ≥7 | Cache + queue |
| Docker | ≥24 | Containerization |
| Next.js | ≥14 | Frontend framework |
| NestJS | ≥11 | Backend framework |
| Prisma | ≥5 | ORM |
| React | ≥19 | UI library |
| Tailwind CSS | ≥4 | Styling |
| ShadCN UI | Latest | Component library |
| Stripe | Latest | Billing (Phase 4) |
| OpenAI API | Latest | AI insights (Phase 2+) |
| SendGrid | Latest | Email (Phase 1) |
# ITSPRELUDE Performance System — Master Build Prompt

> Copy this entire document into Gemini (or any AI coding agent) as the single instruction to build the full application.

---

## SYSTEM INSTRUCTION

You are building the **ITSPRELUDE Performance System** — an AI-powered workforce performance & productivity management SaaS platform. This is a complete build-from-scratch project. Follow every section below in order. Do not skip steps. Do not make assumptions outside these specs.

---

## TECH STACK (LOCKED — DO NOT DEVIATE)

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React 19 | RSC, streaming, image optimization |
| Styling | Tailwind CSS 4 | Zero runtime CSS, purged unused |
| Components | ShadCN UI (tree-shaken imports only) | Accessible, customizable |
| Charts | Recharts (lazy loaded via next/dynamic) | Declarative SVG, 35KB deferred |
| Forms | React Hook Form + Zod | Minimal re-renders, type-safe |
| Server State | TanStack Query (React Query) | Caching, optimistic updates |
| Client State | Zustand (~1KB) | Tiny, no boilerplate |
| Icons | Lucide React (tree-shaken) | Import only what you use |
| Fonts | Inter + JetBrains Mono (self-hosted woff2) | Zero CLS, font-display: swap |
| Auth | NextAuth.js (or Clerk if preferred) | JWT with httpOnly refresh tokens |
| Backend | NestJS + Prisma + PostgreSQL 16 + Redis 7 | REST API + WebSocket |
| Deployment | Docker + Vercel (frontend) / AWS ECS (backend) | — |

**Bundle budget:** Initial JS ≤ 150KB gzip, Initial CSS ≤ 30KB gzip, LCP < 1.8s

---

## WHAT TO BUILD — COMPLETE FEATURE LIST

### Phase 1: Foundation (Build First)
```
1. Authentication (login, register, forgot password, JWT refresh)
2. Multi-tenant organization setup (create org, invite users)
3. Role-based access control (Super Admin, Founder, Manager, Employee)
4. Layout shell (sidebar, top navbar, responsive drawer on mobile)
5. Dark/Light mode toggle
```

### Phase 2: Core Features (Build Second)
```
6. Employee dashboard (daily targets, submission form, performance summary, rank)
7. Daily performance submission with dynamic KPI fields per team
8. Manager dashboard (team activity, pending reviews, underperformers)
9. Manager review flow (approve/reject/comment on submissions)
10. Founder dashboard (revenue, KPI summary, conversion funnel, weekly trends, AI insights)
11. KPI management (CRUD, dynamic KPI builder with custom scoring logic)
12. Target management (daily/weekly/monthly targets per user/team/department)
```

### Phase 3: Engagement (Build Third)
```
13. Leaderboard (daily/weekly/monthly rankings with XP points)
14. Gamification (achievement badges, streaks, rewards system)
15. Notification system (in-app + email, reminders, alerts)
16. Real-time updates via WebSocket (live dashboard refreshes)
```

### Phase 4: Admin & Polish (Build Last)
```
17. Organization management (departments, teams, roles, permissions)
18. Reporting system (daily/weekly/monthly reports, PDF/Excel/CSV export)
19. AI insights panel (trend analysis, burnout detection, revenue forecasting)
20. User management (employee list with filters, bulk invite, status tracking)
21. Activity monitoring (login tracking, submission history, work consistency)
22. Settings (org branding, subscription, profile)
```

---

## DATABASE SCHEMA (Prisma)

Create exactly these models. All tables are tenant-scoped by `orgId`.

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

model Organization {
  id          String    @id @default(uuid())
  name        String    @db.VarChar(255)
  slug        String    @unique @db.VarChar(255)
  logoUrl     String?   @map("logo_url")
  settings    Json      @default("{}")
  colors      Json      @default("{}")
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  users       User[];   departments Department[]; teams Team[]
  kpis        Kpi[];    targets Target[]; performanceEntries PerformanceEntry[]
  notifications Notification[]; leaderboards Leaderboard[]
  activities  Activity[]; auditLogs AuditLog[]; reports Report[]
  notes       Note[];   attachments Attachment[]
}

model User {
  id              String    @id @default(uuid())
  orgId           String    @map("org_id")
  organization    Organization @relation(fields: [orgId], references: [id])
  firstName       String    @map("first_name") @db.VarChar(100)
  lastName        String    @map("last_name") @db.VarChar(100)
  email           String    @unique @db.VarChar(255)
  passwordHash    String    @map("password_hash")
  phone           String?   @db.VarChar(20)
  designation     String?   @db.VarChar(200)
  departmentId    String?   @map("department_id")
  department      Department? @relation(fields: [departmentId], references: [id])
  managerId       String?   @map("manager_id")
  manager         User?     @relation("UserToManager", fields: [managerId], references: [id])
  directReports   User[]    @relation("UserToManager")
  roleId          String    @map("role_id")
  role            Role      @relation(fields: [roleId], references: [id])
  branch          String?   @db.VarChar(200)
  joiningDate     DateTime  @map("joining_date") @db.Date
  employmentStatus String   @default("active") @map("employment_status")
  isActive        Boolean   @default(true) @map("is_active")
  profileImageUrl String?   @map("profile_image_url")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  performanceEntries PerformanceEntry[]; notes Note[]; attachments Attachment[]
  targets Target[]; reviewsDone PerformanceEntry[] @relation("reviewer")
  activities Activity[]; leaderboardEntries Leaderboard[]
  reports Report[]; notifications Notification[]; userTeams UserTeam[]
  @@unique([email, orgId])
  @@map("users")
}

model Department {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  name        String    @db.VarChar(200)
  headId      String?   @map("head_id")
  head        User?     @relation(fields: [headId], references: [id])
  description String?
  users       User[];   teams Team[]; kpis Kpi[]; targets Target[]
  @@unique([name, orgId])
  @@map("departments")
}

model Team {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  name         String    @db.VarChar(200)
  departmentId String?   @map("department_id")
  department   Department? @relation(fields: [departmentId], references: [id])
  leadId       String?   @map("lead_id")
  lead         User?     @relation(fields: [leadId], references: [id])
  members      UserTeam[]; kpis Kpi[]; targets Target[]
  @@unique([name, orgId])
  @@map("teams")
}

model UserTeam {
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  teamId    String   @map("team_id")
  team      Team     @relation(fields: [teamId], references: [id])
  joinedAt  DateTime @default(now()) @map("joined_at")
  @@id([userId, teamId])
  @@map("user_teams")
}

model Role {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  name        String    @db.VarChar(100)
  description String?
  permissions Json
  isSystem    Boolean   @default(false) @map("is_system")
  users       User[]
  @@unique([name, orgId])
  @@map("roles")
}

model Kpi {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  departmentId String?   @map("department_id")
  department   Department? @relation(fields: [departmentId], references: [id])
  teamId       String?   @map("team_id")
  team         Team?     @relation(fields: [teamId], references: [id])
  name         String    @db.VarChar(200)
  metricType   String    @map("metric_type")
  description  String?
  targetValue  Decimal?  @map("target_value") @db.Decimal(10, 2)
  unit         String?   @db.VarChar(50)
  weightage    Int       @default(1)
  scoringLogic Json?     @map("scoring_logic")
  isActive     Boolean   @default(true) @map("is_active")
  entries      PerformanceEntry[]; targets Target[]
  @@unique([name, orgId])
  @@map("kpis")
}

model Target {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  kpiId        String    @map("kpi_id")
  kpi          Kpi       @relation(fields: [kpiId], references: [id])
  userId       String?   @map("user_id")
  user         User?     @relation(fields: [userId], references: [id])
  departmentId String?   @map("department_id")
  department   Department? @relation(fields: [departmentId], references: [id])
  value        Decimal   @db.Decimal(10, 2)
  period       String    @db.VarChar(20) // daily | weekly | monthly | quarterly
  startDate    DateTime  @map("start_date") @db.Date
  endDate      DateTime  @map("end_date") @db.Date
  @@map("targets")
}

model PerformanceEntry {
  id              String    @id @default(uuid())
  orgId           String    @map("org_id")
  organization    Organization @relation(fields: [orgId], references: [id])
  userId          String    @map("user_id")
  user            User      @relation(fields: [userId], references: [id])
  kpiId           String?   @map("kpi_id")
  kpi             Kpi?      @relation(fields: [kpiId], references: [id])
  submittedValue  Decimal   @map("submitted_value") @db.Decimal(10, 2)
  notes           String?   @db.Text
  attachments     Json?
  submissionDate  DateTime  @map("submission_date") @db.Date
  status          String    @default("pending") // pending | approved | rejected
  reviewedById    String?   @map("reviewed_by")
  reviewer        User?     @relation("reviewer", fields: [reviewedById], references: [id])
  reviewNotes     String?   @map("review_notes") @db.Text
  @@unique([userId, submissionDate, kpiId])
  @@map("performance_entries")
}

model Leaderboard {
  id           String    @id @default(uuid())
  orgId        String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  period       String;   userId String @map("user_id")
  user         User      @relation(fields: [userId], references: [id])
  rank         Int;      score Decimal @db.Decimal(10, 2)
  kpiBreakdown Json?;    weekStart DateTime? @map("week_start") @db.Date
  @@unique([orgId, period, userId])
  @@map("leaderboards")
}

model Notification {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  type        String;   title String; message String @db.Text
  data        Json?;    channel String @default("in_app")
  isRead      Boolean   @default(false) @map("is_read")
  sentAt      DateTime  @default(now()) @map("sent_at")
  @@map("notifications")
}

model Attachment {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  fileUrl     String    @map("file_url")
  fileName    String;   fileType String; fileSize BigInt
  entityType  String?;  entityId String?
  @@map("attachments")
}

model Report {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  type        String;   format String; title String
  filters     Json?;    fileUrl String?; status String @default("pending")
  generatedAt DateTime?
  @@map("reports")
}

model Note {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  type        String;   content String @db.Text
  visibility  String    @default("team")
  @@map("notes")
}

model Activity {
  id          String    @id @default(uuid())
  orgId       String    @map("org_id")
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id])
  action      String;   entityType String?; entityId String?
  ipAddress   String?;  userAgent String?
  @@map("activities")
}
```

---

## API ENDPOINTS (NestJS)

Build all endpoints under `/api/v1/`. Use RESTful conventions.

### Authentication
```
POST   /auth/login                → { accessToken, refreshToken, user }
POST   /auth/register             → { user }
POST   /auth/logout               → invalidate refresh token
POST   /auth/refresh-token        → { accessToken }
POST   /auth/forgot-password      → email reset link
POST   /auth/reset-password       → new password
```

### Organizations
```
GET    /organizations             → list (super admin only)
POST   /organizations             → create
GET    /organizations/:id         → details
PUT    /organizations/:id         → update branding
DELETE /organizations/:id         → soft delete
```

### Users
```
GET    /users                     → list (paginated, filterable)
POST   /users                     → create (admin invite)
POST   /users/bulk-invite         → CSV/email bulk invite
GET    /users/:id                 → profile
PUT    /users/:id                 → update
DELETE /users/:id                 → soft delete (deactivate)
```

### Departments & Teams
```
GET    /departments               → list per org
POST   /departments               → create
PUT    /departments/:id           → update
DELETE /departments/:id           → delete
GET    /teams                     → list per org
POST   /teams                     → create
PUT    /teams/:id                 → update
DELETE /teams/:id                 → delete
```

### KPIs & Targets
```
GET    /kpis                      → list (filter by dept/team)
POST   /kpis                      → create (dynamic KPI builder)
PUT    /kpis/:id                  → update (scoring logic, weightage)
DELETE /kpis/:id                  → soft delete
GET    /targets                   → list (filter by user/period)
POST   /targets                   → create
PUT    /targets/:id               → update
DELETE /targets/:id               → delete
```

### Performance Entries
```
POST   /performance-entries       → submit daily
GET    /performance-entries       → list (filter by user/date/status)
PUT    /performance-entries/:id/review  → approve/reject with notes
GET    /performance-entries/summary     → aggregated per user
GET    /performance-entries/team        → team-level aggregation
```

### Dashboard Analytics
```
GET    /analytics/kpi-summary     → 4 KPI cards for founder
GET    /analytics/conversion-funnel     → calls → leads → meetings → closures
GET    /analytics/weekly-trends         → line chart data (7 days)
GET    /analytics/department-comparison → bar chart per dept
GET    /analytics/revenue              → revenue over time
```

### Leaderboard
```
GET    /leaderboard               → ?period=daily|weekly|monthly&limit=10
GET    /leaderboard/user/:id      → specific user rank
```

### Reports
```
GET    /reports                   → list generated reports
POST   /reports/generate          → trigger generation (returns report ID)
GET    /reports/:id/download      → download PDF/Excel/CSV
GET    /reports/schedule          → list scheduled reports
POST   /reports/schedule          → schedule auto-report
```

### Notifications
```
GET    /notifications             → list (paginated, newest first)
PATCH  /notifications/:id/read    → mark as read
PATCH  /notifications/read-all    → mark all as read
```

### AI Insights
```
GET    /insights                  → trend analysis, burnouts, forecasts
GET    /insights/summary          → weekly AI digest
```

---

## UI/UX SPECIFICATIONS

### Design Tokens (Tailwind Custom Colors)
```css
/* Use these exact Tailwind classes — no other colors */
surface-primary: #0F172A      /* bg, sidebar, headers */
surface-secondary: #1E293B    /* cards, modals, inputs */
surface-tertiary: #334155     /* borders, dividers */
text-primary: #F1F5F9         /* main text */
text-secondary: #94A3B8       /* muted text */
text-muted: #64748B            /* placeholders */
accent-action: #F59E0B        /* CTAs, active states, amber */
accent-success: #10B981       /* green - on track */
accent-danger: #EF4444        /* red - off track, alerts */
```

### Typography Classes
```css
font-display → Manrope or Inter (headings)
font-body    → Inter (body text)
font-mono    → JetBrains Mono (numbers, data, code)

.text-hero     → clamp(1.75rem, 2.5vw, 2rem)    /* page titles */
.text-heading  → clamp(1.125rem, 1.5vw, 1.25rem) /* section headers */
.text-body     → clamp(0.875rem, 1vw, 1rem)      /* body */
.text-small    → 0.875rem                        /* labels */
.text-caption  → 0.75rem                         /* metadata */
.text-data     → clamp(1.25rem, 2vw, 1.5rem)     /* KPI numbers in JetBrains Mono */
```

### Spacing (use Tailwind classes: gap-xs(0.25rem), gap-sm(0.5rem), gap-md(1rem), gap-lg(1.5rem), gap-xl(2rem))
```
xs = 0.25rem (4px)     — micro gaps
sm = 0.5rem  (8px)     — small gaps
md = 1rem    (16px)    — standard padding (BASE UNIT)
lg = 1.5rem  (24px)    — section padding
xl = 2rem    (32px)    — between major blocks
```

### Corner Radius (Tailwind: rounded-sm, rounded-md, rounded-lg)
```
rounded-sm = 0.375rem (6px)   — inputs, buttons
rounded-md = 0.5rem   (8px)   — cards
rounded-lg = 0.75rem  (12px)  — modals, drawers
```

### Layout Pattern
```
Desktop (≥1024px): Fixed sidebar (256px) + content area + top navbar (56px)
Tablet (640-1023px): Collapsible sidebar, full-width content
Mobile (<640px): Slide-out drawer sidebar, stacked content, bottom nav optional
```

### Every Component Must Handle These 4 States
```
1. LOADING  → <Skeleton /> with same dimensions as real content
2. EMPTY    → Illustration + "No data yet" + CTA button to take action
3. ERROR    → Error message (human readable) + Retry button
4. NORMAL   → Real data rendered immediately (no animations on mount)
```

---

## PAGES TO BUILD (with file paths)

### Auth Pages
```
/app/(auth)/login/page.tsx        → email + password form, redirect based on role
/app/(auth)/register/page.tsx     → org signup with wizard
/app/(auth)/forgot-password/page.tsx
/app/(auth)/layout.tsx            → centered card on dark gradient bg
```

### Employee Pages
```
/app/(dashboard)/employee/page.tsx     → daily targets + submission form + performance + rank
/app/(dashboard)/employee/submit/page.tsx → full-screen submission (alternative)
/app/(dashboard)/employee/profile/page.tsx → user settings
```

### Manager Pages
```
/app/(dashboard)/manager/page.tsx            → team activity, pending reviews, underperformers
/app/(dashboard)/manager/team/[id]/page.tsx  → team detail view
/app/(dashboard)/manager/review/[id]/page.tsx → approve/reject individual submission
```

### Founder/Admin Pages
```
/app/(dashboard)/founder/page.tsx             → KPIs, funnel, trends, AI insights, leaderboard
/app/(dashboard)/founder/employees/page.tsx   → CRUD table (virtualized)
/app/(dashboard)/founder/employees/[id]/page.tsx → employee detail/edit
/app/(dashboard)/founder/departments/page.tsx  → manage departments
/app/(dashboard)/founder/teams/page.tsx       → manage teams
/app/(dashboard)/founder/kpis/page.tsx        → dynamic KPI builder
/app/(dashboard)/founder/targets/page.tsx     → bulk target editor
/app/(dashboard)/founder/leaderboard/page.tsx → full leaderboard with filters
/app/(dashboard)/founder/reports/page.tsx     → generate & download reports
/app/(dashboard)/founder/settings/page.tsx    → org branding, subscription
/app/(dashboard)/founder/analytics/page.tsx   → full analytics page
```

### Shared Layout
```
/app/(dashboard)/layout.tsx    → sidebar + navbar shell, auth check
/app/globals.css               → Tailwind directives + design tokens
/app/layout.tsx                → fonts, providers, metadata
/app/error.tsx                 → global error boundary
/middleware.ts                 → auth + role-based routing
```

---

## COMPONENT STATES (Copy These Patterns)

### Pattern for Every Data Component
```tsx
// ✅ CORRECT PATTERN — use this for ALL data-fetching components
'use client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export function MyDataComponent() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['my-data'],
    queryFn: () => apiClient.get('/my-endpoint'),
  });

  // 1. LOADING
  if (isLoading) return <div className="grid grid-cols-2 gap-md">{Array(4).fill(0).map((_,i) => <Skeleton key={i} className="h-24 rounded-md" />)}</div>;

  // 2. ERROR
  if (isError) return (
    <div className="flex flex-col items-center gap-sm p-lg text-center">
      <AlertCircle className="text-accent-danger" size={32} />
      <p className="text-body text-text-primary">{(error as Error).message}</p>
      <button onClick={() => refetch()} className="text-accent-action text-small hover:underline">Try again</button>
    </div>
  );

  // 3. EMPTY
  if (!data || (Array.isArray(data) && data.length === 0)) return (
    <div className="flex flex-col items-center gap-sm p-lg text-center">
      <p className="text-body text-text-secondary">No data yet</p>
    </div>
  );

  // 4. NORMAL
  return <div>{/* render data */}</div>;
}
```

### SubmissionForm Component (Critical Path)
```
┌───────────────────────────────────────────────┐
│  Daily Submission                      (card)  │
│                                                │
│  Calls Made:   [30   ] ✓                       │
│  Messages:     [50   ] ✓                       │
│  Leads:        [8    ] ✓                       │
│  Meetings:     [2    ] ✓                       │
│                                                │
│  Notes: ┌─────────────────────────────┐        │
│  (opt)  │                              │        │
│         └─────────────────────────────┘        │
│                                                │
│  [📎 Attach Proof]   [▶ Submit Today]         │
│                         (amber btn)            │
└───────────────────────────────────────────────┘

States:
- LOADING: 4 skeleton input fields
- EMPTY: "No KPIs configured. Ask your manager."
- FORM: Dynamic fields based on user's team KPIs
- SUBMITTING: Button spinner + fields disabled
- SUCCESS: Green toast "Submitted! Streak: X days"
- ERROR: Red toast + inline errors + auto-save draft
- OFFLINE: Yellow banner "Saving draft..." + queue on reconnect
```

### KpiCard Component
```
┌──────────────────────────────────┐
│  📞 Calls Made                   │
│  30 / 50                         │
│  ▓▓▓▓▓▓▓▓▓░░░░░░░░  60%         │
│  ▲ +5% from yesterday            │
└──────────────────────────────────┘

Color coding:
- Green (accent-success): ≥80% of target (on track)
- Amber (accent-action): 50-79% (warning)
- Red (accent-danger): <50% (critical)
- Gray: no data yet
Progress bar: CSS transition width 500ms, no JS animation
```

---

## BUILD ORDER (Sequential — Do Not Skip)

```
HOUR 1-2:   Project init
  - npx create-next-app with TypeScript + Tailwind + App Router
  - npx shadcn@latest init (choose Neutral, CSS variables)
  - Configure tailwind.config.ts with custom colors
  - Download fonts, add to public/fonts/
  - Create globals.css with design tokens
  - Set up lib/api-client.ts (fetch wrapper with auth refresh)
  - Set up lib/auth.ts (NextAuth config)
  - Set up providers (ThemeProvider, QueryClientProvider)
  - Create root layout.tsx with font loading
  - Create middleware.ts with auth + role guard

HOUR 3-4:   Auth + Layout Shell
  - Login page (email/password form)
  - Register page (org creation wizard)
  - Forgot password page
  - Dashboard layout (sidebar + top navbar + responsive)
  - Sidebar component (collapsible, menu items per role)
  - Theme toggle (dark/light)
  - Error boundary at root + per route

HOUR 5-6:   Employee Dashboard
  - DailyTargetsCard (server fetch → client revalidation)
  - SubmissionForm (dynamic KPI fields, validation, optimistic update)
  - PerformanceSummary (mini chart, lazy loaded)
  - YourRank (server component, no JS needed)

HOUR 7-8:   Manager Dashboard
  - TeamActivityOverview (online status, pending submissions)
  - PendingReviewsList (submissions awaiting approval)
  - UnderperformersTable (below 50% target)
  - Review flow (approve/reject with notes)
  - Department analytics (comparison bar chart)

HOUR 9-10:  Founder Dashboard
  - KpiSummaryGrid (4 cards: revenue, leads, employees, productivity)
  - ConversionFunnel (Recharts funnel chart, lazy)
  - WeeklyTrends (Recharts line chart, lazy)
  - LeaderboardPreview (top 5, server component)
  - AI Insights Panel (lazy loaded cards with NL text)

HOUR 11-12: Admin Pages
  - Employees table (virtualized, sortable, filterable)
  - Employee detail/edit form
  - Departments CRUD
  - Teams CRUD
  - Dynamic KPI builder (name, type, weightage, scoring logic)
  - Target management (bulk editor per period)

HOUR 13-14: Leaderboard + Reports
  - Full leaderboard (tabs for daily/weekly/monthly, filters)
  - User rank card (personal position with trend)
  - Reports list + generate action
  - Report download (PDF/Excel/CSV)
  - Achievement badges display
  - Streak counter

HOUR 15-16: Notifications + WebSocket
  - Notification center (dropdown + full page)
  - WebSocket hook (useWebSocket)
  - Real-time dashboard updates (KPI refresh on submission)
  - Live notification toast
  - Reminder system (cron-based notifications)
  - Settings page (profile, notification prefs, org branding)
```

---

## PERFORMANCE RULES (Non-Negotiable)

1. **All charts lazy loaded** via `next/dynamic` with `ssr: false`
2. **Tables virtualized** (tanstack-table + windowing) for >100 rows
3. **No Framer Motion** — use CSS transitions only (`transition: transform 200ms, opacity 200ms`)
4. **All fonts self-hosted** with `font-display: swap`
5. **Images use Next.js `<Image>`** with remotePatterns config
6. **API calls use React Query** with staleTime ≥ 30s for dashboard data
7. **Optimistic updates** on form submissions (update UI → POST → rollback on error)
8. **Suspense boundaries** around every data-fetching component
9. **Prefer Server Components** — only add `'use client'` when interactivity is needed
10. **CSS containment** (`contain: content`) on dashboard widgets

---

## CRITICAL UI PATTERNS

### Sidebar
- Server component shell (menu items from config + role check)
- Collapse toggle → CSS transform only (no JS animation)
- Mobile: off-screen with overlay, toggle via hamburger
- Active route: amber left border (2px) + slightly brighter text

### Top Navbar
- Fixed height 56px with backdrop blur (backdrop-filter: blur(12px))
- Left: Logo + breadcrumb
- Right: Theme toggle + notification bell + profile dropdown
- Profile dropdown: name, email, role badge, settings link, logout

### Data Table
- Header row: sticky, sort indicators on clickable columns
- Rows: striped (every other row slightly different bg), hover highlight
- Pagination: "Showing X-Y of Z" + page buttons + page size selector
- Empty: centered illustration + "No results" + clear filters button
- Loading: skeleton rows matching column widths
- Error: inline error + retry button

### Forms
- All inputs show validation error below field (red text + border)
- Submit button shows spinner during submission
- On success: green toast, redirect or clear form
- On error: scroll to first error field, show toast
- Unsaved changes: prompt before navigation

### Notifications
- Bell icon in navbar with unread count badge
- Dropdown: last 5 notifications, mark as read on click
- Full page: paginated list with filter by type
- Toast: auto-dismiss after 5s, stackable, click to dismiss

---

## FINAL INSTRUCTIONS

- Use TypeScript strictly — no `any` unless unavoidable
- All Tailwind classes from the custom tokens only
- Every page must handle loading, empty, error, and normal states
- No third-party animation libraries (CSS only)
- All data fetching through TanStack Query
- All forms through React Hook Form + Zod
- Bundle analyzer must show initial JS ≤ 150KB
- Lighthouse score must be ≥ 90 for Performance, Accessibility, Best Practices
- After building, output `npm run build` must pass with zero errors

---

*End of Master Build Prompt. Copy and paste this entire document into Gemini/Cursor/Claude to build ITSPRELUDE Performance System from scratch.*
