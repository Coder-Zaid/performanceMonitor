import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootDashboardPage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const devRole = cookieStore.get("dev_role")?.value;
  const role = devRole || (sessionClaims?.publicMetadata as any)?.role || "employee";

  // Redirect to role-specific dashboard
  if (role === "founder" || role === "super_admin") {
    redirect("/founder");
  } else if (role === "manager") {
    redirect("/manager");
  } else {
    redirect("/employee");
  }
}
