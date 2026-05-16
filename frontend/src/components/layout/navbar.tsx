"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Bell, User, LogOut, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import Link from "next/link";

export function Navbar() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const role = (user?.publicMetadata as any)?.role || "employee";

  const { getApiClient } = useApiClient();

  const { data: notifications } = useQuery<any[]>({
    queryKey: ["notifications"],
    queryFn: () => getApiClient().get("/notifications"),
    enabled: isLoaded && !!user,
    refetchInterval: 30000,
  });

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 font-sans"
            style={{ letterSpacing: "0.3em" }}
          >
            {role.replace("_", " ")} Portal
          </span>
        </div>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="relative inline-flex items-center justify-center h-10 w-10 rounded-md text-white hover:bg-white/10 outline-none"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FFC000]" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-[#181818] border-[#202020] text-white"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex justify-between items-center text-white">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-normal text-[#FFC000] cursor-pointer hover:underline">
                      Mark all as read
                    </span>
                  )}
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#202020]" />
              <div className="max-h-80 overflow-y-auto">
                {notifications && notifications.length > 0 ? (
                  notifications.map((n) => (
                    <DropdownMenuItem
                      key={n.id}
                      className="flex flex-col items-start gap-1 p-3 hover:bg-white/5"
                    >
                      <div className="flex justify-between w-full">
                        <span
                          className={`text-sm font-semibold ${!n.isRead ? "text-white" : "text-[#7D7D7D]"}`}
                        >
                          {n.title}
                        </span>
                        {!n.isRead && (
                          <div className="h-2 w-2 rounded-full bg-[#FFC000]" />
                        )}
                      </div>
                      <p className="text-xs text-[#7D7D7D] line-clamp-2">
                        {n.message}
                      </p>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <p className="text-center text-[10px] text-[#7D7D7D] uppercase tracking-widest py-6">
                    No new alerts
                  </p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger 
              className="relative inline-flex items-center justify-center h-8 w-8 rounded-md bg-[#FFC000] text-black font-bold text-xs hover:bg-[#917300] outline-none"
            >
              {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || "U"}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#181818] border-[#202020] text-white"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {user?.fullName || user?.firstName}
                    </p>
                    <p className="text-xs leading-none text-[#7D7D7D]">
                      {user?.emailAddresses?.[0]?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#202020]" />
              <Link href="/profile" className="w-full">
                <DropdownMenuItem className="hover:bg-white/5 cursor-pointer flex items-center gap-2">
                  <User className="h-4 w-4" /> Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" className="w-full">
                <DropdownMenuItem className="hover:bg-white/5 cursor-pointer flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-[#202020]" />
              <DropdownMenuItem
                className="text-white hover:bg-white/5 cursor-pointer"
                onClick={() => signOut({ redirectUrl: "/login" })}
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
