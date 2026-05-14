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