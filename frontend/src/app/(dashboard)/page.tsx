import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  // Redirect to role-specific dashboard
  if (user.role === "founder" || user.role === "super_admin") {
    redirect("/founder");
  } else if (user.role === "manager") {
    redirect("/manager");
  } else {
    redirect("/employee");
  }
}
