"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useApiClient } from "@/lib/api-client";
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
  const { isLoaded, isSignedIn } = useAuth();
  const { getApiClient } = useApiClient();
  const { toast } = useToast();
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchDepartments();
    }
  }, [isLoaded, isSignedIn]);

  const fetchDepartments = async () => {
    try {
      const data = await getApiClient().get<any[]>('/departments');
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
    <div className="space-y-12 bg-background min-h-screen">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between px-2">
        <div className="space-y-2">
          <h1 className="text-display-hero text-white">Departments</h1>
          <p className="text-sm tracking-[0.2em] uppercase text-[#7D7D7D]">
            Structural units and executive oversight.
          </p>
        </div>
        <Button className="bg-[#FFC000] hover:bg-[#917300] text-black font-bold uppercase tracking-wider h-12 px-8">
          <Plus className="mr-2 h-4 w-4" /> Add Unit
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <StatCard 
          title="Total Units" 
          value={departments.length.toString()} 
          icon={<Building2 className="h-4 w-4" />} 
        />
        <StatCard 
          title="Active Teams" 
          value={departments.reduce((acc, d) => acc + (d._count?.teams || 0), 0).toString()} 
          icon={<Network className="h-4 w-4" />} 
        />
        <StatCard 
          title="Org Staff" 
          value={departments.reduce((acc, d) => acc + (d._count?.users || 0), 0).toString()} 
          icon={<Users className="h-4 w-4" />} 
        />
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Organization Structure</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7D7D7D]" />
            <Input
              placeholder="SEARCH UNITS..."
              className="pl-10 bg-[#181818] border-border text-white text-[10px] tracking-widest font-bold uppercase"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#181818] hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Unit Name</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Executive Head</TableHead>
                <TableHead className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Teams</TableHead>
                <TableHead className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Staff</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-[#181818]">
                    <TableCell><Skeleton className="h-5 w-32 bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40 bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-10 mx-auto bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-10 mx-auto bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-8 ml-auto bg-[#181818]" /></TableCell>
                  </TableRow>
                ))
              ) : filteredDepartments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-[#7D7D7D] uppercase tracking-widest text-[10px]">
                    No units found in the abyss.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDepartments.map((dept) => (
                  <TableRow key={dept.id} className="border-b border-[#181818] hover:bg-white/5 transition-colors">
                    <TableCell className="font-bold uppercase tracking-tight text-white">{dept.name}</TableCell>
                    <TableCell className="text-[#7D7D7D] uppercase text-[10px] tracking-wider">
                      {dept.head ? `${dept.head.firstName} ${dept.head.lastName}` : "UNASSIGNED"}
                    </TableCell>
                    <TableCell className="text-center text-[#FFC000] font-bold">{dept._count?.teams || 0}</TableCell>
                    <TableCell className="text-center text-white font-bold">{dept._count?.users || 0}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/5 h-9 w-9 text-[#7D7D7D] hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#181818] border-border text-white">
                          <DropdownMenuItem className="cursor-pointer uppercase text-[10px] font-bold tracking-widest">
                            <Edit2 className="mr-2 h-4 w-4" /> Modify
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer uppercase text-[10px] font-bold tracking-widest text-[#FFC000]">
                            <Trash2 className="mr-2 h-4 w-4" /> Purge
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
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">{title}</CardTitle>
        <div className="text-[#FFC000]">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white tracking-tighter uppercase">{value}</div>
      </CardContent>
    </Card>
  );
}
