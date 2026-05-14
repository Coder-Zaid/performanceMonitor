"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface KPI {
  id: string;
  name: string;
  metricType: string;
  unit: string;
}

export function SubmissionForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: kpis, isLoading, isError } = useQuery<KPI[]>({
    queryKey: ["my-kpis"],
    queryFn: () => apiClient.get("/kpis/my"),
  });

  const mutation = useMutation({
    mutationFn: (values: any) => apiClient.post("/performance-entries", values),
    onSuccess: () => {
      toast({ title: "Success", description: "Performance entry submitted!" });
      queryClient.invalidateQueries({ queryKey: ["performance-summary"] });
    },
    onError: (error: any) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  if (isLoading) return <SubmissionSkeleton />;
  if (isError) return <div className="text-destructive">Failed to load KPIs</div>;
  if (!kpis || kpis.length === 0) return <div>No KPIs assigned. Contact your manager.</div>;

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Daily Performance Submission</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {kpis.map((kpi) => (
            <SingleKpiForm key={kpi.id} kpi={kpi} mutation={mutation} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SingleKpiForm({ kpi, mutation }: { kpi: KPI; mutation: any }) {
  const formSchema = z.object({
    value: z.coerce.number().min(0),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: 0, notes: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ kpiId: kpi.id, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4 border-b border-border pb-4 last:border-0">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{kpi.name} ({kpi.unit})</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-[2]">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Optional notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

function SubmissionSkeleton() {
  return (
    <Card>
      <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );
}
