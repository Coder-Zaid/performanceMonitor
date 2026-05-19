import { DailyTargetsCard } from "./_components/daily-targets-card";
import { SubmissionForm } from "./_components/submission-form";
import { AssignedTasksCard } from "./_components/assigned-tasks-card";
import { currentUser } from "@clerk/nextjs/server";

export default async function EmployeeDashboard() {
  const user = await currentUser();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Good morning, {user?.firstName}
        </h1>
        <p className="text-text-secondary">
          Here is your performance overview for today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DailyTargetsCard />
        {/* Additional cards like YourRank, Streaks, etc. */}
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-text-secondary">Your Current Rank</p>
          <p className="text-4xl font-bold text-accent-action mt-2">#4</p>
          <p className="text-xs text-text-muted mt-1">Top 15% of your team</p>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-text-secondary">Current Streak</p>
          <p className="text-4xl font-bold text-accent-success mt-2">7 Days</p>
          <p className="text-xs text-text-muted mt-1">Keep it up!</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SubmissionForm />
        <div className="space-y-6">
          <AssignedTasksCard />
          <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">Calls Made</p>
                    <p className="text-xs text-text-muted">Today, 10:30 AM</p>
                  </div>
                  <p className="font-semibold text-accent-success">+25</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
