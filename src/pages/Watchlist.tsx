import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, MessageCircle, Trash2, User } from "lucide-react";
import { toast } from "sonner";

export default function Watchlist() {
  const watchlistItems = [
    {
      id: 1,
      title: "Office Desk",
      description: "Wooden desk with drawers",
      owner: "Emma Davis",
      status: "Available",
      postedDate: "1 day ago",
      category: "Furniture"
    },
    {
      id: 2,
      title: "Exercise Equipment",
      description: "Treadmill in good condition",
      owner: "John Smith",
      status: "Pending",
      postedDate: "3 days ago",
      category: "Fitness"
    }
  ];

  const handleRemoveFromWatchlist = (itemTitle: string) => {
    toast.success(`"${itemTitle}" removed from watchlist`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Watchlist</h1>
            <p className="text-muted-foreground">Items you're interested in from the community marketplace</p>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items I'm Watching</h2>
            
            {watchlistItems.length > 0 ? (
              <div className="space-y-4">
                {watchlistItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Item Thumbnail */}
                        <div className="w-full md:w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-muted-foreground" />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              Owner: {item.owner}
                            </span>
                            <span>{item.postedDate}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 md:w-auto w-full">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Contact Owner
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveFromWatchlist(item.title)}
                            className="flex items-center gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No items in watchlist</h3>
                  <p className="text-muted-foreground">
                    Express interest in items from the marketplace to track them here.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}