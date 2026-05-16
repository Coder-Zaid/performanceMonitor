# Auth Overhaul Plan — ITSPRELUDE

## Issues Identified

1. **Frontend (NextAuth) and Backend (NestJS JWT) are separate auth systems** — they don't talk to each other. JWTs signed with backend's `JWT_SECRET` are not verifiable by NextAuth and vice versa.

2. **middleware.ts is disabled** — renamed to `middleware.ts.bak`. Route protection won't work. Users can hit `/founder`, `/manager`, etc. without being authenticated.

3. **api-client.ts never attaches Authorization header** — requests fire without tokens. Backend guards reject everything with 401. The 401 handler is empty, so UI silently fails.

## Proposed Solution: Clerk

Clerk handles both frontend and backend auth. NestJS backend verifies Clerk tokens via Clerk SDK.

### Prerequisites (before implementation)
- [ ] Build research doc — Clerk SDK setup for Next.js + NestJS
- [ ] Final workflow doc — auth flow diagram, token lifecycle, route protection

### Implementation Steps
1. Replace NextAuth with Clerk SDK on the frontend
2. Integrate Clerk SDK on NestJS backend to verify Clerk tokens
3. Rename `middleware.ts.bak` → `middleware.ts` and fix route protection with Clerk middleware
4. Fix `api-client.ts` to attach Clerk session token as `Authorization: Bearer <token>` header
5. Add proper 401 handler so UI surfaces auth errors

## Rename Note (unrelated)
- Vora → Norenn (agrovow project, not itsprelude)
