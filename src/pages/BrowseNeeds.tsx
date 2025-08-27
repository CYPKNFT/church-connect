import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NeedCard } from "@/components/NeedCard";
import { Search, Filter, Heart } from "lucide-react";

// Enhanced mock data with more realistic and compelling needs
const mockNeeds = [
  {
    id: "1",
    title: "Weekly grocery assistance for elderly neighbor",
    description: "Mrs. Johnson, 85, has been a faithful church member for 40 years. After a recent fall, she's having difficulty getting to the grocery store. She needs someone to help with weekly shopping - just basic essentials like milk, bread, and fresh produce. She's very organized with her list and always has her payment ready. This is a wonderful opportunity to bless someone who has served our church family for decades.",
    category: "Groceries",
    urgency: "This Week" as const,
    location: "Downtown area, 2 miles from church",
    estimatedTime: "1-2 hours",
    postedBy: "Sarah Miller",
    postedAt: "2 days ago"
  },
  {
    id: "2", 
    title: "Emergency plumbing repair for single mom",
    description: "Jennifer is a single mother of two young children, working two jobs to make ends meet. Her kitchen faucet is leaking badly and has started causing water damage to the cabinet below. She can't afford a professional plumber right now and is worried about the damage getting worse. Any handyman skills would be incredibly appreciated - this is urgent to prevent further damage to her home.",
    category: "Home Repair",
    urgency: "Immediate" as const,
    location: "Maple Street neighborhood",
    estimatedTime: "1-2 hours",
    postedBy: "Jennifer Davis",
    postedAt: "1 day ago"
  },
  {
    id: "3",
    title: "Meal train coordination for new baby blessing",
    description: "The Johnson family just welcomed their third child - a beautiful baby girl! Mom had a C-section and dad is trying to balance work with helping at home. We're organizing a meal train to provide dinners for the next two weeks. Looking for volunteers to prepare and deliver meals (any day between 5-7 PM works). This is such a special time to show God's love through practical care.",
    category: "Meals",
    urgency: "This Week" as const,
    location: "Oakwood subdivision", 
    estimatedTime: "30 minutes delivery",
    postedBy: "Linda Chen",
    postedAt: "3 days ago"
  },
  {
    id: "4",
    title: "Transportation to critical medical appointment",
    description: "Robert needs a ride to his oncologist appointment next Tuesday at 2 PM for cancer treatment follow-up. His car broke down and this appointment is crucial for his ongoing treatment plan. The medical center is about 20 minutes away, and the appointment usually takes about an hour. Robert is a Vietnam veteran and longtime church member who would be so grateful for this help during a difficult time.",
    category: "Transportation",
    urgency: "This Week" as const,
    location: "Pick up from Elm Street",
    estimatedTime: "2-3 hours total",
    postedBy: "Robert Thompson",
    postedAt: "1 day ago"
  },
  {
    id: "5",
    title: "Yard cleanup after storm damage",
    description: "The recent storms knocked down several large branches in our elderly neighbor's yard. Mr. Peterson, 78, can't handle the cleanup himself and is worried about the branches blocking his driveway. Looking for a few people with trucks to help haul away the debris. He has all the tools needed - just need strong backs and willing hearts! Great opportunity for youth group or men's ministry.",
    category: "Home & Garden",
    urgency: "Flexible" as const,
    location: "Pine Ridge community",
    estimatedTime: "2-3 hours",
    postedBy: "Mike Williams",
    postedAt: "4 days ago"
  },
  {
    id: "6",
    title: "Childcare for medical appointments",
    description: "Amanda needs someone to watch her 3-year-old son while she attends physical therapy appointments twice a week (Tuesdays and Thursdays, 10 AM - 12 PM). She's recovering from a car accident and these appointments are essential for her recovery. Her son is well-behaved and loves to read books and play with toys. This ongoing help would mean the world to a young mom working hard to get back on her feet.",
    category: "Childcare",
    urgency: "This Week" as const,
    location: "Westside neighborhood",
    estimatedTime: "2 hours, twice weekly",
    postedBy: "Amanda Rodriguez",
    postedAt: "5 days ago"
  }
];

const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Childcare", "Home & Garden", "Prayer Support", "Other"];
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
      {/* Hero Section */}
      <section className="bg-warm-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <Heart className="w-16 h-16 text-accent mx-auto mb-8" />
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Make a Difference?
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
              Every volunteer makes a lasting impact. Your willingness to serve changes lives and strengthens our entire community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-lg px-8 py-6">
                View More Opportunities
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-white/20 text-white hover:bg-white/10">
                Learn About Volunteering
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl p-12 mb-16 shadow-card animate-slide-up -mt-12 relative z-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Your Perfect Service Opportunity</h2>
            <p className="text-xl text-muted-foreground">Use filters to find needs that match your availability and skills</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="search" className="text-lg font-semibold mb-3 block">Search Needs</Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="search"
                  placeholder="Search by keywords, location, or type of help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg bg-muted/50 border-2 focus:border-accent"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-lg font-semibold mb-3 block">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 text-lg bg-muted/50 border-2">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-lg">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-3 block">Urgency</Label>
              <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <SelectTrigger className="h-12 text-lg bg-muted/50 border-2">
                  <SelectValue placeholder="All Urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map(urgency => (
                    <SelectItem key={urgency} value={urgency} className="text-lg">
                      {urgency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleSearch} size="lg" className="mt-8 w-full md:w-auto bg-accent hover:bg-accent-hover">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </Button>
        </div>

        {/* Results Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Available Opportunities</h2>
              <p className="text-lg text-muted-foreground">
                Found {filteredNeeds.length} way{filteredNeeds.length !== 1 ? 's' : ''} to serve your community
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNeeds.map(need => (
              <NeedCard
                key={need.id}
                {...need}
                onVolunteer={handleVolunteer}
              />
            ))}
          </div>
        </section>

        {filteredNeeds.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-card">
            <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              No opportunities match your search
            </h3>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Try adjusting your search criteria or clearing the filters to discover more ways to serve your community.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent-hover" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedUrgency("All");
              setFilteredNeeds(mockNeeds);
            }}>
              <Filter className="w-5 h-5 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}