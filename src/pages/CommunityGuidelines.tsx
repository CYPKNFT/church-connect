import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Heart, 
  MessageSquare, 
  HandHeart, 
  AlertTriangle, 
  Flag, 
  Crown,
  CheckCircle,
  XCircle,
  Phone,
  Mail
} from "lucide-react";

export default function CommunityGuidelines() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white/10 to-secondary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Community Guidelines
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Building a Safe & Caring Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These guidelines help us create a welcoming space where church communities can connect, serve, and care for one another with love and respect.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Reference */}
        <section className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Quick Reference Guide
              </CardTitle>
              <CardDescription>Essential guidelines for community participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">✓ DO</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Treat all members with Christ-like love and respect</li>
                    <li>• Share genuine needs and offer authentic help</li>
                    <li>• Communicate clearly and kindly</li>
                    <li>• Protect privacy and personal information</li>
                    <li>• Follow through on commitments</li>
                    <li>• Report concerning behavior</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">✗ DON'T</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use inappropriate, offensive, or divisive language</li>
                    <li>• Post commercial advertisements or spam</li>
                    <li>• Share false information or misleading content</li>
                    <li>• Pressure others or make unreasonable demands</li>
                    <li>• Share personal details of others without permission</li>
                    <li>• Engage in political debates or controversial topics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Community Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide our interactions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Love & Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We approach every interaction with genuine care, understanding that everyone faces challenges and deserves kindness.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Safety & Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We prioritize the safety and wellbeing of all community members, especially children and vulnerable individuals.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <HandHeart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Authentic Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We serve others with genuine hearts, offering help freely and accepting assistance gracefully.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Communication Guidelines */}
        <section className="mb-16 bg-gradient-to-r from-white/10 to-secondary/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Communication Guidelines</h2>
            <p className="text-lg text-muted-foreground">How to interact respectfully and effectively</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Posting Needs & Offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Be specific:</strong> Clearly describe what you need or what you're offering</p>
                <p><strong>Be honest:</strong> Only post genuine needs and authentic offers of help</p>
                <p><strong>Be timely:</strong> Update or remove posts when needs are met</p>
                <p><strong>Be grateful:</strong> Thank those who offer help, even if you don't need it</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Responding & Messaging</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Be prompt:</strong> Respond to messages in a timely manner</p>
                <p><strong>Be kind:</strong> Use encouraging and supportive language</p>
                <p><strong>Be clear:</strong> Communicate availability and limitations honestly</p>
                <p><strong>Be respectful:</strong> Honor others' time and boundaries</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Safety & Trust Standards</h2>
            <p className="text-lg text-muted-foreground">Protecting our community members</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Personal Safety</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Always meet in public places for first meetings</p>
                <p>• Let someone know where you're going and when you'll return</p>
                <p>• Trust your instincts - if something feels wrong, it probably is</p>
                <p>• Never share sensitive personal information publicly</p>
                <p>• Use the platform's messaging system initially</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Child Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Background checks required for child-related services</p>
                <p>• Parents must always be present during child interactions</p>
                <p>• Never photograph or post images of children without permission</p>
                <p>• Report any concerning behavior immediately</p>
                <p>• Follow your church's established child protection policies</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Content Moderation */}
        <section className="mb-16 bg-gradient-to-r from-white/10 to-secondary/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Content Moderation</h2>
            <p className="text-lg text-muted-foreground">What's not allowed and consequences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Prohibited Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>• Hate speech, discrimination, or harassment</p>
                <p>• Inappropriate sexual content or language</p>
                <p>• Violence, threats, or intimidation</p>
                <p>• Commercial advertising or spam</p>
                <p>• False information or scams</p>
                <p>• Political campaigning or divisive content</p>
                <p>• Illegal activities or substance abuse</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="w-5 h-5 text-orange-600" />
                  Consequences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>First Warning:</strong> Content removal + education</p>
                <p><strong>Second Warning:</strong> Temporary account restriction</p>
                <p><strong>Serious Violations:</strong> Immediate suspension</p>
                <p><strong>Repeated Violations:</strong> Permanent ban</p>
                <p><strong>Illegal Activity:</strong> Reported to authorities</p>
                <p>All decisions can be appealed through our support team</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Church Leadership Role */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Church Leadership Guidelines</h2>
            <p className="text-lg text-muted-foreground">Special responsibilities for church leaders</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Leadership Responsibilities</h4>
                  <ul className="space-y-2">
                    <li>• Model Christ-like behavior in all interactions</li>
                    <li>• Moderate and guide community discussions</li>
                    <li>• Verify and approve volunteer activities</li>
                    <li>• Address conflicts with wisdom and grace</li>
                    <li>• Protect vulnerable community members</li>
                    <li>• Maintain confidentiality when appropriate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Best Practices</h4>
                  <ul className="space-y-2">
                    <li>• Regular check-ins with active volunteers</li>
                    <li>• Clear communication of church policies</li>
                    <li>• Prompt response to concerns or reports</li>
                    <li>• Coordination with other church leadership</li>
                    <li>• Documentation of important decisions</li>
                    <li>• Ongoing training and education</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Reporting & Support */}
        <section className="mb-16 bg-gradient-to-r from-white/10 to-secondary/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Flag className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Reporting & Getting Help</h2>
            <p className="text-lg text-muted-foreground">How to report concerns and get support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">For immediate danger or illegal activity</p>
                <Button variant="destructive" className="w-full">
                  Call 911
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Flag className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Report Content</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">For inappropriate content or behavior</p>
                <Button variant="outline" className="w-full">
                  Use Report Button
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">For questions or concerns</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/help">Get Help</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Questions or Concerns?</h3>
              <p className="text-muted-foreground mb-6">
                We're here to help create a safe and loving community. Don't hesitate to reach out if you need assistance or have feedback about these guidelines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/help">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/safety-trust">Safety Resources</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}