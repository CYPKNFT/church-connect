import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cross, LayoutDashboard, Users, BookOpen, MessageSquare, PanelLeftClose, PanelLeftOpen } from "lucide-react";
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
              bg-card border-r border-border transition-all duration-300 ease-in-out
              ${isCollapsed ? 'w-16' : 'w-64'}
            `}
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="text-center">
                {!isCollapsed && (
                  <>
                    <h2 className="font-bold text-foreground">{churchName ?? "My Church"}</h2>
                    <p className="text-xs text-muted-foreground">Member Dashboard</p>
                  </>
                )}
                {isCollapsed && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Cross className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isActive = currentPath === item.path;
                const linkContent = (
                  <Link
                    to={item.path}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-primary/5
                      ${isActive
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground'
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
            {/* Header with Collapse Button */}
            <header className="h-12 flex items-center justify-between border-b border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm sticky top-0 z-10 px-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="hover:bg-primary/5 transition-colors duration-200"
                >
                  {isCollapsed ? (
                    <PanelLeftOpen className="w-4 h-4" />
                  ) : (
                    <PanelLeftClose className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </header>

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