import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";

export default function AdminDashboardTemplate() {
  // Mock church data for template display
  const mockChurch = {
    id: "template-church",
    name: "Template Church"
  };

  return (
    <CollapsibleSidebar>
      <div className="flex-1 min-h-screen">
        
        <div className="p-6">
          {/* Empty content area - template ready for customization */}
        </div>
      </div>
    </CollapsibleSidebar>
  );
}