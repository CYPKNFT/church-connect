import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Package, Users } from "lucide-react";

const recentActivities = [
  {
    id: "1",
    type: "help_completed",
    title: "Help completed: Grocery shopping for elderly",
    description: "2 hours ago • Mrs. Johnson & Tom R.",
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: "2",
    type: "volunteer_signup",
    title: "New volunteer signed up: Sarah Williams",
    description: "4 hours ago • Background check pending",
    icon: Heart,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    id: "3",
    type: "need_posted",
    title: "New need posted: Garden cleanup needed",
    description: "6 hours ago • Awaiting approval",
    icon: Package,
    iconColor: "text-blue-600", 
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "4",
    type: "member_joined",
    title: "New member joined: David Miller",
    description: "1 day ago • Profile verified",
    icon: Users,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
];

export function AdminRecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Community Activity</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm leading-tight">
                {activity.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}