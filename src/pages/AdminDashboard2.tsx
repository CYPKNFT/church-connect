import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { AdminMainContent } from "@/components/admin/AdminMainContent";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard2() {
  const { isAdmin, loading, church } = useAdminAccess();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin access to this church.",
        variant: "destructive",
      });
    }
  }, [isAdmin, loading, toast]);

  if (loading) {
    return (
      <CollapsibleSidebar>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </CollapsibleSidebar>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <CollapsibleSidebar>
      <div className="flex-1 min-h-screen">
        <AdminHeader church={church} />
        <div className="p-6 space-y-6">
          <AdminMetrics />
          <AdminMainContent />
        </div>
      </div>
    </CollapsibleSidebar>
  );
}