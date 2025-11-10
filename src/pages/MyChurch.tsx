import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserCheck, Bell, Gift, Plus, Eye, Edit3, Trash2, CheckCircle, Camera, Upload, MoreHorizontal, TrendingUp, Activity, HandHeart, Package, ArrowRight, Church, Music, Book, Coffee, Gamepad2, DollarSign, Briefcase, Baby, GraduationCap, Sparkles, ChevronLeft, ChevronRight, X, Sprout, ShoppingBag, HeartHandshake } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "@/components/EventCard";
import { EventCalendar } from "@/components/EventCalendar";
import { CompactEventCalendar } from "@/components/CompactEventCalendar";
import { toast } from "sonner";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

// Additional images for second photo
import sofaImage2 from "@/assets/marketplace/sofa.jpg"; // Using same for demo
import laptopImage2 from "@/assets/marketplace/laptop.jpg";
import babyChairImage2 from "@/assets/marketplace/baby-chair.jpg";
import dishesImage2 from "@/assets/marketplace/dishes.jpg";
import clothesImage2 from "@/assets/marketplace/clothes.jpg";
import booksToys2 from "@/assets/marketplace/books-toys.jpg";

export default function MyChurch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get the tab from URL params, default to "connecting" 
  const urlParams = new URLSearchParams(window.location.search);
  const tabFromUrl = urlParams.get('tab') || "serving";
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventSearchQuery, setEventSearchQuery] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("all");
  const [ministrySearchQuery, setMinistrySearchQuery] = useState("");
  const [selectedMinistryCategory, setSelectedMinistryCategory] = useState("All");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<"give" | "wish">("give");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [newItem, setNewItem] = useState({ title: "", description: "", category: "Household", contact: "message" });
  const [selectedItemImages, setSelectedItemImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
  const [marketplaceCurrentPage, setMarketplaceCurrentPage] = useState(1);
  const [wishlistCurrentPage, setWishlistCurrentPage] = useState(1);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [selectedWishForOffer, setSelectedWishForOffer] = useState<any | null>(null);
  const [offerContactMethod, setOfferContactMethod] = useState<'message' | 'phone' | 'email' | 'church'>('message');
  const [offerNote, setOfferNote] = useState("");
  const [offerPhotos, setOfferPhotos] = useState<string[]>([]);
  const eventsPerPage = 9; // 3 rows x 3 columns
  const marketplacePerPage = 8; // 2 rows x 4 columns
  const wishlistPerPage = 6; // 3 rows x 2 columns
  const { churchName: churchFromDB, memberName } = useMembership();
  const { events, loading: eventsLoading } = useEvents();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Church-specific data - fetched from database via hook
  const churchName = churchFromDB ?? "Test Church";
  const memberSince = "2022";

  // Stats data
  const stats = [
    { icon: Heart, label: "Active Needs", value: 3 },
    { icon: UserCheck, label: "Needs Served", value: 7 },
    { icon: Package, label: "Items Needed", value: 8 },
    { icon: Gift, label: "Items Given", value: 12 },
    { icon: Calendar, label: "Upcoming Events", value: 2 },
    { icon: Users, label: "Church Members", value: 156 }
  ];
  
  // Enhanced mock data with more realistic and compelling needs
  const allChurchNeeds = [
    {
      id: "1",
      title: "Weekly grocery assistance for elderly neighbor",
      description: "Mrs. Johnson, 85, has been a faithful church member for 40 years. After a recent fall, she's having difficulty getting to the grocery store. She needs someone to help with weekly shopping - just basic essentials like milk, bread, and fresh produce. She's very organized with her list and always has her payment ready. This is a wonderful opportunity to bless someone who has served our church family for decades.",
      category: "Groceries",
      urgency: "This Week" as const,
      location: "Downtown area, 2 miles from church",
      estimatedTime: "1-2 hours",
      postedBy: "Sarah Miller",
      postedAt: "2 hours ago",
      icon: ShoppingCart,
      responses: 3
    },
    {
      id: "2", 
      title: "Emergency plumbing repair for single mom",
      description: "Jennifer is a single mother of two young children, working two jobs to make ends meet. Her kitchen faucet is leaking badly and has started causing water damage to the cabinet below. She can't afford a professional plumber right now and is worried about the damage getting worse. Any handyman skills would be incredibly appreciated - this is urgent to prevent further damage to her home.",
      category: "Home Repair",
      urgency: "Immediate" as const,
      location: "Maple Street neighborhood",
      estimatedTime: "1-2 hours",
      postedBy: "Jennifer Davis",
      postedAt: "1 day ago",
      icon: Wrench,
      responses: 1
    },
    {
      id: "3",
      title: "Meal train coordination for new baby blessing",
      description: "The Johnson family just welcomed their third child - a beautiful baby girl! Mom had a C-section and dad is trying to balance work with helping at home. We're organizing a meal train to provide dinners for the next two weeks. Looking for volunteers to prepare and deliver meals (any day between 5-7 PM works). This is such a special time to show God's love through practical care.",
      category: "Meals",
      urgency: "This Week" as const,
      location: "Oakwood subdivision", 
      estimatedTime: "30 minutes delivery",
      postedBy: "Linda Chen",
      postedAt: "1 day ago",
      icon: ChefHat,
      responses: 8
    },
    {
      id: "4",
      title: "Transportation to critical medical appointment",
      description: "Robert needs a ride to his oncologist appointment next Tuesday at 2 PM for cancer treatment follow-up. His car broke down and this appointment is crucial for his ongoing treatment plan. The medical center is about 20 minutes away, and the appointment usually takes about an hour. Robert is a Vietnam veteran and longtime church member who would be so grateful for this help during a difficult time.",
      category: "Transportation",
      urgency: "This Week" as const,
      location: "Pick up from Elm Street",
      estimatedTime: "2-3 hours total",
      postedBy: "Robert Thompson",
      postedAt: "4 hours ago",
      icon: Car,
      responses: 1
    },
    {
      id: "5",
      title: "Yard cleanup after storm damage",
      description: "The recent storms knocked down several large branches in our elderly neighbor's yard. Mr. Peterson, 78, can't handle the cleanup himself and is worried about the branches blocking his driveway. Looking for a few people with trucks to help haul away the debris. He has all the tools needed - just need strong backs and willing hearts! Great opportunity for youth group or men's ministry.",
      category: "Home & Garden",
      urgency: "Flexible" as const,
      location: "Pine Ridge community",
      estimatedTime: "2-3 hours",
      postedBy: "Mike Williams",
      postedAt: "4 days ago",
      icon: Wrench,
      responses: 5
    },
    {
      id: "6",
      title: "Childcare for medical appointments",
      description: "Amanda needs someone to watch her 3-year-old son while she attends physical therapy appointments twice a week (Tuesdays and Thursdays, 10 AM - 12 PM). She's recovering from a car accident and these appointments are essential for her recovery. Her son is well-behaved and loves to read books and play with toys. This ongoing help would mean the world to a young mom working hard to get back on her feet.",
      category: "Childcare",
      urgency: "This Week" as const,
      location: "Westside neighborhood",
      estimatedTime: "2 hours, twice weekly",
      postedBy: "Amanda Rodriguez",
      postedAt: "5 days ago",
      icon: Heart,
      responses: 3
    },
    {
      id: "7",
      title: "Computer help for elderly member",
      description: "Mr. Williams needs help setting up video calls to connect with his grandchildren who live far away. He recently got a tablet but is struggling with the technology. Looking for someone patient who can teach him the basics of video calling and help him stay connected with his family.",
      category: "Technology",
      urgency: "Flexible" as const,
      location: "Senior Living Community",
      estimatedTime: "1-2 hours",
      postedBy: "Pastor Mike",
      postedAt: "3 days ago",
      icon: MessageSquare,
      responses: 2
    },
    {
      id: "8",
      title: "Moving assistance for young family",
      description: "The Rodriguez family is moving to a new apartment this weekend and could use some extra hands. They have most items packed but need help loading and unloading the truck. Great opportunity for our men's ministry to show love in action!",
      category: "Moving",
      urgency: "This Week" as const,
      location: "Cross town move",
      estimatedTime: "4-5 hours",
      postedBy: "Carlos Rodriguez",
      postedAt: "2 days ago",
      icon: Car,
      responses: 7
    }
  ];

  // Event categories for filtering
  const eventCategories = [
    { id: "all", name: "All Events", icon: Calendar, color: "default" },
    { id: "service", name: "Service", icon: HandHeart, color: "destructive" },
    { id: "prayer", name: "Prayer", icon: Church, color: "secondary" },
    { id: "social", name: "Social", icon: Coffee, color: "outline" },
    { id: "fundraiser", name: "Fundraiser", icon: DollarSign, color: "default" },
    { id: "workshops", name: "Workshops", icon: GraduationCap, color: "secondary" },
    { id: "youth", name: "Youth", icon: Gamepad2, color: "outline" },
    { id: "children", name: "Children", icon: Baby, color: "default" },
    { id: "worship", name: "Worship", icon: Music, color: "secondary" },
    { id: "study", name: "Study", icon: Book, color: "outline" },
    { id: "leadership", name: "Leadership", icon: Briefcase, color: "default" }
  ];

  const giveawayItems = [
    {
      id: 1,
      title: "Comfortable Living Room Sofa",
      description: "Gray fabric sofa in excellent condition, perfect for families. Very comfortable and clean.",
      category: "Furniture",
      status: "Available",
      postedBy: "Sarah Johnson",
      timePosted: "2 hours ago",
      image: sofaImage,
      interested: 5,
      images: [sofaImage]
    },
    {
      id: 2,
      title: "Laptop Computer - Perfect for Students",
      description: "Dell laptop in great working condition. Includes charger and wireless mouse.",
      category: "Electronics",
      status: "Available",
      postedBy: "Mike Davis",
      timePosted: "5 hours ago",
      image: laptopImage,
      interested: 8,
      images: [laptopImage]
    },
    {
      id: 3,
      title: "Baby High Chair with Safety Straps",
      description: "White and wood baby high chair with adjustable height and safety straps.",
      category: "Baby/Kids",
      status: "Available",
      postedBy: "Jennifer Miller",
      timePosted: "1 day ago",
      image: babyChairImage,
      interested: 4,
      images: [babyChairImage]
    },
    {
      id: 4,
      title: "Complete Kitchen Dishes Set",
      description: "White ceramic dishes and bowls set, perfect for a new home or replacement set.",
      category: "Household",
      status: "Available",
      postedBy: "Maria Garcia",
      timePosted: "2 days ago",
      image: dishesImage,
      interested: 6,
      images: [dishesImage]
    },
    {
      id: 5,
      title: "Winter Clothes Bundle",
      description: "Clean winter clothing in various sizes. Perfect for families in need during cold season.",
      category: "Clothing", 
      status: "Available",
      postedBy: "David Wilson",
      timePosted: "3 days ago",
      image: clothesImage,
      interested: 12,
      images: [clothesImage]
    }
  ];

  const wishListItems = [
    {
      id: 1,
      title: "Looking for a bicycle for my daughter",
      description: "Seeking a kids' bike for my 8-year-old daughter. Any condition welcome!",
      category: "Recreation",
      postedBy: "Sarah Johnson",
      timePosted: "5 hours ago",
      responses: 2
    },
    {
      id: 2,
      title: "Need a car seat",
      description: "New baby on the way! Looking for an infant car seat in good condition.",
      category: "Baby/Kids",
      postedBy: "Mike Brown",
      timePosted: "1 day ago",
      responses: 4
    }
  ];

  // Ministries data
  const [ministries] = useState([
    {
      id: 1,
      title: "Homeless Outreach",
      subtitle: "Monthly Meal Drop",
      description: "Help us serve our local shelters with warm meals and prayer every 3rd Sunday.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
      category: "Community Service",
      status: "Active",
      nextEvent: "3rd Sunday",
      volunteers: 24,
      updated: "3 days ago",
      impact: "Served 150+ meals last month",
      actions: [
        { label: "Join", variant: "default" as const },
        { label: "View Details", variant: "outline" as const }
      ]
    },
    {
      id: 2,
      title: "Winter Coat Drive",
      subtitle: "Blessing Families This Season",
      description: "Donate your gently used winter items to bless families in need this season.",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
      category: "Donations",
      status: "Active",
      nextEvent: "Ongoing Collection",
      progress: 40,
      goal: 100,
      volunteers: 12,
      updated: "1 week ago",
      impact: "40 of 100 coats collected",
      actions: [
        { label: "Donate Items", variant: "default" as const },
        { label: "Drop-off Locations", variant: "outline" as const }
      ]
    },
    {
      id: 3,
      title: "Community Garden Project",
      subtitle: "Fresh Produce for Food Bank",
      description: "Build and maintain a fresh produce garden to support our food bank year-round.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
      category: "Food Security",
      status: "Active",
      nextEvent: "Saturday 9 AM",
      volunteers: 18,
      updated: "2 days ago",
      impact: "200+ lbs of produce donated monthly",
      actions: [
        { label: "Volunteer", variant: "default" as const },
        { label: "Learn More", variant: "outline" as const }
      ]
    },
    {
      id: 4,
      title: "Food Pantry Ministry",
      subtitle: "Fighting Hunger Together",
      description: "Weekly food distribution to families experiencing food insecurity in our community.",
      image: "https://images.unsplash.com/photo-1593113646773-028c1f7c6c3f?w=800&auto=format&fit=crop",
      category: "Food Security",
      status: "Active",
      nextEvent: "Every Thursday",
      volunteers: 32,
      updated: "5 days ago",
      impact: "Supporting 80+ families weekly",
      actions: [
        { label: "Join Team", variant: "default" as const },
        { label: "View Schedule", variant: "outline" as const }
      ]
    },
    {
      id: 5,
      title: "Back to School Drive",
      subtitle: "Equipping Students for Success",
      description: "Collect and distribute school supplies to students from low-income families.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      category: "Education",
      status: "Upcoming",
      nextEvent: "August 2025",
      progress: 25,
      goal: 200,
      volunteers: 8,
      updated: "1 day ago",
      impact: "25 of 200 supply kits prepared",
      actions: [
        { label: "Donate", variant: "default" as const },
        { label: "Details", variant: "outline" as const }
      ]
    },
    {
      id: 6,
      title: "Community Tutoring",
      subtitle: "Empowering Through Education",
      description: "One-on-one tutoring for students K-12 in reading, math, and other subjects.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      category: "Education",
      status: "Active",
      nextEvent: "Mon-Thu 4-6 PM",
      volunteers: 15,
      updated: "1 week ago",
      impact: "Tutoring 45 students currently",
      actions: [
        { label: "Be a Tutor", variant: "default" as const },
        { label: "More Info", variant: "outline" as const }
      ]
    }
  ]);

  const getMinistryCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      "Community Service": HandHeart,
      "Donations": Package,
      "Food Security": ShoppingBag,
      "Education": HeartHandshake
    };
    return icons[category] || Heart;
  };

  const getMinistryCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Community Service": "bg-blue-500/10 text-blue-600 border-blue-200",
      "Donations": "bg-purple-500/10 text-purple-600 border-purple-200",
      "Food Security": "bg-green-500/10 text-green-600 border-green-200",
      "Education": "bg-orange-500/10 text-orange-600 border-orange-200"
    };
    return colors[category] || "bg-primary/10 text-primary border-primary/20";
  };

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = eventSearchQuery === "" || 
      event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(eventSearchQuery.toLowerCase());
    const matchesCategory = selectedEventCategory === "all" || event.category === selectedEventCategory;
    return matchesSearch && matchesCategory;
  });

  // Add sample events for demonstration with October 2025 dates in chronological order
  const sampleEvents = Array(15).fill(null).map((_, i) => {
    const baseDate = new Date('2025-10-01T00:00:00Z');
    const eventDate = new Date(baseDate.getTime() + (i + 2) * 24 * 60 * 60 * 1000 + (i * 2) * 60 * 60 * 1000);
    return {
      id: `sample-${i}`,
      title: `Community Event ${i + 1}`,
      description: `Join us for this wonderful community gathering. This is a sample event for demonstration purposes.`,
      category: ['service', 'prayer', 'social', 'fundraiser', 'workshops'][i % 5],
      start_datetime: eventDate.toISOString(),
      end_datetime: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      location_text: `Community Center ${i % 3 + 1}`,
      church_id: 'sample',
      organizer_member_id: 'sample',
      featured: i < 3,
      attending_count: Math.floor(Math.random() * 50),
      interested_count: Math.floor(Math.random() * 30),
      volunteer_slots_total: Math.floor(Math.random() * 10) + 5,
      volunteer_slots_filled: Math.floor(Math.random() * 8)
    };
  });

  const allEventsWithSamples = [...filteredEvents, ...sampleEvents].sort((a, b) => 
    new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
  );

  // Events pagination
  const totalEventsPages = Math.ceil(allEventsWithSamples.length / eventsPerPage);
  const eventsStartIndex = (eventsCurrentPage - 1) * eventsPerPage;
  const eventsEndIndex = eventsStartIndex + eventsPerPage;
  const currentEvents = allEventsWithSamples.slice(eventsStartIndex, eventsEndIndex);

  const featuredEvents = events.filter(e => e.featured);

  const getTimeUntilEvent = (startDatetime: string) => {
    const now = new Date();
    const eventDate = new Date(startDatetime);
    const diffInHours = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours`;
    } else {
      const days = Math.ceil(diffInHours / 24);
      return `${days} days`;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = eventCategories.find(c => c.id === category);
    return cat?.icon || Calendar;
  };

  const getCategoryColor = (category: string) => {
    const cat = eventCategories.find(c => c.id === category);
    return cat?.color || "default";
  };

  const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Childcare", "Home & Garden", "Prayer Support", "Other"];
  const itemCategories = ["Household", "Electronics", "Books", "Clothing", "Baby/Kids", "Furniture", "Garden"];
  
  // Filter needs based on search and category
  const filteredNeeds = allChurchNeeds.filter(need => {
    const matchesSearch = searchQuery === "" || 
      need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || need.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredNeeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNeeds = filteredNeeds.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleVolunteer = (needId: string) => {
    toast.success("Thanks for volunteering to help! We'll connect you with the need organizer.");
  };
  

  const handlePostItem = () => {
    toast.success(`${postType === "give" ? "Item" : "Wish"} posted successfully!`);
    setIsPostModalOpen(false);
    setNewItem({ title: "", description: "", category: "Household", contact: "message" });
  };

  const handleWantItem = (itemId: number) => {
    navigate(`/marketplace-item/${itemId}`);
  };

  const openOfferDialog = (wish: any) => {
    setSelectedWishForOffer(wish);
    setOfferContactMethod('message');
    setOfferNote("");
    setOfferPhotos([]);
    setIsOfferDialogOpen(true);
  };

  const submitOffer = () => {
    if (selectedWishForOffer) {
      toast.success(`Thanks! We'll notify ${selectedWishForOffer.postedBy} that you can help.`);
    } else {
      toast.success("Thanks! We'll notify the poster that you can help.");
    }
    setIsOfferDialogOpen(false);
    setSelectedWishForOffer(null);
    setOfferNote("");
    setOfferPhotos([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #8b4513 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(45,27,105,0.9) 0%, rgba(139,69,19,0.9) 100%)' }} />
        <div className="relative">
          <div className="container mx-auto px-4 py-12 text-center animate-fade-in">
            <div className="group inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm
                         hover:bg-white/12 hover:border-white/25 hover:scale-[1.041] hover:shadow-md
                         transition-all duration-150 ease-out cursor-default">
              <Heart className="w-4 h-4 group-hover:scale-105 transition-transform duration-150" />
              <span className="group-hover:text-white/90 transition-colors duration-150">My Church Community</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {churchName}
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Member since {memberSince} • Connected to serve and support our church family
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center 
                             hover:bg-white/12 hover:border-white/25 hover:scale-[1.041] hover:shadow-md
                             transition-all duration-150 ease-out
                             animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2
                                  group-hover:bg-white/25 transition-colors duration-150">
                      <IconComponent className="w-4 h-4 text-white group-hover:scale-105 transition-transform duration-150" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors duration-150">
                      {stat.value}
                    </h3>
                    <p className="text-white/80 text-xs group-hover:text-white/90 transition-colors duration-150">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Four-Tab Navigation - Separate Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-background/95 backdrop-blur-sm rounded-3xl shadow-lg border border-border/50 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-20 rounded-none border-b border-border/5 p-2 px-8 gap-4 mt-3">
              <TabsTrigger 
                value="serving" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-colors duration-300 overflow-hidden data-[state=active]:bg-transparent data-[state=active]:shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none active:outline-none focus:ring-0 active:ring-0 active:shadow-none active:bg-transparent"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'serving' 
                      ? 'bg-primary' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <HandHeart className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'serving' ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'serving' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>SERVING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="giving" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-colors duration-300 overflow-hidden data-[state=active]:bg-transparent data-[state=active]:shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none active:outline-none focus:ring-0 active:ring-0 active:shadow-none active:bg-transparent"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'giving' 
                      ? 'bg-primary' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <Gift className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'giving' ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'giving' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>GIVING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="connecting" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-colors duration-300 overflow-hidden data-[state=active]:bg-transparent data-[state=active]:shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none active:outline-none focus:ring-0 active:ring-0 active:shadow-none active:bg-transparent"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'connecting' 
                      ? 'bg-primary' 
                      : 'bg-muted/20 group-hover:bg-muted/40'
                  }`}>
                    <Users className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'connecting' ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'connecting' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>CONNECTING</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="ministries" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-colors duration-300 overflow-hidden data-[state=active]:bg-transparent data-[state=active]:shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none active:outline-none focus:ring-0 active:ring-0 active:shadow-none active:bg-transparent"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'ministries' 
                      ? 'bg-primary' 
                      : 'bg-muted/20 group-hover:bg-muted/40'
                  }`}>
                    <Church className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'ministries' ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'ministries' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>MINISTRIES</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Unified Search Bar */}
            <div className="p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-border/10">
              <div className="flex flex-col gap-3 items-center max-w-4xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={
                      activeTab === 'serving' ? "Search needs by title or description..." :
                      activeTab === 'giving' ? "Search items by title or description..." :
                      activeTab === 'ministries' ? "Search ministries by title or description..." :
                      "Search events by title or description..."
                    }
                    value={
                      activeTab === 'serving' ? searchQuery :
                      activeTab === 'giving' ? searchQuery :
                      activeTab === 'ministries' ? ministrySearchQuery :
                      eventSearchQuery
                    }
                    onChange={(e) => {
                      if (activeTab === 'serving') setSearchQuery(e.target.value);
                      else if (activeTab === 'giving') setSearchQuery(e.target.value);
                      else if (activeTab === 'ministries') setMinistrySearchQuery(e.target.value);
                      else setEventSearchQuery(e.target.value);
                    }}
                    className="pl-10 pr-4 py-2.5 bg-background/80 border-border/30 focus:border-primary/50 rounded-xl transition-all duration-300"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {activeTab === 'serving' && (
                    <>
                      {['All', 'Groceries', 'Transportation', 'Home Repair', 'Childcare', 'Meals', 'Prayer', 'Other'].map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category}
                        </Button>
                      ))}
                    </>
                  )}

                  {activeTab === 'giving' && (
                    <>
                      {['All', 'Furniture', 'Electronics', 'Baby/Kids', 'Household', 'Clothing', 'Sports', 'Youth'].map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category}
                        </Button>
                      ))}
                    </>
                  )}

                  {activeTab === 'connecting' && (
                    <>
                      {[
                        { id: "all", name: "All Events" },
                        { id: "service", name: "Service" },
                        { id: "prayer", name: "Prayer" },
                        { id: "social", name: "Social" },
                        { id: "fundraiser", name: "Fundraiser" },
                        { id: "workshops", name: "Workshops" },
                        { id: "sports", name: "Sports" },
                        { id: "youth", name: "Youth" }
                      ].map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedEventCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedEventCategory(category.id)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category.name}
                        </Button>
                      ))}
                    </>
                  )}

                  {activeTab === 'ministries' && (
                    <>
                      {['All', 'Missionary', 'Homelessness', 'Hunger', 'Education', 'Health', 'Community', 'Victims'].map((category) => (
                        <Button
                          key={category}
                          variant={selectedMinistryCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMinistryCategory(category)}
                          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border-border/30"
                        >
                          {category}
                        </Button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area - Separate Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-background rounded-2xl shadow-lg border border-border p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* SERVING TAB */}
            <TabsContent value="serving" className="mt-0">
              {/* Enhanced Church Family Needs Section */}
              <div className="space-y-8">
                {/* Intro Section */}
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6">
                  <div className="max-w-3xl">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                      Serving
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      Lend a hand. Share hope. Build community.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Serving opportunities connect the church family to practical needs in our neighborhoods — from meal prep and repairs to prayer and encouragement. Every act of service is a reflection of love in motion.
                    </p>
                  </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Community Needs ({filteredNeeds.length} opportunities)</h2>
                    <p className="text-muted-foreground text-lg">Help make a difference in your church family</p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
                    <Plus className="w-5 h-5 mr-2 text-white" />
                    Post New Need
                  </Button>
                </div>
                
                {/* Needs Grid */}
                {currentNeeds.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentNeeds.map((need) => (
                        <NeedCard
                          key={need.id}
                          id={need.id}
                          title={need.title}
                          description={need.description}
                          category={need.category}
                          urgency={need.urgency}
                          location={need.location}
                          estimatedTime={need.estimatedTime}
                          postedBy={need.postedBy}
                          postedAt={need.postedAt}
                          onVolunteer={handleVolunteer}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            <PaginationItem>
                              <PaginationNext 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-muted/20 rounded-xl">
                    <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No needs match your search
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or clearing the filters to discover more ways to serve.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                        setCurrentPage(1);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* GIVING TAB */}
            <TabsContent value="giving" className="mt-0">
              <div className="space-y-8">
                {/* Intro Section */}
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6">
                  <div className="max-w-3xl">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                      Giving
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      Generosity that strengthens our church family.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Through shared gifts and resources, we care for one another — meeting needs, easing burdens, and celebrating blessings together. Every item shared and every act of giving helps build a stronger, more connected church community.
                    </p>
                  </div>
                </div>

                {/* Header with Post Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Giveaway Board</h2>
                    <p className="text-muted-foreground text-lg">Share and discover items within your church community</p>
                  </div>
                  <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                    <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6 rounded-xl">
                    <Plus className="w-5 h-5 mr-2" />
                    Post New Item
                  </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {postType === "give" ? "Give Away Item" : "Add to Wish List"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button 
                            variant={postType === "give" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("give")}
                            className="flex-1"
                          >
                            Give Away
                          </Button>
                          <Button 
                            variant={postType === "wish" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("wish")}
                            className="flex-1"
                          >
                            Add Wish
                          </Button>
                        </div>
                        
                        {postType === "give" && (
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Drop photos here or click to upload
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            placeholder="What are you sharing?"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            placeholder="Provide details about the item..."
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {itemCategories.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          <Button onClick={handlePostItem} className="flex-1">
                            Post {postType === "give" ? "Item" : "Wish"}
                          </Button>
                          <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>


                {/* Item Grid - 2 rows x 4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {giveawayItems.concat(Array(11).fill(null).map((_, i) => ({
                    id: i + 6,
                    title: `${['Educational Toys Set', 'Garden Tools', 'Art Supplies Kit', 'Board Games Collection', 'Office Chair', 'Bookshelf', 'Exercise Equipment', 'Kitchen Utensils', 'Winter Coats', 'Sports Equipment', 'Craft Materials'][i % 11]}`,
                    description: `${['Perfect for learning and development', 'Well-maintained garden tools', 'Great for creative projects', 'Family game night essentials', 'Comfortable office seating', 'Solid wood construction', 'Great for home workouts', 'Complete kitchen set', 'Various sizes available', 'Sports and recreation items', 'Arts and crafts supplies'][i % 11]}. Contact for more details!`,
                    category: ['Baby/Kids', 'Garden', 'Youth', 'Youth', 'Furniture', 'Furniture', 'Sports', 'Household', 'Clothing', 'Sports', 'Youth'][i % 11],
                    status: "Available",
                    postedBy: `Member ${i + 6}`,
                    timePosted: `${Math.floor(Math.random() * 7) + 1} days ago`,
                    image: [sofaImage, laptopImage, babyChairImage, dishesImage, clothesImage, booksToys][i % 6],
                    images: [
                      [sofaImage, laptopImage], 
                      [laptopImage, babyChairImage], 
                      [babyChairImage, dishesImage], 
                      [dishesImage, clothesImage], 
                      [clothesImage, booksToys], 
                      [booksToys, sofaImage]
                    ][i % 6],
                    interested: Math.floor(Math.random() * 10) + 1
                  }))).slice((marketplaceCurrentPage - 1) * marketplacePerPage, marketplaceCurrentPage * marketplacePerPage).map((item) => (
                    <Card key={item.id} className="border border-border hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-muted rounded-t-lg cursor-pointer group relative overflow-hidden"
                           onClick={() => {
                             setSelectedItemImages(item.images);
                             setCurrentImageIndex(0);
                           }}>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-sm line-clamp-1">{item.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Clock className="w-3 h-3" />
                          {item.timePosted}
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full text-xs h-7"
                          onClick={() => handleWantItem(item.id)}
                        >
                          Request This
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Marketplace Pagination */}
                {Math.ceil((giveawayItems.length + 11) / marketplacePerPage) > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setMarketplaceCurrentPage(prev => Math.max(1, prev - 1))}
                            className={marketplaceCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.ceil((giveawayItems.length + 11) / marketplacePerPage) }, (_, i) => (
                          <PaginationItem key={i + 1}>
                            <PaginationLink
                              onClick={() => setMarketplaceCurrentPage(i + 1)}
                              isActive={marketplaceCurrentPage === i + 1}
                              className="cursor-pointer"
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setMarketplaceCurrentPage(prev => Math.min(Math.ceil((giveawayItems.length + 11) / marketplacePerPage), prev + 1))}
                            className={marketplaceCurrentPage === Math.ceil((giveawayItems.length + 11) / marketplacePerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}

                {/* Wish List Section - Two Columns with Pagination */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Community Wish List</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wishListItems.concat(Array(10).fill(null).map((_, i) => ({
                      id: i + 10,
                      title: `Looking for ${['Tools', 'Baby Items', 'Furniture', 'Electronics', 'Books', 'Clothes', 'Sports Equipment', 'Garden Supplies', 'Kitchen Items', 'Toys'][i]}`,
                      description: `In need of ${['tools for home repair', 'baby clothes and toys', 'living room furniture', 'kitchen appliances', 'children\'s books', 'winter clothing', 'sports equipment for kids', 'garden tools and supplies', 'kitchen appliances', 'educational toys'][i]}. Any condition welcome!`,
                      category: ['Tools', 'Baby/Kids', 'Furniture', 'Electronics', 'Books', 'Clothing', 'Sports', 'Garden', 'Kitchen', 'Toys'][i],
                      postedBy: `Member ${i + 1}`,
                      timePosted: `${i + 1} hours ago`,
                      responses: Math.floor(Math.random() * 5)
                    }))).slice((wishlistCurrentPage - 1) * wishlistPerPage, wishlistCurrentPage * wishlistPerPage).map((wish) => (
                      <Card key={wish.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground text-sm">{wish.title}</h4>
                            <Badge variant="outline" className="text-xs">{wish.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{wish.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {wish.postedBy}
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              {wish.timePosted}
                              <span>•</span>
                              <MessageSquare className="w-3 h-3" />
                              {wish.responses} offers
                            </div>
                            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => openOfferDialog(wish)}>
                              I Have This
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Wishlist Pagination */}
                  {Math.ceil((wishListItems.length + 10) / wishlistPerPage) > 1 && (
                    <div className="flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setWishlistCurrentPage(prev => Math.max(1, prev - 1))}
                              className={wishlistCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.ceil((wishListItems.length + 10) / wishlistPerPage) }, (_, i) => (
                            <PaginationItem key={i + 1}>
                              <PaginationLink
                                onClick={() => setWishlistCurrentPage(i + 1)}
                                isActive={wishlistCurrentPage === i + 1}
                                className="cursor-pointer"
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setWishlistCurrentPage(prev => Math.min(Math.ceil((wishListItems.length + 10) / wishlistPerPage), prev + 1))}
                              className={wishlistCurrentPage === Math.ceil((wishListItems.length + 10) / wishlistPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* CONNECTING TAB */}
            <TabsContent value="connecting" className="mt-0">
              <div className="space-y-6">
                {/* Intro Section */}
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                  {/* Text Box */}
                  <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6 flex-1">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                      Connecting
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      Grow relationships. Grow faith.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Connecting is how we move from Sunday attendance to true community. Join gatherings, workshops, and outreach events that help build friendships and deepen your walk with God and others.
                    </p>
                  </div>
                  {/* Calendar Box */}
                  <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-2 w-[280px] h-[280px] flex items-center justify-center">
                    <div className="w-full h-full">
                      <CompactEventCalendar events={events} showCard={false} />
                    </div>
                  </div>
                </div>

                {/* First Row - Featured Events and Calendar */}
                {featuredEvents.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        Featured Events
                      </h2>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Featured Events */}
                      {featuredEvents.slice(0, 2).map((event) => {
                        const IconComponent = getCategoryIcon(event.category);
                        
                        return (
                          <EventCard
                            key={event.id}
                            event={event}
                            categoryIcon={IconComponent}
                            categoryColor={getCategoryColor(event.category)}
                          />
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Events Grid with Pagination */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedEventCategory === "all" ? "All Events" : eventCategories.find(c => c.id === selectedEventCategory)?.name}
                        <span className="text-muted-foreground ml-2">({allEventsWithSamples.length})</span>
                      </h2>
                    </div>
                  </div>

                  {eventsLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(9)].map((_, i) => (
                        <Card key={i} className="border-0 shadow-card">
                          <CardContent className="p-6">
                            <div className="space-y-4 animate-pulse">
                              <div className="w-12 h-12 bg-muted rounded-xl"></div>
                              <div className="h-4 bg-muted rounded w-3/4"></div>
                              <div className="h-3 bg-muted rounded w-full"></div>
                              <div className="h-3 bg-muted rounded w-1/2"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : currentEvents.length === 0 ? (
                    <Card className="border-0 shadow-card">
                      <CardContent className="p-12 text-center">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No events found</h3>
                        <p className="text-muted-foreground mb-4">
                          {eventSearchQuery || selectedEventCategory !== "all" 
                            ? "Try adjusting your search or filter criteria." 
                            : "There are no events scheduled at the moment."}
                        </p>
                        {(eventSearchQuery || selectedEventCategory !== "all") && (
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setEventSearchQuery("");
                              setSelectedEventCategory("all");
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentEvents.map((event) => {
                          const IconComponent = getCategoryIcon(event.category);
                          
                          return (
                            <EventCard
                              key={event.id}
                              event={event}
                              categoryIcon={IconComponent}
                              categoryColor={getCategoryColor(event.category)}
                            />
                          );
                        })}
                      </div>

                      {/* Events Pagination */}
                      {totalEventsPages > 1 && (
                        <div className="flex justify-center mt-8">
                          <Pagination>
                            <PaginationContent>
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setEventsCurrentPage(prev => Math.max(1, prev - 1))}
                                  className={eventsCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                              </PaginationItem>
                              {Array.from({ length: totalEventsPages }, (_, i) => (
                                <PaginationItem key={i + 1}>
                                  <PaginationLink
                                    onClick={() => setEventsCurrentPage(i + 1)}
                                    isActive={eventsCurrentPage === i + 1}
                                    className="cursor-pointer"
                                  >
                                    {i + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setEventsCurrentPage(prev => Math.min(totalEventsPages, prev + 1))}
                                  className={eventsCurrentPage === totalEventsPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
            </TabsContent>

            {/* MINISTRIES TAB */}
            <TabsContent value="ministries" className="mt-0">
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6">
                  <div className="max-w-3xl">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                      Church Ministries
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      Making a Difference Together
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Discover ministries where our church serves the community through homelessness support, 
                      food drives, community service, and more. Every act of service is an opportunity to share God's love.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" className="shadow-lg">
                        <Heart className="w-5 h-5 mr-2" />
                        Get Involved
                      </Button>
                      <Button size="lg" variant="outline">
                        <Calendar className="w-5 h-5 mr-2" />
                        View Calendar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <Card className="shadow-xl border-border/50 bg-card">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">6</div>
                        <div className="text-sm text-muted-foreground">Active Ministries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">109</div>
                        <div className="text-sm text-muted-foreground">Active Volunteers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">450+</div>
                        <div className="text-sm text-muted-foreground">Lives Impacted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">12</div>
                        <div className="text-sm text-muted-foreground">Years Serving</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ministries Grid */}
                <div>
                  {(() => {
                    // Filter ministries based on search and category
                    const filteredMinistries = ministries.filter(ministry => {
                      const matchesSearch = ministrySearchQuery === "" || 
                        ministry.title.toLowerCase().includes(ministrySearchQuery.toLowerCase()) ||
                        ministry.description.toLowerCase().includes(ministrySearchQuery.toLowerCase()) ||
                        ministry.subtitle.toLowerCase().includes(ministrySearchQuery.toLowerCase());
                      
                      const matchesCategory = selectedMinistryCategory === "All" || 
                        ministry.category.toLowerCase().includes(selectedMinistryCategory.toLowerCase()) ||
                        ministry.title.toLowerCase().includes(selectedMinistryCategory.toLowerCase()) ||
                        ministry.description.toLowerCase().includes(selectedMinistryCategory.toLowerCase());
                      
                      return matchesSearch && matchesCategory;
                    });

                    return (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {filteredMinistries.map((ministry) => {
                      const CategoryIcon = getMinistryCategoryIcon(ministry.category);
                      return (
                        <Link to={`/ministries/${ministry.id}`} className="block h-full">
                          <Card key={ministry.id} className="group overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-border/50 h-full flex flex-col cursor-pointer">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={ministry.image} 
                                alt={ministry.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <Badge 
                                className={`absolute top-4 left-4 ${getMinistryCategoryColor(ministry.category)} border`}
                              >
                                <CategoryIcon className="w-3 h-3 mr-1" />
                                {ministry.category}
                              </Badge>
                              <Badge 
                                className={`absolute top-4 right-4 ${
                                  ministry.status === 'Active' 
                                    ? 'bg-green-500/90 text-white border-green-400' 
                                    : 'bg-blue-500/90 text-white border-blue-400'
                                }`}
                              >
                                {ministry.status}
                              </Badge>
                            </div>

                            {/* Content */}
                            <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                  {ministry.title}
                                </h3>
                                <p className="text-sm font-medium text-primary mb-2">
                                  {ministry.subtitle}
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {ministry.description}
                                </p>
                              </div>

                              {/* Progress Bar (if applicable) */}
                              {ministry.progress !== undefined && ministry.goal && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Progress</span>
                                    <span className="font-semibold">{ministry.progress} of {ministry.goal}</span>
                                  </div>
                                  <Progress value={(ministry.progress / ministry.goal) * 100} className="h-2" />
                                </div>
                              )}

                              {/* Impact & Details */}
                              <div className="space-y-2 pt-2 border-t border-border/50">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4 text-primary" />
                                  <span>{ministry.nextEvent}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="w-4 h-4 text-primary" />
                                  <span>{ministry.volunteers} volunteers</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                  <Heart className="w-4 h-4" />
                                  <span>{ministry.impact}</span>
                                </div>
                              </div>

                              {/* Footer */}
                              <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                                Updated {ministry.updated}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                      </div>
                    );
                  })()}
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
                  <CardContent className="p-8 md:p-12 text-center">
                    <HandHeart className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Start Your Ministry Journey
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                      Whether you have 1 hour a week or 10, there's a place for you to serve and make an impact in our community.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button size="lg" className="shadow-lg">
                        <Heart className="w-5 h-5 mr-2" />
                        Find Your Ministry
                      </Button>
                      <Button size="lg" variant="outline">
                        Contact Ministry Leader
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Image Overlay Modal */}
      {selectedItemImages.length > 0 && (
        <Dialog open={selectedItemImages.length > 0} onOpenChange={() => setSelectedItemImages([])}>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="relative">
              <button
                onClick={() => setSelectedItemImages([])}
                aria-label="Close image viewer"
                title="Close"
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedItemImages[currentImageIndex]}
                  alt="Item preview"
                  className="w-full h-full object-cover"
                />
                
                {selectedItemImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedItemImages.length - 1)}
                      aria-label="Previous image"
                      title="Previous"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < selectedItemImages.length - 1 ? prev + 1 : 0)}
                      aria-label="Next image"
                      title="Next"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedItemImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                          title={`Go to image ${index + 1}`}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Offer Help Lightbox */}
      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent className="sm:max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Offer to Help</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            {selectedWishForOffer && (
              <div className="bg-muted/20 border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">You're offering to help with</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-foreground truncate">{selectedWishForOffer.title}</p>
                      {selectedWishForOffer.category && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs border border-primary/20">
                          {selectedWishForOffer.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Posted by {selectedWishForOffer.postedBy} • {selectedWishForOffer.timePosted}
                    </p>
                  </div>
                </div>
                {selectedWishForOffer.description && (
                  <div className="mt-3 rounded-lg bg-background/60 border border-border/60 p-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedWishForOffer.description}</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label>Preferred contact method</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'message', label: 'In‑app message' },
                  { id: 'phone', label: 'Phone call' },
                  { id: 'email', label: 'Email' },
                  { id: 'church', label: 'Meet at church' },
                ].map((opt) => (
                  <Button
                    key={opt.id}
                    type="button"
                    variant={offerContactMethod === (opt.id as any) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOfferContactMethod(opt.id as any)}
                    className="rounded-full"
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="offer-note">Add a short note (optional)</Label>
              <Textarea
                id="offer-note"
                placeholder="Hi! I have this and can help. When would be a good time to connect?"
                value={offerNote}
                onChange={(e) => setOfferNote(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>

            {/* Photo attachments */}
            <div className="space-y-2">
              <Label>Attach photos (optional)</Label>
              {offerPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {offerPhotos.map((src, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-xl border border-border">
                      <img src={src} alt={`Offer photo ${idx + 1}`} className="h-24 w-full object-cover" />
                      <button
                        aria-label="Remove photo"
                        title="Remove photo"
                        onClick={() => setOfferPhotos(offerPhotos.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 rounded-full bg-black/50 text-white w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-2 border-dashed border-border rounded-xl p-4 flex items-center justify-between gap-3 bg-card/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" />
                  <span>Add images (JPG/PNG)</span>
                </div>
                <label className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer">
                  <Plus className="w-4 h-4" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const urls = files.map((f) => URL.createObjectURL(f));
                      setOfferPhotos([...offerPhotos, ...urls]);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-700 dark:text-amber-300">
              Meet in public church spaces for exchanges. Keep communications on-platform when possible. If anything feels off, involve church leadership.
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1 rounded-xl" onClick={submitOffer}>Send Offer</Button>
              <Button variant="outline" className="rounded-xl" onClick={() => setIsOfferDialogOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
