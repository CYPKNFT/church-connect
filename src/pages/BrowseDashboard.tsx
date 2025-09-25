import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { Heart, Clock, Users, Plus, Search, Filter, MapPin, Timer, MessageSquare, ChevronRight, HandHeart, Target, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function BrowseDashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [churchName, setChurchName] = useState("Grace Community Church");
  const itemsPerPage = 6;

  // Church-specific needs data
  const churchNeeds = [
    {
      id: "1",
      title: "Weekly grocery assistance for Mrs. Johnson",
      description: "Mrs. Johnson, 85, has been a faithful church member for 40 years. After a recent fall, she's having difficulty getting to the grocery store.",
      category: "Groceries",
      urgency: "This Week" as "Immediate" | "This Week" | "Flexible",
      location: "Downtown area, 2 miles from church",
      estimatedTime: "1-2 hours",
      postedBy: "Sarah Miller",
      postedAt: "2 days ago"
    },
    {
      id: "2", 
      title: "Transportation to medical center",
      description: "Brother Robert needs reliable transportation for his cancer treatment appointments.",
      category: "Transportation",
      urgency: "Immediate" as "Immediate" | "This Week" | "Flexible",
      location: "Medical District",
      estimatedTime: "2-3 hours total",
      postedBy: "Robert Thompson",
      postedAt: "4 hours ago"
    }
  ];

  const categories = ["All", "Groceries", "Home Repair", "Meals", "Transportation", "Childcare", "Home & Garden", "Prayer Support", "Other"];
  const urgencyLevels = ["All", "Immediate", "This Week", "Flexible"];

  const [filteredNeeds, setFilteredNeeds] = useState(churchNeeds);

  // Auto-search when filters change
  const handleSearch = () => {
    let filtered = churchNeeds;

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
    setCurrentPage(1);
  };

  const handleVolunteer = (needId: string) => {
    alert(`Thanks for volunteering to help with need ${needId}!`);
  };

  return (
    <DashboardLayout>
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
              <span className="text-sm text-muted-foreground">Active: {filteredNeeds.length}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Urgent: {filteredNeeds.filter(need => need.urgency === "Immediate").length}</span>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNeeds.map((need) => (
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
                  setFilteredNeeds(churchNeeds);
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
    </DashboardLayout>
  );
}