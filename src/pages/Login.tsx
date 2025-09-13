import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Heart } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-card border-0 backdrop-blur-sm bg-card">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-gradient rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground">
                Sign in to continue serving your community
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@church.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-muted border-muted text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 pr-12 bg-muted border-muted text-foreground placeholder:text-muted-foreground"
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

              <div className="flex items-center justify-start text-sm">
                <Link 
                  to="/forgot-password" 
                  className="text-accent hover:text-accent-hover font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-accent hover:text-accent-hover font-medium"
                >
                  Join our community
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            By signing in, you agree to our community guidelines of love, respect, and service.
          </p>
        </div>
      </div>
    </div>
  );
}