import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, CheckCircle, Users, Plus, Calendar, Star, LayoutDashboard, BookOpen, UserCheck, Settings, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const userNeeds = [
    {
      id: "1",
      title: "Need help with groceries",
      status: "Active",
      volunteers: 3,
      posted: "2 days ago",
      category: "Groceries"
    },
    {
      id: "2", 
      title: "Yard work assistance",
      status: "Completed",
      volunteers: 1,
      posted: "1 week ago",
      category: "Home & Garden"
    }
  ];

  const userVolunteering = [
    {
      id: "1",
      title: "Transportation to doctor appointment",
      requester: "Mrs. Johnson",
      date: "Tomorrow 2:00 PM",
      status: "Confirmed",
      category: "Transportation"
    },
    {
      id: "2",
      title: "Meal delivery for new parents", 
      requester: "The Smith Family",
      date: "Friday 6:00 PM",
      status: "Pending",
      category: "Meals"
    }
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back, Sarah! Here's your community impact overview
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
              <Card className="border-0 shadow-card bg-gradient-to-br from-rose-50 to-pink-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
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

              <Card className="border-0 shadow-card bg-gradient-to-br from-amber-50 to-orange-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
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

              <Card className="border-0 shadow-card bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
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

              <Card className="border-0 shadow-card bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
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

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* My Needs */}
            <Card className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  My Posted Needs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userNeeds.map((need) => (
                  <div key={need.id} className="p-5 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 hover:shadow-gentle transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground text-lg">{need.title}</h3>
                      <Badge 
                        variant={need.status === "Active" ? "default" : "secondary"}
                        className="rounded-full px-3 py-1"
                      >
                        {need.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {need.category} • {need.posted}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {need.volunteers} volunteer{need.volunteers !== 1 ? 's' : ''} interested
                      </span>
                      <Button variant="outline" size="sm" className="rounded-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl mt-4" asChild>
                  <Link to="/post">Post New Need</Link>
                </Button>
              </CardContent>
            </Card>

            {/* My Volunteering */}
            <Card className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  My Volunteering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userVolunteering.map((volunteer) => (
                  <div key={volunteer.id} className="p-5 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 hover:shadow-gentle transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground text-lg">{volunteer.title}</h3>
                      <Badge 
                        variant={volunteer.status === "Confirmed" ? "default" : "secondary"}
                        className="rounded-full px-3 py-1"
                      >
                        {volunteer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Helping: <span className="font-medium">{volunteer.requester}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {volunteer.date}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent font-medium bg-accent/10 px-3 py-1 rounded-full">
                        {volunteer.category}
                      </span>
                      <Button variant="outline" size="sm" className="rounded-full">
                        {volunteer.status === "Confirmed" ? "View Details" : "Confirm"}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl mt-4" asChild>
                  <Link to="/browse">Find More Ways to Help</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-4 h-4 text-accent" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-lg">Completed helping with yard work</p>
                    <p className="text-sm text-muted-foreground">You helped the Johnson family • 2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-rose-50/50 rounded-xl hover:bg-rose-50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-lg">New volunteer for your grocery need</p>
                    <p className="text-sm text-muted-foreground">Mike offered to help • 3 days ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-lg">Received a 5-star review</p>
                    <p className="text-sm text-muted-foreground">For helping with transportation • 1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}