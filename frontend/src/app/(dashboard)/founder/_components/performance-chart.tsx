"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockData = [
  { day: "Mon", performance: 65, target: 80 },
  { day: "Tue", performance: 72, target: 80 },
  { day: "Wed", performance: 85, target: 80 },
  { day: "Thu", performance: 78, target: 80 },
  { day: "Fri", performance: 90, target: 80 },
  { day: "Sat", performance: 95, target: 80 },
  { day: "Sun", performance: 88, target: 80 },
];

export function PerformanceChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
          Weekly Performance Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFC000" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FFC000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#202020" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#7D7D7D", fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#7D7D7D", fontSize: 12 }}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#181818", 
                  borderColor: "#202020",
                  borderRadius: 0,
                  color: "#FFFFFF"
                }}
              />
              <Area
                type="monotone"
                dataKey="performance"
                stroke="#FFC000"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPerf)"
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#555555"
                strokeDasharray="5 5"
                strokeWidth={1}
                fill={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
