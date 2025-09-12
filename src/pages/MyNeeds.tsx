import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Search, Filter, Plus, MapPin, Clock, Users, MessageSquare, Edit, Archive, ChevronRight, Calendar, Timer, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function MyNeeds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    document.title = "My Needs | ChurchConnect";
  }, []);

  const userNeeds = [
    {
      id: "1",
      title: "Weekly grocery shopping assistance",
      description: "Need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help with carrying bags and reaching items on high shelves.",
      status: "Active",
      volunteers: 5,
      posted: "2 days ago",
      category: "Groceries",
      urgency: "This Week",
      location: "Downtown Market District",
      estimatedTime: "2 hours",
      responses: 12,
      views: 45,
      lastUpdated: "Yesterday"
    },
    {
      id: "2", 
      title: "Garden cleanup and maintenance",
      description: "Looking for help with seasonal garden cleanup, pruning, and planting new flowers. My back issues prevent me from doing heavy lifting and bending.",
      status: "In Progress",
      volunteers: 2,
      posted: "5 days ago",
      category: "Home & Garden",
      urgency: "Flexible",
      location: "Maple Street",
      estimatedTime: "3-4 hours",
      responses: 8,
      views: 32,
      lastUpdated: "2 days ago"
    },
    {
      id: "3",
      title: "Pet sitting for weekend trip",
      description: "Need someone to watch my cat Whiskers while I visit family this weekend. Just needs feeding twice a day and some company.",
      status: "Fulfilled",
      volunteers: 1,
      posted: "1 week ago",
      category: "Pet Care",
      urgency: "Immediate",
      location: "Oak Avenue",
      estimatedTime: "2 days",
      responses: 15,
      views: 78,
      lastUpdated: "3 days ago"
    },
    {
      id: "4",
      title: "Technology help setting up new tablet",
      description: "Recently got a tablet for staying in touch with family but need help setting up apps and learning how to use video calls.",
      status: "Active",
      volunteers: 0,
      posted: "3 days ago",
      category: "Technology",
      urgency: "This Week",
      location: "Senior Living Center",
      estimatedTime: "1-2 hours",
      responses: 3,
      views: 18,
      lastUpdated: "Today"
    },
    {
      id: "5",
      title: "Transportation to medical appointments",
      description: "Need reliable transportation to weekly physical therapy sessions. My car is in the shop for repairs.",
      status: "Active",
      volunteers: 2,
      posted: "4 days ago",
      category: "Transportation",
      urgency: "Immediate",
      location: "Central Medical Center",
      estimatedTime: "3 hours",
      responses: 7,
      views: 29,
      lastUpdated: "Yesterday"
    },
    {
      id: "6",
      title: "Moving help for apartment relocation",
      description: "Moving to a smaller apartment next month and need help packing and loading boxes. Mostly books and household items.",
      status: "Archived",
      volunteers: 4,
      posted: "2 weeks ago",
      category: "Moving",
      urgency: "Flexible",
      location: "Pine Street",
      estimatedTime: "6 hours",
      responses: 20,
      views: 95,
      lastUpdated: "1 week ago"
    }
  ];

  const categories = ["All", "Groceries", "Home & Garden", "Pet Care", "Technology", "Transportation", "Moving"];
  const statuses = ["All", "Active", "In Progress", "Fulfilled", "Archived"];

  const filteredNeeds = userNeeds.filter(need => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || need.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || need.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Fulfilled": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Archived": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "bg-red-100 text-red-700 border-red-200";
      case "This Week": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Flexible": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                My Needs
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage and track all your community requests
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
              <Link to="/post">
                <Plus className="w-4 h-4 mr-2" />
                Post New Need
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-card bg-gradient-to-br from-rose-50 to-pink-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-rose-600">Total Posted</p>
                    <p className="text-2xl font-bold text-rose-700">{userNeeds.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-rose-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-green-50 to-emerald-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Active</p>
                    <p className="text-2xl font-bold text-green-700">
                      {userNeeds.filter(n => n.status === "Active").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-blue-50 to-indigo-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Fulfilled</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {userNeeds.filter(n => n.status === "Fulfilled").length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-amber-50 to-orange-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">Total Views</p>
                    <p className="text-2xl font-bold text-amber-700">
                      {userNeeds.reduce((sum, need) => sum + need.views, 0)}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="border-0 shadow-card bg-white rounded-2xl mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search your needs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-border rounded-xl bg-background text-sm"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-border rounded-xl bg-background text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
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
            <Card className="border-0 shadow-card bg-white rounded-2xl">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No needs found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== "All" || categoryFilter !== "All" 
                    ? "Try adjusting your filters or search terms"
                    : "You haven't posted any needs yet. Get started by posting your first need!"
                  }
                </p>
                <Button asChild>
                  <Link to="/post">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Need
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredNeeds.map((need) => (
              <Card key={need.id} className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{need.title}</h3>
                        <Badge className={`${getStatusColor(need.status)} rounded-full text-xs px-3 py-1`}>
                          {need.status}
                        </Badge>
                        <Badge className={`${getUrgencyColor(need.urgency)} rounded-full text-xs px-3 py-1`}>
                          {need.urgency}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{need.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{need.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          <span>{need.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Posted {need.posted}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{need.views} views</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-2 text-primary font-medium">
                          <Users className="w-4 h-4" />
                          {need.volunteers} volunteers
                        </span>
                        <span className="flex items-center gap-2 text-accent font-medium">
                          <MessageSquare className="w-4 h-4" />
                          {need.responses} responses
                        </span>
                        <span className="text-muted-foreground">
                          Last updated {need.lastUpdated}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                      </Button>
                      {need.status === "Active" && (
                        <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground">
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}