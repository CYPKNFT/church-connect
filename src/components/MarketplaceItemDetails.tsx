import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Posted {item.postedDate}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Riverside Community
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {item.owner} • Verified Giver
                </div>
              </div>
            </div>
            <Badge variant={item.status === "Available" ? "secondary" : "outline"} className="bg-orange-500 text-white border-none">
              {item.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Item Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">Item Details</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Description:</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">CONDITION</p>
                          <p className="font-medium">{item.condition || "Good - Minor wear"}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">DIMENSIONS</p>
                          <p className="font-medium">{item.dimensions || "6ft x 3ft table"}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
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

                    <div>
                      <p className="font-medium mb-2">What's Included:</p>
                      <p className="text-muted-foreground">{item.whatsIncluded || "Table, 6 chairs, table pads for protection"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements & Pickup */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold">Requirements & Pickup</h3>
                  </div>
                  
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
                <Card className="border-primary/20 bg-primary/5">
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
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">Item Stats</h3>
                  </div>
                  
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
              <Card>
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
                        <textarea
                          value={requestMessage}
                          onChange={(e) => setRequestMessage(e.target.value)}
                          placeholder="Hi! I'm interested in this item because..."
                          className="w-full min-h-[100px] p-3 border rounded-lg resize-none"
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
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                  </div>
                  
                  <div className="space-y-3">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}