import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShieldCheck,
  FolderOpen,
  GaugeCircle,
  Settings,
  AlertTriangle,
  Clock,
  Mail,
  ChevronRight,
  Plus,
  Send,
  Heart,
  CheckCircle,
  Star,
  TrendingUp,
  FileText,
} from "lucide-react";

// --- Utility helpers --------------------------------------------------------
const classNames = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

// --- Root component ---------------------------------------------------------
export default function ChurchConnectAdmin() {
  const [active, setActive] = useState<
    "dashboard" | "moderation" | "analytics" | "settings"
  >("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar active={active} onChange={setActive} />
        <main className="flex-1" role="main">
          <AdminHeader />
          <div className="p-6 space-y-6">
            {active === "dashboard" && <Dashboard />}
            {active === "moderation" && <Placeholder title="Content Moderation" />}
            {active === "analytics" && <Placeholder title="Analytics & Reports" />}
            {active === "settings" && <Placeholder title="System Settings" />}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Header -----------------------------------------------------------------
function AdminHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Church Connect Admin</h1>
          <p className="text-muted-foreground mt-1">
            Manage staff verification and church operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Update
          </Button>
          <Button 
            onClick={() => navigate('/staff-verification')}
            className="flex items-center gap-2 bg-warning hover:bg-warning/90 text-warning-foreground"
          >
            <Plus className="h-4 w-4" />
            Review Staff Applications
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Sidebar ---------------------------------------------------------------
function Sidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (k: any) => void;
}) {
  const navigate = useNavigate();
  const items = [
    { key: "dashboard", label: "Admin Dashboard", icon: GaugeCircle },
    { key: "staff", label: "Staff Verification", icon: ShieldCheck, isNavigation: true },
    { key: "moderation", label: "Content Moderation", icon: FolderOpen },
    { key: "analytics", label: "Analytics & Reports", icon: Users },
    { key: "settings", label: "System Settings", icon: Settings },
  ];
  
  return (
    <aside
      className="hidden w-72 shrink-0 border-r border-border bg-card p-6 lg:block"
      aria-label="Sidebar"
    >
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent">
          Church Connect
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Admin Panel</p>
      </div>
      <nav className="space-y-1" aria-label="Administration">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Administration
        </div>
        {items.map(({ key, label, icon: Icon, isNavigation }) => (
          <button
            key={key}
            onClick={() => isNavigation ? navigate('/staff-verification') : onChange(key)}
            className={classNames(
              "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left outline-none transition-all",
              active === key
                ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                : "text-foreground hover:bg-primary/5 hover:text-primary"
            )}
            aria-current={active === key ? "page" : undefined}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// --- Dashboard (overview) ---------------------------------------------------
function Dashboard() {
  return (
    <div className="space-y-6">
      <AdminMetrics />
      <AdminMainContent />
    </div>
  );
}

// --- Metrics ----------------------------------------------------------------
function AdminMetrics() {
  const metrics = [
    {
      id: "staff-pending",
      title: "Staff Applications Pending",
      value: "7",
      change: "+2 this week",
      changeType: "positive" as const,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      id: "staff-approved",
      title: "Staff Approved This Month",
      value: "23",
      change: "+15% vs last month",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      id: "total-staff",
      title: "Total Active Staff",
      value: "156",
      change: "Across all ministries",
      changeType: "neutral" as const,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "verification-rate",
      title: "Verification Success Rate",
      value: "94%",
      change: "Based on 89 applications",
      changeType: "positive" as const,
      icon: ShieldCheck,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

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

// --- Main Content -----------------------------------------------------------
function AdminMainContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <StaffPendingApprovals />
        <RecentActivity />
      </div>
      <div className="lg:col-span-1">
        <QuickActions />
      </div>
    </div>
  );
}

// --- Staff Pending Approvals ------------------------------------------------
function StaffPendingApprovals() {
  const navigate = useNavigate();
  
  const pendingStaff = [
    {
      id: "1",
      name: "Ava Thompson",
      role: "Nursery Volunteer",
      category: "Child Ministries",
      timePosted: "2 hours ago",
      urgency: "background-check",
    },
    {
      id: "2", 
      name: "Marcus Lee",
      role: "Guitarist",
      category: "Worship/Service",
      timePosted: "4 hours ago",
      urgency: "ready",
    },
    {
      id: "3",
      name: "Jordan Park",
      role: "Youth Leader",
      category: "Leadership",
      timePosted: "1 day ago",
      urgency: "missing-docs",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Staff Applications Awaiting Review</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate('/staff-verification')}>
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingStaff.map((staff) => (
          <div key={staff.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{staff.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{staff.role}</span>
                  <span>•</span>
                  <span>{staff.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  staff.urgency === "background-check" ? "destructive" : 
                  staff.urgency === "ready" ? "default" : "secondary"
                }>
                  {staff.urgency === "background-check" ? "Background Check Needed" :
                   staff.urgency === "ready" ? "Ready for Review" : "Missing Documents"}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{staff.timePosted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate('/staff-verification')}>
                  Review
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Approve
                </Button>
                <Button size="sm" variant="destructive">Reject</Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// --- Recent Activity --------------------------------------------------------
function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>• Elena Rivera approved as Small Group Leader (Leadership)</p>
          <p>• 3 new applications submitted for Child Ministries</p>
          <p>• Background check completed for Marcus Lee</p>
          <p>• System backup completed successfully</p>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Quick Actions ----------------------------------------------------------
function QuickActions() {
  const navigate = useNavigate();
  
  const quickActions = [
    {
      id: "review-staff",
      title: "Review Staff Applications",
      description: "7 applications awaiting approval",
      icon: ShieldCheck,
      color: "bg-warning hover:bg-warning/90",
      onClick: () => navigate('/staff-verification'),
    },
    {
      id: "send-update",
      title: "Send Community Update",
      description: "Notify members of new activities",
      icon: Send,
      color: "bg-primary hover:bg-primary/90",
    },
    {
      id: "export-report",
      title: "Export Staff Report",
      description: "Download monthly verification data",
      icon: FileText,
      color: "bg-secondary hover:bg-secondary/90",
    },
    {
      id: "manage-roles",
      title: "Manage Staff Roles",
      description: "Update ministry permissions",
      icon: Users,
      color: "bg-secondary hover:bg-secondary/90",
    },
  ];

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
            onClick={action.onClick}
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

// --- Placeholder sections ---------------------------------------------------
function Placeholder({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Coming soon. Focus is Staff Verification.</p>
        <div className="mt-4 p-4 bg-muted rounded-lg text-muted-foreground">
          Build these next or hide them from non-admins via RLS-backed feature flags.
        </div>
      </CardContent>
    </Card>
  );
}