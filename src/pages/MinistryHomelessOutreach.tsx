import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, MapPin, Clock, CheckCircle, Activity, HandHeart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import homelessOutreachImage from "@/assets/ministries/homeless-outreach.jpg";

export default function MinistryHomelessOutreach() {
  const navigate = useNavigate();

  const handleJoin = () => {
    toast.success("You've joined the Homeless Outreach ministry!");
  };

  return (
    <div className="min-h-screen bg-background">
        <div className="flex-1 p-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/ministries/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ministries
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <img 
                    src={homelessOutreachImage}
                    alt="Homeless Outreach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl mb-2">Homeless Outreach</CardTitle>
                      <p className="text-lg text-muted-foreground mb-4">Monthly Meal Drop</p>
                      <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">
                        Community Service
                      </Badge>
                    </div>
                    <Button onClick={handleJoin} className="bg-primary hover:bg-primary/90">
                      <HandHeart className="w-4 h-4 mr-2" />
                      Join Ministry
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Help us serve our local shelters with warm meals and prayer every 3rd Sunday. 
                    Our Homeless Outreach Ministry has been serving the local community for over 8 years, 
                    providing warm meals, essential supplies, and spiritual support to those experiencing homelessness.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Event</p>
                        <p className="font-semibold">3rd Sunday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volunteers</p>
                        <p className="font-semibold">24 active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Impact</p>
                        <p className="font-semibold">150+ meals/month</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-semibold">Active</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-1">Schedule</p>
                    <p className="text-sm text-muted-foreground">Every 3rd Sunday</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - 5:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">Downtown Shelter</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Contact</p>
                    <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">sarah@church.org</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </div>
  );
}

