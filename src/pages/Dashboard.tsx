import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Clock, CheckCircle, Users, Plus, Calendar, Star, LayoutDashboard, BookOpen, UserCheck, Settings, TrendingUp, Activity, MapPin, MessageSquare, Award, Bell, Filter, Search, ChevronRight, HandHeart, Target, Timer, FileText, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMembership } from "@/hooks/useMembership";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { displayName, churchName } = useMembership();
  
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
      responses: 12
    },
    {
      id: "2", 
      title: "Garden cleanup and maintenance",
      description: "Looking for help with seasonal garden cleanup, pruning, and planting new flowers.",
      status: "In Progress",
      volunteers: 2,
      posted: "5 days ago",
      category: "Home & Garden",
      urgency: "Flexible",
      location: "Maple Street",
      estimatedTime: "3-4 hours",
      responses: 8
    },
    {
      id: "3",
      title: "Pet sitting for weekend trip",
      description: "Need someone to watch my cat Whiskers while I visit family this weekend.",
      status: "Fulfilled",
      volunteers: 1,
      posted: "1 week ago",
      category: "Pet Care",
      urgency: "Immediate",
      location: "Oak Avenue",
      estimatedTime: "2 days",
      responses: 15
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
    { icon: LayoutDashboard, label: "Dashboard", active: true, path: "/dashboard" },
    { icon: Heart, label: "My Needs", path: "/my-needs" },
    { icon: Users, label: "Volunteering", path: "/volunteering" },
    { icon: BookOpen, label: "Browse", path: "/browse" },
    { icon: MessageSquare, label: "Feedback", path: "/feedback" },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back, {displayName ?? "Friend"}! Here's your community impact overview
                </p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
                <Link to="/post">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Need
                </Link>
              </Button>
            </div>

            {/* Pastel Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-rose-600 mb-1">Needs Posted</p>
                      <p className="text-3xl font-bold text-rose-700">12</p>
                      <p className="text-xs text-rose-500 mt-1">+3 this week</p>
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
                      <p className="text-sm font-medium text-amber-600 mb-1">Times Helped</p>
                      <p className="text-3xl font-bold text-amber-700">28</p>
                      <p className="text-xs text-amber-500 mt-1">+5 this week</p>
                    </div>
                    <div className="w-14 h-14 bg-amber-200/50 rounded-2xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-600 mb-1">Community Rating</p>
                      <p className="text-3xl font-bold text-emerald-700">4.9</p>
                      <p className="text-xs text-emerald-500 mt-1">Based on 23 reviews</p>
                    </div>
                    <div className="w-14 h-14 bg-emerald-200/50 rounded-2xl flex items-center justify-center">
                      <Star className="w-7 h-7 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Active Needs</p>
                      <p className="text-3xl font-bold text-blue-700">2</p>
                      <p className="text-xs text-blue-500 mt-1">Updated today</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-200/50 rounded-2xl flex items-center justify-center">
                      <Clock className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Section: My Activities & Achievements */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* My Needs - Enhanced */}
            <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    My Posted Needs
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  {userNeeds.slice(0, 2).map((need) => (
                    <div key={need.id} className="p-4 bg-transparent border border-border rounded-xl hover:shadow-gentle transition-all duration-200 group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{need.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{need.description}</p>
                        </div>
                        <Badge 
                          variant={need.status === "Active" ? "default" : need.status === "In Progress" ? "secondary" : "outline"}
                          className="rounded-full text-xs px-2 py-1 ml-2"
                        >
                          {need.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {need.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {need.estimatedTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-primary font-medium flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {need.volunteers}
                          </span>
                          <span className="text-xs text-accent font-medium flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {need.responses}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-full h-6 px-3 text-xs group-hover:bg-primary group-hover:text-white" asChild>
                          <Link to="/my-needs">
                            View <ChevronRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl text-sm mt-auto" asChild>
                  <Link to="/my-needs">
                    View All My Needs <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* My Volunteering - Enhanced */}
            <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">
                      <HandHeart className="w-4 h-4 text-accent" />
                    </div>
                    My Volunteering
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  {userVolunteering.slice(0, 2).map((volunteer) => (
                    <div key={volunteer.id} className="p-4 bg-transparent border border-border rounded-xl hover:shadow-gentle transition-all duration-200 group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{volunteer.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{volunteer.description}</p>
                        </div>
                        <Badge 
                          variant={volunteer.status === "Confirmed" ? "default" : "secondary"}
                          className="rounded-full text-xs px-2 py-1 ml-2"
                        >
                          {volunteer.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1 font-medium">
                          <Users className="w-3 h-3" />
                          {volunteer.requester}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {volunteer.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                          {volunteer.category}
                        </span>
                        <Button variant="ghost" size="sm" className="rounded-full h-6 px-3 text-xs group-hover:bg-accent group-hover:text-white" asChild>
                          <Link to="/volunteering">
                            {volunteer.status === "Confirmed" ? "Details" : "Confirm"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl text-sm mt-auto" asChild>
                  <Link to="/volunteering">
                    View All My Volunteering <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievements & Progress */}
            <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-transparent border border-border rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-foreground">{achievement.label}</h4>
                        <span className="text-xs text-muted-foreground">
                          {achievement.current}/{achievement.target}
                        </span>
                      </div>
                      <Progress value={achievement.progress} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {achievement.progress}% complete
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl text-sm mt-auto">
                  <Target className="w-4 h-4 mr-2" />
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Community Needs Section */}
          <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  Urgent Community Needs
                </CardTitle>
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedFilter} 
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background"
                  >
                    <option value="All">All Categories</option>
                    <option value="Moving">Moving</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                  </select>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <Link to="/browse">View All</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityNeeds.map((need) => (
                  <div key={need.id} className="p-5 bg-transparent border border-border rounded-xl hover:shadow-gentle transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <Badge 
                        variant={need.urgency === "Immediate" ? "destructive" : need.urgency === "This Week" ? "default" : "secondary"}
                        className="text-xs px-2 py-1 rounded-full"
                      >
                        {need.urgency}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{need.posted}</span>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{need.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{need.description}</p>
                    
                    <div className="space-y-2 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>Posted by {need.requester}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{need.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{need.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-emerald-600 bg-transparent border border-emerald-600/20 px-2 py-1 rounded-full">
                          {need.volunteers}/{need.needed} volunteers
                        </span>
                        <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                          {need.category}
                        </span>
                      </div>
                      <Button size="sm" className="rounded-full text-xs px-4">
                        Help
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - Enhanced */}
          <Card className="border-0 shadow-card bg-card hover:shadow-gentle transition-all duration-300 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-violet-500/10 rounded-xl flex items-center justify-center">
                    <Activity className="w-4 h-4 text-violet-600" />
                  </div>
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  const colorClass = {
                    emerald: "bg-transparent border border-emerald-600/20 hover:bg-emerald-50/10",
                    rose: "bg-transparent border border-rose-600/20 hover:bg-rose-50/10", 
                    amber: "bg-transparent border border-amber-600/20 hover:bg-amber-50/10",
                    blue: "bg-transparent border border-blue-600/20 hover:bg-blue-50/10"
                  }[activity.color];
                  
                  const iconColorClass = {
                    emerald: "bg-emerald-100 text-emerald-600",
                    rose: "bg-rose-100 text-rose-600",
                    amber: "bg-amber-100 text-amber-600", 
                    blue: "bg-blue-100 text-blue-600"
                  }[activity.color];

                  return (
                    <div key={activity.id} className={`flex items-start gap-4 p-4 ${colorClass} rounded-xl transition-all duration-200 cursor-pointer group`}>
                      <div className={`w-10 h-10 ${iconColorClass} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{activity.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{activity.description}</p>
                        <span className="text-xs text-muted-foreground font-medium">{activity.time}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}