import { useState, useEffect, ReactNode } from "react";
import { Search, Package, Heart, Filter, ChevronDown, ChevronUp, Plus, User, Star, MessageCircle, Image as ImageIcon, Calendar, MapPin, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/contexts/AuthContext";
import { useMembership } from "@/hooks/useMembership";

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  status: "Available" | "Claimed" | "Given Away";
  imageUrl?: string;
  postedAt: Date;
  postedBy: string;
  viewCount: number;
  interestedUsers: string[];
}

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  storageKey: string;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false, storageKey }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem(`marketplace-${storageKey}`);
    return saved ? JSON.parse(saved) : defaultOpen;
  });

  useEffect(() => {
    localStorage.setItem(`marketplace-${storageKey}`, JSON.stringify(isOpen));
  }, [isOpen, storageKey]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between h-auto p-6 text-left hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <div className="text-primary">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="transition-all duration-300 ease-in-out">
        <div className="px-6 pb-6">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function PostItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    contactPreference: "phone"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsOpen(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      condition: "",
      contactPreference: "phone"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Post New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Post a New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop an image, or click to browse
            </p>
            <Button type="button" variant="outline" className="mt-2">
              Choose File
            </Button>
          </div>
          
          <div>
            <Label htmlFor="title">Title*</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What are you sharing?"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the item, condition, pickup details..."
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="household">Household Items</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor (still usable)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Post Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ItemCard({ item }: { item: Item }) {
  const statusColors = {
    "Available": "bg-success text-success-foreground",
    "Claimed": "bg-warning text-warning-foreground",
    "Given Away": "bg-muted text-muted-foreground"
  };

  return (
    <Card className="hover-lift overflow-hidden">
      <div className="relative aspect-[4/3] bg-muted">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className={`absolute top-2 right-2 ${statusColors[item.status]}`}>
          {item.status}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Posted {item.postedAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{item.viewCount} views</span>
          </div>
        </div>
        
        <Button className="w-full" variant="secondary">
          I Want This
        </Button>
      </div>
    </Card>
  );
}

function UserStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-primary">12</div>
        <div className="text-sm text-muted-foreground">Items Posted</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-success">8</div>
        <div className="text-sm text-muted-foreground">Items Given</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-accent">5</div>
        <div className="text-sm text-muted-foreground">Items Received</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-warning">4.8</div>
        <div className="text-sm text-muted-foreground">Community Rating</div>
      </Card>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Your Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Community Helper</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sharing Champion</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Community Builder</span>
              <span>40%</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Post New Item
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Search className="mr-2 h-4 w-4" />
            Browse Items
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageCircle className="mr-2 h-4 w-4" />
            View Messages
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Community Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Items shared this month</span>
            <span className="font-medium">247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Active members</span>
            <span className="font-medium">89</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Items available now</span>
            <span className="font-medium">32</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Marketplace() {
  const { user } = useAuth();
  const { displayName } = useMembership();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  // Mock data
  const mockItems: Item[] = [
    {
      id: "1",
      title: "Gently Used Sofa - Perfect for Small Living Room",
      description: "Beautiful blue sofa in excellent condition. Pet-free, smoke-free home. Perfect for a small living room or apartment.",
      category: "furniture",
      condition: "excellent",
      status: "Available",
      imageUrl: undefined,
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      postedBy: "Sarah Johnson",
      viewCount: 24,
      interestedUsers: []
    },
    {
      id: "2",
      title: "Children's Books Collection (Ages 5-10)",
      description: "A wonderful collection of 25 children's books. Great for bedtime stories and early readers.",
      category: "books",
      condition: "good",
      status: "Available",
      imageUrl: undefined,
      postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      postedBy: "Michael Chen",
      viewCount: 18,
      interestedUsers: []
    },
    {
      id: "3",
      title: "Kitchen Appliance Set",
      description: "Blender, toaster, and coffee maker. All working perfectly, just upgraded to newer models.",
      category: "household",
      condition: "good",
      status: "Claimed",
      imageUrl: undefined,
      postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      postedBy: "Lisa Williams",
      viewCount: 31,
      interestedUsers: []
    }
  ];

  const myListings = mockItems.filter(item => item.postedBy === displayName);
  const myInterests = mockItems.filter(item => item.id === "2" || item.id === "3");

  if (activeTab === "dashboard") {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span>Giving</span>
            <span className="mx-2">›</span>
            <span>Marketplace</span>
            <span className="mx-2">›</span>
            <span>Dashboard</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Marketplace Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {displayName}! Here's your marketplace activity
              </p>
            </div>
            <PostItemModal />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <UserStats />
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            {/* My Marketplace Activity */}
            <Card>
              <CollapsibleSection
                title="My Marketplace Activity"
                icon={<Package className="h-5 w-5" />}
                storageKey="activity"
                defaultOpen={false}
              >
                <div className="space-y-4">
                  {myListings.length > 0 ? (
                    myListings.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{item.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge className={
                              item.status === "Available" ? "bg-success text-success-foreground" :
                              item.status === "Claimed" ? "bg-warning text-warning-foreground" :
                              "bg-muted text-muted-foreground"
                            }>
                              {item.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{item.viewCount} views</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Mark as Given</Button>
                          <Button size="sm" variant="outline">View Interest</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">You haven't posted any items yet.</p>
                      <Button className="mt-4">Post your first item!</Button>
                    </div>
                  )}
                  {myListings.length > 0 && (
                    <Button variant="outline" className="w-full">
                      View All My Listings →
                    </Button>
                  )}
                </div>
              </CollapsibleSection>
            </Card>

            {/* Items I'm Interested In */}
            <Card>
              <CollapsibleSection
                title="Items I'm Interested In"
                icon={<Heart className="h-5 w-5" />}
                storageKey="interests"
                defaultOpen={false}
              >
                <div className="space-y-4">
                  {myInterests.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{item.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">by {item.postedBy}</span>
                          <Badge variant="outline">Interest Sent</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message Owner
                        </Button>
                        <Button size="sm" variant="outline">Remove Interest</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All My Interests →
                  </Button>
                </div>
              </CollapsibleSection>
            </Card>
          </div>

          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <span>Giving</span>
          <span className="mx-2">›</span>
          <span>Marketplace</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
            <p className="text-muted-foreground">
              Welcome, {displayName}! Share and discover items within your church community.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={activeTab === "browse" ? "default" : "outline"}
              onClick={() => setActiveTab("browse")}
            >
              Browse Items
            </Button>
            <Button 
              variant={activeTab === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveTab("dashboard")}
            >
              My Dashboard
            </Button>
            <PostItemModal />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="household">Household Items</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Distance</SelectItem>
                  <SelectItem value="1">Within 1 mile</SelectItem>
                  <SelectItem value="5">Within 5 miles</SelectItem>
                  <SelectItem value="10">Within 10 miles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Date posted" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                </SelectContent>
              </Select>

              {(selectedCategory || selectedDistance || selectedDate) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedDistance("");
                    setSelectedDate("");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {mockItems.length} items
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}