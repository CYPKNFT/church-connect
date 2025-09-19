import { useState } from "react";
import { Package, Heart, MessageCircle, Eye, Edit, Trash2, Check, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";

// Mock data
const myItems = [
  {
    id: 1,
    title: "Kitchen Table Set",
    description: "Oak table with 4 chairs, great condition",
    image: "/placeholder.svg",
    status: "available",
    views: 24,
    interested: 3,
    postedDate: "2024-01-15",
    interestedUsers: [
      { name: "Sarah M.", contactedAt: "2024-01-16", status: "pending" },
      { name: "Mike R.", contactedAt: "2024-01-17", status: "responded" },
      { name: "Lisa K.", contactedAt: "2024-01-18", status: "pending" }
    ]
  },
  {
    id: 2,
    title: "Children's Books",
    description: "Collection of 20+ children's books",
    image: "/placeholder.svg",
    status: "claimed",
    views: 45,
    interested: 7,
    postedDate: "2024-01-10",
    claimedBy: "Jennifer L.",
    claimedDate: "2024-01-18"
  },
  {
    id: 3,
    title: "Office Chair",
    description: "Ergonomic office chair, barely used",
    image: "/placeholder.svg",
    status: "given",
    views: 32,
    interested: 5,
    postedDate: "2024-01-05",
    givenTo: "David K.",
    givenDate: "2024-01-12"
  }
];

const interestedItems = [
  {
    id: 1,
    title: "Baby Stroller",
    image: "/placeholder.svg",
    owner: "Mary S.",
    status: "interest_sent",
    requestedAt: "2024-01-18",
    description: "Lightweight stroller, perfect for newborns"
  },
  {
    id: 2,
    title: "Garden Tools",
    image: "/placeholder.svg", 
    owner: "Robert T.",
    status: "owner_responded",
    requestedAt: "2024-01-16",
    responseAt: "2024-01-17",
    description: "Complete garden tool set with storage"
  },
  {
    id: 3,
    title: "Winter Coats",
    image: "/placeholder.svg",
    owner: "Linda H.",
    status: "pickup_arranged",
    requestedAt: "2024-01-14",
    pickupDate: "2024-01-20",
    description: "Size medium winter coats, excellent condition"
  },
  {
    id: 4,
    title: "Board Games",
    image: "/placeholder.svg",
    owner: "Chris P.",
    status: "received",
    requestedAt: "2024-01-10",
    receivedAt: "2024-01-15",
    description: "Family board games collection"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-500';
    case 'claimed': return 'bg-yellow-500';
    case 'given': return 'bg-gray-500';
    case 'interest_sent': return 'bg-blue-500';
    case 'owner_responded': return 'bg-purple-500';
    case 'pickup_arranged': return 'bg-orange-500';
    case 'received': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Available';
    case 'claimed': return 'Claimed';
    case 'given': return 'Given Away';
    case 'interest_sent': return 'Interest Sent';
    case 'owner_responded': return 'Owner Responded';
    case 'pickup_arranged': return 'Pickup Arranged';
    case 'received': return 'Received';
    default: return status;
  }
};

export default function MyDashboard() {
  const [marketplaceActivityOpen, setMarketplaceActivityOpen] = useState(false);
  const [itemsInterestedOpen, setItemsInterestedOpen] = useState(false);
  const { displayName } = useMembership();

  return (
    <CollapsibleSidebar>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <nav className="text-sm text-muted-foreground mb-2">
              Giving &gt; My Dashboard
            </nav>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {displayName || "Member"}! Here's your marketplace activity
            </p>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Items Posted</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">Items Given</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Items Received</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="text-sm text-muted-foreground">Community Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-6">
            {/* My Marketplace Activity */}
            <Collapsible open={marketplaceActivityOpen} onOpenChange={setMarketplaceActivityOpen}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <CardTitle>My Marketplace Activity</CardTitle>
                      </div>
                      {marketplaceActivityOpen ? (
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="w-5 h-5 transition-transform duration-200" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {myItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {item.views} views
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {item.interested} interested
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(item.status)}>
                                  {getStatusText(item.status)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              {item.status === 'available' && (
                                <>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Check className="w-3 h-3 mr-1" />
                                    Mark as Given
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View Interest ({item.interested})
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-border">
                        <Button variant="outline" className="w-full">
                          View All My Listings →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Items I'm Interested In */}
            <Collapsible open={itemsInterestedOpen} onOpenChange={setItemsInterestedOpen}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Heart className="w-5 h-5 text-red-600" />
                        </div>
                        <CardTitle>Items I'm Interested In</CardTitle>
                      </div>
                      {itemsInterestedOpen ? (
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="w-5 h-5 transition-transform duration-200" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {interestedItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                  <User className="w-3 h-3" />
                                  <span>Owner: {item.owner}</span>
                                  <Clock className="w-3 h-3 ml-2" />
                                  <span>Requested: {new Date(item.requestedAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusText(item.status)}
                              </Badge>
                            </div>
                            <div className="flex gap-2 mt-3">
                              {item.status !== 'received' && (
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  Message Owner
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                Remove Interest
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-border">
                        <Button variant="outline" className="w-full">
                          View All My Interests →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>
      </div>
    </CollapsibleSidebar>
  );
}