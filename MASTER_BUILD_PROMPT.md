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
