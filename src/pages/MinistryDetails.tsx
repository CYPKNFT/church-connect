import { useState, useEffect } from "react";
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
  ChevronRight,
  Info,
  CalendarDays,
  Sparkles,
  Plus,
  Settings,
  BarChart3,
  X,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getVolunteerRolesForMinistry } from "@/data/ministriesData";
import { cn } from "@/lib/utils";

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

// Map route names to ministry IDs
const routeToIdMap: { [key: string]: string } = {
  "homeless-outreach": "1",
  "winter-coat-drive": "2",
  "community-garden-project": "3",
  "food-pantry": "4",
  "back-to-school": "5",
  "community-tutoring": "6",
};

export default function MinistryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTabBarSticky, setIsTabBarSticky] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [donationPhotos, setDonationPhotos] = useState<File[]>([]);
  const [donationForm, setDonationForm] = useState({
    quantity: 1,
    condition: "",
    description: ""
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [donationHistoryFilter, setDonationHistoryFilter] = useState("all");
  const [isMinistryLeader, setIsMinistryLeader] = useState(true); // Mock: set to true for demo

  // Sticky tab bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 320; // Height of hero section
      setIsTabBarSticky(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const donationItems = [
    { id: "blankets", name: "Blankets", needed: 50, received: 32, unit: "blankets" },
    { id: "shoes", name: "Shoes", needed: 80, received: 45, unit: "pairs" },
    { id: "hygiene-kits", name: "Hygiene Kits", needed: 100, received: 67, unit: "kits" },
    { id: "socks", name: "Socks", needed: 200, received: 120, unit: "pairs" },
    { id: "winter-coats", name: "Winter Coats", needed: 60, received: 28, unit: "coats" }
  ];

  // Volunteer roles are now loaded from data source (ministriesData)

  const donationHistory = [
    { id: 1, donor: "Anonymous", item: "Blankets", qty: 5, status: "Approved", date: "2024-04-10", destination: "Downtown Shelter" },
    { id: 2, donor: "Sarah M.", item: "Hygiene Kits", qty: 10, status: "Approved", date: "2024-04-09", destination: "Hope Center" },
    { id: 3, donor: "John D.", item: "Socks", qty: 20, status: "Pending", date: "2024-04-08", destination: "Pending Review" },
    { id: 4, donor: "Maria G.", item: "Shoes", qty: 3, status: "Approved", date: "2024-04-07", destination: "Downtown Shelter" },
    { id: 5, donor: "Anonymous", item: "Winter Coats", qty: 2, status: "Approved", date: "2024-04-06", destination: "Hope Center" },
    { id: 6, donor: "Tom W.", item: "Blankets", qty: 8, status: "Approved", date: "2024-04-05", destination: "Downtown Shelter" },
    { id: 7, donor: "Lisa K.", item: "Hygiene Kits", qty: 15, status: "Rejected", date: "2024-04-04", destination: "N/A" }
  ];

  const weeklyVolunteerSchedule = [
    { 
      day: "Sunday", 
      roles: [
        { name: "Meal Prep", volunteers: ["Sarah J.", "Tom W."], filled: 2, needed: 2 },
        { name: "Serving", volunteers: ["John D.", "Maria G.", "Lisa K."], filled: 3, needed: 3 },
        { name: "Cleanup", volunteers: ["Mike R."], filled: 1, needed: 2 }
      ]
    },
    { 
      day: "Monday", 
      roles: [
        { name: "Outreach", volunteers: ["David M."], filled: 1, needed: 2 }
      ]
    },
    { 
      day: "Wednesday", 
      roles: [
        { name: "Meal Prep", volunteers: ["Emily R.", "Chris P."], filled: 2, needed: 2 },
        { name: "Outreach", volunteers: [], filled: 0, needed: 2 }
      ]
    }
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

  const handleVolunteerClick = (roleId: string) => {
    setSelectedRoleId(roleId);
    setVolunteerDialogOpen(true);
  };

  const handleVolunteerSubmit = () => {
    if (!selectedRoleId) return;
    
    toast({
      title: "Volunteer Request Submitted",
      description: `The ministry coordinator will contact you soon with next steps for the "${(rolesFromData.find(r => r.id === selectedRoleId)?.name) || "Selected"}" role.`
    });
    setVolunteerDialogOpen(false);
    setSelectedRoleId(null);
  };

  // Mock data based on ID
  const getMinistryData = (): MinistryDetails | null => {
    // Only accept named routes, not numeric IDs
    if (!id || /^\d+$/.test(id)) {
      // If ID is numeric or empty, return null (will show not found)
      return null;
    }
    // Convert route name to ID if needed
    const ministryId = routeToIdMap[id] || null;
    if (!ministryId) {
      // Route name not found in map
      return null;
    }
    
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
      ,
      "4": {
        id: "4",
        title: "Food Pantry Ministry",
        subtitle: "Fighting Hunger Together",
        description: "Weekly food distribution to families experiencing food insecurity in our community.",
        longDescription: "Our Food Pantry serves families in need each week with fresh produce, shelf-stable goods, and personal care items. Volunteers help with stocking, client services, and deliveries to homebound neighbors.",
        image: "https://images.unsplash.com/photo-1593113646773-028c1f7c6c3f?w=800&auto=format&fit=crop",
        category: "Food Security",
        status: "Active",
        nextEvent: "Every Thursday",
        volunteers: 32,
        updated: "5 days ago",
        impact: "Supporting 80+ families weekly",
        coordinator: {
          name: "James Carter",
          role: "Pantry Coordinator",
          email: "james.carter@church.org",
          phone: "(555) 456-7890"
        },
        mission: "To provide nutritious food to families in need while offering dignity and hope.",
        activities: [
          "Receive and sort food donations",
          "Prepare pantry shelves and cold storage",
          "Assist clients with food selection",
          "Deliver food to homebound neighbors"
        ],
        requirements: [
          "Friendly and patient demeanor",
          "Ability to lift 20–30 lbs for stocking",
          "Availability on Thursdays preferred",
          "Background check for client-facing roles"
        ],
        schedule: {
          frequency: "Every Thursday",
          time: "9:00 AM - 12:00 PM",
          location: "Church Fellowship Hall"
        },
        impactStats: [
          { label: "Families Served Weekly", value: "80+", icon: Users },
          { label: "Pounds Distributed / Month", value: "2,000+", icon: Package },
          { label: "Active Volunteers", value: "32", icon: Heart },
          { label: "Partner Stores", value: "4", icon: Award }
        ],
        testimonials: [
          {
            name: "Angela Ruiz",
            role: "Client",
            quote: "This pantry has been a blessing to our family during a tough season.",
            avatar: undefined
          }
        ],
        upcomingEvents: [
          {
            title: "Thursday Pantry Day",
            date: "Every Thursday",
            time: "9:00 AM - 12:00 PM",
            location: "Fellowship Hall"
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1586201375761-83865001e31b?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=400&auto=format&fit=crop"
        ]
      },
      "5": {
        id: "5",
        title: "Back to School Drive",
        subtitle: "Equipping Students for Success",
        description: "Collect and distribute school supplies to students from low-income families.",
        longDescription: "The Back to School Drive equips students with backpacks and supplies, reducing barriers to learning. Volunteers sort donations, pack kits, and help at distribution events.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop",
        category: "Education",
        status: "Upcoming",
        nextEvent: "August 2025",
        volunteers: 8,
        updated: "1 day ago",
        impact: "25 of 200 supply kits prepared",
        coordinator: {
          name: "Rachel Kim",
          role: "Event Coordinator",
          email: "rachel.kim@church.org",
          phone: "(555) 567-2345"
        },
        mission: "To empower students with the tools they need to thrive in school.",
        activities: [
          "Collect and sort donated supplies",
          "Assemble backpacks by grade level",
          "Support distribution day logistics"
        ],
        requirements: [
          "Attention to detail",
          "Ability to stand for 2–3 hours",
          "Friendly and welcoming attitude"
        ],
        schedule: {
          frequency: "Seasonal (July–August)",
          time: "Varies by session",
          location: "Fellowship Hall"
        },
        impactStats: [
          { label: "Kits Prepared", value: "25 / 200", icon: Package },
          { label: "Volunteers", value: "8", icon: Users }
        ],
        testimonials: [],
        upcomingEvents: [],
        gallery: [
          "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&auto=format&fit=crop"
        ]
      },
      "6": {
        id: "6",
        title: "Community Tutoring",
        subtitle: "Empowering Through Education",
        description: "One-on-one tutoring for students K–12 in reading, math, and other subjects.",
        longDescription: "Our tutoring program provides individualized support to students. Volunteers tutor weekly, track progress, and encourage learners.",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&auto=format&fit=crop",
        category: "Education",
        status: "Active",
        nextEvent: "Mon–Thu 4–6 PM",
        volunteers: 15,
        updated: "1 week ago",
        impact: "Tutoring 45 students currently",
        coordinator: {
          name: "Daniel Brooks",
          role: "Tutoring Lead",
          email: "daniel.brooks@church.org",
          phone: "(555) 678-9012"
        },
        mission: "To strengthen academic confidence and skills through consistent mentorship.",
        activities: [
          "Weekly one-on-one tutoring sessions",
          "Communicate progress with parents",
          "Prepare lesson resources"
        ],
        requirements: [
          "Background check required",
          "Commitment to a weekly slot",
          "Patience and encouragement"
        ],
        schedule: {
          frequency: "Weekly",
          time: "Mon–Thu 4–6 PM",
          location: "Education Wing Classrooms"
        },
        impactStats: [
          { label: "Active Students", value: "45", icon: Users },
          { label: "Volunteer Tutors", value: "15", icon: Heart }
        ],
        testimonials: [],
        upcomingEvents: [],
        gallery: [
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&auto=format&fit=crop"
        ]
      }
    };

    return ministries[ministryId] || null;
  };

  const ministry = getMinistryData();
  const ministryId = Object.values(routeToIdMap).includes(routeToIdMap[id || ""] || "")
    ? (routeToIdMap[id || ""] as string)
    : null;
  const rolesFromData = ministryId ? getVolunteerRolesForMinistry(ministryId) : [];

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
          <Link to="/my-church?tab=ministries">
            <Button>Back to Ministries</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1116]">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="h-[460px] relative -mt-20 pt-20">
          <img 
            src={ministry.image} 
            alt={ministry.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0E1116]" />
        </div>
        
        <div className="absolute inset-0 flex items-end pb-12 pt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl w-full mx-auto">
              {/* Breadcrumb */}
              <div className="mb-4">
                <Link to="/my-church?tab=ministries">
                  <Button variant="ghost" size="sm" className="text-white/90 hover:bg-white/10 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Ministries
                  </Button>
                </Link>
              </div>
              
              {/* Badges */}
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-[#EACB56]/20 text-[#EACB56] border-[#EACB56]/30 backdrop-blur-sm">
                  {ministry.category}
                </Badge>
                <Badge className={
                  ministry.status === 'Active' 
                    ? 'bg-[#2EA98A]/20 text-[#2EA98A] border-[#2EA98A]/30 backdrop-blur-sm' 
                    : 'bg-blue-500/20 text-blue-400 border-blue-400/30 backdrop-blur-sm'
                }>
                  {ministry.status}
                </Badge>
              </div>
              
              {/* Title Section */}
              <div className="flex items-end justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F4F4F4] mb-3 tracking-tight">
                    {ministry.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-[#F4F4F4]/80 mb-4">{ministry.subtitle}</p>
                  
                  {/* Impact Highlight */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2EA98A]/20 border border-[#2EA98A]/30 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-[#2EA98A]" />
                    <span className="text-sm font-medium text-[#F4F4F4]">{ministry.impact}</span>
                  </div>
                </div>

                {/* CTA Buttons - Desktop */}
                <div className="hidden lg:flex gap-3">
                  <Button 
                    size="lg"
                    className="bg-[#EACB56] hover:bg-[#EACB56]/90 text-[#0E1116] font-semibold shadow-lg"
                    onClick={() => setActiveTab("donations")}
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Donate Items
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-[#F4F4F4]/30 text-[#F4F4F4] hover:bg-[#F4F4F4]/10 backdrop-blur-sm"
                    onClick={() => setActiveTab("volunteers")}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Volunteer
                  </Button>
                </div>
              </div>

              {/* Quick Action Bar for Ministry Leaders */}
              {isMinistryLeader && (
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#F4F4F4]/30 text-[#F4F4F4] hover:bg-[#F4F4F4]/10 backdrop-blur-sm"
                    onClick={() => {
                      toast({
                        title: "View Reports",
                        description: "Opening analytics dashboard..."
                      });
                    }}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className={cn(
        "border-b border-[#F4F4F4]/10 bg-[#0E1116] transition-all duration-300 z-40",
        isTabBarSticky ? "sticky top-0 shadow-lg" : ""
      )}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {[
                { id: "overview", label: "Overview", icon: Info },
                { id: "donations", label: "Donations", icon: Package },
                { id: "volunteers", label: "Volunteers", icon: Users },
                { id: "events", label: "Events", icon: CalendarDays },
                { id: "impact", label: "Impact", icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all relative",
                      activeTab === tab.id
                        ? "text-[#EACB56]"
                        : "text-[#A0A6AE] hover:text-[#F4F4F4]"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EACB56] shadow-[0_0_8px_rgba(234,203,86,0.6)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-7xl w-full mx-auto">
          
          {/* Tab Content */}
          <div className="space-y-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in-50 duration-500">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Overview Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* About Section */}
                    <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-[#F4F4F4] text-2xl">About This Ministry</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-[#A0A6AE] leading-relaxed text-base">
                          {ministry.longDescription}
                        </p>

                        <div className="pt-4 border-t border-[#F4F4F4]/10">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#F4F4F4] uppercase text-sm tracking-wide">
                            <Target className="w-5 h-5 text-[#EACB56]" />
                            Our Mission
                          </h4>
                          <p className="text-[#A0A6AE] italic pl-7 leading-relaxed">
                            {ministry.mission}
                          </p>
                        </div>

                        {/* What We Do */}
                        <div className="pt-4 border-t border-[#F4F4F4]/10">
                          <h4 className="font-semibold mb-4 text-[#F4F4F4] uppercase text-sm tracking-wide">
                            What We Do
                          </h4>
                          <div className="space-y-3">
                            {ministry.activities.map((activity, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#2EA98A] mt-0.5 flex-shrink-0" />
                                <span className="text-[#A0A6AE]">{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Snapshot Metrics */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {ministry.impactStats.slice(0, 4).map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <Card key={index} className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-lg">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#EACB56]/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-7 h-7 text-[#EACB56]" />
                                </div>
                                <div>
                                  <div className="text-3xl font-bold text-[#F4F4F4]">{stat.value}</div>
                                  <div className="text-sm text-[#A0A6AE]">{stat.label}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sidebar - Coordinator & Schedule */}
                  <div className="space-y-6">
                    {/* Coordinator Card */}
                    <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#F4F4F4] text-lg">Coordinator</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-14 w-14 border-2 border-[#EACB56]/30">
                            <AvatarImage src={ministry.coordinator.avatar} />
                            <AvatarFallback className="bg-[#EACB56]/20 text-[#EACB56]">
                              {ministry.coordinator.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-[#F4F4F4]">{ministry.coordinator.name}</h4>
                            <p className="text-sm text-[#A0A6AE]">{ministry.coordinator.role}</p>
                          </div>
                        </div>
                        <Separator className="my-4 bg-[#F4F4F4]/10" />
                        <div className="space-y-3">
                          <a 
                            href={`mailto:${ministry.coordinator.email}`} 
                            className="flex items-center gap-2 text-sm text-[#A0A6AE] hover:text-[#EACB56] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {ministry.coordinator.email}
                          </a>
                          <a 
                            href={`tel:${ministry.coordinator.phone}`} 
                            className="flex items-center gap-2 text-sm text-[#A0A6AE] hover:text-[#EACB56] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {ministry.coordinator.phone}
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Schedule Card */}
                    <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#F4F4F4] text-lg">Schedule</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-[#EACB56] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-[#F4F4F4] text-sm">Frequency</p>
                            <p className="text-sm text-[#A0A6AE] mt-1">{ministry.schedule.frequency}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#EACB56] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-[#F4F4F4] text-sm">Time</p>
                            <p className="text-sm text-[#A0A6AE] mt-1">{ministry.schedule.time}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#EACB56] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-[#F4F4F4] text-sm">Location</p>
                            <p className="text-sm text-[#A0A6AE] mt-1">{ministry.schedule.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-lg">
                      <CardContent className="p-6 space-y-3">
                        <Button 
                          className="w-full bg-[#EACB56] hover:bg-[#EACB56]/90 text-[#0E1116] font-semibold shadow-lg" 
                          size="lg" 
                          onClick={handleJoinMinistry}
                        >
                          <UserPlus className="w-5 h-5 mr-2" />
                          Join This Ministry
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-[#F4F4F4]/30 text-[#F4F4F4] hover:bg-[#F4F4F4]/10" 
                          size="lg" 
                          onClick={handleShareMinistry}
                        >
                          <Share2 className="w-5 h-5 mr-2" />
                          Share Ministry
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* DONATIONS TAB */}
            {activeTab === "donations" && (
              <div className="animate-in fade-in-50 duration-500">
                <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#F4F4F4] text-2xl flex items-center gap-3">
                        <Package className="w-6 h-6 text-[#EACB56]" />
                        Donation Needs
                      </CardTitle>
                    </div>
                    <p className="text-[#A0A6AE] mt-2">
                      Help us reach our goals by donating essential items for our ministry.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {donationItems.map((item) => {
                        const pct = Math.min(100, Math.round((item.received / item.needed) * 100));
                        const remaining = Math.max(0, item.needed - item.received);
                        return (
                          <div 
                            key={item.id} 
                            className="p-6 border border-[#F4F4F4]/10 rounded-lg bg-[#0E1116]/50 hover:border-[#EACB56]/30 transition-all"
                          >
                            <div className="flex items-center justify-between gap-4 mb-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-[#F4F4F4] text-lg mb-1">{item.name}</h3>
                                <p className="text-sm text-[#A0A6AE]">
                                  {remaining > 0 
                                    ? `${remaining} ${item.unit} still needed` 
                                    : "Goal reached! Thank you!"}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-[#F4F4F4]">{item.received}</div>
                                <div className="text-sm text-[#A0A6AE]">of {item.needed}</div>
                              </div>
                            </div>
                            
                            {/* Progress Bar with Amber color */}
                            <div className="mb-4">
                              <div className="w-full h-3 bg-[#F4F4F4]/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#EACB56] to-[#d4b647] rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <div className="mt-2 text-xs text-[#EACB56] font-medium">{pct}% Complete</div>
                            </div>

                            <Button
                              size="lg"
                              onClick={() => handleDonateClick(item.id)}
                              className="w-full bg-[#EACB56] hover:bg-[#EACB56]/90 text-[#0E1116] font-semibold shadow-lg"
                            >
                              <Package className="w-5 h-5 mr-2" />
                              Donate {item.name}
                            </Button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Donation History Table */}
                    <div className="mt-8 pt-8 border-t border-[#F4F4F4]/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#F4F4F4] font-semibold uppercase text-sm tracking-wide">
                          Donation History
                        </h3>
                        <div className="flex gap-2">
                          <Select value={donationHistoryFilter} onValueChange={setDonationHistoryFilter}>
                            <SelectTrigger className="w-32 bg-[#0E1116] border-[#F4F4F4]/10 text-[#F4F4F4] h-9">
                              <Filter className="w-3 h-3 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1F26] border-[#F4F4F4]/10">
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#F4F4F4]/10 text-[#F4F4F4] h-9"
                            onClick={() => {
                              toast({
                                title: "Export Started",
                                description: "Downloading donation history..."
                              });
                            }}
                          >
                            <Download className="w-3 h-3 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#F4F4F4]/10">
                              <th className="text-left text-xs font-semibold text-[#A0A6AE] uppercase tracking-wide pb-3">Date</th>
                              <th className="text-left text-xs font-semibold text-[#A0A6AE] uppercase tracking-wide pb-3">Donor</th>
                              <th className="text-left text-xs font-semibold text-[#A0A6AE] uppercase tracking-wide pb-3">Item</th>
                              <th className="text-right text-xs font-semibold text-[#A0A6AE] uppercase tracking-wide pb-3">Qty</th>
                              <th className="text-left text-xs font-semibold text-[#A0A6AE] uppercase tracking-wide pb-3">Destination</th>
                              <th className="text-right text-xs font-semibold text-[#A0A6AE] uppercase tracking-wide pb-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donationHistory
                              .filter(d => donationHistoryFilter === "all" || d.status.toLowerCase() === donationHistoryFilter)
                              .map((donation) => (
                                <tr key={donation.id} className="border-b border-[#F4F4F4]/5 hover:bg-[#F4F4F4]/5 transition-colors">
                                  <td className="py-3 text-sm text-[#A0A6AE]">
                                    {new Date(donation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </td>
                                  <td className="py-3 text-sm text-[#F4F4F4] font-medium">{donation.donor}</td>
                                  <td className="py-3 text-sm text-[#F4F4F4]">{donation.item}</td>
                                  <td className="py-3 text-sm text-[#F4F4F4] text-right">{donation.qty}</td>
                                  <td className="py-3 text-sm text-[#A0A6AE]">{donation.destination}</td>
                                  <td className="py-3 text-right">
                                    <Badge className={cn(
                                      "text-xs",
                                      donation.status === "Approved" && "bg-[#2EA98A]/20 text-[#2EA98A] border-[#2EA98A]/30",
                                      donation.status === "Pending" && "bg-[#EACB56]/20 text-[#EACB56] border-[#EACB56]/30",
                                      donation.status === "Rejected" && "bg-red-500/20 text-red-400 border-red-400/30"
                                    )}>
                                      {donation.status}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* VOLUNTEERS TAB */}
            {activeTab === "volunteers" && (
              <div className="animate-in fade-in-50 duration-500 space-y-8">
                {/* Requirements */}
                <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#F4F4F4] text-lg uppercase tracking-wide">
                        {selectedRoleId 
                          ? `${rolesFromData.find(r => r.id === selectedRoleId)?.name ?? ""} Requirements`
                          : "Volunteer Requirements"
                        }
                      </CardTitle>
                      
                      {/* Role Buttons - Top Right */}
                      <div className="flex gap-2">
                        {rolesFromData.map((role) => (
                          <Button
                            key={role.id}
                            size="sm"
                            variant="outline"
                            className={cn(
                              "border-[#2EA98A]/30 hover:bg-[#2EA98A]/10 hover:text-white backdrop-blur-sm text-xs",
                              selectedRoleId === role.id
                                ? "bg-[#2EA98A]/10 text-white border-[#2EA98A]"
                                : "text-[#2EA98A]"
                            )}
                            onClick={() => {
                              setSelectedRoleId(role.id);
                            }}
                          >
                            {role.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {(selectedRoleId && rolesFromData.find(r => r.id === selectedRoleId)?.requirements) ? (
                        // Show role-specific requirements
                        <>
                          <div className="space-y-3">
                            {rolesFromData.find(r => r.id === selectedRoleId)?.requirements?.map((req, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#2EA98A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-sm font-semibold text-[#2EA98A]">{index + 1}</span>
                                </div>
                                <span className="text-[#A0A6AE] leading-relaxed">{req}</span>
                              </div>
                            ))}
                          </div>
                          {rolesFromData.find(r => r.id === selectedRoleId)?.tasks && rolesFromData.find(r => r.id === selectedRoleId)!.tasks!.length > 0 && (
                            <div className="pt-4 border-t border-[#F4F4F4]/10">
                              <h4 className="font-semibold mb-3 text-[#F4F4F4] uppercase text-sm tracking-wide">Typical Tasks</h4>
                              <ul className="list-disc pl-6 space-y-2">
                                {rolesFromData.find(r => r.id === selectedRoleId)!.tasks!.map((t, idx) => (
                                  <li key={idx} className="text-[#A0A6AE]">{t}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : (
                        // Show general requirements
                        ministry.requirements.map((req, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-[#2EA98A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-sm font-semibold text-[#2EA98A]">{index + 1}</span>
                            </div>
                            <span className="text-[#A0A6AE] leading-relaxed">{req}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Volunteer Roles */}
                <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-[#F4F4F4] text-2xl flex items-center gap-3">
                      <Users className="w-6 h-6 text-[#2EA98A]" />
                      Volunteer Opportunities
                    </CardTitle>
                    <p className="text-[#A0A6AE] mt-2">
                      Join our team and make a direct impact in your community.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {(rolesFromData.length > 0 ? rolesFromData : []).map((role) => {
                        const pct = Math.min(100, Math.round((role.signedUp / role.needed) * 100));
                        const remaining = Math.max(0, role.needed - role.signedUp);
                        return (
                          <div 
                            key={role.id} 
                            className="p-6 border border-[#F4F4F4]/10 rounded-lg bg-[#0E1116]/50 hover:border-[#2EA98A]/30 transition-all"
                          >
                            <div className="mb-4">
                              <h3 className="font-semibold text-[#F4F4F4] text-lg mb-2">{role.name}</h3>
                              <p className="text-sm text-[#A0A6AE] mb-3">
                                {remaining > 0 
                                  ? `${remaining} ${remaining === 1 ? 'position' : 'positions'} available` 
                                  : "All positions filled"}
                              </p>
                              
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-[#A0A6AE]">Progress</span>
                                <span className="text-[#F4F4F4] font-medium">{role.signedUp} / {role.needed}</span>
                              </div>
                              
                              <div className="w-full h-2 bg-[#F4F4F4]/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#2EA98A] to-[#26967d] rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>

                            <Button
                              size="lg"
                              onClick={() => handleVolunteerClick(role.id)}
                              className="w-full bg-[#2EA98A] hover:bg-[#2EA98A]/90 text-white font-semibold shadow-lg"
                              disabled={remaining === 0}
                            >
                              <UserPlus className="w-5 h-5 mr-2" />
                              {remaining > 0 ? "Join Team" : "Position Filled"}
                            </Button>
                          </div>
                        );
                      })}
                      {rolesFromData.length === 0 && (
                        <div className="col-span-full p-6 border border-[#F4F4F4]/10 rounded-lg bg-[#0E1116]/50 text-center text-[#A0A6AE]">
                          No volunteer roles have been posted yet for this ministry.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Coverage Grid */}
                <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-[#F4F4F4] text-lg uppercase tracking-wide">
                      Weekly Coverage
                    </CardTitle>
                    <p className="text-[#A0A6AE] text-sm mt-2">
                      Current volunteer assignments for this week
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyVolunteerSchedule.map((day, idx) => (
                        <div key={idx} className="p-4 bg-[#0E1116]/50 rounded-lg border border-[#F4F4F4]/10">
                          <h4 className="font-semibold text-[#F4F4F4] mb-3">{day.day}</h4>
                          <div className="space-y-2">
                            {day.roles.map((role, roleIdx) => (
                              <div key={roleIdx} className="flex items-center justify-between p-2 bg-[#1A1F26]/50 rounded">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#F4F4F4] font-medium">{role.name}</span>
                                    <Badge className={cn(
                                      "text-xs",
                                      role.filled === role.needed 
                                        ? "bg-[#2EA98A]/20 text-[#2EA98A] border-[#2EA98A]/30"
                                        : "bg-[#EACB56]/20 text-[#EACB56] border-[#EACB56]/30"
                                    )}>
                                      {role.filled}/{role.needed}
                                    </Badge>
                                  </div>
                                  {role.volunteers.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {role.volunteers.map((volunteer, vIdx) => (
                                        <span 
                                          key={vIdx} 
                                          className="inline-flex items-center px-2 py-0.5 bg-[#2EA98A]/10 text-[#2EA98A] rounded text-xs"
                                        >
                                          <Users className="w-3 h-3 mr-1" />
                                          {volunteer}
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-xs text-[#A0A6AE] mt-1">No volunteers assigned yet</p>
                                  )}
                                </div>
                                {role.filled < role.needed && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#2EA98A]/30 text-[#2EA98A] hover:bg-[#2EA98A]/10 ml-3"
                                    onClick={() => handleVolunteerClick(role.name.toLowerCase().replace(' ', '-'))}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Fill
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* EVENTS TAB */}
            {activeTab === "events" && (
              <div className="animate-in fade-in-50 duration-500">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Event List */}
                  <div className="lg:col-span-2">
                    <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-[#F4F4F4] text-2xl flex items-center gap-3">
                          <CalendarDays className="w-6 h-6 text-[#EACB56]" />
                          Upcoming Events
                        </CardTitle>
                        <p className="text-[#A0A6AE] mt-2">
                          Mark your calendar and join us for these ministry events.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                    {ministry.upcomingEvents.map((event, index) => (
                      <div 
                        key={index} 
                        className="p-6 border border-[#F4F4F4]/10 rounded-lg bg-[#0E1116]/50 hover:border-[#EACB56]/30 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#F4F4F4] text-xl mb-1">{event.title}</h3>
                          </div>
                          <div className="w-16 h-16 rounded-lg bg-[#EACB56]/10 flex flex-col items-center justify-center border border-[#EACB56]/30 flex-shrink-0">
                            <div className="text-xs text-[#EACB56] uppercase">
                              {event.date.split(',')[0]}
                            </div>
                            <div className="text-2xl font-bold text-[#EACB56]">
                              {event.date.match(/\d+/)?.[0] || ""}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-3 text-[#A0A6AE]">
                            <Calendar className="w-4 h-4 text-[#EACB56]" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[#A0A6AE]">
                            <Clock className="w-4 h-4 text-[#EACB56]" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[#A0A6AE]">
                            <MapPin className="w-4 h-4 text-[#EACB56]" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className="w-full bg-[#EACB56] hover:bg-[#EACB56]/90 text-[#0E1116] font-semibold"
                        >
                          <UserPlus className="w-5 h-5 mr-2" />
                          Volunteer for This Event
                        </Button>
                      </div>
                    ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Mini Calendar Sidebar */}
                  <div>
                    <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl sticky top-24">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <CardTitle className="text-[#F4F4F4] text-lg">April 2024</CardTitle>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-[#A0A6AE] hover:text-[#F4F4F4]">
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-[#A0A6AE] hover:text-[#F4F4F4]">
                              <ChevronRightIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Calendar Grid */}
                        <div className="space-y-2">
                          {/* Day Headers */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                              <div key={idx} className="text-center text-xs font-semibold text-[#A0A6AE] py-1">
                                {day}
                              </div>
                            ))}
                          </div>
                          
                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-1">
                            {/* Empty cells for days before month starts */}
                            {[...Array(1)].map((_, idx) => (
                              <div key={`empty-${idx}`} className="aspect-square" />
                            ))}
                            
                            {/* Days of month */}
                            {[...Array(30)].map((_, idx) => {
                              const day = idx + 1;
                              const hasEvent = day === 21 || day === 17; // Event dates
                              const isToday = day === 12;
                              
                              return (
                                <button
                                  key={day}
                                  className={cn(
                                    "aspect-square flex items-center justify-center text-sm rounded-lg transition-all",
                                    hasEvent && "bg-[#EACB56]/20 text-[#EACB56] font-semibold border border-[#EACB56]/30",
                                    isToday && !hasEvent && "bg-[#F4F4F4]/10 text-[#F4F4F4] font-semibold",
                                    !hasEvent && !isToday && "text-[#A0A6AE] hover:bg-[#F4F4F4]/5"
                                  )}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-6 pt-4 border-t border-[#F4F4F4]/10 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded bg-[#EACB56]/20 border border-[#EACB56]/30"></div>
                            <span className="text-[#A0A6AE]">Event Day</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded bg-[#F4F4F4]/10"></div>
                            <span className="text-[#A0A6AE]">Today</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* IMPACT TAB */}
            {activeTab === "impact" && (
              <div className="animate-in fade-in-50 duration-500 space-y-8">
                {/* Photo Gallery */}
                {ministry.gallery && ministry.gallery.length > 0 && (
                  <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-[#F4F4F4] text-2xl flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-[#EACB56]" />
                        Impact Gallery
                      </CardTitle>
                      <p className="text-[#A0A6AE] mt-2">
                        See the difference we're making together in our community.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {ministry.gallery.map((photo, index) => (
                          <button 
                            key={index} 
                            onClick={() => {
                              setSelectedImage(photo);
                              setSelectedImageIndex(index);
                            }}
                            className="aspect-square rounded-lg overflow-hidden group relative cursor-pointer"
                          >
                            <img 
                              src={photo} 
                              alt={`${ministry.title} impact ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-[#F4F4F4]/20 backdrop-blur-sm flex items-center justify-center">
                                <Search className="w-6 h-6 text-[#F4F4F4]" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Impact Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ministry.impactStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-lg">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-[#EACB56]/10 flex items-center justify-center mx-auto mb-4">
                            <Icon className="w-8 h-8 text-[#EACB56]" />
                          </div>
                          <div className="text-4xl font-bold text-[#F4F4F4] mb-2">{stat.value}</div>
                          <div className="text-sm text-[#A0A6AE] uppercase tracking-wide">{stat.label}</div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Testimonials */}
                <Card className="border-[#F4F4F4]/10 bg-[#1A1F26] shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-[#F4F4F4] text-2xl uppercase tracking-wide">
                      Stories from Our Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {ministry.testimonials.map((testimonial, index) => (
                        <div key={index} className="p-6 bg-[#0E1116]/50 rounded-lg border border-[#F4F4F4]/10">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-14 w-14 border-2 border-[#EACB56]/30">
                              <AvatarImage src={testimonial.avatar} />
                              <AvatarFallback className="bg-[#EACB56]/20 text-[#EACB56]">
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-[#F4F4F4]">{testimonial.name}</h4>
                              <p className="text-sm text-[#A0A6AE]">{testimonial.role}</p>
                            </div>
                          </div>
                          <p className="text-[#A0A6AE] italic leading-relaxed text-lg">
                            "{testimonial.quote}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile CTA Bar - Fixed at bottom on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0E1116] border-t border-[#F4F4F4]/10 z-30">
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-[#EACB56] hover:bg-[#EACB56]/90 text-[#0E1116] font-semibold" 
            onClick={() => setActiveTab("donations")}
          >
            <Package className="w-4 h-4 mr-2" />
            Donate
          </Button>
          <Button 
            className="flex-1 bg-[#2EA98A] hover:bg-[#2EA98A]/90 text-white font-semibold" 
            onClick={() => setActiveTab("volunteers")}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Volunteer
          </Button>
        </div>
      </div>

      {/* Donation Dialog */}
      {(routeToIdMap[id || ""] || id) === "1" && (
        <Dialog open={donateDialogOpen} onOpenChange={setDonateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1F26] border-[#F4F4F4]/10">
            <DialogHeader>
              <DialogTitle className="text-[#F4F4F4]">
                Donate {selectedItemId ? donationItems.find(item => item.id === selectedItemId)?.name : "Item"}
              </DialogTitle>
              <DialogDescription className="text-[#A0A6AE]">
                Your donation will be reviewed by the ministry leader before being counted. Please provide photos and details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity" className="text-[#F4F4F4]">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  value={donationForm.quantity}
                  onChange={(e) => setDonationForm({ ...donationForm, quantity: Number(e.target.value) })}
                  className="mt-2 bg-[#0E1116] border-[#F4F4F4]/10 text-[#F4F4F4]"
                />
              </div>

              <div>
                <Label htmlFor="condition" className="text-[#F4F4F4]">Condition</Label>
                <Select value={donationForm.condition} onValueChange={(value) => setDonationForm({ ...donationForm, condition: value })}>
                  <SelectTrigger className="mt-2 bg-[#0E1116] border-[#F4F4F4]/10 text-[#F4F4F4]">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1F26] border-[#F4F4F4]/10">
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#F4F4F4]">Description / Additional Details</Label>
                <Textarea
                  id="description"
                  placeholder="Provide any additional details about the item(s)..."
                  value={donationForm.description}
                  onChange={(e) => setDonationForm({ ...donationForm, description: e.target.value })}
                  className="mt-2 bg-[#0E1116] border-[#F4F4F4]/10 text-[#F4F4F4]"
                  rows={4}
                />
              </div>

              <div>
                <Label className="text-[#F4F4F4]">Photos</Label>
                <p className="text-sm text-[#A0A6AE] mb-2">
                  Upload photos of the item(s) to help with review
                </p>
                <PhotoUpload
                  onPhotosChange={setDonationPhotos}
                  maxPhotos={5}
                  maxFileSize={5}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setDonateDialogOpen(false)}
                  className="border-[#F4F4F4]/30 text-[#F4F4F4]"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDonationSubmit} 
                  className="bg-[#EACB56] hover:bg-[#EACB56]/90 text-[#0E1116]"
                >
                  Submit for Review
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Volunteer Dialog */}
      {(routeToIdMap[id || ""] || id) === "1" && (
        <Dialog open={volunteerDialogOpen} onOpenChange={setVolunteerDialogOpen}>
          <DialogContent className="max-w-md bg-[#1A1F26] border-[#F4F4F4]/10">
            <DialogHeader>
              <DialogTitle className="text-[#F4F4F4]">
                Join as Volunteer
              </DialogTitle>
              <DialogDescription className="text-[#A0A6AE]">
                {selectedRoleId && `You're applying for: ${rolesFromData.find(r => r.id === selectedRoleId)?.name || "Selected"}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-[#A0A6AE]">
                The ministry coordinator will contact you within 48 hours with next steps, including orientation details and background check information.
              </p>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setVolunteerDialogOpen(false)}
                  className="border-[#F4F4F4]/30 text-[#F4F4F4]"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleVolunteerSubmit} 
                  className="bg-[#2EA98A] hover:bg-[#2EA98A]/90 text-white"
                >
                  Confirm Interest
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Image Lightbox */}
      {selectedImage && ministry.gallery && (
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full bg-black/95 border-0 p-0 gap-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
            aria-label="Close image lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>
            
              {/* Main Image */}
            <div className="relative w-full flex-1 flex items-center justify-center p-8 pb-24">
                <img 
                src={ministry.gallery[selectedImageIndex]} 
                alt="Gallery image" 
                  className="max-w-full max-h-full object-contain"
                />
              
              {/* Navigation Arrows */}
              {ministry.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : ministry.gallery.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev < ministry.gallery.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
            </div>
              
              {/* Thumbnail Rail */}
              {ministry.gallery.length > 1 && (
              <div className="w-full bg-black/80 backdrop-blur-sm border-t border-white/10 p-4">
                  <div className="flex gap-3 justify-center overflow-x-auto pb-2">
                    {ministry.gallery.map((photo, index) => (
                      <button
                        key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-[#EACB56] scale-110' 
                          : 'border-transparent hover:border-white/30 opacity-60 hover:opacity-100'
                      }`}
                      >
                        <img 
                          src={photo} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      )}
    </div>
  );
}
