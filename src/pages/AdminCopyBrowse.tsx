import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Search, Filter, MapPin, Clock, Users, Star, Calendar, ChevronRight, Timer, AlertTriangle, CheckCircle, FileText, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AdminCopyBrowse() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Mock data for community needs
  const communityNeeds = [
    {
      id: "1",
      title: "Moving assistance needed urgently",
      description: "Need help loading truck for apartment move. Mostly furniture and boxes. Will provide lunch and gas money.",
      requester: "David Chen",
      location: "Pine Street",
      estimatedTime: "4 hours",
      category: "Moving",
      urgency: "Immediate",
      volunteers: 2,
      needed: 4,
      posted: "3 hours ago",
      date: "This Saturday 9:00 AM",
      rating: 4.8,
      responseTime: "Usually responds within 1 hour"
    },
    {
      id: "2",
      title: "Computer repair for elderly resident",
      description: "Computer won't start, possible virus. Need someone with tech experience to diagnose and fix the issue.",
      requester: "Margaret Williams",
      location: "Senior Living Complex",
      estimatedTime: "1-2 hours",
      category: "Technology",
      urgency: "This Week",
      volunteers: 0,
      needed: 1,
      posted: "1 day ago",
      date: "Flexible weekday",
      rating: 5.0,
      responseTime: "Usually responds within 3 hours"
    },
    {
      id: "3",
      title: "Tutoring for high school math",
      description: "Regular weekly tutoring sessions for algebra and geometry. Patient teacher needed for struggling student.",
      requester: "Jennifer Rodriguez",
      location: "Main Library",
      estimatedTime: "2 hours/week",
      category: "Education",
      urgency: "Flexible",
      volunteers: 1,
      needed: 1,
      posted: "2 days ago",
      date: "Weekly Thursdays 4:00 PM",
      rating: 4.9,
      responseTime: "Usually responds within 6 hours"
    },
    {
      id: "4",
      title: "Grocery shopping for immunocompromised neighbor",
      description: "Weekly grocery shopping assistance. I'll provide list and payment, just need someone to shop and deliver.",
      requester: "Sarah Johnson",
      location: "Downtown Market District",
      estimatedTime: "1.5 hours",
      category: "Groceries",
      urgency: "This Week",
      volunteers: 0,
      needed: 1,
      posted: "4 hours ago",
      date: "Every Tuesday morning",
      rating: 4.7,
      responseTime: "Usually responds within 2 hours"
    },
    {
      id: "5",
      title: "Pet sitting for medical appointment",
      description: "Need someone to watch my elderly dog Buddy while I'm at a medical procedure. He's very calm and just needs company.",
      requester: "Robert Martinez",
      location: "Oak Avenue",
      estimatedTime: "4 hours",
      category: "Pet Care",
      urgency: "Immediate",
      volunteers: 1,
      needed: 1,
      posted: "6 hours ago",
      date: "This Friday 1:00 PM",
      rating: 4.6,
      responseTime: "Usually responds within 30 minutes"
    },
    {
      id: "6",
      title: "Garden cleanup and fall preparation",
      description: "Help with raking leaves, pruning bushes, and preparing garden for winter. All tools provided.",
      requester: "Eleanor Thompson",
      location: "Maple Street",
      estimatedTime: "3-4 hours",
      category: "Home & Garden",
      urgency: "Flexible",
      volunteers: 0,
      needed: 2,
      posted: "1 day ago",
      date: "Any weekend morning",
      rating: 5.0,
      responseTime: "Usually responds within 4 hours"
    }
  ];

  const categories = ["All", "Moving", "Technology", "Education", "Groceries", "Pet Care", "Home & Garden", "Transportation", "Meals"];
  const urgencies = ["All", "Immediate", "This Week", "Flexible"];
  const locations = ["All", "Pine Street", "Senior Living Complex", "Main Library", "Downtown Market District", "Oak Avenue", "Maple Street"];

  const filteredNeeds = communityNeeds.filter(need => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.requester.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || need.category === categoryFilter;
    const matchesUrgency = urgencyFilter === "All" || need.urgency === urgencyFilter;
    const matchesLocation = locationFilter === "All" || need.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesUrgency && matchesLocation;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "bg-red-100 text-red-700 border-red-200";
      case "This Week": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Flexible": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getVolunteerProgress = (volunteers: number, needed: number) => {
    return (volunteers / needed) * 100;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Admin Copy Header Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-blue-900">Admin Copy - Browse Needs</h2>
              <p className="text-sm text-blue-700">Viewing community needs browsing interface</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8">
          <div className="mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    Browse Community Needs
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Find opportunities to help your neighbors and make a difference
                  </p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
                  <Link to="/post">
                    <Heart className="w-4 h-4 mr-2" />
                    Post a Need
                  </Link>
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Available Needs</p>
                        <p className="text-2xl font-bold text-blue-700">{communityNeeds.length}</p>
                      </div>
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">Urgent Needs</p>
                        <p className="text-2xl font-bold text-red-700">
                          {communityNeeds.filter(n => n.urgency === "Immediate").length}
                        </p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Active Volunteers</p>
                        <p className="text-2xl font-bold text-green-700">
                          {communityNeeds.reduce((sum, need) => sum + need.volunteers, 0)}
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-600">Avg. Rating</p>
                        <p className="text-2xl font-bold text-amber-700">4.8</p>
                      </div>
                      <Star className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card className="border-0 shadow-card bg-card rounded-2xl mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search community needs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-border rounded-xl bg-background text-sm"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>Category: {category}</option>
                        ))}
                      </select>
                      
                      <select
                        value={urgencyFilter}
                        onChange={(e) => setUrgencyFilter(e.target.value)}
                        className="px-4 py-2 border border-border rounded-xl bg-background text-sm"
                      >
                        {urgencies.map(urgency => (
                          <option key={urgency} value={urgency}>Urgency: {urgency}</option>
                        ))}
                      </select>

                      <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="px-4 py-2 border border-border rounded-xl bg-background text-sm"
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>Location: {location}</option>
                        ))}
                      </select>
                      
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Needs List */}
            <div className="space-y-4">
              {filteredNeeds.length === 0 ? (
                <Card className="border-0 shadow-card bg-card rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No needs found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms to find opportunities to help.
                    </p>
                    <Button asChild>
                      <Link to="/post">
                        <Heart className="w-4 h-4 mr-2" />
                        Post a Need
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredNeeds.map((need) => (
                  <Card 
                    key={need.id} 
                    className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] group"
                    onClick={() => navigate(`/needs_details/${need.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{need.title}</h3>
                              <Badge className={`${getUrgencyColor(need.urgency)} rounded-full text-xs px-3 py-1`}>
                                {need.urgency}
                              </Badge>
                            </div>
                            <Button size="sm" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                              Volunteer Now
                            </Button>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">{need.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{need.requester}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{need.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{need.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Timer className="w-4 h-4" />
                              <span>{need.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${getVolunteerProgress(need.volunteers, need.needed)}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-foreground">
                                  {need.volunteers}/{need.needed} volunteers
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium text-foreground">{need.rating}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-foreground">Category: {need.category}</p>
                              <p className="text-xs text-muted-foreground">{need.responseTime}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Posted {need.posted}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                              <span>View Details & Volunteer</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}