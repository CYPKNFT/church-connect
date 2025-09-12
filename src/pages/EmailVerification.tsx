import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, RefreshCw, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if this is a confirmation callback
  const hasConfirmationParams = searchParams.has('access_token') || searchParams.has('token_hash');

  useEffect(() => {
    // If user is already verified and we're not handling a confirmation, redirect
    if (user && user.email_confirmed_at && !hasConfirmationParams) {
      navigate('/dashboard');
      return;
    }

    // Get email from URL params or current user
    const emailFromParams = searchParams.get('email');
    const userEmail = user?.email;
    
    if (emailFromParams) {
      setEmail(emailFromParams);
    } else if (userEmail) {
      setEmail(userEmail);
    }

    // Handle email confirmation callback
    if (hasConfirmationParams) {
      handleEmailConfirmation();
    }
  }, [user, searchParams, navigate, hasConfirmationParams]);

  const handleEmailConfirmation = async () => {
    try {
      // The auth state change will be handled by the AuthContext
      // Just show success message and redirect after a moment
      setIsVerified(true);
      
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified. Redirecting to dashboard...",
      });

      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Email confirmation error:', error);
      toast({
        title: "Verification Error",
        description: "There was an issue verifying your email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email address found. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/email-verification`
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Verification Email Sent",
        description: "We've sent another verification email to your inbox.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Email Verified!</CardTitle>
            <CardDescription>
              Your email has been successfully verified. You'll be redirected to your dashboard shortly.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a verification email to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Click the verification link in your email to activate your account.</p>
            <p>The email might take a few minutes to arrive. Don't forget to check your spam folder!</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResendVerification}
              disabled={isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              Already verified?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}