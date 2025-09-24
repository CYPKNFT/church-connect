import React, { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Edit, Trash2, Eye, Heart, MessageCircle, Search } from "lucide-react";
import { toast } from "sonner";

// Import marketplace images
import sofaImage from "@/assets/marketplace/sofa.jpg";
import laptopImage from "@/assets/marketplace/laptop.jpg";
import babyChairImage from "@/assets/marketplace/baby-chair.jpg";
import dishesImage from "@/assets/marketplace/dishes.jpg";
import clothesImage from "@/assets/marketplace/clothes.jpg";
import booksToys from "@/assets/marketplace/books-toys.jpg";

type ItemStatus = "Available" | "Claimed" | "Given";

interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  status: ItemStatus;
  views: number;
  interested: number;
  postedDate: string;
  images: string[];
}

export default function Giving() {
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Mock data for demonstration
  const items: Item[] = [
    {
      id: 1,
      title: "Dining Table Set",
      description: "Beautiful wooden dining table with 6 chairs",
      category: "Furniture",
      status: "Available",
      views: 23,
      interested: 3,
      postedDate: "2 days ago",
      images: [sofaImage, babyChairImage, dishesImage]
    },
    {
      id: 2,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker",
      category: "Electronics",
      status: "Claimed",
      views: 18,
      interested: 5,
      postedDate: "7 days ago",
      images: [laptopImage, clothesImage, booksToys]
    }
  ];

  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "claimed", label: "Claimed" },
    { key: "completed", label: "Completed" }
  ];

  const impact = useMemo(() => {
    const available = items.filter(item => item.status === "Available").length;
    const claimed = items.filter(item => item.status === "Claimed").length;
    const given = items.filter(item => item.status === "Given").length;
    return { given, claimed, available, total: items.length };
  }, [items]);

  const filtered = useMemo(() => {
    let result = items;
    
    if (tab === "active") result = result.filter(item => item.status === "Available");
    if (tab === "claimed") result = result.filter(item => item.status === "Claimed");
    if (tab === "completed") result = result.filter(item => item.status === "Given");
    
    if (query) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  }, [items, tab, query]);

  const updateItem = (id: number, updates: Partial<Item>) => {
    toast.success("Item updated successfully");
  };

  const deleteItem = (id: number) => {
    toast.success("Item deleted successfully");
  };

  const ItemCard = ({ item, onUpdate, onDelete }: { item: Item; onUpdate: (id: number, updates: Partial<Item>) => void; onDelete: (id: number) => void; }) => {
    const getStatusColor = (status: ItemStatus) => {
      switch (status) {
        case "Available": return "text-accent";
        case "Claimed": return "text-accent";
        case "Given": return "text-muted-foreground";
        default: return "text-muted-foreground";
      }
    };

    const getStatusText = (status: ItemStatus) => {
      switch (status) {
        case "Available": return "Available";
        case "Claimed": return "Claimed";
        case "Given": return "Given";
        default: return status;
      }
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
              
              {/* Stats */}
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {item.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {item.interested} interested
                </span>
                <span className="flex items-center gap-1">
                  🕐 {item.postedDate}
                </span>
              </div>

              {/* Status Progress */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs text-accent">Available</span>
                <div className={`h-px w-6 ${item.status === "Claimed" || item.status === "Given" ? "bg-accent" : "bg-border"}`} />
                <div className={`h-2 w-2 rounded-full ${item.status === "Claimed" || item.status === "Given" ? "bg-accent" : "bg-muted-dark"}`} />
                <span className={`text-xs ${item.status === "Claimed" || item.status === "Given" ? "text-accent" : "text-muted-foreground"}`}>Claimed</span>
                <div className={`h-px w-6 ${item.status === "Given" ? "bg-accent" : "bg-border"}`} />
                <div className={`h-2 w-2 rounded-full ${item.status === "Given" ? "bg-accent" : "bg-muted-dark"}`} />
                <span className={`text-xs ${item.status === "Given" ? "text-accent" : "text-muted-foreground"}`}>Given</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {item.status === "Available" && (
                <button
                  onClick={() => onUpdate(item.id, { status: "Claimed" })}
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
                >
                  Mark as Claimed
                </button>
              )}
              {item.status === "Claimed" && (
                <button
                  onClick={() => onUpdate(item.id, { status: "Given" })}
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
                >
                  Mark as Given
                </button>
              )}
              {item.interested > 0 && (
                <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                  <MessageCircle className="mr-1 inline h-4 w-4" />
                  Message Interested
                </button>
              )}
              <button
                onClick={() => toast.info(`Editing ${item.title}`)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Delete
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
              <h1 className="text-3xl font-bold tracking-tight">Giving</h1>
              <p className="text-muted-foreground">Sharing in fellowship • Manage your posted items</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <span className="text-accent">📦</span>
              <span className="text-sm text-muted-foreground">Available: {impact.available}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Claimed: {impact.claimed}</span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">Given: {impact.given}</span>
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
                  placeholder="Search my items…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button
                onClick={() => toast.info("Opening post item modal")}
                className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
              >
                + Post New Item
              </button>
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
                <ItemCard key={item.id} item={item} onUpdate={updateItem} onDelete={deleteItem} />
              ))
            )}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Tip: Keep communications inside the platform. Meet in public church spaces. Verify item condition before pickup.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}