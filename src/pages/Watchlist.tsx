import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Package, MessageCircle, Trash2, User, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { toast } from "sonner";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

export default function Watchlist() {
  const [selectedItemImages, setSelectedItemImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const watchlistItems = [
    {
      id: 1,
      title: "Office Desk",
      description: "Wooden desk with drawers",
      owner: "Emma Davis",
      status: "Available",
      postedDate: "1 day ago",
      category: "Furniture",
      images: [sofaImage, dishesImage, clothesImage]
    },
    {
      id: 2,
      title: "Exercise Equipment",
      description: "Treadmill in good condition",
      owner: "John Smith",
      status: "Pending",
      postedDate: "3 days ago",
      category: "Fitness",
      images: [laptopImage, babyChairImage, booksToys]
    }
  ];

  const handleRemoveFromWatchlist = (itemTitle: string) => {
    toast.success(`"${itemTitle}" removed from watchlist`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Watchlist</h1>
            <p className="text-muted-foreground">Sharing in fellowship</p>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items I'm Watching</h2>
            
            {watchlistItems.length > 0 ? (
              <div className="space-y-4">
                {watchlistItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Item Thumbnail */}
                        <div 
                          className="w-full md:w-32 h-24 bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity group relative"
                          onClick={() => {
                            setSelectedItemImages(item.images);
                            setCurrentImageIndex(0);
                          }}
                        >
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              Owner: {item.owner}
                            </span>
                            <span>{item.postedDate}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 md:w-auto w-full">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Contact Owner
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveFromWatchlist(item.title)}
                            className="flex items-center gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
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
                  <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No items in watchlist</h3>
                  <p className="text-muted-foreground">
                    Express interest in items from the marketplace to track them here.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Image Overlay Modal */}
          {selectedItemImages.length > 0 && (
            <Dialog open={selectedItemImages.length > 0} onOpenChange={() => setSelectedItemImages([])}>
              <DialogContent className="max-w-4xl w-full p-0">
                <div className="relative">
                  <button
                    onClick={() => setSelectedItemImages([])}
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
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev < selectedItemImages.length - 1 ? prev + 1 : 0)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedItemImages.map((_, index) => (
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
      </div>
    </DashboardLayout>
  );
}