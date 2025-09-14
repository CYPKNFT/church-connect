import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, Users, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Heart, label: "My Needs", path: "/my-needs" },
  { icon: Users, label: "Volunteering", path: "/volunteering" },
  { icon: BookOpen, label: "Browse", path: "/browse" },
];

function DashboardSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar className="border-r border-border/50 bg-white">
      <SidebarContent>
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="text-center">
            <h2 className="font-bold text-foreground">Kernan Baptist Church</h2>
            <p className="text-xs text-muted-foreground">Member Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-primary/5 ${
                      currentPath === item.path
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            {/* Global Sidebar Trigger */}
            <header className="h-12 flex items-center border-b border-border/20 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <SidebarTrigger className="ml-4" />
            </header>
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}