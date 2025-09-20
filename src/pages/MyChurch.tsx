import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserCheck, Bell, Gift, Plus, Eye, Edit3, Trash2, CheckCircle, Camera, Upload, MoreHorizontal, TrendingUp, Activity, HandHeart, Package, ArrowRight, Church, Music, Book, Coffee, Gamepad2, DollarSign, Briefcase, Baby, GraduationCap, Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";

export default function MyChurch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("serving");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventSearchQuery, setEventSearchQuery] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("all");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<"give" | "wish">("give");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [newItem, setNewItem] = useState({ title: "", description: "", category: "Household", contact: "message" });
  const [selectedItemImages, setSelectedItemImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { churchName: churchFromDB, memberName } = useMembership();
  const { events, loading: eventsLoading } = useEvents();

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

  // Event categories for filtering
  const eventCategories = [
    { id: "all", name: "All Events", icon: Calendar, color: "default" },
    { id: "service", name: "Service", icon: HandHeart, color: "destructive" },
    { id: "prayer", name: "Prayer", icon: Church, color: "secondary" },
    { id: "social", name: "Social", icon: Coffee, color: "outline" },
    { id: "fundraiser", name: "Fundraiser", icon: DollarSign, color: "default" },
    { id: "workshops", name: "Workshops", icon: GraduationCap, color: "secondary" },
    { id: "youth", name: "Youth", icon: Gamepad2, color: "outline" },
    { id: "children", name: "Children", icon: Baby, color: "default" },
    { id: "worship", name: "Worship", icon: Music, color: "secondary" },
    { id: "study", name: "Study", icon: Book, color: "outline" },
    { id: "leadership", name: "Leadership", icon: Briefcase, color: "default" }
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
      interested: 5,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
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
      interested: 8,
      images: ["/placeholder.svg", "/placeholder.svg"]
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
      interested: 12,
      images: ["/placeholder.svg"]
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

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = eventSearchQuery === "" || 
      event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(eventSearchQuery.toLowerCase());
    const matchesCategory = selectedEventCategory === "all" || event.category === selectedEventCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredEvents = events.filter(e => e.featured);

  const getTimeUntilEvent = (startDatetime: string) => {
    const now = new Date();
    const eventDate = new Date(startDatetime);
    const diffInHours = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours`;
    } else {
      const days = Math.ceil(diffInHours / 24);
      return `${days} days`;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = eventCategories.find(c => c.id === category);
    return cat?.icon || Calendar;
  };

  const getCategoryColor = (category: string) => {
    const cat = eventCategories.find(c => c.id === category);
    return cat?.color || "default";
  };

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
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'serving' 
                      ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <HandHeart className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'serving' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'serving' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>SERVING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="giving" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'giving' 
                      ? 'bg-gradient-to-br from-accent/40 to-accent/30' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <Gift className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'giving' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'giving' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>GIVING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="connecting" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'connecting' 
                      ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                      : 'bg-muted/20 group-hover:bg-muted/40'
                  }`}>
                    <Users className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'connecting' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'connecting' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>CONNECTING</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Unified Search Bar */}
            <div className="p-6 bg-gradient-to-br from-muted/20 to-muted/5 border-b border-border/10">
              <div className="flex flex-col gap-4 items-center max-w-4xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={
                      activeTab === 'serving' ? "Search needs by title or description..." :
                      activeTab === 'giving' ? "Search items by title or description..." :
                      "Search events by title or description..."
                    }
                    value={
                      activeTab === 'serving' ? searchQuery :
                      activeTab === 'giving' ? searchQuery :
                      eventSearchQuery
                    }
                    onChange={(e) => {
                      if (activeTab === 'serving') setSearchQuery(e.target.value);
                      else if (activeTab === 'giving') setSearchQuery(e.target.value);
                      else setEventSearchQuery(e.target.value);
                    }}
                    className="pl-10 pr-4 py-3 bg-background/80 border-border/30 focus:border-primary/50 rounded-xl transition-all duration-300"
                  />
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {activeTab === 'serving' && (
                    <>
                      {['All', 'Service', 'Prayer', 'Social', 'Fundraiser', 'Workshops', 'Sports', 'Youth'].map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category}
                        </Button>
                      ))}
                    </>
                  )}

                  {activeTab === 'giving' && (
                    <>
                      {['All', 'Furniture', 'Electronics', 'Baby/Kids', 'Household', 'Clothing', 'Sports', 'Youth'].map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category}
                        </Button>
                      ))}
                    </>
                  )}

                  {activeTab === 'connecting' && (
                    <>
                      {[
                        { id: "all", name: "All Events" },
                        { id: "service", name: "Service" },
                        { id: "prayer", name: "Prayer" },
                        { id: "social", name: "Social" },
                        { id: "fundraiser", name: "Fundraiser" },
                        { id: "workshops", name: "Workshops" },
                        { id: "sports", name: "Sports" },
                        { id: "youth", name: "Youth" }
                      ].map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedEventCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedEventCategory(category.id)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category.name}
                        </Button>
                      ))}
                    </>
                  )}
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
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
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
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
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


                {/* Item Grid - 3 rows x 4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {giveawayItems.concat(Array(9).fill(null).map((_, i) => ({
                    id: i + 10,
                    title: `Sample Item ${i + 1}`,
                    description: "Sample description for this marketplace item",
                    category: "Household",
                    status: "Available",
                    postedBy: "Community Member",
                    timePosted: "1 hour ago",
                    image: "/placeholder.svg",
                    interested: Math.floor(Math.random() * 10),
                    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
                  }))).slice(0, 12).map((item) => (
                    <Card key={item.id} className="border border-border hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center cursor-pointer group relative overflow-hidden"
                           onClick={() => setSelectedItemImages(item.images || ["/placeholder.svg"])}>
                        <Camera className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-sm line-clamp-1">{item.title}</h3>
                          <Badge variant={item.status === "Available" ? "default" : "secondary"} className="text-xs">
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Clock className="w-3 h-3" />
                          {item.timePosted}
                        </div>
                        {item.status === "Available" && (
                          <Button 
                            size="sm" 
                            className="w-full text-xs h-7"
                            onClick={() => handleWantItem(item.title)}
                          >
                            I Want This
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Wish List Section - Two Columns */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Community Wish List</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wishListItems.concat(Array(6).fill(null).map((_, i) => ({
                      id: i + 10,
                      title: `Looking for ${['Tools', 'Baby Items', 'Furniture', 'Electronics', 'Books', 'Clothes'][i]}`,
                      description: `In need of ${['tools for home repair', 'baby clothes and toys', 'living room furniture', 'kitchen appliances', 'children\'s books', 'winter clothing'][i]}. Any condition welcome!`,
                      category: ['Tools', 'Baby/Kids', 'Furniture', 'Electronics', 'Books', 'Clothing'][i],
                      postedBy: `Member ${i + 1}`,
                      timePosted: `${i + 1} hours ago`,
                      responses: Math.floor(Math.random() * 5)
                    }))).slice(0, 8).map((wish) => (
                      <Card key={wish.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground text-sm">{wish.title}</h4>
                            <Badge variant="outline" className="text-xs">{wish.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{wish.description}</p>
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
                            <Button size="sm" variant="outline" className="text-xs h-7">
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
              <div className="space-y-8">
                {/* Featured Events Section */}
                {featuredEvents.length > 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        Featured Events
                      </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredEvents.map((event) => {
                        const IconComponent = getCategoryIcon(event.category);
                        const progressPercentage = (event.volunteer_slots_filled / event.volunteer_slots_total) * 100;
                        
                        return (
                          <Card key={event.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-accent hover-lift group">
                            {event.banner_image_url && (
                              <div className="relative h-48 bg-gradient-primary">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 right-4">
                                  <Badge className="bg-yellow-500 text-black">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                  <div className="text-sm opacity-90">Starts in {getTimeUntilEvent(event.start_datetime)}</div>
                                </div>
                              </div>
                            )}
                            
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                  <IconComponent className="w-6 h-6 text-accent" />
                                </div>
                                <Badge variant={getCategoryColor(event.category) as any}>
                                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                </Badge>
                              </div>
                              
                              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                              
                              <div className="space-y-2 text-sm mb-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(event.start_datetime).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  {event.location_text}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Users className="w-4 h-4" />
                                  {event.attending_count} attending • {event.interested_count} interested
                                </div>
                              </div>

                              {/* Volunteer Progress */}
                              {event.volunteer_slots_total > 0 && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span>Volunteer Spots</span>
                                    <span>{event.volunteer_slots_filled}/{event.volunteer_slots_total}</span>
                                  </div>
                                  <Progress value={progressPercentage} className="h-2" />
                                </div>
                              )}

                              <Link to={`/events/${event.id}`}>
                                <Button className="w-full group">
                                  View Details
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </section>
                )}


                {/* Events Grid */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {selectedEventCategory === "all" ? "All Events" : eventCategories.find(c => c.id === selectedEventCategory)?.name}
                      <span className="text-muted-foreground ml-2">({filteredEvents.length})</span>
                    </h2>
                  </div>

                  {eventsLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="border-0 shadow-card">
                          <CardContent className="p-6">
                            <div className="space-y-4 animate-pulse">
                              <div className="w-12 h-12 bg-muted rounded-xl"></div>
                              <div className="h-4 bg-muted rounded w-3/4"></div>
                              <div className="h-3 bg-muted rounded w-full"></div>
                              <div className="h-3 bg-muted rounded w-1/2"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : filteredEvents.length === 0 ? (
                    <Card className="border-0 shadow-card">
                      <CardContent className="p-12 text-center">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No events found</h3>
                        <p className="text-muted-foreground mb-4">
                          {eventSearchQuery || selectedEventCategory !== "all" 
                            ? "Try adjusting your search or filter criteria." 
                            : "There are no events scheduled at the moment."}
                        </p>
                        {(eventSearchQuery || selectedEventCategory !== "all") && (
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setEventSearchQuery("");
                              setSelectedEventCategory("all");
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEvents.map((event) => {
                        const IconComponent = getCategoryIcon(event.category);
                        const progressPercentage = event.volunteer_slots_total > 0 
                          ? (event.volunteer_slots_filled / event.volunteer_slots_total) * 100 
                          : 0;
                        
                        return (
                          <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift group">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                  <IconComponent className="w-6 h-6 text-accent" />
                                </div>
                                <Badge variant={getCategoryColor(event.category) as any}>
                                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                </Badge>
                              </div>
                              
                              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                              
                              <div className="space-y-2 text-sm mb-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(event.start_datetime).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  {event.location_text}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Users className="w-4 h-4" />
                                  {event.attending_count} attending
                                </div>
                              </div>

                              {/* Volunteer Progress */}
                              {event.volunteer_slots_total > 0 && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span>Volunteers</span>
                                    <span>{event.volunteer_slots_filled}/{event.volunteer_slots_total}</span>
                                  </div>
                                  <Progress value={progressPercentage} className="h-2" />
                                  {progressPercentage < 100 && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {event.volunteer_slots_total - event.volunteer_slots_filled} more needed
                                    </p>
                                  )}
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Link to={`/events/${event.id}`} className="flex-1">
                                  <Button className="w-full group">
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Image Overlay Modal */}
      {selectedItemImages.length > 0 && (
        <Dialog open={selectedItemImages.length > 0} onOpenChange={() => setSelectedItemImages([])}>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="relative">
              <button
                onClick={() => setSelectedItemImages([])}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedItemImages[currentImageIndex]}
                  alt="Item preview"
                  className="w-full h-full object-cover"
                />
                
                {selectedItemImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedItemImages.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < selectedItemImages.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedItemImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}