import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, MessageSquare, Heart, BookOpen, CheckCircle, AlertTriangle, Star, HelpCircle, Phone, Mail, Wrench, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function QuickGuides() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'getting-started';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Quick Start <span className="bg-gradient-primary bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know to get started and make the most of ChurchConnect
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-card border">
            <TabsTrigger value="getting-started" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" />
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4" />
              Safety & Trust
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4" />
              Serving Well
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-4 h-4" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="troubleshooting" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <HelpCircle className="w-4 h-4" />
              Troubleshooting
            </TabsTrigger>
          </TabsList>

          {/* Getting Started Guide */}
          <TabsContent value="getting-started">
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-white">
                      <Heart className="w-5 h-5 text-white" />
                      For Volunteers (Helpers)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          Complete Profile Setup
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">Your profile helps neighbors trust you and understand your abilities.</p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                          <li>• Add a clear, friendly profile photo</li>
                          <li>• List your skills and interests</li>
                          <li>• Include your church affiliation</li>
                          <li>• Write a brief bio about yourself</li>
                          <li>• Verify your contact information</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          Finding & Responding to Needs
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">Discover how you can help your community members.</p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                          <li>• Browse needs by category or location</li>
                          <li>• Read requests carefully before responding</li>
                          <li>• Ask clarifying questions if needed</li>
                          <li>• Be honest about your availability</li>
                          <li>• Set appropriate expectations</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          Your First Volunteer Experience
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">Make a great first impression and feel confident serving.</p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                          <li>• Start with simple, one-time tasks</li>
                          <li>• Arrive on time and prepared</li>
                          <li>• Introduce yourself warmly</li>
                          <li>• Ask how you can best help</li>
                          <li>• Follow up after completing the task</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-white">
                      <Users className="w-5 h-5 text-white" />
                      For Neighbors (Receivers)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          Posting Needs with Dignity
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">Ask for help in a way that honors both you and potential helpers.</p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                          <li>• Be specific about what you need</li>
                          <li>• Explain the situation briefly</li>
                          <li>• Include timeframes and urgency level</li>
                          <li>• Mention any special requirements</li>
                          <li>• Express gratitude in your request</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          Privacy & Safety Options
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">Control who sees your requests and keep your family safe.</p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                          <li>• Choose between public or church-only visibility</li>
                          <li>• Use anonymous posting when appropriate</li>
                          <li>• Set geographical boundaries</li>
                          <li>• Review volunteer profiles before accepting</li>
                          <li>• Keep personal details private initially</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          Coordinating with Volunteers
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">Build positive relationships with those who help you.</p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                          <li>• Respond promptly to volunteer offers</li>
                          <li>• Provide clear directions and expectations</li>
                          <li>• Be available during scheduled times</li>
                          <li>• Communicate changes as soon as possible</li>
                          <li>• Share feedback and gratitude afterwards</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">🌟 Universal Success Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Communication Best Practices</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Be specific in requests - details help volunteers prepare properly</li>
                        <li>• Include realistic timeframes and any special requirements</li>
                        <li>• Respond promptly to messages and confirmations</li>
                        <li>• Keep communication respectful and appreciative</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Building Community</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Remember that your church family wants to support you</li>
                        <li>• Share how help made a difference - it encourages others</li>
                        <li>• Consider how you might help others when able</li>
                        <li>• Trust your instincts and prioritize safety always</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Serving Well for Volunteers */}
          <TabsContent value="volunteers">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-white">
                    <Heart className="w-6 h-6 text-white" />
                    Serving Well - Excellence in Volunteering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <p className="text-lg text-muted-foreground">
                    How to be an excellent volunteer who serves with excellence, joy, and Christ-like love
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">🤝 Reliability & Commitment</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Honor Your Commitments</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Only commit to what you can realistically follow through on</li>
                              <li>• Consider your schedule, energy, and other obligations</li>
                              <li>• It's better to under-promise and over-deliver</li>
                            </ul>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Clear Communication</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Communicate changes as early as possible</li>
                              <li>• Be specific about your availability and limitations</li>
                              <li>• Confirm details before the service opportunity</li>
                            </ul>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Professional Approach</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Arrive on time and prepared with necessary tools</li>
                              <li>• Dress appropriately for the task and setting</li>
                              <li>• Follow through completely on all agreed tasks</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">🛡️ Respecting Privacy & Dignity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                            <h5 className="font-semibold mb-2">Honor House Rules</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Ask about preferences before starting any work</li>
                              <li>• Respect the family's routines and traditions</li>
                              <li>• Follow any specific instructions given</li>
                            </ul>
                          </div>
                          <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                            <h5 className="font-semibold mb-2">Maintain Appropriate Boundaries</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Keep interactions friendly but professional</li>
                              <li>• Avoid personal questions unless invited to share</li>
                              <li>• Respect personal space and belongings</li>
                            </ul>
                          </div>
                          <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                            <h5 className="font-semibold mb-2">Protect Confidentiality</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Keep all personal information strictly confidential</li>
                              <li>• Don't discuss one family's situation with others</li>
                              <li>• Avoid gossip or speculation about circumstances</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">✨ Serving with Joy</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                            <h5 className="font-semibold mb-2">Positive Attitude</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Approach each opportunity with genuine enthusiasm</li>
                              <li>• Focus on the privilege of serving others</li>
                              <li>• Maintain joy even when tasks are challenging</li>
                            </ul>
                          </div>
                          <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                            <h5 className="font-semibold mb-2">Heart Motivation</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Serve from love and compassion, not obligation</li>
                              <li>• See Christ in those you serve</li>
                              <li>• Remember that serving others serves God</li>
                            </ul>
                          </div>
                          <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                            <h5 className="font-semibold mb-2">Representing Christ</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Remember you represent your church and faith</li>
                              <li>• Let your actions demonstrate God's love</li>
                              <li>• Be a positive witness through your service</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">⚖️ Volunteer Ethics & Standards</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Strict Confidentiality</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• What you see and hear stays private</li>
                              <li>• Don't share details even with family members</li>
                              <li>• Protect the dignity of those you serve</li>
                            </ul>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Social Media Guidelines</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Never take photos without explicit permission</li>
                              <li>• Don't post about specific service situations</li>
                              <li>• Keep social media posts general and positive</li>
                            </ul>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">When to Seek Help</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Report any concerning behavior to church leadership</li>
                              <li>• Seek guidance for complex or sensitive situations</li>
                              <li>• Don't handle serious issues alone</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
                    <CardHeader>
                      <CardTitle className="text-white">🌟 Excellence in Action</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Before Serving</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Pray for the family and opportunity</li>
                            <li>• Confirm all details and expectations</li>
                            <li>• Gather necessary tools and supplies</li>
                            <li>• Plan to arrive 5-10 minutes early</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">During Service</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Listen carefully to instructions</li>
                            <li>• Ask questions when unsure</li>
                            <li>• Work efficiently but thoroughly</li>
                            <li>• Be flexible and adaptable</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">After Serving</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Follow up to ensure satisfaction</li>
                            <li>• Offer to help again in the future</li>
                            <li>• Share encouraging feedback</li>
                            <li>• Thank the family for the opportunity</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Safety & Trust */}
          <TabsContent value="safety">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-white">
                    <Shield className="w-6 h-6 text-white" />
                    Safety & Trust Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-4">
                    Creating a safe environment for everyone in our church community
                  </p>
                  <p className="text-base text-muted-foreground mb-8">
                    Safety is foundational to building trust and meaningful connections. These guidelines help ensure that every interaction, whether helping or receiving help, honors Christ and protects the dignity and wellbeing of all community members.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      <Shield className="w-5 h-5 text-white" />
                      Personal Safety First
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Initial Meetings</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Meet in public spaces for first interactions</li>
                        <li>• Bring a friend or family member when possible</li>
                        <li>• Choose well-lit, populated locations</li>
                        <li>• Trust your instincts about people and situations</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Emergency Preparedness</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Keep emergency contacts readily available</li>
                        <li>• Inform others of your service plans and location</li>
                        <li>• Carry a charged phone with you</li>
                        <li>• Know local emergency services numbers</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Transportation Safety</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use your own reliable transportation when possible</li>
                        <li>• Verify ride arrangements in advance</li>
                        <li>• Share travel details with someone you trust</li>
                        <li>• Have backup transportation plans</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      <Users className="w-5 h-5 text-white" />
                      Home & Family Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Respecting Boundaries</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ask about and follow house rules</li>
                        <li>• Respect family routines and traditions</li>
                        <li>• Maintain appropriate physical boundaries</li>
                        <li>• Honor privacy and personal space</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Child Protection Policies</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Parents or guardians must be present</li>
                        <li>• Follow your church's child protection guidelines</li>
                        <li>• Never be alone with children not your own</li>
                        <li>• Report concerns to appropriate authorities</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Property & Belongings</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ask before using or moving items</li>
                        <li>• Handle others' belongings with care</li>
                        <li>• Replace or repair anything damaged</li>
                        <li>• Respect confidential documents or information</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                       <CardTitle className="flex items-center gap-2 text-lg text-white">
                         <BookOpen className="w-5 h-5 text-white" />
                         Church Leadership Support
                       </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">When to Involve Leaders</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Complex family situations</li>
                        <li>• Safety concerns or uncomfortable situations</li>
                        <li>• Conflicts between members</li>
                        <li>• Requests beyond your expertise</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">How to Get Support</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Contact your pastor or church staff</li>
                        <li>• Use designated support channels</li>
                        <li>• Attend volunteer training sessions</li>
                        <li>• Connect with experienced volunteers</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Documentation & Reporting</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Keep records of significant incidents</li>
                        <li>• Report immediately, don't delay</li>
                        <li>• Be factual and objective in reports</li>
                        <li>• Follow up on reported concerns</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Trust Your Instincts - You Have the Right to Feel Safe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive/80 mb-4 text-lg">
                    If something doesn't feel right, it's not only okay but important to decline, leave, or ask for church leadership involvement.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold text-destructive mb-3">Your Rights</h4>
                      <ul className="space-y-2 text-destructive/70">
                        <li>• You are never obligated to help if you feel unsafe</li>
                        <li>• You can leave any situation that makes you uncomfortable</li>
                        <li>• You have the right to ask questions and set boundaries</li>
                        <li>• You can decline requests that exceed your comfort level</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold text-destructive mb-3">Immediate Actions</h4>
                      <ul className="space-y-2 text-destructive/70">
                        <li>• Remove yourself from unsafe situations immediately</li>
                        <li>• Contact church leaders or authorities as needed</li>
                        <li>• Document concerning behavior or incidents</li>
                        <li>• Seek support from trusted friends or counselors</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Communication & Etiquette */}
          <TabsContent value="communication">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-white">
                    <MessageSquare className="w-6 h-6 text-white" />
                    Communication & Etiquette Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <p className="text-lg text-muted-foreground">
                    Master the art of Christ-like communication that builds bridges and strengthens community
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">💬 Clear & Respectful Messaging</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Be Specific & Detailed</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Include exact times, dates, and locations</li>
                              <li>• Specify what help is needed and for how long</li>
                              <li>• Mention any special requirements or limitations</li>
                              <li>• Provide contact information and availability</li>
                            </ul>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Use Encouraging Language</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Choose words that build up and affirm</li>
                              <li>• Express genuine appreciation and gratitude</li>
                              <li>• Avoid language that might shame or embarrass</li>
                              <li>• Focus on strengths and positive outcomes</li>
                            </ul>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h5 className="font-semibold mb-2">Ask Thoughtful Questions</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Clarify expectations before committing</li>
                              <li>• Ask about preferences and requirements</li>
                              <li>• Inquire about timing and scheduling needs</li>
                              <li>• Confirm understanding of the request</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">⏰ Response Times & Reliability</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                            <h5 className="font-semibold mb-2">Timely Responses</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Respond within 24 hours when possible</li>
                              <li>• For urgent requests, respond within 2-4 hours</li>
                              <li>• Set up notifications to not miss messages</li>
                              <li>• Let people know if you'll be away/unavailable</li>
                            </ul>
                          </div>
                          <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                            <h5 className="font-semibold mb-2">Managing Expectations</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Acknowledge all messages, even if you can't help</li>
                              <li>• Be honest about your availability and limitations</li>
                              <li>• Suggest alternatives when you can't assist</li>
                              <li>• Follow through on all commitments made</li>
                            </ul>
                          </div>
                          <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                            <h5 className="font-semibold mb-2">Change Communication</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Communicate changes as soon as you know</li>
                              <li>• Apologize for any inconvenience caused</li>
                              <li>• Offer alternative solutions when possible</li>
                              <li>• Confirm receipt of change notifications</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white">💝 Sample Messages That Work</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="bg-card p-4 rounded-lg border">
                            <h5 className="font-semibold text-primary mb-2">🤝 Offering Help</h5>
                            <p className="text-sm text-muted-foreground italic mb-2">
                              "Hi Sarah! I saw your request for meal delivery. I'd love to bring dinner for your family on Tuesday around 6 PM. Do you have any dietary restrictions or food preferences I should know about? I'm also happy to include paper plates if that would be helpful!"
                            </p>
                          </div>
                          <div className="bg-card p-4 rounded-lg border">
                            <h5 className="font-semibold text-secondary mb-2">📅 Scheduling Coordination</h5>
                            <p className="text-sm text-muted-foreground italic mb-2">
                              "I'm available this Saturday from 9 AM to 3 PM for the yard cleanup. Should I bring my own tools, or do you have what we need? I can also stay later if the work isn't finished. Just let me know what works best for your family!"
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-card p-4 rounded-lg border">
                            <h5 className="font-semibold text-accent mb-2">🙏 Expressing Gratitude</h5>
                            <p className="text-sm text-muted-foreground italic mb-2">
                              "Thank you so much for your help today! The yard looks absolutely amazing, and you've taken such a weight off our shoulders. We're so grateful to be part of a church family that truly cares for one another. Blessings to you and your family!"
                            </p>
                          </div>
                          <div className="bg-card p-4 rounded-lg border">
                            <h5 className="font-semibold text-primary mb-2">❌ Unable to Help</h5>
                            <p className="text-sm text-muted-foreground italic mb-2">
                              "Thanks for thinking of me for the moving help! Unfortunately, I have a prior commitment that Saturday, but I wanted to respond quickly. Have you checked with the Johnson family? They recently helped us move and might be available. Praying someone else can step in!"
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">🎯 Before You Send</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Read your message aloud for tone</li>
                          <li>• Check for all necessary details</li>
                          <li>• Consider the recipient's perspective</li>
                          <li>• Ensure your message shows Christ's love</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">📱 Digital Etiquette</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Use appropriate technology for urgency</li>
                          <li>• Respect people's do-not-disturb hours</li>
                          <li>• Keep group messages relevant to all</li>
                          <li>• Use private messages for personal matters</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">🤗 Building Relationships</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Remember details about families you help</li>
                          <li>• Follow up after completing service</li>
                          <li>• Celebrate successes and milestones</li>
                          <li>• Offer encouragement during difficult times</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Troubleshooting & FAQs */}
          <TabsContent value="troubleshooting">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-white">
                    <HelpCircle className="w-6 h-6 text-white" />
                    Troubleshooting & Technical Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-8">
                    Quick solutions for common issues and how to get help when you need it
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      <Phone className="w-5 h-5 text-white" />
                      Account & Login Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Can't Sign In</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Check your email and password spelling</li>
                        <li>• Try resetting your password</li>
                        <li>• Clear your browser cache and cookies</li>
                        <li>• Try a different browser or device</li>
                        <li>• Contact support if issue persists</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Profile Updates Not Saving</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ensure all required fields are filled</li>
                        <li>• Check your internet connection</li>
                        <li>• Try refreshing the page</li>
                        <li>• Use a supported browser (Chrome, Firefox, Safari)</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Email Notifications Not Working</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Check your spam/junk folder</li>
                        <li>• Verify email address in profile settings</li>
                        <li>• Check notification preferences</li>
                        <li>• Add ChurchConnect to your contacts</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      <Mail className="w-5 h-5 text-white" />
                      Posting & Communication Problems
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Can't Post a Need</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Make sure you're logged in to your account</li>
                        <li>• Check that all required fields are completed</li>
                        <li>• Ensure your description meets community guidelines</li>
                        <li>• Try posting from a different device or browser</li>
                        <li>• Contact support if the problem continues</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Messages Not Sending</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Check your internet connection</li>
                        <li>• Verify the recipient's username</li>
                        <li>• Keep messages under character limits</li>
                        <li>• Avoid special characters or links</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Can't Find Posted Needs</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Check search filters and location settings</li>
                        <li>• Try expanding your search radius</li>
                        <li>• Clear and reset all filters</li>
                        <li>• Refresh the page or try again later</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                       <CardTitle className="flex items-center gap-2 text-lg text-white">
                         <Wrench className="w-5 h-5 text-white" />
                         Technical & Browser Issues
                       </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Page Not Loading Properly</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Refresh the page (Ctrl+F5 or Cmd+R)</li>
                        <li>• Clear browser cache and cookies</li>
                        <li>• Disable browser extensions temporarily</li>
                        <li>• Try using an incognito/private window</li>
                        <li>• Update your browser to the latest version</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Mobile App Issues</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Close and restart the app</li>
                        <li>• Check for app updates in your app store</li>
                        <li>• Restart your device</li>
                        <li>• Ensure you have a stable internet connection</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border space-y-3">
                      <h5 className="font-semibold">Upload Problems (Photos, Documents)</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Check file size (max 10MB per file)</li>
                        <li>• Use supported formats (JPG, PNG, PDF)</li>
                        <li>• Ensure stable internet connection</li>
                        <li>• Try uploading one file at a time</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Clock className="w-5 h-5 text-white" />
                      Quick Self-Help Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Try these steps before contacting support:</p>
                    <div className="space-y-2">
                      {[
                        "Refresh the page or restart the app",
                        "Check your internet connection",
                        "Clear browser cache and cookies",
                        "Try a different browser or device",
                        "Log out and log back in",
                        "Check for browser or app updates"
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-card rounded border">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                       <CardTitle className="flex items-center gap-2 text-white">
                         <AlertCircle className="w-5 h-5 text-white" />
                         When to Contact Support
                       </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Contact our support team if you experience:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Issues that persist after trying self-help steps</li>
                      <li>• Problems with payments or billing</li>
                      <li>• Safety concerns or inappropriate behavior</li>
                      <li>• Data loss or missing information</li>
                      <li>• Account security concerns</li>
                      <li>• Feature requests or suggestions</li>
                    </ul>
                    <div className="mt-4 p-4 bg-card rounded-lg border">
                      <h5 className="font-semibold mb-2">Support Contact Information</h5>
                      <p className="text-sm text-muted-foreground">
                        📧 Email: support@churchconnect.com<br/>
                        📞 Phone: 1-800-CHURCH-1<br/>
                        💬 Live Chat: Available 9 AM - 5 PM EST
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">🔄 System Status & Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Planned Maintenance
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We perform system updates every Sunday from 2-4 AM EST. During this time, some features may be temporarily unavailable.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Known Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Check our status page at status.churchconnect.com for current system issues and estimated resolution times.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Feature Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        New features and improvements are released monthly. Check the "What's New" section in your dashboard.
                      </p>
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
