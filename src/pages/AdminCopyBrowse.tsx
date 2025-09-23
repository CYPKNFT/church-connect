import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminCopyBrowse() {
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Copy Browse
            </h1>
            <p className="text-lg text-muted-foreground">
              Administrative browse management template for admin copy functionality
            </p>
          </div>
          {/* Empty content area - template ready for customization */}
        </div>
      </div>
    </CollapsibleSidebar>
  );
}