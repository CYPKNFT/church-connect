import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandHeart, Plus, Users, Clock, Calendar, MapPin, Timer, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Volunteering2() {
  useEffect(() => {
    document.title = "Volunteering 2 | CommunityConnect";
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Volunteering 2
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your volunteer activities and impact
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary-hover shadow-accent rounded-xl px-6">
              <Link to="/browse">
                <Plus className="w-4 h-4 mr-2" />
                Find Opportunities
              </Link>
            </Button>
          </div>

          {/* Pastel Metric Cards - Same style as Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="border-0 shadow-card bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600 mb-1">Hours Volunteered</p>
                    <p className="text-3xl font-bold text-emerald-700">45</p>
                    <p className="text-xs text-emerald-500 mt-1">+12 this month</p>
                  </div>
                  <div className="w-14 h-14 bg-emerald-200/50 rounded-2xl flex items-center justify-center">
                    <HandHeart className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">People Helped</p>
                    <p className="text-3xl font-bold text-blue-700">18</p>
                    <p className="text-xs text-blue-500 mt-1">This quarter</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-200/50 rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 mb-1">Active Commitments</p>
                    <p className="text-3xl font-bold text-purple-700">3</p>
                    <p className="text-xs text-purple-500 mt-1">Ongoing</p>
                  </div>
                  <div className="w-14 h-14 bg-purple-200/50 rounded-2xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-amber-50 to-orange-100 hover:shadow-gentle transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600 mb-1">Completion Rate</p>
                    <p className="text-3xl font-bold text-amber-700">96%</p>
                    <p className="text-xs text-amber-500 mt-1">Excellent</p>
                  </div>
                  <div className="w-14 h-14 bg-amber-200/50 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Content */}
          <Card className="border-0 shadow-card bg-white hover:shadow-gentle transition-all duration-300 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">
                  <HandHeart className="w-4 h-4 text-accent" />
                </div>
                Upcoming Volunteering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-emerald-50/40 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1">Transportation to medical appointment</h3>
                    <p className="text-xs text-muted-foreground mb-2">Drive to routine cardiology checkup</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full text-xs px-2 py-1 ml-2">
                    Confirmed
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3 h-3" />
                    Mrs. Eleanor Johnson
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Tomorrow 2:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    Central Medical Center
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Timer className="w-3 h-3" />
                    2 hours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}