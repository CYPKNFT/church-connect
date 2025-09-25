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

  // Auto-search when filters change
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
    <div className="min-h-screen w-full bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Service Opportunities</h1>
            <p className="text-muted-foreground">Community service • Make a difference in your community</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
            <span className="text-accent">🤝</span>
            <span className="text-sm text-muted-foreground">Available: {filteredNeeds.length}</span>
            <span className="text-border">•</span>
            <span className="text-sm text-muted-foreground">Total: {mockNeeds.length}</span>
          </div>
        </div>

        {/* Compact Search & Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side - Category Filter */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    handleSearch();
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Urgency Filter */}
            <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card p-1">
              {urgencyLevels.map((urgency) => (
                <button
                  key={urgency}
                  onClick={() => {
                    setSelectedUrgency(urgency);
                    handleSearch();
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    selectedUrgency === urgency ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {urgency === "All" ? "Any Urgency" : urgency}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Search */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search opportunities…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch();
                }}
                className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <p className="mb-4 text-sm text-muted-foreground">
          Found {filteredNeeds.length} opportunity{filteredNeeds.length !== 1 ? 's' : ''} to serve your community
        </p>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNeeds.map(need => (
            <NeedCard
              key={need.id}
              {...need}
              onVolunteer={handleVolunteer}
            />
          ))}
        </div>

        {filteredNeeds.length === 0 && (
          <div className="rounded-2xl border border-border bg-card/60 p-10 text-center text-muted-foreground">
            <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No opportunities match your search
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try adjusting your search criteria or clearing the filters to discover more ways to serve your community.
            </p>
            <button 
              className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedUrgency("All");
                setFilteredNeeds(mockNeeds);
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Every volunteer makes a lasting impact. Your willingness to serve changes lives and strengthens our community.
        </p>
      </div>
    </div>
  );
}