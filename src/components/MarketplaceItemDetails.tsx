import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Package, 
  Users, 
  DollarSign, 
  Heart, 
  MessageCircle, 
  Navigation, 
  Share,
  Flag,
  CheckCircle,
  Info
} from "lucide-react";

interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  postedDate: string;
  status: string;
  image: string;
  owner: string;
  condition?: string;
  age?: string;
  dimensions?: string;
  material?: string;
  whatsIncluded?: string;
  whoCanApply?: string;
  requirements?: string[];
  pickupLocation?: string;
  availableTimes?: string;
  testimonial?: {
    text: string;
    author: string;
    memberSince: string;
  };
  stats?: {
    views: number;
    interested: number;
    applications: number;
    estimatedValue: number;
    applicationProgress: number;
    closesIn: string;
  };
}

interface MarketplaceItemDetailsProps {
  item: MarketplaceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestItem: (itemTitle: string) => void;
}

export function MarketplaceItemDetails({ item, isOpen, onClose, onRequestItem }: MarketplaceItemDetailsProps) {
  const [userInterestStatus, setUserInterestStatus] = useState<'none' | 'interested' | 'applied'>('none');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  if (!item) return null;

  const handleRequestItem = () => {
    setShowRequestForm(true);
  };

  const handleSubmitRequest = () => {
    setUserInterestStatus('applied');
    setShowRequestForm(false);
    onRequestItem(item.title);
  };

  const handleSaveToWatchlist = () => {
    setUserInterestStatus('interested');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0">
        {/* Hero Header - Following EventDetails design */}
        <div className="relative overflow-hidden">
          <div className="h-48 bg-gradient-primary relative">
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="absolute inset-0 flex items-end pb-8">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl w-full">
                {/* Title and details */}
                <div className="flex items-center w-full">
                  {/* Title and subtitle - left aligned */}
                  <div className="flex-shrink-0">
                    {/* Back button and status badge */}
                    <div className="flex items-center gap-4 mb-2">
                      <button 
                        onClick={onClose}
                        className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-1 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Close
                      </button>
                      <Badge className="bg-orange-500 text-white border-none">
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-white/90 text-base">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Posted {item.postedDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Riverside Community
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {item.owner} • Verified Giver
                      </div>
                    </div>
                  </div>
                  
                  {/* Item image - right side */}
                  <div className="flex justify-center items-center ml-16">
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden border-3 border-white/30 shadow-lg bg-white/20 flex items-center justify-center">
                      <Package className="w-16 h-16 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Item Overview */}
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle>About This Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>

              {/* Item Details Card */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-orange-500" />
                    Item Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-1">CONDITION</p>
                        <p className="font-medium">{item.condition || "Good - Minor wear"}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-1">DIMENSIONS</p>
                        <p className="font-medium">{item.dimensions || "6ft x 3ft table"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-1">AGE</p>
                        <p className="font-medium">{item.age || "3 years old"}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-1">MATERIAL</p>
                        <p className="font-medium">{item.material || "Solid oak wood"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-medium mb-2">What's Included:</p>
                    <p className="text-muted-foreground">{item.whatsIncluded || "Table, 6 chairs, table pads for protection"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements & Pickup */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Requirements & Pickup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Who Can Apply:</p>
                      <p className="text-muted-foreground">{item.whoCanApply || "Families, individuals setting up homes, anyone in need"}</p>
                    </div>

                    <div>
                      <p className="font-medium mb-3">Requirements:</p>
                      <div className="space-y-2">
                        {(item.requirements || [
                          "Brief application explaining your need",
                          "Must arrange own pickup/transport", 
                          "Available weekends for pickup",
                          "Item is for personal use (no resale)",
                          "Help with loading appreciated"
                        ]).map((req, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div>
                        <p className="font-medium mb-1">Pickup Location:</p>
                        <p className="text-muted-foreground text-sm">{item.pickupLocation || "Riverside area, Jacksonville FL"}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Available Times:</p>
                        <p className="text-muted-foreground text-sm">{item.availableTimes || "Saturdays & Sundays, 9AM - 4PM"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              {item.testimonial && (
                <Card className="border-primary/20 bg-primary/5 border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="italic text-muted-foreground mb-3">
                      "{item.testimonial.text}"
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">— {item.testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{item.testimonial.memberSince}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Item Stats */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Item Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">23</p>
                      <p className="text-xs text-muted-foreground">VIEWS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">8</p>
                      <p className="text-xs text-muted-foreground">INTERESTED</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">3</p>
                      <p className="text-xs text-muted-foreground">APPLICATIONS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">$800</p>
                      <p className="text-xs text-muted-foreground">EST. VALUE</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Application Progress</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Closes in 5 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interest Status & Actions */}
              <Card className="border-0 shadow-card">
                <CardContent className="p-6 space-y-4">
                  {!showRequestForm ? (
                    <div>
                      <p className="font-medium mb-3">Your Interest Status:</p>
                      {userInterestStatus === 'none' && (
                        <Button 
                          onClick={handleRequestItem} 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          size="lg"
                        >
                          Request This Item
                        </Button>
                      )}
                      {userInterestStatus === 'interested' && (
                        <Button 
                          onClick={handleRequestItem} 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          size="lg"
                        >
                          Request This Item
                        </Button>
                      )}
                      {userInterestStatus === 'applied' && (
                        <Button disabled className="w-full" size="lg">
                          Application Submitted
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-3">Request This Item</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Tell the owner why you need this item and when you can pick it up.
                        </p>
                        <Textarea
                          value={requestMessage}
                          onChange={(e) => setRequestMessage(e.target.value)}
                          placeholder="Hi! I'm interested in this item because..."
                          className="min-h-[100px] resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleSubmitRequest}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Send Request
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowRequestForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleSaveToWatchlist}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save to Watchlist
                  </Button>

                  {userInterestStatus === 'applied' && (
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Quality item</span>
                      </div>
                      <p className="text-xs text-orange-600">3 applications submitted</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Giver
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Pickup Directions
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Share className="w-4 h-4 mr-2" />
                    Share Item
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Flag className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}