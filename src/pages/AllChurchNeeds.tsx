import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Users, Heart, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Home, Baby, Book, Music, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllChurchNeeds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allNeeds = [
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
    },
    {
      id: 4,
      title: "Home Repair for Senior Widow",
      description: "Sister Patricia's roof has been leaking and she needs help with repairs. She's on a fixed income and can't afford contractors.",
      category: "Home Repair",
      location: "Riverside District",
      urgency: "This Week",
      timePosted: "2 days ago",
      icon: Wrench,
      postedBy: "Mark Williams",
      responses: 5
    },
    {
      id: 5,
      title: "Childcare for Single Mom",
      description: "Maria needs childcare help for her two young children while she attends evening nursing classes to improve her family's situation.",
      category: "Childcare",
      location: "University Area",
      urgency: "Flexible",
      timePosted: "3 days ago",
      icon: Baby,
      postedBy: "Jennifer Davis",
      responses: 2
    },
    {
      id: 6,
      title: "Prayer Support for Family Crisis",
      description: "The Anderson family is going through a difficult time with job loss and health issues. They need our spiritual support and prayers.",
      category: "Prayer Support",
      location: "Church Community",
      urgency: "Ongoing",
      timePosted: "5 days ago",
      icon: Heart,
      postedBy: "Pastor Michael",
      responses: 12
    },
    {
      id: 7,
      title: "Moving Help for Elderly Couple",
      description: "Brother and Sister Martinez need help moving to a smaller apartment. They have a lot of belongings and limited mobility.",
      category: "Transportation",
      location: "East Side",
      urgency: "This Week",
      timePosted: "6 days ago",
      icon: Car,
      postedBy: "Carlos Rivera",
      responses: 4
    },
    {
      id: 8,
      title: "Music Ministry Volunteer Needed",
      description: "Our children's choir needs someone to help with music instruction and practice sessions on Sunday mornings.",
      category: "Ministry",
      location: "Church Building",
      urgency: "Flexible",
      timePosted: "1 week ago",
      icon: Music,
      postedBy: "Worship Team",
      responses: 3
    }
  ];

  const categories = ["All", "Groceries", "Transportation", "Home Repair", "Meals", "Childcare", "Prayer Support", "Ministry"];
  
  const filteredNeeds = allNeeds.filter(need => {
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
      case "Ongoing": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/my-church">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Church
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">All Church Family Needs</h1>
          <p className="text-xl text-white/90">
            Complete overview of all active needs in our church community
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 border-0 shadow-elegant">
          <CardHeader>
            <CardTitle>Search & Filter Needs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search needs by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
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
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filteredNeeds.length} Need{filteredNeeds.length !== 1 ? 's' : ''} Found
          </h2>
          <Badge variant="secondary" className="text-sm">
            {allNeeds.length} Total Active
          </Badge>
        </div>

        {/* Needs Grid */}
        <div className="grid gap-6">
          {filteredNeeds.map((need) => {
            const IconComponent = need.icon;
            return (
              <Card key={need.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/95 backdrop-blur-sm group">
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

        {filteredNeeds.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No needs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}