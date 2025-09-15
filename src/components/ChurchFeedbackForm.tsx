import { useState } from "react";
import { ArrowLeft, Building, Users, Calendar, MapPin, Music, Star, Send, Eye, EyeOff } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useMembership } from "@/hooks/useMembership";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ChurchFeedbackFormProps {
  onBack: () => void;
}

const categories = [
  { id: "worship", label: "Worship & Services", icon: Music, color: "text-purple-500", bgColor: "bg-purple-50" },
  { id: "community", label: "Community & Fellowship", icon: Users, color: "text-blue-500", bgColor: "bg-blue-50" },
  { id: "events", label: "Events & Programs", icon: Calendar, color: "text-green-500", bgColor: "bg-green-50" },
  { id: "facilities", label: "Facilities & Building", icon: Building, color: "text-orange-500", bgColor: "bg-orange-50" },
  { id: "leadership", label: "Leadership & Staff", icon: Star, color: "text-indigo-500", bgColor: "bg-indigo-50" },
  { id: "outreach", label: "Outreach & Missions", icon: MapPin, color: "text-red-500", bgColor: "bg-red-50" }
];

export function ChurchFeedbackForm({ onBack }: ChurchFeedbackFormProps) {
  const { user } = useAuth();
  const { memberId, churchId, churchName } = useMembership();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    message: "",
    rating: 0,
    isAnonymous: false,
    visibleToAdminsOnly: true,
    followUpNeeded: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const maxCharacters = 500;

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const handleRatingSelect = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleMessageChange = (value: string) => {
    if (value.length <= maxCharacters) {
      setFormData(prev => ({ ...prev, message: value }));
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.title || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!churchId || !memberId) {
      toast({
        title: "Church membership not found",
        description: "Please ensure you're a member of a church to submit feedback.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('church_feedback' as any)
        .insert({
          user_id: user?.id,
          member_id: memberId,
          church_id: churchId,
          category: formData.category,
          title: formData.title,
          message: formData.message,
          rating: formData.rating || null,
          is_anonymous: formData.isAnonymous,
          visible_to_admins_only: formData.visibleToAdminsOnly,
          follow_up_needed: formData.followUpNeeded
        });

      if (error) throw error;

      toast({
        title: "Church feedback submitted successfully!",
        description: "Thank you for helping improve your church community."
      });

      onBack();
    } catch (error) {
      console.error('Error submitting church feedback:', error);
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feedback
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Church Feedback</h1>
          <p className="text-muted-foreground">
            Share feedback about {churchName || "your church"} community and experiences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Feedback Category
              </CardTitle>
              <CardDescription>
                Which area of church life does your feedback relate to?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.category === category.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.bgColor}`}>
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <span className="font-medium">{category.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {formData.category && (
            <Card>
              <CardHeader>
                <CardTitle>Feedback Details</CardTitle>
                <CardDescription>
                  Share your thoughts and experiences with your church community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your feedback"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Feedback *</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts, suggestions, or experiences..."
                    value={formData.message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    rows={6}
                    required
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Be constructive and specific in your feedback
                    </span>
                    <span className={`${characterCount > maxCharacters * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                      {characterCount}/{maxCharacters}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Overall Rating (Optional)</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRatingSelect(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {formData.rating === 1 && "Poor"}
                      {formData.rating === 2 && "Fair"}
                      {formData.rating === 3 && "Good"}
                      {formData.rating === 4 && "Very Good"}
                      {formData.rating === 5 && "Excellent"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {formData.category && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Follow-up Preferences</CardTitle>
                <CardDescription>
                  Control how your feedback is shared and handled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="anonymous" className="flex items-center gap-2">
                      {formData.isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      Submit anonymously
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Hide your identity from church leaders when viewing this feedback
                    </p>
                  </div>
                  <Switch
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, isAnonymous: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="admins-only">Visible to admins only</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict visibility to church administrators only
                    </p>
                  </div>
                  <Switch
                    id="admins-only"
                    checked={formData.visibleToAdminsOnly}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, visibleToAdminsOnly: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="follow-up">Request follow-up</Label>
                    <p className="text-sm text-muted-foreground">
                      Ask church leaders to respond to this feedback
                    </p>
                  </div>
                  <Switch
                    id="follow-up"
                    checked={formData.followUpNeeded}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, followUpNeeded: checked }))
                    }
                  />
                </div>

                {(formData.isAnonymous && formData.followUpNeeded) && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Anonymous Follow-up</p>
                        <p className="text-sm text-amber-700">
                          Since you've chosen to submit anonymously, church leaders won't be able to 
                          contact you directly for follow-up. Consider making your feedback non-anonymous 
                          if you'd like a personal response.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {formData.category && (
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}