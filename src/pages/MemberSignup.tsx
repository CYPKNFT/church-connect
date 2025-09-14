import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Heart, Crown, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function MemberSignup() {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [churches, setChurches] = useState<any[]>([]);
  const [loadingChurches, setLoadingChurches] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    church_id: "",
    bio: ""
  });

  // Fetch churches for the dropdown
  useEffect(() => {
    const fetchChurches = async () => {
      try {
        const { data, error } = await supabase
          .from('Churches')
          .select('id, name, city, state')
          .eq('is_verified', true)
          .order('name');
        
        if (error) throw error;
        setChurches(data || []);
      } catch (error) {
        console.error('Error fetching churches:', error);
        toast({
          title: "Error",
          description: "Failed to load churches. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingChurches(false);
      }
    };

    fetchChurches();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.email || !formData.password || !formData.church_id) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Sign up the user
      const result = await signUp(formData.email, formData.password, {
        name: formData.name,
        church_id: formData.church_id,
        bio: formData.bio,
        phone: formData.phone
      });

      if (result.error) {
        toast({
          title: "Sign Up Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Check your email!",
          description: "We sent you a confirmation link to complete your registration.",
        });
        navigate("/email-verification");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-card border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center space-y-4 relative">
            {/* Compact church leader option in top right */}
            <div className="absolute top-4 right-4">
              <Link to="/register">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                  <Crown className="w-3 h-3 mr-1" />
                  Church Leader?
                </Button>
              </Link>
            </div>
            
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Join Our Community
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Connect with your church and serve your community
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Personal Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Church Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Church Membership
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="church" className="text-sm font-medium">
                    Select Your Church *
                  </Label>
                  {loadingChurches ? (
                    <div className="h-11 bg-muted animate-pulse rounded-md" />
                  ) : (
                    <Select 
                      value={formData.church_id} 
                      onValueChange={(value) => setFormData({ ...formData, church_id: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Choose your church" />
                      </SelectTrigger>
                      <SelectContent>
                        {churches.map((church) => (
                          <SelectItem key={church.id} value={church.id}>
                            {church.name} - {church.city}, {church.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    About You (Optional)
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your church community a bit about yourself, your interests, or how you'd like to serve..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Account Security
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-11 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-11 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || loadingChurches}
                className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium"
              >
                {isLoading ? "Creating Account..." : "Join Community"}
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-accent hover:text-accent-hover font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            By joining, you agree to our community guidelines of love, respect, and service.
          </p>
        </div>
      </div>
    </div>
  );
}