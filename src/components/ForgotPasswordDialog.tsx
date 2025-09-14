import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

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

      setEmailSent(true);
      toast({
        title: "Reset email sent!",
        description: "Check your inbox (and spam) for a secure reset link.",
      });
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

  const handleClose = () => {
    setEmail("");
    setEmailSent(false);
    onOpenChange(false);
  };

  const handleBackToLogin = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {emailSent ? "Check Your Email" : "Forgot Password"}
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center text-muted-foreground">
              <p>Enter your email and we'll send you a reset link.</p>
            </div>
            
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

            <Button 
              type="submit" 
              disabled={loading || !email} 
              variant="default" 
              size="lg" 
              className="w-full h-12"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToLogin}
                className="text-primary hover:text-primary-hover text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Email Sent Successfully!</h3>
              <p className="text-muted-foreground">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Check your inbox (and spam folder) for the reset link. The link will expire in 60 minutes.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleBackToLogin}
                variant="default" 
                size="lg" 
                className="w-full h-12"
              >
                Back to Sign In
              </Button>
              
              <Button
                onClick={() => setEmailSent(false)}
                variant="ghost"
                className="w-full text-sm"
              >
                Send to different email
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}