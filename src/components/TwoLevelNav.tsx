import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserCheck,
  FileCheck,
  TrendingUp,
  ClipboardList,
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

interface SubMenuItem {
  label: string;
  icon: any;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  subItems: SubMenuItem[];
}

const menuData: MenuItem[] = [
  {
    id: "admin",
    label: "Admin",
    icon: Settings,
    subItems: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { label: "Staff Verification", icon: UserCheck, path: "/admin/staff-verification" },
      { label: "Content Moderation", icon: FileCheck, path: "/admin/content-moderation" },
      { label: "Analytics", icon: TrendingUp, path: "/admin/analytics" },
    ],
  },
  {
    id: "serving",
    label: "Serving",
    icon: Users,
    subItems: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "My Needs", icon: ClipboardList, path: "/my-needs" },
      { label: "Volunteering", icon: Users, path: "/volunteering" },
      { label: "Browse", icon: BookOpen, path: "/browse" },
    ],
  },
  {
    id: "giving",
    label: "Giving",
    icon: Gift,
    subItems: [
      { label: "Giving", icon: Gift, path: "/giving" },
      { label: "Received", icon: Package, path: "/received" },
      { label: "Watchlist", icon: Heart, path: "/watchlist" },
      { label: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: MessageSquare,
    subItems: [
      { label: "General", icon: MessageSquare, path: "/feedback" },
      { label: "App", icon: Settings, path: "/feedback/app" },
      { label: "Church", icon: Church, path: "/feedback/church" },
    ],
  },
];

export function TwoLevelNav() {
  const [activeMenuId, setActiveMenuId] = useState<string>("serving");
  const [activeSubItemPath, setActiveSubItemPath] = useState<string>("/dashboard");
  const [isSecondPanelCollapsed, setIsSecondPanelCollapsed] = useState(false);

  const handleMenuClick = (menuId: string) => {
    if (activeMenuId === menuId) {
      setIsSecondPanelCollapsed(!isSecondPanelCollapsed);
    } else {
      setActiveMenuId(menuId);
      setIsSecondPanelCollapsed(false);
      // Set first sub-item as active when switching menus
      const newMenu = menuData.find((m) => m.id === menuId);
      if (newMenu) {
        setActiveSubItemPath(newMenu.subItems[0].path);
      }
    }
  };

  const handleSubItemClick = (path: string) => {
    setActiveSubItemPath(path);
  };

  const activeMenu = menuData.find((m) => m.id === activeMenuId);

  return (
    <div className="flex h-screen bg-background">
      {/* First Panel - Icon Navigation */}
      <div className="w-18 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col h-full py-4">
          {menuData.map((menu) => {
            const Icon = menu.icon;
            const isActive = menu.id === activeMenuId;
            return (
              <motion.button
                key={menu.id}
                onClick={() => handleMenuClick(menu.id)}
                className={`
                  flex flex-col items-center justify-center gap-1 p-3 mx-2 mb-2 rounded-lg
                  transition-all duration-200 group relative
                  ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{menu.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Second Panel - Submenu */}
      {activeMenu && (
        <motion.div
          key={activeMenuId}
          initial={false}
          animate={{ width: isSecondPanelCollapsed ? 72 : 288 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden"
        >
          {/* Submenu Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            {!isSecondPanelCollapsed ? (
              // Expanded view
              <div className="px-4 space-y-1">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <activeMenu.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sidebar-foreground">{activeMenu.label}</h2>
                    <p className="text-xs text-muted-foreground">Navigation Menu</p>
                  </div>
                </div>
                
                {activeMenu.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isActiveSubItem = activeSubItemPath === subItem.path;
                  return (
                    <motion.button
                      key={subItem.path}
                      onClick={() => handleSubItemClick(subItem.path)}
                      className={`
                        w-full flex items-center gap-3 rounded-lg px-4 py-3
                        transition-all duration-200 text-left
                        ${
                          isActiveSubItem
                            ? "bg-accent text-accent-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }
                      `}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SubIcon className={`w-4 h-4 ${isActiveSubItem ? "text-accent-foreground" : "text-muted-foreground"}`} />
                      <span className="font-medium text-sm">{subItem.label}</span>
                      
                      {/* Active dot */}
                      {isActiveSubItem && (
                        <motion.div
                          layoutId="activeSubItem"
                          className="ml-auto w-2 h-2 rounded-full bg-accent-foreground"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              // Collapsed view - icon style like first panel
              <div className="flex flex-col px-2">
                {activeMenu.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isActiveSubItem = activeSubItemPath === subItem.path;
                  return (
                    <motion.button
                      key={subItem.path}
                      onClick={() => handleSubItemClick(subItem.path)}
                      className={`
                        flex flex-col items-center justify-center gap-1 p-3 mb-2 rounded-lg
                        transition-all duration-200 group relative
                        ${
                          isActiveSubItem
                            ? "bg-accent text-accent-foreground shadow-md"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={subItem.label}
                    >
                      <SubIcon className="w-5 h-5" />
                      
                      {/* Active indicator */}
                      {isActiveSubItem && (
                        <motion.div
                          layoutId="activeSubItemCollapsed"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto relative">
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsSecondPanelCollapsed(!isSecondPanelCollapsed)}
          className="fixed top-6 z-50 h-8 w-6 rounded-r-md bg-sidebar-accent hover:bg-sidebar-accent/80 border border-sidebar-border border-l-0 flex items-center justify-center transition-all shadow-sm"
          style={{
            left: isSecondPanelCollapsed ? '88px' : '272px'
          }}
        >
          {isSecondPanelCollapsed ? (
            <ChevronRight className="w-3 h-3 text-sidebar-accent-foreground" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-sidebar-accent-foreground" />
          )}
        </button>
        
        {/* This is where page content would go */}
      </div>
    </div>
  );
}
