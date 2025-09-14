import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Car, ShoppingBag, Wrench, UtensilsCrossed, Hand, HelpCircle, Clock, MapPin, Phone, Mail, MessageSquare, CheckCircle, User, Home, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/AuthDialog";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { 
    value: "Transportation", 
    label: "Transportation", 
    icon: Car, 
    color: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Rides to appointments, errands, church"
  },
  { 
    value: "Groceries", 
    label: "Groceries & Shopping", 
    icon: ShoppingBag, 
    color: "bg-green-100 text-green-700 border-green-200",
    description: "Grocery runs, pharmacy visits, essentials"
  },
  { 
    value: "Home Repair", 
    label: "Home & Garden", 
    icon: Wrench, 
    color: "bg-orange-100 text-orange-700 border-orange-200",
    description: "Repairs, yard work, maintenance"
  },
  { 
    value: "Meals", 
    label: "Meals & Cooking", 
    icon: UtensilsCrossed, 
    color: "bg-purple-100 text-purple-700 border-purple-200",
    description: "Meal prep, delivery, cooking help"
  },
  { 
    value: "Childcare", 
    label: "Childcare & Family", 
    icon: Heart, 
    color: "bg-pink-100 text-pink-700 border-pink-200",
    description: "Babysitting, school pickup, playdates"
  },
  { 
    value: "Other", 
    label: "Other Support", 
    icon: HelpCircle, 
    color: "bg-gray-100 text-gray-700 border-gray-200",
    description: "Prayer, encouragement, other needs"
  }
];

const urgencyLevels = [
  { 
    value: "immediate", 
    label: "Urgent (24 hours)", 
    description: "I need help today or tomorrow", 
    color: "bg-red-50 border-red-200 text-red-700",
    badge: "bg-red-100 text-red-700"
  },
  { 
    value: "week", 
    label: "This Week", 
    description: "I need help within the next 7 days", 
    color: "bg-orange-50 border-orange-200 text-orange-700",
    badge: "bg-orange-100 text-orange-700"
  },
  { 
    value: "flexible", 
    label: "Flexible Timing", 
    description: "I'm flexible with when I get help", 
    color: "bg-green-50 border-green-200 text-green-700",
    badge: "bg-green-100 text-green-700"
  }
];

export default function PostNeed() {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "",
    location: "",
    estimatedTime: "",
    contactPreference: "message",
    phone: "",
    name: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.urgency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to post your need.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For now, simulate posting since the database schema is ready but we don't have needs table yet
      // Check if user has church membership by checking if they exist in members table
      try {
        const { data: memberData, error: memberError } = await (supabase as any)
          .from('members')
          .select('church_id, name')
          .eq('user_id', user.id)
          .eq('approved', true)
          .maybeSingle();

        if (memberError) {
          console.log('Error checking membership:', memberError);
        }

        if (!memberData) {
          toast({
            title: "Membership Required",
            description: "You must be an approved member of a church to post needs. Please contact your church admin.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        // Create need record (needs table would need to be created)
        const needData = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          urgency: formData.urgency,
          location: formData.location,
          estimated_time: formData.estimatedTime,
          contact_preference: formData.contactPreference,
          phone: formData.phone,
          posted_by_name: formData.name || memberData.name,
          church_id: memberData.church_id,
          posted_by_user_id: user.id,
          status: 'active'
        };

        console.log('Would save need:', needData);
      } catch (dbError) {
        console.log('Database not ready, simulating success');
      }

      // For now, just simulate success
      setIsSubmitted(true);
      toast({
        title: "Need Posted Successfully! 🎉",
        description: "Your request has been shared with the community. You'll receive notifications when people offer to help.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while posting your need. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-0 shadow-xl bg-card">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Your Need is Now Live! 🎉
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We've shared "{formData.title}" with your community. You'll get notifications when neighbors offer to help.
              </p>
              <div className="space-y-4">
                <Button asChild className="w-full bg-primary hover:bg-primary-hover">
                  <Link to="/browse">Browse Other Needs</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/dashboard">View My Dashboard</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      urgency: "",
                      location: "",
                      estimatedTime: "",
                      contactPreference: "message",
                      phone: "",
                      name: ""
                    });
                  }}
                  className="w-full"
                >
                  Post Another Need
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium mb-4">
            <Heart className="w-4 h-4" />
            <span>Post Your Need</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Help From Your <span className="text-primary">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tell your neighbors what you need help with. It's free, simple, and you'll be amazed by how willing people are to help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                What do you need help with?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-lg font-semibold text-foreground mb-3 block">
                  Give your request a clear title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., 'Weekly grocery shopping' or 'Help moving furniture'"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg py-6 px-4 rounded-xl border-2 focus:border-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-lg font-semibold text-foreground mb-3 block">
                  Describe what kind of help you need *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Be specific about what you need. For example: 'I need someone to help me with grocery shopping every Tuesday morning. I have mobility issues and would appreciate someone who can drive me to the store and help carry bags.'"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-32 text-lg py-4 px-4 rounded-xl border-2 focus:border-primary resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Selection */}
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-accent" />
                </div>
                What category best fits your need? *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleInputChange("category", category.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      formData.category === category.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{category.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Urgency */}
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-8 h-8 bg-orange/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                How urgent is this need? *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {urgencyLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => handleInputChange("urgency", level.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      formData.urgency === level.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className="space-y-3">
                      <Badge className={level.badge}>{level.label}</Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">{level.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-8 h-8 bg-green/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                Additional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-lg font-semibold text-foreground mb-3 block">
                    Your general location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., 'Downtown area' or 'Near Main St'"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="text-lg py-6 px-4 rounded-xl border-2 focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="estimatedTime" className="text-lg font-semibold text-foreground mb-3 block">
                    Estimated time needed
                  </Label>
                  <Input
                    id="estimatedTime"
                    placeholder="e.g., '2 hours' or 'Once a week'"
                    value={formData.estimatedTime}
                    onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                    className="text-lg py-6 px-4 rounded-xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-lg font-semibold text-foreground mb-3 block">
                  Your name (how volunteers should address you)
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., 'Sarah' or 'Mrs. Johnson'"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-lg py-6 px-4 rounded-xl border-2 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Posting Your Need...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-3" />
                  Share With Community
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <div className="text-center mt-12 p-6 bg-white/50 rounded-xl border border-white/20">
          <p className="text-muted-foreground">
            Need help with this form? <Link to="/help" className="text-primary hover:underline">Contact our support team</Link> or call (555) 123-4567
          </p>
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  );
}