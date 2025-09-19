import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Heart, Clock, CheckCircle, Activity, MessageSquare, Star, Target, Calendar, Download } from "lucide-react";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { MemberAnalytics } from "@/components/analytics/MemberAnalytics";
import { NeedsAnalytics } from "@/components/analytics/NeedsAnalytics";
import { EngagementAnalytics } from "@/components/analytics/EngagementAnalytics";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const [timeframe, setTimeframe] = useState("30d");

  return (
    <div className="p-6 lg:p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Track community growth, engagement, and platform performance metrics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Last updated: 2 min ago
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Time Range:</span>
          <div className="flex items-center gap-1">
            {[
              { value: "7d", label: "7 Days" },
              { value: "30d", label: "30 Days" },
              { value: "90d", label: "90 Days" },
              { value: "1y", label: "1 Year" }
            ].map((period) => (
              <Button
                key={period.value}
                variant={timeframe === period.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(period.value)}
                className="h-8"
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="needs" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Needs & Volunteers
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Engagement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsOverview timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <MemberAnalytics timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="needs" className="space-y-6">
            <NeedsAnalytics timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <EngagementAnalytics timeframe={timeframe} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}