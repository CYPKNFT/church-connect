import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Users, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function SafetyTrust() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Safety & Trust</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Your Safety <span className="bg-accent-gradient bg-clip-text text-transparent">Matters</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building trust and maintaining safety in our church community through clear guidelines and best practices
          </p>
        </div>

        {/* Quick Safety Guide */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Shield className="w-6 h-6 text-accent" />
              Quick Safety Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Essential safety tips for everyone using ChurchConnect
            </p>
            
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-700">Trust Your Instincts</h4>
                  <p className="text-red-600">If something doesn't feel right, it's okay to decline or ask for church leadership involvement.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Meet in Public First</h4>
                  <p className="text-muted-foreground">For new connections, consider meeting at church or in public places before home visits.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Let Others Know</h4>
                  <p className="text-muted-foreground">Inform family or friends about your volunteer activities, especially when helping in homes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Emergency Contacts</h4>
                  <p className="text-muted-foreground">Keep emergency contacts handy and know who to call if you need help or have concerns.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-primary mb-2">When Working with Children</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Parents should always be present during childcare help</li>
                <li>• Follow your church's child protection policies</li>
                <li>• Avoid one-on-one situations with children who aren't your own</li>
                <li>• Report any concerns to church leadership immediately</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Safety Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Personal Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Guidelines for meeting new people, home visits, and maintaining personal boundaries in volunteer situations.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/guides?tab=safety">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Home & Family Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Best practices for helping in homes, respecting privacy, and maintaining appropriate boundaries with families.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/guides?tab=safety">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Church Leadership Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                When and how to involve church leaders, escalation procedures, and getting support when you need it.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/guides?tab=safety">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need Help or Have Concerns?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Don't hesitate to reach out to church leadership or our support team if you have any safety concerns or questions about volunteer activities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/profile">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/all-guides">View All Guides</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}