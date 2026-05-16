"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useApiClient } from "@/lib/api-client";
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
  const { isLoaded, isSignedIn } = useAuth();
  const { getApiClient } = useApiClient();
  const { toast } = useToast();
  const [kpis, setKpis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchKpis();
    }
  }, [isLoaded, isSignedIn]);

  const fetchKpis = async () => {
    try {
      const data = await getApiClient().get<any[]>('/kpis');
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
    <div className="space-y-12 bg-background min-h-screen">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between px-2">
        <div className="space-y-2">
          <h1 className="text-display-hero text-white">KPI Library</h1>
          <p className="text-sm tracking-[0.2em] uppercase text-[#7D7D7D]">
            Global metrics and performance targets.
          </p>
        </div>
        <Button className="bg-[#FFC000] hover:bg-[#917300] text-black font-bold uppercase tracking-wider h-12 px-8">
          <Plus className="mr-2 h-4 w-4" /> Define KPI
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <StatCard 
          title="Active Metrics" 
          value={kpis.filter(k => k.isActive).length.toString()} 
          icon={<CheckCircle2 className="h-4 w-4 text-white" />} 
        />
        <StatCard 
          title="Executive KPIs" 
          value={kpis.filter(k => !k.departmentId && !k.teamId).length.toString()} 
          icon={<Target className="h-4 w-4 text-[#FFC000]" />} 
        />
        <StatCard 
          title="Inactive" 
          value={kpis.filter(k => !k.isActive).length.toString()} 
          icon={<AlertCircle className="h-4 w-4 text-[#7D7D7D]" />} 
        />
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Metric Matrix</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7D7D7D]" />
            <Input
              placeholder="SEARCH METRICS..."
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
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Metric Name</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Domain</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Metric Type</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Unit</TableHead>
                <TableHead className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Weight</TableHead>
                <TableHead className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Status</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-[#181818]">
                    <TableCell><Skeleton className="h-5 w-40 bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24 bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20 bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-8 mx-auto bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 mx-auto bg-[#181818]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-8 ml-auto bg-[#181818]" /></TableCell>
                  </TableRow>
                ))
              ) : filteredKpis.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center text-[#7D7D7D] uppercase tracking-widest text-[10px]">
                    No metrics found in the abyss.
                  </TableCell>
                </TableRow>
              ) : (
                filteredKpis.map((kpi) => (
                  <TableRow key={kpi.id} className="border-b border-[#181818] hover:bg-white/5 transition-colors">
                    <TableCell className="font-bold uppercase tracking-tight text-white">{kpi.name}</TableCell>
                    <TableCell className="text-[#7D7D7D] uppercase text-[10px] tracking-wider">
                      {kpi.department ? kpi.department.name : kpi.team ? kpi.team.name : "GLOBAL"}
                    </TableCell>
                    <TableCell className="uppercase text-[10px] tracking-wider text-white">{kpi.metricType}</TableCell>
                    <TableCell className="text-[#7D7D7D] uppercase text-[10px]">{kpi.unit || "COUNT"}</TableCell>
                    <TableCell className="text-center text-[#FFC000] font-bold">{kpi.weightage}</TableCell>
                    <TableCell className="text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                        kpi.isActive ? 'border-[#FFC000] text-[#FFC000]' : 'border-[#7D7D7D] text-[#7D7D7D]'
                      }`}>
                        {kpi.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </TableCell>
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
