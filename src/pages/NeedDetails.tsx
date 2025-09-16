import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Eye, 
  Users, 
  MessageSquare, 
  Edit, 
  Archive,
  Send,
  ArrowLeft,
  CheckCircle,
  XCircle,
  UserPlus,
  Star,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Trash2,
  RefreshCw,
  Heart,
  AlertCircle,
  Check,
  X,
  User,
  MoreHorizontal,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RequestStatus = "active" | "in_progress" | "completed" | "cancelled" | "expired";
type VolunteerStatus = "pending" | "accepted" | "declined";

interface NeedData {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "Immediate" | "This Week" | "Flexible";
  status: RequestStatus;
  location: string;
  duration: string;
  postedAt: string;
  lastUpdated: string;
  scheduledDate?: string;
  scheduledTime?: string;
  viewCount: number;
  volunteerCount: number;
  responseCount: number;
  requesterName: string;
  requesterAvatar?: string;
  acceptedVolunteer?: {
    id: string;
    name: string;
    avatar?: string;
  };
  review?: {
    rating: number;
    feedback: string;
    wouldRecommend: boolean;
    categories: {
      punctuality: number;
      helpfulness: number;
      communication: number;
      quality: number;
    };
    submittedAt: string;
  };
}

interface Volunteer {
  id: string;
  name: string;
  avatar?: string;
  status: VolunteerStatus;
  appliedAt: string;
  message?: string;
  rating?: number;
  helpedCount?: number;
  isVerified?: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRequester: boolean;
}

