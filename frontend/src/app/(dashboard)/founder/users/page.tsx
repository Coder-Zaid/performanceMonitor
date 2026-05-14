"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, UserPlus, Mail, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department?: { name: string };
  employmentStatus: string;
  profileImageUrl?: string;
}

export default function UsersPage() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["org-users"],
    queryFn: () => apiClient.get("/users"),
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Employee Management</h1>
          <p className="text-text-secondary">Manage access, roles, and departmental assignments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" /> Bulk Invite
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Employee
          </Button>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.profileImageUrl} />
                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.firstName} {user.lastName}</span>
                        <span className="text-xs text-text-muted">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department?.name || "Unassigned"}</TableCell>
                  <TableCell>
                    <Badge className={
                      user.employmentStatus === 'active' 
                        ? 'bg-accent-success/20 text-accent-success hover:bg-accent-success/20' 
                        : 'bg-text-muted/20 text-text-muted'
                    }>
                      {user.employmentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem>Assign KPI</DropdownMenuItem>
                        <DropdownMenuItem className="text-accent-error">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {isLoading && [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell><div className="h-10 w-48 bg-surface-tertiary animate-pulse rounded" /></TableCell>
                  <TableCell><div className="h-6 w-20 bg-surface-tertiary animate-pulse rounded" /></TableCell>
                  <TableCell><div className="h-6 w-24 bg-surface-tertiary animate-pulse rounded" /></TableCell>
                  <TableCell><div className="h-6 w-16 bg-surface-tertiary animate-pulse rounded" /></TableCell>
                  <TableCell />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
