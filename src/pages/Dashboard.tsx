import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, CheckCircle, Users, Plus, Calendar, Star } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Welcome back, Sarah!
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's how you're making a difference in your community
              </p>
            </div>
            <Button asChild className="bg-accent hover:bg-accent-hover">
              <Link to="/post">
                <Plus className="w-4 h-4 mr-2" />
                Post New Need
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-card bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Needs Posted</p>
                    <p className="text-3xl font-bold text-foreground">12</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Times Helped</p>
                    <p className="text-3xl font-bold text-foreground">28</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Community Rating</p>
                    <p className="text-3xl font-bold text-foreground">4.9</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Needs</p>
                    <p className="text-3xl font-bold text-foreground">2</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Needs */}
          <Card className="border-0 shadow-card bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                My Posted Needs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userNeeds.map((need) => (
                <div key={need.id} className="p-4 border border-border rounded-lg hover:shadow-gentle transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{need.title}</h3>
                    <Badge variant={need.status === "Active" ? "default" : "secondary"}>
                      {need.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {need.category} • {need.posted}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent font-medium">
                      {need.volunteers} volunteer{need.volunteers !== 1 ? 's' : ''} interested
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/post">Post New Need</Link>
              </Button>
            </CardContent>
          </Card>

          {/* My Volunteering */}
          <Card className="border-0 shadow-card bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                My Volunteering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userVolunteering.map((volunteer) => (
                <div key={volunteer.id} className="p-4 border border-border rounded-lg hover:shadow-gentle transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{volunteer.title}</h3>
                    <Badge variant={volunteer.status === "Confirmed" ? "default" : "secondary"}>
                      {volunteer.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Helping: {volunteer.requester}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {volunteer.date}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent font-medium">
                      {volunteer.category}
                    </span>
                    <Button variant="outline" size="sm">
                      {volunteer.status === "Confirmed" ? "View Details" : "Confirm"}
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/browse">Find More Ways to Help</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-card bg-white mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-lg">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Completed helping with yard work</p>
                  <p className="text-sm text-muted-foreground">You helped the Johnson family • 2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">New volunteer for your grocery need</p>
                  <p className="text-sm text-muted-foreground">Mike offered to help • 3 days ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-lg">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Received a 5-star review</p>
                  <p className="text-sm text-muted-foreground">For helping with transportation • 1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}