import { AdminPendingApprovals } from "./AdminPendingApprovals";
import { AdminFlaggedContent } from "./AdminFlaggedContent";
import { AdminRecentActivity } from "./AdminRecentActivity";
import { AdminQuickActions } from "./AdminQuickActions";

export function AdminMainContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <AdminPendingApprovals />
        <AdminFlaggedContent />
        <AdminRecentActivity />
      </div>
      <div className="lg:col-span-1">
        <AdminQuickActions />
      </div>
    </div>
  );
}