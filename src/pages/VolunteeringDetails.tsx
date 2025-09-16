import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  Star, 
  Award,
  Phone,
  CheckCircle2,
  XCircle,
  Edit3,
  Save,
  X,
  Heart,
  Timer,
  Users,
  Ban,
  RotateCcw,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for volunteering details
const sampleVolunteering = {
  "1": {
    id: "1",
    title: "Transportation to medical appointment",
    description: "Drive to routine cardiology checkup at Central Medical Center. Patient needs assistance with mobility and would appreciate a calm, patient driver.",
    requester: {
      name: "Mrs. Eleanor Johnson",
      avatar: "/placeholder.svg",
      phone: "(555) 123-4567",
      rating: 4.8,
      verifiedUser: true
    },
    category: "Transportation",
    urgency: "Immediate",
    location: "Central Medical Center, 123 Health Drive",
    estimatedTime: "2 hours",
    date: "Tomorrow 2:00 PM",
    status: "confirmed",
    volunteeredAt: "3 days ago",
    rating: null,
    feedback: null,
    specialInstructions: "Please arrive 15 minutes early. Patient uses a walker and may need assistance getting to the car.",
    messages: [
      {
        id: 1,
        sender: "Mrs. Eleanor Johnson",
        content: "Thank you so much for volunteering to help me! I really appreciate it.",
        timestamp: "2 hours ago",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Of course! Happy to help. I'll be there at 1:45 PM to give us plenty of time.",
        timestamp: "1 hour ago",
        isOwn: true
      }
    ]
  },
  "2": {
    id: "2",
    title: "Meal preparation for new parents",
    description: "Prepare and deliver healthy meals for family with newborn baby. They have dietary restrictions: no nuts, dairy-free preferred.",
    requester: {
      name: "The Smith Family",
      avatar: "/placeholder.svg",
      phone: "(555) 987-6543",
      rating: 5.0,
      verifiedUser: true
    },
    category: "Meals",
    urgency: "This Week",
    location: "Riverside Neighborhood",
    estimatedTime: "1.5 hours",
    date: "Friday 6:00 PM",
    status: "pending",
    volunteeredAt: "1 day ago",
    rating: null,
    feedback: null,
    specialInstructions: "Please prepare dairy-free meals. They have a severe nut allergy in the household.",
    messages: []
  },
  "4": {
    id: "4",
    title: "Garden cleanup assistance",
    description: "Seasonal garden cleanup and planting new flowers. Help with weeding, pruning, and planting spring bulbs.",
    requester: {
      name: "Mr. Robert Chen",
      avatar: "/placeholder.svg",
      phone: "(555) 234-5678",
      rating: 4.9,
      verifiedUser: true
    },
    category: "Home & Garden",
    urgency: "Flexible",
    location: "Maple Street",
    estimatedTime: "4 hours",
    date: "Last Saturday",
    status: "completed",
    volunteeredAt: "2 weeks ago",
    rating: 5,
    feedback: "Amazing help! Sarah was so thorough and kind. My garden looks beautiful! She went above and beyond and even helped me plan the layout for next season.",
    specialInstructions: "Bring gardening gloves. Tools will be provided.",
    messages: [
      {
        id: 1,
        sender: "Mr. Robert Chen",
        content: "The garden looks absolutely wonderful! Thank you so much for all your hard work.",
        timestamp: "1 week ago",
        isOwn: false
      }
    ]
  }
};

