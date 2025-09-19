import { useState } from "react";
import { Search, Plus, Filter, MapPin, Clock, Package, Heart, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { useMembership } from "@/hooks/useMembership";

// Mock data
const mockItems = [
  {
    id: 1,
    title: "Family Dining Table",
    description: "Beautiful oak dining table that seats 6. Great condition, just moving to smaller home.",
    image: "/placeholder.svg",
    category: "Furniture",
    postedBy: "Sarah M.",
    postedDate: "2 days ago",
    status: "available",
    interested: 3,
    views: 24
  },
  {
    id: 2,
    title: "Children's Books Collection",
    description: "Over 50 children's books, ages 3-10. Educational and story books included.",
    image: "/placeholder.svg", 
    category: "Books",
    postedBy: "Michael R.",
    postedDate: "1 day ago",
    status: "available",
    interested: 7,
    views: 45
  },
  {
    id: 3,
    title: "Kitchen Appliances Set",
    description: "Blender, toaster, and coffee maker. All working perfectly, just upgraded kitchen.",
    image: "/placeholder.svg",
    category: "Electronics",
    postedBy: "Jennifer L.",
    postedDate: "3 days ago", 
    status: "claimed",
    interested: 12,
    views: 89
  },
  {
    id: 4,
    title: "Baby Clothes (6-12 months)",
    description: "Gently used baby clothes, mostly Carter's brand. Perfect for growing families.",
    image: "/placeholder.svg",
    category: "Clothing",
    postedBy: "David K.",
    postedDate: "5 days ago",
    status: "available",
    interested: 5,
    views: 34
  },
  {
    id: 5,
    title: "Garden Tools & Supplies",
    description: "Complete set of garden tools including shovel, rake, pruning shears, and plant pots.",
    image: "/placeholder.svg",
    category: "Garden",
    postedBy: "Mary S.",
    postedDate: "1 week ago",
    status: "available", 
    interested: 2,
    views: 18
  },
  {
    id: 6,
    title: "Office Desk & Chair",
    description: "Great for home office or student studying. Desk has drawers and chair is ergonomic.",
    image: "/placeholder.svg",
    category: "Furniture",
    postedBy: "Robert T.",
    postedDate: "4 days ago",
    status: "available",
    interested: 8,
    views: 56
  }
];

const categories = [
  "All Categories",
  "Furniture", 
  "Electronics",
  "Books",
  "Clothing",
  "Baby & Kids",
  "Garden",
  "Kitchen",
  "Toys",
  "Sports"
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDistance, setSelectedDistance] = useState("Any Distance");
  const [selectedDate, setSelectedDate] = useState("Anytime");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { displayName } = useMembership();

  const [postForm, setPostForm] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    contactPreference: "app"
  });

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedDistance("Any Distance");
    setSelectedDate("Anytime");
  };

  const handlePostSubmit = () => {
    console.log("Posting item:", postForm);
    setIsPostModalOpen(false);
    setPostForm({
      title: "",
      description: "",
      category: "",
      condition: "",
      contactPreference: "app"
    });
  };

  return (
    <CollapsibleSidebar>
      <div className="min-h-screen bg-background">
        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <nav className="text-sm text-muted-foreground mb-2">
                Giving &gt; Marketplace
              </nav>
              <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
              <p className="text-muted-foreground mt-1">
                Welcome, {displayName || "Member"}! Share and discover items within our church community
              </p>
            </div>
            
            <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Post New Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Image Upload */}
                  <div>
                    <Label>Item Photos</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop photos here, or click to select
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      value={postForm.title}
                      onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                      placeholder="e.g. Kitchen Table and Chairs"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={postForm.description}
                      onChange={(e) => setPostForm({...postForm, description: e.target.value})}
                      placeholder="Describe the item's condition, size, and any other details..."
                      rows={4}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <Label>Category</Label>
                    <Select value={postForm.category} onValueChange={(value) => setPostForm({...postForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Preference */}
                  <div>
                    <Label>Contact Preference</Label>
                    <Select value={postForm.contactPreference} onValueChange={(value) => setPostForm({...postForm, contactPreference: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="app">Through App Messages</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsPostModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePostSubmit}
                      className="flex-1"
                      disabled={!postForm.title.trim()}
                    >
                      Post Item
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content - 70% */}
            <div className="lg:col-span-3">
              {/* Search and Filters */}
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any Distance">Any Distance</SelectItem>
                      <SelectItem value="1 mile">Within 1 mile</SelectItem>
                      <SelectItem value="5 miles">Within 5 miles</SelectItem>
                      <SelectItem value="10 miles">Within 10 miles</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Anytime">Anytime</SelectItem>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="This Week">This Week</SelectItem>
                      <SelectItem value="This Month">This Month</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={clearFilters}>
                    <Filter className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground">
                  Showing {filteredItems.length} items
                </p>
              </div>

              {/* Item Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${item.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'}`}
                      >
                        {item.status === 'available' ? 'Available' : 'Claimed'}
                      </Badge>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.postedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.interested}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Posted by {item.postedBy}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="pt-2">
                      <Button 
                        className="w-full"
                        variant={item.status === 'available' ? 'default' : 'secondary'}
                        disabled={item.status !== 'available'}
                      >
                        {item.status === 'available' ? 'I Want This' : 'Already Claimed'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - 30% */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Your Stats</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Items Posted</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Items Given</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Items Received</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Community Rating</span>
                    <span className="font-medium">4.9 ⭐</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Quick Actions</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsPostModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Item
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    My Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Community Impact</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Items Shared This Month</span>
                      <span>127</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                      Active Community Members: <span className="font-medium">89</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSidebar>
  );
}