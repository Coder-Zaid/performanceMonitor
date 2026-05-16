"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useApiClient } from "@/lib/api-client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Target as TargetIcon } from "lucide-react";

interface TargetProgress {
  kpiName: string;
  current: number;
  target: number;
  percentage: number;
  unit: string;
}

export function DailyTargetsCard() {
  const { getApiClient } = useApiClient();
  const { isLoaded, isSignedIn } = useAuth();
  
  const { data: progress, isLoading, isError } = useQuery<TargetProgress[]>({
    queryKey: ["daily-targets"],
    queryFn: () => getApiClient().get("/performance-entries/summary"),
    enabled: isLoaded && !!isSignedIn,
    // In a real app, this would be an array of KPI progress objects
  });

  if (isLoading) return <Skeleton className="h-[200px] w-full" />;
  if (isError) return <div>Failed to load targets</div>;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Targets</CardTitle>
        <TargetIcon className="h-4 w-4 text-text-muted" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {progress?.map((item) => (
            <div key={item.kpiName} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-text-primary">{item.kpiName}</span>
                <span className="text-text-secondary">{item.current} / {item.target} {item.unit}</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
          {(!progress || progress.length === 0) && (
            <p className="text-xs text-text-muted italic">No targets set for today.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
