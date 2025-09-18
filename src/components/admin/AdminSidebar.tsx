import { useState } from "react";
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
  ChevronRight,
  ChevronDown,
  Phone,
  Activity,
  Zap,
  FileText,
  PieChart,
  UserCheck,
  Shield,
  UsersIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  color: string;
  children?: MenuItem[];
}

const navigationItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin", color: "text-blue-500" },
  
  // Expandable Admin Settings
  {
    id: "admin-settings",
    label: "Admin Settings",
    icon: Settings,
    color: "text-gray-500",
    children: [
      { id: "phone-config", label: "Phone Configuration", icon: Phone, href: "/admin/phone-config", color: "text-blue-400" },
      { id: "tracking", label: "Tracking", icon: Activity, href: "/admin/tracking", color: "text-green-400" },
      { id: "automation", label: "Automation", icon: Zap, href: "/admin/automation", color: "text-yellow-400" },
    ]
  },

  // Expandable Analytics
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    color: "text-indigo-500",
    children: [
      { id: "reports", label: "Reports", icon: FileText, href: "/admin/reports", color: "text-indigo-400" },
      { id: "dashboards", label: "Dashboards", icon: PieChart, href: "/admin/dashboards", color: "text-purple-400" },
      { id: "metrics", label: "Metrics", icon: TrendingUp, href: "/admin/metrics", color: "text-green-400" },
    ]
  },

  // Expandable Members & Helpers  
  {
    id: "members-helpers",
    label: "Members & Helpers",
    icon: Users,
    color: "text-purple-500",
    children: [
      { id: "user-management", label: "User Management", icon: UserCheck, href: "/admin/user-management", color: "text-purple-400" },
      { id: "permissions", label: "Permissions", icon: Shield, href: "/admin/permissions", color: "text-red-400" },
      { id: "groups", label: "Groups", icon: UsersIcon, href: "/admin/groups", color: "text-blue-400" },
    ]
  },

  // Single-level items
  { id: "need-approvals", label: "Need Approvals", icon: Clock, href: "/admin/need-approvals", color: "text-yellow-500" },
  { id: "community-impact", label: "Community Impact", icon: TrendingUp, href: "/admin/community-impact", color: "text-green-500" },
  { id: "flagged-content", label: "Flagged Content", icon: AlertTriangle, href: "/admin/flagged-content", color: "text-red-500" },
  { id: "community-needs", label: "Community Needs", icon: Heart, href: "/admin/community-needs", color: "text-orange-500" },
  { id: "announcements", label: "Announcements", icon: Megaphone, href: "/admin/announcements", color: "text-pink-500" },
];

export function AdminSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isChildActive = (children: MenuItem[]) => {
    return children.some(child => location.pathname === child.href);
  };

  const isItemActive = (item: MenuItem) => {
    if (item.href) {
      return location.pathname === item.href || 
        (item.href === "/admin" && location.pathname === "/admin-dashboard");
    }
    return item.children ? isChildActive(item.children) : false;
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = isItemActive(item);
    
    // Single-level item
    if (!item.children) {
      return (
        <Link
          key={item.id}
          to={item.href!}
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
    }

    // Expandable item with children
    return (
      <AccordionItem key={item.id} value={item.id} className="border-none">
        <AccordionTrigger 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group hover:no-underline",
            isActive 
              ? "bg-primary/10 text-primary border border-primary/20" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : item.color)} />
            <span>{item.label}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="ml-6 space-y-1 mt-1">
            {item.children.map((child) => {
              const isChildActiveItem = location.pathname === child.href;
              return (
                <Link
                  key={child.id}
                  to={child.href!}
                  className={cn(
                    "flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-medium transition-colors group",
                    isChildActiveItem 
                      ? "bg-primary/15 text-primary" 
                      : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  <child.icon className={cn("h-3 w-3", isChildActiveItem ? "text-primary" : child.color)} />
                  <span className="flex-1">{child.label}</span>
                  {isChildActiveItem && <ChevronRight className="h-2 w-2 text-primary" />}
                </Link>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Find expandable items that should be open by default
  const defaultOpenItems = navigationItems
    .filter(item => item.children && isChildActive(item.children))
    .map(item => item.id);

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
      
      <nav className="p-4">
        <Accordion 
          type="multiple" 
          defaultValue={defaultOpenItems}
          className="space-y-1"
        >
          {navigationItems.map(renderMenuItem)}
        </Accordion>
      </nav>
    </div>
  );
}