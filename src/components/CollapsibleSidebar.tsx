import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cross, LayoutDashboard, Users, BookOpen, MessageSquare, PanelLeftClose, PanelLeftOpen, Heart, Settings, ChevronDown, Phone, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMembership } from "@/hooks/useMembership";
import { useSidebar } from "@/contexts/SidebarContext";
import { useChurchVerification } from "@/hooks/useChurchVerification";

interface CollapsibleSidebarProps {
  children: ReactNode;
}


// Expandable admin sidebar component with proper menu structure
export function CollapsibleSidebar({ children }: CollapsibleSidebarProps) {
  const { isCollapsed, toggle: toggleSidebar } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { churchName } = useMembership();
  const { isChurchAdmin } = useChurchVerification();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Admin sub-items
  const adminSubItems = [
    { icon: Phone, label: "Phone Configuration", path: "/admin/phone-config" },
    { icon: Activity, label: "Tracking", path: "/admin/tracking" },
    { icon: Zap, label: "Automation", path: "/admin/automation" },
  ];

  // Check if any admin path is active
  const isAdminPathActive = currentPath.startsWith('/admin');

  // Regular sidebar items (non-expandable)
  const regularSidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Cross, label: "My Needs", path: "/my-needs" },
    { icon: Users, label: "Volunteering", path: "/volunteering" },
    { icon: BookOpen, label: "Browse", path: "/browse" },
    { icon: MessageSquare, label: "Feedback", path: "/feedback" }
  ];

  const toggleAdminExpansion = () => {
    if (!isCollapsed) {
      setIsAdminExpanded(!isAdminExpanded);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen w-full relative">
          {/* Sidebar */}
          <div 
            className={`
              bg-sidebar border-r border-sidebar-border relative
              ${mounted ? 'transition-all duration-300 ease-in-out' : ''}
              ${isCollapsed ? 'w-16' : 'w-64'}
            `}
          >
            {/* Header */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                {!isCollapsed && (
                  <>
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-sidebar-foreground">ChurchConnect</h2>
                      <p className="text-sm text-sidebar-foreground/70">{churchName ?? "Grace Community Church"}</p>
                    </div>
                  </>
                )}
                {isCollapsed && (
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Tab Toggle */}
            <div
              onClick={toggleSidebar}
              className={`
                absolute top-4 cursor-pointer z-20 transition-all duration-300 ease-in-out
                bg-sidebar-border hover:bg-sidebar-border/80 
                flex items-center justify-center
                right-[-16px] w-4 h-6 rounded-r-sm
              `}
            >
              <div className={`transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
                <svg 
                  width="8" 
                  height="8" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  className="text-yellow-500"
                >
                  <path 
                    d="M4 2L8 6L4 10" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Navigation */}
            <div className="px-4 space-y-1">
              {/* Admin expandable menu (only show if user is admin) */}
              {isChurchAdmin && (
                <div>
                  {/* Admin parent item */}
                  <div
                    onClick={toggleAdminExpansion}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                      ${isAdminPathActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium flex-1">Admin</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isAdminExpanded ? 'rotate-180' : 'rotate-0'
                          }`} 
                        />
                      </>
                    )}
                  </div>

                  {/* Admin sub-items */}
                  {!isCollapsed && isAdminExpanded && (
                    <div className="ml-4 mt-1 space-y-1 animate-accordion-down">
                      {adminSubItems.map((subItem) => {
                        const isSubActive = currentPath === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`
                              w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm
                              ${isSubActive
                                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                              }
                            `}
                          >
                            <subItem.icon className="w-4 h-4 flex-shrink-0" />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Tooltip for collapsed admin */}
                  {isCollapsed && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Admin</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}

              {/* Regular sidebar items */}
              {regularSidebarItems.map((item) => {
                const isActive = currentPath === item.path;
                const linkContent = (
                  <Link
                    to={item.path}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                );

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.path}>
                      <TooltipTrigger asChild>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return (
                  <div key={item.path}>
                    {linkContent}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}