import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Clock, CheckCircle, Users, Plus, Calendar, Star, LayoutDashboard, BookOpen, UserCheck, Settings, TrendingUp, Activity, MapPin, MessageSquare, Award, Bell, Filter, Search, ChevronRight, HandHeart, Target, Timer, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  
  const userNeeds = [
    {
      id: "1",
      title: "Weekly grocery shopping assistance",
      description: "Need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help.",
      status: "Active",
      volunteers: 5,
      posted: "2 days ago",
      category: "Groceries",
      urgency: "This Week",
      location: "Downtown Market District",
      estimatedTime: "2 hours",
      responses: 12,
      applicants: [
        { name: "Mike Thompson", rating: 4.8, avatar: "MT", joinedAgo: "1 week ago" },
        { name: "Sarah Chen", rating: 4.9, avatar: "SC", joinedAgo: "3 days ago" },
        { name: "David Wilson", rating: 4.7, avatar: "DW", joinedAgo: "5 days ago" },
        { name: "Lisa Rodriguez", rating: 5.0, avatar: "LR", joinedAgo: "2 days ago" },
        { name: "James Kim", rating: 4.6, avatar: "JK", joinedAgo: "1 day ago" }
      ]
    },
    {
      id: "2", 
      title: "Garden cleanup and maintenance",
      description: "Looking for help with seasonal garden cleanup, pruning, and planting new flowers. This includes raking leaves, trimming bushes, and planting spring bulbs.",
      status: "In Progress",
      volunteers: 2,
      posted: "5 days ago",
      category: "Home & Garden",
      urgency: "Flexible",
      location: "Maple Street",
      estimatedTime: "3-4 hours",
      responses: 8,
      applicants: [
        { name: "Tom Johnson", rating: 4.9, avatar: "TJ", joinedAgo: "2 days ago" },
        { name: "Emily Davis", rating: 4.8, avatar: "ED", joinedAgo: "4 days ago" }
      ]
    },
    {
      id: "3",
      title: "Pet sitting for weekend trip",
      description: "Need someone to watch my cat Whiskers while I visit family this weekend. Just needs feeding, water, and some companionship.",
      status: "Fulfilled",
      volunteers: 1,
      posted: "1 week ago",
      category: "Pet Care",
      urgency: "Immediate",
      location: "Oak Avenue",
      estimatedTime: "2 days",
      responses: 15,
      applicants: [
        { name: "Alex Martinez", rating: 5.0, avatar: "AM", joinedAgo: "1 week ago" }
      ]
    },
    {
      id: "4",
      title: "Computer help for online banking",
      description: "Need assistance setting up online banking on my computer. I'm not comfortable doing this alone and would appreciate guidance.",
      status: "Active", 
      volunteers: 0,
      posted: "1 day ago",
      category: "Technology",
      urgency: "This Week",
      location: "Pine Avenue",
      estimatedTime: "1 hour",
      responses: 3,
      applicants: []
    },
    {
      id: "5",
      title: "Meal prep assistance",
      description: "Recovering from surgery and need help with meal preparation for the week. Simple, healthy meals would be perfect.",
      status: "Active",
      volunteers: 3,
      posted: "3 days ago", 
      category: "Meals",
      urgency: "Immediate",
      location: "Oak Street",
      estimatedTime: "2-3 hours",
      responses: 9,
      applicants: [
        { name: "Maria Santos", rating: 4.9, avatar: "MS", joinedAgo: "1 day ago" },
        { name: "Robert Lee", rating: 4.7, avatar: "RL", joinedAgo: "2 days ago" },
        { name: "Ana Gutierrez", rating: 5.0, avatar: "AG", joinedAgo: "3 days ago" }
      ]
    }
  ];

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
      description: "Drive to routine cardiology checkup"
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
      description: "Prepare and deliver healthy meals"
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
      description: "Help seniors learn smartphone basics"
    }
  ];

  const communityNeeds = [
    {
      id: "1",
      title: "Moving assistance needed urgently",
      requester: "David Chen",
      location: "Pine Street",
      estimatedTime: "4 hours",
      category: "Moving",
      urgency: "Immediate",
      volunteers: 2,
      needed: 4,
      posted: "3 hours ago",
      description: "Need help loading truck for apartment move"
    },
    {
      id: "2",
      title: "Computer repair for elderly resident",
      requester: "Margaret Williams",
      location: "Senior Living Complex",
      estimatedTime: "1 hour",
      category: "Technology",
      urgency: "This Week",
      volunteers: 0,
      needed: 1,
      posted: "1 day ago",
      description: "Computer won't start, possible virus"
    },
    {
      id: "3",
      title: "Tutoring for high school math",
      requester: "Jennifer Rodriguez",
      location: "Main Library",
      estimatedTime: "2 hours/week",
      category: "Education",
      urgency: "Flexible",
      volunteers: 1,
      needed: 1,
      posted: "2 days ago",
      description: "Regular weekly tutoring sessions"
    }
  ];

  const recentActivity = [
    {
      id: "1",
      type: "completed",
      title: "Completed garden cleanup assistance",
      description: "You helped the Johnson family with their seasonal cleanup",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "emerald"
    },
    {
      id: "2",
      type: "volunteer",
      title: "New volunteer for your grocery request",
      description: "Mike Thompson offered to help with weekly shopping",
      time: "5 hours ago",
      icon: Heart,
      color: "rose"
    },
    {
      id: "3",
      type: "review",
      title: "Received a 5-star review",
      description: "Excellent transportation help - very reliable!",
      time: "1 day ago",
      icon: Star,
      color: "amber"
    },
    {
      id: "4",
      type: "message",
      title: "New message from Sarah",
      description: "Thanks so much for the pet sitting help!",
      time: "2 days ago",
      icon: MessageSquare,
      color: "blue"
    }
  ];

  const achievements = [
    { label: "Helpful Neighbor", progress: 80, target: 10, current: 8 },
    { label: "Community Hero", progress: 60, target: 25, current: 15 },
    { label: "Reliable Helper", progress: 90, target: 5, current: 4.5 }
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Heart, label: "My Needs" },
    { icon: Users, label: "Volunteering" },
    { icon: BookOpen, label: "Browse" },
    { icon: UserCheck, label: "Profile" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="flex">
        {/* Clean Left Sidebar */}
        <div className="w-64 bg-white shadow-gentle border-r border-border/50 min-h-screen">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">CommunityConnect</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-primary/5 ${
                  item.active 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back, Sarah! Manage your community connections
                </p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
                <Link to="/post">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Need
                </Link>
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/30 p-1 h-12 rounded-2xl">
              <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-card">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="my-needs" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-card">
                <Heart className="w-4 h-4 mr-2" />
                My Needs
              </TabsTrigger>
              <TabsTrigger value="volunteering" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-card">
                <HandHeart className="w-4 h-4 mr-2" />
                Volunteering
              </TabsTrigger>
              <TabsTrigger value="community" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-card">
                <Users className="w-4 h-4 mr-2" />
                Community
              </TabsTrigger>
            </TabsList>

            {/* My Needs Tab Content */}
            <TabsContent value="my-needs" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">My Posted Needs</h2>
                  <p className="text-muted-foreground">Manage your requests for help from the community</p>
                </div>
                <div className="flex items-center gap-3">
                  <select 
                    value={selectedFilter} 
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="text-sm border border-border rounded-lg px-3 py-2 bg-background"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Fulfilled">Fulfilled</option>
                  </select>
                  <Button asChild>
                    <Link to="/post">
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Need
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Needs</p>
                        <p className="text-2xl font-bold text-blue-700">{userNeeds.length}</p>
                      </div>
                      <Heart className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-card bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-600">Active</p>
                        <p className="text-2xl font-bold text-emerald-700">{userNeeds.filter(n => n.status === "Active").length}</p>
                      </div>
                      <Clock className="w-8 h-8 text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-card bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-600">Total Volunteers</p>
                        <p className="text-2xl font-bold text-amber-700">{userNeeds.reduce((acc, need) => acc + need.volunteers, 0)}</p>
                      </div>
                      <Users className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-card bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Total Responses</p>
                        <p className="text-2xl font-bold text-purple-700">{userNeeds.reduce((acc, need) => acc + need.responses, 0)}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Needs List */}
              <div className="space-y-4">
                {userNeeds.map((need) => (
                  <Card key={need.id} className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{need.title}</h3>
                            <Badge 
                              variant={need.status === "Active" ? "default" : need.status === "In Progress" ? "secondary" : "outline"}
                              className="rounded-full"
                            >
                              {need.status}
                            </Badge>
                            <Badge variant="outline" className="rounded-full">
                              {need.category}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{need.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{need.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Timer className="w-4 h-4" />
                              <span>{need.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{need.volunteers} volunteers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span>{need.responses} responses</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-full hover:bg-destructive hover:text-destructive-foreground">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Applicants Section */}
                      {need.applicants.length > 0 && (
                        <div className="border-t border-border/50 pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-foreground">Volunteer Applications</h4>
                            <Badge variant="outline" className="text-xs">
                              {need.applicants.length} {need.applicants.length === 1 ? 'applicant' : 'applicants'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {need.applicants.map((applicant, index) => (
                              <div key={index} className="p-3 bg-gradient-to-r from-gray-50/80 to-gray-50/40 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-semibold text-primary">{applicant.avatar}</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-sm text-foreground">{applicant.name}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                      <span>{applicant.rating}</span>
                                      <span>•</span>
                                      <span>{applicant.joinedAgo}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" className="flex-1 text-xs rounded-full">
                                    Accept
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-xs rounded-full">
                                    Message
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {need.applicants.length === 0 && need.status === "Active" && (
                        <div className="border-t border-border/50 pt-4">
                          <div className="text-center py-4 text-muted-foreground">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No volunteers yet. Share your need to get more visibility!</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Overview Tab (placeholder for now) */}
            <TabsContent value="overview">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Overview Tab</h3>
                <p className="text-muted-foreground">Coming next...</p>
              </div>
            </TabsContent>

            {/* Other tabs placeholders */}
            <TabsContent value="volunteering">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Volunteering Tab</h3>
                <p className="text-muted-foreground">Coming next...</p>
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Community Tab</h3>
                <p className="text-muted-foreground">Coming next...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}