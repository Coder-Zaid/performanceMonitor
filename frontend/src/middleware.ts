import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that do NOT require authentication
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/forgot-password(.*)",
  "/api/auth(.*)",           // legacy NextAuth route (now a placeholder)
  "/api/webhooks(.*)",       // Clerk webhooks must be public
]);

export default clerkMiddleware(async (auth, req) => {
  const { nextUrl } = req;

  // Skip middleware logic for public routes — no auth needed
  if (isPublicRoute(req)) {
    const authObj = await auth();
    const { userId, sessionClaims } = authObj;

    // But if a logged-in user hits /login or /register, bounce them to their dashboard
    if (userId) {
      const role = (sessionClaims?.publicMetadata as any)?.role || "employee";
      if (role === "super_admin") return NextResponse.redirect(new URL("/super-admin", nextUrl));
      if (role === "founder")     return NextResponse.redirect(new URL("/founder", nextUrl));
      if (role === "manager")     return NextResponse.redirect(new URL("/manager", nextUrl));
      return NextResponse.redirect(new URL("/employee", nextUrl));
    }

    return NextResponse.next();
  }

  // All other routes are protected — verify auth
  const authObj = await auth();
  const { userId, sessionClaims } = authObj;

  if (!userId) {
    // Not authenticated — redirect to login
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("redirect_url", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = (sessionClaims?.publicMetadata as any)?.role || "employee";

  // Role-based route guards
  if (nextUrl.pathname.startsWith("/super-admin") && role !== "super_admin") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (
    nextUrl.pathname.startsWith("/founder") &&
    !["founder", "super_admin"].includes(role)
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (
    nextUrl.pathname.startsWith("/manager") &&
    !["manager", "founder", "super_admin"].includes(role)
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
