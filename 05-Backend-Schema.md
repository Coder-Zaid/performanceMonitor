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
