"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Building2, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Users, 
  Network 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function DepartmentsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setDepartments(data);
      } else {
        setDepartments([]);
        console.error("Departments API returned non-array:", data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch departments",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Departments</h1>
          <p className="text-text-secondary">
            Manage your organization's structural units and heads.
          </p>
        </div>
        <Button className="bg-accent-action hover:bg-accent-action/90 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Department
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Total Departments" 
          value={departments.length.toString()} 
          icon={<Building2 className="h-4 w-4" />} 
        />
        <StatCard 
          title="Total Teams" 
          value={departments.reduce((acc, d) => acc + (d._count?.teams || 0), 0).toString()} 
          icon={<Network className="h-4 w-4" />} 
        />
        <StatCard 
          title="Total Staff" 
          value={departments.reduce((acc, d) => acc + (d._count?.users || 0), 0).toString()} 
          icon={<Users className="h-4 w-4" />} 
        />
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">All Departments</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search departments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department Name</TableHead>
                <TableHead>Head of Dept</TableHead>
                <TableHead className="text-center">Teams</TableHead>
                <TableHead className="text-center">Employees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-10 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-10 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredDepartments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-text-muted">
                    No departments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDepartments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium text-text-primary">{dept.name}</TableCell>
                    <TableCell className="text-text-secondary">
                      {dept.head ? `${dept.head.firstName} ${dept.head.lastName}` : "Not assigned"}
                    </TableCell>
                    <TableCell className="text-center text-text-secondary">{dept._count?.teams || 0}</TableCell>
                    <TableCell className="text-center text-text-secondary">{dept._count?.users || 0}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-accent-error focus:text-accent-error">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        <div className="text-text-muted">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-text-primary">{value}</div>
      </CardContent>
    </Card>
  );
}
