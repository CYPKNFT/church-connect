import { useState } from "react";
import { ArrowLeft, Star, Bug, Lightbulb, Heart, HelpCircle, AlertTriangle, Camera, Send } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AppFeedbackFormProps {
  onBack: () => void;
}

const categories = [
  { id: "bug", label: "Bug Report", icon: Bug, color: "text-destructive", bgColor: "bg-destructive/10" },
  { id: "feature", label: "Feature Request", icon: Lightbulb, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100/50 dark:bg-green-900/20" },
  { id: "praise", label: "Praise", icon: Heart, color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-100/50 dark:bg-purple-900/20" },
  { id: "question", label: "Question", icon: HelpCircle, color: "text-primary", bgColor: "bg-primary/10" },
  { id: "other", label: "Other", icon: Star, color: "text-muted-foreground", bgColor: "bg-muted/50" }
];

const severityOptions = [
  { value: "low", label: "Low", description: "Minor issue that doesn't affect core functionality" },
  { value: "medium", label: "Medium", description: "Noticeable issue but workarounds exist" },
  { value: "high", label: "High", description: "Significant issue affecting user experience" },
  { value: "critical", label: "Critical", description: "App is unusable or data loss occurs" }
];

export function AppFeedbackForm({ onBack }: AppFeedbackFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    message: "",
    severity: "medium",
    rating: 0,
    consentToContact: true,
    emailOverride: ""
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

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('app_feedback' as any)
        .insert({
          user_id: user?.id,
          category: formData.category,
          title: formData.title,
          message: formData.message,
          severity: formData.severity,
          rating: formData.rating || null,
          consent_to_contact: formData.consentToContact,
          email_override: formData.emailOverride || null,
          device_info: navigator.userAgent,
          platform: navigator.platform,
          app_version: "1.0.0"
        });

      if (error) throw error;

      toast({
        title: "Feedback submitted successfully!",
        description: "Thank you for helping us improve the platform."
      });

      onBack();
    } catch (error) {
      console.error('Error submitting feedback:', error);
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
          <h1 className="text-3xl font-bold text-foreground">App Feedback</h1>
          <p className="text-muted-foreground">Help us make the platform better for everyone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Feedback Category
              </CardTitle>
              <CardDescription>
                What type of feedback are you sharing?
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
                  Provide specific details about your feedback
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
                  <Label htmlFor="message">Description *</Label>
                  <Textarea
                    id="message"
                    placeholder="Provide detailed information about your feedback..."
                    value={formData.message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    rows={6}
                    required
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Be specific and include steps to reproduce if reporting a bug
                    </span>
                    <span className={`${characterCount > maxCharacters * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                      {characterCount}/{maxCharacters}
                    </span>
                  </div>
                </div>

                {formData.category === 'bug' && (
                  <div className="space-y-2">
                    <Label>Severity Level</Label>
                    <RadioGroup
                      value={formData.severity}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {severityOptions.map((option) => (
                        <div key={option.value} className="flex items-start space-x-2 p-3 rounded-lg border">
                          <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {(formData.category === 'praise' || formData.category === 'other') && (
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
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {formData.category && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Preferences</CardTitle>
                <CardDescription>
                  How would you like us to follow up on your feedback?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consentToContact}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, consentToContact: !!checked }))
                    }
                  />
                  <Label htmlFor="consent">
                    I consent to being contacted about this feedback
                  </Label>
                </div>

                {formData.consentToContact && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Alternative Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="different@email.com"
                      value={formData.emailOverride}
                      onChange={(e) => setFormData(prev => ({ ...prev, emailOverride: e.target.value }))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Leave blank to use your account email
                    </p>
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