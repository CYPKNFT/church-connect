import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhotoUpload } from "@/components/PhotoUpload";
import { Users, Calendar, MapPin, Clock, CheckCircle, Activity, HandHeart, ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import homelessOutreachImage from "@/assets/ministries/homeless-outreach.jpg";

export default function MinistryHomelessOutreach() {
  const navigate = useNavigate();
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [donationPhotos, setDonationPhotos] = useState<File[]>([]);
  const [donationForm, setDonationForm] = useState({
    quantity: 1,
    condition: "",
    description: ""
  });

  const donationItems = [
    { id: "blankets", name: "Blankets", needed: 50, received: 32, unit: "blankets" },
    { id: "shoes", name: "Shoes", needed: 80, received: 45, unit: "pairs" },
    { id: "hygiene-kits", name: "Hygiene Kits", needed: 100, received: 67, unit: "kits" },
    { id: "socks", name: "Socks", needed: 200, received: 120, unit: "pairs" },
    { id: "winter-coats", name: "Winter Coats", needed: 60, received: 28, unit: "coats" }
  ];

  const volunteerRoles = [
    { id: "meal-prep", name: "Meal Preparation", needed: 8, signedUp: 5 },
    { id: "serving", name: "Serving", needed: 12, signedUp: 9 },
    { id: "cleanup", name: "Cleanup Crew", needed: 6, signedUp: 4 },
    { id: "outreach", name: "Outreach Team", needed: 10, signedUp: 6 }
  ];

  const handleJoin = () => {
    toast.success("You've joined the Homeless Outreach ministry!");
  };

  const handleDonateClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setDonateDialogOpen(true);
    setDonationForm({ quantity: 1, condition: "", description: "" });
    setDonationPhotos([]);
  };

  const handleDonationSubmit = () => {
    if (!selectedItemId) return;
    
    if (!donationForm.condition) {
      toast.error("Please select the condition of the item");
      return;
    }

    if (donationPhotos.length === 0) {
      toast.error("Please upload at least one photo of the item");
      return;
    }

    toast.success("Donation submitted! It will be reviewed by the ministry leader before being counted.");
    setDonateDialogOpen(false);
    setSelectedItemId(null);
    setDonationForm({ quantity: 1, condition: "", description: "" });
    setDonationPhotos([]);
  };

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

              {/* Donation Items Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Donation Needs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {donationItems.map((item) => {
                      const pct = Math.min(100, Math.round((item.received / item.needed) * 100));
                      const remaining = Math.max(0, item.needed - item.received);
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold text-foreground">{item.name}</div>
                              <span className="text-sm text-muted-foreground">{item.received}/{item.needed}</span>
                            </div>
                            <Progress value={pct} className="h-2 mb-2" />
                            <span className="text-sm text-muted-foreground">
                              {remaining > 0 ? `${item.received} of ${item.needed} ${item.unit} needed` : "Goal reached"}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleDonateClick(item.id)}
                            className="bg-primary hover:bg-primary/90 flex-shrink-0"
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Donate Item
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Volunteer Progress Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Volunteer Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {volunteerRoles.map((role) => {
                      const pct = Math.min(100, Math.round((role.signedUp / role.needed) * 100));
                      const remaining = Math.max(0, role.needed - role.signedUp);
                      return (
                        <Card key={role.id} className="border-border/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="font-semibold text-foreground">{role.name}</div>
                              <span className="text-sm text-muted-foreground">{role.signedUp}/{role.needed}</span>
                            </div>
                            <Progress value={pct} className="h-2 mb-2" />
                            <div className="text-sm text-muted-foreground">
                              {remaining > 0 ? `${remaining} more volunteer${remaining > 1 ? 's' : ''} needed` : "All positions filled"}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
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

          {/* Donation Dialog */}
          <Dialog open={donateDialogOpen} onOpenChange={setDonateDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Donate {selectedItemId ? donationItems.find(item => item.id === selectedItemId)?.name : "Item"}
                </DialogTitle>
                <DialogDescription>
                  Your donation will be reviewed by the ministry leader before being counted. Please provide photos and details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={donationForm.quantity}
                    onChange={(e) => setDonationForm({ ...donationForm, quantity: Number(e.target.value) })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={donationForm.condition} onValueChange={(value) => setDonationForm({ ...donationForm, condition: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description / Additional Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide any additional details about the item(s)..."
                    value={donationForm.description}
                    onChange={(e) => setDonationForm({ ...donationForm, description: e.target.value })}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Photos</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photos of the item(s) to help with review
                  </p>
                  <PhotoUpload
                    onPhotosChange={setDonationPhotos}
                    maxPhotos={5}
                    maxFileSize={5}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setDonateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleDonationSubmit} className="bg-primary hover:bg-primary/90">
                    Submit for Review
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  );
}

