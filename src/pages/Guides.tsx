import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, MessageSquare, Heart, BookOpen, CheckCircle, AlertTriangle, Star, HelpCircle } from "lucide-react";

export default function Guides() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Quick Start <span className="bg-accent-gradient bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know to get started and make the most of ChurchConnect
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="getting-started" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Safety & Trust
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Serving Well
            </TabsTrigger>
            <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Troubleshooting
            </TabsTrigger>
          </TabsList>

          {/* Getting Started Guide */}
          <TabsContent value="getting-started">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Heart className="w-5 h-5 text-accent" />
                      For Volunteers (Helpers)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <div>
                          <h5 className="font-medium">Profile Setup</h5>
                          <p className="text-sm text-muted-foreground">Create a complete profile with photo and skills</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <div>
                          <h5 className="font-medium">Finding Needs</h5>
                          <p className="text-sm text-muted-foreground">Browse and respond to community requests</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <div>
                          <h5 className="font-medium">First Serve</h5>
                          <p className="text-sm text-muted-foreground">Tips for your first volunteer experience</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Users className="w-5 h-5 text-accent" />
                      For Neighbors (Receivers)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <div>
                          <h5 className="font-medium">Posting with Dignity</h5>
                          <p className="text-sm text-muted-foreground">How to ask for help respectfully and clearly</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <div>
                          <h5 className="font-medium">Privacy Options</h5>
                          <p className="text-sm text-muted-foreground">Control who sees your requests</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <div>
                          <h5 className="font-medium">Responding to Help</h5>
                          <p className="text-sm text-muted-foreground">How to coordinate with volunteers effectively</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-2">Universal Quick Tips</h4>
                <ul className="space-y-2 text-muted-foreground grid md:grid-cols-2 gap-2">
                  <li>• Be specific when posting needs - details help volunteers prepare</li>
                  <li>• Include timeframes and any special requirements</li>
                  <li>• Don't hesitate to ask for help - your church family wants to support you</li>
                  <li>• Say thank you and share how the help made a difference</li>
                  <li>• Trust your instincts and prioritize safety</li>
                  <li>• Communicate clearly and respond promptly</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Serving Well for Volunteers */}
          <TabsContent value="volunteers">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Heart className="w-6 h-6 text-accent" />
                    Serving Well - For Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    How to be an excellent volunteer who serves with excellence and joy
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Reliability & Commitment</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Only commit to what you can follow through on</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Communicate changes as early as possible</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Arrive on time and prepared</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Respecting Privacy & Dignity</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Follow the family's preferences and house rules</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Maintain appropriate boundaries</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Keep personal information confidential</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Serving with Joy</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Approach each opportunity with a positive attitude</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Serve from love, not obligation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Remember you represent your church and faith</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Volunteer Ethics</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Maintain strict confidentiality</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">No photos or social media sharing without permission</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Report concerns to church leadership</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Safety & Trust */}
          <TabsContent value="safety">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-accent" />
                      Personal Safety
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Meeting New People</p>
                      <p className="text-xs text-muted-foreground">Meet in public first, bring a friend when possible</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Emergency Contacts</p>
                      <p className="text-xs text-muted-foreground">Keep contacts handy, inform others of your plans</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-accent" />
                      Home & Family Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Respect Boundaries</p>
                      <p className="text-xs text-muted-foreground">Follow house rules, maintain appropriate limits</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Child Protection</p>
                      <p className="text-xs text-muted-foreground">Parents present, follow church policies</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="w-5 h-5 text-accent" />
                      Church Leadership Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">When to Involve Leaders</p>
                      <p className="text-xs text-muted-foreground">Concerns, conflicts, or complex situations</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">How to Get Support</p>
                      <p className="text-xs text-muted-foreground">Contact church staff or use support channels</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Trust Your Instincts</h4>
                    <p className="text-red-600 mb-3">If something doesn't feel right, it's okay to decline or ask for church leadership involvement.</p>
                    <ul className="space-y-1 text-red-600 text-sm">
                      <li>• You are never obligated to help if you feel unsafe</li>
                      <li>• Church leaders are there to support and guide you</li>
                      <li>• Report any concerning behavior immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Communication & Etiquette */}
          <TabsContent value="communication">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MessageSquare className="w-6 h-6 text-accent" />
                    Communication & Etiquette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    How to communicate effectively and build positive relationships
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Clear, Respectful Messaging</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Be specific about needs, times, and locations</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Use kind, encouraging language</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Ask clarifying questions when needed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Response Times & Expectations</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Respond within 24 hours when possible</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Acknowledge messages even if you can't help</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-accent mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">Communicate changes as soon as possible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Encouraging Language & Gratitude</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h5 className="font-medium text-primary mb-2">Sample: Offering Help</h5>
                        <p className="text-sm text-muted-foreground italic">
                          "Hi! I saw your request for meal delivery. I'd be happy to bring dinner on Tuesday around 6 PM. Do you have any dietary restrictions I should know about?"
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h5 className="font-medium text-primary mb-2">Sample: Requesting Help</h5>
                        <p className="text-sm text-muted-foreground italic">
                          "We could use help with yard work this Saturday morning (9 AM - 12 PM). We have tools available, just need a few strong hands! Coffee and donuts provided."
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Troubleshooting & FAQs */}
          <TabsContent value="troubleshooting">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <HelpCircle className="w-6 h-6 text-accent" />
                    Troubleshooting & FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Common questions and solutions for using ChurchConnect effectively
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Common Issues</h4>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-2">What if help doesn't arrive?</h5>
                          <p className="text-sm text-muted-foreground">
                            Contact the volunteer first, then reach out to church leadership if needed. Always have a backup plan for urgent needs.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-2">How to decline help politely?</h5>
                          <p className="text-sm text-muted-foreground">
                            "Thank you so much for offering! We actually found another solution, but I really appreciate your willingness to help."
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">When to Escalate</h4>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-2">Concerning behavior</h5>
                          <p className="text-sm text-muted-foreground">
                            If you notice inappropriate behavior, safety concerns, or boundary violations, contact church leadership immediately.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium text-foreground mb-2">Escalation paths</h5>
                          <p className="text-sm text-muted-foreground">
                            Church staff → Pastor → Support team. Use the contact support feature for technical issues.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                    <h4 className="font-semibold text-accent mb-3">Still Need Help?</h4>
                    <p className="text-muted-foreground mb-4">
                      Can't find the answer you're looking for? Our support team and church leadership are here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild>
                        <a href="/profile">Contact Support</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/safety-trust">View Safety Guidelines</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}