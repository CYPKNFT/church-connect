import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle } from "lucide-react";

const flaggedItems = [
  {
    id: "1",
    title: "Inappropriate language in need post",
    description: "Reported by community • Auto-flagged",
    status: "flagged",
    type: "need_post",
    severity: "medium",
    timeReported: "1 hour ago",
  },
  {
    id: "2",
    title: "Suspicious volunteer offer",
    description: "Multiple reports • Safety concern",
    status: "flagged", 
    type: "volunteer_offer",
    severity: "high",
    timeReported: "3 hours ago",
  },
  {
    id: "3",
    title: "Resolved: Commercial spam post",
    description: "Removed by admin • User warned",
    status: "resolved",
    type: "need_post",
    severity: "low",
    timeReported: "1 day ago",
  },
];

export function AdminFlaggedContent() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Flagged Content</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {flaggedItems.map((item) => (
          <div key={item.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {item.status === "resolved" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={item.status === "resolved" ? "secondary" : "destructive"}
                  className={item.status === "resolved" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                >
                  {item.status === "resolved" ? "Resolved" : "Flagged"}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {item.severity} priority
                </Badge>
                <span className="text-xs text-muted-foreground">{item.timeReported}</span>
              </div>
              
              {item.status === "flagged" ? (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              ) : (
                <Button size="sm" variant="outline">View</Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}