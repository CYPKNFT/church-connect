import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingBag, Calendar, Users, CheckCircle, Activity, HandHeart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import foodPantryImage from "@/assets/ministries/food-pantry.jpg";

export default function MinistryFoodPantry() {
  const navigate = useNavigate();

  const handleJoin = () => {
    toast.success("You've joined the Food Pantry ministry!");
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
                    src={foodPantryImage}
                    alt="Food Pantry"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl mb-2">Food Pantry</CardTitle>
                      <p className="text-lg text-muted-foreground mb-4">Fighting Hunger Together</p>
                      <Badge className="bg-green-500/10 text-green-600 border-green-200">
                        Food Security
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
                    Weekly food distribution to families experiencing food insecurity in our community. 
                    We provide fresh produce, non-perishable items, and essential groceries to help 
                    families in need maintain food security throughout the year.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Schedule</p>
                        <p className="font-semibold">Every Thursday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volunteers</p>
                        <p className="font-semibold">32 active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Impact</p>
                        <p className="font-semibold">80+ families/week</p>
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
                    <p className="text-sm text-muted-foreground">Every Thursday</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 2:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">Church Basement</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Contact</p>
                    <p className="text-sm text-muted-foreground">Lisa Martinez</p>
                    <p className="text-sm text-muted-foreground">lisa@church.org</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </div>
  );
}

