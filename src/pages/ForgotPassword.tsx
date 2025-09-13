import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Heart, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        const msg = String(error.message || "");
        const isRedirectError =
          msg.toLowerCase().includes("redirect") ||
          msg.toLowerCase().includes("url") ||
          msg.toLowerCase().includes("allowed");

        if (isRedirectError) {
          toast({
            title: "Action needed in Supabase",
            description: `Add this URL to Auth > URL Configuration > Redirect URLs: ${redirectTo}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Couldn't send reset email",
            description: error.message ?? "Please try again or contact support.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "If the email exists, we sent a link",
        description: "Check your inbox (and spam) for a secure reset link.",
      });
      // Optionally navigate to a confirmation page later; for now stay here
    } catch (err: any) {
      const msg = err?.message ?? "Please try again or contact support.";
      toast({
        title: "Couldn't send reset email",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-card border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Forgot Password
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Enter your email and we'll send you a reset link.
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@church.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} variant="hero" size="lg" className="w-full h-12">
                {loading ? "Sending..." : "Send reset link"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <CheckCircle2 className="inline-block w-4 h-4 mr-1 text-accent" />
                Make sure your email is registered with your account.
              </div>

              <div className="flex justify-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-primary hover:text-primary-hover text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back to login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
