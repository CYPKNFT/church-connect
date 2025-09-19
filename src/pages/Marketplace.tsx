import { useState } from "react";
import { Plus, Search, Filter, Heart, Clock, Eye, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    title: "Dining Table Set",
    description: "Beautiful wooden dining table with 6 chairs. Perfect for family dinners and gatherings.",
    category: "Furniture",
    status: "Available",
    postedDate: "2 days ago",
    image: null,
    views: 23,
    location: "North Campus"
  },
  {
    id: 2,
    title: "Children's Books Collection",
    description: "Collection of 20+ children's books in excellent condition. Ages 3-8.",
    category: "Books",
    status: "Available", 
    postedDate: "1 week ago",
    image: null,
    views: 15,
    location: "Main Campus"
  },
  {
    id: 3,
    title: "Kitchen Appliances",
    description: "Gently used microwave, toaster, and coffee maker. All in working condition.",
    category: "Electronics",
    status: "Claimed",
    postedDate: "3 days ago",
    image: null,
    views: 41,
    location: "South Campus"
  },
  {
    id: 4,
    title: "Baby Clothes & Accessories",
    description: "Various baby clothes (6-12 months), toys, and accessories. Clean and well-maintained.",
    category: "Baby/Kids",
    status: "Available",
    postedDate: "5 days ago", 
    image: null,
    views: 32,
    location: "East Campus"
  }
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("any");
  const [timeFilter, setTimeFilter] = useState("anytime");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "",
    contactPreferences: "in_app"
  });

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePostItem = () => {
    console.log("Posting new item:", newItem);
    setIsPostModalOpen(false);
    setNewItem({ title: "", description: "", category: "", contactPreferences: "in_app" });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setLocationFilter("any");
    setTimeFilter("anytime");
  };

  return (
    <CollapsibleSidebar>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
                <p className="text-muted-foreground text-lg">Share and discover items within your church community</p>
              </div>
              <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Post New Item</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Item Title</Label>
                      <Input
                        id="title"
                        value={newItem.title}
                        onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter item title..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your item..."
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Household">Household</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Baby/Kids">Baby/Kids</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                          <SelectItem value="Garden">Garden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Photo Upload</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <div className="text-muted-foreground">
                          <Plus className="w-8 h-8 mx-auto mb-2" />
                          <p>Drag and drop photos here or click to browse</p>
                          <p className="text-sm">Maximum 5 photos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePostItem} className="bg-primary hover:bg-primary/90">
                      Post Item
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="container mx-auto px-6 py-6">
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium mb-2 block">Search Items</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-auto w-full">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Household">Household</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Baby/Kids">Baby/Kids</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Garden">Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Location</SelectItem>
                      <SelectItem value="main">Main Campus</SelectItem>
                      <SelectItem value="north">North Campus</SelectItem>
                      <SelectItem value="south">South Campus</SelectItem>
                      <SelectItem value="east">East Campus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Posted</Label>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anytime">Anytime</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" onClick={handleClearFilters} className="lg:w-auto w-full">
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">No image</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                    <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.postedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full"
                    variant={item.status === "Available" ? "default" : "secondary"}
                    disabled={item.status !== "Available"}
                  >
                    {item.status === "Available" ? (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        I Want This
                      </>
                    ) : (
                      "Not Available"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </CollapsibleSidebar>
  );
}