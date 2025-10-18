import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Heart, Star, MessageSquare, Clock, Car, ShoppingCart, Wrench, ChefHat, Search, Filter, UserPlus, Sparkles, TrendingUp, Award, Eye, ChevronLeft, ChevronRight, HandHeart, Church, Coffee, DollarSign, GraduationCap, Gamepad2, Baby, Music, Book, Briefcase, ArrowRight, Gift, CheckCircle } from "lucide-react";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

export default function Community() {
  const [activeTab, setActiveTab] = useState("needs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [testimonialsPage, setTestimonialsPage] = useState(0);
  const [givingPage, setGivingPage] = useState(1);
  const itemsPerPage = 9; // 3 rows × 3 columns
  const testimonialsPerPage = 8;
  const givingPerPage = 6; // 2 rows × 3 columns

  const communityNeeds = [
    {
      id: 12,
      title: "Meal Delivery for Seniors",
      description: "Help deliver hot meals to seniors in our community every Friday afternoon.",
      category: "Meals",
      location: "Senior Center",
      urgency: "Weekly",
      timePosted: "completed 2 weeks ago",
      icon: ChefHat,
      church: "Grace Community",
      responses: 6,
      featured: false
    },
    {
      id: 1,
      title: "Grocery Shopping for Mrs. Johnson",
      description: "Weekly grocery assistance needed for our beloved 85-year-old church elder who is recovering from surgery. She's been a faithful member for 40 years.",
      category: "Groceries",
      location: "Downtown Area",
      urgency: "This Week",
      timePosted: "completed 2 hours ago",
      icon: ShoppingCart,
      church: "Grace Community",
      responses: 3,
      featured: true
    },
    {
      id: 2,
      title: "Transportation to Medical Center",
      description: "Brother Robert needs reliable transportation to his cancer treatment appointments. His vehicle is being repaired and these sessions are critical.",
      category: "Transportation",
      location: "Medical District",
      urgency: "Immediate",
      timePosted: "completed 4 hours ago",
      icon: Car,
      church: "First Baptist",
      responses: 1,
      featured: false
    },
    {
      id: 3,
      title: "Home Repair Emergency",
      description: "Single mother Jennifer needs help with a leaky faucet that's causing water damage. Looking for someone with plumbing skills to prevent further issues.",
      category: "Home Repair",
      location: "Westside",
      urgency: "Immediate",
      timePosted: "completed 6 hours ago",
      icon: Wrench,
      church: "Community Fellowship",
      responses: 0,
      featured: false
    },
    {
      id: 4,
      title: "Meal Train for New Parents",
      description: "The Johnson family welcomed baby Grace! Let's organize a meal train to support them during this beautiful but exhausting time.",
      category: "Meals",
      location: "Oakwood Suburb",
      urgency: "This Week",
      timePosted: "completed 1 day ago",
      icon: ChefHat,
      church: "Riverside Church",
      responses: 8,
      featured: true
    },
    {
      id: 5,
      title: "Yard Cleanup After Storm",
      description: "Mr. Peterson's yard was hit hard by recent storms. Large branches are blocking his driveway and he needs help clearing the debris.",
      category: "Home & Garden",
      location: "Pine Ridge",
      urgency: "Flexible",
      timePosted: "completed 2 days ago",
      icon: Wrench,
      church: "Hillside Baptist",
      responses: 2,
      featured: false
    },
    {
      id: 6,
      title: "Childcare During Therapy",
      description: "Amanda needs reliable childcare for her 3-year-old while attending physical therapy sessions twice weekly following her car accident.",
      category: "Childcare",
      location: "Westside",
      urgency: "This Week",
      timePosted: "completed 3 days ago",
      icon: Heart,
      church: "Grace Community",
      responses: 4,
      featured: false
    },
    {
      id: 7,
      title: "Tech Help for Seniors",
      description: "Our senior group needs help setting up tablets for virtual Bible study. Looking for patient volunteers to assist.",
      category: "Technology",
      location: "Community Center",
      urgency: "This Week",
      timePosted: "completed 4 days ago",
      icon: Wrench,
      church: "Grace Community",
      responses: 2,
      featured: false
    },
    {
      id: 8,
      title: "Moving Assistance for New Family",
      description: "The Lee family is moving into our neighborhood and needs help unloading their truck and settling in.",
      category: "Moving",
      location: "Maple Street",
      urgency: "This Weekend",
      timePosted: "completed 5 days ago",
      icon: Wrench,
      church: "First Baptist",
      responses: 5,
      featured: false
    },
    {
      id: 9,
      title: "Pet Care for Hospitalized Member",
      description: "Sister Ann is in the hospital and needs someone to care for her dog for a week. Food and supplies provided.",
      category: "Pet Care",
      location: "Elm Avenue",
      urgency: "Urgent",
      timePosted: "completed 6 days ago",
      icon: Heart,
      church: "Community Fellowship",
      responses: 1,
      featured: false
    },
    {
      id: 10,
      title: "Tutoring for Kids",
      description: "Several children need help with math and reading after school. Volunteers with teaching experience preferred.",
      category: "Education",
      location: "Church Hall",
      urgency: "This Week",
      timePosted: "completed 1 week ago",
      icon: Heart,
      church: "Riverside Church",
      responses: 3,
      featured: false
    },
    {
      id: 11,
      title: "Emergency Home Repair",
      description: "A family lost part of their roof in last night's storm. Immediate help needed to cover and repair damage.",
      category: "Emergency Repair",
      location: "Oakwood Suburb",
      urgency: "Immediate",
      timePosted: "completed 1 week ago",
      icon: Wrench,
      church: "Hillside Baptist",
      responses: 2,
      featured: true
    }
  ];

  const successStories = [
    {
      id: 1,
      content: "I help with transportation requests weekly. Whether it's doctor visits or job interviews, giving someone a ride can literally change the trajectory of their day - and sometimes their life.",
      author: "Maria Williams", 
      church: "St. Luke's Community",
      rating: 5,
      avatar: "MW",
      impact: "Weekly transportation",
      timeframe: "Ongoing",
      category: "Transportation"
    },
    {
      id: 2,
      content: "ChurchConnect has revolutionized how our congregation connects and serves. We've facilitated over 200 acts of service this quarter alone. It's like having a full-time ministry coordinator in everyone's pocket.",
      author: "Pastor Tom Richards",
      church: "Hillside Christian Church",
      rating: 5,
      avatar: "PT",
      impact: "200+ acts of service",
      timeframe: "This quarter",
      category: "Church Leadership"
    },
    {
      id: 3,
      content: "The transparency and ease of the platform has increased our community engagement by 300%. Members who never participated before are now actively giving and receiving help regularly.",
      author: "Lisa Stevens",
      church: "Covenant Community Church", 
      rating: 5,
      avatar: "LS",
      impact: "300% engagement increase",
      timeframe: "This year",
      category: "Ministry Director"
    },
    {
      id: 4,
      content: "When my teenage son needed a laptop for college applications, I hesitated to ask. A church family donated their extra MacBook within hours. He's now enrolled at his dream school.",
      author: "Carlos Delgado",
      church: "Faith Community Church",
      rating: 5,
      avatar: "CD", 
      impact: "College success",
      timeframe: "Last year",
      category: "Special Situations"
    },
    {
      id: 5,
      content: "Hurricane damage left us without basic appliances. Through ChurchConnect, our church family furnished our entire kitchen in three days. We were able to host Thanksgiving after all.",
      author: "Nancy Kim",
      church: "Seaside Chapel",
      rating: 4,
      avatar: "NK",
      impact: "Full kitchen replacement",
      timeframe: "Last month",
      category: "Emergency Response"
    },
    {
      id: 6,
      content: "I've donated over 20 items this year through the platform. Seeing families receive exactly what they need, when they need it most, reminds me that our excess can be someone else's miracle.",
      author: "Kevin Carter",
      church: "Cornerstone Baptist",
      rating: 5,
      avatar: "KC",
      impact: "20+ donations",
      timeframe: "This year",
      category: "Active Donor"
    },
    {
      id: 7,
      content: "I coordinate our monthly grocery drives through the app. Last month we organized 50 volunteers across 8 churches to serve 200 families. The efficiency of connecting so many willing hearts in one place is remarkable.",
      author: "Amanda Lopez",
      church: "Riverside Community Church",
      rating: 5,
      avatar: "AL",
      impact: "200 families served",
      timeframe: "Monthly",
      category: "Coordination"
    },
    {
      id: 8,
      content: "When Mrs. Patterson needed her yard cleaned before winter, I saw her request and spent my Saturday morning raking leaves with my kids. Teaching them to serve while building relationships - that's what community is about.",
      author: "David Wilson",
      church: "New Hope Fellowship",
      rating: 4,
      avatar: "DW",
      impact: "Family service learning",
      timeframe: "Last month",
      category: "Family Service"
    },
    {
      id: 9,
      content: "I teach basic computer skills to seniors every Tuesday through the app. Watching 73-year-old Frank learn to email his grandson in college was worth every minute I've invested.",
      author: "Jennifer Chen",
      church: "CrossPoint Church",
      rating: 5,
      avatar: "JC",
      impact: "Weekly tech tutoring",
      timeframe: "Ongoing",
      category: "Skills Teaching"
    },
    {
      id: 10,
      content: "Our neighborhood food prep team meets weekly to make meals for new moms. Through ChurchConnect, we've coordinated 150 home-cooked meals this quarter. It's fellowship with a purpose.",
      author: "Betty Thompson",
      church: "Grace Community Church",
      rating: 4,
      avatar: "BT",
      impact: "150 meals coordinated",
      timeframe: "This quarter",
      category: "Meal Ministry"
    },
    {
      id: 11,
      content: "I help drive church members to medical appointments twice a week. Being the friendly face in the waiting room or helping someone navigate their insurance forms - these small acts create lasting bonds.",
      author: "Sofia Patel",
      church: "Unity Christian Church",
      rating: 4,
      avatar: "SP",
      impact: "Medical transport support",
      timeframe: "Twice weekly",
      category: "Healthcare Support"
    },
    {
      id: 12,
      content: "Every Saturday, I help elderly members with basic home maintenance - changing light bulbs, unclogging drains, fixing squeaky doors. My toolbox has become my ministry toolkit.",
      author: "James Robinson",
      church: "First Methodist",
      rating: 5,
      avatar: "JR",
      impact: "Weekly home repairs",
      timeframe: "Saturdays",
      category: "Home Maintenance"
    },
    {
      id: 13,
      content: "I teach cooking classes for college students and young adults through the platform. Nothing beats seeing someone master their grandmother's recipe or learn to meal prep for the week.",
      author: "Tom Richards",
      church: "Hillside Christian Church",
      rating: 4,
      avatar: "TR",
      impact: "Cooking education",
      timeframe: "Weekly classes",
      category: "Life Skills"
    },
    {
      id: 14,
      content: "Our carpool network for after-school activities has been a game-changer. Working parents support each other seamlessly, and the kids have built friendships across church families.",
      author: "Emily Rodriguez",
      church: "Grace Fellowship",
      rating: 5,
      avatar: "ER",
      impact: "Carpool coordination",
      timeframe: "School year",
      category: "Family Support"
    },
    {
      id: 15,
      content: "I offer free tax preparation for church families during tax season. It's incredible how helping someone navigate their finances becomes an opportunity for deeper conversations about stewardship and planning.",
      author: "Mark Harris",
      church: "Community Baptist",
      rating: 4,
      avatar: "MH",
      impact: "Tax preparation",
      timeframe: "Tax season",
      category: "Financial Services"
    },
    {
      id: 16,
      content: "Teaching guitar lessons to teenagers through the app has been amazing. Music brings us together across generations, and now we have a youth band that plays monthly at service.",
      author: "Janet Kim",
      church: "Riverside Community",
      rating: 5,
      avatar: "JK",
      impact: "Youth band formation",
      timeframe: "Monthly lessons",
      category: "Music Ministry"
    },
    {
      id: 17,
      content: "I help families organize their homes and create functional spaces. Decluttering isn't just about stuff - it's about creating peaceful environments where families can thrive together.",
      author: "Tyler Jackson",
      church: "Mountain View Church",
      rating: 4,
      avatar: "TJ",
      impact: "Home organization",
      timeframe: "As needed",
      category: "Organization Services"
    },
    {
      id: 18,
      content: "Our reading tutoring program connects literacy volunteers with struggling students. Watching kids gain confidence with each book we read together reminds me why education is so powerful.",
      author: "Amanda Lopez",
      church: "Riverside Community Church",
      rating: 5,
      avatar: "AL",
      impact: "Reading improvement",
      timeframe: "Weekly tutoring",
      category: "Education Support"
    },
    {
      id: 19,
      content: "When I was recovering from surgery, church members rotated helping with my dog walks and grocery runs. The coordination was flawless, and I felt so supported during a vulnerable time.",
      author: "Jennifer Chen",
      church: "CrossPoint Church",
      rating: 5,
      avatar: "JC",
      impact: "Recovery support",
      timeframe: "Recovery period",
      category: "Medical Recovery"
    },
    {
      id: 20,
      content: "The childcare swap network has been incredible for our family. Parents help each other with date nights and errands, and our kids have formed the sweetest friendships.",
      author: "David Wilson", 
      church: "New Hope Fellowship",
      rating: 4,
      avatar: "DW",
      impact: "Childcare network",
      timeframe: "Ongoing",
      category: "Childcare Support"
    },
    {
      id: 21,
      content: "Learning to garden from experienced church members has transformed my backyard and my perspective. Now I'm teaching my neighbor kids how to grow their own vegetables.",
      author: "Carlos Delgado",
      church: "Faith Community Church",
      rating: 4,
      avatar: "CD",
      impact: "Gardening mentorship",
      timeframe: "Growing season",
      category: "Skills Learning"
    },
    {
      id: 22,
      content: "The resume writing and interview prep I received helped me land my current job. But more than that, it taught me how to present my best self with confidence.",
      author: "Nancy Kim",
      church: "Seaside Chapel",
      rating: 5,
      avatar: "NK",
      impact: "Career advancement",
      timeframe: "Job search period",
      category: "Career Support"
    }
  ];

  const giveawayItems = [
    {
      id: 1,
      title: "Comfortable Living Room Sofa",
      description: "Gray fabric sofa in excellent condition, perfect for families. Very comfortable and clean.",
      category: "Furniture",
      status: "Completed",
      postedBy: "Sarah J.",
      timePosted: "completed 2 weeks ago",
      image: sofaImage,
      receivedBy: "Mark & Lisa T."
    },
    {
      id: 2,
      title: "Laptop Computer - Perfect for Students",
      description: "Dell laptop in great working condition. Includes charger and wireless mouse.",
      category: "Electronics",
      status: "Completed",
      postedBy: "Mike D.",
      timePosted: "completed 1 month ago",
      image: laptopImage,
      receivedBy: "Jessica R."
    },
    {
      id: 3,
      title: "Baby High Chair with Safety Straps",
      description: "White and wood baby high chair with adjustable height and safety straps.",
      category: "Baby/Kids",
      status: "Completed",
      postedBy: "Jennifer M.",
      timePosted: "completed 3 weeks ago",
      image: babyChairImage,
      receivedBy: "The Martinez Family"
    },
    {
      id: 4,
      title: "Complete Kitchen Dishes Set",
      description: "White ceramic dishes and bowls set, perfect for a new home or replacement set.",
      category: "Household",
      status: "Completed",
      postedBy: "Maria G.",
      timePosted: "completed 2 months ago",
      image: dishesImage,
      receivedBy: "College Ministry"
    },
    {
      id: 5,
      title: "Winter Clothes Bundle",
      description: "Clean winter clothing in various sizes. Perfect for families in need during cold season.",
      category: "Clothing", 
      status: "Completed",
      postedBy: "David W.",
      timePosted: "completed 4 months ago",
      image: clothesImage,
      receivedBy: "Local Shelter"
    },
    {
      id: 6,
      title: "Children's Books and Educational Toys",
      description: "Collection of age-appropriate books and educational toys for young children.",
      category: "Education",
      status: "Completed",
      postedBy: "Rachel G.",
      timePosted: "completed 6 weeks ago",
      image: booksToys,
      receivedBy: "Community Daycare"
    },
    {
      id: 7,
      title: "Kitchen Appliance Set",
      description: "Blender, toaster, and coffee maker in working condition. Perfect for new homeowners.",
      category: "Household",
      status: "Completed",
      postedBy: "Tom W.",
      timePosted: "completed 3 months ago",
      image: dishesImage,
      receivedBy: "Young Adults Ministry"
    },
    {
      id: 8,
      title: "Garden Tools and Supplies",
      description: "Complete set of garden tools including shovels, rake, and watering can.",
      category: "Garden",
      status: "Completed",
      postedBy: "Nancy B.",
      timePosted: "completed 5 months ago",
      image: clothesImage,
      receivedBy: "Community Garden"
    },
    {
      id: 9,
      title: "Office Desk and Chair",
      description: "Wooden desk with matching office chair. Great for home office or student workspace.",
      category: "Furniture",
      status: "Completed",
      postedBy: "Mark R.",
      timePosted: "completed 8 weeks ago",
      image: sofaImage,
      receivedBy: "Student Housing"
    },
    {
      id: 10,
      title: "Exercise Equipment Bundle",
      description: "Set of dumbbells, yoga mat, and resistance bands. Perfect for home workouts.",
      category: "Sports",
      status: "Completed",
      postedBy: "Lisa K.",
      timePosted: "completed 1 week ago",
      image: laptopImage,
      receivedBy: "Community Fitness Group"
    },
    {
      id: 11,
      title: "Art Supplies for Kids",
      description: "Crayons, markers, paper, and craft supplies for creative children's activities.",
      category: "Education",
      status: "Completed",
      postedBy: "Amanda T.",
      timePosted: "completed 3 days ago",
      image: booksToys,
      receivedBy: "Sunday School"
    },
    {
      id: 12,
      title: "Professional Work Clothes",
      description: "Business attire in various sizes, perfect for job interviews and professional settings.",
      category: "Clothing",
      status: "Completed",
      postedBy: "Robert S.",
      timePosted: "completed 2 weeks ago",
      image: clothesImage,
      receivedBy: "Job Training Center"
    },
    {
      id: 13,
      title: "Kitchen Cookware Set",
      description: "Pots, pans, and cooking utensils in excellent condition for new households.",
      category: "Household",
      status: "Completed",
      postedBy: "Carol H.",
      timePosted: "completed 5 weeks ago",
      image: dishesImage,
      receivedBy: "Transitional Housing"
    },
    {
      id: 14,
      title: "Children's Bicycle Collection",
      description: "Various sizes of kids' bikes, all in working condition with safety equipment.",
      category: "Recreation",
      status: "Completed",
      postedBy: "James P.",
      timePosted: "completed 1 month ago",
      image: babyChairImage,
      receivedBy: "Foster Care Network"
    },
    {
      id: 15,
      title: "Board Games and Puzzles",
      description: "Family-friendly games and puzzles for entertainment and bonding time.",
      category: "Entertainment",
      status: "Completed",
      postedBy: "Michelle L.",
      timePosted: "completed 10 days ago",
      image: booksToys,
      receivedBy: "Community Center"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Service Marathon",
      description: "Join us for a full day of serving our community through multiple service projects.",
      category: "service",
      start_datetime: "2024-04-15T09:00:00Z",
      location_text: "Multiple Locations",
      attending_count: 127,
      volunteer_slots_total: 50,
      volunteer_slots_filled: 38
    },
    {
      id: 2,
      title: "Youth Leadership Workshop",
      description: "Empowering our young leaders with practical skills for ministry and life.",
      category: "youth",
      start_datetime: "2024-04-12T14:00:00Z",
      location_text: "Youth Center",
      attending_count: 34,
      volunteer_slots_total: 8,
      volunteer_slots_filled: 6
    },
    {
      id: 3,
      title: "Prayer & Fasting Retreat",
      description: "A powerful time of prayer, fasting, and seeking God's face together.",
      category: "prayer",
      start_datetime: "2024-04-08T18:00:00Z",
      location_text: "Church Sanctuary",
      attending_count: 89,
      volunteer_slots_total: 12,
      volunteer_slots_filled: 10
    },
    {
      id: 4,
      title: "Community Fundraiser Dinner",
      description: "Raising funds for local homeless shelter through a fellowship dinner.",
      category: "fundraiser",
      start_datetime: "2024-04-20T17:00:00Z",
      location_text: "Fellowship Hall",
      attending_count: 156,
      volunteer_slots_total: 25,
      volunteer_slots_filled: 20
    },
    {
      id: 5,
      title: "Worship Night Under the Stars",
      description: "An outdoor worship experience celebrating God's creation.",
      category: "worship",
      start_datetime: "2024-04-25T19:00:00Z",
      location_text: "Church Grounds",
      attending_count: 203,
      volunteer_slots_total: 15,
      volunteer_slots_filled: 12
    },
    {
      id: 6,
      title: "Bible Study Workshop",
      description: "Learn effective Bible study methods and deepen your understanding.",
      category: "study",
      start_datetime: "2024-04-18T18:30:00Z",
      location_text: "Education Building",
      attending_count: 67,
      volunteer_slots_total: 5,
      volunteer_slots_filled: 4
    },
    {
      id: 7,
      title: "Coffee & Fellowship Morning",
      description: "Start your day with great coffee and even better fellowship.",
      category: "social",
      start_datetime: "2024-04-14T08:00:00Z",
      location_text: "Church Café",
      attending_count: 78,
      volunteer_slots_total: 8,
      volunteer_slots_filled: 6
    },
    {
      id: 8,
      title: "Children's Ministry Training",
      description: "Equipping volunteers to serve effectively in children's ministry.",
      category: "children",
      start_datetime: "2024-04-22T10:00:00Z",
      location_text: "Children's Wing",
      attending_count: 23,
      volunteer_slots_total: 6,
      volunteer_slots_filled: 5
    },
    {
      id: 9,
      title: "Leadership Development Summit",
      description: "Developing the next generation of church leaders through practical training.",
      category: "leadership",
      start_datetime: "2024-04-30T09:00:00Z",
      location_text: "Conference Room",
      attending_count: 45,
      volunteer_slots_total: 10,
      volunteer_slots_filled: 8
    }
  ];

  const categories = ["All", "Groceries", "Transportation", "Home Repair", "Meals", "Childcare", "Home & Garden", "Technology", "Moving", "Food Drive", "Pet Care", "Education", "Emergency Repair"];

  const filteredNeeds = communityNeeds.filter(need => {
    const matchesSearch = searchQuery === "" || 
      need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || need.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredStories = successStories.filter(story => {
    const matchesSearch = searchQuery === "" || 
      story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.church.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredNeeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNeeds = filteredNeeds.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-90"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-2xl translate-y-20 -translate-x-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Community Connection Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Churches <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">United</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the power of community as churches across the nation connect, serve, and transform lives together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl shadow-2xl" asChild>
                <Link to="/join-movement">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Join the Movement
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm" asChild>
                <Link to="/how-it-works">Discover How</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        {/* Three-Tab Navigation - Separate Container */}
        <div className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-20 rounded-none border-b border-border/5 p-2 shadow-sm">
              <TabsTrigger 
                value="needs" 
                className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:bg-primary/10"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'needs' 
                      ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                      : 'bg-muted/30 group-hover:bg-muted/50'
                  }`}>
                    <Heart className={`w-5 h-5 transition-colors duration-300 ${
                      activeTab === 'needs' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    activeTab === 'needs' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                   }`}>SERVICE</span>
                 </div>
               </TabsTrigger>
               <TabsTrigger 
                  value="giving" 
                  className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:bg-primary/10"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeTab === 'giving' 
                        ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                        : 'bg-muted/50 group-hover:bg-muted'
                    }`}>
                      <Gift className={`w-5 h-5 transition-colors duration-300 ${
                        activeTab === 'giving' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                      }`} />
                    </div>
                    <span className={`transition-colors duration-300 ${
                      activeTab === 'giving' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>GIVING</span>
                </div>
              </TabsTrigger>
                <TabsTrigger 
                  value="events" 
                  className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:bg-primary/10"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeTab === 'events' 
                        ? 'bg-gradient-to-br from-primary/40 to-primary/30' 
                        : 'bg-muted/20 group-hover:bg-muted/40'
                    }`}>
                      <Calendar className={`w-5 h-5 transition-colors duration-300 ${
                        activeTab === 'events' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      }`} />
                    </div>
                    <span className={`transition-colors duration-300 ${
                      activeTab === 'events' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>EVENTS</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="stories" 
                  className="group relative flex items-center justify-center gap-3 text-base font-semibold h-16 rounded-2xl transition-all duration-500 overflow-hidden data-[state=active]:bg-primary/10"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeTab === 'stories' 
                        ? 'bg-gradient-to-br from-accent/40 to-accent/30' 
                        : 'bg-muted/30 group-hover:bg-muted/50'
                    }`}>
                      <Star className={`w-5 h-5 transition-colors duration-300 ${
                        activeTab === 'stories' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                      }`} />
                    </div>
                    <span className={`transition-colors duration-300 ${
                      activeTab === 'stories' ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>TESTIMONIALS</span>
                  </div>
                </TabsTrigger>
            </TabsList>

            {/* Unified Search Bar */}
            <div className="p-4 bg-gradient-to-br from-muted/20 to-muted/5 border-b border-border/10">
              <div className="flex flex-col gap-3 items-center max-w-4xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={
                      activeTab === 'needs' ? "Search needs by title or description..." :
                      activeTab === 'stories' ? "Search stories by content or author..." :
                      "Search events by title or description..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-background/80 border-border/30 focus:border-primary/50 rounded-xl transition-all duration-300"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {activeTab === 'needs' && (
                    <>
                      {['All', 'Groceries', 'Transportation', 'Home Repair', 'Childcare', 'Meals', 'Emergency Repair', 'Other'].map((category) => (
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

                  {activeTab === 'stories' && (
                    <>
                      {['All', 'Church Leadership', 'Church Staff', 'Members', 'Volunteers', 'Family Members', 'Serving', 'Giving', 'Events'].map((category) => (
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

                  {activeTab === 'events' && (
                    <>
                      {['All', 'Service', 'Community', 'Worship', 'Fellowship', 'Outreach'].map((category) => (
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
                      {['All', 'Furniture', 'Electronics', 'Clothing', 'Household', 'Books & Toys'].map((category) => (
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
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area - Separate Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-background rounded-2xl shadow-lg border border-border p-4">
          {/* Content based on active tab */}
          {activeTab === "needs" && (
            <div className="space-y-8">
              {/* Section Header */}
              <div className="text-center space-y-4 py-12 mb-8">
                <h2 className="text-3xl font-bold text-foreground">Completed Community Needs</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Celebrating the completed acts of service that have made a difference in people's lives.</p>
              </div>
              
              {/* Needs Grid - 4 rows x 3 columns with pagination */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentNeeds.map((need) => (
                  <Card key={need.id} className="group hover:shadow-card transition-all duration-200 border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {need.category}
                          </Badge>
                          <Badge 
                            className={
                              need.urgency === "Immediate" 
                                ? "bg-destructive text-destructive-foreground" 
                                : need.urgency === "This Week"
                                ? "bg-accent text-accent-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }
                          >
                            {need.urgency}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {need.timePosted}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {need.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {need.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{need.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{need.responses} responses</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link to={`/service_detail/${need.id}`}>
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}

          {/* Success Stories Tab */}
          {activeTab === "stories" && (
            <div className="space-y-8">
              <div className="text-center space-y-4 py-12 mb-8">
                <h2 className="text-3xl font-bold text-foreground">Transformational Stories</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Real testimonies from lives touched through community connection.
                </p>
              </div>

              {/* Two Column Testimonials Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredStories
                  .slice(testimonialsPage * testimonialsPerPage, (testimonialsPage + 1) * testimonialsPerPage)
                  .map((story) => (
                    <Card key={story.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <blockquote className="text-muted-foreground leading-relaxed mb-4 italic text-sm">
                          "{story.content}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-accent">{story.avatar}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-foreground">{story.author}</div>
                            <div className="text-xs text-muted-foreground">{story.church}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Navigation Arrows - Bottom */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setTestimonialsPage(Math.max(0, testimonialsPage - 1))}
                  disabled={testimonialsPage === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <span className="text-sm text-muted-foreground px-4">
                  Page {testimonialsPage + 1} of {Math.ceil(filteredStories.length / testimonialsPerPage)}
                </span>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setTestimonialsPage(Math.min(Math.ceil(filteredStories.length / testimonialsPerPage) - 1, testimonialsPage + 1))}
                  disabled={testimonialsPage >= Math.ceil(filteredStories.length / testimonialsPerPage) - 1}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-8">
              <div className="text-center space-y-4 py-12 mb-8">
                <h2 className="text-3xl font-bold text-foreground">Church Events</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Connect through church activities and gatherings.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((event) => {
                    const getCategoryIcon = (category: string) => {
                      const icons = {
                        service: HandHeart,
                        prayer: Church,
                        social: Coffee,
                        fundraiser: DollarSign,
                        workshops: GraduationCap,
                        youth: Gamepad2,
                        children: Baby,
                        worship: Music,
                        study: Book,
                        leadership: Briefcase
                      };
                      return icons[category as keyof typeof icons] || Calendar;
                    };

                    const getCategoryColor = (category: string) => {
                      const colors = {
                        service: "destructive",
                        prayer: "secondary",
                        social: "outline",
                        fundraiser: "default",
                        workshops: "secondary",
                        youth: "outline",
                        children: "default",
                        worship: "secondary",
                        study: "outline",
                        leadership: "default"
                      };
                      return colors[category as keyof typeof colors] || "default";
                    };

                    const IconComponent = getCategoryIcon(event.category);
                    
                    return (
                      <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift group h-full">
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                <IconComponent className="w-6 h-6 text-accent" />
                              </div>
                              <Badge variant={getCategoryColor(event.category) as any} className="shrink-0">
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                              <div className="text-lg font-bold text-foreground">
                                {new Date(event.start_datetime).getDate()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{event.description}</p>
                            
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4 shrink-0" />
                                <span className="truncate">{new Date(event.start_datetime).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span className="truncate">{event.location_text}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="w-4 h-4 shrink-0" />
                                <span>{event.attending_count} attending</span>
                              </div>
                            </div>

                            {(event.volunteer_slots_total || 0) > 0 && (
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Volunteers</span>
                                  <span>{event.volunteer_slots_filled || 0}/{event.volunteer_slots_total}</span>
                                </div>
                                <Progress value={((event.volunteer_slots_filled || 0) / event.volunteer_slots_total) * 100} className="h-2" />
                                {((event.volunteer_slots_filled || 0) / event.volunteer_slots_total) * 100 < 100 && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {(event.volunteer_slots_total || 0) - (event.volunteer_slots_filled || 0)} more needed
                                  </p>
                                )}
                              </div>
                            )}

                            <Button className="w-full group mt-auto">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>

              {/* Events Pagination */}
              {Math.ceil(upcomingEvents.length / itemsPerPage) > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.ceil(upcomingEvents.length / itemsPerPage) }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(upcomingEvents.length / itemsPerPage), prev + 1))}
                        className={currentPage === Math.ceil(upcomingEvents.length / itemsPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
             </div>
           )}

            {/* Giving Tab */}
            {activeTab === "giving" && (
              <div className="space-y-8">
                <div className="text-center space-y-4 py-12 mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Items Shared with Love</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Household goods and resources generously shared in fellowship.
                  </p>
                </div>


                {/* Items Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {giveawayItems
                     .slice((givingPage - 1) * givingPerPage, givingPage * givingPerPage)
                    .map((item) => (
                      <Card key={item.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group overflow-hidden">
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge 
                              variant="default" 
                              className="bg-accent text-accent-foreground"
                            >
                              {item.category}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-border/10">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {item.timePosted}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="text-sm text-muted-foreground">
                              <div>Given by {item.postedBy}</div>
                              <div className="text-xs font-medium text-accent">Received by {item.receivedBy}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Pagination */}
                {Math.ceil(giveawayItems.length / givingPerPage) > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setGivingPage(Math.max(1, givingPage - 1))}
                            className={givingPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.ceil(giveawayItems.length / givingPerPage) }, (_, i) => i + 1).map(page => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setGivingPage(page)}
                              isActive={page === givingPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setGivingPage(Math.min(Math.ceil(giveawayItems.length / givingPerPage), givingPage + 1))}
                            className={givingPage === Math.ceil(giveawayItems.length / givingPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                     </PaginationContent>
                   </Pagination>
                 </div>
               )}
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }