import { useState } from "react";
import { Plus, Edit, Trash2, Eye, MessageSquare, Heart, Package, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";

// Mock data for demonstration
const mockUserName = "Sarah";

const mockPostedItems = [
  {
    id: 1,
    title: "Dining Table Set",
    status: "Available",
    views: 23,
    interested: 3,
    image: null,
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Children's Books",
    status: "Claimed",
    views: 15,
    interested: 2,
    image: null,
    postedDate: "2024-01-10"
  }
];

const mockReceivedItems = [
  {
    id: 1,
    title: "Kitchen Appliances",
    previousOwner: "John Smith",
    pickupDate: "2024-01-12",
    category: "Electronics",
    thankYouSent: true
  },
  {
    id: 2,
    title: "Baby Clothes",
    previousOwner: "Mary Johnson",
    pickupDate: "2024-01-08",
    category: "Baby/Kids",
    thankYouSent: false
  }
];

const mockWatchlistItems = [
  {
    id: 1,
    title: "Garden Tools",
    owner: "Mike Wilson",
    status: "Interest Sent",
    postedDate: "2024-01-14",
    category: "Garden"
  },
  {
    id: 2,
    title: "Office Desk",
    owner: "Lisa Brown",
    status: "Owner Responded",
    postedDate: "2024-01-13",
    category: "Furniture"
  }
];

export default function MyDashboard() {
  const [activeTab, setActiveTab] = useState("given");

  const handleEditItem = (itemId: number) => {
    console.log("Edit item:", itemId);
  };

  const handleMarkAsGiven = (itemId: number) => {
    console.log("Mark as given:", itemId);
  };

  const handleDeleteItem = (itemId: number) => {
    console.log("Delete item:", itemId);
  };

  const handleRemoveFromWatchlist = (itemId: number) => {
    console.log("Remove from watchlist:", itemId);
  };

  const handleSendThankYou = (itemId: number) => {
    console.log("Send thank you:", itemId);
  };

  const handleMessageOwner = (itemId: number) => {
    console.log("Message owner:", itemId);
  };

  return (
    <CollapsibleSidebar>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {mockUserName}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Here's your marketplace activity
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockPostedItems.length}</p>
                      <p className="text-sm text-muted-foreground">Items Posted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Gift className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {mockPostedItems.filter(item => item.status === "Given").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Items Given</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Heart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockReceivedItems.length}</p>
                      <p className="text-sm text-muted-foreground">Items Received</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">Community Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="given">Items Given</TabsTrigger>
              <TabsTrigger value="received">Items Received</TabsTrigger>
              <TabsTrigger value="watchlist">Items Watchlist</TabsTrigger>
            </TabsList>

            {/* Items Given Tab */}
            <TabsContent value="given" className="space-y-4">
              {mockPostedItems.length > 0 ? (
                <div className="space-y-4">
                  {mockPostedItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <Package className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                                {item.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {item.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {item.interested} interested
                              </span>
                              <span>Posted {new Date(item.postedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditItem(item.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            {item.status === "Available" && (
                              <Button variant="outline" size="sm" onClick={() => handleMarkAsGiven(item.id)}>
                                Mark as Given
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="w-4 h-4" />
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
                    <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No items posted yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start sharing with your church community by posting your first item.
                    </p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Item
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Items Received Tab */}
            <TabsContent value="received" className="space-y-4">
              {mockReceivedItems.length > 0 ? (
                <div className="space-y-4">
                  {mockReceivedItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            <Gift className="w-8 h-8 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>Received from <span className="font-medium">{item.previousOwner}</span></p>
                              <p>Pickup date: {new Date(item.pickupDate).toLocaleDateString()}</p>
                              <p>Category: {item.category}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {!item.thankYouSent ? (
                              <Button variant="outline" size="sm" onClick={() => handleSendThankYou(item.id)}>
                                Send Thank You
                              </Button>
                            ) : (
                              <Badge variant="secondary">Thank You Sent</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Gift className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No items received yet</h3>
                    <p className="text-muted-foreground">
                      Browse the marketplace to find items you need.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Items Watchlist Tab */}
            <TabsContent value="watchlist" className="space-y-4">
              {mockWatchlistItems.length > 0 ? (
                <div className="space-y-4">
                  {mockWatchlistItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            <Heart className="w-8 h-8 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <Badge variant="outline">{item.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>Owner: <span className="font-medium">{item.owner}</span></p>
                              <p>Posted: {new Date(item.postedDate).toLocaleDateString()}</p>
                              <p>Category: {item.category}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleMessageOwner(item.id)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message Owner
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleRemoveFromWatchlist(item.id)}>
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
                    <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No items in watchlist</h3>
                    <p className="text-muted-foreground">
                      Items you express interest in will appear here.
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