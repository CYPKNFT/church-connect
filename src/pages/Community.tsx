import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserPlus, Sparkles, TrendingUp, Award, Eye } from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("needs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4 rows × 3 columns

  const communityNeeds = [
    {
      id: 12,
      title: "Meal Delivery for Seniors",
      description: "Help deliver hot meals to seniors in our community every Friday afternoon.",
      category: "Meals",
      location: "Senior Center",
      urgency: "Weekly",
      timePosted: "2 weeks ago",
      icon: ChefHat,
      church: "Grace Community",
      responses: 6,
      featured: false
    },
    {
      id: 1,
      title: "Grocery Shopping for Mrs. Johnson",
      description: "Weekly grocery assistance needed for our beloved 85-year-old church elder who is recovering from surgery. She's been a faithful member for 40 years.",
      category: "Groceries",
      location: "Downtown Area",
      urgency: "This Week",
      timePosted: "2 hours ago",
      icon: ShoppingCart,
      church: "Grace Community",
      responses: 3,
      featured: true
    },
    {
      id: 2,
      title: "Transportation to Medical Center",
      description: "Brother Robert needs reliable transportation to his cancer treatment appointments. His vehicle is being repaired and these sessions are critical.",
      category: "Transportation",
      location: "Medical District",
      urgency: "Immediate",
      timePosted: "4 hours ago",
      icon: Car,
      church: "First Baptist",
      responses: 1,
      featured: false
    },
    {
      id: 3,
      title: "Home Repair Emergency",
      description: "Single mother Jennifer needs help with a leaky faucet that's causing water damage. Looking for someone with plumbing skills to prevent further issues.",
      category: "Home Repair",
      location: "Westside",
      urgency: "Immediate",
      timePosted: "6 hours ago",
      icon: Wrench,
      church: "Community Fellowship",
      responses: 0,
      featured: false
    },
    {
      id: 4,
      title: "Meal Train for New Parents",
      description: "The Johnson family welcomed baby Grace! Let's organize a meal train to support them during this beautiful but exhausting time.",
      category: "Meals",
      location: "Oakwood Suburb",
      urgency: "This Week",
      timePosted: "1 day ago",
      icon: ChefHat,
      church: "Riverside Church",
      responses: 8,
      featured: true
    },
    {
      id: 5,
      title: "Yard Cleanup After Storm",
      description: "Mr. Peterson's yard was hit hard by recent storms. Large branches are blocking his driveway and he needs help clearing the debris.",
      category: "Home & Garden",
      location: "Pine Ridge",
      urgency: "Flexible",
      timePosted: "2 days ago",
      icon: Wrench,
      church: "Hillside Baptist",
      responses: 2,
      featured: false
    },
    {
      id: 6,
      title: "Childcare During Therapy",
      description: "Amanda needs reliable childcare for her 3-year-old while attending physical therapy sessions twice weekly following her car accident.",
      category: "Childcare",
      location: "Westside",
      urgency: "This Week",
      timePosted: "3 days ago",
      icon: Heart,
      church: "Grace Community",
      responses: 4,
      featured: false
    },
    {
      id: 7,
      title: "Tech Help for Seniors",
      description: "Our senior group needs help setting up tablets for virtual Bible study. Looking for patient volunteers to assist.",
      category: "Technology",
      location: "Community Center",
      urgency: "This Week",
      timePosted: "4 days ago",
      icon: Wrench,
      church: "Grace Community",
      responses: 2,
      featured: false
    },
    {
      id: 8,
      title: "Moving Assistance for New Family",
      description: "The Lee family is moving into our neighborhood and needs help unloading their truck and settling in.",
      category: "Moving",
      location: "Maple Street",
      urgency: "This Weekend",
      timePosted: "5 days ago",
      icon: Wrench,
      church: "First Baptist",
      responses: 5,
      featured: false
    },
    {
      id: 9,
      title: "Pet Care for Hospitalized Member",
      description: "Sister Ann is in the hospital and needs someone to care for her dog for a week. Food and supplies provided.",
      category: "Pet Care",
      location: "Elm Avenue",
      urgency: "Urgent",
      timePosted: "6 days ago",
      icon: Heart,
      church: "Community Fellowship",
      responses: 1,
      featured: false
    },
    {
      id: 10,
      title: "Tutoring for Kids",
      description: "Several children need help with math and reading after school. Volunteers with teaching experience preferred.",
      category: "Education",
      location: "Church Hall",
      urgency: "Ongoing",
      timePosted: "1 week ago",
      icon: Heart,
      church: "Riverside Church",
      responses: 3,
      featured: false
    },
    {
      id: 11,
      title: "Emergency Home Repair",
      description: "A family lost part of their roof in last night's storm. Immediate help needed to cover and repair damage.",
      category: "Emergency Repair",
      location: "Oakwood Suburb",
      urgency: "Immediate",
      timePosted: "1 week ago",
      icon: Wrench,
      church: "Hillside Baptist",
      responses: 2,
      featured: true
    }
  ];

  const successStories = [
    {
      id: 1,
      content: "When my husband was hospitalized for weeks, our church family coordinated everything - meals, childcare, even house cleaning. ChurchConnect made it seamless. We felt completely surrounded by love.",
      author: "Sarah Mitchell",
      church: "Grace Community Church",
      rating: 5,
      avatar: "SM",
      impact: "14 meals delivered",
      timeframe: "3 weeks ago",
      category: "Critical Support"
    },
    {
      id: 2,
      content: "I've helped 8 families this quarter through the platform. From grocery runs to home repairs, it's incredible how technology connects us to serve with such efficiency and heart.",
      author: "Michael Rodriguez",
      church: "First Baptist Church",
      rating: 5,
      avatar: "MR",
      impact: "8 families helped",
      timeframe: "This quarter",
      category: "Active Volunteer"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Community-Wide Service Day",
      description: "Unite with 12 local churches for our biggest service day yet! We'll tackle food bank sorting, park beautification, and elderly home visits.",
      date: "March 25, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "Multiple Locations",
      church: "Multi-Church Coalition",
      attendees: 247,
      category: "Service",
      featured: true,
      coordinator: "Pastor Alliance"
    }
  ];

  const categories = ["All", "Groceries", "Transportation", "Home Repair", "Meals", "Childcare", "Home & Garden", "Technology", "Moving", "Food Drive", "Pet Care", "Education", "Emergency Repair"];

  const filteredNeeds = communityNeeds.filter(need => {
    const matchesSearch = searchQuery === "" || 
      need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || need.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredNeeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNeeds = filteredNeeds.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-90"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-2xl translate-y-20 -translate-x-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Community Connection Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Churches <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">United</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the power of community as churches across the nation connect, serve, and transform lives together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl shadow-2xl" asChild>
                <Link to="/join-movement">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Join the Movement
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm" asChild>
                <Link to="/how-it-works">Discover How</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        {/* Three-Tab Navigation - Separate Container */}
        <div className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-20 rounded-none border-b border-border/5 p-2">
              <TabsTrigger 
                value="needs" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'needs' 
                      ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <Heart className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'needs' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'needs' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>DISCOVERING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="stories" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'stories' 
                      ? 'bg-gradient-to-br from-accent/40 to-accent/30' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <Star className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'stories' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'stories' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>INSPIRING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 data-[state=active]:opacity-100 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'events' 
                      ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                      : 'bg-muted/20 group-hover:bg-muted/40'
                  }`}>
                    <Calendar className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'events' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'events' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>CONNECTING</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Unified Search Bar */}
            <div className="p-4 bg-gradient-to-br from-muted/20 to-muted/5 border-b border-border/10">
              <div className="flex flex-col gap-3 items-center max-w-4xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={
                      activeTab === 'needs' ? "Search needs by title or description..." :
                      activeTab === 'stories' ? "Search stories by content or author..." :
                      "Search events by title or description..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-background/80 border-border/30 focus:border-primary/50 rounded-xl transition-all duration-300"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {activeTab === 'needs' && (
                    <>
                      {['All', 'Groceries', 'Transportation', 'Home Repair', 'Childcare', 'Meals', 'Emergency Repair', 'Other'].map((category) => (
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

                  {activeTab === 'stories' && (
                    <>
                      {['All', 'Critical Support', 'Active Volunteer', 'Community Impact', 'Testimonials'].map((category) => (
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

                  {activeTab === 'events' && (
                    <>
                      {['All', 'Service', 'Community', 'Worship', 'Fellowship', 'Outreach'].map((category) => (
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
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area - Separate Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-background rounded-2xl shadow-lg border border-border p-4">
          {/* Content based on active tab */}
          {activeTab === "needs" && (
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Current Community Needs ({filteredNeeds.length} opportunities)</h2>
                  <p className="text-muted-foreground text-lg">Real opportunities to make a difference in people's lives. Every act of service creates ripples of hope.</p>
                </div>
              </div>
              
              {/* Needs Grid - 4 rows x 3 columns with pagination */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentNeeds.map((need) => (
                  <Card key={need.id} className="group hover:shadow-card transition-all duration-200 border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {need.category}
                          </Badge>
                          <Badge 
                            className={
                              need.urgency === "Immediate" 
                                ? "bg-destructive text-destructive-foreground" 
                                : need.urgency === "This Week"
                                ? "bg-accent text-accent-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }
                          >
                            {need.urgency}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {need.timePosted}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {need.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {need.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{need.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{need.responses} responses</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link to="/service-detail">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}

          {/* Success Stories Tab */}
          {activeTab === "stories" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">Transformational Stories</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  Real testimonies from lives touched and communities strengthened through the power of connection.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {successStories.map((story) => (
                  <Card key={story.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground leading-relaxed mb-4 italic text-sm">
                        "{story.content}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-accent">{story.avatar}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{story.author}</div>
                          <div className="text-xs text-muted-foreground">{story.church}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  Join upcoming opportunities to serve and connect with your community.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}