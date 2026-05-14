"use client";

import { useState } from "react";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  PieChart,
  BarChart,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const reportTypes = [
    { 
      title: "Organization Performance Summary", 
      description: "High-level overview of org-wide KPI completion and growth.",
      icon: <PieChart className="h-8 w-8 text-accent-action" />,
      category: "Executive"
    },
    { 
      title: "Departmental Productivity Report", 
      description: "Comparative analysis of productivity across all departments.",
      icon: <BarChart className="h-8 w-8 text-accent-success" />,
      category: "Management"
    },
    { 
      title: "Individual Performance Audit", 
      description: "Detailed breakdown of employee submissions and review status.",
      icon: <ClipboardList className="h-8 w-8 text-accent-amber" />,
      category: "HR"
    },
    { 
      title: "KPI Trend Analysis", 
      description: "Historical data analysis of specific KPIs over time.",
      icon: <CalendarIcon className="h-8 w-8 text-accent-error" />,
      category: "Data"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Reports Center</h1>
          <p className="text-text-secondary">
            Generate and export data-driven insights for your organization.
          </p>
        </div>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" /> Advanced Filters
        </Button>
      </div>

      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input
          placeholder="Search report templates..."
          className="pl-10 h-12 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card key={report.title} className="border-border bg-card hover:border-accent-action/50 transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="p-3 rounded-xl bg-surface-secondary group-hover:bg-accent-action/10 transition-colors">
                {report.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl font-bold">{report.title}</CardTitle>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-surface-tertiary text-text-muted">
                    {report.category}
                  </span>
                </div>
                <CardDescription className="text-text-secondary text-sm leading-relaxed">
                  {report.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end gap-2 pt-0">
              <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
                Preview
              </Button>
              <Button size="sm" className="bg-accent-action text-white hover:bg-accent-action/90">
                <Download className="mr-2 h-4 w-4" /> Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Downloads</CardTitle>
          <CardDescription>Your recently generated report files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-xl text-text-muted bg-surface-secondary/30">
            <FileText className="h-10 w-10 mb-2 opacity-20" />
            <p className="text-sm">No recent downloads found.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
