import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Upload, ChevronLeft, ChevronRight, Car, ShoppingBag, Wrench, UtensilsCrossed, Hand, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "Transportation", label: "Transportation", icon: Car, color: "bg-blue-500" },
  { value: "Groceries", label: "Groceries", icon: ShoppingBag, color: "bg-green-500" },
  { value: "Home Repair", label: "Home Repair", icon: Wrench, color: "bg-orange-500" },
  { value: "Meals", label: "Meals", icon: UtensilsCrossed, color: "bg-purple-500" },
  { value: "Prayer Support", label: "Prayer Support", icon: Hand, color: "bg-pink-500" },
  { value: "Other", label: "Other", icon: HelpCircle, color: "bg-gray-500" }
];

const urgencyLevels = [
  { value: "Immediate", label: "Immediate", description: "I need help within 24 hours", color: "bg-red-500" },
  { value: "This Week", label: "This Week", description: "I need help within the next 7 days", color: "bg-orange-500" },
  { value: "Flexible", label: "Flexible", description: "I'm flexible with timing", color: "bg-green-500" }
];

export default function PostNeed() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
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

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.title && formData.description;
      case 2: return formData.category;
      case 3: return formData.urgency;
      case 4: return true;
      default: return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Tell us about your need";
      case 2: return "What kind of help do you need?";
      case 3: return "How urgent is this?";
      case 4: return "Final details";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Share what you need help with in your own words";
      case 2: return "Choose the category that best describes your need";
      case 3: return "Let us know your timeline";
      case 4: return "Add location and contact preferences";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-card">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Share Your Need
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Let our community know how we can help and serve you
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step 
                        ? 'bg-white text-primary' 
                        : 'bg-white/30 text-white/70'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 rounded-full ${
                        currentStep > step ? 'bg-white' : 'bg-white/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm">Step {currentStep} of 4</p>
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="shadow-card border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-foreground mb-2">
                {getStepTitle()}
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                {getStepDescription()}
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="min-h-[400px] flex flex-col justify-center">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-lg font-semibold">What do you need help with? *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Need groceries for elderly neighbor"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-lg h-12 bg-white border-2"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-lg font-semibold">Tell us more about it *</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide more details about your need, including any specific requirements or preferences..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={6}
                        className="text-base resize-none bg-white border-2"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Category Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {categories.map(category => {
                        const Icon = category.icon;
                        return (
                          <div
                            key={category.value}
                            onClick={() => handleInputChange("category", category.value)}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                              formData.category === category.value
                                ? 'border-primary bg-primary/10 shadow-card'
                                : 'border-border bg-white hover:border-primary/50'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3 mx-auto`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-center text-sm">{category.label}</h3>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Urgency Selection */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-4">
                      {urgencyLevels.map(urgency => (
                        <div
                          key={urgency.value}
                          onClick={() => handleInputChange("urgency", urgency.value)}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                            formData.urgency === urgency.value
                              ? 'border-primary bg-primary/10 shadow-card'
                              : 'border-border bg-white hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-4 h-4 rounded-full ${urgency.color}`}></div>
                            <div>
                              <h3 className="font-semibold text-lg">{urgency.label}</h3>
                              <p className="text-muted-foreground">{urgency.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Final Details */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="location" className="text-lg font-semibold">Location/Address</Label>
                        <Input
                          id="location"
                          placeholder="Where should volunteers meet you?"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="text-base h-12 bg-white border-2"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="estimatedTime" className="text-lg font-semibold">Estimated Time</Label>
                        <Input
                          id="estimatedTime"
                          placeholder="e.g., 30 minutes, 2 hours"
                          value={formData.estimatedTime}
                          onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                          className="text-base h-12 bg-white border-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="contactPreference" className="text-lg font-semibold">How should volunteers contact you?</Label>
                      <Input
                        id="contactPreference"
                        placeholder="Phone, email, or through app messaging"
                        value={formData.contactPreference}
                        onChange={(e) => handleInputChange("contactPreference", e.target.value)}
                        className="text-base h-12 bg-white border-2"
                      />
                    </div>

                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-primary/5">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-lg text-foreground mb-4 font-semibold">
                        Add a photo (optional)
                      </p>
                      <p className="text-muted-foreground mb-4">
                        A picture can help volunteers better understand your need
                      </p>
                      <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                        Choose File
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    variant="hero"
                    size="lg"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="hero"
                    size="lg"
                    onClick={handleSubmit}
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Share My Need
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}