export default function NeedDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data - in real app, this would come from props or API
  const getInitialNeedData = (): NeedData => {
    const baseData = {
      id: id || "1",
      title: "Weekly grocery shopping assistance",
      description: "Need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help with carrying bags and reaching items on high shelves.",
      category: "Transportation & Errands",
      urgency: "This Week" as const,
      location: "Downtown Market District",
      duration: "2 hours",
      postedAt: "2 days ago",
      lastUpdated: "Yesterday",
      viewCount: 45,
      volunteerCount: 5,
      responseCount: 12,
      requesterName: "Sarah Johnson",
      requesterAvatar: undefined
    };

    // Different states based on ID for demo
    switch (id) {
      case "1":
        return { ...baseData, status: "active" as RequestStatus };
      case "2": 
        return { 
          ...baseData, 
          status: "in_progress" as RequestStatus,
          scheduledDate: "Tuesday, Oct 15",
          scheduledTime: "9:00 AM",
          acceptedVolunteer: { id: "2", name: "Emily Rodriguez", avatar: undefined }
        };
      case "3":
        return { 
          ...baseData, 
          status: "completed" as RequestStatus,
          acceptedVolunteer: { id: "2", name: "Emily Rodriguez", avatar: undefined },
          review: {
            rating: 5,
            feedback: "Emily was absolutely wonderful! She arrived right on time and was so helpful with everything. She made the shopping trip easy and even helped me organize everything when we got back. I would definitely recommend her to anyone who needs assistance.",
            wouldRecommend: true,
            categories: {
              punctuality: 5,
              helpfulness: 5,
              communication: 4,
              quality: 5
            },
            submittedAt: "2 days ago"
          }
        };
      case "4":
        return { ...baseData, status: "cancelled" as RequestStatus };
      case "5":
        return { ...baseData, status: "expired" as RequestStatus, postedAt: "2 weeks ago" };
      default:
        return { ...baseData, status: "active" as RequestStatus };
    }
  };

  const [needData, setNeedData] = useState<NeedData>(getInitialNeedData());

  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Michael Chen",
      status: "pending",
      appliedAt: "1 day ago",
      message: "I'd be happy to help with grocery shopping! I have experience helping seniors and have a reliable vehicle.",
      rating: 4.8,
      helpedCount: 23,
      isVerified: true
    },
    {
      id: "2", 
      name: "Emily Rodriguez",
      status: needData.status === "in_progress" ? "accepted" : "pending",
      appliedAt: "2 days ago",
      message: "I'm available Tuesday mornings and have helped with similar requests before.",
      rating: 4.9,
      helpedCount: 31,
      isVerified: true
    },
    {
      id: "3",
      name: "David Kim",
      status: "pending", 
      appliedAt: "3 days ago",
      message: "Would love to help! I live nearby and have flexible schedule.",
      rating: 4.7,
      helpedCount: 15,
      isVerified: false
    },
    {
      id: "4",
      name: "Maria Santos",
      status: "pending",
      appliedAt: "4 hours ago",
      message: "Available to help anytime this week. Have car and experience with elderly assistance.",
      rating: 5.0,
      helpedCount: 8,
      isVerified: true
    },
    {
      id: "5",
      name: "James Wilson",
      status: "pending",
      appliedAt: "6 hours ago",
      rating: 4.6,
      helpedCount: 42,
      isVerified: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Emily Rodriguez",
      content: "Hi Sarah! I just wanted to confirm - are you looking for help this Tuesday the 15th?",
      timestamp: "2 hours ago",
      isRequester: false
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      content: "Yes, that would be perfect! Should we meet at the main entrance around 9 AM?",
      timestamp: "1 hour ago", 
      isRequester: true
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [messagesDialogOpen, setMessagesDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<string | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [viewReviewDialogOpen, setViewReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    feedback: "",
    wouldRecommend: true,
    categories: {
      punctuality: 0,
      helpfulness: 0,
      communication: 0,
      quality: 0
    }
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState<{
    type: 'accept' | 'decline' | 'complete' | 'cancel' | 'archive' | 'reactivate';
    volunteerId?: string;
    volunteerName?: string;
  } | null>(null);
  
  const [editForm, setEditForm] = useState({
    title: needData.title,
    description: needData.description,
    category: needData.category,
    urgency: needData.urgency,
    location: needData.location,
    duration: needData.duration
  });

  // Auto-save functionality
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

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
    "active": "Seeking volunteers",
    "in_progress": "Help arranged", 
    "completed": "Successfully finished",
    "cancelled": "User cancelled",
    "expired": "No help found"
  };

  // Auto-save functionality
  const handleAutoSave = (field: string, value: string) => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    const timeout = setTimeout(() => {
      setIsSaving(true);
      setNeedData(prev => ({ ...prev, [field]: value, lastUpdated: "Just now" }));
      setTimeout(() => {
        setIsSaving(false);
        toast({
          title: "Changes saved",
          description: "Your edits have been automatically saved.",
        });
      }, 500);
    }, 1000);
    
    setAutoSaveTimeout(timeout);
  };

  const handleInlineEdit = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
    handleAutoSave(field, value);
  };

  const handleEdit = () => {
    setNeedData(prev => ({
      ...prev,
      ...editForm,
      lastUpdated: "Just now"
    }));
    setEditDialogOpen(false);
    toast({
      title: "Need updated successfully",
      description: "Your changes have been saved."
    });
  };

  const handleStatusChange = (newStatus: RequestStatus) => {
    setNeedData(prev => ({ ...prev, status: newStatus, lastUpdated: "Just now" }));
    
    let message = "";
    switch (newStatus) {
      case "active":
        message = "Your request is now visible to volunteers";
        break;
      case "completed":
        message = "Request marked as completed successfully";
        break;
      case "cancelled":
        message = "Request has been cancelled";
        break;
      default:
        message = `Status updated to ${statusLabels[newStatus]}`;
    }
    
    toast({
      title: "Status updated",
      description: message
    });
  };

  const handleReactivate = () => {
    setNeedData(prev => ({ 
      ...prev, 
      status: "active", 
      lastUpdated: "Just now",
      postedAt: "Just now"
    }));
    toast({
      title: "Request reactivated",
      description: "Your request is now visible to volunteers again."
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: needData.requesterName,
      content: newMessage,
      timestamp: "Just now",
      isRequester: true
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage("");
    toast({
      title: "Message sent",
      description: "Your message has been sent to volunteers."
    });
  };

  const handleVolunteerAction = (volunteerId: string, action: "accept" | "decline") => {
    setVolunteers(prev => prev.map(volunteer => 
      volunteer.id === volunteerId 
        ? { ...volunteer, status: action === "accept" ? "accepted" : "declined" }
        : volunteer
    ));

    if (action === "accept") {
      const volunteer = volunteers.find(v => v.id === volunteerId);
      setNeedData(prev => ({ 
        ...prev, 
        status: "in_progress",
        acceptedVolunteer: volunteer ? { id: volunteer.id, name: volunteer.name, avatar: volunteer.avatar } : undefined,
        scheduledDate: "Tuesday, Oct 15",
        scheduledTime: "9:00 AM",
        lastUpdated: "Just now"
      }));
    }

    toast({
      title: action === "accept" ? "Volunteer accepted!" : "Volunteer declined",
      description: action === "accept" 
        ? "Your request has been moved to 'In Progress'. The volunteer has been notified." 
        : "The volunteer has been notified of your decision."
    });
    setShowConfirmDialog(null);
  };

  const handleCompleteRequest = () => {
    setNeedData(prev => ({ ...prev, status: "completed", lastUpdated: "Just now" }));
    toast({
      title: "Request completed!",
      description: "Great! You can now leave a review for your helper."
    });
    setShowConfirmDialog(null);
  };

  const handleCancelRequest = () => {
    setNeedData(prev => ({ ...prev, status: "cancelled", lastUpdated: "Just now" }));
    toast({
      title: "Request cancelled",
      description: "Your request has been cancelled and volunteers have been notified."
    });
    setShowConfirmDialog(null);
  };

  const handleSubmitReview = () => {
    // Update the needData with the submitted review
    const submittedReview = {
      rating: reviewForm.rating,
      feedback: reviewForm.feedback,
      wouldRecommend: reviewForm.wouldRecommend,
      categories: reviewForm.categories,
      submittedAt: "Just now"
    };

    setNeedData(prev => ({
      ...prev,
      review: submittedReview
    }));

    toast({
      title: "Review submitted!",
      description: `Thank you for your feedback about ${needData.acceptedVolunteer?.name}. Your review helps build a stronger community.`
    });
    setReviewDialogOpen(false);
    setReviewForm({
      rating: 0,
      feedback: "",
      wouldRecommend: true,
      categories: {
        punctuality: 0,
        helpfulness: 0,
        communication: 0,
        quality: 0
      }
    });
  };

  const getStatusDisplay = () => {
    switch (needData.status) {
      case "active":
        const pendingCount = volunteers.filter(v => v.status === "pending").length;
        return `Looking for help • ${pendingCount} ${pendingCount === 1 ? 'person' : 'people'} applied`;
      case "in_progress":
        return `Help scheduled with ${needData.acceptedVolunteer?.name} for ${needData.scheduledDate} ${needData.scheduledTime}`;
      case "completed":
        return "Help completed successfully!";
      case "cancelled":
        return "Request cancelled";
      case "expired":
        return `No volunteers found • Posted ${needData.postedAt}`;
      default:
        return "Status unknown";
    }
  };

  const getActionButtons = () => {
    switch (needData.status) {
      case "active":
        const pendingCount = volunteers.filter(v => v.status === "pending").length;
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                const applicationsSection = document.getElementById('volunteer-applications');
                applicationsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Users className="w-4 h-4 mr-2" />
              Review Applications ({pendingCount})
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Request
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowConfirmDialog({ type: 'cancel' })}
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause Listing
            </Button>
          </div>
        );
      case "in_progress":
        return (
          <div className="flex flex-wrap gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message {needData.acceptedVolunteer?.name?.split(' ')[0]}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                  <SheetTitle>Messages with {needData.acceptedVolunteer?.name}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col flex-1 pt-4">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isRequester ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-lg p-3 ${message.isRequester ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <div className="text-sm font-medium mb-1">{message.isRequester ? 'You' : message.sender}</div>
                            <div className="text-sm">{message.content}</div>
                            <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 pt-4 border-t mt-auto">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowConfirmDialog({ type: 'complete' })}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        );
      case "completed":
        return (
          <div className="flex flex-wrap gap-2">
            {needData.review ? (
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-accent hover:text-accent-foreground hover:border-accent group"
                onClick={() => setViewReviewDialogOpen(true)}
              >
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 transition-colors ${
                        star <= needData.review!.rating 
                          ? "fill-accent text-accent group-hover:fill-accent-foreground group-hover:text-accent-foreground" 
                          : "text-muted-foreground/40 group-hover:text-accent-foreground/40"
                      }`} 
                    />
                  ))}
                </div>
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent-hover text-accent-foreground"
                onClick={() => setReviewDialogOpen(true)}
              >
                <Star className="w-4 h-4 mr-2" />
                Leave Review
              </Button>
            )}
            <Button variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Request Again
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
          </div>
        );
      case "cancelled":
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              onClick={() => setShowConfirmDialog({ type: 'reactivate' })}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Reactivate
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Permanently
            </Button>
          </div>
        );
      case "expired":
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Repost with Changes
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit & Republish
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/my-needs")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {isSaving && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
            Saving...
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Status Banner */}
        <Card className="border-l-4" style={{ borderLeftColor: statusColors[needData.status].replace('bg-', '').replace('-500', '').replace('-600', '') }}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[needData.status]}>
                    {statusLabels[needData.status]}
                  </Badge>
                  <Badge className={urgencyColors[needData.urgency]}>
                    {needData.urgency}
                  </Badge>
                </div>
                <p className="text-lg font-medium text-foreground">{getStatusDisplay()}</p>
              </div>
              {needData.status === "active" && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  {volunteers.filter(v => v.status === "pending").length} pending
                </div>
              )}
            </div>
            <div className="mt-4">
              {getActionButtons()}
            </div>
          </CardContent>
        </Card>

        {/* Title and Description */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              {editingField === "title" ? (
                <Input
                  value={editForm.title}
                  onChange={(e) => {
                    setEditForm(prev => ({ ...prev, title: e.target.value }));
                    handleInlineEdit("title", e.target.value);
                  }}
                  onBlur={() => setEditingField(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditingField(null)}
                  className="text-2xl font-bold"
                  autoFocus
                />
              ) : (
                <h1 
                  className="text-2xl font-bold text-foreground cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
                  onClick={() => setEditingField("title")}
                >
                  {needData.title}
                  <Edit className="w-4 h-4 ml-2 inline opacity-0 hover:opacity-100 transition-opacity" />
                </h1>
              )}
            </div>
            <div>
              {editingField === "description" ? (
                <Textarea
                  value={editForm.description}
                  onChange={(e) => {
                    setEditForm(prev => ({ ...prev, description: e.target.value }));
                    handleInlineEdit("description", e.target.value);
                  }}
                  onBlur={() => setEditingField(null)}
                  className="min-h-[100px]"
                  autoFocus
                />
              ) : (
                <p 
                  className="text-muted-foreground leading-relaxed cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
                  onClick={() => setEditingField("description")}
                >
                  {needData.description}
                  <Edit className="w-4 h-4 ml-2 inline opacity-0 hover:opacity-100 transition-opacity" />
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{needData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{needData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Posted {needData.postedAt}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{needData.viewCount} views</span>
              </div>
              {needData.scheduledDate && (
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled: {needData.scheduledDate} at {needData.scheduledTime}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Users className="w-4 h-4" />
                <span>{needData.volunteerCount} volunteers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MessageSquare className="w-4 h-4" />
                <span>{needData.responseCount} responses</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated {needData.lastUpdated}
              </div>
              <div className="text-sm text-muted-foreground">
                Category: {needData.category}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Volunteers Section - Only show if there are applications */}
        {volunteers.length > 0 && needData.status !== "cancelled" && needData.status !== "expired" && (
          <Card id="volunteer-applications">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Volunteer Applications
                <div className="flex items-center gap-4">
                  <span className="text-sm font-normal text-muted-foreground">
                    {volunteers.filter(v => v.status === "pending").length} pending • {volunteers.filter(v => v.status === "accepted").length} accepted
                  </span>
                  {needData.status === "in_progress" && volunteers.filter(v => v.status !== "accepted").length > 0 && (
                    <Collapsible open={showAllVolunteers} onOpenChange={setShowAllVolunteers}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          {showAllVolunteers ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Hide Other Applicants
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              Show All Applicants ({volunteers.filter(v => v.status !== "accepted").length})
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                // For in_progress status, show accepted volunteer first, then others in collapsible
                if (needData.status === "in_progress") {
                  const acceptedVolunteers = volunteers.filter(v => v.status === "accepted");
                  const otherVolunteers = volunteers.filter(v => v.status !== "accepted");
                  
                  return (
                    <>
                      {/* Always show accepted volunteers */}
                      {acceptedVolunteers.map((volunteer) => (
                        <div 
                          key={volunteer.id} 
                          className="relative p-6 border border-green-300/60 bg-gradient-to-br from-green-50 to-green-100/50 dark:border-green-600/50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <Avatar className="h-14 w-14 ring-2 ring-green-200/50 dark:ring-green-600/40">
                                  <AvatarImage src={volunteer.avatar} />
                                  <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 font-semibold">
                                    {volunteer.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white dark:text-green-900" />
                                </div>
                              </div>
                              <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="font-semibold text-lg text-foreground">{volunteer.name}</span>
                                  {volunteer.isVerified && (
                                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                      <CheckCircle className="w-3 h-3" />
                                      Verified
                                    </div>
                                  )}
                                  <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white border-0 font-medium px-3 py-1">
                                    ✓ Accepted
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{volunteer.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    <span>{volunteer.helpedCount} people helped</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>Applied {volunteer.appliedAt}</span>
                                  </div>
                                </div>
                                {volunteer.message && (
                                  <div className="text-sm bg-white/60 dark:bg-gray-800/60 border border-green-200/60 dark:border-green-600/40 p-4 rounded-lg max-w-md shadow-sm">
                                    <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Message from volunteer:</div>
                                    <div className="text-gray-700 dark:text-gray-300 italic">"{volunteer.message}"</div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                     Message
                                   </Button>
                                 </SheetTrigger>
                                <SheetContent className="flex flex-col h-full">
                                  <SheetHeader>
                                    <SheetTitle>Messages with {volunteer.name}</SheetTitle>
                                    <p className="text-sm text-muted-foreground">
                                      Coordinate details for your volunteer work
                                    </p>
                                  </SheetHeader>
                                  <div className="flex flex-col flex-1 pt-4">
                                    <ScrollArea className="flex-1 pr-4 mb-4">
                                      <div className="space-y-4">
                                        <div className="flex justify-start">
                                          <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                                            <div className="text-sm font-medium mb-1">{volunteer.name}</div>
                                            <div className="text-sm">Thank you so much for volunteering to help me! I really appreciate it.</div>
                                            <div className="text-xs opacity-70 mt-1">2 hours ago</div>
                                          </div>
                                        </div>
                                        <div className="flex justify-end">
                                          <div className="max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground">
                                            <div className="text-sm font-medium mb-1">You</div>
                                            <div className="text-sm">Of course! Happy to help. I'll be there at 1:45 PM to give us plenty of time.</div>
                                            <div className="text-xs opacity-70 mt-1">1 hour ago</div>
                                          </div>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                    <div className="flex gap-2 pt-4 border-t mt-auto">
                                      <Input
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                      />
                                      <Button size="sm" onClick={handleSendMessage} className="bg-amber-500 hover:bg-amber-600">
                                        <Send className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </SheetContent>
                               </Sheet>
                              <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Collapsible section for other volunteers */}
                      {otherVolunteers.length > 0 && (
                        <Collapsible open={showAllVolunteers} onOpenChange={setShowAllVolunteers}>
                          <CollapsibleContent className="space-y-4">
                            {otherVolunteers.map((volunteer) => (
                              <div 
                                key={volunteer.id} 
                                className={`relative p-4 border rounded-lg transition-all duration-200 ${
                                  volunteer.status === "declined" ? "border-red-200 bg-red-50/50 opacity-60" :
                                  "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-12 w-12">
                                      <AvatarImage src={volunteer.avatar} />
                                      <AvatarFallback className="bg-primary/10">
                                        {volunteer.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2 flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-medium text-foreground">{volunteer.name}</span>
                                        {volunteer.isVerified && (
                                          <div className="flex items-center gap-1 text-xs text-blue-600">
                                            <CheckCircle className="w-3 h-3" />
                                            Verified
                                          </div>
                                        )}
                                        <Badge 
                                          variant={volunteer.status === "declined" ? "destructive" : "outline"}
                                          className="capitalize"
                                        >
                                          {volunteer.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                          <span>{volunteer.rating}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{volunteer.helpedCount} people helped</span>
                                        <span>•</span>
                                        <span>Applied {volunteer.appliedAt}</span>
                                      </div>
                                      {volunteer.message && (
                                        <div className="text-sm bg-muted p-3 rounded-md max-w-md">
                                          "{volunteer.message}"
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <Sheet>
                                      <SheetTrigger asChild>
                                        <Button variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-amber-500">
                                          <MessageSquare className="w-4 h-4 mr-1" />
                                          Message
                                        </Button>
                                      </SheetTrigger>
                                      <SheetContent className="flex flex-col h-full">
                                        <SheetHeader>
                                          <SheetTitle>Messages with {volunteer.name}</SheetTitle>
                                          <p className="text-sm text-muted-foreground">
                                            Coordinate details for your volunteer work
                                          </p>
                                        </SheetHeader>
                                        <div className="flex flex-col flex-1 pt-4">
                                          <ScrollArea className="flex-1 pr-4 mb-4">
                                            <div className="space-y-4">
                                              <div className="flex justify-start">
                                                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                                                  <div className="text-sm font-medium mb-1">{volunteer.name}</div>
                                                  <div className="text-sm">Thank you so much for volunteering to help me! I really appreciate it.</div>
                                                  <div className="text-xs opacity-70 mt-1">2 hours ago</div>
                                                </div>
                                              </div>
                                              <div className="flex justify-end">
                                                <div className="max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground">
                                                  <div className="text-sm font-medium mb-1">You</div>
                                                  <div className="text-sm">Of course! Happy to help. I'll be there at 1:45 PM to give us plenty of time.</div>
                                                  <div className="text-xs opacity-70 mt-1">1 hour ago</div>
                                                </div>
                                              </div>
                                            </div>
                                          </ScrollArea>
                                          <div className="flex gap-2 pt-4 border-t mt-auto">
                                            <Input
                                              placeholder="Type your message..."
                                              value={newMessage}
                                              onChange={(e) => setNewMessage(e.target.value)}
                                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            />
                                            <Button size="sm" onClick={handleSendMessage} className="bg-amber-500 hover:bg-amber-600">
                                              <Send className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      </SheetContent>
                                    </Sheet>
                                    <Button variant="ghost" size="sm">
                                      <User className="w-4 h-4 mr-1" />
                                      Profile
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </>
                  );
                } else {
                  // For other statuses, show all volunteers normally
                  return volunteers.map((volunteer) => (
                    <div 
                      key={volunteer.id} 
                      className={`relative p-4 border rounded-lg transition-all duration-200 ${
                        volunteer.status === "accepted" ? "border-green-200 bg-green-50/50" :
                        volunteer.status === "declined" ? "border-red-200 bg-red-50/50 opacity-60" :
                        "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={volunteer.avatar} />
                            <AvatarFallback className="bg-primary/10">
                              {volunteer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-foreground">{volunteer.name}</span>
                              {volunteer.isVerified && (
                                <div className="flex items-center gap-1 text-xs text-blue-600">
                                  <CheckCircle className="w-3 h-3" />
                                  Verified
                                </div>
                              )}
                              <Badge 
                                variant={volunteer.status === "accepted" ? "default" : 
                                       volunteer.status === "declined" ? "destructive" : "outline"}
                                className="capitalize"
                              >
                                {volunteer.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{volunteer.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{volunteer.helpedCount} people helped</span>
                              <span>•</span>
                              <span>Applied {volunteer.appliedAt}</span>
                            </div>
                            {volunteer.message && (
                              <div className="text-sm bg-muted p-3 rounded-md max-w-md">
                                "{volunteer.message}"
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {volunteer.status === "pending" && needData.status === "active" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => setShowConfirmDialog({ 
                                  type: 'accept', 
                                  volunteerId: volunteer.id, 
                                  volunteerName: volunteer.name 
                                })}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowConfirmDialog({ 
                                  type: 'decline', 
                                  volunteerId: volunteer.id, 
                                  volunteerName: volunteer.name 
                                })}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Decline
                              </Button>
                            </>
                          )}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-amber-500">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="flex flex-col h-full">
                              <SheetHeader>
                                <SheetTitle>Messages with {volunteer.name}</SheetTitle>
                                <p className="text-sm text-muted-foreground">
                                  Coordinate details for your volunteer work
                                </p>
                              </SheetHeader>
                              <div className="flex flex-col flex-1 pt-4">
                                <ScrollArea className="flex-1 pr-4 mb-4">
                                  <div className="space-y-4">
                                    <div className="flex justify-start">
                                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                                        <div className="text-sm font-medium mb-1">{volunteer.name}</div>
                                        <div className="text-sm">Thank you so much for volunteering to help me! I really appreciate it.</div>
                                        <div className="text-xs opacity-70 mt-1">2 hours ago</div>
                                      </div>
                                    </div>
                                    <div className="flex justify-end">
                                      <div className="max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground">
                                        <div className="text-sm font-medium mb-1">You</div>
                                        <div className="text-sm">Of course! Happy to help. I'll be there at 1:45 PM to give us plenty of time.</div>
                                        <div className="text-xs opacity-70 mt-1">1 hour ago</div>
                                      </div>
                                    </div>
                                  </div>
                                </ScrollArea>
                                <div className="flex gap-2 pt-4 border-t mt-auto">
                                  <Input
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                  />
                                  <Button size="sm" onClick={handleSendMessage} className="bg-amber-500 hover:bg-amber-600">
                                    <Send className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                          <Button variant="ghost" size="sm">
                            <User className="w-4 h-4 mr-1" />
                            Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ));
                }
              })()}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={editForm.category} onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transportation & Errands">Transportation & Errands</SelectItem>
                    <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                    <SelectItem value="Childcare">Childcare</SelectItem>
                    <SelectItem value="Elder Care">Elder Care</SelectItem>
                    <SelectItem value="Food & Meals">Food & Meals</SelectItem>
                    <SelectItem value="Technology Help">Technology Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={editForm.urgency} onValueChange={(value) => setEditForm(prev => ({ ...prev, urgency: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="This Week">This Week</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={editForm.duration}
                  onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Leave a Review for {needData.acceptedVolunteer?.name}
            </DialogTitle>
            <p className="text-center text-muted-foreground">
              Your feedback helps build a stronger community
            </p>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Overall Rating */}
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Overall Experience</h3>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        star <= reviewForm.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300 hover:text-yellow-300"
                      }`} 
                    />
                  </button>
                ))}
              </div>
              {reviewForm.rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {reviewForm.rating === 1 && "Poor experience"}
                  {reviewForm.rating === 2 && "Fair experience"}
                  {reviewForm.rating === 3 && "Good experience"}
                  {reviewForm.rating === 4 && "Great experience"}
                  {reviewForm.rating === 5 && "Excellent experience"}
                </p>
              )}
            </div>

            <Separator />

            {/* Category Ratings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Rate Specific Areas</h3>
              
              {[
                { key: 'punctuality', label: 'Punctuality', icon: Clock },
                { key: 'helpfulness', label: 'Helpfulness', icon: Heart },
                { key: 'communication', label: 'Communication', icon: MessageSquare },
                { key: 'quality', label: 'Quality of Help', icon: CheckCircle }
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{label}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewForm(prev => ({
                          ...prev,
                          categories: { ...prev.categories, [key]: star }
                        }))}
                        className="transition-all duration-200 hover:scale-110"
                      >
                        <Star 
                          className={`w-5 h-5 ${
                            star <= reviewForm.categories[key as keyof typeof reviewForm.categories]
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300 hover:text-yellow-300"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Written Feedback */}
            <div className="space-y-3">
              <Label htmlFor="feedback" className="text-lg font-semibold">
                Share Your Experience
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tell others about your experience... What went well? Any suggestions for improvement?"
                value={reviewForm.feedback}
                onChange={(e) => setReviewForm(prev => ({ ...prev, feedback: e.target.value }))}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Recommendation */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Would you recommend this volunteer?</Label>
              <div className="flex gap-4">
                <Button
                  variant={reviewForm.wouldRecommend ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewForm(prev => ({ ...prev, wouldRecommend: true }))}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Yes, I'd recommend
                </Button>
                <Button
                  variant={!reviewForm.wouldRecommend ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewForm(prev => ({ ...prev, wouldRecommend: false }))}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  No, I wouldn't recommend
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview}
              disabled={reviewForm.rating === 0}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Star className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Review Dialog */}
      <Dialog open={viewReviewDialogOpen} onOpenChange={setViewReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Review for {needData.acceptedVolunteer?.name}
            </DialogTitle>
            <p className="text-center text-muted-foreground">
              Submitted {needData.review?.submittedAt}
            </p>
          </DialogHeader>
          
          {needData.review && (
            <div className="space-y-6 py-4">
              {/* Overall Rating */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Overall Experience</h3>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-8 h-8 ${
                        star <= needData.review!.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {needData.review.rating === 1 && "Poor experience"}
                  {needData.review.rating === 2 && "Fair experience"}
                  {needData.review.rating === 3 && "Good experience"}
                  {needData.review.rating === 4 && "Great experience"}
                  {needData.review.rating === 5 && "Excellent experience"}
                </p>
              </div>

              <Separator />

              {/* Category Ratings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Detailed Ratings</h3>
                
                {[
                  { key: 'punctuality', label: 'Punctuality', icon: Clock },
                  { key: 'helpfulness', label: 'Helpfulness', icon: Heart },
                  { key: 'communication', label: 'Communication', icon: MessageSquare },
                  { key: 'quality', label: 'Quality of Help', icon: CheckCircle }
                ].map(({ key, label, icon: IconComponent }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{label}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-5 h-5 ${
                            star <= needData.review!.categories[key as keyof typeof needData.review.categories]
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Written Feedback */}
              {needData.review.feedback && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Written Feedback</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground leading-relaxed">"{needData.review.feedback}"</p>
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Recommendation</h3>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  needData.review.wouldRecommend 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  {needData.review.wouldRecommend ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Would recommend this volunteer</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span className="font-medium">Would not recommend this volunteer</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setViewReviewDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialogs */}
      <AlertDialog open={!!showConfirmDialog} onOpenChange={() => setShowConfirmDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showConfirmDialog?.type === 'accept' && `Accept ${showConfirmDialog.volunteerName}?`}
              {showConfirmDialog?.type === 'decline' && `Decline ${showConfirmDialog.volunteerName}?`}
              {showConfirmDialog?.type === 'complete' && 'Mark as Complete?'}
              {showConfirmDialog?.type === 'cancel' && 'Cancel Request?'}
              {showConfirmDialog?.type === 'reactivate' && 'Reactivate Request?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showConfirmDialog?.type === 'accept' && 
                `This will accept ${showConfirmDialog.volunteerName} as your helper and move your request to "In Progress". Other volunteers will be automatically declined.`}
              {showConfirmDialog?.type === 'decline' && 
                `This will decline ${showConfirmDialog.volunteerName}'s application. They will be notified of your decision.`}
              {showConfirmDialog?.type === 'complete' && 
                'This will mark your request as completed. You can leave a review for your helper afterwards.'}
              {showConfirmDialog?.type === 'cancel' && 
                'This will cancel your request and notify any volunteers who have applied.'}
              {showConfirmDialog?.type === 'reactivate' && 
                'This will make your request visible to volunteers again.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (showConfirmDialog?.type === 'accept' && showConfirmDialog.volunteerId) {
                  handleVolunteerAction(showConfirmDialog.volunteerId, 'accept');
                } else if (showConfirmDialog?.type === 'decline' && showConfirmDialog.volunteerId) {
                  handleVolunteerAction(showConfirmDialog.volunteerId, 'decline');
                } else if (showConfirmDialog?.type === 'complete') {
                  handleCompleteRequest();
                } else if (showConfirmDialog?.type === 'cancel') {
                  handleCancelRequest();
                } else if (showConfirmDialog?.type === 'reactivate') {
                  handleReactivate();
                }
              }}
              className={
                showConfirmDialog?.type === 'accept' ? 'bg-green-600 hover:bg-green-700' :
                showConfirmDialog?.type === 'decline' ? 'bg-red-600 hover:bg-red-700' :
                showConfirmDialog?.type === 'complete' ? 'bg-green-600 hover:bg-green-700' :
                showConfirmDialog?.type === 'reactivate' ? 'bg-green-600 hover:bg-green-700' :
                ''
              }
            >
              {showConfirmDialog?.type === 'accept' && 'Accept Volunteer'}
              {showConfirmDialog?.type === 'decline' && 'Decline'}
              {showConfirmDialog?.type === 'complete' && 'Mark Complete'}
              {showConfirmDialog?.type === 'cancel' && 'Cancel Request'}
              {showConfirmDialog?.type === 'reactivate' && 'Reactivate'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}