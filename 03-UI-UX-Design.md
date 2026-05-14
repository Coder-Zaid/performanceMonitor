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

