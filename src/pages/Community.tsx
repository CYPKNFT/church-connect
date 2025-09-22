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
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserPlus, Sparkles, TrendingUp, Award } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Together we create lasting impact through service, sharing stories, and building connections that strengthen our community.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Join the Movement
          </Button>
        </div>
      </div>

      {/* Navigation Section - Matching My Church */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border border-border/20 rounded-2xl shadow-xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation - Compact Design like My Church */}
            <TabsList className="w-full bg-transparent border-b border-border/10 rounded-none h-auto p-0 justify-start">
              <TabsTrigger 
                value="needs"
                className="group flex items-center gap-3 px-6 py-4 border-b-2 border-transparent data-[state=active]:border-primary bg-transparent rounded-none transition-all duration-300 hover:bg-muted/20 data-[state=active]:bg-transparent"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeTab === 'needs' 
                    ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                    : 'bg-muted/20 group-hover:bg-muted/40'
                }`}>
                  <Heart className={`w-5 h-5 transition-colors duration-300 ${
                    activeTab === 'needs' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                </div>
                <span className={`transition-colors duration-300 ${
                  activeTab === 'needs' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                }`}>DISCOVERING</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stories"
                className="group flex items-center gap-3 px-6 py-4 border-b-2 border-transparent data-[state=active]:border-primary bg-transparent rounded-none transition-all duration-300 hover:bg-muted/20 data-[state=active]:bg-transparent"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeTab === 'stories' 
                    ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                    : 'bg-muted/20 group-hover:bg-muted/40'
                }`}>
                  <Star className={`w-5 h-5 transition-colors duration-300 ${
                    activeTab === 'stories' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                </div>
                <span className={`transition-colors duration-300 ${
                  activeTab === 'stories' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                }`}>INSPIRING</span>
              </TabsTrigger>
              <TabsTrigger 
                value="events"
                className="group flex items-center gap-3 px-6 py-4 border-b-2 border-transparent data-[state=active]:border-primary bg-transparent rounded-none transition-all duration-300 hover:bg-muted/20 data-[state=active]:bg-transparent"
              >
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
              </TabsTrigger>
            </TabsList>

            {/* Unified Search Section - Matching My Church */}
            <div className="p-4 bg-gradient-to-br from-muted/20 to-muted/5 border-b border-border/10">
              <div className="flex flex-col gap-3 items-center max-w-4xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={
                      activeTab === 'needs' ? "Search community needs..." :
                      activeTab === 'stories' ? "Search success stories..." :
                      "Search upcoming events..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-background/80 border-border/30 focus:border-primary/50 rounded-xl transition-all duration-300"
                  />
                </div>

                {/* Filter Pills - Matching My Church Style */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {activeTab === 'needs' && (
                    <>
                      {['All', 'Groceries', 'Transportation', 'Home Repair', 'Childcare', 'Meals', 'Technology', 'Moving', 'Pet Care', 'Education', 'Emergency Repair'].map((category) => (
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
                      {['All', 'Service', 'Support', 'Community', 'Growth', 'Outreach'].map((category) => (
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
                      {['All', 'Service', 'Prayer', 'Social', 'Fundraiser', 'Workshops', 'Youth', 'Worship'].map((category) => (
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

            {/* Active Needs Tab */}
            <TabsContent value="needs" className="mt-0">
              <div className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Community Needs ({filteredNeeds.length} opportunities)</h2>
                    <p className="text-muted-foreground text-lg">Help make a difference in your church family</p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Post New Need
                  </Button>
                </div>
                
                {/* Needs Grid */}
                {currentNeeds.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {need.description}
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{need.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>2-3 hours estimated</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{need.church}</span>
                              </div>
                            </div>
                          </CardContent>
                          <div className="p-6 pt-0 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{need.responses} responses</span>
                              {need.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                View Details
                              </Button>
                              <Button variant="default" size="sm" className="flex-1">
                                I Can Help
                              </Button>
                            </div>
                          </div>
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

            {/* Success Stories Tab */}
            <TabsContent value="stories" className="mt-0">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Success Stories</h2>
                    <p className="text-muted-foreground text-lg">Inspiring testimonies from our community</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {successStories.map((story) => (
                    <Card key={story.id} className="border border-border hover:shadow-lg transition-shadow">
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
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-0">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
                    <p className="text-muted-foreground text-lg">Join opportunities to serve and connect</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="border border-border hover:shadow-lg transition-shadow">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}