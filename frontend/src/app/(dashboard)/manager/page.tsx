"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
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
import { Check, X, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PendingEntry {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  };
  kpi: {
    name: string;
    unit: string;
  };
  submittedValue: number;
  submissionDate: string;
  notes?: string;
}

export default function ManagerDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pending, isLoading } = useQuery<PendingEntry[]>({
    queryKey: ["pending-reviews"],
    queryFn: () => apiClient.get("/performance-entries/pending"),
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) =>
      apiClient.post(`/performance-entries/${id}/review`, { status }),
    onSuccess: () => {
      toast({ title: "Updated", description: "Entry status updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["pending-reviews"] });
    },
  });

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Manager Reviews</h1>
        <p className="text-text-secondary">Approve or reject pending daily performance entries from your team.</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Pending Approvals ({pending?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>KPI</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending?.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={entry.user.profileImageUrl} />
                        <AvatarFallback>{entry.user.firstName[0]}{entry.user.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {entry.user.firstName} {entry.user.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{entry.kpi.name}</TableCell>
                  <TableCell className="font-semibold text-accent-action">
                    {entry.submittedValue} {entry.kpi.unit}
                  </TableCell>
                  <TableCell>{new Date(entry.submissionDate).toLocaleDateString()}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-text-muted italic">
                    {entry.notes || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 text-accent-success hover:text-accent-success hover:bg-accent-success/10"
                        onClick={() => reviewMutation.mutate({ id: entry.id, status: "approved" })}
                        disabled={reviewMutation.isPending}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 text-accent-error hover:text-accent-error hover:bg-accent-error/10"
                        onClick={() => reviewMutation.mutate({ id: entry.id, status: "rejected" })}
                        disabled={reviewMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!pending || pending.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-text-muted italic">
                    No pending reviews. Good job!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
