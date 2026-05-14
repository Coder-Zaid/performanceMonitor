import { PerformanceChart } from "./_components/performance-chart";
import { AIInsightsPanel } from "./_components/ai-insights-panel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Target, Award } from "lucide-react";
import { auth } from "@/auth";

export default async function FounderDashboard() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <div className="space-y-12 bg-background min-h-screen p-8">
      <div className="space-y-2">
        <h1 className="text-display-hero text-white">Executive Overview</h1>
        <p className="text-sm tracking-[0.2em] uppercase text-[#7D7D7D]">
          Organization-wide performance and growth metrics.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees" 
          value="124" 
          change="+4 this month" 
          icon={<Users className="h-4 w-4" />} 
        />
        <StatCard 
          title="Org Performance" 
          value="82.4%" 
          change="+2.1% from last week" 
          icon={<TrendingUp className="h-4 w-4" />} 
          trend="up"
        />
        <StatCard 
          title="Target Completion" 
          value="76/100" 
          change="8 pending review" 
          icon={<Target className="h-4 w-4" />} 
        />
        <StatCard 
          title="Top Department" 
          value="Sales" 
          change="94% productivity" 
          icon={<Award className="h-4 w-4" />} 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PerformanceChart />
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Departmental Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  { name: "Sales", score: 94 },
                  { name: "Support", score: 88 },
                  { name: "Operations", score: 72 },
                  { name: "Engineering", score: 65 },
                ].map((dept) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-text-secondary">{dept.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#202020]">
                      <div 
                        className="h-full bg-[#FFC000]" 
                        style={{ width: `${dept.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <AIInsightsPanel />
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 hover:bg-surface-secondary transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Monthly Target Warning</p>
                    <p className="text-xs text-text-muted mt-1">Marketing is 15% behind their monthly lead target.</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, trend }: any) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        <div className="text-text-muted">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        <p className={`text-xs mt-1 ${trend === 'up' ? 'text-accent-success' : 'text-text-muted'}`}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
