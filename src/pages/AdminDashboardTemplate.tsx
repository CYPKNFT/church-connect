import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { AdminMainContent } from "@/components/admin/AdminMainContent";

export default function AdminDashboardTemplate() {
  // Mock church data for template display
  const mockChurch = {
    id: "template-church",
    name: "Template Church"
  };

  return (
    <CollapsibleSidebar>
      <div className="flex-1 min-h-screen">
        <AdminHeader church={mockChurch} />
        <div className="p-6 space-y-6">
          <AdminMetrics />
          <AdminMainContent />
        </div>
      </div>
    </CollapsibleSidebar>
  );
}