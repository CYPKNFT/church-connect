import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Send, FileText, Users } from "lucide-react";

const quickActions = [
  {
    id: "review-needs",
    title: "Review Pending Needs",
    description: "12 needs awaiting approval",
    icon: Clock,
    color: "bg-yellow-600 hover:bg-yellow-700",
  },
  {
    id: "send-update",
    title: "Send Community Update",
    description: "Notify members of new activities",
    icon: Send,
    color: "bg-slate-600 hover:bg-slate-700",
  },
  {
    id: "export-report",
    title: "Export Activity Report",
    description: "Download monthly impact data",
    icon: FileText,
    color: "bg-slate-600 hover:bg-slate-700",
  },
  {
    id: "manage-roles",
    title: "Manage Volunteer Roles",
    description: "Update member permissions",
    icon: Users,
    color: "bg-slate-600 hover:bg-slate-700",
  },
];

export function AdminQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className={`w-full justify-start h-auto p-4 ${action.color} text-white border-0 hover:text-white`}
          >
            <div className="flex items-center gap-3 w-full">
              <action.icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-90 mt-1">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}