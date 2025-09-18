import { DashboardLayout } from "@/components/DashboardLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { AdminMainContent } from "@/components/admin/AdminMainContent";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function Admin2Dashboard() {
  // Mock church data for public demo
  const mockChurch = {
    id: "demo-church-id",
    name: "Demo Church"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 min-h-screen">
          <AdminHeader church={mockChurch} />
          <div className="p-6 space-y-6">
            <AdminMetrics />
            <AdminMainContent />
          </div>
        </div>
      </div>
    </div>
  );
}