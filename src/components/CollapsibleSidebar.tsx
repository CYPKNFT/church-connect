import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Cross, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Heart, 
  Settings,
  Plus,
  CheckCircle,
  BarChart3,
  Flag,
  Megaphone,
  TrendingUp
} from "lucide-react";
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
  const [isAdminMode, setIsAdminMode] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { churchName } = useMembership();
  const { isChurchAdmin } = useChurchVerification();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if we're on an admin route to maintain admin mode
  useEffect(() => {
    setIsAdminMode(currentPath.startsWith('/admin'));
  }, [currentPath]);

  // Main navigation items
  const getMainNavItems = () => {
    const baseItems = [];

    if (isChurchAdmin) {
      baseItems.push({ icon: Settings, label: "Admin", path: "/admin-dashboard", isAdmin: true });
    }

    baseItems.push(
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Plus, label: "My Needs", path: "/my-needs" },
      { icon: Users, label: "Volunteering", path: "/volunteering" },
      { icon: BookOpen, label: "Browse", path: "/browse" },
      { icon: MessageSquare, label: "Feedback", path: "/feedback" }
    );

    return baseItems;
  };

  // Admin submenu items with expandable sections
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['dashboard']));
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const adminSubmenuSections = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin-dashboard",
      type: 'single' as const
    },
    {
      id: 'community-management',
      icon: Users,
      label: "Community Management",
      type: 'expandable' as const,
      items: [
        { icon: Users, label: "Community Needs", path: "/admin/community-needs" },
        { icon: CheckCircle, label: "Need Approvals", path: "/admin/need-approvals" },
        { icon: Users, label: "Members & Helpers", path: "/admin/members-helpers" },
        { icon: TrendingUp, label: "Community Impact", path: "/admin/community-impact" }
      ]
    },
    {
      id: 'content-moderation',
      icon: Flag,
      label: "Content Moderation",
      type: 'expandable' as const,
      items: [
        { icon: Flag, label: "Flagged Content", path: "/admin/flagged-content" },
        { icon: Settings, label: "Moderation Rules", path: "/admin/moderation-rules" },
        { icon: MessageSquare, label: "Reports", path: "/admin/reports" }
      ]
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: "Analytics & Reports",
      type: 'expandable' as const,
      items: [
        { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
        { icon: TrendingUp, label: "Performance", path: "/admin/performance" },
        { icon: Users, label: "User Insights", path: "/admin/user-insights" }
      ]
    },
    {
      id: 'communication',
      icon: Megaphone,
      label: "Communication",
      type: 'expandable' as const,
      items: [
        { icon: Megaphone, label: "Announcements", path: "/admin/announcements" },
        { icon: MessageSquare, label: "Notifications", path: "/admin/notifications" },
        { icon: Settings, label: "Email Templates", path: "/admin/email-templates" }
      ]
    },
    {
      id: 'settings',
      icon: Settings,
      label: "Admin Settings",
      path: "/admin/settings",
      type: 'single' as const
    }
  ];

  const mainNavItems = getMainNavItems();

  const handleNavItemClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminMode(true);
    } else {
      setIsAdminMode(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen w-full relative">
          {!isAdminMode ? (
            /* STATE 1: DEFAULT NAVIGATION - Full sidebar */
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
                {mainNavItems.map((item) => {
                  const isActive = currentPath === item.path || (item.isAdmin && currentPath.startsWith('/admin'));
                  
                  if (item.isAdmin) {
                    return (
                      <div key={item.path}>
                        <button
                          onClick={() => handleNavItemClick(item)}
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
                        </button>
                      </div>
                    );
                  }

                  const linkContent = (
                    <Link
                      to={item.path}
                      onClick={() => handleNavItemClick(item)}
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
          ) : (
            /* STATE 2: ADMIN EXPANDED - Icon strip + Admin submenu */
            <div className="flex">
              {/* Left Column - Icon Strip */}
              <div className="w-15 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 space-y-2">
                {/* Brand Icon */}
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                </div>

                {/* Navigation Icons */}
                {mainNavItems.map((item) => {
                  const isActive = item.isAdmin && isAdminMode;
                  
                  const iconButton = (
                    <button
                      onClick={() => handleNavItemClick(item)}
                      className={`
                        w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                    </button>
                  );

                  if (item.isAdmin) {
                    return (
                      <div key={item.path}>
                        {iconButton}
                      </div>
                    );
                  }

                  return (
                    <Tooltip key={item.path}>
                      <TooltipTrigger asChild>
                        <Link to={item.path} onClick={() => handleNavItemClick(item)}>
                          <div className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
                            <item.icon className="w-5 h-5" />
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>

              {/* Right Column - Admin Submenu */}
              <div className="w-64 bg-sidebar border-r border-sidebar-border">
                {/* Admin Header */}
                <div className="p-4 border-b border-sidebar-border">
                  <h2 className="font-semibold text-sidebar-foreground">Admin Dashboard</h2>
                  <p className="text-sm text-sidebar-foreground/70">Management & Settings</p>
                </div>

                {/* Admin Navigation */}
                <div className="p-4 space-y-1">
                  {adminSubmenuSections.map((section) => {
                    if (section.type === 'single') {
                      const isActive = currentPath === section.path;
                      return (
                        <Link
                          key={section.path}
                          to={section.path!}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                              : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                            }
                          `}
                        >
                          <section.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">{section.label}</span>
                        </Link>
                      );
                    }

                    const isExpanded = expandedSections.has(section.id);
                    const hasActiveChild = section.items?.some(item => currentPath === item.path);

                    return (
                      <div key={section.id} className="space-y-1">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 justify-between
                            ${hasActiveChild
                              ? 'bg-sidebar-accent/30 text-sidebar-accent-foreground' 
                              : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <section.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">{section.label}</span>
                          </div>
                          <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-sidebar-foreground/50">
                              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </button>
                        
                        {isExpanded && section.items && (
                          <div className="ml-4 space-y-1 animate-accordion-down">
                            {section.items.map((item) => {
                              const isActive = currentPath === item.path;
                              return (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className={`
                                    w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm
                                    ${isActive
                                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                                      : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                                    }
                                  `}
                                >
                                  <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span>{item.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}