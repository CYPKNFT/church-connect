import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  Star,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Share2,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Users,
  MessageSquare,
  Package,
  Truck,
  Shield,
  Eye,
  Heart,
  Flag,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import RequestItemModal from "@/components/RequestItemModal";


// Import marketplace images for demo
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

interface MarketplaceItemDetails {
  id: string;
  title: string;
  description: string;
  condition: string;
  age: string;
  dimensions: string;
  material: string;
  whatsIncluded: string;
  requirements: string;
  whoCanApply: string;
  pickupLocation: string;
  availableTimes: string;
  category: string;
  status: "Available" | "Pending" | "Claimed";
  postedBy: string;
  postedAt: string;
  giver: {
    name: string;
    memberSince: string;
    rating: number;
    avatar?: string;
    isVerified: boolean;
  };
  images: string[];
  stats: {
    views: number;
    interested: number;
    applications: number;
    estimatedValue: number;
  };
  applicationProgress: {
    percentage: number;
    closesIn: string;
  };
  testimonial?: {
    text: string;
    author: string;
    memberSince: string;
  };
}

export default function MarketplaceItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<MarketplaceItemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [userInterestStatus, setUserInterestStatus] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      loadItemDetails(id);
    }
  }, [id]);

  const loadItemDetails = async (itemId: string) => {
    try {
      setLoading(true);
      
      // Mock data for demonstration - based on the dining table from the mockups
      const mockItem: MarketplaceItemDetails = {
        id: itemId,
        title: "Dining Table Set with 6 Chairs",
        description: "Beautiful wooden dining table with 6 matching chairs. Perfect for a growing family or someone setting up their first home. This table has hosted countless family dinners and holiday gatherings in our home. We're downsizing and would love to see it continue bringing families together. It's sturdy, beautiful, and has so much life left in it. Perfect for someone starting fresh or growing their family.",
        condition: "Good - Minor wear",
        age: "3 years old", 
        dimensions: "6ft x 3ft table",
        material: "Solid oak wood",
        whatsIncluded: "Table, 6 chairs, table pads for protection",
        requirements: "Brief application explaining your need",
        whoCanApply: "Families, individuals setting up homes, anyone in need",
        pickupLocation: "Riverside area, Jacksonville FL",
        availableTimes: "Saturdays & Sundays, 9AM - 4PM",
        category: "Furniture",
        status: "Available",
        postedBy: "Maria L.",
        postedAt: "4/15/2024 at 09:30 AM",
        giver: {
          name: "Maria L.",
          memberSince: "2018",
          rating: 4.8,
          isVerified: true
        },
        images: [sofaImage, laptopImage, babyChairImage],
        stats: {
          views: 23,
          interested: 8,
          applications: 3,
          estimatedValue: 800
        },
        applicationProgress: {
          percentage: 60,
          closesIn: "5 days"
        },
        testimonial: {
          text: "This table has hosted countless family dinners and holiday gatherings in our home. We're downsizing and would love to see it continue bringing families together. It's sturdy, beautiful, and has so much life left in it. Perfect for someone starting fresh or growing their family.",
          author: "Maria L.",
          memberSince: "2018"
        }
      };
      
      setItem(mockItem);
    } catch (error) {
      console.error("Error loading item details:", error);
      toast({
        title: "Error",
        description: "Failed to load item details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestItem = async () => {
    if (!item || !user) return;
    
    try {
      // In a real app, this would submit the request to the database
      setUserInterestStatus("requested");
      setIsRequestDialogOpen(false);
      setRequestMessage("");
      
      toast({
        title: "Request Submitted",
        description: "Your request has been sent to the giver. They'll review your application and get back to you soon."
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request",
        variant: "destructive"
      });
    }
  };

  const handleSaveToWatchlist = () => {
    toast({
      title: "Saved to Watchlist",
      description: "You'll be notified of any updates to this item."
    });
  };

  const handleContactGiver = () => {
    toast({
      title: "Contact Information",
      description: "The giver will be notified and can choose to share their contact details with you."
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Item link has been copied to your clipboard."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Item Not Found</h2>
          <p className="text-muted-foreground mb-4">The item you're looking for doesn't exist.</p>
          <Link to="/my-church?tab=giving">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="h-64 bg-gradient-primary relative">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl w-full">
              {/* Title and details */}
              <div className="flex items-center w-full">
                {/* Title and subtitle - left aligned */}
                <div className="flex-shrink-0">
                  {/* Back button and feature badge */}
                  <div className="flex items-center gap-4 mb-2">
                    <Link to="/my-church?tab=giving">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Marketplace
                      </Button>
                    </Link>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {item.status}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.title}</h1>
                  <div className="flex flex-wrap items-center gap-6 text-white/90 text-base">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Posted {item.postedAt}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {item.pickupLocation}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {item.giver.name} • Verified Giver
                    </div>
                  </div>
                </div>
                
                {/* Image panel - centered */}
                <div className="flex justify-center items-center ml-16">
                  <div 
                    className="w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden border-3 border-white/30 shadow-lg cursor-pointer relative group"
                    onClick={() => setIsImageLightboxOpen(true)}
                  >
                    <img 
                      src={item.images[currentImageIndex]} 
                      alt={`${item.title} - Image ${currentImageIndex + 1} of ${item.images.length}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {item.images.length > 1 && (
                      <div className="absolute bottom-1 right-1 flex gap-1">
                        {item.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              currentImageIndex === index ? "bg-white" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Item Details */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">CONDITION</h4>
                    <p className="text-foreground">{item.condition}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">AGE</h4>
                    <p className="text-foreground">{item.age}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">DIMENSIONS</h4>
                    <p className="text-foreground">{item.dimensions}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">WEIGHT</h4>
                    <p className="text-foreground">{item.material}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <p className="text-muted-foreground">{item.whatsIncluded}</p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements & Pickup */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Requirements & Pickup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Who Can Apply:</h4>
                    <p className="text-muted-foreground">{item.whoCanApply}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Brief application explaining your need</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Must arrange own pickup/transport</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Available weekends for pickup</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Item is for personal use (no resale)</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Help with loading appreciated</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div>
                      <span className="font-semibold">Pickup Location:</span> {item.pickupLocation}
                    </div>
                    <div>
                      <span className="font-semibold">Available Times:</span> {item.availableTimes}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Item Stats */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Item Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{item.stats.views}</div>
                    <div className="text-xs text-muted-foreground">VIEWS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{item.stats.interested}</div>
                    <div className="text-xs text-muted-foreground">INTERESTED</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{item.stats.applications}</div>
                    <div className="text-xs text-muted-foreground">APPLICATIONS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">${item.stats.estimatedValue}</div>
                    <div className="text-xs text-muted-foreground">EST. VALUE</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Application Progress</span>
                    <span>{item.applicationProgress.percentage}%</span>
                  </div>
                  <Progress value={item.applicationProgress.percentage} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Closes in {item.applicationProgress.closesIn}</p>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="text-sm text-muted-foreground mb-2">Your Interest Status:</div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={userInterestStatus === "requested"}
                    onClick={() => setIsRequestDialogOpen(true)}
                  >
                    {userInterestStatus === "requested" ? "Request Submitted" : "Request This Item"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={handleSaveToWatchlist}
                  >
                    Save to Watchlist
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-orange-500 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Quality item • {item.stats.applications} applications submitted</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Item
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* Giver Info */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Giver Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.giver.avatar} />
                    <AvatarFallback>{item.giver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{item.giver.name}</h4>
                      {item.giver.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Member since {item.giver.memberSince}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{item.giver.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Request Item Modal */}
      <RequestItemModal
        open={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
        item={{
          title: item.title,
          images: item.images
        }}
        onSubmit={handleRequestItem}
      />

      {/* Image Overlay Modal */}
      {isImageLightboxOpen && (
        <Dialog open={isImageLightboxOpen} onOpenChange={() => setIsImageLightboxOpen(false)}>
          <DialogContent className="max-w-4xl w-full p-0 [&>button]:hidden">
            <div className="relative">
              <button
                onClick={() => setIsImageLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={item.images[currentImageIndex]}
                  alt="Item preview"
                  className="w-full h-full object-cover"
                />
                
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : item.images.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < item.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {item.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
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
    </div>
  );
}