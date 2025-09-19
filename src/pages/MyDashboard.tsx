import { useState } from "react";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Eye, MessageCircle, Heart, Package, Gift, Calendar, User, Plus } from "lucide-react";
import { toast } from "sonner";

export default function MyDashboard() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Mock data for demonstration
  const myPostedItems = [
    {
      id: 1,
      title: "Dining Table Set",
      description: "Beautiful wooden dining table with 6 chairs",
      category: "Furniture",
      status: "Available",
      views: 23,
      interested: 3,
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker",
      category: "Electronics",
      status: "Claimed",
      views: 18,
      interested: 5,
      postedDate: "1 week ago"
    }
  ];

  const itemsReceived = [
    {
      id: 1,
      title: "Children's Books Collection",
      description: "Over 50 picture books and early readers",
      previousOwner: "Sarah Johnson",
      pickupDate: "2024-01-15",
      category: "Books"
    },
    {
      id: 2,
      title: "Baby Clothes",
      description: "0-12 months clothing bundle",
      previousOwner: "Michael Chen",
      pickupDate: "2024-01-10",
      category: "Baby/Kids"
    }
  ];

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

  const handleEditItem = (itemTitle: string) => {
    toast.info(`Editing "${itemTitle}"`);
  };

  const handleDeleteItem = (itemTitle: string) => {
    toast.success(`"${itemTitle}" has been deleted`);
  };

  const handleMarkAsGiven = (itemTitle: string) => {
    toast.success(`"${itemTitle}" has been marked as given away`);
  };

  const handleRemoveFromWatchlist = (itemTitle: string) => {
    toast.success(`"${itemTitle}" removed from watchlist`);
  };

  const handleSendThankYou = (owner: string) => {
    toast.success(`Thank you message sent to ${owner}`);
  };

  return (
    <CollapsibleSidebar>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your items and track your community sharing activity</p>
            
            {/* Activity Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{myPostedItems.length}</p>
                  <p className="text-sm text-muted-foreground">Items Posted</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold">{itemsReceived.length}</p>
                  <p className="text-sm text-muted-foreground">Items Received</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold">{watchlistItems.length}</p>
                  <p className="text-sm text-muted-foreground">Watching</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Messages</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="posted" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posted">Items Given</TabsTrigger>
              <TabsTrigger value="received">Items Received</TabsTrigger>
              <TabsTrigger value="watchlist">Items Watchlist</TabsTrigger>
            </TabsList>

            {/* Items Given Tab */}
            <TabsContent value="posted" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Items I've Posted</h2>
                <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Post New Item</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <p className="text-muted-foreground">This would open the same post item modal from the Marketplace page.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {myPostedItems.length > 0 ? (
                <div className="space-y-4">
                  {myPostedItems.map((item) => (
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
                                <Eye className="w-4 h-4" />
                                {item.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {item.interested} interested
                              </span>
                              <span>{item.postedDate}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 md:w-auto w-full">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditItem(item.title)}
                              className="flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            
                            {item.status === "Available" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMarkAsGiven(item.title)}
                                className="flex items-center gap-2"
                              >
                                <Gift className="w-4 h-4" />
                                Mark as Given
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.title)}
                              className="flex items-center gap-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
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
                    <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">No items posted yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start sharing with your community by posting your first item!
                    </p>
                    <Button onClick={() => setIsPostModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post Your First Item
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Items Received Tab */}
            <TabsContent value="received" className="space-y-4">
              <h2 className="text-xl font-semibold">Items I've Received</h2>
              
              {itemsReceived.length > 0 ? (
                <div className="space-y-4">
                  {itemsReceived.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Item Thumbnail */}
                          <div className="w-full md:w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-muted-foreground" />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                From: {item.previousOwner}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Received: {new Date(item.pickupDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="md:w-auto w-full">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSendThankYou(item.previousOwner)}
                              className="flex items-center gap-2"
                            >
                              <Heart className="w-4 h-4" />
                              Send Thank You
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
                    <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">No items received yet</h3>
                    <p className="text-muted-foreground">
                      Browse the marketplace to find items you need from fellow church members.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Watchlist Tab */}
            <TabsContent value="watchlist" className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CollapsibleSidebar>
  );
}