import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhotoUpload } from "@/components/PhotoUpload";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowLeft,
  Heart,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  Share2,
  Mail,
  Phone,
  HandHeart,
  Package,
  Target,
  TrendingUp,
  Award,
  UserPlus,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MinistryDetails {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  status: string;
  nextEvent: string;
  volunteers: number;
  updated: string;
  impact: string;
  progress?: number;
  goal?: number;
  coordinator: {
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  mission: string;
  activities: string[];
  requirements: string[];
  schedule: {
    frequency: string;
    time: string;
    location: string;
  };
  impactStats: {
    label: string;
    value: string;
    icon: any;
  }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    avatar?: string;
  }[];
  upcomingEvents: {
    title: string;
    date: string;
    time: string;
    location: string;
  }[];
  gallery: string[];
}

export default function MinistryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
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

  const handleDonateClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setDonateDialogOpen(true);
    setDonationForm({ quantity: 1, condition: "", description: "" });
    setDonationPhotos([]);
  };

  const handleDonationSubmit = () => {
    if (!selectedItemId) return;
    
    if (!donationForm.condition) {
      toast({
        title: "Error",
        description: "Please select the condition of the item",
        variant: "destructive"
      });
      return;
    }

    if (donationPhotos.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one photo of the item",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Donation Submitted",
      description: "Your donation will be reviewed by the ministry leader before being counted."
    });
    setDonateDialogOpen(false);
    setSelectedItemId(null);
    setDonationForm({ quantity: 1, condition: "", description: "" });
    setDonationPhotos([]);
  };

  // Mock data based on ID
  const getMinistryData = (): MinistryDetails | null => {
    const ministries: { [key: string]: MinistryDetails } = {
      "1": {
        id: "1",
        title: "Homeless Outreach",
        subtitle: "Monthly Meal Drop",
        description: "Help us serve our local shelters with warm meals and prayer every 3rd Sunday.",
        longDescription: "Our Homeless Outreach Ministry has been serving the local community for over 8 years, providing warm meals, essential supplies, and spiritual support to those experiencing homelessness. We partner with three local shelters to ensure consistent, compassionate care reaches those who need it most. Every month, our dedicated volunteers prepare and serve over 150 meals, distribute clothing and hygiene items, and offer prayer and encouragement to our neighbors in need.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
        category: "Community Service",
        status: "Active",
        nextEvent: "3rd Sunday of every month",
        volunteers: 24,
        updated: "3 days ago",
        impact: "Served 150+ meals last month",
        coordinator: {
          name: "Pastor Michael Roberts",
          role: "Outreach Coordinator",
          email: "michael.roberts@church.org",
          phone: "(555) 123-4567"
        },
        mission: "To share God's love with our homeless neighbors through consistent, compassionate service and spiritual support.",
        activities: [
          "Prepare and serve hot meals at local shelters",
          "Distribute clothing, hygiene kits, and essential supplies",
          "Provide prayer and spiritual encouragement",
          "Connect individuals with local resources and services",
          "Host quarterly community outreach events"
        ],
        requirements: [
          "Heart for serving others with compassion",
          "Ability to commit to at least one monthly service",
          "Background check (provided by church)",
          "Food handler certification (training provided)",
          "Physical ability to lift 20+ lbs (for setup/breakdown)"
        ],
        schedule: {
          frequency: "Every 3rd Sunday",
          time: "2:00 PM - 6:00 PM",
          location: "Multiple shelter locations - meet at church first"
        },
        impactStats: [
          { label: "Meals Served (2024)", value: "1,800+", icon: Package },
          { label: "Volunteers Engaged", value: "24", icon: Users },
          { label: "Shelters Partnered", value: "3", icon: Heart },
          { label: "Years Serving", value: "8", icon: Award }
        ],
        testimonials: [
          {
            name: "Sarah Johnson",
            role: "Volunteer since 2022",
            quote: "Serving in this ministry has transformed my life. Seeing the gratitude and hope in people's eyes reminds me of God's love for all His children.",
            avatar: undefined
          },
          {
            name: "David Martinez",
            role: "Team Leader",
            quote: "This ministry isn't just about food—it's about dignity, respect, and showing people they matter. It's an honor to serve alongside such compassionate people.",
            avatar: undefined
          }
        ],
        upcomingEvents: [
          {
            title: "Monthly Meal Service",
            date: "Sunday, April 21",
            time: "2:00 PM - 6:00 PM",
            location: "Downtown Shelter & Hope Center"
          },
          {
            title: "Spring Supply Drive",
            date: "Saturday, May 4",
            time: "9:00 AM - 12:00 PM",
            location: "Church Fellowship Hall"
          },
          {
            title: "Volunteer Training Session",
            date: "Wednesday, April 17",
            time: "6:30 PM - 8:00 PM",
            location: "Church Conference Room"
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593113646773-028c1f7c6c3f?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&auto=format&fit=crop"
        ]
      },
      "2": {
        id: "2",
        title: "Winter Coat Drive",
        subtitle: "Blessing Families This Season",
        description: "Donate your gently used winter items to bless families in need this season.",
        longDescription: "Our Winter Coat Drive is an annual tradition that has helped hundreds of families stay warm during the coldest months. We collect gently used coats, jackets, scarves, gloves, and blankets from our congregation and broader community, then distribute them to families facing financial hardship. This year, our goal is to collect 100 winter coats for children and adults alike.",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
        category: "Donations",
        status: "Active",
        nextEvent: "Ongoing Collection",
        volunteers: 12,
        updated: "1 week ago",
        impact: "40 of 100 coats collected",
        progress: 40,
        goal: 100,
        coordinator: {
          name: "Jennifer Lee",
          role: "Donations Coordinator",
          email: "jennifer.lee@church.org",
          phone: "(555) 234-5678"
        },
        mission: "To ensure every family in our community has access to warm winter clothing, showing God's provision through practical generosity.",
        activities: [
          "Collect gently used winter clothing and blankets",
          "Sort and organize donations by size and type",
          "Clean and repair items as needed",
          "Distribute items to families through partner organizations",
          "Host community distribution events"
        ],
        requirements: [
          "Willingness to sort and organize donations",
          "Ability to lift and move boxes of clothing",
          "Attention to detail for sizing and quality checks",
          "Friendly, welcoming attitude for distribution events",
          "Flexible schedule (collection ongoing through winter)"
        ],
        schedule: {
          frequency: "Ongoing through March",
          time: "Drop-off: Sundays 9 AM - 12 PM, Sorting: Tuesdays 6 PM - 8 PM",
          location: "Church Fellowship Hall"
        },
        impactStats: [
          { label: "Goal This Season", value: "100", icon: Target },
          { label: "Collected So Far", value: "40", icon: Package },
          { label: "Families Helped", value: "25+", icon: Users },
          { label: "Volunteer Hours", value: "85", icon: Clock }
        ],
        testimonials: [
          {
            name: "Maria Santos",
            role: "Recipient",
            quote: "I can't thank you enough. My children have warm coats this winter because of your generosity. God bless you all.",
            avatar: undefined
          },
          {
            name: "Tom Williams",
            role: "Volunteer",
            quote: "It's amazing to see how a simple donation can make such a huge difference in someone's life. This ministry truly lives out James 2:15-16.",
            avatar: undefined
          }
        ],
        upcomingEvents: [
          {
            title: "Donation Sort Day",
            date: "Tuesday, April 16",
            time: "6:00 PM - 8:00 PM",
            location: "Church Fellowship Hall"
          },
          {
            title: "Community Distribution Event",
            date: "Saturday, April 27",
            time: "10:00 AM - 2:00 PM",
            location: "Church Parking Lot"
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&auto=format&fit=crop"
        ]
      },
      "3": {
        id: "3",
        title: "Community Garden Project",
        subtitle: "Fresh Produce for Food Bank",
        description: "Build and maintain a fresh produce garden to support our food bank year-round.",
        longDescription: "Our Community Garden Project transforms unused church property into a thriving garden that produces fresh vegetables for our local food bank. This ministry combines environmental stewardship, community building, and practical service to those experiencing food insecurity. We grow tomatoes, lettuce, squash, peppers, and more, donating over 200 pounds of fresh produce monthly during growing season.",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
        category: "Food Security",
        status: "Active",
        nextEvent: "Saturday 9 AM",
        volunteers: 18,
        updated: "2 days ago",
        impact: "200+ lbs of produce donated monthly",
        coordinator: {
          name: "Lisa Chen",
          role: "Garden Coordinator",
          email: "lisa.chen@church.org",
          phone: "(555) 345-6789"
        },
        mission: "To cultivate fresh, healthy produce for our community's food bank while building relationships and caring for God's creation.",
        activities: [
          "Plant and maintain seasonal vegetables",
          "Water, weed, and care for garden beds",
          "Harvest and prepare produce for donation",
          "Compost and practice sustainable gardening",
          "Teach gardening skills to volunteers and community"
        ],
        requirements: [
          "Willingness to work outdoors in various weather",
          "Basic gardening knowledge (training available)",
          "Ability to bend, kneel, and lift moderately",
          "Commitment to at least 2 Saturday mornings per month",
          "Passion for sustainability and community service"
        ],
        schedule: {
          frequency: "Every Saturday (March - October)",
          time: "9:00 AM - 12:00 PM",
          location: "Church Community Garden (east property)"
        },
        impactStats: [
          { label: "Produce Donated (2024)", value: "1,200 lbs", icon: TrendingUp },
          { label: "Active Gardeners", value: "18", icon: Users },
          { label: "Garden Beds", value: "12", icon: Package },
          { label: "Families Fed Monthly", value: "50+", icon: Heart }
        ],
        testimonials: [
          {
            name: "Robert Taylor",
            role: "Lead Gardener",
            quote: "Watching seeds grow into food that feeds hungry families is incredibly rewarding. This ministry brings people together while making a real difference.",
            avatar: undefined
          },
          {
            name: "Emily Rodriguez",
            role: "New Volunteer",
            quote: "I had no gardening experience when I started, but the team taught me everything. Now I'm growing my own vegetables at home too!",
            avatar: undefined
          }
        ],
        upcomingEvents: [
          {
            title: "Weekly Garden Day",
            date: "Saturday, April 20",
            time: "9:00 AM - 12:00 PM",
            location: "Church Community Garden"
          },
          {
            title: "Spring Planting Workshop",
            date: "Saturday, April 27",
            time: "9:00 AM - 1:00 PM",
            location: "Church Community Garden"
          },
          {
            title: "Composting 101 Class",
            date: "Wednesday, May 1",
            time: "6:30 PM - 7:30 PM",
            location: "Garden Education Center"
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&auto=format&fit=crop"
        ]
      }
    };

    return ministries[id || "1"] || null;
  };

  const ministry = getMinistryData();

  const handleJoinMinistry = () => {
    toast({
      title: "Interest Submitted!",
      description: `We'll contact you soon about joining ${ministry?.title}.`
    });
  };

  const handleShareMinistry = () => {
    toast({
      title: "Link Copied!",
      description: "Ministry link copied to clipboard."
    });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Comment Posted",
      description: "Your comment has been added to the discussion."
    });
    setNewComment("");
  };

  if (!ministry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ministry Not Found</h2>
          <p className="text-muted-foreground mb-4">The ministry you're looking for doesn't exist.</p>
          <Link to="/ministries">
            <Button>Back to Ministries</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="h-80 relative">
          <img 
            src={ministry.image} 
            alt={ministry.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl w-full">
              <div className="mb-3">
                <Link to="/ministries">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Ministries
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {ministry.category}
                </Badge>
                <Badge className={
                  ministry.status === 'Active' 
                    ? 'bg-green-500/90 text-white border-green-400' 
                    : 'bg-blue-500/90 text-white border-blue-400'
                }>
                  {ministry.status}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{ministry.title}</h1>
              <p className="text-xl text-white/90 mb-4">{ministry.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {ministry.nextEvent}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {ministry.volunteers} volunteers
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {ministry.impact}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>About This Ministry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{ministry.longDescription}</p>
                
                {ministry.progress !== undefined && ministry.goal && (
                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Current Progress</span>
                      <span className="font-semibold text-primary">{ministry.progress} of {ministry.goal}</span>
                    </div>
                    <Progress value={(ministry.progress / ministry.goal) * 100} className="h-3" />
                  </div>
                )}

                <div className="pt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Our Mission
                  </h4>
                  <p className="text-muted-foreground italic pl-7">{ministry.mission}</p>
                </div>
              </CardContent>
            </Card>

            {/* Donation Items and Volunteer Progress - Only for Homeless Outreach (ID 1) */}
            {id === "1" && (
              <>
                {/* Donation Items Section */}
                <Card className="border-0 shadow-elegant">
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
                <Card className="border-0 shadow-elegant">
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
              </>
            )}

            {/* Tabs */}
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white">
                <TabsTrigger value="activities" className="data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900">Activities</TabsTrigger>
                <TabsTrigger value="requirements" className="data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900">Requirements</TabsTrigger>
                <TabsTrigger value="impact" className="data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900">Impact</TabsTrigger>
                <TabsTrigger value="testimonials" className="data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900">Stories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="mt-6">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">What We Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ministry.activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Volunteer Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ministry.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-primary">{index + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {ministry.impactStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="border-0 shadow-card">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                              <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="testimonials" className="mt-6">
                <div className="space-y-4">
                  {ministry.testimonials.map((testimonial, index) => (
                    <Card key={index} className="border-0 shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground italic leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Photo Gallery */}
            {ministry.gallery && ministry.gallery.length > 0 && (
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {ministry.gallery.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src={photo} 
                          alt={`${ministry.title} photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-elegant sticky top-4">
              <CardContent className="p-6 space-y-4">
                <Button className="w-full shadow-lg" size="lg" onClick={handleJoinMinistry}>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Join This Ministry
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={handleShareMinistry}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Ministry
                </Button>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Frequency</p>
                    <p className="text-sm text-muted-foreground">{ministry.schedule.frequency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{ministry.schedule.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{ministry.schedule.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coordinator */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Contact Coordinator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ministry.coordinator.avatar} />
                    <AvatarFallback>
                      {ministry.coordinator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{ministry.coordinator.name}</h4>
                    <p className="text-sm text-muted-foreground">{ministry.coordinator.role}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <a href={`mailto:${ministry.coordinator.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    {ministry.coordinator.email}
                  </a>
                  <a href={`tel:${ministry.coordinator.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    {ministry.coordinator.phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ministry.upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-1">{event.title}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Donation Dialog - Only for Homeless Outreach (ID 1) */}
        {id === "1" && (
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
        )}
      </div>
    </div>
  );
}
