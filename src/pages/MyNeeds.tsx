import React, { useMemo, useState } from "react";
import { TwoLevelNav } from "@/components/TwoLevelNav";
import { Heart, Search, Plus, MapPin, Timer, Eye, Users, MessageSquare, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function MyNeeds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");

  const userNeeds = [
    {
      id: "1",
      title: "Weekly grocery shopping assistance",
      description: "Need someone to help with grocery shopping every Tuesday morning. I have mobility issues and would appreciate the help with carrying bags and reaching items on high shelves.",
      status: "Active",
      volunteers: 5,
      posted: "2 days ago",
      category: "Groceries",
      urgency: "This Week",
      location: "Downtown Market District",
      estimatedTime: "2 hours",
      responses: 12,
      views: 45,
      lastUpdated: "Yesterday"
    },
    {
      id: "2", 
      title: "Garden cleanup and maintenance",
      description: "Looking for help with seasonal garden cleanup, pruning, and planting new flowers. My back issues prevent me from doing heavy lifting and bending.",
      status: "In Progress",
      volunteers: 2,
      posted: "5 days ago",
      category: "Home & Garden",
      urgency: "Flexible",
      location: "Maple Street",
      estimatedTime: "3-4 hours",
      responses: 8,
      views: 32,
      lastUpdated: "2 days ago"
    },
    {
      id: "3",
      title: "Pet sitting for weekend trip",
      description: "Need someone to watch my cat Whiskers while I visit family this weekend. Just needs feeding twice a day and some company.",
      status: "Fulfilled",
      volunteers: 1,
      posted: "1 week ago",
      category: "Pet Care",
      urgency: "Immediate",
      location: "Oak Avenue",
      estimatedTime: "2 days",
      responses: 15,
      views: 78,
      lastUpdated: "3 days ago"
    },
    {
      id: "4",
      title: "Technology help setting up new tablet",
      description: "Recently got a tablet for staying in touch with family but need help setting up apps and learning how to use video calls.",
      status: "Active",
      volunteers: 0,
      posted: "3 days ago",
      category: "Technology",
      urgency: "This Week",
      location: "Senior Living Center",
      estimatedTime: "1-2 hours",
      responses: 3,
      views: 18,
      lastUpdated: "Today"
    },
    {
      id: "5",
      title: "Transportation to medical appointments",
      description: "Need reliable transportation to weekly physical therapy sessions. My car is in the shop for repairs.",
      status: "Active",
      volunteers: 2,
      posted: "4 days ago",
      category: "Transportation",
      urgency: "Immediate",
      location: "Central Medical Center",
      estimatedTime: "3 hours",
      responses: 7,
      views: 29,
      lastUpdated: "Yesterday"
    },
    {
      id: "6",
      title: "Moving help for apartment relocation",
      description: "Moving to a smaller apartment next month and need help packing and loading boxes. Mostly books and household items.",
      status: "Completed",
      volunteers: 4,
      posted: "2 weeks ago",
      category: "Moving",
      urgency: "Flexible",
      location: "Pine Street",
      estimatedTime: "6 hours",
      responses: 20,
      views: 95,
      lastUpdated: "1 week ago"
    }
  ];

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "scheduled", label: "Scheduled" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" }
  ];

  const impact = useMemo(() => {
    const active = userNeeds.filter(need => need.status === "Active").length;
    const fulfilled = userNeeds.filter(need => need.status === "Fulfilled").length;
    const totalViews = userNeeds.reduce((sum, need) => sum + need.views, 0);
    return { active, fulfilled, totalViews, total: userNeeds.length };
  }, [userNeeds]);

  const filtered = useMemo(() => {
    let result = userNeeds;
    
    if (tab === "pending") result = result.filter(need => need.status === "Pending");
    if (tab === "scheduled") result = result.filter(need => need.status === "Scheduled");
    if (tab === "active") result = result.filter(need => need.status === "Active" || need.status === "In Progress");
    if (tab === "completed") result = result.filter(need => need.status === "Completed" || need.status === "Fulfilled");
    
    if (query) {
      result = result.filter(need => 
        need.title.toLowerCase().includes(query.toLowerCase()) ||
        need.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  }, [userNeeds, tab, query]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-accent";
      case "In Progress": return "text-accent";
      case "Fulfilled": return "text-accent";
      case "Completed": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const NeedCard = ({ need }: { need: typeof userNeeds[0] }) => {
    return (
      <div className="rounded-2xl border border-border bg-card/60 p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/needs_details/${need.id}`)}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">{need.title}</h3>
              <span className={`rounded-lg bg-muted px-2 py-1 text-sm font-medium ${getStatusColor(need.status)}`}>
                {need.status}
              </span>
            </div>
            <p className="text-muted-foreground mb-3">{need.description}</p>
            
            {/* Stats */}
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {need.location}
              </span>
              <span className="flex items-center gap-1">
                <Timer className="h-4 w-4" />
                {need.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {need.views} views
              </span>
              <span className="flex items-center gap-1">
                🕐 {need.posted}
              </span>
            </div>

            {/* Additional Stats */}
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-foreground font-medium">
                <Users className="w-4 h-4" />
                {need.volunteers} volunteers
              </span>
              <span className="flex items-center gap-2 text-foreground font-medium">
                <MessageSquare className="w-4 h-4" />
                {need.responses} responses
              </span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    );
  };

  return (
    <TwoLevelNav activeMenuId="serving" activeSubItemPath="/my-needs">
      <div className="min-h-screen w-full bg-background p-6 text-foreground">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Needs</h1>
              <p className="text-muted-foreground">Community support • Manage your posted requests</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <span className="text-accent">📋</span>
              <span className="text-sm text-muted-foreground">Total Posted: {impact.total}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Active: {impact.active}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Fulfilled: {impact.fulfilled}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card p-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    tab === t.key ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search my needs…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button
                onClick={() => navigate("/post")}
                className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
              >
                + Post New Need
              </button>
            </div>
          </div>

          {/* List */}
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card/60 p-10 text-center text-muted-foreground">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No needs found</h3>
                <p className="text-muted-foreground mb-6">
                  {query || tab !== "all" 
                    ? "Try adjusting your filters or search terms"
                    : "You haven't posted any needs yet. Get started by posting your first need!"
                  }
                </p>
                <button
                  onClick={() => navigate("/post")}
                  className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
                >
                  <Plus className="w-4 h-4 mr-2 inline" />
                  Post Your First Need
                </button>
              </div>
            ) : (
              filtered.map((need) => (
                <NeedCard key={need.id} need={need} />
              ))
            )}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Keep communications safe and within the platform. Meet in public church spaces for exchanges.
          </p>
        </div>
      </div>
    </TwoLevelNav>
  );
}
