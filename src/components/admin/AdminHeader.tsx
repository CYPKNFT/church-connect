import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";

interface AdminHeaderProps {
  church: {
    id: string;
    name: string;
  } | null;
}

export function AdminHeader({ church }: AdminHeaderProps) {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Admin</h1>
          <p className="text-muted-foreground mt-1">
            Manage your church's neighborly helping network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Update
          </Button>
          <Button className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white">
            <Plus className="h-4 w-4" />
            Post Community Need
          </Button>
        </div>
      </div>
    </div>
  );
}