import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { Heart, Clock, Users, Plus, Search, Filter, MapPin, Timer, MessageSquare, ChevronRight, HandHeart, Target, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function BrowseDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [churchName, setChurchName] = useState("Grace Community Church");
  const itemsPerPage = 6;

  // Church-specific needs data
  const churchNeeds = [
    {
      id: "1",
      title: "Weekly grocery assistance for Mrs. Johnson",
      description: "Mrs. Johnson, 85, has been a faithful church member for 40 years. After a recent fall, she's having difficulty getting to the grocery store.",
      category: "Groceries",
      urgency: "This Week" as "Immediate" | "This Week" | "Flexible",
      location: "Downtown area, 2 miles from church",
      estimatedTime: "1-2 hours",
      postedBy: "Sarah Miller",
      postedAt: "2 days ago"
    },
    {
      id: "2", 
      title: "Transportation to medical center",
      description: "Brother Robert needs reliable transportation for his cancer treatment appointments.",
      category: "Transportation",
      urgency: "Immediate" as "Immediate" | "This Week" | "Flexible",
      location: "Medical District",
      estimatedTime: "2-3 hours total",
      postedBy: "Robert Thompson",
      postedAt: "4 hours ago"
    }
  ];

  const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Childcare", "Home & Garden", "Prayer Support", "Other"];
  const urgencyLevels = ["All", "Immediate", "This Week", "Flexible"];

  const [filteredNeeds, setFilteredNeeds] = useState(churchNeeds);

  const handleSearch = () => {
    let filtered = churchNeeds;

    if (searchQuery) {
      filtered = filtered.filter(need => 
        need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        need.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(need => need.category === selectedCategory);
    }

    if (selectedUrgency !== "All") {
      filtered = filtered.filter(need => need.urgency === selectedUrgency);
    }

    setFilteredNeeds(filtered);
    setCurrentPage(1);
  };

  const handleVolunteer = (needId: string) => {
    alert(`Thanks for volunteering to help with need ${needId}!`);
  };

  const handleCardClick = (needId: string) => {
    navigate(`/service_detail/${needId}`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Browse {churchName} Needs
                </h1>
                <p className="text-lg text-muted-foreground">
                  Discover ways to serve {churchName} family and community
                </p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
                <Link to="/post">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Need
                </Link>
              </Button>
            </div>

            {/* Church-specific Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-rose-600 mb-1">Active Needs</p>
                      <p className="text-3xl font-bold text-rose-700">{filteredNeeds.length}</p>
                      <p className="text-xs text-rose-500 mt-1">In our church</p>
                    </div>
                    <div className="w-14 h-14 bg-rose-200/50 rounded-2xl flex items-center justify-center">
                      <Heart className="w-7 h-7 text-rose-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-600 mb-1">Urgent Needs</p>
                      <p className="text-3xl font-bold text-amber-700">
        {filteredNeeds.filter(need => need.urgency === "Immediate").length}
                      </p>
                      <p className="text-xs text-amber-500 mt-1">Need immediate help</p>
                    </div>
                    <div className="w-14 h-14 bg-amber-200/50 rounded-2xl flex items-center justify-center">
                      <Clock className="w-7 h-7 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-600 mb-1">Members Helped</p>
                      <p className="text-3xl font-bold text-emerald-700">23</p>
                      <p className="text-xs text-emerald-500 mt-1">This month</p>
                    </div>
                    <div className="w-14 h-14 bg-emerald-200/50 rounded-2xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Volunteers</p>
                      <p className="text-3xl font-bold text-blue-700">12</p>
                      <p className="text-xs text-blue-500 mt-1">Active this week</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-200/50 rounded-2xl flex items-center justify-center">
                      <HandHeart className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Filter Section */}
          <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                Find Service Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search" className="text-sm font-medium mb-2 block">Search Needs</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Search by keywords, location, or type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-10 bg-muted/50 border-2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-10 bg-muted/50 border-2">
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

                <div>
                  <Label className="text-sm font-medium mb-2 block">Urgency</Label>
                  <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                    <SelectTrigger className="h-10 bg-muted/50 border-2">
                      <SelectValue placeholder="All Urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map(urgency => (
                        <SelectItem key={urgency} value={urgency}>
                          {urgency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSearch} className="mt-4 w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Community Needs ({filteredNeeds.length} opportunities)
                </h2>
                <p className="text-muted-foreground">
                  Help make a difference in your community
                </p>
              </div>
            </div>

            {filteredNeeds.length === 0 ? (
              <Card className="border-0 shadow-card bg-card rounded-2xl">
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">No matching opportunities</h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Try adjusting your search criteria or check back later for new needs.
                  </p>
                  <Button asChild size="lg">
                    <Link to="/post">
                      <Plus className="w-5 h-5 mr-2" />
                      Post a New Need
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNeeds.map((need) => (
                  <Card 
                    key={need.id} 
                    className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] group"
                    onClick={() => handleCardClick(need.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{need.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{need.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{need.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Timer className="w-4 h-4" />
                              <span>{need.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge variant={need.urgency === "Immediate" ? "destructive" : need.urgency === "This Week" ? "default" : "secondary"} className="rounded-full text-xs px-3 py-1">
                              {need.urgency}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}