import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserCheck, Bell, Gift, Plus, Eye, Edit3, Trash2, CheckCircle, Camera, Upload, MoreHorizontal, TrendingUp, Activity } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";
import { toast } from "sonner";

export default function MyChurch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("serving");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<"give" | "wish">("give");
  const [newItem, setNewItem] = useState({ title: "", description: "", category: "Household", contact: "message" });
  const { churchName: churchFromDB, memberName } = useMembership();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Church-specific data - fetched from database via hook
  const churchName = churchFromDB ?? "Test Church";
  const memberSince = "2022";

  // Stats data
  const stats = [
    { icon: Heart, label: "Active Needs", value: 3 },
    { icon: UserCheck, label: "Times Helped", value: 7 },
    { icon: Gift, label: "Giveaways", value: 12 },
    { icon: Star, label: "Active Wishes", value: 8 },
    { icon: Calendar, label: "Upcoming Events", value: 2 },
    { icon: Users, label: "Church Members", value: 156 }
  ];
  
  const churchNeeds = [
    {
      id: 1,
      title: "Elder Care - Mrs. Johnson needs grocery help",
      description: "Our beloved church elder Mrs. Johnson (85) needs weekly grocery assistance after her recent fall. She's been a faithful member for 40 years.",
      category: "Groceries",
      location: "Downtown Area",
      urgency: "This Week",
      timePosted: "2 hours ago",
      icon: ShoppingCart,
      postedBy: "Sarah Miller",
      responses: 3
    },
    {
      id: 2,
      title: "Youth Leader needs transportation",
      description: "Brother Robert needs a ride to his cancer treatment appointment. His car is in the shop and this is critical for his recovery.",
      category: "Transportation",
      location: "Medical Center",
      urgency: "Immediate",
      timePosted: "4 hours ago",
      icon: Car,
      postedBy: "Robert Thompson",
      responses: 1
    },
    {
      id: 3,
      title: "New Baby Blessing - Meal Train",
      description: "The Johnson family just welcomed baby Grace! Let's organize meals for the next two weeks to support this growing family.",
      category: "Meals",
      location: "Oakwood Subdivision",
      urgency: "This Week",
      timePosted: "1 day ago",
      icon: ChefHat,
      postedBy: "Linda Chen",
      responses: 8
    }
  ];

  const giveawayItems = [
    {
      id: 1,
      title: "Dining Table Set",
      description: "Beautiful oak dining table with 6 chairs. Great condition, just downsizing!",
      category: "Furniture",
      status: "Available",
      postedBy: "John Smith",
      timePosted: "3 hours ago",
      image: "/placeholder.svg",
      interested: 5
    },
    {
      id: 2,
      title: "Baby Clothes Bundle",
      description: "Gently used baby clothes, sizes newborn to 12 months. Includes onesies, sleepers, and outfits.",
      category: "Baby/Kids",
      status: "Available",
      postedBy: "Maria Garcia",
      timePosted: "1 day ago",
      image: "/placeholder.svg",
      interested: 8
    },
    {
      id: 3,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker. All working perfectly, just bought new ones.",
      category: "Household",
      status: "Claimed",
      postedBy: "David Lee",
      timePosted: "2 days ago",
      image: "/placeholder.svg",
      interested: 12
    }
  ];

  const wishListItems = [
    {
      id: 1,
      title: "Looking for a bicycle for my daughter",
      description: "Seeking a kids' bike for my 8-year-old daughter. Any condition welcome!",
      category: "Recreation",
      postedBy: "Sarah Johnson",
      timePosted: "5 hours ago",
      responses: 2
    },
    {
      id: 2,
      title: "Need a car seat",
      description: "New baby on the way! Looking for an infant car seat in good condition.",
      category: "Baby/Kids",
      postedBy: "Mike Brown",
      timePosted: "1 day ago",
      responses: 4
    }
  ];

  const churchEvents = [
    {
      id: 1,
      title: "Community Service Day",
      description: "Join our church family as we serve at the local food bank and clean up the community park.",
      date: "March 25, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Community Center",
      attendees: 23,
      category: "Service"
    },
    {
      id: 2,
      title: "Prayer & Fasting",
      description: "Special prayer meeting for our church members in need. Let's come together in spiritual support.",
      date: "March 28, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Church Sanctuary",
      attendees: 45,
      category: "Prayer"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "helped with",
      need: "Grocery shopping for Mrs. Peterson",
      time: "2 days ago",
      member: "Mike Johnson"
    },
    {
      id: 2,
      action: "completed",
      need: "Home repair for the Williams family",
      time: "1 week ago",
      member: "David Martinez"
    },
    {
      id: 3,
      action: "organized",
      need: "Meal train for new parents",
      time: "1 week ago",
      member: "Sarah Miller"
    }
  ];

  const categories = ["All", "Groceries", "Transportation", "Home Repair", "Meals", "Childcare", "Prayer Support"];
  const itemCategories = ["Household", "Electronics", "Books", "Clothing", "Baby/Kids", "Furniture", "Garden"];
  
  const filteredNeeds = churchNeeds.filter(need => {
    const matchesSearch = searchQuery === "" || 
      need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || need.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "destructive";
      case "This Week": return "default";
      case "Flexible": return "secondary";
      default: return "default";
    }
  };

  const handlePostItem = () => {
    toast.success(`${postType === "give" ? "Item" : "Wish"} posted successfully!`);
    setIsPostModalOpen(false);
    setNewItem({ title: "", description: "", category: "Household", contact: "message" });
  };

  const handleWantItem = (itemTitle: string) => {
    toast.success(`Interest expressed in "${itemTitle}"!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #8b4513 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(45,27,105,0.9) 0%, rgba(139,69,19,0.9) 100%)' }} />
        <div className="relative">
          <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              <span>My Church Community</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {churchName}
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Member since {memberSince} • Connected to serve and support our church family
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{stat.value}</h3>
                    <p className="text-white/80 text-xs">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Three-Tab Navigation */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-card backdrop-blur-sm rounded-2xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 h-14 rounded-none">
              <TabsTrigger 
                value="serving" 
                className="text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground h-full"
              >
                SERVING
              </TabsTrigger>
              <TabsTrigger 
                value="giving" 
                className="text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground h-full"
              >
                GIVING
              </TabsTrigger>
              <TabsTrigger 
                value="connecting" 
                className="text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground h-full"
              >
                CONNECTING
              </TabsTrigger>
            </TabsList>

            {/* SERVING TAB */}
            <TabsContent value="serving" className="p-6 mt-0">
              {/* Search Section */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search church needs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 rounded-lg"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48 h-10 rounded-lg">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Church Family Needs */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Church Family Needs</h2>
                  <Badge variant="secondary" className="text-sm">{filteredNeeds.length} Active</Badge>
                </div>
                
                <div className="grid gap-4">
                  {filteredNeeds.map((need) => {
                    const IconComponent = need.icon;
                    return (
                      <Card key={need.id} className="border border-border hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0 pr-3">
                                  <h3 className="text-lg font-semibold text-foreground mb-1">{need.title}</h3>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{need.description}</p>
                                </div>
                                <Badge variant={getUrgencyColor(need.urgency) as any} className="flex-shrink-0">
                                  {need.urgency}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {need.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {need.timePosted}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {need.postedBy}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {need.responses} responses
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                                  <Heart className="w-3 h-3 mr-1" />
                                  Offer Help
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* GIVING TAB */}
            <TabsContent value="giving" className="p-6 mt-0">
              <div className="space-y-8">
                {/* Header with Post Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Item Marketplace</h2>
                    <p className="text-muted-foreground">Share and discover items within your church community</p>
                  </div>
                  <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {postType === "give" ? "Give Away Item" : "Add to Wish List"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button 
                            variant={postType === "give" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("give")}
                            className="flex-1"
                          >
                            Give Away
                          </Button>
                          <Button 
                            variant={postType === "wish" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("wish")}
                            className="flex-1"
                          >
                            Add Wish
                          </Button>
                        </div>
                        
                        {postType === "give" && (
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Drop photos here or click to upload
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            placeholder="What are you sharing?"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            placeholder="Provide details about the item..."
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {itemCategories.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          <Button onClick={handlePostItem} className="flex-1">
                            Post {postType === "give" ? "Item" : "Wish"}
                          </Button>
                          <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search items..."
                        className="pl-10 h-10 rounded-lg"
                      />
                    </div>
                  </div>
                  <Select defaultValue="All Categories">
                    <SelectTrigger className="w-full md:w-48 h-10 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">All Categories</SelectItem>
                      {itemCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Item Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {giveawayItems.map((item) => (
                    <Card key={item.id} className="border border-border hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Clock className="w-3 h-3" />
                          {item.timePosted}
                          <span>•</span>
                          <Users className="w-3 h-3" />
                          {item.postedBy}
                        </div>
                        {item.status === "Available" && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleWantItem(item.title)}
                          >
                            I Want This
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Wish List Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Community Wish List</h3>
                  <div className="grid gap-4">
                    {wishListItems.map((wish) => (
                      <Card key={wish.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{wish.title}</h4>
                            <Badge variant="outline">{wish.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{wish.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {wish.postedBy}
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              {wish.timePosted}
                              <span>•</span>
                              <MessageSquare className="w-3 h-3" />
                              {wish.responses} responses
                            </div>
                            <Button size="sm" variant="outline">
                              I Have This
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* CONNECTING TAB */}
            <TabsContent value="connecting" className="p-6 mt-0">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Church Events */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Church Events</h2>
                  <div className="space-y-4">
                    {churchEvents.map((event) => (
                      <Card key={event.id} className="border border-border hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-3">{event.category}</Badge>
                          <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                          <div className="space-y-2 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3" />
                              {event.attendees} attending
                            </div>
                          </div>
                          <Button size="sm" className="w-full">
                            Join Event
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Community Activities */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <Card key={activity.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Activity className="w-4 h-4 text-accent" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-foreground">
                                <span className="font-semibold">{activity.member}</span> {activity.action}{" "}
                                <span className="text-muted-foreground">{activity.need}</span>
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}