import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Users, Crown, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectTo?: string;
  initialMode?: "signin" | "signup";
}

export function AuthDialog({ open, onOpenChange, redirectTo, initialMode = "signin" }: AuthDialogProps) {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [signupType, setSignupType] = useState<"member" | "admin">("member");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedChurch, setSelectedChurch] = useState("");
  const [churchName, setChurchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [churches, setChurches] = useState<Array<{id: string, name: string, city: string, state: string}>>([]);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setSignupType("member");
      setEmail("");
      setPassword("");
      setName("");
      setSelectedChurch("");
      setChurchName("");
      fetchChurches();
    }
  }, [open, initialMode]);

  const fetchChurches = async () => {
    try {
      const { data, error } = await supabase
        .from('churches')
        .select('id, name, city, state')
        .eq('is_verified', true)
        .order('name');
      
      if (error) {
        console.error('Error fetching churches:', error);
        return;
      }
      
      setChurches(data || []);
    } catch (error) {
      console.error('Error fetching churches:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (mode === "signin") {
        result = await signIn(email, password);
      } else {
        if (!name.trim()) {
          toast({
            title: "Missing Information",
            description: "Please enter your full name.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (signupType === "member") {
          if (!selectedChurch) {
            toast({
              title: "Missing Information",
              description: "Please select your church.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
          
          result = await signUp(email, password, {
            name: name.trim(),
            church_id: selectedChurch
          });
        } else {
          // Admin signup - redirect to full registration page
          onOpenChange(false);
          navigate(`/register?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&church=${encodeURIComponent(churchName)}`);
          return;
        }
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        if (mode === "signin") {
          toast({
            title: "Welcome back!",
            description: "You've been signed in successfully.",
          });
          onOpenChange(false);
          
          if (redirectTo) {
            navigate(redirectTo);
          }
        } else {
          onOpenChange(false);
          navigate(`/email-verification?email=${encodeURIComponent(email)}`);
        }
        
        // Reset form
        setEmail("");
        setPassword("");
        setName("");
        setSelectedChurch("");
        setChurchName("");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-0 shadow-2xl bg-white/95 dark:bg-card backdrop-blur-sm [&>.lucide-x]:hidden">
        <DialogHeader className="pb-2">
        </DialogHeader>

        {mode === "signup" ? (
          <Tabs value={signupType} onValueChange={(value) => setSignupType(value as "member" | "admin")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="member" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Join Church
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Register Church
              </TabsTrigger>
            </TabsList>

            <TabsContent value="member" className="space-y-0">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-center mb-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Join Your Church Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with members and serve together</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member-name">Full Name *</Label>
                  <Input
                    id="member-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member-church">Select Your Church *</Label>
                  <Select value={selectedChurch} onValueChange={setSelectedChurch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your church" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg">
                      {churches.map((church) => (
                        <SelectItem key={church.id} value={church.id}>
                          {church.name} - {church.city}, {church.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member-email">Email Address *</Label>
                  <Input
                    id="member-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member-password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="member-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Join Community"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin" className="space-y-0">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-center mb-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Register Your Church</h3>
                  <p className="text-sm text-muted-foreground">Get started with basic info, complete details later</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-name">Your Full Name *</Label>
                  <Input
                    id="admin-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-church">Church Name *</Label>
                  <Input
                    id="admin-church"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    placeholder="Enter your church name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address *</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    <Crown className="w-4 h-4 inline mr-1" />
                    You'll complete your church registration with full details on the next page.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700" 
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue Registration"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="text-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Sign In to Your Account</h3>
              <p className="text-sm text-muted-foreground">Welcome back to ChurchConnect</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signin-email">Email Address *</Label>
              <Input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signin-password">Password *</Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-sm border-t border-border pt-3">
          {mode === "signin" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-primary hover:underline font-medium"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </DialogContent>
      
      <ForgotPasswordDialog 
        open={forgotPasswordOpen} 
        onOpenChange={setForgotPasswordOpen}
      />
    </Dialog>
  );
}
