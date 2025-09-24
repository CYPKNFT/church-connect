import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Eye, Heart, Package, Gift, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Giving() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Mock data for demonstration
  const myPostedItems = [
    {
      id: 1,
      title: "Dining Table Set",
      description: "Beautiful wooden dining table with 6 chairs",
      category: "Furniture",
      status: "Available",
      views: 23,
      interested: 3,
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker",
      category: "Electronics",
      status: "Claimed",
      views: 18,
      interested: 5,
      postedDate: "1 week ago"
    }
  ];

  const handleEditItem = (itemTitle: string) => {
    toast.info(`Editing "${itemTitle}"`);
  };

  const handleDeleteItem = (itemTitle: string) => {
    toast.success(`"${itemTitle}" has been deleted`);
  };

  const handleMarkAsGiven = (itemTitle: string) => {
    toast.success(`"${itemTitle}" has been marked as given away`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Items I've Given</h1>
            <p className="text-muted-foreground">Manage items you've posted to share with the community</p>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Items I've Posted</h2>
              <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Post New Item</DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <p className="text-muted-foreground">This would open the same post item modal from the Marketplace page.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {myPostedItems.length > 0 ? (
              <div className="space-y-4">
                {myPostedItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Item Thumbnail */}
                        <div className="w-full md:w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-muted-foreground" />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Badge variant={item.status === "Available" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {item.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {item.interested} interested
                            </span>
                            <span>{item.postedDate}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 md:w-auto w-full">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditItem(item.title)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          
                          {item.status === "Available" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMarkAsGiven(item.title)}
                              className="flex items-center gap-2"
                            >
                              <Gift className="w-4 h-4" />
                              Mark as Given
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.title)}
                            className="flex items-center gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No items posted yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start sharing with your community by posting your first item!
                  </p>
                  <Button onClick={() => setIsPostModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Item
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}