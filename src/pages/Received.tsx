import React, { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Heart, Package, Gift, Calendar, User, Search, Eye, MessageCircle } from "lucide-react";
import { toast } from "sonner";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

type ItemStatus = "Claimed" | "Received" | "Thanked";

interface ReceivedItem {
  id: number;
  title: string;
  description: string;
  previousOwner: string;
  pickupDate: string;
  category: string;
  status: ItemStatus;
  images: string[];
}

export default function Received() {
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Mock data for demonstration
  const items: ReceivedItem[] = [
    {
      id: 1,
      title: "Children's Books Collection",
      description: "Over 50 picture books and early readers",
      previousOwner: "Sarah Johnson",
      pickupDate: "2024-01-15",
      category: "Books",
      status: "Received",
      images: [booksToys, clothesImage, dishesImage]
    },
    {
      id: 2,
      title: "Baby Clothes",
      description: "0-12 months clothing bundle",
      previousOwner: "Michael Chen",
      pickupDate: "2024-01-10",
      category: "Baby/Kids",
      status: "Thanked",
      images: [babyChairImage, sofaImage, laptopImage]
    },
    {
      id: 3,
      title: "Wooden High Chair",
      description: "Adjustable wooden high chair in excellent condition",
      previousOwner: "David Wilson",
      pickupDate: "2024-01-20",
      category: "Baby/Kids",
      status: "Claimed",
      images: [babyChairImage, sofaImage, laptopImage]
    }
  ];

  const tabs = [
    { key: "all", label: "All" },
    { key: "claimed", label: "Claimed" },
    { key: "received", label: "Received" },
    { key: "thanked", label: "Thanked" }
  ];

  const impact = useMemo(() => {
    const claimed = items.filter(item => item.status === "Claimed").length;
    const received = items.filter(item => item.status === "Received").length;
    const thanked = items.filter(item => item.status === "Thanked").length;
    return { claimed, received, thanked, total: items.length };
  }, [items]);

  const filtered = useMemo(() => {
    let result = items;
    
    if (tab === "claimed") result = result.filter(item => item.status === "Claimed");
    if (tab === "received") result = result.filter(item => item.status === "Received");
    if (tab === "thanked") result = result.filter(item => item.status === "Thanked");
    
    if (query) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.previousOwner.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  }, [items, tab, query]);

  const updateItem = (id: number, updates: Partial<ReceivedItem>) => {
    toast.success("Item updated successfully");
  };

  const ItemCard = ({ item, onUpdate }: { item: ReceivedItem; onUpdate: (id: number, updates: Partial<ReceivedItem>) => void; }) => {
    const getStatusColor = (status: ItemStatus) => {
      switch (status) {
        case "Claimed": return "text-yellow-500";
        case "Received": return "text-accent";
        case "Thanked": return "text-emerald-500";
        default: return "text-muted-foreground";
      }
    };

    const getStatusText = (status: ItemStatus) => {
      switch (status) {
        case "Claimed": return "Claimed";
        case "Received": return "Received";
        case "Thanked": return "Thanked";
        default: return status;
      }
    };

    const StatusTimeline = ({ currentStatus }: { currentStatus: ItemStatus }) => {
      const statuses: ItemStatus[] = ["Claimed", "Received", "Thanked"];
      const currentIndex = statuses.indexOf(currentStatus);

      return (
        <div className="flex items-center gap-2 mb-3">
          {statuses.map((status, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <React.Fragment key={status}>
                <div 
                  className={`flex items-center gap-2 ${isActive ? getStatusColor(status) : "text-muted-foreground"}`}
                >
                  <div 
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive 
                        ? (status === "Claimed" ? "bg-yellow-500" : status === "Received" ? "bg-accent" : "bg-emerald-500")
                        : "bg-muted-foreground/30"
                    }`}
                  />
                  <span className={`text-xs font-medium ${isCurrent ? "font-semibold" : ""}`}>
                    {status}
                  </span>
                </div>
                {index < statuses.length - 1 && (
                  <div className={`h-px w-4 ${index < currentIndex ? "bg-accent" : "bg-muted-foreground/20"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    };

    return (
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="flex gap-4">
          {/* Image */}
          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl">
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <span className={`rounded-lg bg-muted px-2 py-1 text-sm font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
              <p className="mb-3 text-muted-foreground">{item.description}</p>
              
              {/* Status Timeline */}
              <StatusTimeline currentStatus={item.status} />
              
              {/* Stats */}
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  From: {item.previousOwner}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {item.status === "Claimed" ? "Claimed" : "Received"}: {new Date(item.pickupDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {item.status === "Claimed" && (
                <button
                  onClick={() => onUpdate(item.id, { status: "Received" })}
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  <Package className="mr-1 inline h-4 w-4" />
                  Mark as Received
                </button>
              )}
              {item.status === "Received" && (
                <button
                  onClick={() => onUpdate(item.id, { status: "Thanked" })}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Heart className="mr-1 inline h-4 w-4" />
                  Send Thank You
                </button>
              )}
              <button
                onClick={() => toast.info(`Opening message thread with ${item.previousOwner}`)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                <MessageCircle className="mr-1 inline h-4 w-4" />
                Message
              </button>
              <button
                onClick={() => toast.info(`Viewing details for ${item.title}`)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                <Eye className="mr-1 inline h-4 w-4" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-background p-6 text-foreground">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Received</h1>
              <p className="text-muted-foreground">Sharing in fellowship • Items you've received</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <span className="text-accent">🎁</span>
              <span className="text-sm text-muted-foreground">Claimed: {impact.claimed}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Received: {impact.received}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Thanked: {impact.thanked}</span>
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
                  placeholder="Search received items…"
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
                No items found.
              </div>
            ) : (
              filtered.map((item) => (
                <ItemCard key={item.id} item={item} onUpdate={updateItem} />
              ))
            )}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Tip: Express gratitude to fellow church members who have blessed you with these items.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}