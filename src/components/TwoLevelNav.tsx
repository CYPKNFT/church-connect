import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserCheck,
  FileText,
  BarChart3,
  PlusCircle,
  Users,
  BookOpen,
  Gift,
  Package,
  Heart,
  ShoppingBag,
  MessageSquare,
  Settings,
  Church,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: SubMenuItem[];
  path?: string;
  requiredRole?: "admin";
}

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: "admin",
    label: "Admin",
    icon: Settings,
    requiredRole: "admin",
    submenu: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { id: "verification", label: "Staff Verification", icon: UserCheck, path: "/admin/verification" },
      { id: "moderation", label: "Content Moderation", icon: FileText, path: "/admin/moderation" },
      { id: "analytics", label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    ],
  },
  {
    id: "admin-copy",
    label: "Admin Copy",
    icon: Settings,
    requiredRole: "admin",
    submenu: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { id: "my-needs", label: "My Needs", icon: PlusCircle, path: "/my-needs" },
      { id: "volunteering", label: "Volunteering", icon: Users, path: "/volunteering" },
      { id: "browse", label: "Browse", icon: BookOpen, path: "/browse" },
    ],
  },
  {
    id: "serving",
    label: "Serving",
    icon: Users,
    submenu: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { id: "my-needs", label: "My Needs", icon: PlusCircle, path: "/my-needs" },
      { id: "volunteering", label: "Volunteering", icon: Users, path: "/volunteering" },
      { id: "browse", label: "Browse", icon: BookOpen, path: "/browse" },
    ],
  },
  {
    id: "giving",
    label: "Giving",
    icon: Gift,
    submenu: [
      { id: "giving", label: "Giving", icon: Gift, path: "/giving" },
      { id: "received", label: "Received", icon: Package, path: "/received" },
      { id: "watchlist", label: "Watchlist", icon: Heart, path: "/watchlist" },
      { id: "marketplace", label: "Marketplace", icon: ShoppingBag, path: "/browse-needs" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: MessageSquare,
    submenu: [
      { id: "general", label: "General", icon: MessageSquare, path: "/feedback" },
      { id: "app", label: "App", icon: Settings, path: "/feedback/app" },
      { id: "church", label: "Church", icon: Church, path: "/feedback/church" },
    ],
  },
];

export function TwoLevelNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>("serving");
  const [activeSubmenu, setActiveSubmenu] = useState<string>("dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Detect active menu from current route
  useEffect(() => {
    const path = location.pathname;
    
    for (const menu of menuItems) {
      if (menu.submenu) {
        const activeSubItem = menu.submenu.find(sub => sub.path === path);
        if (activeSubItem) {
          setActiveMenu(menu.id);
          setActiveSubmenu(activeSubItem.id);
          return;
        }
      }
    }
  }, [location.pathname]);

  const handleMenuClick = (menuId: string) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  const handleSubmenuClick = (menuId: string, submenuId: string, path: string) => {
    setActiveMenu(menuId);
    setActiveSubmenu(submenuId);
    navigate(path);
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (item.requiredRole === "admin") {
      // Check if user is admin (you can implement this check properly)
      return true; // For demo purposes, showing all items
    }
    return true;
  });

  const activeMenuItem = filteredMenuItems.find(item => item.id === activeMenu);

  return (
    <div className="flex h-full">
      {/* First Level - Icon Navigation */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 72 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-gradient-to-b from-primary to-primary-dark text-white border-r border-primary-dark/20 shadow-xl"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-4 bg-accent hover:bg-accent-hover text-white rounded-full p-1 shadow-lg transition-all duration-300 hover:scale-110 z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <div className="flex flex-col items-center py-6 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={cn(
                  "relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "bg-accent shadow-glow"
                    : "bg-white/10 hover:bg-white/20"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-white/80")} />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Second Level - Submenu */}
      <AnimatePresence mode="wait">
        {activeMenu && activeMenuItem?.submenu && (
          <motion.div
            key={activeMenu}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-72 bg-card border-r border-border shadow-lg"
          >
            {/* Submenu Header */}
            <div className="px-6 py-6 border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  {activeMenuItem.icon && (
                    <activeMenuItem.icon className="w-5 h-5 text-accent" />
                  )}
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {activeMenuItem.label}
                </h2>
              </div>
            </div>

            {/* Submenu Items */}
            <div className="py-4 px-3 space-y-1">
              {activeMenuItem.submenu.map((subItem, index) => {
                const SubIcon = subItem.icon;
                const isActive = activeSubmenu === subItem.id && activeMenu === activeMenuItem.id;

                return (
                  <motion.button
                    key={subItem.id}
                    onClick={() => handleSubmenuClick(activeMenuItem.id, subItem.id, subItem.path)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-muted text-foreground"
                    )}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SubIcon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground")} />
                    <span className={cn("font-medium", isActive ? "text-white" : "text-foreground")}>
                      {subItem.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
