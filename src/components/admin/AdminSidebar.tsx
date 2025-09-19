import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
  Target,
  UserCheck,
  Shield,
  UsersIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubItem {
  id: string;
  label: string;
  href: string;
  icon: any;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  color: string;
  subItems?: SubItem[];
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin", color: "text-blue-500" },
  { id: "community-needs", label: "Community Needs", icon: Heart, href: "/admin/community-needs", color: "text-orange-500" },
  { id: "need-approvals", label: "Need Approvals", icon: Clock, href: "/admin/need-approvals", color: "text-yellow-500" },
  { 
    id: "members-helpers", 
    label: "Members & Helpers", 
    icon: Users, 
    color: "text-purple-500",
    subItems: [
      { id: "user-management", label: "User Management", href: "/admin/user-management", icon: UserCheck },
      { id: "permissions", label: "Permissions", href: "/admin/permissions", icon: Shield },
      { id: "groups", label: "Groups", href: "/admin/groups", icon: UsersIcon }
    ]
  },
  { id: "community-impact", label: "Community Impact", icon: TrendingUp, href: "/admin/community-impact", color: "text-green-500" },
  { id: "flagged-content", label: "Flagged Content", icon: AlertTriangle, href: "/admin/flagged-content", color: "text-red-500" },
  { 
    id: "analytics", 
    label: "Analytics", 
    icon: BarChart3, 
    color: "text-indigo-500",
    subItems: [
      { id: "reports", label: "Reports", href: "/admin/reports", icon: FileText },
      { id: "dashboards", label: "Dashboards", href: "/admin/dashboards", icon: PieChart },
      { id: "metrics", label: "Metrics", href: "/admin/metrics", icon: Target }
    ]
  },
  { id: "announcements", label: "Announcements", icon: Megaphone, href: "/admin/announcements", color: "text-pink-500" },
  { 
    id: "admin-settings", 
    label: "Admin Settings", 
    icon: Settings, 
    color: "text-gray-500",
    subItems: [
      { id: "phone-config", label: "Phone Configuration", href: "/admin/phone-config", icon: Phone },
      { id: "tracking", label: "Tracking", href: "/admin/tracking", icon: Activity },
      { id: "automation", label: "Automation", href: "/admin/automation", icon: Zap }
    ]
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev.filter(id => id !== itemId), itemId] // Accordion behavior - close others
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const isActive = (href: string) => {
    return location.pathname === href || 
      (href === "/admin" && location.pathname === "/admin/dashboard");
  };

  const isParentActive = (item: NavigationItem) => {
    if (item.href && isActive(item.href)) return true;
    return item.subItems?.some(subItem => isActive(subItem.href)) || false;
  };

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
        {navigationItems.map((item) => (
          <div key={item.id} className="space-y-1">
            {/* Main Item */}
            {item.subItems ? (
              <button
                onClick={() => toggleExpanded(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isParentActive(item)
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isParentActive(item) ? "text-primary" : item.color)} />
                <span className="flex-1 text-left">{item.label}</span>
                {isExpanded(item.id) ? (
                  <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-3 w-3 transition-transform duration-200" />
                )}
              </button>
            ) : (
              <Link
                to={item.href!}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(item.href!)
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive(item.href!) ? "text-primary" : item.color)} />
                <span className="flex-1">{item.label}</span>
                {isActive(item.href!) && <ChevronRight className="h-3 w-3 text-primary" />}
              </Link>
            )}

            {/* Sub Items */}
            {item.subItems && (
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isExpanded(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="pl-6 space-y-1 pt-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                        isActive(subItem.href)
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      <subItem.icon className={cn("h-3 w-3", isActive(subItem.href) ? "text-primary" : "text-muted-foreground")} />
                      <span className="flex-1">{subItem.label}</span>
                      {isActive(subItem.href) && <ChevronRight className="h-2 w-2 text-primary" />}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}