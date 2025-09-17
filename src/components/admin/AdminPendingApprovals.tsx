import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

const pendingNeeds = [
  {
    id: "1",
    title: "Help with moving furniture",
    author: "Sarah M.",
    location: "Riverside neighborhood",
    description: "Need assistance moving a couch and dining table to second floor apartment",
    urgency: "flexible",
    timePosted: "2 hours ago",
  },
  {
    id: "2", 
    title: "Elderly neighbor needs groceries",
    author: "Michael T.",
    location: "Downtown area",
    description: "Weekly grocery run for elderly neighbor who can't drive",
    urgency: "soon",
    timePosted: "4 hours ago",
  },
  {
    id: "3",
    title: "Ride needed to medical appointment",
    author: "Linda K.",
    location: "Medical center",
    description: "Transportation needed for routine checkup, round trip",
    urgency: "urgent",
    timePosted: "6 hours ago",
  },
];

export function AdminPendingApprovals() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Needs Awaiting Approval</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingNeeds.map((need) => (
          <div key={need.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{need.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>Posted by {need.author}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{need.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={need.urgency === "urgent" ? "destructive" : need.urgency === "soon" ? "secondary" : "outline"}>
                  {need.urgency}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{need.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{need.timePosted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">Review</Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                <Button size="sm" variant="destructive">Reject</Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}