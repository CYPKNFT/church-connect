import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserPlus } from "lucide-react";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const tasks = [
    {
      id: 1,
      title: "Help with grocery shopping",
      description: "Weekly grocery assistance needed for elderly church member recovering from surgery.",
      category: "Groceries",
      location: "Downtown Area",
      urgency: "This Week",
      timePosted: "2 hours ago",
      icon: ShoppingCart,
      church: "Local Churches"
    },
    {
      id: 2,
      title: "Transportation needed",
      description: "Ride needed to medical appointment for church member without transportation.",
      category: "Transportation",
      location: "Westside",
      urgency: "Immediate",
      timePosted: "4 hours ago",
      icon: Car,
      church: "Local Churches"
    },
    {
      id: 3,
      title: "Home repairs assistance",
      description: "Handy person needed to help fix leaky faucet and replace light fixture.",
      category: "Home Repair",
      location: "Northside",
      urgency: "Flexible",
      timePosted: "1 day ago",
      icon: Wrench,
      church: "Local Churches"
    },
    {
      id: 4,
      title: "Meal train coordination",
      description: "Organizing meals for new parents who just welcomed their baby.",
      category: "Meals",
      location: "Eastside",
      urgency: "This Week",
      timePosted: "6 hours ago",
      icon: ChefHat,
      church: "Local Churches"
    },
    {
      id: 5,
      title: "Yard cleanup help",
      description: "Storm cleanup assistance needed for elderly neighbor's property.",
      category: "Home & Garden",
      location: "Pine Ridge",
      urgency: "Flexible",
      timePosted: "2 days ago",
      icon: Wrench,
      church: "Local Churches"
    },
    {
      id: 6,
      title: "Childcare support",
      description: "Childcare needed during medical appointments for single parent.",
      category: "Childcare",
      location: "Westside",
      urgency: "This Week",
      timePosted: "3 days ago",
      icon: Heart,
      church: "Local Churches"
    }
  ];

  const categories = ["All", "Groceries", "Transportation", "Home Repair", "Meals", "Childcare", "Home & Garden"];
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const testimonials = [
    {
      id: 1,
      content: "ChurchConnect helped us coordinate meal delivery for our family during a difficult time. The support from multiple churches was overwhelming.",
      author: "Sarah M.",
      church: "Grace Community Church",
      rating: 5,
      avatar: "SM"
    },
    {
      id: 2,
      content: "I've been able to help five families this month through the platform. It's amazing how technology connects us to serve others.",
      author: "Mike J.",
      church: "First Baptist Church",
      rating: 5,
      avatar: "MJ"
    },
    {
      id: 3,
      content: "As a single mom, I was hesitant to ask for help. ChurchConnect made it comfortable and showed me how much our community cares.",
      author: "Linda C.",
      church: "Community Fellowship",
      rating: 5,
      avatar: "LC"
    },
    {
      id: 4,
      content: "The platform has connected churches across our city. We're serving more families than ever before.",
      author: "Pastor David",
      church: "Multiple Churches",
      rating: 5,
      avatar: "PD"
    },
    {
      id: 5,
      content: "From grocery shopping to home repairs, I've found meaningful ways to serve using ChurchConnect.",
      author: "Robert T.",
      church: "Riverside Church",
      rating: 5,
      avatar: "RT"
    },
    {
      id: 6,
      content: "The response time is incredible. Within hours, someone was there to help with my emergency repair.",
      author: "Jennifer W.",
      church: "Hillside Baptist",
      rating: 5,
      avatar: "JW"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Community Service Day",
      description: "Join us for a day of serving our local community. We'll be helping at the food bank and cleaning up the park.",
      date: "March 25, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Community Center",
      church: "Multiple Churches",
      attendees: 45,
      category: "Service"
    },
    {
      id: 2,
      title: "Volunteer Training Workshop",
      description: "Learn best practices for volunteering through ChurchConnect. Safety guidelines and effective service tips.",
      date: "March 30, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Grace Community Church",
      church: "Grace Community Church",
      attendees: 23,
      category: "Training"
    },
    {
      id: 3,
      title: "Easter Service Project",
      description: "Preparing Easter baskets for families in need. All church members welcome to participate.",
      date: "April 1, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "First Baptist Church",
      church: "First Baptist Church",
      attendees: 67,
      category: "Special Event"
    }
  ];

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
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-8">
            <Users className="w-5 h-5" />
            <span>Community Hub</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Church <span className="bg-accent-gradient bg-clip-text text-transparent">Communities</span> Unite
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover how churches across the country are connecting to serve, support, and strengthen their communities.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-white mr-4" asChild>
              <Link to="/register">
                <UserPlus className="w-5 h-5 mr-2" />
                Join the Movement
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-accent/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search community needs..."
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

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Active Needs */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Active Community Needs</h2>
              <Badge variant="secondary" className="text-sm">{filteredTasks.length} Available</Badge>
            </div>
            
            <ScrollArea className="h-[800px] pr-4">
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const IconComponent = task.icon;
                  return (
                    <Card key={task.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-bold text-foreground">{task.title}</h3>
                              <Badge variant={getUrgencyColor(task.urgency) as any} className="text-xs">
                                {task.urgency}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {task.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.timePosted}
                              </div>
                            </div>
                            <Button size="sm" className="bg-primary hover:bg-primary-hover text-white" asChild>
                              <Link to="/register">
                                <Heart className="w-4 h-4 mr-2" />
                                Join to Help
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column - Events & Testimonials */}
          <div className="space-y-8">
            {/* Events Section */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Community Events</h2>
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {event.attendees} attending
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Testimonials Section */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Success Stories</h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <blockquote className="text-muted-foreground leading-relaxed mb-4 italic text-sm">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <span className="text-accent font-bold text-xs">{testimonial.avatar}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.church}</p>
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

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl p-12 text-center mt-16">
          <Heart className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Connect Your Church?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of churches across the country using ChurchConnect to serve their communities better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-hover text-lg px-8 py-6" asChild>
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2" asChild>
              <Link to="/churches">Find Churches Near You</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}