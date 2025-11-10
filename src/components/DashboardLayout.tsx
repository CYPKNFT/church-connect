import { Suspense } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { TwoLevelNav } from "./TwoLevelNav";

// Map routes to menu IDs and submenu paths
function getActiveMenuFromRoute(pathname: string): { activeMenuId: string; activeSubItemPath: string } {
  // Admin routes
  if (pathname.startsWith("/admin")) {
    const adminRoutes: { [key: string]: string } = {
      "/admin/dashboard": "/admin/dashboard",
      "/admin/staff-verification": "/admin/staff-verification",
      "/admin/content-moderation": "/admin/content-moderation",
      "/admin/analytics": "/admin/analytics",
      "/admin/settings": "/admin/settings",
    };
    return {
      activeMenuId: "admin",
      activeSubItemPath: adminRoutes[pathname] || "/admin/dashboard",
    };
  }

  // Serving routes
  const servingRoutes: { [key: string]: string } = {
    "/dashboard": "/dashboard",
    "/volunteering": "/volunteering",
    "/my-needs": "/my-needs",
  };

  if (servingRoutes[pathname]) {
    return {
      activeMenuId: "serving",
      activeSubItemPath: servingRoutes[pathname],
    };
  }

  // Giving routes
  const givingRoutes: { [key: string]: string } = {
    "/giving": "/giving",
    "/received": "/received",
    "/watchlist": "/watchlist",
    "/wishlist": "/wishlist",
  };

  if (givingRoutes[pathname]) {
    return {
      activeMenuId: "giving",
      activeSubItemPath: givingRoutes[pathname],
    };
  }

  // Feedback routes
  const feedbackRoutes: { [key: string]: string } = {
    "/feedback": "/feedback",
    "/feedback/app": "/feedback/app",
    "/feedback/church": "/feedback/church",
  };

  if (feedbackRoutes[pathname]) {
    return {
      activeMenuId: "feedback",
      activeSubItemPath: feedbackRoutes[pathname],
    };
  }

  // Ministries routes
  if (pathname.startsWith("/ministries")) {
    const ministriesRoutes: { [key: string]: string } = {
      "/ministries/dashboard": "/ministries/dashboard",
      "/ministries/homeless-outreach": "/ministries/homeless-outreach",
      "/ministries/winter-coat-drive": "/ministries/winter-coat-drive",
      "/ministries/food-pantry": "/ministries/food-pantry",
      "/ministries/back-to-school": "/ministries/back-to-school",
    };
    return {
      activeMenuId: "ministries",
      activeSubItemPath: ministriesRoutes[pathname] || "/ministries/dashboard",
    };
  }

  // Default fallback
  return {
    activeMenuId: "serving",
    activeSubItemPath: "/dashboard",
  };
}

// Simple content skeleton that matches the layout
function ContentSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex-1 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const { activeMenuId, activeSubItemPath } = getActiveMenuFromRoute(location.pathname);

  return (
    <TwoLevelNav activeMenuId={activeMenuId} activeSubItemPath={activeSubItemPath}>
      <Suspense fallback={<ContentSkeleton />}>
        <Outlet />
      </Suspense>
    </TwoLevelNav>
  );
}
