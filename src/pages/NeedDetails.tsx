import React, { useState } from "react";
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
  UserPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NeedData {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "Immediate" | "This Week" | "Flexible";
  status: "Active" | "Inactive" | "Archived";
  location: string;
  duration: string;
  postedAt: string;
  lastUpdated: string;
  viewCount: number;
  volunteerCount: number;
  responseCount: number;
  requesterName: string;
  requesterAvatar?: string;
}

interface Volunteer {
  id: string;
  name: string;
  avatar?: string;
  status: "pending" | "accepted" | "declined";
  appliedAt: string;
  message?: string;
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
  const [needData, setNeedData] = useState<NeedData>({
    id: id || "1",
    title: "Weekly grocery shopping assistance",
    description: "Need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help with carrying bags and reaching items on high shelves.",
    category: "Transportation & Errands",
    urgency: "This Week",
    status: "Active",
    location: "Downtown Market District",
    duration: "2 hours",
    postedAt: "2 days ago",
    lastUpdated: "Yesterday",
    viewCount: 45,
    volunteerCount: 5,
    responseCount: 12,
    requesterName: "Sarah Johnson",
    requesterAvatar: undefined
  });

  const [volunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Michael Chen",
      status: "pending",
      appliedAt: "1 day ago",
      message: "I'd be happy to help with grocery shopping! I have experience helping seniors and have a reliable vehicle."
    },
    {
      id: "2", 
      name: "Emily Rodriguez",
      status: "accepted",
      appliedAt: "2 days ago",
      message: "I'm available Tuesday mornings and have helped with similar requests before."
    },
    {
      id: "3",
      name: "David Kim",
      status: "pending", 
      appliedAt: "3 days ago"
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
  const [editForm, setEditForm] = useState({
    title: needData.title,
    description: needData.description,
    category: needData.category,
    urgency: needData.urgency,
    location: needData.location,
    duration: needData.duration
  });

  const urgencyColors = {
    "Immediate": "bg-destructive text-destructive-foreground",
    "This Week": "bg-accent text-accent-foreground", 
    "Flexible": "bg-secondary text-secondary-foreground"
  };

  const statusColors = {
    "Active": "bg-primary text-primary-foreground",
    "Inactive": "bg-muted text-muted-foreground",
    "Archived": "bg-secondary text-secondary-foreground"
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

  const handleStatusChange = (newStatus: "Active" | "Inactive") => {
    setNeedData(prev => ({ ...prev, status: newStatus }));
    toast({
      title: `Need marked as ${newStatus.toLowerCase()}`,
      description: newStatus === "Active" ? "Your need is now visible to volunteers" : "Your need is now hidden from volunteers"
    });
  };

  const handleArchive = () => {
    setNeedData(prev => ({ ...prev, status: "Archived" }));
    toast({
      title: "Need archived",
      description: "This need has been moved to your archived requests."
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
    toast({
      title: action === "accept" ? "Volunteer accepted" : "Volunteer declined",
      description: action === "accept" ? "The volunteer has been notified." : "The volunteer has been notified of your decision."
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/my-needs")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Title and Status */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">{needData.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge className={statusColors[needData.status]}>
              {needData.status}
            </Badge>
            <Badge className={urgencyColors[needData.urgency]}>
              {needData.urgency}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">{needData.description}</p>
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
            </CardContent>
          </Card>
        </div>

        {/* Status Controls */}
        {needData.status !== "Archived" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={needData.status === "Active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("Active")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Active
                </Button>
                <Button
                  variant={needData.status === "Inactive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("Inactive")}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Mark Inactive
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Volunteers Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Volunteer Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={volunteer.avatar} />
                    <AvatarFallback>
                      {volunteer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{volunteer.name}</span>
                      <Badge variant={volunteer.status === "accepted" ? "default" : "outline"}>
                        {volunteer.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Applied {volunteer.appliedAt}
                    </div>
                    {volunteer.message && (
                      <div className="text-sm bg-muted p-2 rounded max-w-md">
                        {volunteer.message}
                      </div>
                    )}
                  </div>
                </div>
                {volunteer.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleVolunteerAction(volunteer.id, "accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVolunteerAction(volunteer.id, "decline")}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}