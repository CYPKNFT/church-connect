import { useState } from "react";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Search, Heart, Package, TrendingUp, Users, Upload, Camera } from "lucide-react";
import { toast } from "sonner";
import { MarketplaceItemDetails } from "@/components/MarketplaceItemDetails";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedTimePosted, setSelectedTimePosted] = useState("any");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "household",
    contactPreference: "in_app"
  });

  // Mock data for demonstration
  const mockItems = [
    {
      id: 1,
      title: "Dining Table Set",
      description: "Beautiful wooden dining table with 6 chairs. Great condition, no longer needed after downsizing.",
      category: "Furniture",
      postedDate: "2 days ago",
      status: "Available",
      image: "/placeholder.svg",
      owner: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Children's Books Collection",
      description: "Over 50 picture books and early readers. Perfect for young families!",
      category: "Books",
      postedDate: "1 week ago",
      status: "Available",
      image: "/placeholder.svg",
      owner: "Michael Chen"
    },
    {
      id: 3,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker. All in working condition.",
      category: "Electronics",
      postedDate: "3 days ago",
      status: "Claimed",
      image: "/placeholder.svg",
      owner: "Emma Davis"
    }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostItem = () => {
    if (!newItem.title || !newItem.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Item posted successfully! It will be reviewed and published soon.");
    setIsPostModalOpen(false);
    setNewItem({
      title: "",
      description: "",
      category: "household",
      contactPreference: "in_app"
    });
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
  };

  const handleRequestItem = (itemTitle: string) => {
    toast.success(`You've requested "${itemTitle}". The owner will be notified.`);
    setIsItemDetailsOpen(false);
  };

  return (
    <CollapsibleSidebar>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
                <p className="text-muted-foreground mt-2">Share and discover items within your church community</p>
              </div>
              
              <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Post New Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Post New Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label>Item Photo</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                        <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Title *</Label>
                      <Input
                        id="title"
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                        placeholder="What are you giving away?"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                        placeholder="Describe the item's condition, size, and any other relevant details..."
                        rows={3}
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="household">Household</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="baby">Baby/Kids</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="garden">Garden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Contact Preference */}
                    <div className="space-y-2">
                      <Label>Contact Preference</Label>
                      <Select value={newItem.contactPreference} onValueChange={(value) => setNewItem({...newItem, contactPreference: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_app">In-app messaging</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handlePostItem} className="flex-1">Post Item</Button>
                      <Button variant="outline" onClick={() => setIsPostModalOpen(false)} className="flex-1">Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search & Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="household">Household</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="baby">Baby/Kids</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="garden">Garden</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Location</SelectItem>
                          <SelectItem value="nearby">Nearby</SelectItem>
                          <SelectItem value="same_neighborhood">Same Neighborhood</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedTimePosted} onValueChange={setSelectedTimePosted}>
                        <SelectTrigger>
                          <SelectValue placeholder="Anytime" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Anytime</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Results Counter */}
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Item Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => handleItemClick(item)}>
                    <CardContent className="p-0">
                      {/* Item Image */}
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.category}</span>
                          <span>{item.postedDate}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">by {item.owner}</span>
                          {item.status === "Available" && (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(item);
                              }}
                              className="flex items-center gap-1"
                            >
                              <Heart className="w-3 h-3" />
                              I Want This
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">No items found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters, or be the first to post an item!
                    </p>
                    <Button onClick={() => setIsPostModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post the First Item
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">234</p>
                      <p className="text-sm text-muted-foreground">Items Shared</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">156</p>
                      <p className="text-sm text-muted-foreground">Families Helped</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">89%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsPostModalOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Item
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    My Watchlist
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    My Posted Items
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safety Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Meet in public church spaces</li>
                    <li>• Verify item condition before pickup</li>
                    <li>• Communicate through our platform</li>
                    <li>• Report any concerning behavior</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      <MarketplaceItemDetails
        item={selectedItem}
        isOpen={isItemDetailsOpen}
        onClose={() => setIsItemDetailsOpen(false)}
        onRequestItem={handleRequestItem}
      />
    </CollapsibleSidebar>
  );
}