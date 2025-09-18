import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cross, LayoutDashboard, Users, BookOpen, MessageSquare, PanelLeftClose, PanelLeftOpen, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMembership } from "@/hooks/useMembership";
import { useSidebar } from "@/contexts/SidebarContext";
import { useChurchVerification } from "@/hooks/useChurchVerification";

interface CollapsibleSidebarProps {
  children: ReactNode;
}


export function CollapsibleSidebar({ children }: CollapsibleSidebarProps) {
  const { isCollapsed, toggle: toggleSidebar } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { churchName } = useMembership();
  const { isChurchAdmin } = useChurchVerification();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic sidebar items based on user role
  const getSidebarItems = () => {
    const baseItems = [];

    if (isChurchAdmin) {
      baseItems.push({ icon: Settings, label: "Admin", path: "/admin-dashboard" });
    }

    baseItems.push(
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Cross, label: "My Needs", path: "/my-needs" },
      { icon: Users, label: "Volunteering", path: "/volunteering" },
      { icon: BookOpen, label: "Browse", path: "/browse" },
      { icon: MessageSquare, label: "Feedback", path: "/feedback" }
    );

    return baseItems;
  };

  const sidebarItems = getSidebarItems();

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
              {sidebarItems.map((item) => {
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