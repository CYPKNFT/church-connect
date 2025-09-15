import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { Heart, Clock, Users, Plus, LayoutDashboard, BookOpen, UserCheck, Search, Filter, MapPin, Timer, MessageSquare, ChevronRight, HandHeart, Target, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function BrowseDashboard() {
  const { user } = useAuth();
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
      description: "Mrs. Johnson, 85, has been a faithful church member for 40 years. After a recent fall, she's having difficulty getting to the grocery store. She needs someone to help with weekly shopping - just basic essentials like milk, bread, and fresh produce.",
      category: "Groceries",
      urgency: "This Week" as const,
      location: "Downtown area, 2 miles from church",
      estimatedTime: "1-2 hours",
      postedBy: "Sarah Miller",
      postedAt: "2 days ago"
    },
    {
      id: "2", 
      title: "Transportation to medical center",
      description: "Brother Robert needs reliable transportation for his cancer treatment appointments. His vehicle is being repaired and these sessions are critical for his ongoing care.",
      category: "Transportation",
      urgency: "Immediate" as const,
      location: "Medical District",
      estimatedTime: "2-3 hours total",
      postedBy: "Robert Thompson",
      postedAt: "4 hours ago"
    },
    {
      id: "3",
      title: "Meal train for new baby blessing",
      description: "The Johnson family just welcomed their third child - a beautiful baby girl! Mom had a C-section and dad is trying to balance work with helping at home. We're organizing a meal train for the next two weeks.",
      category: "Meals",
      urgency: "This Week" as const,
      location: "Oakwood subdivision", 
      estimatedTime: "30 minutes delivery",
      postedBy: "Linda Chen",
      postedAt: "1 day ago"
    },
    {
      id: "4",
      title: "Emergency home repair for single mom",
      description: "Jennifer is a single mother working two jobs. Her kitchen faucet is leaking badly and has started causing water damage to the cabinet below. She can't afford a professional plumber right now.",
      category: "Home Repair",
      urgency: "Immediate" as const,
      location: "Maple Street neighborhood",
      estimatedTime: "1-2 hours",
      postedBy: "Jennifer Davis",
      postedAt: "1 day ago"
    },
    {
      id: "5",
      title: "Childcare during physical therapy",
      description: "Amanda needs someone to watch her 3-year-old son while she attends physical therapy appointments twice a week. She's recovering from a car accident and these appointments are essential.",
      category: "Childcare",
      urgency: "This Week" as const,
      location: "Westside neighborhood",
      estimatedTime: "2 hours, twice weekly",
      postedBy: "Amanda Rodriguez",
      postedAt: "3 days ago"
    },
    {
      id: "6",
      title: "Yard cleanup after storm damage",
      description: "The recent storms knocked down several large branches in Mr. Peterson's yard. He's 78 and can't handle the cleanup himself. Great opportunity for youth group or men's ministry.",
      category: "Home & Garden",
      urgency: "Flexible" as const,
      location: "Pine Ridge community",
      estimatedTime: "2-3 hours",
      postedBy: "Mike Williams",
      postedAt: "2 days ago"
    },
    {
      id: "7",
      title: "Technology training for seniors",
      description: "Our senior group wants to learn how to use smartphones and tablets to stay connected with family. We need patient volunteers to teach basic functions like texting, video calls, and email.",
      category: "Other",
      urgency: "Flexible" as const,
      location: "Church fellowship hall",
      estimatedTime: "2 hours weekly",
      postedBy: "Dorothy Stevens",
      postedAt: "5 days ago"
    },
    {
      id: "8",
      title: "Moving assistance for college student",
      description: "Emma is starting her junior year and needs help moving her belongings from her dorm to a new apartment. She's on a tight budget and would really appreciate some strong backs and helpful hands.",
      category: "Transportation",
      urgency: "This Week" as const,
      location: "University area",
      estimatedTime: "3-4 hours",
      postedBy: "Emma Wilson",
      postedAt: "1 day ago"
    },
    {
      id: "9",
      title: "Prayer and visitation for hospital patient",
      description: "Brother James is recovering from surgery and feeling isolated. He would love visits from church members and prayers for his healing. Hospital allows visitors from 2-8 PM daily.",
      category: "Prayer Support",
      urgency: "This Week" as const,
      location: "Regional Medical Center",
      estimatedTime: "30-60 minutes",
      postedBy: "Pastor David",
      postedAt: "3 hours ago"
    },
    {
      id: "10",
      title: "Furniture donation pickup needed",
      description: "The Martinez family is donating furniture to help a family in need, but they need someone with a truck to pick it up and deliver it. Items include a couch, dining table, and dresser.",
      category: "Transportation",
      urgency: "Flexible" as const,
      location: "Riverside subdivision",
      estimatedTime: "2-3 hours",
      postedBy: "Carlos Martinez",
      postedAt: "2 days ago"
    },
    {
      id: "11",
      title: "Computer repair for church office",
      description: "Our church office computer is running very slowly and keeps freezing. We think it might have a virus or need a cleanup. Anyone with IT skills would be a huge blessing!",
      category: "Other",
      urgency: "This Week" as const,
      location: "Church office",
      estimatedTime: "1-2 hours",
      postedBy: "Church Admin",
      postedAt: "1 day ago"
    },
    {
      id: "12",
      title: "Elderly companion for grocery shopping",
      description: "Mrs. Foster is 82 and gets anxious shopping alone since her husband passed. She would love a friendly companion to help her with weekly grocery trips and provide moral support.",
      category: "Groceries",
      urgency: "Flexible" as const,
      location: "Westfield Shopping Center",
      estimatedTime: "1.5-2 hours",
      postedBy: "Ruth Foster",
      postedAt: "4 days ago"
    }
  ];

  const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Childcare", "Home & Garden", "Prayer Support", "Other"];
  const urgencyLevels = ["All", "Immediate", "This Week", "Flexible"];

  const [filteredNeeds, setFilteredNeeds] = useState(churchNeeds);

  // Pagination logic
  const totalPages = Math.ceil(filteredNeeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNeeds = filteredNeeds.slice(startIndex, startIndex + itemsPerPage);

  const handleVolunteer = (needId: string) => {
    alert(`Thanks for volunteering to help with need ${needId}! In a real app, this would open a communication interface.`);
  };

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
    setCurrentPage(1); // Reset to first page when filtering
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false, path: "/dashboard" },
    { icon: Heart, label: "My Needs", path: "/my-needs" },
    { icon: Users, label: "Volunteering", path: "/volunteering" },
    { icon: BookOpen, label: "Browse", active: true, path: "/browse" },
    { icon: FileText, label: "Template", path: "/template" },
    { icon: MessageSquare, label: "Feedback", path: "/feedback" },
    { icon: MessageSquare, label: "Feedback FAIL", path: "/feedback-fail" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Clean Left Sidebar */}
        <div className="w-64 bg-card shadow-gentle border-r border-border min-h-screen">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">ChurchConnect</h2>
                <p className="text-xs text-muted-foreground">{churchName}</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-primary/5 ${
                  item.active 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
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

          {/* Church Needs Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Current Church Needs</h2>
                <p className="text-muted-foreground">
                  Found {filteredNeeds.length} way{filteredNeeds.length !== 1 ? 's' : ''} to serve your church family
                </p>
              </div>
              
              {/* Pagination aligned to the right */}
              {totalPages > 1 && (
                <div className="flex justify-end">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNeeds.map(need => (
                <NeedCard
                  key={need.id}
                  {...need}
                  onVolunteer={handleVolunteer}
                />
              ))}
            </div>
          </div>

          {filteredNeeds.length === 0 && (
            <Card className="border-0 shadow-card bg-card text-center p-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                No needs match your search
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or clearing the filters to discover more ways to serve.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedUrgency("All");
                setFilteredNeeds(churchNeeds);
              }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </Card>
          )}

          {/* Call to Action */}
          {filteredNeeds.length > 0 && (
            <Card className="border-0 shadow-card bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Serve Your Church Family?
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Every act of service strengthens our church community and reflects God's love in action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-accent hover:bg-accent-hover px-6">
                    Join a Ministry Team
                  </Button>
                  <Button variant="outline" className="border-2">
                    Learn About Serving
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}