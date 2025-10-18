import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuData, getMenuItems, getCurrentMenuFromRoute, getCurrentSubItemFromRoute } from "@/data/navigation";
import { MenuItem, SubMenuItem } from "@/types/navigation";
import { useMembership } from "@/hooks/useMembership";
import { useChurchVerification } from "@/hooks/useChurchVerification";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SmoothNavigationSidebarProps {
  children: ReactNode;
}

export function SmoothNavigationSidebar({ children }: SmoothNavigationSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { churchName } = useMembership();
  const { isChurchAdmin } = useChurchVerification();
  
  // State management
  const [selectedItem, setSelectedItem] = useState<string>("serving");
  const [selectedSubItem, setSelectedSubItem] = useState<string>("serving-dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get menu items based on user permissions
  const menuItems = getMenuItems(isChurchAdmin);

  // Initialize state based on current route
  useEffect(() => {
    setMounted(true);
    const currentMenu = getCurrentMenuFromRoute(location.pathname);
    const currentSubItem = getCurrentSubItemFromRoute(location.pathname);
    
    setSelectedItem(currentMenu);
    setSelectedSubItem(currentSubItem);
  }, [location.pathname]);

  // Get current menu data
  const currentMenu = menuItems.find((item) => item.id === selectedItem);

  // Handle primary navigation click
  const handlePrimaryNavClick = (item: MenuItem) => {
    setSelectedItem(item.id);
    
    // Navigate to first submenu item
    if (item.subItems.length > 0) {
      const firstSubItem = item.subItems[0];
      setSelectedSubItem(firstSubItem.id);
      
      // Handle special admin routing
      if (item.isAdmin) {
        navigate(`${firstSubItem.path}?gear=primary`);
      } else if (item.isAdminCopy) {
        navigate(`${firstSubItem.path}?gear=copy`);
      } else {
        navigate(firstSubItem.path);
      }
    }
  };

  // Handle submenu item click
  const handleSubItemClick = (subItem: SubMenuItem, parentItem: MenuItem) => {
    setSelectedSubItem(subItem.id);
    
    // Handle special admin routing
    if (parentItem.isAdmin) {
      navigate(`${subItem.path}?gear=primary`);
    } else if (parentItem.isAdminCopy) {
      navigate(`${subItem.path}?gear=copy`);
    } else {
      navigate(subItem.path);
    }
  };

  // Check if submenu item is active
  const isSubItemActive = (subItem: SubMenuItem) => {
    return selectedSubItem === subItem.id;
  };

  // Check if primary item is active
  const isPrimaryItemActive = (item: MenuItem) => {
    return selectedItem === item.id;
  };

  if (!mounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen">
        {/* Primary Navigation - Icon Strip */}
        <motion.div
          animate={{ width: isCollapsed ? 64 : 72 }}
          className="bg-sidebar-primary border-r border-sidebar-border flex flex-col items-center py-6 gap-2 relative"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          {/* Brand Icon */}
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
          </div>

          {/* Navigation Icons */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isPrimaryItemActive(item);
            
            const buttonContent = (
              <motion.button
                onClick={() => handlePrimaryNavClick(item)}
                className={cn(
                  "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                  "hover:bg-sidebar-hover",
                  isActive && "bg-sidebar-active text-accent-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Navigate to ${item.label}`}
                aria-pressed={isActive}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-accent rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    {buttonContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <div key={item.id}>
                {buttonContent}
              </div>
            );
          })}
        </motion.div>

        {/* Secondary Navigation - Submenu Panel */}
        <AnimatePresence mode="wait">
          {currentMenu && (
            <motion.div
              key={selectedItem}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-72 bg-sidebar-secondary border-r border-sidebar-border flex flex-col"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Header */}
              <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <currentMenu.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-foreground truncate">
                      {currentMenu.label}
                    </h2>
                    <p className="text-sm text-muted-foreground truncate">
                      {currentMenu.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-sidebar-hover flex items-center justify-center transition-colors"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      isCollapsed && "rotate-180"
                    )} />
                  </button>
                </div>
              </div>

              {/* Submenu Items */}
              <nav className="flex-1 p-4 space-y-1">
                {currentMenu.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isActive = isSubItemActive(subItem);

                  return (
                    <motion.button
                      key={subItem.id}
                      onClick={() => handleSubItemClick(subItem, currentMenu)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all",
                        "hover:bg-sidebar-hover",
                        isActive && "bg-sidebar-primary shadow-sm"
                      )}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Navigate to ${subItem.label}`}
                      aria-pressed={isActive}
                    >
                      <SubIcon className={cn(
                        "w-5 h-5 flex-shrink-0",
                        isActive ? "text-accent" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-sm font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {subItem.label}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 bg-background overflow-auto"
        >
          {children}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}

