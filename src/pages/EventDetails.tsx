import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowLeft,
  Heart,
  UserPlus,
  MessageSquare,
  Camera,
  Star,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Share2,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EventDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  banner_image_url?: string;
  location_text: string;
  start_datetime: string;
  end_datetime: string;
  organizer_name: string;
  organizer_contact: string;
  attending_count: number;
  interested_count: number;
  volunteer_slots_total: number;
  volunteer_slots_filled: number;
  donation_total: number;
  agenda?: string[];
  volunteer_roles: VolunteerRole[];
  comments: Comment[];
  testimonies: Testimony[];
  user_rsvp_status?: string;
  user_volunteer_signups: string[];
}

interface VolunteerRole {
  id: string;
  role_name: string;
  description: string;
  max_volunteers: number;
  current_volunteers: number;
  requires_background_check: boolean;
  signups: VolunteerSignup[];
}

interface VolunteerSignup {
  id: string;
  member_name: string;
  status: string;
}

interface Comment {
  id: string;
  member_name: string;
  comment: string;
  created_at: string;
}

interface Testimony {
  id: string;
  member_name: string;
  testimony: string;
  created_at: string;
}

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newTestimony, setNewTestimony] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      loadEventDetails(id);
    }
  }, [id]);

  const loadEventDetails = async (eventId: string) => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockEvent: EventDetails = {
        id: eventId,
        title: "Community Service Marathon",
        description: "Join us for a full day of serving our community through multiple service projects. We'll be volunteering at the local food bank, organizing a park cleanup, helping elderly residents with yard work, and assisting local families with home repairs. This is a fantastic opportunity to make a real difference in our community while building relationships with fellow church members. All skill levels welcome - there's something for everyone to contribute!",
        category: "service",
        featured: true,
        banner_image_url: "/api/placeholder/1200/400",
        location_text: "Multiple Community Locations",
        start_datetime: "2024-04-15T09:00:00Z",
        end_datetime: "2024-04-15T17:00:00Z",
        organizer_name: "Community Outreach Team",
        organizer_contact: "outreach@church.org",
        attending_count: 127,
        interested_count: 45,
        volunteer_slots_total: 50,
        volunteer_slots_filled: 38,
        donation_total: 2450.00,
        agenda: [
          "9:00 AM - Opening Prayer & Team Assignments",
          "9:30 AM - Depart to Service Locations",
          "10:00 AM - 12:00 PM - Morning Service Projects",
          "12:00 PM - 1:00 PM - Lunch (provided)",
          "1:00 PM - 4:00 PM - Afternoon Service Projects",
          "4:00 PM - 5:00 PM - Cleanup & Return to Church",
          "5:00 PM - Closing Testimony & Prayer"
        ],
        volunteer_roles: [
          {
            id: "1",
            role_name: "Team Leaders",
            description: "Lead a team of 8-10 volunteers at service locations",
            max_volunteers: 5,
            current_volunteers: 5,
            requires_background_check: true,
            signups: [
              { id: "1", member_name: "Sarah Johnson", status: "confirmed" },
              { id: "2", member_name: "Mike Chen", status: "confirmed" },
              { id: "3", member_name: "Lisa Rodriguez", status: "confirmed" },
              { id: "4", member_name: "David Kim", status: "confirmed" },
              { id: "5", member_name: "Rachel Adams", status: "confirmed" }
            ]
          },
          {
            id: "2",
            role_name: "Food Bank Volunteers",
            description: "Sort and organize donations at the community food bank",
            max_volunteers: 15,
            current_volunteers: 12,
            requires_background_check: false,
            signups: [
              { id: "6", member_name: "John Smith", status: "confirmed" },
              { id: "7", member_name: "Mary Wilson", status: "confirmed" },
              { id: "8", member_name: "Tom Brown", status: "pending" }
            ]
          },
          {
            id: "3",
            role_name: "Park Cleanup Crew",
            description: "Help clean and beautify our local community park",
            max_volunteers: 20,
            current_volunteers: 16,
            requires_background_check: false,
            signups: [
              { id: "9", member_name: "Jennifer Lee", status: "confirmed" },
              { id: "10", member_name: "Robert Taylor", status: "confirmed" }
            ]
          },
          {
            id: "4",
            role_name: "Setup & Logistics",
            description: "Coordinate supplies, transportation, and meal preparation",
            max_volunteers: 8,
            current_volunteers: 4,
            requires_background_check: false,
            signups: [
              { id: "11", member_name: "Amanda Davis", status: "confirmed" },
              { id: "12", member_name: "Chris Martinez", status: "confirmed" }
            ]
          },
          {
            id: "5",
            role_name: "Photography Team",
            description: "Document the day's activities and capture impact stories",
            max_volunteers: 3,
            current_volunteers: 1,
            requires_background_check: false,
            signups: [
              { id: "13", member_name: "Kevin Wong", status: "confirmed" }
            ]
          }
        ],
        comments: [
          {
            id: "1",
            member_name: "Linda Thompson",
            comment: "Can I bring my teenagers to help? They're excited to serve!",
            created_at: "2024-03-20T10:30:00Z"
          },
          {
            id: "2",
            member_name: "Mark Stevens",
            comment: "I have a truck if we need help with transportation for supplies.",
            created_at: "2024-03-21T14:15:00Z"
          },
          {
            id: "3",
            member_name: "Pastor Michael",
            comment: "@Linda Absolutely! Teenagers are welcome. We have age-appropriate tasks for everyone.",
            created_at: "2024-03-21T16:45:00Z"
          },
          {
            id: "4",
            member_name: "Community Outreach Team",
            comment: "@Mark That would be fantastic! Please reach out to us directly so we can coordinate.",
            created_at: "2024-03-22T09:20:00Z"
          }
        ],
        testimonies: [
          {
            id: "1",
            member_name: "Sarah M.",
            testimony: "Last year's community service day was life-changing. Seeing the joy on the faces of the families we helped reminded me why we're called to serve. Can't wait for this year!",
            created_at: "2024-03-15T12:00:00Z"
          },
          {
            id: "2",
            member_name: "James R.",
            testimony: "My kids still talk about the park cleanup we did last time. It taught them the value of taking care of our community. This event builds character and brings us together.",
            created_at: "2024-03-18T15:30:00Z"
          }
        ],
        user_rsvp_status: "interested",
        user_volunteer_signups: ["2"]
      };
      
      setEvent(mockEvent);
    } catch (error) {
      console.error("Error loading event details:", error);
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (status: string) => {
    if (!event || !user) return;
    
    try {
      // In a real app, this would update the database
      setEvent(prev => prev ? {
        ...prev,
        user_rsvp_status: status,
        attending_count: status === "attending" 
          ? prev.attending_count + (prev.user_rsvp_status === "attending" ? 0 : 1)
          : prev.user_rsvp_status === "attending" ? prev.attending_count - 1 : prev.attending_count,
        interested_count: status === "interested"
          ? prev.interested_count + (prev.user_rsvp_status === "interested" ? 0 : 1)
          : prev.user_rsvp_status === "interested" ? prev.interested_count - 1 : prev.interested_count
      } : null);
      
      toast({
        title: "RSVP Updated",
        description: `You are now marked as ${status} for this event.`
      });
    } catch (error) {
      console.error("Error updating RSVP:", error);
      toast({
        title: "Error",
        description: "Failed to update RSVP",
        variant: "destructive"
      });
    }
  };

  const handleVolunteerSignup = async (roleId: string) => {
    if (!event || !user) return;
    
    try {
      // In a real app, this would update the database
      toast({
        title: "Volunteer Signup",
        description: "Your volunteer application has been submitted for review."
      });
    } catch (error) {
      console.error("Error signing up for volunteer role:", error);
      toast({
        title: "Error",
        description: "Failed to sign up for volunteer role",
        variant: "destructive"
      });
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !event || !user) return;
    
    try {
      // In a real app, this would update the database
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        member_name: "You",
        comment: newComment,
        created_at: new Date().toISOString()
      };
      
      setEvent(prev => prev ? {
        ...prev,
        comments: [...prev.comments, newCommentObj]
      } : null);
      
      setNewComment("");
      toast({
        title: "Comment Posted",
        description: "Your comment has been added to the discussion."
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    }
  };

  const handleSubmitTestimony = async () => {
    if (!newTestimony.trim() || !event || !user) return;
    
    try {
      // In a real app, this would update the database
      toast({
        title: "Testimony Submitted",
        description: "Your testimony has been submitted for review and will be published once approved."
      });
      setNewTestimony("");
    } catch (error) {
      console.error("Error submitting testimony:", error);
      toast({
        title: "Error",
        description: "Failed to submit testimony",
        variant: "destructive"
      });
    }
  };

  const getTimeUntilEvent = (startDatetime: string) => {
    const now = new Date();
    const eventDate = new Date(startDatetime);
    const diffInMs = eventDate.getTime() - now.getTime();
    
    if (diffInMs < 0) return "Event has started";
    
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {event.banner_image_url ? (
          <div className="h-96 bg-gradient-primary relative">
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <div className="h-64 bg-gradient-primary"></div>
        )}
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/events">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
              {event.featured && (
                <Badge className="bg-yellow-500 text-black">
                  <Star className="w-3 h-3 mr-1" />
                  Featured Event
                </Badge>
              )}
            </div>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(event.start_datetime).toLocaleDateString()} at {new Date(event.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {event.location_text}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {getTimeUntilEvent(event.start_datetime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Overview */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            {/* Event Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {event.agenda ? (
                      <div className="space-y-3">
                        {event.agenda.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Detailed schedule will be provided closer to the event date.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card mt-6">
                  <CardHeader>
                    <CardTitle>Event Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{event.organizer_name}</h4>
                        <p className="text-sm text-muted-foreground">Event Coordinator</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="volunteers" className="mt-6">
                <div className="space-y-6">
                  {event.volunteer_roles.map((role) => {
                    const progressPercentage = (role.current_volunteers / role.max_volunteers) * 100;
                    const isUserSignedUp = event.user_volunteer_signups.includes(role.id);
                    const isFull = role.current_volunteers >= role.max_volunteers;
                    
                    return (
                      <Card key={role.id} className="border-0 shadow-card">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{role.role_name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                              {role.requires_background_check && (
                                <Badge variant="outline" className="mt-2">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Background Check Required
                                </Badge>
                              )}
                            </div>
                            {!isUserSignedUp && !isFull && (
                              <Button 
                                onClick={() => handleVolunteerSignup(role.id)}
                                size="sm"
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Sign Up
                              </Button>
                            )}
                            {isUserSignedUp && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Signed Up
                              </Badge>
                            )}
                            {isFull && !isUserSignedUp && (
                              <Badge variant="secondary">
                                Full
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Volunteers Needed</span>
                                <span>{role.current_volunteers}/{role.max_volunteers}</span>
                              </div>
                              <Progress value={progressPercentage} className="h-2" />
                            </div>
                            
                            {role.signups.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-2">Current Volunteers</h5>
                                <div className="flex flex-wrap gap-2">
                                  {role.signups.slice(0, 5).map((signup) => (
                                    <div key={signup.id} className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
                                      <Avatar className="w-6 h-6">
                                        <AvatarFallback className="text-xs">
                                          {signup.member_name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm">{signup.member_name}</span>
                                      {signup.status === "confirmed" && (
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                      )}
                                      {signup.status === "pending" && (
                                        <AlertCircle className="w-3 h-3 text-yellow-600" />
                                      )}
                                    </div>
                                  ))}
                                  {role.signups.length > 5 && (
                                    <div className="bg-muted rounded-full px-3 py-1 text-sm">
                                      +{role.signups.length - 5} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-6">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle>Community Discussion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Comment Form */}
                      {user && (
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Share your thoughts, questions, or offers to help..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <Button 
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim()}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Post Comment
                          </Button>
                        </div>
                      )}
                      
                      <Separator />
                      
                      {/* Comments List */}
                      <div className="space-y-4">
                        {event.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {comment.member_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{comment.member_name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="impact" className="mt-6">
                <div className="space-y-6">
                  {/* Impact Stories */}
                  <Card className="border-0 shadow-card">
                    <CardHeader>
                      <CardTitle>Impact Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {event.testimonies.map((testimony) => (
                          <div key={testimony.id} className="border-l-4 border-primary pl-4">
                            <p className="text-muted-foreground italic mb-2">"{testimony.testimony}"</p>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">— {testimony.member_name}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(testimony.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Share Your Story */}
                  {user && (
                    <Card className="border-0 shadow-card">
                      <CardHeader>
                        <CardTitle>Share Your Story</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="How has this event or similar events impacted your life or faith journey?"
                            value={newTestimony}
                            onChange={(e) => setNewTestimony(e.target.value)}
                            className="min-h-[120px]"
                          />
                          <Button 
                            onClick={handleSubmitTestimony}
                            disabled={!newTestimony.trim()}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Submit Testimony
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Testimonies are reviewed before being published.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <Card className="border-0 shadow-elegant sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {getTimeUntilEvent(event.start_datetime)}
                  </div>
                  <div className="text-sm text-muted-foreground">until event starts</div>
                </div>

                {user ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-3">Your RSVP Status:</p>
                      <div className="flex gap-2">
                        <Button 
                          variant={event.user_rsvp_status === "attending" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleRSVP("attending")}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Attending
                        </Button>
                        <Button 
                          variant={event.user_rsvp_status === "interested" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleRSVP("interested")}
                          className="flex-1"
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Interested
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button className="w-full" variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Event
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Sign in to RSVP and volunteer</p>
                    <Button className="w-full">Sign In</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Event Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Attending</span>
                    </div>
                    <span className="font-semibold">{event.attending_count}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Interested</span>
                    </div>
                    <span className="font-semibold">{event.interested_count}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Volunteers</span>
                    </div>
                    <span className="font-semibold">{event.volunteer_slots_filled}/{event.volunteer_slots_total}</span>
                  </div>
                  
                  {event.donation_total > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Donations</span>
                      </div>
                      <span className="font-semibold">${event.donation_total.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Volunteer Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Volunteer Progress</span>
                    <span>{Math.round((event.volunteer_slots_filled / event.volunteer_slots_total) * 100)}%</span>
                  </div>
                  <Progress value={(event.volunteer_slots_filled / event.volunteer_slots_total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.volunteer_slots_total - event.volunteer_slots_filled} spots remaining
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Organizer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}