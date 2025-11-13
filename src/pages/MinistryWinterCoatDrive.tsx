import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Calendar, Users, CheckCircle, Activity, HandHeart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import winterCoatDriveImage from "@/assets/ministries/winter-coat-drive.jpg";

export default function MinistryWinterCoatDrive() {
  const navigate = useNavigate();

  const handleJoin = () => {
    toast.success("You've joined the Winter Coat Drive ministry!");
  };

  const progress = 40;
  const goal = 100;

  return (
    <div className="min-h-screen bg-background">
        <div className="flex-1 p-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/my-ministries")}
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
                    src={winterCoatDriveImage}
                    alt="Winter Coat Drive"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl mb-2">Winter Coat Drive</CardTitle>
                      <p className="text-lg text-muted-foreground mb-4">Blessing Families This Season</p>
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-200">
                        Donations
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
                    Donate your gently used winter items to bless families in need this season. 
                    We're collecting coats, jackets, gloves, hats, and scarves to help keep our 
                    community warm during the winter months.
                  </p>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Collection Progress</span>
                      <span className="text-sm text-muted-foreground">{progress} of {goal} coats</span>
                    </div>
                    <Progress value={(progress / goal) * 100} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Collection</p>
                        <p className="font-semibold">Ongoing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volunteers</p>
                        <p className="font-semibold">12 active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Impact</p>
                        <p className="font-semibold">40 coats collected</p>
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
                    <p className="text-sm font-semibold mb-1">Drop-off Locations</p>
                    <p className="text-sm text-muted-foreground">Church Office</p>
                    <p className="text-sm text-muted-foreground">Community Center</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Contact</p>
                    <p className="text-sm text-muted-foreground">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">michael@church.org</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </div>
  );
}

