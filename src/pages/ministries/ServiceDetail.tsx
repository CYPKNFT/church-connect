import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Eye, 
  Users, 
  MessageSquare, 
  Package,
  ArrowLeft,
  UserPlus,
  Star,
  Heart,
  AlertCircle,
  User,
  Send,
  CheckCircle,
  Car,
  Shield,
  Dumbbell,
  Clock3,
  UserCheck,
  Stethoscope,
  Phone,
  Target
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
  interestedCount: number;
  requesterName: string;
  requesterAvatar?: string;
  requesterRating?: number;
  requesterVerified?: boolean;
  specialInstructions?: string;
  paymentMethod?: string;
  budget?: string;
  commitmentLength?: string;
  trialPeriod?: string;
  essentialRequirements: string[];
  preferredExperience: string[];
  coordinatorName?: string;
  coordinatorRole?: string;
  coordinatorAvatar?: string;
  coordinatorAvailable?: boolean;
  matchScore?: number;
  commitmentStart?: string;
  commitmentGoal?: string;
  commitmentProgress?: number;
}

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data - in real app, this would come from API
  const getInitialServiceData = (): ServiceData => {
    const baseData = {
      id: id || "1",
      title: "Weekly Grocery Shopping Assistance",
      description: "I need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help with carrying bags and reaching items on high shelves. Looking for someone reliable and patient who is comfortable helping seniors.",
      category: "Transportation & Errands",
      urgency: "This Week" as const,
      location: "Publix Downtown Market District, 123 Main St entrance",
      duration: "1.5-2 hours",
      postedAt: "2 days ago",
      viewCount: 45,
      volunteerCount: 5,
      interestedCount: 8,
      requesterName: "Sarah Johnson",
      requesterRating: 4.8,
      requesterVerified: true,
      specialInstructions: "Please bring your own car if possible. I can provide a grocery list in advance. I prefer someone comfortable helping seniors and familiar with mobility assistance. Parking is available near the store entrance. I have a small cart for easier transport.",
      paymentMethod: "Cash provided for groceries",
      budget: "Avg. budget: $75-100",
      commitmentLength: "6 months minimum",
      trialPeriod: "Trial period: 2 weeks",
      essentialRequirements: [
        "Reliable personal vehicle",
        "Background check (church will provide)",
        "Physical ability to lift 20+ lbs",
        "Available Tuesday mornings",
        "Patient and kind demeanor"
      ],
      preferredExperience: [
        "Previous senior assistance experience",
        "Church member or regular attendee",
        "Comfortable with mobility aids",
        "Familiar with dietary restrictions",
        "Good communication skills"
      ],
      coordinatorName: "Mike Roberts",
      coordinatorRole: "Senior Care Coordinator",
      coordinatorAvailable: true,
      matchScore: 87,
      commitmentStart: "Next Tuesday",
      commitmentGoal: "6 months",
      commitmentProgress: 0,
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
      {/* Hero Header to match Marketplace item page */}
      <div className="relative overflow-hidden">
        <div
          className="h-64 relative bg-gradient-to-br from-green-600 to-blue-600 dark:bg-none"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)' }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-blue-600/90 dark:bg-none"
            style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(37,99,235,0.9) 100%)' }}
          />
          <div
            className="absolute inset-0 dark:block hidden"
            style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #8b4513 100%)' }}
          />
          <div
            className="absolute inset-0 dark:block hidden"
            style={{ background: 'linear-gradient(135deg, rgba(45,27,105,0.9) 0%, rgba(139,69,19,0.9) 100%)' }}
          />
        </div>

        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl w-full mx-auto">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-4 mb-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => navigate(-1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Browse
                    </Button>
                    <Badge className={urgencyColors[serviceData.urgency]}> {serviceData.urgency} </Badge>
                    <Badge className={statusColors[serviceData.status]}> {statusLabels[serviceData.status]} </Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{serviceData.title}</h1>
                  <div className="flex flex-wrap items-center gap-6 text-white/90 text-base">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span> Posted {serviceData.postedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span className="inline-flex items-center gap-2">
                        {serviceData.requesterName}
                        {serviceData.requesterVerified && (
                          <Badge variant="secondary" className="ml-1 text-xs bg-white/20 text-white border-white/30">
                            <Shield className="w-3 h-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {serviceData.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button moved into hero header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */
              }
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Service Details
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {serviceData.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Meeting Location</p>
                          <p className="text-sm text-muted-foreground">{serviceData.location}</p>
                        </div>
                      </div>
                      
                      {serviceData.paymentMethod && (
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Payment Method</p>
                            <p className="text-sm text-muted-foreground">{serviceData.paymentMethod}</p>
                            {serviceData.budget && (
                              <p className="text-xs text-muted-foreground mt-1">{serviceData.budget}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Schedule</p>
                          <p className="text-sm text-muted-foreground">Every Tuesday, 9:00 AM</p>
                          <p className="text-xs text-muted-foreground mt-1">Duration: {serviceData.duration}</p>
                        </div>
                      </div>

                      {serviceData.commitmentLength && (
                        <div className="flex items-start space-x-3">
                          <Clock3 className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Commitment Length</p>
                            <p className="text-sm text-muted-foreground">{serviceData.commitmentLength}</p>
                            {serviceData.trialPeriod && (
                              <p className="text-xs text-muted-foreground mt-1">{serviceData.trialPeriod}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Volunteer Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Volunteer Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Essential Requirements</h4>
                      <div className="space-y-2">
                        {serviceData.essentialRequirements.map((req, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Preferred Experience</h4>
                      <div className="space-y-2">
                        {serviceData.preferredExperience.map((exp, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Instructions */}
              {serviceData.specialInstructions && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                      Special Instructions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {serviceData.specialInstructions}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Commitment Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commitment Timeline</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Looking for {serviceData.commitmentLength} with {serviceData.trialPeriod}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={serviceData.commitmentProgress} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Start: {serviceData.commitmentStart}</span>
                      <span>Goal: {serviceData.commitmentGoal}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Requester Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="h-5 w-5 mr-2" />
                    Requester
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={serviceData.requesterAvatar} />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {serviceData.requesterName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{serviceData.requesterName}</h3>
                          {serviceData.requesterVerified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
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
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{serviceData.viewCount}</div>
                        <div className="text-xs text-muted-foreground">VIEWS</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{serviceData.interestedCount}</div>
                        <div className="text-xs text-muted-foreground">INTERESTED</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  {serviceData.status === "active" && (
                    <>
                      <Dialog open={showVolunteerDialog} onOpenChange={setShowVolunteerDialog}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
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

              {/* Volunteer Coordinator */}
              {serviceData.coordinatorName && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <UserCheck className="h-5 w-5 mr-2" />
                      Volunteer Coordinator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-green-500 text-white">
                            {serviceData.coordinatorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{serviceData.coordinatorName}</h4>
                          <p className="text-sm text-muted-foreground">{serviceData.coordinatorRole}</p>
                          {serviceData.coordinatorAvailable && (
                            <div className="flex items-center space-x-1 text-xs text-green-600">
                              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                              <span>Available for questions</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Contact Mike for questions about volunteer requirements, background checks, or safety protocols.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Volunteer Matching */}
              {serviceData.matchScore && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="h-5 w-5 mr-2" />
                      Volunteer Matching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold">Match Score: {serviceData.matchScore}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your profile, location, and availability. High compatibility for senior assistance.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Car className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">Transportation:</span>
                          <span className="font-medium">Compatible</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock3 className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">Schedule:</span>
                          <span className="font-medium">Tuesday AM available</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Dumbbell className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">Physical:</span>
                          <span className="font-medium">Suitable</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Stethoscope className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-medium">Senior-friendly</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}