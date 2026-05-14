"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Target, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function KpisPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [kpis, setKpis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kpis`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setKpis(data);
      } else {
        setKpis([]);
        console.error("KPIs API returned non-array:", data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch KPIs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredKpis = kpis.filter((kpi) =>
    kpi.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">KPI Library</h1>
          <p className="text-text-secondary">
            Define and manage Key Performance Indicators across your organization.
          </p>
        </div>
        <Button className="bg-accent-action hover:bg-accent-action/90 text-white">
          <Plus className="mr-2 h-4 w-4" /> Define New KPI
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Active KPIs" 
          value={kpis.filter(k => k.isActive).length.toString()} 
          icon={<CheckCircle2 className="h-4 w-4 text-accent-success" />} 
        />
        <StatCard 
          title="Global KPIs" 
          value={kpis.filter(k => !k.departmentId && !k.teamId).length.toString()} 
          icon={<Target className="h-4 w-4 text-accent-action" />} 
        />
        <StatCard 
          title="Inactive" 
          value={kpis.filter(k => !k.isActive).length.toString()} 
          icon={<AlertCircle className="h-4 w-4 text-text-muted" />} 
        />
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Organization KPIs</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search KPIs..."
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
                <TableHead>KPI Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-center">Weight</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-8 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredKpis.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-text-muted">
                    No KPIs found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredKpis.map((kpi) => (
                  <TableRow key={kpi.id}>
                    <TableCell className="font-medium text-text-primary">{kpi.name}</TableCell>
                    <TableCell className="text-text-secondary">
                      {kpi.department ? kpi.department.name : kpi.team ? kpi.team.name : "Global"}
                    </TableCell>
                    <TableCell className="capitalize text-text-secondary">{kpi.metricType}</TableCell>
                    <TableCell className="text-text-secondary">{kpi.unit || "count"}</TableCell>
                    <TableCell className="text-center text-text-secondary">{kpi.weightage}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={kpi.isActive ? "default" : "secondary"} className={kpi.isActive ? "bg-accent-success/10 text-accent-success" : ""}>
                        {kpi.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
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
