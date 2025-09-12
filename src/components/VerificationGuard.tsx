import { useAuth } from '@/contexts/AuthContext';
import { useChurchVerification } from '@/hooks/useChurchVerification';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Mail, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface VerificationGuardProps {
  children: React.ReactNode;
}

export function VerificationGuard({ children }: VerificationGuardProps) {
  const { user, loading: authLoading } = useAuth();
  const { isVerified, loading: verificationLoading, isChurchAdmin, church } = useChurchVerification();

  if (authLoading || verificationLoading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Please sign in to access this feature.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isChurchAdmin && !isVerified) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-card border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  Church Verification Pending
                </CardTitle>
                <p className="text-muted-foreground">
                  Your church "{church?.name}" is currently under review
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">
                      Verification in Progress
                    </h3>
                    <p className="text-amber-700 mb-4">
                      Thank you for registering your church with ChurchConnect. Our team is currently reviewing your registration to ensure the safety and authenticity of our community.
                    </p>
                    <div className="text-sm text-amber-600">
                      <p className="font-medium mb-2">What you can expect:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Review typically takes 1-3 business days</li>
                        <li>• You'll receive an email once approved</li>
                        <li>• Access to all features after verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">
                    Need Assistance?
                  </h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  If you have questions about the verification process or need to update your registration information, please contact our support team.
                </p>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-100">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>

              <div className="border-t border-border pt-6 text-center">
                <Button variant="outline" asChild>
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Return to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}