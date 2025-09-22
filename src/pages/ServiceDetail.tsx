import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Eye, 
  Users, 
  MessageSquare, 
  ArrowLeft,
  UserPlus,
  Star,
  Heart,
  AlertCircle,
  User,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ServiceStatus = "active" | "in_progress" | "completed" | "cancelled" | "expired";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "Immediate" | "This Week" | "Flexible";
  status: ServiceStatus;
  location: string;
  duration: string;
  postedAt: string;
  scheduledDate?: string;
  scheduledTime?: string;
  viewCount: number;
  volunteerCount: number;
  requesterName: string;
  requesterAvatar?: string;
  requesterRating?: number;
  requesterVerified?: boolean;
  specialInstructions?: string;
}

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data - in real app, this would come from API
  const getInitialServiceData = (): ServiceData => {
    const baseData = {
      id: id || "1",
      title: "Weekly grocery shopping assistance",
      description: "Need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help with carrying bags and reaching items on high shelves. Looking for someone reliable and patient.",
      category: "Transportation & Errands",
      urgency: "This Week" as const,
      location: "Downtown Market District",
      duration: "2 hours",
      postedAt: "2 days ago",
      viewCount: 45,
      volunteerCount: 5,
      requesterName: "Sarah Johnson",
      requesterRating: 4.8,
      requesterVerified: true,
      specialInstructions: "Please bring your own car if possible. I can provide a grocery list in advance. Prefer someone comfortable helping seniors.",
      status: "active" as ServiceStatus
    };

    // Different data based on ID for demo
    switch (id) {
      case "2":
        return {
          ...baseData,
          title: "Moving help needed",
          description: "Need help moving furniture and boxes to a new apartment across town. Looking for 2-3 people to help with heavy lifting.",
          category: "Home & Garden",
          urgency: "Immediate" as const,
          duration: "4 hours",
          requesterName: "Mike Davis",
          specialInstructions: "Must be able to lift heavy items. Truck/van would be helpful but not required."
        };
      case "3":
        return {
          ...baseData,
          title: "Elderly companion visit",
          description: "Looking for someone to visit my elderly mother once a week for conversation and light activities. She enjoys reading and card games.",
          category: "Companionship",
          urgency: "Flexible" as const,
          duration: "1-2 hours",
          requesterName: "Jennifer Lee",
          specialInstructions: "Background check required. Experience with elderly care preferred."
        };
      default:
        return baseData;
    }
  };

  const [serviceData, setServiceData] = useState<ServiceData>(getInitialServiceData());
  const [volunteerMessage, setVolunteerMessage] = useState("");
  const [showVolunteerDialog, setShowVolunteerDialog] = useState(false);
  const [isVolunteering, setIsVolunteering] = useState(false);

  const urgencyColors = {
    "Immediate": "bg-destructive text-destructive-foreground",
    "This Week": "bg-accent text-accent-foreground", 
    "Flexible": "bg-secondary text-secondary-foreground"
  };

  const statusColors = {
    "active": "bg-emerald-500 text-white",
    "in_progress": "bg-blue-500 text-white", 
    "completed": "bg-green-600 text-white",
    "cancelled": "bg-gray-500 text-white",
    "expired": "bg-red-500 text-white"
  };

  const statusLabels = {
    "active": "Looking for volunteers",
    "in_progress": "Help arranged", 
    "completed": "Completed",
    "cancelled": "Cancelled",
    "expired": "Expired"
  };

  const handleVolunteer = () => {
    if (!volunteerMessage.trim()) {
      setShowVolunteerDialog(true);
      return;
    }

    setIsVolunteering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVolunteering(false);
      setShowVolunteerDialog(false);
      setVolunteerMessage("");
      
      toast({
        title: "Application submitted!",
        description: "Your volunteer application has been sent to the requester. They will contact you if selected."
      });
    }, 1000);
  };

  const getContactInfo = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={serviceData.requesterAvatar} />
            <AvatarFallback>{serviceData.requesterName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{serviceData.requesterName}</h3>
              {serviceData.requesterVerified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            {serviceData.requesterRating && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{serviceData.requesterRating}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>{serviceData.viewCount} views</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{serviceData.volunteerCount} people interested</span>
          </div>
        </div>
      </div>
    );
  };

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Card>
              <CardContent className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">Service opportunity not found</h2>
                <p className="text-muted-foreground">
                  The service opportunity you're looking for doesn't exist or has been removed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-2xl mb-3">{serviceData.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{serviceData.category}</Badge>
                        <Badge className={urgencyColors[serviceData.urgency]}>
                          {serviceData.urgency}
                        </Badge>
                        <Badge className={statusColors[serviceData.status]}>
                          {statusLabels[serviceData.status]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {serviceData.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{serviceData.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">{serviceData.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Posted</p>
                          <p className="text-sm text-muted-foreground">{serviceData.postedAt}</p>
                        </div>
                      </div>

                      {serviceData.scheduledDate && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Scheduled</p>
                            <p className="text-sm text-muted-foreground">
                              {serviceData.scheduledDate} at {serviceData.scheduledTime}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {serviceData.specialInstructions && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Special Instructions
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {serviceData.specialInstructions}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Requester Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Requester</CardTitle>
                </CardHeader>
                <CardContent>
                  {getContactInfo()}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  {serviceData.status === "active" && (
                    <>
                      <Dialog open={showVolunteerDialog} onOpenChange={setShowVolunteerDialog}>
                        <DialogTrigger asChild>
                          <Button className="w-full" size="lg">
                            <UserPlus className="mr-2 h-4 w-4" />
                            I Can Help
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Volunteer for this service</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Send a message to introduce yourself and explain how you can help.
                            </p>
                            <Textarea
                              placeholder="Hi! I'd love to help with this. I have experience with..."
                              value={volunteerMessage}
                              onChange={(e) => setVolunteerMessage(e.target.value)}
                              className="min-h-[100px]"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setShowVolunteerDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleVolunteer} disabled={isVolunteering}>
                                {isVolunteering ? (
                                  <>
                                    <Send className="mr-2 h-4 w-4 animate-pulse" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Submit Application
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ask Question
                      </Button>
                    </>
                  )}

                  {serviceData.status === "in_progress" && (
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Help has been arranged for this request
                      </p>
                    </div>
                  )}

                  {serviceData.status === "completed" && (
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        This request has been completed
                      </p>
                    </div>
                  )}

                  <Button variant="ghost" className="w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    Save for Later
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}