import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Users, MessageSquare, Eye, Calendar, Timer, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function MyNeeds2() {
  useEffect(() => {
    document.title = "My Needs 2 | CommunityConnect";
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                My Needs 2
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage and track all your community requests
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
              <Link to="/post">
                <Plus className="w-4 h-4 mr-2" />
                Post New Need
              </Link>
            </Button>
          </div>

          {/* Pastel Metric Cards - Same style as Dashboard */}
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
                    <MessageSquare className="w-7 h-7 text-emerald-600" />
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
                    <Eye className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Content */}
          <Card className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                Recent Needs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-gray-50/80 to-gray-50/40 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1">Weekly grocery shopping assistance</h3>
                    <p className="text-xs text-muted-foreground mb-2">Need someone to help with grocery shopping every Tuesday morning.</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full text-xs px-2 py-1 ml-2">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Downtown Market District
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    2 hours
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      5 volunteers
                    </span>
                    <span className="text-xs text-accent font-medium flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      12 responses
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}