export default function VolunteeringDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [volunteering, setVolunteering] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  useEffect(() => {
    // Simulate loading volunteering details
    const volunteeringData = sampleVolunteering[id as keyof typeof sampleVolunteering];
    if (volunteeringData) {
      setVolunteering(volunteeringData);
      setEditedTitle(volunteeringData.title);
      setEditedDescription(volunteeringData.description);
      setMessages(volunteeringData.messages || []);
    } else {
      navigate("/volunteering");
    }
  }, [id, navigate]);

  const getStatusDisplay = () => {
    if (!volunteering) return "";
    
    switch (volunteering.status) {
      case "pending":
        return "Awaiting confirmation from requester";
      case "confirmed":
        return `Confirmed • ${volunteering.date}`;
      case "completed":
        return "Volunteering completed successfully!";
      case "cancelled":
        return "Volunteering was cancelled";
      default:
        return volunteering.status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "confirmed": return "bg-green-100 text-green-700 border-green-200";
      case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "bg-red-100 text-red-700 border-red-200";
      case "This Week": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Flexible": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVolunteering(prev => ({
      ...prev,
      title: editedTitle,
      description: editedDescription
    }));
    
    setIsEditing(false);
    setIsLoading(false);
    
    toast({
      title: "Changes saved",
      description: "Your volunteer commitment has been updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditedTitle(volunteering.title);
    setEditedDescription(volunteering.description);
    setIsEditing(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: "Just now",
      isOwn: true
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the requester.",
    });
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVolunteering(prev => ({
      ...prev,
      status: "cancelled"
    }));
    
    setIsLoading(false);
    toast({
      title: "Volunteering withdrawn",
      description: "You have withdrawn from this volunteer opportunity.",
      variant: "destructive"
    });
  };

  const handleMarkComplete = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVolunteering(prev => ({
      ...prev,
      status: "completed"
    }));
    
    setIsLoading(false);
    toast({
      title: "Marked as complete",
      description: "Great job! The requester will be notified.",
    });
  };

  const getActionButtons = () => {
    if (!volunteering) return null;

    switch (volunteering.status) {
      case "pending":
        return (
          <div className="flex gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <XCircle className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Withdraw from volunteering?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove your volunteer application. The requester will be notified.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleWithdraw} className="bg-red-600 hover:bg-red-700">
                    Withdraw
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );

      case "confirmed":
        return (
          <div className="flex gap-3">
            <Sheet open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Messages with {volunteering.requester.name}</SheetTitle>
                  <SheetDescription>
                    Coordinate details for your volunteer work
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col h-full mt-6">
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No messages yet</p>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-xl ${
                              message.isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[80px] rounded-xl"
                      />
                      <Button onClick={handleSendMessage} size="sm" className="rounded-xl">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="rounded-xl">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Mark as complete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will mark your volunteer work as completed. The requester will be notified.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleMarkComplete}>
                    Mark Complete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <XCircle className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Withdraw from volunteering?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will cancel your volunteer commitment. The requester will need to find another volunteer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleWithdraw} className="bg-red-600 hover:bg-red-700">
                    Withdraw
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );

      case "completed":
        return (
          <div className="flex gap-3">
            {!volunteering.rating && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="rounded-xl">
                    <Star className="w-4 h-4 mr-2" />
                    Rate Experience
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate your volunteer experience</DialogTitle>
                    <DialogDescription>
                      Help others by sharing your experience with this volunteer opportunity.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          className="p-1"
                        >
                          <Star className="w-6 h-6" />
                        </Button>
                      ))}
                    </div>
                    <Textarea placeholder="Leave a review (optional)" className="rounded-xl" />
                    <Button className="w-full rounded-xl">Submit Review</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!volunteering) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Volunteering not found</h2>
          <p className="text-muted-foreground mb-4">The volunteering you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/volunteering")} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Volunteering
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/volunteering")}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Volunteering
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Status */}
            <Card className="border-0 shadow-card bg-card rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <Input
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="text-2xl font-bold border-2 border-primary rounded-xl"
                        />
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="border-2 border-primary rounded-xl"
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={isLoading}
                            className="rounded-xl"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {isLoading ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="rounded-xl"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-3xl font-bold text-foreground">{volunteering.title}</h1>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="rounded-xl opacity-50 hover:opacity-100"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                          {volunteering.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <div className="flex flex-wrap gap-3">
                    <Badge className={`${getStatusColor(volunteering.status)} rounded-full px-4 py-2`}>
                      {getStatusDisplay()}
                    </Badge>
                    <Badge className={`${getUrgencyColor(volunteering.urgency)} rounded-full px-4 py-2`}>
                      {volunteering.urgency}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-4 py-2">
                      {volunteering.category}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="border-0 shadow-card bg-card rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Volunteer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{volunteering.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Estimated Time</p>
                      <p className="text-muted-foreground">{volunteering.estimatedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Scheduled Date</p>
                      <p className="text-muted-foreground">{volunteering.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Volunteered</p>
                      <p className="text-muted-foreground">{volunteering.volunteeredAt}</p>
                    </div>
                  </div>
                </div>

                {volunteering.specialInstructions && (
                  <div className="bg-muted rounded-xl p-4">
                    <h4 className="font-medium mb-2">Special Instructions</h4>
                    <p className="text-muted-foreground">{volunteering.specialInstructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Feedback (if completed) */}
            {volunteering.status === "completed" && volunteering.feedback && (
              <Card className="border-0 shadow-card bg-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Feedback Received
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (volunteering.rating || 0)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        {volunteering.rating}/5 stars
                      </span>
                    </div>
                    <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">
                      "{volunteering.feedback}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Requester Info */}
            <Card className="border-0 shadow-card bg-card rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Requester
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={volunteering.requester.avatar} />
                    <AvatarFallback>
                      {volunteering.requester.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{volunteering.requester.name}</h3>
                      {volunteering.requester.verifiedUser && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(volunteering.requester.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {volunteering.requester.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{volunteering.requester.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 shadow-card bg-card rounded-2xl">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getActionButtons()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}