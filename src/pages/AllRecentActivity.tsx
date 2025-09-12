import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, UserCheck, Heart, MessageSquare, Calendar, Users, Clock, Star, Gift, Handshake, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllRecentActivity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const allActivity = [
    {
      id: 1,
      type: "helped",
      member: "Mike Johnson",
      action: "helped with",
      need: "Grocery shopping for Mrs. Peterson",
      time: "2 days ago",
      icon: UserCheck,
      category: "Help Offered"
    },
    {
      id: 2,
      type: "completed",
      member: "David Martinez",
      action: "completed",
      need: "Home repair for the Williams family",
      time: "1 week ago",
      icon: Home,
      category: "Task Completed"
    },
    {
      id: 3,
      type: "organized",
      member: "Sarah Miller",
      action: "organized",
      need: "Meal train for new parents",
      time: "1 week ago",
      icon: Gift,
      category: "Event Organized"
    },
    {
      id: 4,
      type: "joined",
      member: "Jennifer Davis",
      action: "joined",
      need: "Community Service Day volunteer team",
      time: "3 days ago",
      icon: Handshake,
      category: "Event Joined"
    },
    {
      id: 5,
      type: "responded",
      member: "Robert Thompson",
      action: "responded to",
      need: "Transportation request for medical appointment",
      time: "4 days ago",
      icon: MessageSquare,
      category: "Response Given"
    },
    {
      id: 6,
      type: "helped",
      member: "Linda Chen",
      action: "helped with",
      need: "Childcare for single mother",
      time: "5 days ago",
      icon: UserCheck,
      category: "Help Offered"
    },
    {
      id: 7,
      type: "completed",
      member: "Mark Williams",
      action: "completed",
      need: "Roof repair for elderly widow",
      time: "1 week ago",
      icon: Home,
      category: "Task Completed"
    },
    {
      id: 8,
      type: "organized",
      member: "Pastor Michael",
      action: "organized",
      need: "Prayer support group for families in crisis",
      time: "2 weeks ago",
      icon: Heart,
      category: "Event Organized"
    },
    {
      id: 9,
      type: "joined",
      member: "Carlos Rivera",
      action: "joined",
      need: "Youth mentorship program",
      time: "2 weeks ago",
      icon: Handshake,
      category: "Event Joined"
    },
    {
      id: 10,
      type: "helped",
      member: "Mary Johnson",
      action: "helped with",
      need: "Moving assistance for elderly couple",
      time: "2 weeks ago",
      icon: UserCheck,
      category: "Help Offered"
    },
    {
      id: 11,
      type: "completed",
      member: "Tom Anderson",
      action: "completed",
      need: "Lawn care for recovering church member",
      time: "3 weeks ago",
      icon: Home,
      category: "Task Completed"
    },
    {
      id: 12,
      type: "responded",
      member: "Lisa Martinez",
      action: "responded to",
      need: "Prayer request for job search",
      time: "3 weeks ago",
      icon: MessageSquare,
      category: "Response Given"
    }
  ];

  const activityTypes = ["All", "Help Offered", "Task Completed", "Event Organized", "Event Joined", "Response Given"];
  
  const filteredActivity = allActivity.filter(activity => {
    const matchesSearch = searchQuery === "" || 
      activity.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.need.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || activity.category === selectedType;
    return matchesSearch && matchesType;
  });

  const getActivityColor = (category: string) => {
    switch (category) {
      case "Help Offered": return "default";
      case "Task Completed": return "secondary";
      case "Event Organized": return "outline";
      case "Event Joined": return "default";
      case "Response Given": return "secondary";
      default: return "default";
    }
  };

  const getTimeColor = (time: string) => {
    if (time.includes("days ago")) return "text-green-600";
    if (time.includes("1 week")) return "text-yellow-600";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/my-church">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to My Church
                </Button>
              </Link>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {allActivity.length} Total Activities
            </Badge>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">All Recent Activity</h1>
              <p className="text-lg text-white/90">
                Complete timeline of community engagement and service activities
              </p>
            </div>
            
            {/* Compact Community Impact Summary */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 lg:p-6">
              <h3 className="text-lg font-bold mb-4 text-center">Community Impact</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {allActivity.filter(a => a.category === "Help Offered").length}
                  </div>
                  <div className="text-xs text-white/80">Times Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {allActivity.filter(a => a.category === "Task Completed").length}
                  </div>
                  <div className="text-xs text-white/80">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {allActivity.filter(a => a.category === "Event Organized").length}
                  </div>
                  <div className="text-xs text-white/80">Events Organized</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {new Set(allActivity.map(a => a.member)).size}
                  </div>
                  <div className="text-xs text-white/80">Active Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter - More Compact */}
        <Card className="mb-6 border-0 shadow-elegant bg-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by member name or activity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 h-10">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header - More Compact */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {filteredActivity.length} Activit{filteredActivity.length !== 1 ? 'ies' : 'y'} Found
          </h2>
        </div>

        {/* Activity Timeline with Winding Path */}
        <div className="relative">
          {/* Winding Timeline Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {filteredActivity.map((_, index) => {
              if (index === filteredActivity.length - 1) return null;
              
              const startY = (index * 120) + 80; // Reduced spacing
              const endY = ((index + 1) * 120) + 80;
              const midY = (startY + endY) / 2;
              
              // Create winding effect
              const amplitude = 60; // How far the curve extends horizontally
              const direction = index % 2 === 0 ? 1 : -1; // Alternate left/right
              const controlX = 100 + (amplitude * direction);
              
              return (
                <path
                  key={`timeline-${index}`}
                  d={`M 100 ${startY + 30} Q ${controlX} ${midY} 100 ${endY + 30}`}
                  stroke="url(#timelineGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Activity Cards */}
          <div className="relative space-y-4" style={{ zIndex: 2 }}>
            {filteredActivity.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div 
                  key={activity.id} 
                  className={`animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group relative">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Timeline Indicator */}
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300 border-2 border-white shadow-lg">
                            <IconComponent className="w-6 h-6 text-accent" />
                          </div>
                          {/* Pulse animation for recent activities */}
                          {activity.time.includes("days ago") && (
                            <div className="absolute inset-0 w-12 h-12 bg-accent/20 rounded-full animate-ping" />
                          )}
                        </div>
                        
                        {/* Activity Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-lg text-foreground">
                                <span className="font-semibold text-accent">{activity.member}</span>{" "}
                                <span className="text-muted-foreground">{activity.action}</span>{" "}
                                <span className="font-medium">{activity.need}</span>
                              </p>
                            </div>
                            <Badge variant={getActivityColor(activity.category) as any} className="ml-4">
                              {activity.category}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className={`flex items-center gap-1 ${getTimeColor(activity.time)}`}>
                              <Clock className="w-3 h-3" />
                              {activity.time}
                            </div>
                            {activity.category === "Help Offered" && (
                              <div className="flex items-center gap-1 text-yellow-600">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs">Community Hero</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {filteredActivity.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No activity found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}