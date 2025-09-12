import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserCheck, Bell } from "lucide-react";

export default function MyChurch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Church-specific data - in real app this would come from database
  const churchName = "Grace Community Church";
  const memberSince = "2022";
  
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

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-24">
        {/* Church Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-6">
            <Heart className="w-5 h-5" />
            <span>My Church Community</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            {churchName}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Member since {memberSince} • Connected to serve and support our church family
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary hover:bg-primary-hover text-white" asChild>
              <Link to="/post">
                <Heart className="w-4 h-4 mr-2" />
                Post a Need
              </Link>
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-card bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{filteredNeeds.length}</h3>
              <p className="text-muted-foreground">Active Needs</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">7</h3>
              <p className="text-muted-foreground">Times Helped</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{churchEvents.length}</h3>
              <p className="text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">156</h3>
              <p className="text-muted-foreground">Church Members</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-accent/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search church needs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
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

        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Church Needs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Church Family Needs</h2>
              <Badge variant="secondary" className="text-sm">{filteredNeeds.length} Active</Badge>
            </div>
            
            <ScrollArea className="h-[700px] pr-4">
              <div className="space-y-6">
                {filteredNeeds.map((need) => {
                  const IconComponent = need.icon;
                  return (
                    <Card key={need.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                            <IconComponent className="w-8 h-8 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">{need.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-4">{need.description}</p>
                              </div>
                              <Badge variant={getUrgencyColor(need.urgency) as any}>
                                {need.urgency}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {need.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {need.timePosted}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {need.postedBy}
                              </div>
                              <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                {need.responses} responses
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <Button className="bg-primary hover:bg-primary-hover text-white">
                                <Heart className="w-4 h-4 mr-2" />
                                Offer Help
                              </Button>
                              <Button variant="outline">
                                <MessageSquare className="w-4 h-4 mr-2" />
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
            </ScrollArea>
          </div>

          {/* Right Column - Events & Activity */}
          <div className="space-y-8">
            {/* Church Events */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Church Events</h2>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {churchEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm">
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
                        <Button size="sm" className="w-full bg-accent hover:bg-accent-hover">
                          Join Event
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <Card key={activity.id} className="border-0 shadow-card bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-4 h-4 text-accent" />
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
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}