import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NeedCard } from "@/components/NeedCard";
import { Search, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Community Needs
          </h1>
          <p className="text-lg text-muted-foreground">
            Find ways to serve and bless others in our church family
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-gentle">
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
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No needs match your current filters.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedUrgency("All");
              setFilteredNeeds(mockNeeds);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}