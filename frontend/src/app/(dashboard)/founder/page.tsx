import { PerformanceChart } from "./_components/performance-chart";
import { AIInsightsPanel } from "./_components/ai-insights-panel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Target, Award } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function FounderDashboard() {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.publicMetadata as any)?.role || "employee";

  return (
    <div className="space-y-12 bg-background min-h-screen p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
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
              <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Departmental Productivity</CardTitle>
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
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-white">{dept.name}</span>
                      <span className="text-[#FFC000]">{dept.score}%</span>
                    </div>
                    <div className="h-1 w-full bg-[#181818]">
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
              <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                    <p className="text-xs font-bold uppercase tracking-tight text-white group-hover:text-[#FFC000]">Monthly Target Warning</p>
                    <p className="text-[10px] text-[#7D7D7D] mt-1 uppercase">Marketing is 15% behind their monthly lead target.</p>
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
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D7D7D]">{title}</CardTitle>
        <div className="text-[#FFC000]">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white tracking-tighter uppercase">{value}</div>
        <p className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${trend === 'up' ? 'text-white' : 'text-[#7D7D7D]'}`}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
