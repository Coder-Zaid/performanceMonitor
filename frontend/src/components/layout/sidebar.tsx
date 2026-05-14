"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  Trophy,
  BarChart3,
  Settings,
  Bell,
  FileText,
  Target,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["super_admin", "founder", "manager", "employee"] },
  { name: "Reviews", href: "/manager", icon: FileText, roles: ["manager"] },
  { name: "Employees", href: "/founder/users", icon: Users, roles: ["super_admin", "founder"] },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy, roles: ["super_admin", "founder", "manager", "employee"] },
  { name: "Departments", href: "/founder/departments", icon: Building2, roles: ["super_admin", "founder"] },
  { name: "KPIs", href: "/founder/kpis", icon: BarChart3, roles: ["super_admin", "founder"] },
  { name: "Reports", href: "/founder/reports", icon: FileText, roles: ["super_admin", "founder", "manager"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["super_admin", "founder", "manager", "employee"] },
];

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && <span className="text-xl font-bold tracking-[0.2em] text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>ITSPRELUDE</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-white hover:bg-white/10"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 text-[10px] font-bold tracking-[0.1em] uppercase transition-all font-sans",
                isActive
                  ? "bg-[#FFC000] text-black"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-black" : "text-white/60")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
