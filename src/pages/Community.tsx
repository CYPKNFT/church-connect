import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserPlus, Sparkles, TrendingUp, Award } from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("needs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const communityNeeds = [
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
      title: "Computer Repair for Student",
      description: "High school senior's laptop crashed right before college applications are due. Need tech support to recover files and get system working.",
      category: "Technology",
      location: "North Side",
      urgency: "Immediate",
      timePosted: "1 hour ago",
      icon: Wrench,
      church: "New Hope Chapel",
      responses: 0,
      featured: true
    },
    {
      id: 8,
      title: "Moving Assistance for Elderly",
      description: "Brother Thomas needs help moving to assisted living. Looking for strong hands to pack and transport belongings with care and dignity.",
      category: "Moving",
      location: "Central District",
      urgency: "This Week",
      timePosted: "5 hours ago",
      icon: Users,
      church: "Valley Church",
      responses: 2,
      featured: false
    },
    {
      id: 9,
      title: "Food Drive Collection",
      description: "Organizing monthly food drive for local shelter. Need volunteers to collect, sort, and deliver non-perishable items to families in need.",
      category: "Food Drive",
      location: "Community Center",
      urgency: "Flexible",
      timePosted: "1 day ago",
      icon: ShoppingCart,
      church: "Trinity Baptist",
      responses: 6,
      featured: true
    },
    {
      id: 10,
      title: "Pet Care During Hospitalization",
      description: "Sister Mary's beloved dog needs temporary care while she recovers from surgery. Looking for dog-loving volunteer for 2-3 weeks.",
      category: "Pet Care",
      location: "East Side",
      urgency: "This Week",
      timePosted: "8 hours ago",
      icon: Heart,
      church: "St. Matthews",
      responses: 3,
      featured: false
    },
    {
      id: 11,
      title: "Tutoring for Struggling Student",
      description: "Young mother needs math tutoring help for her 8th-grade son who's falling behind. Looking for patient volunteer with teaching experience.",
      category: "Education",
      location: "School District",
      urgency: "Flexible",
      timePosted: "2 days ago",
      icon: Star,
      church: "Faith Community",
      responses: 1,
      featured: false
    },
    {
      id: 12,
      title: "Emergency Heating Repair",
      description: "Family's heating system failed during cold snap. Need skilled HVAC volunteer or funding assistance to restore warmth to home with young children.",
      category: "Emergency Repair",
      location: "Riverside",
      urgency: "Immediate",
      timePosted: "30 minutes ago",
      icon: Wrench,
      church: "Riverside Fellowship",
      responses: 0,
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
    },
    {
      id: 3,
      content: "As a single mom, asking for help was terrifying. ChurchConnect made it comfortable and dignified. I discovered how much our community truly cares about each other.",
      author: "Jennifer Williams",
      church: "Community Fellowship",
      rating: 5,
      avatar: "JW",
      impact: "3 major needs met",
      timeframe: "2 months ago",
      category: "Life Change"
    },
    {
      id: 4,
      content: "The response time is phenomenal. Within 2 hours of posting an emergency repair need, three volunteers had responded. Our community's heart is truly beautiful.",
      author: "Pastor David Chen",
      church: "Riverside Church",
      rating: 5,
      avatar: "DC",
      impact: "15 urgent requests",
      timeframe: "This month",
      category: "Emergency Response"
    },
    {
      id: 5,
      content: "ChurchConnect helped us coordinate disaster relief for 50+ families after the tornado. The platform's organization tools were a lifesaver during chaos.",
      author: "Linda Thompson",
      church: "Hillside Baptist",
      rating: 5,
      avatar: "LT",
      impact: "50+ families served",
      timeframe: "6 months ago",
      category: "Disaster Relief"
    },
    {
      id: 6,
      content: "Volunteering through ChurchConnect led me to my calling in elderly care. I've now started a ministry specifically for our senior members.",
      author: "Mark Davis",
      church: "Unity Methodist",
      rating: 5,
      avatar: "MD",
      impact: "New ministry launched",
      timeframe: "1 year ago",
      category: "Ministry Birth"
    },
    {
      id: 7,
      content: "The platform helped me find my life partner! We met while volunteering at a community kitchen and have been serving together ever since our wedding.",
      author: "Rachel and James Carter",
      church: "Crossroads Church",
      rating: 5,
      avatar: "RC",
      impact: "Marriage & ministry",
      timeframe: "8 months ago",
      category: "Life Change"
    },
    {
      id: 8,
      content: "After losing my job, the community rallied around my family. From groceries to job leads, ChurchConnect showed me what true fellowship looks like.",
      author: "Kevin Washington",
      church: "Hope Baptist",
      rating: 5,
      avatar: "KW",
      impact: "Complete life restoration",
      timeframe: "4 months ago",
      category: "Critical Support"
    },
    {
      id: 9,
      content: "Our youth group organized 20 service projects this year through the platform. These kids are learning what it means to be the hands and feet of Jesus.",
      author: "Pastor Emily Rodriguez",
      church: "New Generation Church",
      rating: 5,
      avatar: "ER",
      impact: "20 youth projects",
      timeframe: "This year",
      category: "Active Volunteer"
    },
    {
      id: 10,
      content: "When my house flooded, strangers became family. ChurchConnect connected me with 30+ volunteers who restored my home and my faith in humanity.",
      author: "Gloria Martinez",
      church: "Community Bible",
      rating: 5,
      avatar: "GM",
      impact: "Home completely restored",
      timeframe: "6 months ago",
      category: "Disaster Relief"
    },
    {
      id: 11,
      content: "The medical transportation ministry that started here now serves 5 hospitals. One platform connection grew into a life-saving network.",
      author: "Dr. Robert Kim",
      church: "Medical Missions",
      rating: 5,
      avatar: "RK",
      impact: "Multi-hospital network",
      timeframe: "2 years ago",
      category: "Ministry Birth"
    },
    {
      id: 12,
      content: "Being a single dad was overwhelming until ChurchConnect connected me with other fathers. We now have a thriving support group for single parents.",
      author: "Marcus Johnson",
      church: "Family First Church",
      rating: 5,
      avatar: "MJ",
      impact: "Support group launched",
      timeframe: "1 year ago",
      category: "Life Change"
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
    },
    {
      id: 2,
      title: "Volunteer Skills Workshop",
      description: "Learn advanced techniques for effective service, safety protocols, and building meaningful connections with those we serve.",
      date: "March 30, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Grace Community Center",
      church: "Grace Community Church",
      attendees: 89,
      category: "Training",
      featured: true,
      coordinator: "Ministry Leaders"
    },
    {
      id: 3,
      title: "Easter Hope Project",
      description: "Create 500 Easter blessing boxes for families experiencing hardship. Include gifts, meals, and messages of hope for the resurrection season.",
      date: "April 1, 2024",
      time: "1:00 PM - 6:00 PM",
      location: "First Baptist Fellowship Hall",
      church: "Multiple Churches",
      attendees: 156,
      category: "Special Event",
      featured: false,
      coordinator: "Community Outreach"
    },
    {
      id: 4,
      title: "Tech for Seniors Initiative",
      description: "Help elderly community members navigate smartphones, video calls, and ChurchConnect. Bridge the digital divide with patience and love.",
      date: "April 8, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center",
      church: "Tech Ministry Alliance",
      attendees: 34,
      category: "Technology",
      featured: false,
      coordinator: "Youth Tech Team"
    },
    {
      id: 5,
      title: "Neighborhood Prayer Walk",
      description: "Join believers from across denominations as we prayer walk through our community, asking God's blessing on every home and business.",
      date: "April 15, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Downtown District",
      church: "Interfaith Council",
      attendees: 78,
      category: "Prayer",
      featured: false,
      coordinator: "Prayer Warriors"
    },
    {
      id: 6,
      title: "Spring Clean Community Drive",
      description: "Massive community cleanup focusing on streets, parks, and public spaces. Bring work gloves and a servant's heart!",
      date: "April 22, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "City-Wide",
      church: "Environmental Stewards",
      attendees: 198,
      category: "Environment",
      featured: true,
      coordinator: "Green Ministry"
    },
    {
      id: 7,
      title: "Mother's Day Appreciation Brunch",
      description: "Honor the mothers in our community with a special appreciation brunch. Celebrate their incredible impact on our families and churches.",
      date: "May 5, 2024",
      time: "10:00 AM - 1:00 PM",
      location: "Community Fellowship Hall",
      church: "Women's Ministry Coalition",
      attendees: 124,
      category: "Celebration",
      featured: true,
      coordinator: "Women's Leadership"
    },
    {
      id: 8,
      title: "Youth Leadership Summit",
      description: "Empower next generation leaders with workshops on faith, service, and community impact. Ages 13-18 welcome from all churches.",
      date: "May 12, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Regional Conference Center",
      church: "Youth Pastor Alliance",
      attendees: 89,
      category: "Youth",
      featured: false,
      coordinator: "Youth Pastors"
    },
    {
      id: 9,
      title: "Community Garden Planting",
      description: "Plant and maintain a community garden that will provide fresh produce for local food pantries throughout the growing season.",
      date: "May 18, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Riverside Park",
      church: "Creation Care Ministry",
      attendees: 67,
      category: "Environment",
      featured: false,
      coordinator: "Garden Committee"
    },
    {
      id: 10,
      title: "Multi-Church Worship Night",
      description: "Unite in worship as multiple congregations come together for an evening of praise, prayer, and community fellowship.",
      date: "May 25, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Central Amphitheater",
      church: "Worship Leaders Network",
      attendees: 312,
      category: "Worship",
      featured: true,
      coordinator: "Music Ministers"
    },
    {
      id: 11,
      title: "Senior Citizens Technology Fair",
      description: "Help seniors learn to use tablets, smartphones, and online services. Volunteer tech support and patient one-on-one assistance.",
      date: "June 1, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "Senior Center",
      church: "Tech Ministry Team",
      attendees: 45,
      category: "Technology",
      featured: false,
      coordinator: "Tech Volunteers"
    },
    {
      id: 12,
      title: "Father's Day Blessing Ceremony",
      description: "Special ceremony to honor and bless the fathers in our community. Prayer, encouragement, and celebration of fatherhood.",
      date: "June 16, 2024",
      time: "11:00 AM - 1:00 PM",
      location: "Memorial Park Pavilion",
      church: "Men's Ministry Alliance",
      attendees: 156,
      category: "Celebration",
      featured: true,
      coordinator: "Men's Leadership"
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

  const leftNeeds = filteredNeeds.filter((_, i) => i % 2 === 0);
  const rightNeeds = filteredNeeds.filter((_, i) => i % 2 === 1);
  const leftStories = successStories.filter((_, i) => i % 2 === 0);
  const rightStories = successStories.filter((_, i) => i % 2 === 1);
  const leftEvents = upcomingEvents.filter((_, i) => i % 2 === 0);
  const rightEvents = upcomingEvents.filter((_, i) => i % 2 === 1);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "destructive";
      case "This Week": return "default";
      case "Flexible": return "secondary";
      default: return "default";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Critical Support": return Heart;
      case "Active Volunteer": return TrendingUp;
      case "Life Change": return Sparkles;
      case "Emergency Response": return Award;
      case "Disaster Relief": return Users;
      case "Ministry Birth": return Star;
      default: return Heart;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-90"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-2xl translate-y-20 -translate-x-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white font-medium mb-4 backdrop-blur-sm">
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

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Enhanced Search Section */}
        <div className="bg-card backdrop-blur-xl rounded-2xl p-6 mb-12 shadow-2xl border border-border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Explore Community Impact</h2>
            <p className="text-muted-foreground">Search through real needs, inspiring stories, and upcoming opportunities</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search community activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-xl border-2 focus:border-accent"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-10 rounded-xl border-2">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 shadow-elegant rounded-xl z-50">
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-16 bg-card backdrop-blur-sm border-2 border-accent/20 rounded-3xl p-3 h-20">
            <TabsTrigger 
              value="needs" 
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white text-xl font-bold py-6 transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-6 h-6 mr-3" />
              Active Needs
              <Badge variant="secondary" className="ml-3 bg-white/20 text-current">
                {filteredNeeds.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="stories" 
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-primary data-[state=active]:text-white text-xl font-bold py-6 transition-all duration-300 hover:scale-105"
            >
              <Star className="w-6 h-6 mr-3" />
              Success Stories
              <Badge variant="secondary" className="ml-3 bg-white/20 text-current">
                {successStories.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white text-xl font-bold py-6 transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Upcoming Events
              <Badge variant="secondary" className="ml-3 bg-white/20 text-current">
                {upcomingEvents.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Active Needs Tab - Two Column Layout */}
          <TabsContent value="needs" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Current Community Needs</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Real opportunities to make a difference in people's lives. Every act of service creates ripples of hope.
              </p>
            </div>
            
            <div className="max-h-[800px] overflow-y-auto overflow-x-hidden rounded-2xl scrollbar-smooth">
              <div className="grid md:grid-cols-3 gap-6 pr-4">
                {filteredNeeds.map((need) => {
                  const IconComponent = need.icon;
                  return (
                    <Card key={need.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-bold text-foreground">{need.title}</h3>
                              <Badge variant={getUrgencyColor(need.urgency) as any} className="text-xs">
                                {need.urgency}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{need.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
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
                                {need.church}
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <Button size="sm" className="bg-primary hover:bg-primary-hover text-white" asChild>
                                <Link to="/register">
                                  <Heart className="w-4 h-4 mr-2" />
                                  Join to Help
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
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
            </div>
          </TabsContent>

          {/* Success Stories Tab - Two Column Layout */}
          <TabsContent value="stories" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Transformational Stories</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Real testimonies from lives touched and communities strengthened through the power of connection.
              </p>
            </div>
            
            <div className="h-[70vh] md:h-[75vh] overflow-y-auto overflow-x-hidden rounded-2xl scrollbar-smooth">
              <div className="grid md:grid-cols-3 gap-6 pr-4">
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
                          <span className="text-accent font-bold text-xs">{story.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{story.author}</p>
                          <p className="text-xs text-muted-foreground">{story.church}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Events Tab - Two Column Layout */}
          <TabsContent value="events" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Community Events</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Join your church community in service, fellowship, and making a lasting impact together.
              </p>
            </div>
            
            <div className="max-h-[800px] overflow-y-auto overflow-x-hidden rounded-2xl scrollbar-smooth">
              <div className="grid md:grid-cols-3 gap-6 pr-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-3">{event.category}</Badge>
                          <CardTitle className="text-xl font-bold mb-2">{event.title}</CardTitle>
                        </div>
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Calendar className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{event.description}</p>
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
                          {event.attendees} attending • {event.church}
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-primary hover:bg-primary-hover text-white" asChild>
                        <Link to="/register">
                          Join Event
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Call to Action */}
        <div className="bg-gradient-to-br from-accent/15 via-primary/10 to-accent/15 rounded-3xl p-16 text-center mt-12 mb-0 border border-accent/20 backdrop-blur-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
            Ready to <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Transform</span> Lives?
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of churches and millions of volunteers creating lasting impact through the power of connected community service.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-accent to-primary hover:from-accent-hover hover:to-primary-hover text-white text-xl px-12 py-8 rounded-2xl shadow-2xl" asChild>
              <Link to="/register">
                <UserPlus className="w-6 h-6 mr-3" />
                Start Making a Difference
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-accent/30 hover:bg-accent/5 text-xl px-12 py-8 rounded-2xl" asChild>
              <Link to="/churches">
                <Search className="w-6 h-6 mr-3" />
                Find Churches Near You
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}