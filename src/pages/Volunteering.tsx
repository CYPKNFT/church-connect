import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { HandHeart, Search, Filter, Calendar, MapPin, Clock, Users, MessageSquare, CheckCircle, Star, ChevronRight, Timer, Eye, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Volunteering() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const userVolunteering = [
    {
      id: "1",
      title: "Transportation to medical appointment",
      requester: "Mrs. Eleanor Johnson",
      date: "Tomorrow 2:00 PM",
      status: "Confirmed",
      category: "Transportation",
      location: "Central Medical Center",
      estimatedTime: "2 hours",
      urgency: "Immediate",
      description: "Drive to routine cardiology checkup",
      posted: "3 days ago",
      rating: null,
      feedback: null,
      contactPhone: "(555) 123-4567"
    },
    {
      id: "2",
      title: "Meal preparation for new parents", 
      requester: "The Smith Family",
      date: "Friday 6:00 PM",
      status: "Pending",
      category: "Meals",
      location: "Riverside Neighborhood",
      estimatedTime: "1.5 hours",
      urgency: "This Week",
      description: "Prepare and deliver healthy meals for family with newborn",
      posted: "1 day ago",
      rating: null,
      feedback: null,
      contactPhone: "(555) 987-6543"
    },
    // ... more volunteering items
  ];

  const categories = ["All", "Transportation", "Meals", "Education", "Home & Garden", "Pet Care", "Moving", "Groceries"];
  const statuses = ["All", "Confirmed", "Pending", "Scheduled", "Completed"];

  const filteredVolunteering = userVolunteering.filter(volunteer => {
    const matchesSearch = volunteer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.requester.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || volunteer.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || volunteer.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-700 border-green-200";
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Scheduled": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
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

  const totalVolunteering = userVolunteering.length;
  const completedVolunteering = userVolunteering.filter(v => v.status === "Completed").length;
  const upcomingVolunteering = userVolunteering.filter(v => v.status === "Confirmed" || v.status === "Scheduled").length;
  const averageRating = userVolunteering.filter(v => v.rating).reduce((sum, v) => sum + (v.rating || 0), 0) / userVolunteering.filter(v => v.rating).length;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="flex-1 p-6 lg:p-8">
          <div className="mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    My Volunteering
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Track your community service and impact
                  </p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
                  <Link to="/browse">
                    <Search className="w-4 h-4 mr-2" />
                    Find More Ways to Help
                  </Link>
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-600">Total Volunteering</p>
                        <p className="text-2xl font-bold text-emerald-700">{totalVolunteering}</p>
                      </div>
                      <HandHeart className="w-8 h-8 text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Completed</p>
                        <p className="text-2xl font-bold text-blue-700">{completedVolunteering}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-600">Upcoming</p>
                        <p className="text-2xl font-bold text-amber-700">{upcomingVolunteering}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-rose-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-rose-700">
                          {averageRating ? averageRating.toFixed(1) : "N/A"}
                        </p>
                      </div>
                      <Star className="w-8 h-8 text-rose-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card className="border-0 shadow-card bg-card rounded-2xl mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search your volunteering activities..."
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

            {/* Volunteering List */}
            <div className="space-y-4">
              {filteredVolunteering.length === 0 ? (
                <Card className="border-0 shadow-card bg-card rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <HandHeart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No volunteering activities found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm || statusFilter !== "All" || categoryFilter !== "All" 
                        ? "Try adjusting your filters or search terms"
                        : "You haven't volunteered for anything yet. Start making a difference in your community!"
                      }
                    </p>
                    <Button asChild>
                      <Link to="/browse">
                        <Search className="w-4 h-4 mr-2" />
                        Find Ways to Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredVolunteering.map((volunteer) => (
                  <Card 
                    key={volunteer.id} 
                    className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] group"
                    onClick={() => navigate(`/volunteering/${volunteer.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{volunteer.title}</h3>
                            <Badge className={`${getStatusColor(volunteer.status)} rounded-full text-xs px-3 py-1`}>
                              {volunteer.status}
                            </Badge>
                            <Badge className={`${getUrgencyColor(volunteer.urgency)} rounded-full text-xs px-3 py-1`}>
                              {volunteer.urgency}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">{volunteer.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{volunteer.requester}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{volunteer.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{volunteer.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Timer className="w-4 h-4" />
                              <span>{volunteer.estimatedTime}</span>
                            </div>
                          </div>

                          {volunteer.status === "Completed" && volunteer.rating && (
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-emerald-600" />
                                <span className="font-medium text-emerald-800">Completed with {volunteer.rating}★ rating</span>
                              </div>
                              {volunteer.feedback && (
                                <p className="text-emerald-700 text-sm italic">"{volunteer.feedback}"</p>
                              )}
                            </div>
                          )}
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