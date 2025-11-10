import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { menuData, getMenuItems } from "@/data/navigation";

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
  isChurchAdmin?: boolean;
}

export function TwoLevelNav({ 
  activeMenuId: initialMenuId = "serving",
  activeSubItemPath: initialSubItemPath = "/dashboard",
  children,
  isChurchAdmin = false
}: TwoLevelNavProps) {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState<string>(initialMenuId);
  const [activeSubItemPath, setActiveSubItemPath] = useState<string>(initialSubItemPath);
  const [isSecondPanelCollapsed, setIsSecondPanelCollapsed] = useState(() => {
    // Initialize from localStorage, default to false if not set
    const saved = localStorage.getItem('twoLevelNav_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Get menu items based on admin status
  const visibleMenuData = getMenuItems(isChurchAdmin);

  // Save to localStorage whenever collapse state changes
  const handleCollapseToggle = (collapsed: boolean) => {
    setIsSecondPanelCollapsed(collapsed);
    localStorage.setItem('twoLevelNav_collapsed', JSON.stringify(collapsed));
  };

  const handleMenuClick = (menuId: string) => {
    if (activeMenuId === menuId) {
      handleCollapseToggle(!isSecondPanelCollapsed);
    } else {
      setActiveMenuId(menuId);
      // Set first sub-item as active when switching menus
      const newMenu = visibleMenuData.find((m) => m.id === menuId);
      if (newMenu) {
        const firstSubItemPath = newMenu.subItems[0].path;
        setActiveSubItemPath(firstSubItemPath);
        navigate(firstSubItemPath);
      }
    }
  };

  const handleSubItemClick = (path: string) => {
    setActiveSubItemPath(path);
    navigate(path);
  };

  const activeMenu = visibleMenuData.find((m) => m.id === activeMenuId);

  return (
    <div className="fixed inset-0 top-16 flex bg-background">
      {/* First Panel - Icon Navigation */}
      <div className="w-[5.85rem] bg-sidebar shadow-lg relative z-10">
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-sidebar-border z-20"></div>
        <div className="flex flex-col h-full py-4 overflow-hidden">
          {visibleMenuData.map((menu) => {
            const Icon = menu.icon;
            const isActive = menu.id === activeMenuId;
            return (
              <motion.button
                key={menu.id}
                onClick={() => handleMenuClick(menu.id)}
                className={`
                  flex flex-col items-center justify-center gap-1 p-3 mb-0 w-full
                  transition-colors duration-200 group relative
                  ${
                    isActive
                      ? "bg-accent/75 text-foreground dark:text-accent-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent mb-2"
                  }
                `}
                whileHover={isActive ? {} : { x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium w-12 text-center">{menu.label}</span>
                
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
            onClick={() => handleCollapseToggle(!isSecondPanelCollapsed)}
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
                <div className="flex items-center gap-3 mb-4 px-6 py-3 bg-muted/50 dark:bg-muted/20 -mt-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <activeMenu.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sidebar-foreground">{activeMenu.label}</h2>
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
                            ? "bg-accent/75 text-foreground dark:text-accent-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }
                      `}
                      whileHover={isActiveSubItem ? {} : { x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      <div className="px-4 flex items-center gap-3">
                        <SubIcon className={`w-4 h-4 ${isActiveSubItem ? "text-foreground dark:text-accent-foreground" : "text-muted-foreground"}`} />
                        <span className="font-medium text-sm">{subItem.label}</span>
                        
                        {/* Active dot */}
                        {isActiveSubItem && (
                          <motion.div
                            layoutId="activeSubItem"
                            className="ml-auto w-2 h-2 rounded-full bg-foreground dark:bg-accent-foreground"
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
                            ? "bg-accent/75 text-foreground dark:text-accent-foreground shadow-md"
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
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
