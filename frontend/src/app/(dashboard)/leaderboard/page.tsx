"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Star } from "lucide-react";

interface Ranking {
  rank: number;
  name: string;
  score: number;
  department?: string;
  profileImageUrl?: string;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("daily");
  const { getApiClient } = useApiClient();

  const { data: rankings, isLoading } = useQuery<Ranking[]>({
    queryKey: ["leaderboard", period],
    queryFn: () => getApiClient().get(`/leaderboards?period=${period}`),
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Global Leaderboard</h1>
        <p className="text-text-secondary">Recognizing our top performers across the organization.</p>
      </div>

      <Tabs value={period} onValueChange={setPeriod} className="w-full flex flex-col items-center">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-surface-secondary">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <div className="mt-8 w-full max-w-4xl space-y-6">
          {/* Podium for Top 3 */}
          {!isLoading && rankings && rankings.length >= 3 && (
            <div className="grid grid-cols-3 gap-4 items-end pb-8 border-b border-border">
              <PodiumItem ranking={rankings[1]} rank={2} />
              <PodiumItem ranking={rankings[0]} rank={1} isMain />
              <PodiumItem ranking={rankings[2]} rank={3} />
            </div>
          )}

          {/* List for the rest */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {rankings?.slice(3).map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-secondary transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="w-6 text-sm font-bold text-text-muted">{item.rank}</span>
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={item.profileImageUrl} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-text-primary">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-action">{item.score}</p>
                      <p className="text-[10px] text-text-muted uppercase">Points</p>
                    </div>
                  </div>
                ))}
                {(!rankings || rankings.length === 0) && !isLoading && (
                  <div className="text-center py-12 text-text-muted italic">No rankings available for this period.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}

function PodiumItem({ ranking, rank, isMain }: { ranking: Ranking; rank: number; isMain?: boolean }) {
  const Icon = rank === 1 ? Trophy : rank === 2 ? Medal : Star;
  const colorClass = rank === 1 ? "text-accent-amber" : rank === 2 ? "text-gray-400" : "text-amber-700";

  return (
    <div className={`flex flex-col items-center space-y-3 ${isMain ? 'order-2' : rank === 2 ? 'order-1' : 'order-3'}`}>
      <div className="relative">
        <Avatar className={`${isMain ? 'h-24 w-24 ring-4 ring-accent-amber' : 'h-16 w-16 border-2 border-border'}`}>
          <AvatarImage src={ranking.profileImageUrl} />
          <AvatarFallback>{ranking.name[0]}</AvatarFallback>
        </Avatar>
        <div className={`absolute -bottom-2 -right-2 p-1 rounded-full bg-card border border-border ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-center">
        <p className={`font-bold ${isMain ? 'text-lg' : 'text-sm'}`}>{ranking.name}</p>
        <p className="text-xs text-text-muted">{ranking.department}</p>
        <p className={`font-black mt-1 ${isMain ? 'text-2xl text-accent-action' : 'text-lg text-accent-action/80'}`}>
          {ranking.score}
        </p>
      </div>
    </div>
  );
}
