import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Heart, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Megaphone, 
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin", color: "text-blue-500" },
  { id: "community-needs", label: "Community Needs", icon: Heart, href: "/admin/community-needs", color: "text-orange-500" },
  { id: "need-approvals", label: "Need Approvals", icon: Clock, href: "/admin/need-approvals", color: "text-yellow-500" },
  { id: "members-helpers", label: "Members & Helpers", icon: Users, href: "/admin/members-helpers", color: "text-purple-500" },
  { id: "community-impact", label: "Community Impact", icon: TrendingUp, href: "/admin/community-impact", color: "text-green-500" },
  { id: "flagged-content", label: "Flagged Content", icon: AlertTriangle, href: "/admin/flagged-content", color: "text-red-500" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics", color: "text-indigo-500" },
  { id: "announcements", label: "Announcements", icon: Megaphone, href: "/admin/announcements", color: "text-pink-500" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings", color: "text-gray-500" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">ChurchConnect</h3>
            <p className="text-xs text-muted-foreground">Kernan Baptist Church - Admin</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === "/admin" && location.pathname === "/admin-dashboard");
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : item.color)} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}