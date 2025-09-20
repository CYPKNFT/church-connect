import React, { useState, useEffect } from "react";
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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserCheck, Bell, Gift, Plus, Eye, Edit3, Trash2, CheckCircle, Camera, Upload, MoreHorizontal, TrendingUp, Activity, HandHeart, Package } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
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
    { icon: UserCheck, label: "Needs Served", value: 7 },
    { icon: Package, label: "Items Needed", value: 8 },
    { icon: Gift, label: "Items Given", value: 12 },
    { icon: Calendar, label: "Upcoming Events", value: 2 },
    { icon: Users, label: "Church Members", value: 156 }
  ];
  
  // Enhanced mock data with more realistic and compelling needs
  const allChurchNeeds = [
    {
      id: "1",
      title: "Weekly grocery assistance for elderly neighbor",
      description: "Mrs. Johnson, 85, has been a faithful church member for 40 years. After a recent fall, she's having difficulty getting to the grocery store. She needs someone to help with weekly shopping - just basic essentials like milk, bread, and fresh produce. She's very organized with her list and always has her payment ready. This is a wonderful opportunity to bless someone who has served our church family for decades.",
      category: "Groceries",
      urgency: "This Week" as const,
      location: "Downtown area, 2 miles from church",
      estimatedTime: "1-2 hours",
      postedBy: "Sarah Miller",
      postedAt: "2 hours ago",
      icon: ShoppingCart,
      responses: 3
    },
    {
      id: "2", 
      title: "Emergency plumbing repair for single mom",
      description: "Jennifer is a single mother of two young children, working two jobs to make ends meet. Her kitchen faucet is leaking badly and has started causing water damage to the cabinet below. She can't afford a professional plumber right now and is worried about the damage getting worse. Any handyman skills would be incredibly appreciated - this is urgent to prevent further damage to her home.",
      category: "Home Repair",
      urgency: "Immediate" as const,
      location: "Maple Street neighborhood",
      estimatedTime: "1-2 hours",
      postedBy: "Jennifer Davis",
      postedAt: "1 day ago",
      icon: Wrench,
      responses: 1
    },
    {
      id: "3",
      title: "Meal train coordination for new baby blessing",
      description: "The Johnson family just welcomed their third child - a beautiful baby girl! Mom had a C-section and dad is trying to balance work with helping at home. We're organizing a meal train to provide dinners for the next two weeks. Looking for volunteers to prepare and deliver meals (any day between 5-7 PM works). This is such a special time to show God's love through practical care.",
      category: "Meals",
      urgency: "This Week" as const,
      location: "Oakwood subdivision", 
      estimatedTime: "30 minutes delivery",
      postedBy: "Linda Chen",
      postedAt: "1 day ago",
      icon: ChefHat,
      responses: 8
    },
    {
      id: "4",
      title: "Transportation to critical medical appointment",
      description: "Robert needs a ride to his oncologist appointment next Tuesday at 2 PM for cancer treatment follow-up. His car broke down and this appointment is crucial for his ongoing treatment plan. The medical center is about 20 minutes away, and the appointment usually takes about an hour. Robert is a Vietnam veteran and longtime church member who would be so grateful for this help during a difficult time.",
      category: "Transportation",
      urgency: "This Week" as const,
      location: "Pick up from Elm Street",
      estimatedTime: "2-3 hours total",
      postedBy: "Robert Thompson",
      postedAt: "4 hours ago",
      icon: Car,
      responses: 1
    },
    {
      id: "5",
      title: "Yard cleanup after storm damage",
      description: "The recent storms knocked down several large branches in our elderly neighbor's yard. Mr. Peterson, 78, can't handle the cleanup himself and is worried about the branches blocking his driveway. Looking for a few people with trucks to help haul away the debris. He has all the tools needed - just need strong backs and willing hearts! Great opportunity for youth group or men's ministry.",
      category: "Home & Garden",
      urgency: "Flexible" as const,
      location: "Pine Ridge community",
      estimatedTime: "2-3 hours",
      postedBy: "Mike Williams",
      postedAt: "4 days ago",
      icon: Wrench,
      responses: 5
    },
    {
      id: "6",
      title: "Childcare for medical appointments",
      description: "Amanda needs someone to watch her 3-year-old son while she attends physical therapy appointments twice a week (Tuesdays and Thursdays, 10 AM - 12 PM). She's recovering from a car accident and these appointments are essential for her recovery. Her son is well-behaved and loves to read books and play with toys. This ongoing help would mean the world to a young mom working hard to get back on her feet.",
      category: "Childcare",
      urgency: "This Week" as const,
      location: "Westside neighborhood",
      estimatedTime: "2 hours, twice weekly",
      postedBy: "Amanda Rodriguez",
      postedAt: "5 days ago",
      icon: Heart,
      responses: 3
    },
    {
      id: "7",
      title: "Computer help for elderly member",
      description: "Mr. Williams needs help setting up video calls to connect with his grandchildren who live far away. He recently got a tablet but is struggling with the technology. Looking for someone patient who can teach him the basics of video calling and help him stay connected with his family.",
      category: "Technology",
      urgency: "Flexible" as const,
      location: "Senior Living Community",
      estimatedTime: "1-2 hours",
      postedBy: "Pastor Mike",
      postedAt: "3 days ago",
      icon: MessageSquare,
      responses: 2
    },
    {
      id: "8",
      title: "Moving assistance for young family",
      description: "The Rodriguez family is moving to a new apartment this weekend and could use some extra hands. They have most items packed but need help loading and unloading the truck. Great opportunity for our men's ministry to show love in action!",
      category: "Moving",
      urgency: "This Week" as const,
      location: "Cross town move",
      estimatedTime: "4-5 hours",
      postedBy: "Carlos Rodriguez",
      postedAt: "2 days ago",
      icon: Car,
      responses: 7
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

  const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Childcare", "Home & Garden", "Technology", "Moving", "Prayer Support"];
  const itemCategories = ["Household", "Electronics", "Books", "Clothing", "Baby/Kids", "Furniture", "Garden"];
  
  // Filter needs based on search and category
  const filteredNeeds = allChurchNeeds.filter(need => {
    const matchesSearch = searchQuery === "" || 
      need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || need.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredNeeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNeeds = filteredNeeds.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleVolunteer = (needId: string) => {
    toast.success("Thanks for volunteering to help! We'll connect you with the need organizer.");
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

      {/* Three-Tab Navigation - Separate Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-20 rounded-none border-b border-border/5 p-2">
              <TabsTrigger 
                value="serving" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 data-[state=active]:from-primary/40 data-[state=active]:to-primary/30 transition-all duration-300">
                    <HandHeart className={`w-5 h-5 transition-colors duration-300 ${activeTab === 'serving' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground data-[state=active]:text-primary transition-colors duration-300">SERVING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="giving" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 data-[state=active]:from-accent/40 data-[state=active]:to-accent/30 transition-all duration-300">
                    <Gift className={`w-5 h-5 transition-colors duration-300 ${activeTab === 'giving' ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground data-[state=active]:text-accent transition-colors duration-300">GIVING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="connecting" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-muted/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-secondary/20 data-[state=active]:from-secondary/40 data-[state=active]:to-secondary/30 transition-all duration-300">
                    <Users className={`w-5 h-5 transition-colors duration-300 ${activeTab === 'connecting' ? 'text-secondary' : 'text-muted-foreground'}`} />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground data-[state=active]:text-secondary transition-colors duration-300">CONNECTING</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Search Section - Inside Tabs but Separated */}
            <div className="p-8 bg-gradient-to-br from-muted/30 to-muted/10 border-b border-border/10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-hover:text-primary transition-colors duration-200" />
                      <Input
                        placeholder={activeTab === "serving" ? "Search church needs..." : activeTab === "giving" ? "Search items..." : "Search events..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 hover:border-border transition-all duration-200 text-base shadow-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-64">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-14 rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 hover:border-border transition-all duration-200 text-base shadow-lg">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/50 shadow-2xl backdrop-blur-xl">
                      {(activeTab === "serving" ? categories : itemCategories).map(category => (
                        <SelectItem key={category} value={category} className="rounded-lg">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area - Separate Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-background rounded-2xl shadow-lg border border-border p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* SERVING TAB */}
            <TabsContent value="serving" className="mt-0">
              {/* Enhanced Church Family Needs Section */}
              <div className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Community Needs ({filteredNeeds.length} opportunities)</h2>
                    <p className="text-muted-foreground text-lg">Help make a difference in your church family</p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
                    <Plus className="w-5 h-5 mr-2" />
                    Post New Need
                  </Button>
                </div>
                
                {/* Needs Grid */}
                {currentNeeds.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentNeeds.map((need) => (
                        <NeedCard
                          key={need.id}
                          id={need.id}
                          title={need.title}
                          description={need.description}
                          category={need.category}
                          urgency={need.urgency}
                          location={need.location}
                          estimatedTime={need.estimatedTime}
                          postedBy={need.postedBy}
                          postedAt={need.postedAt}
                          onVolunteer={handleVolunteer}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            <PaginationItem>
                              <PaginationNext 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-muted/20 rounded-xl">
                    <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No needs match your search
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or clearing the filters to discover more ways to serve.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                        setCurrentPage(1);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* GIVING TAB */}
            <TabsContent value="giving" className="mt-0">
              <div className="space-y-8">
                {/* Header with Post Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Item Marketplace</h2>
                    <p className="text-muted-foreground text-lg">Share and discover items within your church community</p>
                  </div>
                  <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                    <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
                    <Plus className="w-5 h-5 mr-2" />
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
            <TabsContent value="connecting" className="mt-0">
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
        </div>
      </div>
    </div>
  );
}