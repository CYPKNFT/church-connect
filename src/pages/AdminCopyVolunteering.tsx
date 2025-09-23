import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Search, Filter, MapPin, Clock, Users, Star, Calendar, ChevronRight, Timer, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AdminCopyVolunteering() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("my-commitments");

  // Mock data for volunteer commitments
  const myCommitments = [
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
      requestedDate: "3 days ago",
      rating: null
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
      description: "Prepare and deliver healthy meals",
      requestedDate: "1 day ago",
      rating: null
    },
    {
      id: "3",
      title: "Technology help for seniors",
      requester: "Community Center",
      date: "Saturday 10:00 AM",
      status: "Confirmed",
      category: "Education",
      location: "Riverside Community Center",
      estimatedTime: "3 hours",
      urgency: "Flexible",
      description: "Help seniors learn smartphone basics",
      requestedDate: "5 days ago",
      rating: null
    },
    {
      id: "4",
      title: "Garden cleanup assistance",
      requester: "Mr. Robert Williams",
      date: "Last Tuesday",
      status: "Completed",
      category: "Home & Garden",
      location: "Oak Street",
      estimatedTime: "4 hours",
      urgency: "Flexible",
      description: "Seasonal yard cleanup and leaf removal",
      requestedDate: "2 weeks ago",
      rating: 5
    }
  ];

  // Mock data for available opportunities
  const availableOpportunities = [
    {
      id: "5",
      title: "Moving assistance needed urgently",
      requester: "David Chen",
      location: "Pine Street",
      estimatedTime: "4 hours",
      category: "Moving",
      urgency: "Immediate",
      volunteers: 2,
      needed: 4,
      posted: "3 hours ago",
      description: "Need help loading truck for apartment move",
      date: "This Saturday 9:00 AM"
    },
    {
      id: "6",
      title: "Computer repair for elderly resident",
      requester: "Margaret Williams",
      location: "Senior Living Complex",
      estimatedTime: "1 hour",
      category: "Technology",
      urgency: "This Week",
      volunteers: 0,
      needed: 1,
      posted: "1 day ago",
      description: "Computer won't start, possible virus",
      date: "Flexible weekday"
    },
    {
      id: "7",
      title: "Tutoring for high school math",
      requester: "Jennifer Rodriguez",
      location: "Main Library",
      estimatedTime: "2 hours/week",
      category: "Education",
      urgency: "Flexible",
      volunteers: 1,
      needed: 1,
      posted: "2 days ago",
      description: "Regular weekly tutoring sessions",
      date: "Weekly Thursdays 4:00 PM"
    }
  ];

  const categories = ["All", "Transportation", "Meals", "Education", "Home & Garden", "Moving", "Technology"];
  const statuses = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-700 border-green-200";
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Completed": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "bg-red-100 text-red-700 border-red-200";
      case "This Week": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Flexible": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredCommitments = myCommitments.filter(commitment => {
    const matchesSearch = commitment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commitment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || commitment.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || commitment.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredOpportunities = availableOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || opportunity.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

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
              <h2 className="font-semibold text-blue-900">Admin Copy - Volunteering</h2>
              <p className="text-sm text-blue-700">Viewing volunteer activity interface</p>
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
                    Volunteering
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Track your volunteer commitments and find new opportunities to help
                  </p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
                  <Link to="/browse">
                    <Heart className="w-4 h-4 mr-2" />
                    Find Opportunities
                  </Link>
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Active Commitments</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {myCommitments.filter(c => c.status === "Confirmed" || c.status === "Pending").length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Completed</p>
                        <p className="text-2xl font-bold text-green-700">
                          {myCommitments.filter(c => c.status === "Completed").length}
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-600">Average Rating</p>
                        <p className="text-2xl font-bold text-amber-700">4.9</p>
                      </div>
                      <Star className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Hours Contributed</p>
                        <p className="text-2xl font-bold text-purple-700">47</p>
                      </div>
                      <Timer className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant={activeTab === "my-commitments" ? "default" : "outline"}
                  onClick={() => setActiveTab("my-commitments")}
                  className="rounded-xl"
                >
                  My Commitments ({myCommitments.length})
                </Button>
                <Button
                  variant={activeTab === "opportunities" ? "default" : "outline"}
                  onClick={() => setActiveTab("opportunities")}
                  className="rounded-xl"
                >
                  Available Opportunities ({availableOpportunities.length})
                </Button>
              </div>

              {/* Filters and Search */}
              <Card className="border-0 shadow-card bg-card rounded-2xl mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder={activeTab === "my-commitments" ? "Search your commitments..." : "Search opportunities..."}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {activeTab === "my-commitments" && (
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-4 py-2 border border-border rounded-xl bg-background text-sm"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      )}
                      
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

            {/* Content Based on Active Tab */}
            {activeTab === "my-commitments" ? (
              <div className="space-y-4">
                {filteredCommitments.length === 0 ? (
                  <Card className="border-0 shadow-card bg-card rounded-2xl">
                    <CardContent className="p-12 text-center">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No commitments found</h3>
                      <p className="text-muted-foreground mb-6">
                        {searchTerm || statusFilter !== "All" || categoryFilter !== "All" 
                          ? "Try adjusting your filters or search terms"
                          : "You haven't made any volunteer commitments yet. Find opportunities to help your community!"
                        }
                      </p>
                      <Button asChild>
                        <Link to="/browse">
                          <Heart className="w-4 h-4 mr-2" />
                          Find Opportunities
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredCommitments.map((commitment) => (
                    <Card 
                      key={commitment.id} 
                      className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] group"
                      onClick={() => navigate(`/volunteering/${commitment.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{commitment.title}</h3>
                                <Badge className={`${getStatusColor(commitment.status)} rounded-full text-xs px-3 py-1`}>
                                  {commitment.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                <span>View Details</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{commitment.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{commitment.requester}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{commitment.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{commitment.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Timer className="w-4 h-4" />
                                <span>{commitment.estimatedTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Badge className={`${getUrgencyColor(commitment.urgency)} rounded-full text-xs px-3 py-1`}>
                                  {commitment.urgency}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Category: {commitment.category}
                                </span>
                              </div>
                              {commitment.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="text-sm font-medium text-foreground">{commitment.rating}.0</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOpportunities.length === 0 ? (
                  <Card className="border-0 shadow-card bg-card rounded-2xl">
                    <CardContent className="p-12 text-center">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
                      <p className="text-muted-foreground mb-6">
                        {searchTerm || categoryFilter !== "All" 
                          ? "Try adjusting your filters or search terms"
                          : "No volunteer opportunities are available at the moment. Check back later!"
                        }
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredOpportunities.map((opportunity) => (
                    <Card 
                      key={opportunity.id} 
                      className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{opportunity.title}</h3>
                                <Badge className={`${getUrgencyColor(opportunity.urgency)} rounded-full text-xs px-3 py-1`}>
                                  {opportunity.urgency}
                                </Badge>
                              </div>
                              <Button size="sm" className="rounded-xl">
                                Volunteer
                              </Button>
                            </div>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{opportunity.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{opportunity.requester}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{opportunity.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{opportunity.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Timer className="w-4 h-4" />
                                <span>{opportunity.estimatedTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-primary font-medium">
                                  {opportunity.volunteers}/{opportunity.needed} volunteers needed
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  Posted {opportunity.posted}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                Category: {opportunity.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}