import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cross, LayoutDashboard, Users, BookOpen, MessageSquare, PanelLeftClose, PanelLeftOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMembership } from "@/hooks/useMembership";

interface CollapsibleSidebarProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Cross, label: "My Needs", path: "/my-needs" },
  { icon: Users, label: "Volunteering", path: "/volunteering" },
  { icon: BookOpen, label: "Browse", path: "/browse" },
  { icon: MessageSquare, label: "Feedback", path: "/feedback" },
];

export function CollapsibleSidebar({ children }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { churchName } = useMembership();

  // Load collapse state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save collapse state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <div 
            className={`
              bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out
              ${isCollapsed ? 'w-16' : 'w-64'}
            `}
          >
            {/* Header */}
            <div className="p-4 relative">
              <div className="flex items-center gap-3">
                {!isCollapsed && (
                  <>
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-sidebar-foreground">ChurchConnect</h2>
                      <p className="text-sm text-sidebar-foreground/70">{churchName ?? "Grace Community Church"}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSidebar}
                      className="hover:bg-sidebar-accent transition-colors duration-200 text-sidebar-foreground p-2 h-8 w-8"
                    >
                      <PanelLeftClose className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {isCollapsed && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSidebar}
                      className="hover:bg-sidebar-accent transition-colors duration-200 text-sidebar-foreground p-2 h-8 w-8"
                    >
                      <PanelLeftOpen className="w-4 h-4" />
                    </Button>
                  </div>
                )}
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