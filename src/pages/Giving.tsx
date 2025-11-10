import React, { useMemo, useState } from "react";
import { Edit, Trash2, Eye, Heart, MessageCircle, Search, X, ChevronLeft, ChevronRight, Plus, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [selectedItemImages, setSelectedItemImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<{ title: string; description: string; category: string; status: ItemStatus; images: string[] }>({
    title: "",
    description: "",
    category: "Furniture",
    status: "Available",
    images: []
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Item | null>(null);

  // Mock data for demonstration
  const [items, setItems] = useState<Item[]>([
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
  ]);

  const tabs = [
    { key: "all", label: "All" },
    { key: "offered", label: "Offered" },
    { key: "active", label: "Active" },
    { key: "claimed", label: "Claimed" },
    { key: "requested", label: "Requested" },
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
    // "offered" shows all items you've posted (default view) – adjust if a different rule is desired
    if (tab === "offered") result = result;
    if (tab === "claimed") result = result.filter(item => item.status === "Claimed");
    // Requested tab placeholder: in real app, filter by items you've applied for
    if (tab === "requested") result = result.filter(item => item.interested > 0 && item.status !== "Given");
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
    setItems(prev => prev.map(it => (it.id === id ? { ...it, ...updates } : it)));
    toast.success("Item updated successfully");
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(it => it.id !== id));
    toast.success("Item deleted successfully");
  };

  const openEdit = (item: Item) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, category: item.category, status: item.status, images: item.images });
    setIsEditOpen(true);
  };

  const submitEdit = () => {
    if (!editing) return;
    updateItem(editing.id, { title: form.title, description: form.description, category: form.category, status: form.status, images: form.images });
    setIsEditOpen(false);
    setEditing(null);
  };

  const openDelete = (item: Item) => {
    setDeleting(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    deleteItem(deleting.id);
    setIsDeleteOpen(false);
    setDeleting(null);
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
                onClick={() => openEdit(item)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Edit
              </button>
              <button
                onClick={() => openDelete(item)}
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
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
                  >
                    + Post New Item
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Post New Item</DialogTitle>
                  </DialogHeader>
                  <p>Post item dialog would go here...</p>
                </DialogContent>
              </Dialog>
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

          {/* Edit Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-lg rounded-2xl">
              <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input id="edit-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-desc">Description</Label>
                  <Textarea id="edit-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                {/* Photos */}
                <div className="space-y-2">
                  <Label>Photos</Label>
                  {form.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {form.images.map((src, idx) => (
                        <div key={idx} className="relative group overflow-hidden rounded-xl border border-border">
                          <img src={src} alt={`Photo ${idx + 1}`} className="h-24 w-full object-cover" />
                          <button
                            aria-label="Remove photo"
                            title="Remove photo"
                            onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                            className="absolute top-2 right-2 rounded-full bg-black/50 text-white w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border-2 border-dashed border-border rounded-xl p-4 flex items-center justify-between gap-3 bg-card/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Upload className="w-4 h-4" />
                      <span>Add images (JPG/PNG)</span>
                    </div>
                    <label className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer">
                      <Plus className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const urls = files.map((f) => URL.createObjectURL(f));
                          setForm({ ...form, images: [...form.images, ...urls] });
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        { ["Furniture","Electronics","Baby/Kids","Household","Clothing","Books","Other"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        )) }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as ItemStatus })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Claimed">Claimed</SelectItem>
                        <SelectItem value="Given">Given</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={submitEdit} className="flex-1 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover">Save Changes</button>
                  <button onClick={() => setIsEditOpen(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>Delete Item</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Are you sure you want to delete {deleting?.title}? This action cannot be undone.</p>
              <div className="flex gap-2 pt-2">
                <button onClick={confirmDelete} className="flex-1 rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-90">Delete</button>
                <button onClick={() => setIsDeleteOpen(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Tip: Keep communications inside the platform. Meet in public church spaces. Verify item condition before pickup.
          </p>
      </div>

      {/* Image Overlay Modal */}
      {selectedItemImages.length > 0 && (
        <Dialog open={selectedItemImages.length > 0} onOpenChange={() => setSelectedItemImages([])}>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="relative">
              <button
                onClick={() => setSelectedItemImages([])}
                aria-label="Close image viewer"
                title="Close"
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
                      aria-label="Previous image"
                      title="Previous"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < selectedItemImages.length - 1 ? prev + 1 : 0)}
                      aria-label="Next image"
                      title="Next"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedItemImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                          title={`Go to image ${index + 1}`}
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
    </div>
  );
}