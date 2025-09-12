import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function PendingApproval() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-card border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Registration Under Review
              </CardTitle>
              <p className="text-muted-foreground">
                Thank you for registering your church with ChurchConnect!
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">
                    What happens next?
                  </h3>
                  <ul className="space-y-2 text-sm text-amber-700">
                    <li>• Our team will review your church registration within 1-3 business days</li>
                    <li>• We may contact you if additional information is needed</li>
                    <li>• You'll receive an email notification once your church is approved</li>
                    <li>• After approval, you can access all ChurchConnect features</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">
                    Questions?
                  </h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Contact our support team if you have any questions about the approval process.
                </p>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-100">
                  <Mail className="w-4 h-4 mr-2" />
                  support@churchconnect.com
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">
                    Need Help?
                  </h4>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Call us during business hours for immediate assistance with your registration.
                </p>
                <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-100">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-4567
                </Button>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/">
                    Return to Home
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}