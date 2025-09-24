import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Package, Gift, Calendar, User, X } from "lucide-react";
import { toast } from "sonner";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";

export default function Received() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const itemsReceived = [
    {
      id: 1,
      title: "Children's Books Collection",
      description: "Over 50 picture books and early readers",
      previousOwner: "Sarah Johnson",
      pickupDate: "2024-01-15",
      category: "Books",
      image: sofaImage
    },
    {
      id: 2,
      title: "Baby Clothes",
      description: "0-12 months clothing bundle",
      previousOwner: "Michael Chen",
      pickupDate: "2024-01-10",
      category: "Baby/Kids",
      image: laptopImage
    }
  ];

  const handleSendThankYou = (owner: string) => {
    toast.success(`Thank you message sent to ${owner}`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Items I've Received</h1>
            <p className="text-muted-foreground">Items you've received from fellow community members</p>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items I've Received</h2>
            
            {itemsReceived.length > 0 ? (
              <div className="space-y-4">
                {itemsReceived.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Item Thumbnail */}
                        <div 
                          className="w-full md:w-32 h-24 bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(item.image)}
                        >
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              From: {item.previousOwner}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Received: {new Date(item.pickupDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="md:w-auto w-full">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendThankYou(item.previousOwner)}
                            className="flex items-center gap-2"
                          >
                            <Heart className="w-4 h-4" />
                            Send Thank You
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No items received yet</h3>
                  <p className="text-muted-foreground">
                    Browse the marketplace to find items you need from fellow church members.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Image Lightbox */}
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Item preview"
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
}