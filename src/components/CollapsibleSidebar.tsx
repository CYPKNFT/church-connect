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
  ShieldCheck,
  FolderOpen,
  BarChart3,
  PanelsTopLeft,
  HandHeart,
  ShoppingCart,
  Package
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
  const [isAdminCopyMode, setIsAdminCopyMode] = useState(false);
  const [isServingMode, setIsServingMode] = useState(false);
  const [isAdminCollapsed, setIsAdminCollapsed] = useState(false);
  const [isAdminCopyCollapsed, setIsAdminCopyCollapsed] = useState(false);
  const [isServingCollapsed, setIsServingCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { churchName } = useMembership();
  const { isChurchAdmin } = useChurchVerification();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if we're on an admin or serving route to maintain mode
  useEffect(() => {
    setIsAdminMode(currentPath.startsWith('/admin') && !currentPath.startsWith('/admin-copy'));
    setIsAdminCopyMode(currentPath.startsWith('/admin-copy'));
    setIsServingMode(
      currentPath === '/dashboard' || 
      currentPath === '/my-needs' || 
      currentPath === '/volunteering' || 
      currentPath === '/browse'
    );
  }, [currentPath]);

  // Main navigation items
  const getMainNavItems = () => {
    const baseItems = [];

    if (isChurchAdmin) {
      baseItems.push({ icon: Settings, label: "Admin", path: "/admin/dashboard", isAdmin: true });
      baseItems.push({ icon: Settings, label: "Admin Copy", path: "/admin-copy/dashboard", isAdminCopy: true });
    }

    baseItems.push(
      { icon: HandHeart, label: "Serving", path: "/dashboard", category: "serving" },
      { icon: ShoppingCart, label: "Giving", path: "/marketplace", category: "giving" },
      { icon: MessageSquare, label: "Feedback", path: "/feedback", category: "feedback" }
    );

    return baseItems;
  };

  // Admin submenu items
  const adminSubmenuItems = [
    { icon: PanelsTopLeft, label: "Dashboard", path: "/admin/dashboard" },
    { icon: ShieldCheck, label: "Staff Verification", path: "/admin/staff-verification" },
    { icon: FolderOpen, label: "Content Moderation", path: "/admin/content-moderation" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "System Settings", path: "/admin/settings" }
  ];

  // Admin Copy submenu items (exact duplicate)
  const adminCopySubmenuItems = [
    { icon: PanelsTopLeft, label: "Dashboard", path: "/admin-copy/dashboard" },
    { icon: ShieldCheck, label: "Staff Verification", path: "/admin-copy/staff-verification" },
    { icon: FolderOpen, label: "Content Moderation", path: "/admin-copy/content-moderation" },
    { icon: BarChart3, label: "Analytics", path: "/admin-copy/analytics" },
    { icon: Settings, label: "System Settings", path: "/admin-copy/settings" }
  ];

  // Serving submenu items
  const servingSubmenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Plus, label: "My Needs", path: "/my-needs" },
    { icon: Users, label: "Volunteering", path: "/volunteering" },
    { icon: BookOpen, label: "Browse", path: "/browse" }
  ];

  const mainNavItems = getMainNavItems();

  const handleNavItemClick = (item: any) => {
    if (item.isAdmin) {
      setIsAdminMode(true);
      setIsAdminCopyMode(false);
      setIsServingMode(false);
    } else if (item.isAdminCopy) {
      setIsAdminCopyMode(true);
      setIsAdminMode(false);
      setIsServingMode(false);
    } else if (item.category === 'serving') {
      setIsServingMode(true);
      setIsAdminMode(false);
      setIsAdminCopyMode(false);
    } else {
      setIsAdminMode(false);
      setIsAdminCopyMode(false);
      setIsServingMode(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen w-full relative">
          {!isAdminMode && !isAdminCopyMode && !isServingMode ? (
            /* STATE 1: DEFAULT NAVIGATION - Full sidebar */
            <div 
              className={`
                bg-sidebar border-r border-sidebar-border relative
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
                  const isActive = currentPath === item.path || 
                    (item.isAdmin && currentPath.startsWith('/admin') && !currentPath.startsWith('/admin-copy')) ||
                    (item.isAdminCopy && currentPath.startsWith('/admin-copy'));
                  
                  if (item.isAdmin || item.isAdminCopy) {
                    return (
                      <div key={item.path}>
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
          ) : isAdminMode ? (
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

              {/* Right Column - Admin Submenu with Collapse */}
              <div 
                className={`
                  bg-sidebar border-r border-sidebar-border relative
                  ${isAdminCollapsed ? 'w-16' : 'w-64'}
                `}
              >
                {/* Admin Collapse Toggle */}
                <div
                  onClick={() => setIsAdminCollapsed(!isAdminCollapsed)}
                  className={`
                    absolute top-4 cursor-pointer z-20 transition-all duration-300 ease-in-out
                    bg-sidebar-border hover:bg-sidebar-border/80 
                    flex items-center justify-center
                    right-[-16px] w-4 h-6 rounded-r-sm
                  `}
                >
                  <div className={`transition-transform duration-300 ${isAdminCollapsed ? 'rotate-0' : 'rotate-180'}`}>
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

                {/* Admin Header */}
                {!isAdminCollapsed && (
                  <div className="p-4 border-b border-sidebar-border">
                    <h2 className="font-semibold text-sidebar-foreground">Admin Dashboard</h2>
                    <p className="text-sm text-sidebar-foreground/70">Management & Settings</p>
                  </div>
                )}

                {/* Admin Navigation */}
                <div className="p-4 space-y-1">
                  {adminSubmenuItems.map((item) => {
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
                          ${isAdminCollapsed ? 'justify-center' : ''}
                        `}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!isAdminCollapsed && <span className="font-medium">{item.label}</span>}
                      </Link>
                    );

                    if (isAdminCollapsed) {
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
            </div>
          ) : isAdminCopyMode ? (
            /* STATE 2B: ADMIN COPY EXPANDED - Icon strip + Admin Copy submenu (exact duplicate) */
            <div className="flex">
              {/* Left Column - Icon Strip */}
              <div className="w-15 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 space-y-2">
                {/* Brand Icon */}
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                </div>

                {/* Navigation Icons */}
                {mainNavItems.map((item) => {
                  const isActive = item.isAdminCopy && isAdminCopyMode;
                  
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

                  if (item.isAdminCopy) {
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

              {/* Right Column - Admin Copy Submenu with Collapse */}
              <div 
                className={`
                  bg-sidebar border-r border-sidebar-border relative
                  ${isAdminCopyCollapsed ? 'w-16' : 'w-64'}
                `}
              >
                {/* Admin Copy Collapse Toggle */}
                <div
                  onClick={() => setIsAdminCopyCollapsed(!isAdminCopyCollapsed)}
                  className={`
                    absolute top-4 cursor-pointer z-20 transition-all duration-300 ease-in-out
                    bg-sidebar-border hover:bg-sidebar-border/80 
                    flex items-center justify-center
                    right-[-16px] w-4 h-6 rounded-r-sm
                  `}
                >
                  <div className={`transition-transform duration-300 ${isAdminCopyCollapsed ? 'rotate-0' : 'rotate-180'}`}>
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

                {/* Admin Copy Header */}
                {!isAdminCopyCollapsed && (
                  <div className="p-4 border-b border-sidebar-border">
                    <h2 className="font-semibold text-sidebar-foreground">Admin Dashboard</h2>
                    <p className="text-sm text-sidebar-foreground/70">Management & Settings</p>
                  </div>
                )}

                {/* Admin Copy Navigation */}
                <div className="p-4 space-y-1">
                  {adminCopySubmenuItems.map((item) => {
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
                          ${isAdminCopyCollapsed ? 'justify-center' : ''}
                        `}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!isAdminCopyCollapsed && <span className="font-medium">{item.label}</span>}
                      </Link>
                    );

                    if (isAdminCopyCollapsed) {
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
            </div>
          ) : (
            /* STATE 3: SERVING EXPANDED - Icon strip + Serving submenu */
            <div className="flex">
              {/* Left Column - Icon Strip */}
              <div className="w-15 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 space-y-2">
                {/* Brand Icon */}
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
                </div>

                {/* Navigation Icons */}
                {mainNavItems.map((item) => {
                  const isActive = item.category === 'serving' && isServingMode;
                  
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

                  if (item.category === 'serving') {
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

              {/* Right Column - Serving Submenu with Collapse */}
              <div 
                className={`
                  bg-sidebar border-r border-sidebar-border relative
                  ${isServingCollapsed ? 'w-16' : 'w-64'}
                `}
              >
                {/* Serving Collapse Toggle */}
                <div
                  onClick={() => setIsServingCollapsed(!isServingCollapsed)}
                  className={`
                    absolute top-4 cursor-pointer z-20 transition-all duration-300 ease-in-out
                    bg-sidebar-border hover:bg-sidebar-border/80 
                    flex items-center justify-center
                    right-[-16px] w-4 h-6 rounded-r-sm
                  `}
                >
                  <div className={`transition-transform duration-300 ${isServingCollapsed ? 'rotate-0' : 'rotate-180'}`}>
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

                {/* Serving Header */}
                {!isServingCollapsed && (
                  <div className="p-4 border-b border-sidebar-border">
                    <h2 className="font-semibold text-sidebar-foreground">Serving</h2>
                    <p className="text-sm text-sidebar-foreground/70">Community & Service</p>
                  </div>
                )}

                {/* Serving Navigation */}
                <div className="p-4 space-y-1">
                  {servingSubmenuItems.map((item) => {
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
                          ${isServingCollapsed ? 'justify-center' : ''}
                        `}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!isServingCollapsed && <span className="font-medium">{item.label}</span>}
                      </Link>
                    );

                    if (isServingCollapsed) {
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