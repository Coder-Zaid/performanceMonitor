import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIInsightsPanel() {
  const insights = [
    {
      title: "Productivity Peak",
      description: "Sales department reached a record 94% productivity today. Consider sharing their morning brief pattern with Support.",
      impact: "High",
    },
    {
      title: "Potential Burnout Alert",
      description: "3 employees in Engineering have exceeded 10 hours of work for 5 consecutive days. Recommend a team wellness check.",
      impact: "Critical",
    },
    {
      title: "KPI Optimization",
      description: "The 'Customer Wait Time' KPI target is consistently met by 100%. Consider tightening the target by 5% to drive excellence.",
      impact: "Medium",
    },
  ];

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#FFC000] animate-pulse" />
        <CardTitle className="font-display text-2xl tracking-widest text-white leading-tight">AI Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className="p-4 bg-[#181818] border border-border/50 space-y-2 group hover:border-[#FFC000]/30 transition-colors">
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                insight.impact === 'Critical' ? 'border-[#FFC000] text-[#FFC000]' :
                insight.impact === 'High' ? 'border-white text-white' :
                'border-[#7D7D7D] text-[#7D7D7D]'
              }`}>
                {insight.impact} Impact
              </span>
            </div>
            <h4 className="text-sm font-bold uppercase text-white">{insight.title}</h4>
            <p className="text-xs text-[#7D7D7D] leading-relaxed">{insight.description}</p>
          </div>
        ))}
        <Button variant="ghost" className="w-full text-xs text-[#FFC000] hover:bg-[#FFC000]/10 group">
          View Detailed AI Audit <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
