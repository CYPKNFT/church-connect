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
  MoreHorizontal
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
        return { ...baseData, status: "completed" as RequestStatus };
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [messagesDialogOpen, setMessagesDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<string | null>(null);
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
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Messages</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full pt-4">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isRequester ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-lg p-3 ${message.isRequester ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <div className="text-sm font-medium mb-1">{message.sender}</div>
                            <div className="text-sm">{message.content}</div>
                            <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 pt-4 border-t">
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
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              <Star className="w-4 h-4 mr-2" />
              Leave Review
            </Button>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Volunteer Applications
                <span className="text-sm font-normal text-muted-foreground">
                  {volunteers.filter(v => v.status === "pending").length} pending • {volunteers.filter(v => v.status === "accepted").length} accepted
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {volunteers.map((volunteer) => (
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
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="ghost" size="sm">
                        <User className="w-4 h-4 mr-1" />
                        Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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