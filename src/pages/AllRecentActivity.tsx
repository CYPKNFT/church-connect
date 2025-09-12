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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/my-church">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Church
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">All Recent Activity</h1>
          <p className="text-xl text-white/90">
            Complete timeline of community engagement and service activities
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 border-0 shadow-elegant">
          <CardHeader>
            <CardTitle>Search & Filter Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by member name or activity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 h-12">
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

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filteredActivity.length} Activit{filteredActivity.length !== 1 ? 'ies' : 'y'} Found
          </h2>
          <Badge variant="secondary" className="text-sm">
            {allActivity.length} Total Activities
          </Badge>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {filteredActivity.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/95 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Timeline Indicator */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      {index < filteredActivity.length - 1 && (
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-accent/30 to-transparent" />
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
                          <div className="flex items-center gap-1 text-green-600">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs">Community Hero</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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

        {/* Stats Summary */}
        {filteredActivity.length > 0 && (
          <Card className="mt-8 border-0 shadow-elegant bg-gradient-primary text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Community Impact Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {allActivity.filter(a => a.category === "Help Offered").length}
                  </div>
                  <div className="text-sm text-white/80">Times Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {allActivity.filter(a => a.category === "Task Completed").length}
                  </div>
                  <div className="text-sm text-white/80">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {allActivity.filter(a => a.category === "Event Organized").length}
                  </div>
                  <div className="text-sm text-white/80">Events Organized</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {new Set(allActivity.map(a => a.member)).size}
                  </div>
                  <div className="text-sm text-white/80">Active Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}