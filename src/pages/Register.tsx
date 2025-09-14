import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Crown, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    churchName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
    denomination: "",
    membershipSize: "",
    position: "",
    yearsInMinistry: "",
    description: ""
  });

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
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.churchName || !formData.address || !formData.city || 
          !formData.state || !formData.zipCode || !formData.membershipSize || 
          !formData.position || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Create user account first
      const redirectUrl = `${window.location.origin}/`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: `${formData.firstName} ${formData.lastName}`,
            position: formData.position
          }
        }
      });

      if (authError) {
        toast({
          title: "Authentication Error",
          description: authError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        toast({
          title: "Error",
          description: "Failed to create user account.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Store pending church registration to complete after email verification
      const pending = {
        church: {
          name: formData.churchName,
          address: formData.address,
          address_line2: '',
          city: formData.city,
          state: formData.state,
          postal_code: formData.zipCode,
          admin_email: formData.email,
          member_count: 1
        },
        admin: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || null,
          bio: formData.description || null
        },
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('pending_church_registration', JSON.stringify(pending));

      toast({
        title: "Confirm your email to continue",
        description: "We sent you a confirmation link. After you verify and log in, we'll finish creating your church automatically.",
      });

      // Redirect to pending approval page while we wait for confirmation
      navigate('/pending-approval');

      return;

      toast({
        title: "Registration Submitted!",
        description: "Your church registration has been submitted for review. You'll be notified once it's approved.",
      });

      // Redirect to pending approval page
      navigate('/pending-approval');

    } catch (error: any) {
      console.error('Registration error:', error);
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
            {/* Compact member signup option in top right */}
            <div className="absolute top-4 right-4">
              <Link to="/member-signup">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                  <Users className="w-3 h-3 mr-1" />
                  Just joining?
                </Button>
              </Link>
            </div>
            
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Register Your Church
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Join ChurchConnect as a church administrator and empower your community
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
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
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

              {/* Church Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Church Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="churchName" className="text-sm font-medium">
                    Church Name *
                  </Label>
                  <Input
                    id="churchName"
                    placeholder="First Baptist Church"
                    value={formData.churchName}
                    onChange={(e) => setFormData({ ...formData, churchName: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Dallas"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State *
                    </Label>
                    <Input
                      id="state"
                      placeholder="TX"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-sm font-medium">
                      ZIP Code *
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="75201"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      Church Website
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://www.yourchurch.org"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="denomination" className="text-sm font-medium">
                      Denomination
                    </Label>
                    <Input
                      id="denomination"
                      placeholder="Baptist, Methodist, Presbyterian, etc."
                      value={formData.denomination}
                      onChange={(e) => setFormData({ ...formData, denomination: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="membershipSize" className="text-sm font-medium">
                    Approximate Membership Size *
                  </Label>
                  <Select value={formData.membershipSize} onValueChange={(value) => setFormData({ ...formData, membershipSize: value })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select membership size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-100">Under 100 members</SelectItem>
                      <SelectItem value="100-500">100-500 members</SelectItem>
                      <SelectItem value="500-1000">500-1,000 members</SelectItem>
                      <SelectItem value="1000-2500">1,000-2,500 members</SelectItem>
                      <SelectItem value="over-2500">Over 2,500 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Leadership Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Leadership Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium">
                      Your Position/Title *
                    </Label>
                    <Input
                      id="position"
                      placeholder="Senior Pastor, Lead Pastor, Executive Pastor, etc."
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsInMinistry" className="text-sm font-medium">
                      Years in Ministry
                    </Label>
                    <Input
                      id="yearsInMinistry"
                      type="number"
                      placeholder="15"
                      value={formData.yearsInMinistry}
                      onChange={(e) => setFormData({ ...formData, yearsInMinistry: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    About Your Church (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your church's mission, community outreach, or special programs..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                variant="hero" 
                size="lg" 
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register Church"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            By registering your church, you agree to our community guidelines and platform terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}