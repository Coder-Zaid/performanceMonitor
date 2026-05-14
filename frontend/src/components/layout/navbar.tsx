"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as any;

  const { data: notifications } = useQuery<any[]>({
    queryKey: ["notifications"],
    queryFn: () => apiClient.get("/notifications"),
    enabled: !!session,
    refetchInterval: 30000,
  });

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 font-sans" style={{ letterSpacing: '0.3em' }}>
            {user?.role?.replace('_', ' ')} Portal
          </span>
        </div>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FFC000]" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[#181818] border-[#202020] text-white">
              <DropdownMenuLabel className="flex justify-between items-center text-white">
                Notifications
                {unreadCount > 0 && (
                  <span className="text-[10px] font-normal text-[#FFC000] cursor-pointer hover:underline">
                    Mark all as read
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#202020]" />
              <div className="max-h-80 overflow-y-auto">
                {notifications?.map((n) => (
                  <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 hover:bg-white/5">
                    <div className="flex justify-between w-full">
                      <span className={`text-sm font-semibold ${!n.isRead ? 'text-white' : 'text-[#7D7D7D]'}`}>
                        {n.title}
                      </span>
                      {!n.isRead && <div className="h-2 w-2 rounded-full bg-[#FFC000]" />}
                    </div>
                    <p className="text-xs text-[#7D7D7D] line-clamp-2">{n.message}</p>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-[#FFC000] text-black font-bold text-xs hover:bg-[#917300]">
                {user?.firstName?.[0] || user?.name?.[0] || 'U'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#181818] border-[#202020] text-white">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{user?.name}</p>
                  <p className="text-xs leading-none text-[#7D7D7D]">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#202020]" />
              <DropdownMenuItem asChild className="hover:bg-white/5 cursor-pointer">
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-white/5 cursor-pointer">
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#202020]" />
              <DropdownMenuItem 
                className="text-white hover:bg-white/5 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
