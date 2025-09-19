import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, Plus, Heart, MapPin, Clock, User, Camera, X } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";
import { toast } from "sonner";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  imageUrl?: string;
  postedBy: string;
  postedAt: string;
  status: 'available' | 'claimed' | 'given';
  location: string;
}

// Mock data for demonstration
const mockItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "Children's Bike - Red 16 inch",
    description: "Gently used children's bike, perfect for ages 4-7. Has training wheels and a basket.",
    category: "Kids & Baby",
    condition: "Good",
    imageUrl: "/placeholder.svg",
    postedBy: "Sarah Johnson",
    postedAt: "2 days ago",
    status: "available",
    location: "Downtown Campus"
  },
  {
    id: "2", 
    title: "Dining Table Set",
    description: "Solid wood dining table with 4 chairs. Some wear but very sturdy.",
    category: "Furniture",
    condition: "Fair",
    postedBy: "Mike Chen",
    postedAt: "1 week ago", 
    status: "available",
    location: "North Campus"
  },
  {
    id: "3",
    title: "Winter Coats - Various Sizes",
    description: "Collection of winter coats for men, women and children. All clean and in good condition.",
    category: "Clothing",
    condition: "Good",
    postedBy: "Grace Community Closet",
    postedAt: "3 days ago",
    status: "available", 
    location: "Main Campus"
  }
];

export default function Marketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const { displayName } = useMembership();

  const categories = [
    "All Categories",
    "Furniture", 
    "Electronics",
    "Clothing",
    "Kids & Baby",
    "Books & Media",
    "Kitchen & Dining",
    "Home & Garden",
    "Sports & Recreation",
    "Other"
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || selectedCategory === "All Categories" || 
                           item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleItemClaim = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status: 'claimed' as const }
        : item
    ));
    toast.success("Interest sent! The owner will be notified.");
  };

  const PostItemModal = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      condition: "",
      location: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newItem: MarketplaceItem = {
        id: Date.now().toString(),
        ...formData,
        postedBy: displayName || "Anonymous",
        postedAt: "Just now",
        status: "available"
      };

      setItems(prev => [newItem, ...prev]);
      setIsPostModalOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        condition: "",
        location: ""
      });
      toast.success("Item posted successfully!");
    };

    return (
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background border border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-foreground">Post New Item</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Zone */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop photos here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Maximum 5MB per image</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What are you sharing?"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the item, its condition, and any details..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-foreground">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition" className="text-sm font-medium text-foreground">
                    Condition
                  </Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Item condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium text-foreground">
                  Pickup Location
                </Label>
                <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Where can people pick this up?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Campus">Main Campus</SelectItem>
                    <SelectItem value="Downtown Campus">Downtown Campus</SelectItem>
                    <SelectItem value="North Campus">North Campus</SelectItem>
                    <SelectItem value="Community Center">Community Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsPostModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary-hover text-white"
              >
                Post Item
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const ItemCard = ({ item }: { item: MarketplaceItem }) => (
    <Card className="shadow-gentle hover:shadow-card transition-all duration-200 border-border h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {item.status !== 'available' && (
            <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
              <Badge variant="secondary" className="bg-white/90 text-black">
                {item.status === 'claimed' ? 'Claimed' : 'Given Away'}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Badge variant="outline" className="text-xs mb-2">
              {item.category}
            </Badge>
            <Badge variant="secondary" className="text-xs mb-2 ml-2">
              {item.condition}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{item.postedAt}</span>
        </div>
        
        <CardTitle className="text-lg leading-tight line-clamp-2 mb-2">
          {item.title}
        </CardTitle>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {item.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Posted by {item.postedBy}</span>
          </div>
        </div>
        
        <Button 
          variant={item.status === 'available' ? 'hero' : 'outline'}
          size="sm" 
          className="w-full"
          onClick={() => item.status === 'available' && handleItemClaim(item.id)}
          disabled={item.status !== 'available'}
        >
          {item.status === 'available' ? 'I Want This' : 
           item.status === 'claimed' ? 'Already Claimed' : 'Given Away'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <nav className="text-sm text-muted-foreground mb-2">
                Giving &gt; Marketplace
              </nav>
              <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
              <p className="text-muted-foreground mt-2">
                Welcome, {displayName || 'Friend'}! Share and discover items within our church community.
              </p>
            </div>
            
            <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary-hover text-white shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Item
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse">Browse Items</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            <TabsTrigger value="my-interests">My Interests</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4 items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category === "All Categories" ? "all" : category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              Showing {filteredItems.length} items
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-listings" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">You haven't posted any items yet</h3>
              <p className="text-muted-foreground mb-4">Post your first item to start sharing with the community!</p>
              <Button onClick={() => setIsPostModalOpen(true)} className="bg-primary hover:bg-primary-hover text-white">
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Item
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="my-interests" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No items of interest yet</h3>
              <p className="text-muted-foreground">Browse items and click "I Want This" to track your interests</p>
            </div>
          </TabsContent>
        </Tabs>

        <PostItemModal />
      </div>
    </div>
  );
}