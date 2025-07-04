import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Transportation", "Groceries", "Home Repair", "Meals", "Prayer Support", "Other"];
const urgencyLevels = ["Immediate", "This Week", "Flexible"];

export default function PostNeed() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "",
    location: "",
    estimatedTime: "",
    contactPreference: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.urgency) {
      toast({
        title: "Please fill in all required fields",
        description: "Title, description, category, and urgency are required.",
        variant: "destructive"
      });
      return;
    }

    // Simulate posting the need
    toast({
      title: "Need posted successfully!",
      description: "Your need has been shared with the community. You'll be notified when someone volunteers to help."
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      urgency: "",
      location: "",
      estimatedTime: "",
      contactPreference: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-warm-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Share Your Need
            </h1>
            <p className="text-lg text-muted-foreground">
              Let our community know how we can help and serve you
            </p>
          </div>

          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle>Tell us what you need</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Need Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of what you need help with"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide more details about your need, including any specific requirements or preferences"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="text-base resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent is this?" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map(urgency => (
                          <SelectItem key={urgency} value={urgency}>
                            {urgency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location/Address</Label>
                  <Input
                    id="location"
                    placeholder="Where should volunteers meet you or deliver help?"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Estimated Time Needed</Label>
                  <Input
                    id="estimatedTime"
                    placeholder="e.g., 30 minutes, 2 hours, etc."
                    value={formData.estimatedTime}
                    onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPreference">Preferred Contact Method</Label>
                  <Input
                    id="contactPreference"
                    placeholder="Phone, email, or through app messaging"
                    value={formData.contactPreference}
                    onChange={(e) => handleInputChange("contactPreference", e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a photo (optional)
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" variant="hero" size="lg" className="flex-1">
                    Post My Need
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => window.history.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}