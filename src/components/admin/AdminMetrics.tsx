import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, CheckCircle, Star, TrendingUp } from "lucide-react";

const metrics = [
  {
    id: "active-needs",
    title: "Active Community Needs",
    value: "28",
    change: "+5 this week",
    changeType: "positive" as const,
    icon: Heart,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    id: "pending-approvals",
    title: "Needs Awaiting Approval",
    value: "12",
    change: "Review required",
    changeType: "neutral" as const,
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    id: "completed-helps",
    title: "Helps Completed",
    value: "156",
    change: "+23 this month",
    changeType: "positive" as const,
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    id: "community-rating",
    title: "Community Rating",
    value: "4.8",
    change: "Based on 89 reviews",
    changeType: "neutral" as const,
    icon: Star,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
];

export function AdminMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.id} 
          className={`relative overflow-hidden border-2 ${metric.borderColor} ${metric.bgColor}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {metric.value}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {metric.changeType === "positive" && (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                )}
                <span className={`text-xs font-medium ${
                  metric.changeType === "positive" 
                    ? "text-green-600" 
                    : "text-muted-foreground"
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}