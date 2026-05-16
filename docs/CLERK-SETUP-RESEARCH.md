# Clerk Setup Research — Next.js + NestJS

## Frontend (Next.js)

### Installation
```bash
npm install @clerk/nextjs
```

### Environment Variables
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Layout Setup
Wrap the root layout with `<ClerkProvider>`.

### Middleware Protection
Use `clerkMiddleware()` in `middleware.ts`. Clerk handles the session cookie and token validation.

## Backend (NestJS)

### Installation
```bash
npm install @clerk/backend
```

### Authentication Guard
We need a custom `ClerkAuthGuard` that:
1. Extracts the Bearer token from the `Authorization` header.
2. Uses `@clerk/backend`'s `verifyToken` or `authenticateRequest` to validate the token.
3. Attaches the user metadata (id, role, etc.) to the request object.

### Role Extraction
Clerk allows storing custom data in `publicMetadata`. We can store the user's role (super_admin, founder, manager, employee) there and extract it in the backend guard.

## Token Lifecycle
1. Frontend signs in with Clerk.
2. Clerk provides a short-lived Session Token (JWT).
3. Frontend uses `getToken()` from Clerk hooks to get the JWT.
4. JWT is sent to backend in `Authorization: Bearer <token>` header.
5. Backend verifies JWT using Clerk's Secret Key (stored in backend `.env`).
