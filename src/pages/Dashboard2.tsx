import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Clock, CheckCircle, Users, Plus, Calendar, Star, LayoutDashboard, BookOpen, UserCheck, Settings, TrendingUp, Activity, MapPin, MessageSquare, Award, Bell, Filter, Search, ChevronRight, HandHeart, Target, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Dashboard2() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  
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
                <h2 className="font-bold text-foreground">CommunityConnect</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}