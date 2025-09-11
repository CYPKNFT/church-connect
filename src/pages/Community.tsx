import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Baby, HandHeart } from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("tasks");

  const tasks = [
    {
      id: 1,
      title: "Need help with grocery shopping",
      description: "Looking for someone to help with weekly grocery run. I'm recovering from surgery and can't lift heavy items.",
      category: "Groceries",
      location: "Downtown Area",
      urgency: "Medium",
      timePosted: "2 hours ago",
      icon: ShoppingCart,
      churchMember: "Sarah M.",
      church: "Grace Community Church"
    },
    {
      id: 2,
      title: "Ride needed to doctor's appointment",
      description: "Need transportation to medical appointment on Friday afternoon. My car is in the shop.",
      category: "Transportation",
      location: "Westside",
      urgency: "High",
      timePosted: "4 hours ago",
      icon: Car,
      churchMember: "Robert T.",
      church: "First Baptist Church"
    },
    {
      id: 3,
      title: "Help with home repairs",
      description: "Looking for someone handy to help fix a leaky faucet and replace a light fixture.",
      category: "Home Repairs",
      location: "Northside",
      urgency: "Low",
      timePosted: "1 day ago",
      icon: Wrench,
      churchMember: "Linda K.",
      church: "Community Fellowship"
    },
    {
      id: 4,
      title: "Meal train for new parents",
      description: "Organizing meals for the Johnson family who just welcomed their new baby.",
      category: "Meals",
      location: "Eastside",
      urgency: "Medium",
      timePosted: "6 hours ago",
      icon: ChefHat,
      churchMember: "Mark D.",
      church: "Riverside Church"
    }
  ];

  const testimonials = [
    {
      id: 1,
      content: "When my husband was in the hospital, our church family brought meals for two weeks. ChurchConnect made it so easy to coordinate everything. We felt so loved.",
      author: "Sarah Miller",
      church: "Grace Community Church",
      rating: 5,
      avatar: "SM"
    },
    {
      id: 2,
      content: "I've been able to help three families with home repairs this month. It's amazing how technology can connect us to serve others right in our neighborhood.",
      author: "Mike Johnson",
      church: "First Baptist Church",
      rating: 5,
      avatar: "MJ"
    },
    {
      id: 3,
      content: "As a single mom, I was hesitant to ask for help. ChurchConnect made it comfortable and showed me how much our church really cares.",
      author: "Linda Chen",
      church: "Community Fellowship",
      rating: 5,
      avatar: "LC"
    },
    {
      id: 4,
      content: "The ride-sharing feature has been a blessing for our elderly members. It's brought our community closer together.",
      author: "Pastor David",
      church: "Hillside Baptist",
      rating: 5,
      avatar: "PD"
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
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
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
            Your Church <span className="bg-accent-gradient bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Connect with your church family, discover opportunities to serve, and see the impact of God's love in action.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/50 backdrop-blur-sm border border-accent/20 rounded-2xl p-2">
            <TabsTrigger 
              value="tasks" 
              className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-foreground text-lg font-semibold py-4"
            >
              <Heart className="w-5 h-5 mr-2" />
              Active Needs
            </TabsTrigger>
            <TabsTrigger 
              value="testimonials" 
              className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-foreground text-lg font-semibold py-4"
            >
              <Star className="w-5 h-5 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-foreground text-lg font-semibold py-4"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Active Needs Tab */}
          <TabsContent value="tasks" className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Current Community Needs</h2>
                <p className="text-lg text-muted-foreground">Ways you can help your church family today</p>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-foreground" asChild>
                <Link to="/post">
                  <Heart className="w-4 h-4 mr-2" />
                  Post a Need
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-6">
              {tasks.map((task) => {
                const IconComponent = task.icon;
                return (
                  <Card key={task.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-2">{task.title}</h3>
                              <p className="text-lg text-muted-foreground leading-relaxed mb-4">{task.description}</p>
                            </div>
                            <Badge variant={getUrgencyColor(task.urgency) as any}>
                              {task.urgency} Priority
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {task.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {task.timePosted}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {task.churchMember} • {task.church}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Button className="bg-primary hover:bg-primary-hover text-white">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Offer Help
                            </Button>
                            <Button variant="outline">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Stories of Impact</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Real testimonies from church members whose lives have been touched through ChurchConnect
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-accent font-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.church}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Upcoming Community Events</h2>
                <p className="text-lg text-muted-foreground">Join your church community in service and fellowship</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-4">{event.category}</Badge>
                        <CardTitle className="text-2xl font-bold mb-2">{event.title}</CardTitle>
                      </div>
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Calendar className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>
                    <div className="space-y-3 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.attendees} attending • {event.church}
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                      Join Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}