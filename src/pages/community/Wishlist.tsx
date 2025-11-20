import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Heart, Clock, MessageSquare, User, Edit, Trash2, List } from "lucide-react";

export default function Wishlist() {
  const [wishes, setWishes] = useState([
    {
      id: 1,
      title: "Looking for a bicycle for my daughter",
      description: "Seeking a kids' bike for my 8-year-old daughter. Any condition welcome!",
      category: "Recreation",
      status: "Active",
      postedDate: "5 hours ago",
      responses: 2,
      author: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Need a car seat",
      description: "New baby on the way! Looking for an infant car seat in good condition.",
      category: "Baby/Kids",
      status: "Active",
      postedDate: "1 day ago",
      responses: 4,
      author: "Mike Brown"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingWish, setEditingWish] = useState<any>(null);
  const [newWish, setNewWish] = useState({
    title: "",
    description: "",
    category: ""
  });

  const categories = [
    "Baby/Kids", "Furniture", "Electronics", "Tools", "Recreation", 
    "Clothing", "Books", "Kitchen", "Home & Garden", "Sports", "Other"
  ];

  const handleCreateWish = () => {
    if (newWish.title && newWish.description && newWish.category) {
      const wish = {
        id: wishes.length + 1,
        title: newWish.title,
        description: newWish.description,
        category: newWish.category,
        status: "Active",
        postedDate: "Just now",
        responses: 0,
        author: "You"
      };
      setWishes([wish, ...wishes]);
      setNewWish({ title: "", description: "", category: "" });
      setIsCreateDialogOpen(false);
    }
  };

  const handleEditWish = (wish: any) => {
    setEditingWish(wish);
    setNewWish({
      title: wish.title,
      description: wish.description,
      category: wish.category
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateWish = () => {
    if (newWish.title && newWish.description && newWish.category && editingWish) {
      setWishes(wishes.map(wish => 
        wish.id === editingWish.id 
          ? { ...wish, title: newWish.title, description: newWish.description, category: newWish.category }
          : wish
      ));
      setNewWish({ title: "", description: "", category: "" });
      setEditingWish(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteWish = (wishId: number) => {
    if (window.confirm("Are you sure you want to delete this wish? This action cannot be undone.")) {
      setWishes(wishes.filter(wish => wish.id !== wishId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/20 text-green-600 border-green-500/30";
      case "Fulfilled": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "Expired": return "bg-gray-500/20 text-gray-600 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  return (
      <div className="min-h-screen bg-background">
        <div className="p-6 lg:p-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <List className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
                    <p className="text-muted-foreground">Share what you need • Let your community help</p>
                  </div>
                </div>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Wish
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Post a New Wish</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">What do you need?</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Looking for a bicycle for my daughter"
                        value={newWish.title}
                        onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide more details about what you're looking for..."
                        value={newWish.description}
                        onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={newWish.category === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNewWish({ ...newWish, category })}
                            className="text-xs rounded-full"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleCreateWish} className="flex-1 rounded-xl">
                        Post Wish
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="rounded-xl">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Edit Dialog */}
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Wish</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">What do you need?</Label>
                      <Input
                        id="edit-title"
                        placeholder="e.g., Looking for a bicycle for my daughter"
                        value={newWish.title}
                        onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        placeholder="Provide more details about what you're looking for..."
                        value={newWish.description}
                        onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-category">Category</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={newWish.category === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNewWish({ ...newWish, category })}
                            className="text-xs rounded-full"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleUpdateWish} className="flex-1 rounded-xl">
                        Update Wish
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Heart className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Wishes</p>
                      <p className="text-xl font-bold">{wishes.filter(w => w.status === "Active").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Offers</p>
                      <p className="text-xl font-bold">{wishes.reduce((sum, w) => sum + w.responses, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Answered Wishes</p>
                      <p className="text-xl font-bold">{wishes.filter(w => w.responses > 0).length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Wishes List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Your Wishes</h2>
                <Badge variant="secondary" className="text-sm">
                  {wishes.length} total
                </Badge>
              </div>

              {wishes.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <List className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">No wishes yet</h3>
                        <p className="text-muted-foreground">Post your first wish to let your community know what you need!</p>
                      </div>
                      <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Post Your First Wish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {wishes.map((wish) => (
                    <Card key={wish.id} className="group hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{wish.title}</CardTitle>
                              <Badge className={getStatusColor(wish.status)}>
                                {wish.status}
                              </Badge>
                            </div>
                            <CardDescription className="text-base">
                              {wish.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => handleEditWish(wish)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteWish(wish.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Badge variant="outline">{wish.category}</Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{wish.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{wish.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{wish.responses} offers</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Responses
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
