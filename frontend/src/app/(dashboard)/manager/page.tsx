"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
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
import { Check, X, ClipboardList, Send, Calendar, CheckCircle2, AlertCircle, Clock, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

interface Task {
  id: string;
  userId: string;
  assigneeName: string;
  title: string;
  description: string;
  dueDate: string;
  createdByName: string;
  status: string; // 'pending', 'in_progress', 'completed'
  createdAt: string;
}

export default function ManagerDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getApiClient } = useApiClient();

  // Tab State
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab") || "reviews";
  const activeTab = tabParam === "tasks" ? "tasks" : "reviews";

  const handleTabChange = (newTab: string) => {
    router.push(`/manager?tab=${newTab}`);
  };

  // Form State
  const [employeeId, setEmployeeId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Queries
  const { data: pending, isLoading: isPendingLoading } = useQuery<PendingEntry[]>({
    queryKey: ["pending-reviews"],
    queryFn: () => getApiClient().get("/performance-entries/pending"),
  });

  const { data: users } = useQuery<any[]>({
    queryKey: ["org-users"],
    queryFn: () => getApiClient().get("/users"),
  });

  const { data: tasks, isLoading: isTasksLoading } = useQuery<Task[]>({
    queryKey: ["manager-tasks"],
    queryFn: () => getApiClient().get("/targets/tasks"),
  });

  // Filter for employee role
  const employees = users?.filter((u) => u.role?.name === "employee") || [];

  // Mutations
  const reviewMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) =>
      getApiClient().post(`/performance-entries/${id}/review`, { status }),
    onSuccess: () => {
      toast({ title: "Review Submitted", description: "Entry status updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["pending-reviews"] });
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: { employeeId: string; title: string; description: string; dueDate: string }) =>
      getApiClient().post("/targets/tasks", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager-tasks"] });
      toast({ title: "Task Assigned", description: "Task successfully assigned to employee." });
      setTaskTitle("");
      setTaskDesc("");
      setDueDate("");
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      getApiClient().patch(`/targets/tasks/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager-tasks"] });
      toast({ title: "Task Updated", description: "Task status has been updated successfully." });
    },
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) {
      toast({ title: "Missing Field", description: "Please select an employee.", variant: "destructive" });
      return;
    }
    if (!taskTitle.trim()) {
      toast({ title: "Missing Field", description: "Please enter a task title.", variant: "destructive" });
      return;
    }
    if (!dueDate) {
      toast({ title: "Missing Field", description: "Please select a due date.", variant: "destructive" });
      return;
    }

    createTaskMutation.mutate({
      employeeId,
      title: taskTitle,
      description: taskDesc,
      dueDate,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-end border-b border-white/[0.04] pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#E0E0E0] to-[#7D7D7D] bg-clip-text text-transparent">
            Manager Workspace
          </h1>
          <p className="text-sm text-[#7D7D7D] mt-2 font-medium">
            Monitor submissions, approve entries, and assign tasks to push your team to elite standards.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col gap-2">
        {/* Navigation Switcher */}
        <TabsList className="flex w-fit items-center gap-1 bg-[#141414]/90 border border-white/[0.04] p-1 rounded-xl mb-6 backdrop-blur-md">
          <TabsTrigger
            value="reviews"
            className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg transition-all duration-300 data-[state=active]:bg-[#FFC000] data-[state=active]:text-black hover:text-white"
          >
            Performance Reviews ({pending?.length || 0})
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg transition-all duration-300 data-[state=active]:bg-[#FFC000] data-[state=active]:text-black hover:text-white"
          >
            Task Assignments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-6">
          <Card className="border-white/[0.04] bg-[#121212] text-white shadow-xl">
            <CardHeader className="border-b border-white/[0.03]">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FFC000]" />
                Pending Daily Performance Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isPendingLoading ? (
                <div className="text-center py-12 text-[#7D7D7D] text-sm animate-pulse">Loading submissions...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="border-white/[0.04]">
                      <TableRow className="border-white/[0.04] hover:bg-transparent">
                        <TableHead className="text-[#7D7D7D] font-bold text-xs uppercase tracking-wider">Employee</TableHead>
                        <TableHead className="text-[#7D7D7D] font-bold text-xs uppercase tracking-wider">KPI Metric</TableHead>
                        <TableHead className="text-[#7D7D7D] font-bold text-xs uppercase tracking-wider">Submitted Value</TableHead>
                        <TableHead className="text-[#7D7D7D] font-bold text-xs uppercase tracking-wider">Date Logged</TableHead>
                        <TableHead className="text-[#7D7D7D] font-bold text-xs uppercase tracking-wider">Notes</TableHead>
                        <TableHead className="text-right text-[#7D7D7D] font-bold text-xs uppercase tracking-wider">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pending?.map((entry) => (
                        <TableRow key={entry.id} className="border-white/[0.03] hover:bg-white/[0.01] transition-colors duration-200">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 border border-white/[0.08]">
                                <AvatarImage src={entry.user.profileImageUrl} />
                                <AvatarFallback className="bg-white/10 text-white text-xs font-bold">
                                  {entry.user.firstName[0]}{entry.user.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-semibold text-sm text-white">
                                {entry.user.firstName} {entry.user.lastName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm font-semibold text-white/90">{entry.kpi.name}</TableCell>
                          <TableCell className="font-extrabold text-[#FFC000] text-sm">
                            {entry.submittedValue} <span className="text-xs font-semibold text-[#7D7D7D]">{entry.kpi.unit}</span>
                          </TableCell>
                          <TableCell className="text-xs text-[#7D7D7D] font-medium">
                            {new Date(entry.submissionDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </TableCell>
                          <TableCell className="max-w-[240px] truncate text-xs text-[#7D7D7D] italic">
                            {entry.notes || "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2.5">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 border-[#202020] bg-transparent text-[#4CAF50] hover:bg-[#4CAF50]/15 hover:border-[#4CAF50]/30 transition-all duration-200"
                                onClick={() => reviewMutation.mutate({ id: entry.id, status: "approved" })}
                                disabled={reviewMutation.isPending}
                              >
                                <Check className="h-4.5 w-4.5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 border-[#202020] bg-transparent text-[#E57373] hover:bg-[#E57373]/15 hover:border-[#E57373]/30 transition-all duration-200"
                                onClick={() => reviewMutation.mutate({ id: entry.id, status: "rejected" })}
                                disabled={reviewMutation.isPending}
                              >
                                <X className="h-4.5 w-4.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!pending || pending.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-36 text-[#7D7D7D] italic text-xs">
                            No pending performance approvals. Excellent work!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="grid gap-6 lg:grid-cols-3">
          {/* Create Task Form */}
          <Card className="border-white/[0.04] bg-[#121212] text-white lg:col-span-1 h-fit shadow-xl">
            <CardHeader className="border-b border-white/[0.03] pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#FFC000]" />
                Assign Performance Task
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7D7D7D] uppercase tracking-widest">
                    Select Employee
                  </label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-white/[0.08] bg-[#181818] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFC000] focus:ring-1 focus:ring-[#FFC000]/20 transition-all duration-200"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  >
                    <option value="">-- Choose Employee --</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id} className="bg-[#181818] text-white">
                        {emp.firstName} {emp.lastName} ({emp.department?.name || "General"})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7D7D7D] uppercase tracking-widest">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call 50 VIP Customers"
                    className="flex h-10 w-full rounded-lg border border-white/[0.08] bg-[#181818] px-3 py-2 text-sm text-white placeholder-[#4A4A4A] focus:outline-none focus:border-[#FFC000] focus:ring-1 focus:ring-[#FFC000]/20 transition-all duration-200"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7D7D7D] uppercase tracking-widest">
                    Description
                  </label>
                  <textarea
                    placeholder="Provide details on the target objectives..."
                    rows={3}
                    className="flex w-full rounded-lg border border-white/[0.08] bg-[#181818] px-3 py-2 text-sm text-white placeholder-[#4A4A4A] focus:outline-none focus:border-[#FFC000] focus:ring-1 focus:ring-[#FFC000]/20 transition-all duration-200 resize-none"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7D7D7D] uppercase tracking-widest">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-lg border border-white/[0.08] bg-[#181818] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFC000] focus:ring-1 focus:ring-[#FFC000]/20 transition-all duration-200"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FFC000] to-[#E0A800] hover:from-[#FFD033] hover:to-[#FFC000] text-black font-bold flex items-center justify-center gap-2 mt-2 shadow-[0_4px_20px_rgba(255,192,0,0.15)] transition-all duration-300 transform active:scale-[0.98]"
                  disabled={createTaskMutation.isPending}
                >
                  <Send className="h-4 w-4" />
                  Assign Task
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Task List */}
          <Card className="border-white/[0.04] bg-[#121212] text-white lg:col-span-2 shadow-xl">
            <CardHeader className="border-b border-white/[0.03]">
              <CardTitle className="text-lg font-bold">Currently Assigned Tasks</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isTasksLoading ? (
                <div className="text-center py-12 text-[#7D7D7D] text-sm animate-pulse">Loading assigned tasks...</div>
              ) : (
                <div className="space-y-3.5">
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task) => {
                      const isCompleted = task.status === "completed";
                      const isOverdue = !isCompleted && new Date(task.dueDate) < new Date();

                      return (
                        <div
                          key={task.id}
                          className={cn(
                            "p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-start justify-between gap-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]",
                            isCompleted && "opacity-50"
                          )}
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <button
                              onClick={() =>
                                toggleTaskMutation.mutate({
                                  id: task.id,
                                  status: isCompleted ? "pending" : "completed",
                                })
                              }
                              className="mt-0.5 text-[#7D7D7D] hover:text-[#FFC000] transition-colors focus:outline-none flex-shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-[#4CAF50] fill-[#4CAF50]/10" />
                              ) : (
                                <Clock className="h-5 w-5 text-[#7D7D7D] hover:text-[#FFC000]" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <p
                                className={cn(
                                  "font-bold text-sm text-white truncate transition-all duration-300",
                                  isCompleted && "line-through text-[#7D7D7D]"
                                )}
                              >
                                {task.title}
                              </p>
                              {task.description && (
                                <p className="text-xs text-[#7D7D7D] mt-1 line-clamp-2 leading-relaxed">
                                  {task.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-[#4A4A4A] font-bold uppercase tracking-wider">
                                <span>Assignee: <strong className="text-[#FFC000]">{task.assigneeName}</strong></span>
                                <span>Created by: {task.createdByName}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span
                              className={cn(
                                "text-[9px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider flex items-center gap-1.5 shadow-sm",
                                isCompleted
                                  ? "bg-[#4CAF50]/15 text-[#4CAF50] border-[#4CAF50]/20"
                                  : isOverdue
                                  ? "bg-[#E57373]/15 text-[#E57373] border-[#E57373]/20"
                                  : "bg-[#FFC000]/15 text-[#FFC000] border-[#FFC000]/20"
                              )}
                            >
                              {isCompleted ? (
                                "Completed"
                              ) : isOverdue ? (
                                <>
                                  <AlertCircle className="h-3 w-3 animate-pulse" /> Overdue
                                </>
                              ) : (
                                "Pending"
                              )}
                            </span>
                            <span className="text-[10px] text-[#7D7D7D] font-medium flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-[#7D7D7D]" />
                              {new Date(task.dueDate).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-16 text-[#7D7D7D] italic text-xs">
                      No tasks currently assigned to your employees.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
