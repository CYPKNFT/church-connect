import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, MessageSquare, Heart, BookOpen, CheckCircle, AlertTriangle, Star } from "lucide-react";

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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="getting-started" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Volunteers
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Safety
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Communication
            </TabsTrigger>
          </TabsList>

          {/* Getting Started Guide */}
          <TabsContent value="getting-started">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Users className="w-6 h-6 text-accent" />
                    Getting Started Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Learn how to set up your profile and start connecting with your church community
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Step 1: Create Your Profile</h4>
                        <p className="text-muted-foreground">Sign up with your email and join your church community. Add a profile photo and brief bio to help others recognize you.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Step 2: Explore Your Options</h4>
                        <p className="text-muted-foreground">Browse current needs in your community or post your own request for help. Every need matters, big or small.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Step 3: Connect & Serve</h4>
                        <p className="text-muted-foreground">Respond to needs or have others respond to yours. Build meaningful relationships through acts of service.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">Quick Tips</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Be specific when posting needs - details help volunteers prepare</li>
                      <li>• Include timeframes and any special requirements</li>
                      <li>• Don't hesitate to ask for help - your church family wants to support you</li>
                      <li>• Say thank you and share how the help made a difference</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Best Practices for Volunteers */}
          <TabsContent value="volunteers">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Heart className="w-6 h-6 text-accent" />
                    Best Practices for Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Tips for being an effective and trusted volunteer in your community
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <Star className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Be Reliable</h4>
                        <p className="text-muted-foreground">Only commit to what you can follow through on. If plans change, communicate as early as possible.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <Star className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Communicate Clearly</h4>
                        <p className="text-muted-foreground">Ask clarifying questions, confirm details, and keep the requester updated on your availability.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <Star className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Respect Boundaries</h4>
                        <p className="text-muted-foreground">Follow the family's preferences, respect their home and privacy, and maintain appropriate boundaries.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <Star className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Serve with Joy</h4>
                        <p className="text-muted-foreground">Approach each opportunity with a positive attitude and genuine desire to help, not obligation.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">Volunteer Ethics</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Keep personal information and family situations confidential</li>
                      <li>• Don't take photos or share details on social media without permission</li>
                      <li>• If you notice concerning situations, contact church leadership</li>
                      <li>• Remember you're representing your church and faith</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Safety Guidelines */}
          <TabsContent value="safety">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Shield className="w-6 h-6 text-accent" />
                    Safety Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Important safety tips for both those requesting and offering help
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
                      <Shield className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Meet in Public First</h4>
                        <p className="text-muted-foreground">For new connections, consider meeting at church or in public places before home visits.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <Shield className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Let Others Know</h4>
                        <p className="text-muted-foreground">Inform family or friends about your volunteer activities, especially when helping in homes.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <Shield className="w-5 h-5 text-accent mt-0.5" />
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
            </div>
          </TabsContent>

          {/* Communication Etiquette */}
          <TabsContent value="communication">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MessageSquare className="w-6 h-6 text-accent" />
                    Communication Etiquette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    How to communicate effectively and respectfully through the platform
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Be Clear and Specific</h4>
                        <p className="text-muted-foreground">Provide clear details about what you need or what you're offering. Include timeframes, locations, and any special requirements.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Respond Promptly</h4>
                        <p className="text-muted-foreground">Try to respond to messages within 24 hours, even if just to acknowledge receipt and provide a timeline for follow-up.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Use Encouraging Language</h4>
                        <p className="text-muted-foreground">Approach all interactions with grace, kindness, and encouragement. Remember we're all part of the same church family.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Express Gratitude</h4>
                        <p className="text-muted-foreground">Always thank volunteers for their time and help, and share how their service made a difference.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">Sample Messages</h4>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="p-3 bg-white rounded border-l-4 border-accent">
                        <p className="font-medium text-foreground">Offering Help:</p>
                        <p>"Hi! I saw your request for meal delivery. I'd be happy to bring dinner on Tuesday around 6 PM. Do you have any dietary restrictions I should know about?"</p>
                      </div>
                      <div className="p-3 bg-white rounded border-l-4 border-accent">
                        <p className="font-medium text-foreground">Requesting Help:</p>
                        <p>"We could use help with yard work this Saturday morning (9 AM - 12 PM). We have tools available, just need a few strong hands to help with leaves. Coffee and donuts provided!"</p>
                      </div>
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