import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { 
  AlertTriangle, 
  Clock, 
  XCircle, 
  CheckCircle, 
  Star, 
  Users,
  UserCheck,
  Shield,
  BarChart3,
  Settings,
  TrendingUp,
  Activity
} from "lucide-react";

const topMetrics = [
  {
    id: "pending-review",
    title: "Pending Review",
    value: "12",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    id: "documents-missing",
    title: "Documents Missing", 
    value: "5",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
  },
  {
    id: "ready-approval",
    title: "Ready for Approval",
    value: "7", 
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
  },
  {
    id: "approved-month",
    title: "Approved This Month",
    value: "23",
    icon: Star,
    color: "text-info",
    bgColor: "bg-info/10", 
    borderColor: "border-info/20",
  },
  {
    id: "active-staff",
    title: "Active Staff Members",
    value: "156",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
];

const mainSections = [
  {
    id: "staff-verification",
    title: "Staff Verification",
    description: "Review and approve ministry staff applications, manage background checks, and verify credentials.",
    icon: UserCheck,
    color: "text-info",
    bgColor: "bg-info/10",
    stats: [
      { label: "Pending", value: "7" },
      { label: "This Month", value: "23" },
      { label: "Total Active", value: "156" }
    ],
    actions: [
      { label: "Review Applications", variant: "default" as const },
      { label: "View All Staff", variant: "outline" as const }
    ]
  },
  {
    id: "content-moderation",
    title: "Content Moderation",
    description: "Monitor flagged content, manage community posts, and maintain platform safety standards.",
    icon: Shield,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    stats: [
      { label: "Flagged", value: "3" },
      { label: "Reviewed", value: "12" },
      { label: "Clean Rate", value: "95%" }
    ],
    actions: [
      { label: "Review Content", variant: "default" as const },
      { label: "Safety Settings", variant: "outline" as const }
    ]
  },
  {
    id: "analytics-reports",
    title: "Analytics & Reports",
    description: "Track platform usage, generate administrative reports, and monitor system performance metrics.",
    icon: BarChart3,
    color: "text-success",
    bgColor: "bg-success/10",
    stats: [
      { label: "Users", value: "1.2K" },
      { label: "Engagement", value: "89%" },
      { label: "Actions", value: "5.2K" }
    ],
    actions: [
      { label: "View Reports", variant: "default" as const },
      { label: "Export Data", variant: "outline" as const }
    ]
  },
  {
    id: "system-settings",
    title: "System Settings",
    description: "Configure platform settings, manage integrations, and control administrative permissions.",
    icon: Settings,
    color: "text-accent",
    bgColor: "bg-accent/10",
    stats: [
      { label: "Admins", value: "12" },
      { label: "Uptime", value: "99.9%" },
      { label: "Version", value: "v2.1" }
    ],
    actions: [
      { label: "Manage Settings", variant: "default" as const },
      { label: "User Permissions", variant: "outline" as const }
    ]
  },
];

export default function Dashboard() {
  return (
    <CollapsibleSidebar>
      <div className="flex-1 min-h-screen bg-background">
        <div className="p-6 space-y-6">
          {/* Action Required Banner */}
          <Alert className="border-warning/20 bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground">
              <strong>Action Required</strong> - 7 staff applications pending verification. Background checks required for 3 applicants before approval.
            </AlertDescription>
          </Alert>

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topMetrics.map((metric) => (
              <Card 
                key={metric.id} 
                className={`relative overflow-hidden border-2 ${metric.borderColor} ${metric.bgColor} hover-lift`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground line-clamp-2">
                      {metric.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mainSections.map((section) => (
              <Card key={section.id} className="hover-lift">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <section.icon className={`h-5 w-5 ${section.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {section.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {section.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant}
                        size="sm"
                        className="flex-1"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSidebar>
  );
}