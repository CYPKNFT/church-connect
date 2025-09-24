import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Search, Heart, Package, TrendingUp, Users, Upload, Camera, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedTimePosted, setSelectedTimePosted] = useState("any");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedItemImages, setSelectedItemImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "household",
    contactPreference: "in_app"
  });

  // Mock data for demonstration with images
  const mockItems = [
    {
      id: 1,
      title: "Dining Table Set",
      description: "Beautiful wooden dining table with 6 chairs. Great condition, no longer needed after downsizing.",
      category: "Furniture",
      postedDate: "2 days ago",
      status: "Available",
      images: [sofaImage, babyChairImage, dishesImage],
      owner: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Children's Books Collection",
      description: "Over 50 picture books and early readers. Perfect for young families!",
      category: "Books",
      postedDate: "1 week ago", 
      status: "Available",
      images: [booksToys, clothesImage, laptopImage],
      owner: "Michael Chen"
    },
    {
      id: 3,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker. All in working condition.",
      category: "Electronics",
      postedDate: "3 days ago",
      status: "Claimed",
      images: [dishesImage, laptopImage, babyChairImage],
      owner: "Emma Davis"
    }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostItem = () => {
    if (!newItem.title || !newItem.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Item posted successfully! It will be reviewed and published soon.");
    setIsPostModalOpen(false);
    setNewItem({
      title: "",
      description: "",
      category: "household",
      contactPreference: "in_app"
    });
  };

  const handleWantItem = (itemTitle: string) => {
    toast.success(`You've expressed interest in "${itemTitle}". The owner will be notified.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
                  <p className="text-muted-foreground mt-2">Share and discover items within your church community</p>
                </div>
                
                <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Post New Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Post New Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Photo Upload */}
                      <div className="space-y-2">
                        <Label>Item Photo</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                          <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Item Title *</Label>
                        <Input
                          id="title"
                          value={newItem.title}
                          onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                          placeholder="What are you giving away?"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={newItem.description}
                          onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                          placeholder="Describe the item's condition, size, and any other relevant details..."
                          rows={3}
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="household">Household</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="baby">Baby/Kids</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="garden">Garden</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Contact Preference */}
                      <div className="space-y-2">
                        <Label>Contact Preference</Label>
                        <Select value={newItem.contactPreference} onValueChange={(value) => setNewItem({...newItem, contactPreference: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in_app">In-app messaging</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={handlePostItem} className="flex-1">Post Item</Button>
                        <Button variant="outline" onClick={() => setIsPostModalOpen(false)} className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="household">Household</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="baby">Baby/Kids</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="garden">Garden</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Any Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Location</SelectItem>
                      <SelectItem value="nearby">Nearby</SelectItem>
                      <SelectItem value="same_neighborhood">Same Neighborhood</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedTimePosted} onValueChange={setSelectedTimePosted}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Anytime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Anytime</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Counter */}
                <p className="text-sm text-slate-400">
                  Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Item Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    {/* Item Image */}
                    <div 
                      className="aspect-video bg-slate-700 rounded-lg mb-4 overflow-hidden cursor-pointer group relative"
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
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                          {item.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-slate-400 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{item.category}</span>
                        <span>{item.postedDate}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-slate-400">by {item.owner}</span>
                        {item.status === "Available" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleWantItem(item.title)}
                            className="flex items-center gap-1"
                          >
                            <Heart className="w-3 h-3" />
                            I Want This
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <h3 className="text-lg font-semibold mb-2 text-white">No items found</h3>
                  <p className="text-slate-400 mb-4">
                    Try adjusting your search terms or filters, or be the first to post an item!
                  </p>
                  <Button onClick={() => setIsPostModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post the First Item
                  </Button>
                </CardContent>
              </Card>
            )}

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

        {/* Sidebar */}
        <div className="w-80 bg-slate-900 p-6 space-y-6">
          {/* Community Impact */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Community Impact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">234</div>
                  <div className="text-sm text-slate-400">Items Shared</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-sm text-slate-400">Families Helped</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-sm text-slate-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() => setIsPostModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Post New Item
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-800">
                <Heart className="w-4 h-4 mr-2" />
                My Watchlist
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-800">
                <Package className="w-4 h-4 mr-2" />
                My Posted Items
              </Button>
            </div>
          </div>

          {/* Safety Guidelines */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Safety Guidelines</h2>
            <div className="space-y-2 text-sm text-slate-400">
              <div>• Meet in public church spaces</div>
              <div>• Verify item condition before pickup</div>
              <div>• Communicate through our platform</div>
              <div>• Report any concerning behavior</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}