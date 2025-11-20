import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HandHeart, Users, Package, ShoppingBag, BookOpen, Calendar, Activity, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMembership } from "@/hooks/useMembership";
import homelessOutreachImage from "@/assets/ministries/homeless-outreach.jpg";
import winterCoatDriveImage from "@/assets/ministries/winter-coat-drive.jpg";
import foodPantryImage from "@/assets/ministries/food-pantry.jpg";
import backToSchoolImage from "@/assets/ministries/back-to-school.jpg";

export default function MinistriesDashboard() {
  const { displayName, churchName } = useMembership();
  const navigate = useNavigate();
  
  // Mock data for joined ministries (top section)
  const joinedMinistries = [
    {
      id: 1,
      title: "Homeless Outreach",
      subtitle: "Monthly Meal Drop",
      description: "Help us serve our local shelters with warm meals and prayer every 3rd Sunday.",
      image: homelessOutreachImage,
      status: "Active",
      nextEvent: "3rd Sunday",
      volunteers: 24,
      impact: "Served 150+ meals last month",
      category: "Community Service",
      path: "/my-ministries/homeless-outreach",
      icon: Users
    },
    {
      id: 2,
      title: "Food Pantry",
      subtitle: "Fighting Hunger Together",
      description: "Weekly food distribution to families experiencing food insecurity in our community.",
      image: foodPantryImage,
      status: "Active",
      nextEvent: "Every Thursday",
      volunteers: 32,
      impact: "Supporting 80+ families weekly",
      category: "Food Security",
      path: "/my-ministries/food-pantry",
      icon: ShoppingBag
    }
  ];

  // All available ministries
  const allMinistries = [
    {
      id: 1,
      title: "Homeless Outreach",
      subtitle: "Monthly Meal Drop",
      description: "Help us serve our local shelters with warm meals and prayer every 3rd Sunday.",
      image: homelessOutreachImage,
      category: "Community Service",
      status: "Active",
      nextEvent: "3rd Sunday",
      volunteers: 24,
      updated: "3 days ago",
      impact: "Served 150+ meals last month",
      path: "/my-ministries/homeless-outreach",
      icon: Users
    },
    {
      id: 2,
      title: "Winter Coat Drive",
      subtitle: "Blessing Families This Season",
      description: "Donate your gently used winter items to bless families in need this season.",
      image: winterCoatDriveImage,
      category: "Donations",
      status: "Active",
      nextEvent: "Ongoing Collection",
      progress: 40,
      goal: 100,
      volunteers: 12,
      updated: "1 week ago",
      impact: "40 of 100 coats collected",
      path: "/my-ministries/winter-coat-drive",
      icon: Package
    },
    {
      id: 4,
      title: "Food Pantry",
      subtitle: "Fighting Hunger Together",
      description: "Weekly food distribution to families experiencing food insecurity in our community.",
      image: foodPantryImage,
      category: "Food Security",
      status: "Active",
      nextEvent: "Every Thursday",
      volunteers: 32,
      updated: "5 days ago",
      impact: "Supporting 80+ families weekly",
      path: "/my-ministries/food-pantry",
      icon: ShoppingBag
    },
    {
      id: 5,
      title: "Back to School Drive",
      subtitle: "Equipping Students for Success",
      description: "Collect and distribute school supplies to students from low-income families.",
      image: backToSchoolImage,
      category: "Education",
      status: "Upcoming",
      nextEvent: "August 2025",
      progress: 25,
      goal: 200,
      volunteers: 8,
      updated: "1 day ago",
      impact: "25 of 200 supply kits prepared",
      path: "/my-ministries/back-to-school",
      icon: BookOpen
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Community Service": "bg-white/90 backdrop-blur-sm text-blue-600 border-blue-200/50",
      "Donations": "bg-white/90 backdrop-blur-sm text-purple-600 border-purple-200/50",
      "Food Security": "bg-white/90 backdrop-blur-sm text-green-600 border-green-200/50",
      "Education": "bg-white/90 backdrop-blur-sm text-orange-600 border-orange-200/50"
    };
    return colors[category] || "bg-white/90 backdrop-blur-sm text-primary border-primary/20";
  };

  return (
    <div className="min-h-screen bg-background">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Ministries Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back, {displayName ?? "Friend"}! Manage your ministry involvement and explore opportunities to serve.
                </p>
              </div>
            </div>

            {/* My Ministries Section */}
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-6">
                    <HandHeart className="w-5 h-5 text-primary" />
                    My Ministries
              </h2>
                  {joinedMinistries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {joinedMinistries.map((ministry) => {
                        const Icon = ministry.icon;
                        return (
                          <Card 
                            key={ministry.id}
                            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 h-full flex flex-col group overflow-hidden"
                            onClick={() => navigate(ministry.path)}
                          >
                            <div className="relative h-32 overflow-hidden">
                              <img 
                                src={ministry.image} 
                                alt={ministry.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getCategoryColor(ministry.category)}`}
                                >
                                  {ministry.category}
                                </Badge>
                              </div>
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-green-600 text-white text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Joined
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-4 flex-1 flex flex-col">
                              <div className="flex items-start gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-foreground mb-1">
                                    {ministry.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {ministry.subtitle}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                                {ministry.description}
                              </p>
                              <div className="space-y-2 mt-auto">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{ministry.nextEvent}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>{ministry.volunteers}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Activity className="w-3 h-3" />
                                  <span>{ministry.impact}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <HandHeart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>You haven't joined any ministries yet.</p>
                      <p className="text-sm mt-2">Explore ministries below to get involved!</p>
                    </div>
                  )}
            </div>

            {/* Available Ministries Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Available Ministries</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {allMinistries.map((ministry) => {
                      const Icon = ministry.icon;
                      const isJoined = joinedMinistries.some(jm => jm.id === ministry.id);
                      return (
                        <Card 
                          key={ministry.id}
                          className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 h-full flex flex-col group overflow-hidden"
                          onClick={() => navigate(ministry.path)}
                        >
                          <div className="relative h-32 overflow-hidden">
                            <img 
                              src={ministry.image} 
                              alt={ministry.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getCategoryColor(ministry.category)}`}
                              >
                                {ministry.category}
                              </Badge>
                            </div>
                            {isJoined && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-green-600 text-white text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Joined
                                </Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">
                                  {ministry.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {ministry.subtitle}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                              {ministry.description}
                            </p>
                            <div className="space-y-2 mt-auto">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{ministry.nextEvent}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{ministry.volunteers}</span>
                                </div>
                              </div>
                              {ministry.progress !== undefined && (
                                <div>
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-medium">{ministry.progress} of {ministry.goal}</span>
                                  </div>
                                  <Progress value={(ministry.progress / ministry.goal) * 100} className="h-2" />
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Activity className="w-3 h-3" />
                                <span>{ministry.impact}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
            </div>
          </div>
        </div>
    </div>
  );
}

