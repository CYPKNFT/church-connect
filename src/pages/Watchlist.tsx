import React, { useMemo, useState } from "react";
import { TwoLevelNav } from "@/components/TwoLevelNav";
import { Heart, Package, MessageCircle, Trash2, User, X, ChevronLeft, ChevronRight, Eye, Calendar, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

type ItemStatus = "Available" | "Pending" | "Claimed";

interface WatchlistItem {
  id: number;
  title: string;
  description: string;
  owner: string;
  status: ItemStatus;
  postedDate: string;
  category: string;
  images: string[];
  priority: "High" | "Medium" | "Low";
  dateAdded: string;
}

export default function Watchlist() {
  const [selectedItemImages, setSelectedItemImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  
  const watchlistItems: WatchlistItem[] = [
    {
      id: 1,
      title: "Office Desk",
      description: "Wooden desk with drawers, perfect for home office setup",
      owner: "Emma Davis",
      status: "Available",
      postedDate: "1 day ago",
      dateAdded: "2 days ago",
      category: "Furniture",
      priority: "High",
      images: [sofaImage, dishesImage, clothesImage]
    },
    {
      id: 2,
      title: "Exercise Equipment",
      description: "Treadmill in good condition, barely used",
      owner: "John Smith",
      status: "Pending",
      postedDate: "3 days ago",
      dateAdded: "5 days ago",
      category: "Fitness",
      priority: "Medium",
      images: [laptopImage, babyChairImage, booksToys]
    },
    {
      id: 3,
      title: "Children's Books Collection",
      description: "Over 50 picture books and early readers",
      owner: "Sarah Johnson",
      status: "Claimed",
      postedDate: "1 week ago",
      dateAdded: "1 week ago",
      category: "Books",
      priority: "Low",
      images: [booksToys, clothesImage, dishesImage]
    }
  ];

  const tabs = [
    { key: "all", label: "All" },
    { key: "available", label: "Available" },
    { key: "pending", label: "Pending" },
    { key: "claimed", label: "Claimed" }
  ];

  const stats = useMemo(() => {
    const available = watchlistItems.filter(item => item.status === "Available").length;
    const pending = watchlistItems.filter(item => item.status === "Pending").length;
    const claimed = watchlistItems.filter(item => item.status === "Claimed").length;
    return { available, pending, claimed, total: watchlistItems.length };
  }, [watchlistItems]);

  const filtered = useMemo(() => {
    let result = watchlistItems;
    
    if (tab === "available") result = result.filter(item => item.status === "Available");
    if (tab === "pending") result = result.filter(item => item.status === "Pending");
    if (tab === "claimed") result = result.filter(item => item.status === "Claimed");
    
    if (query) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.owner.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  }, [watchlistItems, tab, query]);

  const handleRemoveFromWatchlist = (itemId: number) => {
    const item = watchlistItems.find(i => i.id === itemId);
    toast.success(`"${item?.title}" removed from watchlist`);
  };

  const getStatusColor = (status: ItemStatus) => {
    switch (status) {
      case "Available": return "text-accent";
      case "Pending": return "text-amber-500";
      case "Claimed": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-500";
      case "Medium": return "text-amber-500";
      case "Low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const ItemCard = ({ item }: { item: WatchlistItem }) => {
    return (
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="flex gap-4">
          {/* Image */}
          <div 
            className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl cursor-pointer hover:opacity-80 transition-opacity group relative"
            onClick={() => {
              setSelectedItemImages(item.images);
              setCurrentImageIndex(0);
            }}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority} Priority
                  </span>
                  <span className={`rounded-lg bg-muted px-2 py-1 text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <p className="mb-3 text-muted-foreground">{item.description}</p>
              
              {/* Owner and Date Info */}
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Owner: {item.owner}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Posted {item.postedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Added {item.dateAdded}
                </span>
              </div>

              {/* Status Timeline for tracking */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs text-accent">Watchlisted</span>
                <div className={`h-px w-6 ${item.status === "Pending" || item.status === "Claimed" ? "bg-accent" : "bg-border"}`} />
                <div className={`h-2 w-2 rounded-full ${item.status === "Pending" || item.status === "Claimed" ? "bg-accent" : "bg-muted-dark"}`} />
                <span className={`text-xs ${item.status === "Pending" || item.status === "Claimed" ? "text-accent" : "text-muted-foreground"}`}>Contacted</span>
                <div className={`h-px w-6 ${item.status === "Claimed" ? "bg-accent" : "bg-border"}`} />
                <div className={`h-2 w-2 rounded-full ${item.status === "Claimed" ? "bg-accent" : "bg-muted-dark"}`} />
                <span className={`text-xs ${item.status === "Claimed" ? "text-accent" : "text-muted-foreground"}`}>Received</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {item.status === "Available" && (
                <button
                  onClick={() => toast.info(`Contacting ${item.owner}`)}
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
                >
                  <MessageCircle className="mr-1 inline h-4 w-4" />
                  Contact Owner
                </button>
              )}
              {item.status === "Pending" && (
                <button
                  onClick={() => toast.info("Checking status with owner")}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Check Status
                </button>
              )}
              {item.status === "Claimed" && (
                <button
                  onClick={() => toast.info("Item no longer available")}
                  className="rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                  disabled
                >
                  No Longer Available
                </button>
              )}
              <button
                onClick={() => handleRemoveFromWatchlist(item.id)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="mr-1 inline h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TwoLevelNav activeMenuId="giving" activeSubItemPath="/watchlist">
      <div className="min-h-screen w-full bg-background p-6 text-foreground">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Watchlist</h1>
              <p className="text-muted-foreground">Sharing in fellowship • Track items you're interested in</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <span className="text-accent">💖</span>
              <span className="text-sm text-muted-foreground">Available: {stats.available}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Pending: {stats.pending}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Claimed: {stats.claimed}</span>
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
                  placeholder="Search watchlist…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* List */}
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card/60 p-10 text-center text-muted-foreground">
                {query ? "No items match your search." : watchlistItems.length === 0 ? (
                  <div>
                    <Heart className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mb-2 text-lg font-semibold">No items in watchlist</h3>
                    <p>Express interest in items from the marketplace to track them here.</p>
                  </div>
                ) : "No items found for this filter."}
              </div>
            ) : (
              filtered.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))
            )}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Tip: Stay updated on item availability. Remove items you're no longer interested in to keep your watchlist organized.
          </p>
        </div>
      </div>

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
    </TwoLevelNav>
  );
}