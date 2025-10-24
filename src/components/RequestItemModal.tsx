import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Home, MessageSquare, Truck, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RequestItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    title: string;
    images: string[];
  };
  onSubmit: () => void;
}

export default function RequestItemModal({ open, onOpenChange, item, onSubmit }: RequestItemModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    householdSize: "",
    livingSituation: "",
    needExplanation: "",
    urgencyLevel: "",
    additionalInfo: "",
    transportation: "",
    pickupTimes: "",
    heavyLiftingHelp: "",
    confirmCommitments: false
  });

  const [charCounts, setCharCounts] = useState({
    needExplanation: 0,
    additionalInfo: 0,
    heavyLiftingHelp: 0
  });

  const handleTextareaChange = (field: string, value: string, maxLength: number) => {
    if (value.length <= maxLength) {
      setFormData(prev => ({ ...prev, [field]: value }));
      setCharCounts(prev => ({ ...prev, [field]: value.length }));
    }
  };

  const handleUrgencySelect = (urgency: string) => {
    setFormData(prev => ({ ...prev, urgencyLevel: urgency }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.householdSize || !formData.livingSituation || !formData.needExplanation || 
        !formData.urgencyLevel || !formData.transportation || !formData.pickupTimes || 
        !formData.confirmCommitments) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit();
    onOpenChange(false);
    
    // Reset form
    setFormData({
      householdSize: "",
      livingSituation: "",
      needExplanation: "",
      urgencyLevel: "",
      additionalInfo: "",
      transportation: "",
      pickupTimes: "",
      heavyLiftingHelp: "",
      confirmCommitments: false
    });
    setCharCounts({
      needExplanation: 0,
      additionalInfo: 0,
      heavyLiftingHelp: 0
    });
  };

  const urgencyOptions = [
    {
      value: "no-rush",
      label: "No Rush",
      description: "Would be nice to have"
    },
    {
      value: "moderate", 
      label: "Moderate",
      description: "Need within a month"
    },
    {
      value: "urgent",
      label: "Urgent", 
      description: "Need very soon"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 pr-3 bg-card border border-border text-foreground">
        {/* Header */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-foreground mb-1">
                Request: {item.title}
              </DialogTitle>
              <p className="text-muted-foreground">Complete this application to express your interest</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pr-3 space-y-6">
          {/* Community Values Banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-foreground text-sm leading-relaxed">
              <strong>Our Community Values:</strong> We believe in treating everyone with dignity and respect. This 
              application helps us connect items with families who will benefit most. All communication will 
              happen securely within the ChurchConnect platform.
            </p>
          </div>

          {/* Household Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-foreground">Household Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="householdSize" className="text-muted-foreground">Household Size</Label>
                <Select value={formData.householdSize} onValueChange={(value) => setFormData(prev => ({ ...prev, householdSize: value }))}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="just-me">Just me</SelectItem>
                    <SelectItem value="2-people">2 people</SelectItem>
                    <SelectItem value="3-people">3 people</SelectItem>
                    <SelectItem value="4-people">4 people</SelectItem>
                    <SelectItem value="5-people">5 people</SelectItem>
                    <SelectItem value="6-plus">6+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="livingSituation" className="text-muted-foreground">Current Living Situation</Label>
                <Select value={formData.livingSituation} onValueChange={(value) => setFormData(prev => ({ ...prev, livingSituation: value }))}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="own-home">Own home</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="staying-family">Staying with family/friends</SelectItem>
                    <SelectItem value="transitional">Transitional housing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Your Need & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-foreground">Your Need & Story</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="needExplanation" className="text-muted-foreground">
                Why do you need this item? <span className="text-red-400">*</span>
              </Label>
                <Textarea
                  id="needExplanation"
                  placeholder="Share your situation and how this item would help your family. Be as specific as you're comfortable with - this helps givers understand the impact of their donation."
                  value={formData.needExplanation}
                  onChange={(e) => handleTextareaChange("needExplanation", e.target.value, 500)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[100px] resize-none focus:outline-none focus:ring-0 focus:border-border"
                />
              <div className="text-right text-sm text-muted-foreground">
                {charCounts.needExplanation} / 500 characters
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-muted-foreground">How urgently do you need this item?</Label>
              <div className="grid grid-cols-3 gap-3">
                {urgencyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleUrgencySelect(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      formData.urgencyLevel === option.value
                        ? "border-accent bg-accent/20 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40"
                    }`}
                  >
                    <div className="font-semibold mb-1">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-muted-foreground">
                Is there anything else you'd like the giver to know?
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Optional: Share your story, express gratitude, or mention any special circumstances..."
                value={formData.additionalInfo}
                onChange={(e) => handleTextareaChange("additionalInfo", e.target.value, 300)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[80px] resize-none focus:outline-none focus:ring-0 focus:border-border"
              />
              <div className="text-right text-sm text-muted-foreground">
                {charCounts.additionalInfo} / 300 characters
              </div>
            </div>
          </div>

          {/* Pickup & Logistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-foreground">Pickup & Logistics</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transportation" className="text-muted-foreground">
                  Transportation available? <span className="text-red-400">*</span>
                </Label>
                <Select value={formData.transportation} onValueChange={(value) => setFormData(prev => ({ ...prev, transportation: value }))}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="yes-pickup">Yes I can pickup</SelectItem>
                    <SelectItem value="need-transport">Need help with transport</SelectItem>
                    <SelectItem value="need-delivery">Need delivery assistance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupTimes" className="text-muted-foreground">Best times for pickup coordination</Label>
                <Select value={formData.pickupTimes} onValueChange={(value) => setFormData(prev => ({ ...prev, pickupTimes: value }))}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="weekday-morning">Weekday mornings</SelectItem>
                    <SelectItem value="weekday-afternoon">Weekday afternoons</SelectItem>
                    <SelectItem value="weekday-evening">Weekday evenings</SelectItem>
                    <SelectItem value="weekend-morning">Weekend mornings</SelectItem>
                    <SelectItem value="weekend-afternoon">Weekend afternoons</SelectItem>
                    <SelectItem value="flexible">Flexible schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heavyLiftingHelp" className="text-muted-foreground">
                Do you have help for loading/moving heavy items?
              </Label>
              <Textarea
                id="heavyLiftingHelp"
                placeholder="Let us know if you'll need assistance with heavy lifting or if you're bringing help..."
                value={formData.heavyLiftingHelp}
                onChange={(e) => handleTextareaChange("heavyLiftingHelp", e.target.value, 200)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[60px] resize-none focus:outline-none focus:ring-0 focus:border-border"
              />
              <div className="text-right text-sm text-muted-foreground">
                {charCounts.heavyLiftingHelp} / 200 characters
              </div>
            </div>
          </div>

          {/* Commitments */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-foreground">Commitments</h3>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border/60">
              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full mt-2 flex-shrink-0"></div>
                <span>This item is for my personal/family use and will not be sold or resold</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full mt-2 flex-shrink-0"></div>
                <span>I am applying in good faith and have provided honest information</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full mt-2 flex-shrink-0"></div>
                <span>I will communicate promptly and respectfully throughout this process</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full mt-2 flex-shrink-0"></div>
                <span>I'm open to sharing a brief thank you or update on how the item helped (optional)</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmCommitments"
                checked={formData.confirmCommitments}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, confirmCommitments: !!checked }))}
                className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="confirmCommitments" className="text-foreground">
                I confirm the above commitments <span className="text-destructive">*</span>
              </Label>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Privacy & Information Use:</strong> Your application information will be shared with the item giver to help 
              them make their decision. All communication happens securely within the ChurchConnect platform to 
              protect your privacy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}