import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

interface TwoLevelNavProps {
  activeMenuId?: string;
  activeSubItemPath?: string;
  children?: ReactNode;
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
      { label: "Settings", icon: Settings, path: "/admin/settings" },
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

export function TwoLevelNav({ 
  activeMenuId: initialMenuId = "serving",
  activeSubItemPath: initialSubItemPath = "/dashboard",
  children 
}: TwoLevelNavProps) {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState<string>(initialMenuId);
  const [activeSubItemPath, setActiveSubItemPath] = useState<string>(initialSubItemPath);
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
    navigate(path);
  };

  const activeMenu = menuData.find((m) => m.id === activeMenuId);

  return (
    <div className="flex h-screen bg-background">
      {/* First Panel - Icon Navigation */}
      <div className="w-18 bg-sidebar border-r-2 border-sidebar-border shadow-lg">
        <div className="flex flex-col h-full py-4">
          {menuData.map((menu) => {
            const Icon = menu.icon;
            const isActive = menu.id === activeMenuId;
            return (
              <motion.button
                key={menu.id}
                onClick={() => handleMenuClick(menu.id)}
                className={`
                  flex flex-col items-center justify-center gap-1 p-3 mb-0 w-full
                  transition-all duration-200 group relative
                  ${
                    isActive
                      ? "bg-accent/75 text-accent-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent mb-2"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium w-12 text-center">{menu.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 w-1 h-full bg-accent"
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
          className="bg-sidebar border-r border-sidebar-border flex flex-col relative overflow-visible"
        >
          {/* Collapse Toggle Tab */}
          <div
            onClick={() => setIsSecondPanelCollapsed(!isSecondPanelCollapsed)}
            className={`
              absolute top-4 cursor-pointer z-20 transition-all duration-300 ease-in-out
              bg-sidebar-border hover:bg-sidebar-border/80
              flex items-center justify-center
              right-[-16px] w-4 h-6 rounded-r-sm
            `}
            aria-label={isSecondPanelCollapsed ? 'Expand menu' : 'Collapse menu'}
            role="button"
            tabIndex={0}
          >
            <div className={`transition-transform duration-300 ${isSecondPanelCollapsed ? 'rotate-0' : 'rotate-180'}`}>
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="text-yellow-500">
                <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Submenu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {!isSecondPanelCollapsed ? (
              // Expanded view
              <div>
                <div className="flex items-center gap-3 mb-4 px-6">
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
                        w-full flex items-center gap-3 py-3
                        transition-all duration-200 text-left
                        ${
                          isActiveSubItem
                            ? "bg-accent/75 text-accent-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }
                      `}
                      whileHover={isActiveSubItem ? {} : { x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      <div className="px-4 flex items-center gap-3">
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
                      </div>
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
                        flex flex-col items-center justify-center gap-1 p-3 mb-0
                        transition-all duration-200 group relative
                        ${
                          isActiveSubItem
                            ? "bg-accent/75 text-accent-foreground shadow-md"
                            : "text-sidebar-foreground hover:bg-sidebar-accent mb-2"
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
                          className="absolute left-0 top-0 w-1 h-full bg-accent"
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
        {children}
      </div>
    </div>
  );
}
