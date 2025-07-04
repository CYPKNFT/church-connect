import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NeedCard } from "@/components/NeedCard";
import { Search, Filter, Heart } from "lucide-react";

// Mock data for demonstration
const mockNeeds = [
  {
    id: "1",
    title: "Need groceries for elderly neighbor",
    description: "Mrs. Johnson needs help with weekly grocery shopping. She's 85 and has difficulty getting around. Looking for someone who could pick up essentials from the local grocery store.",
    category: "Groceries",
    urgency: "This Week" as const,
    location: "Downtown area, 2 miles from church",
    estimatedTime: "1-2 hours",
    postedBy: "Sarah Miller",
    postedAt: "2 days ago"
  },
  {
    id: "2", 
    title: "Home repair: Fix leaky faucet",
    description: "Single mom needs help fixing a leaky kitchen faucet. Water damage is getting worse and I can't afford a plumber right now. Would appreciate any handyman skills!",
    category: "Home Repair",
    urgency: "Immediate" as const,
    location: "Maple Street neighborhood",
    estimatedTime: "1 hour",
    postedBy: "Jennifer Davis",
    postedAt: "1 day ago"
  },
  {
    id: "3",
    title: "Meal train for new baby",
    description: "The Johnson family just welcomed their third child! Looking to organize meal deliveries for the next two weeks to help them adjust to their new blessing.",
    category: "Meals",
    urgency: "Flexible" as const,
    location: "Oakwood subdivision", 
    estimatedTime: "30 minutes",
    postedBy: "Linda Chen",
    postedAt: "3 days ago"
  },
  {
    id: "4",
    title: "Transportation to medical appointment",
    description: "Need a ride to my doctor's appointment next Tuesday at 2 PM. My car is in the shop and this is an important follow-up visit I can't miss.",
    category: "Transportation",
    urgency: "This Week" as const,
    location: "Pick up from Elm Street",
    estimatedTime: "2 hours",
    postedBy: "Robert Thompson",
    postedAt: "1 day ago"
  }
];

const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Prayer Support", "Other"];
const urgencyLevels = ["All", "Immediate", "This Week", "Flexible"];

export default function BrowseNeeds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [filteredNeeds, setFilteredNeeds] = useState(mockNeeds);

  const handleVolunteer = (needId: string) => {
    alert(`Thanks for volunteering to help with need ${needId}! In a real app, this would open a communication interface.`);
  };

  const handleSearch = () => {
    let filtered = mockNeeds;

    if (searchQuery) {
      filtered = filtered.filter(need => 
        need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        need.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(need => need.category === selectedCategory);
    }

    if (selectedUrgency !== "All") {
      filtered = filtered.filter(need => need.urgency === selectedUrgency);
    }

    setFilteredNeeds(filtered);
  };

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Make a Difference</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Community Needs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find ways to serve and bless others in our church family
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white border-0 rounded-2xl p-8 mb-12 shadow-card animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search needs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map(urgency => (
                  <SelectItem key={urgency} value={urgency}>
                    {urgency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSearch} className="mt-4 w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeeds.map(need => (
            <NeedCard
              key={need.id}
              {...need}
              onVolunteer={handleVolunteer}
            />
          ))}
        </div>

        {filteredNeeds.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-card">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              No needs match your current filters
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or clearing the filters to see more opportunities to help.
            </p>
            <Button className="bg-accent hover:bg-accent-hover" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedUrgency("All");
              setFilteredNeeds(mockNeeds);
            }}>
              <Filter className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}