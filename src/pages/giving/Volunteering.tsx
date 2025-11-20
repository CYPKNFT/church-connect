import React, { useMemo, useState } from "react";
import { HandHeart, Search, Calendar, MapPin, Timer, Users, MessageSquare, ChevronRight, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Volunteering() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");

  const userVolunteering = [
    {
      id: "1",
      title: "Transportation to medical appointment",
      requester: "Mrs. Eleanor Johnson",
      date: "Tomorrow 2:00 PM",
      status: "Confirmed",
      category: "Transportation",
      location: "Central Medical Center",
      estimatedTime: "2 hours",
      urgency: "Immediate",
      description: "Drive to routine cardiology checkup",
      posted: "3 days ago",
      rating: null,
      feedback: null,
      contactPhone: "(555) 123-4567"
    },
    {
      id: "2",
      title: "Meal preparation for new parents", 
      requester: "The Smith Family",
      date: "Friday 6:00 PM",
      status: "Pending",
      category: "Meals",
      location: "Riverside Neighborhood",
      estimatedTime: "1.5 hours",
      urgency: "This Week",
      description: "Prepare and deliver healthy meals for family with newborn",
      posted: "1 day ago",
      rating: null,
      feedback: null,
      contactPhone: "(555) 987-6543"
    },
    // ... more volunteering items
  ];

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "scheduled", label: "Scheduled" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" }
  ];

  const impact = useMemo(() => {
    const completed = userVolunteering.filter(v => v.status === "Completed").length;
    const upcoming = userVolunteering.filter(v => v.status === "Confirmed" || v.status === "Scheduled").length;
    return { completed, upcoming, total: userVolunteering.length };
  }, [userVolunteering]);

  const filtered = useMemo(() => {
    let result = userVolunteering;
    
    if (tab === "pending") result = result.filter(v => v.status === "Pending");
    if (tab === "scheduled") result = result.filter(v => v.status === "Scheduled");
    if (tab === "active") result = result.filter(v => v.status === "Active" || v.status === "Confirmed");
    if (tab === "completed") result = result.filter(v => v.status === "Completed");
    
    if (query) {
      result = result.filter(volunteer => 
        volunteer.title.toLowerCase().includes(query.toLowerCase()) ||
        volunteer.description.toLowerCase().includes(query.toLowerCase()) ||
        volunteer.requester.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  }, [userVolunteering, tab, query]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "text-accent";
      case "Pending": return "text-accent";
      case "Scheduled": return "text-accent";
      case "Completed": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "text-red-600";
      case "This Week": return "text-amber-600";
      case "Flexible": return "text-blue-600";
      default: return "text-muted-foreground";
    }
  };

  const VolunteerCard = ({ volunteer }: { volunteer: typeof userVolunteering[0] }) => {
    return (
      <div className="rounded-2xl border border-border bg-card/60 p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/volunteering/${volunteer.id}`)}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">{volunteer.title}</h3>
              <div className="flex gap-2">
                <span className={`rounded-lg bg-muted px-2 py-1 text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                  {volunteer.status}
                </span>
                <span className={`rounded-lg bg-muted px-2 py-1 text-sm font-medium ${getUrgencyColor(volunteer.urgency)}`}>
                  {volunteer.urgency}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-3">{volunteer.description}</p>
            
            {/* Stats */}
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {volunteer.requester}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {volunteer.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {volunteer.location}
              </span>
              <span className="flex items-center gap-1">
                <Timer className="h-4 w-4" />
                {volunteer.estimatedTime}
              </span>
            </div>

            {volunteer.status === "Completed" && volunteer.rating && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Completed with {volunteer.rating}★ rating</span>
                </div>
                {volunteer.feedback && (
                  <p className="text-emerald-700 text-sm italic">"{volunteer.feedback}"</p>
                )}
              </div>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen w-full bg-background p-6 text-foreground">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Volunteering</h1>
              <p className="text-muted-foreground">Community service • Track your impact and commitments</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <span className="text-accent">🤝</span>
              <span className="text-sm text-muted-foreground">Total: {impact.total}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Completed: {impact.completed}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Upcoming: {impact.upcoming}</span>
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
                  placeholder="Search my volunteering…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Link
                to="/browse"
                className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
              >
                + Find More Ways to Help
              </Link>
            </div>
          </div>

          {/* List */}
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card/60 p-10 text-center text-muted-foreground">
                <HandHeart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No volunteering activities found</h3>
                <p className="text-muted-foreground mb-6">
                  {query || tab !== "all" 
                    ? "Try adjusting your filters or search terms"
                    : "You haven't volunteered for anything yet. Start making a difference in your community!"
                  }
                </p>
                <Link
                  to="/browse"
                  className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover inline-flex items-center"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Ways to Help
                </Link>
              </div>
            ) : (
              filtered.map((volunteer) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))
            )}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Stay committed to your volunteer pledges. Communicate promptly if plans change.
          </p>
        </div>
      </div>
    </div>
  );
}