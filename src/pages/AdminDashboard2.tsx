import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminDashboard2() {
  // Mock church data for template display
  const mockChurch = {
    id: "template-church",
    name: "Template Church"
  };

  return (
    <CollapsibleSidebar>
      <div className="flex-1 min-h-screen">
        <AdminHeader church={mockChurch} />
        <div className="p-6">
          {/* Empty content area - template ready for customization */}
        </div>
      </div>
    </CollapsibleSidebar>
  );
}