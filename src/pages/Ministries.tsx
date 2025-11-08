import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Calendar, MapPin, ArrowRight, HandHeart, Package, Sprout, ShoppingBag, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function Ministries() {
  const [ministries] = useState([
    {
      id: 1,
      title: "Homeless Outreach",
      subtitle: "Monthly Meal Drop",
      description: "Help us serve our local shelters with warm meals and prayer every 3rd Sunday.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
      category: "Community Service",
      status: "Active",
      nextEvent: "3rd Sunday",
      volunteers: 24,
      updated: "3 days ago",
      impact: "Served 150+ meals last month",
      actions: [
        { label: "Join", variant: "default" as const },
        { label: "View Details", variant: "outline" as const }
      ]
    },
    {
      id: 2,
      title: "Winter Coat Drive",
      subtitle: "Blessing Families This Season",
      description: "Donate your gently used winter items to bless families in need this season.",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
      category: "Donations",
      status: "Active",
      nextEvent: "Ongoing Collection",
      progress: 40,
      goal: 100,
      volunteers: 12,
      updated: "1 week ago",
      impact: "40 of 100 coats collected",
      actions: [
        { label: "Donate Items", variant: "default" as const },
        { label: "Drop-off Locations", variant: "outline" as const }
      ]
    },
    {
      id: 3,
      title: "Community Garden Project",
      subtitle: "Fresh Produce for Food Bank",
      description: "Build and maintain a fresh produce garden to support our food bank year-round.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
      category: "Food Security",
      status: "Active",
      nextEvent: "Saturday 9 AM",
      volunteers: 18,
      updated: "2 days ago",
      impact: "200+ lbs of produce donated monthly",
      actions: [
        { label: "Volunteer", variant: "default" as const },
        { label: "Learn More", variant: "outline" as const }
      ]
    },
    {
      id: 4,
      title: "Food Pantry Ministry",
      subtitle: "Fighting Hunger Together",
      description: "Weekly food distribution to families experiencing food insecurity in our community.",
      image: "https://images.unsplash.com/photo-1593113646773-028c1f7c6c3f?w=800&auto=format&fit=crop",
      category: "Food Security",
      status: "Active",
      nextEvent: "Every Thursday",
      volunteers: 32,
      updated: "5 days ago",
      impact: "Supporting 80+ families weekly",
      actions: [
        { label: "Join Team", variant: "default" as const },
        { label: "View Schedule", variant: "outline" as const }
      ]
    },
    {
      id: 5,
      title: "Back to School Drive",
      subtitle: "Equipping Students for Success",
      description: "Collect and distribute school supplies to students from low-income families.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      category: "Education",
      status: "Upcoming",
      nextEvent: "August 2025",
      progress: 25,
      goal: 200,
      volunteers: 8,
      updated: "1 day ago",
      impact: "25 of 200 supply kits prepared",
      actions: [
        { label: "Donate", variant: "default" as const },
        { label: "Details", variant: "outline" as const }
      ]
    },
    {
      id: 6,
      title: "Community Tutoring",
      subtitle: "Empowering Through Education",
      description: "One-on-one tutoring for students K-12 in reading, math, and other subjects.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      category: "Education",
      status: "Active",
      nextEvent: "Mon-Thu 4-6 PM",
      volunteers: 15,
      updated: "1 week ago",
      impact: "Tutoring 45 students currently",
      actions: [
        { label: "Be a Tutor", variant: "default" as const },
        { label: "More Info", variant: "outline" as const }
      ]
    }
  ]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      "Community Service": HandHeart,
      "Donations": Package,
      "Food Security": ShoppingBag,
      "Education": HeartHandshake
    };
    return icons[category] || Heart;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Community Service": "bg-blue-500/10 text-blue-600 border-blue-200",
      "Donations": "bg-purple-500/10 text-purple-600 border-purple-200",
      "Food Security": "bg-green-500/10 text-green-600 border-green-200",
      "Education": "bg-orange-500/10 text-orange-600 border-orange-200"
    };
    return colors[category] || "bg-primary/10 text-primary border-primary/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Church Ministries
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Making a Difference Together
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover ministries where our church serves the community through homelessness support, 
              food drives, community service, and more. Every act of service is an opportunity to share God's love.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="shadow-lg">
                <Heart className="w-5 h-5 mr-2" />
                Get Involved
              </Button>
              <Button size="lg" variant="outline">
                <Calendar className="w-5 h-5 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="shadow-xl border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-muted-foreground">Active Ministries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">109</div>
                <div className="text-sm text-muted-foreground">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">450+</div>
                <div className="text-sm text-muted-foreground">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Years Serving</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ministries Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry) => {
            const CategoryIcon = getCategoryIcon(ministry.category);
            return (
              <Card key={ministry.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/50">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={ministry.image} 
                    alt={ministry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge 
                    className={`absolute top-4 left-4 ${getCategoryColor(ministry.category)} border`}
                  >
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {ministry.category}
                  </Badge>
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      ministry.status === 'Active' 
                        ? 'bg-green-500/90 text-white border-green-400' 
                        : 'bg-blue-500/90 text-white border-blue-400'
                    }`}
                  >
                    {ministry.status}
                  </Badge>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {ministry.title}
                    </h3>
                    <p className="text-sm font-medium text-primary mb-2">
                      {ministry.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ministry.description}
                    </p>
                  </div>

                  {/* Progress Bar (if applicable) */}
                  {ministry.progress !== undefined && ministry.goal && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-semibold">{ministry.progress} of {ministry.goal}</span>
                      </div>
                      <Progress value={(ministry.progress / ministry.goal) * 100} className="h-2" />
                    </div>
                  )}

                  {/* Impact & Details */}
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{ministry.nextEvent}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{ministry.volunteers} volunteers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Heart className="w-4 h-4" />
                      <span>{ministry.impact}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {ministry.actions.map((action, idx) => (
                      <Button 
                        key={idx}
                        variant={action.variant}
                        size="sm"
                        className={`flex-1 ${
                          action.variant === 'default' 
                            ? 'shadow-md hover:shadow-lg' 
                            : ''
                        }`}
                      >
                        {action.label}
                        {idx === 1 && <ArrowRight className="w-4 h-4 ml-1" />}
                      </Button>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                    Updated {ministry.updated}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-12">
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="p-8 md:p-12 text-center">
            <HandHeart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Start Your Ministry Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Whether you have 1 hour a week or 10, there's a place for you to serve and make an impact in our community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="shadow-lg">
                <Heart className="w-5 h-5 mr-2" />
                Find Your Ministry
              </Button>
              <Button size="lg" variant="outline">
                Contact Ministry Leader
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
