"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function AssignedTasksCard() {
  const { toast } = useToast();
  const { getApiClient } = useApiClient();

  const { data: tasks, isLoading, refetch } = useQuery<Task[]>({
    queryKey: ["employee-tasks"],
    queryFn: () => getApiClient().get("/targets/tasks"),
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      getApiClient().patch(`/targets/tasks/${id}/status`, { status }),
    onSuccess: () => {
      refetch();
      toast({
        title: "Task Updated",
        description: "Task status has been updated successfully.",
      });
    },
  });

  const handleToggle = (task: Task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    toggleTaskMutation.mutate({ id: task.id, status: nextStatus });
  };

  if (isLoading) {
    return (
      <Card className="border-border bg-card shadow-sm animate-pulse">
        <CardContent className="h-48 flex items-center justify-center text-text-muted">
          Loading assigned tasks...
        </CardContent>
      </Card>
    );
  }

  const activeTasks = tasks?.filter((t) => t.status !== "completed") || [];
  const completedTasks = tasks?.filter((t) => t.status === "completed") || [];

  return (
    <Card className="border-border bg-[#121212] text-white shadow-lg overflow-hidden">
      <CardHeader className="border-b border-[#202020] pb-4 flex flex-row items-center gap-2">
        <ClipboardList className="h-5 w-5 text-[#FFC000]" />
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          Assigned Tasks
          {activeTasks.length > 0 && (
            <span className="text-xs bg-[#FFC000]/10 text-[#FFC000] border border-[#FFC000]/30 px-2 py-0.5 rounded-full font-medium">
              {activeTasks.length} pending
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[350px] overflow-y-auto divide-y divide-[#202020]">
        {tasks && tasks.length > 0 ? (
          [...activeTasks, ...completedTasks].map((task) => {
            const isCompleted = task.status === "completed";
            const isOverdue = !isCompleted && new Date(task.dueDate) < new Date();

            return (
              <div
                key={task.id}
                className={cn(
                  "p-4 flex items-start gap-3 transition-colors duration-200 hover:bg-white/[0.02]",
                  isCompleted && "bg-white/[0.01]"
                )}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(task)}
                  disabled={toggleTaskMutation.isPending}
                  className="mt-0.5 text-[#7D7D7D] hover:text-[#FFC000] transition-colors focus:outline-none flex-shrink-0"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50] fill-[#4CAF50]/10" />
                  ) : (
                    <Circle className={cn("h-5 w-5", isOverdue ? "text-[#E57373]" : "text-[#7D7D7D]")} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p
                      className={cn(
                        "text-sm font-semibold text-white truncate",
                        isCompleted && "line-through text-[#7D7D7D]"
                      )}
                    >
                      {task.title}
                    </p>
                    {task.dueDate && (
                      <span
                        className={cn(
                          "text-[10px] font-medium flex items-center gap-1 px-1.5 py-0.5 rounded",
                          isCompleted
                            ? "bg-white/5 text-[#7D7D7D]"
                            : isOverdue
                            ? "bg-[#E57373]/10 text-[#E57373] border border-[#E57373]/20"
                            : "bg-[#FFC000]/10 text-[#FFC000] border border-[#FFC000]/20"
                        )}
                      >
                        <Clock className="h-2.5 w-2.5" />
                        {new Date(task.dueDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  {task.description && (
                    <p
                      className={cn(
                        "text-xs mt-1 text-[#7D7D7D] line-clamp-2",
                        isCompleted && "line-through text-[#4A4A4A]"
                      )}
                    >
                      {task.description}
                    </p>
                  )}
                  <p className="text-[10px] text-[#4A4A4A] mt-2 font-medium uppercase tracking-wider">
                    Assigned by {task.createdByName}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <ClipboardList className="h-8 w-8 text-[#2A2A2A] mb-2" />
            <p className="text-xs text-[#7D7D7D] font-medium">All caught up!</p>
            <p className="text-[10px] text-[#4A4A4A] mt-0.5">No tasks assigned by your manager.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
