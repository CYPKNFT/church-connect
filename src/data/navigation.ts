import {
  Settings,
  LayoutDashboard,
  ShieldCheck,
  FolderOpen,
  BarChart3,
  HandHeart,
  Plus,
  Users,
  BookOpen,
  Gift,
  Package,
  Heart,
  ShoppingBag,
  MessageSquare,
  HeartHandshake,
  PanelsTopLeft,
} from "lucide-react";
import { MenuItem } from "@/types/navigation";

export const menuData: MenuItem[] = [
  {
    id: "admin",
    label: "Admin",
    subtitle: "Church Administration",
    icon: Settings,
    isAdmin: true,
    subItems: [
      { id: "admin-dashboard", label: "Dashboard", icon: PanelsTopLeft, path: "/admin/dashboard" },
      { id: "staff-verification", label: "Staff Verification", icon: ShieldCheck, path: "/admin/staff-verification" },
      { id: "content-moderation", label: "Content Moderation", icon: FolderOpen, path: "/admin/content-moderation" },
      { id: "analytics", label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    ],
  },
  {
    id: "admin-copy",
    label: "Admin Copy",
    subtitle: "Community Service",
    icon: HeartHandshake,
    isAdminCopy: true,
    subItems: [
      { id: "admin-copy-dashboard", label: "Dashboard", icon: PanelsTopLeft, path: "/admin/dashboard" },
      { id: "admin-copy-needs", label: "My Needs", icon: Plus, path: "/admin/staff-verification" },
      { id: "admin-copy-volunteering", label: "Volunteering", icon: Users, path: "/admin/content-moderation" },
      { id: "admin-copy-browse", label: "Browse", icon: BookOpen, path: "/admin/analytics" },
    ],
  },
  {
    id: "serving",
    label: "Serving",
    subtitle: "Community & Service",
    icon: HandHeart,
    category: "serving",
    subItems: [
      { id: "serving-dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { id: "my-needs", label: "My Needs", icon: Plus, path: "/my-needs" },
      { id: "volunteering", label: "Volunteering", icon: Users, path: "/volunteering" },
      { id: "browse", label: "Browse", icon: BookOpen, path: "/browse" },
    ],
  },
  {
    id: "giving",
    label: "Giving",
    subtitle: "Resources & Support",
    icon: Gift,
    category: "giving",
    subItems: [
      { id: "giving-main", label: "Giving", icon: Gift, path: "/giving" },
      { id: "received", label: "Received", icon: Package, path: "/received" },
      { id: "watchlist", label: "Watchlist", icon: Heart, path: "/watchlist" },
      { id: "marketplace", label: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    subtitle: "Your Voice Matters",
    icon: MessageSquare,
    category: "feedback",
    subItems: [
      { id: "general", label: "General", icon: MessageSquare, path: "/feedback" },
      { id: "app", label: "App", icon: Settings, path: "/feedback/app" },
      { id: "church", label: "Church", icon: Heart, path: "/feedback/church" },
    ],
  },
];

// Helper function to get menu items based on user permissions
export const getMenuItems = (isChurchAdmin: boolean): MenuItem[] => {
  if (isChurchAdmin) {
    return menuData; // Include admin items
  }
  return menuData.filter(item => !item.isAdmin && !item.isAdminCopy); // Exclude admin items
};

// Helper function to get current menu based on route
export const getCurrentMenuFromRoute = (pathname: string): string => {
  if (pathname.startsWith('/admin')) {
    const params = new URLSearchParams(window.location.search);
    const gear = params.get('gear');
    return gear === 'copy' ? 'admin-copy' : 'admin';
  }
  
  if (pathname === '/dashboard' || pathname === '/my-needs' || pathname === '/volunteering' || pathname === '/browse') {
    return 'serving';
  }
  
  if (pathname === '/marketplace' || pathname === '/my-dashboard' || pathname === '/giving' || pathname === '/received' || pathname === '/watchlist') {
    return 'giving';
  }
  
  if (pathname.startsWith('/feedback')) {
    return 'feedback';
  }
  
  return 'serving'; // Default fallback
};

// Helper function to get current submenu item based on route
export const getCurrentSubItemFromRoute = (pathname: string): string => {
  // Admin routes
  if (pathname === '/admin/dashboard') return 'admin-dashboard';
  if (pathname === '/admin/staff-verification') return 'staff-verification';
  if (pathname === '/admin/content-moderation') return 'content-moderation';
  if (pathname === '/admin/analytics') return 'analytics';
  
  // Serving routes
  if (pathname === '/dashboard') return 'serving-dashboard';
  if (pathname === '/my-needs') return 'my-needs';
  if (pathname === '/volunteering') return 'volunteering';
  if (pathname === '/browse') return 'browse';
  
  // Giving routes
  if (pathname === '/giving') return 'giving-main';
  if (pathname === '/received') return 'received';
  if (pathname === '/watchlist') return 'watchlist';
  if (pathname === '/marketplace') return 'marketplace';
  
  // Feedback routes
  if (pathname === '/feedback') return 'general';
  if (pathname === '/feedback/app') return 'app';
  if (pathname === '/feedback/church') return 'church';
  
  return 'serving-dashboard'; // Default fallback
};

