import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Church, Users, BookOpen, Shield, BarChart3, Settings, Download, Video, MessageSquare, CheckCircle, Crown, Award } from "lucide-react";

export default function Churches() {
  const [activeTab, setActiveTab] = useState("overview");

  const resources = [
    {
      id: 1,
      title: "Getting Started Guide for Church Leaders",
      description: "Complete setup guide for launching ChurchConnect in your church community.",
      type: "PDF Guide",
      downloadUrl: "#",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Safety & Trust Best Practices",
      description: "Essential guidelines for maintaining a safe and trusted church community platform.",
      type: "PDF Document",
      downloadUrl: "#",
      icon: Shield
    },
    {
      id: 3,
      title: "ChurchConnect Training Video",
      description: "30-minute training video for church staff and volunteer coordinators.",
      type: "Video",
      downloadUrl: "#",
      icon: Video
    },
    {
      id: 4,
      title: "Monthly Impact Report Template",
      description: "Track and share the impact of your church's community service efforts.",
      type: "Template",
      downloadUrl: "#",
      icon: BarChart3
    }
  ];

  const caseStudies = [
    {
      id: 1,
      church: "Grace Community Church",
      location: "Austin, TX",
      members: 850,
      needsFulfilled: 240,
      monthsActive: 18,
      testimonial: "ChurchConnect has transformed how our congregation connects and serves. We've seen a 300% increase in community service participation.",
      pastor: "Pastor Michael Roberts",
      highlight: "300% increase in service participation"
    },
    {
      id: 2,
      church: "First Baptist Church",
      location: "Denver, CO",
      members: 1200,
      needsFulfilled: 420,
      monthsActive: 24,
      testimonial: "The platform has helped us identify and mobilize volunteers in ways we never could before. Our elderly care ministry has flourished.",
      pastor: "Pastor Sarah Johnson",
      highlight: "Elder care ministry flourishing"
    },
    {
      id: 3,
      church: "Community Fellowship",
      location: "Nashville, TN",
      members: 650,
      needsFulfilled: 180,
      monthsActive: 12,
      testimonial: "We've built stronger relationships and reached more families in need than ever before. It's been a blessing to our community.",
      pastor: "Pastor David Chen",
      highlight: "Reaching more families in need"
    }
  ];

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-8">
            <Church className="w-5 h-5" />
            <span>For Church Leaders</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Empower Your <span className="bg-accent-gradient bg-clip-text text-transparent">Church Community</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Resources, tools, and support to help church leaders launch and manage successful community connection programs.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Crown className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Church Administrator Login</h3>
              <p className="text-muted-foreground mb-6">Access your church's dashboard, manage members, and view community impact reports.</p>
              <Button className="bg-primary hover:bg-primary-hover text-white w-full" asChild>
                <Link to="/login">Admin Sign In</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Church className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Register Your Church</h3>
              <p className="text-muted-foreground mb-6">Get started with ChurchConnect and bring your congregation together in new ways.</p>
              <Button className="bg-accent hover:bg-accent/90 text-foreground w-full" asChild>
                <Link to="/register">Register Church</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/50 backdrop-blur-sm border border-accent/20 rounded-2xl p-2">
            <TabsTrigger 
              value="overview" 
              className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-foreground text-lg font-semibold py-4"
            >
              <Church className="w-5 h-5 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-foreground text-lg font-semibold py-4"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="case-studies" 
              className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-foreground text-lg font-semibold py-4"
            >
              <Award className="w-5 h-5 mr-2" />
              Success Stories
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-6">Why Churches Choose ChurchConnect</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how ChurchConnect strengthens church communities and increases member engagement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group text-center p-8">
                <CardHeader className="pb-6">
                  <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <Users className="w-12 h-12 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Increase Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Churches report 300% increase in volunteer participation within the first year.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group text-center p-8">
                <CardHeader className="pb-6">
                  <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <Shield className="w-12 h-12 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Built-in Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Church-verified members and comprehensive safety guidelines protect your community.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group text-center p-8">
                <CardHeader className="pb-6">
                  <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <BarChart3 className="w-12 h-12 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Track Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Detailed analytics help you measure and share your church's community impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group text-center p-8">
                <CardHeader className="pb-6">
                  <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <Settings className="w-12 h-12 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Easy Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Simple admin tools make it easy to manage your church community and volunteer programs.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 lg:p-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-6">Complete Solution for Church Leaders</h3>
                <p className="text-xl text-muted-foreground">Everything you need to launch and manage a thriving community connection program</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Member Verification System</h4>
                      <p className="text-muted-foreground">Ensure only verified church members can access your community platform.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Admin Dashboard</h4>
                      <p className="text-muted-foreground">Monitor activity, manage users, and track community impact from one central location.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Training & Support</h4>
                      <p className="text-muted-foreground">Comprehensive training materials and ongoing support for your staff and volunteers.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Custom Branding</h4>
                      <p className="text-muted-foreground">Customize the platform with your church's branding and messaging.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Impact Reporting</h4>
                      <p className="text-muted-foreground">Generate reports to share with your congregation and leadership about community impact.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Ministry Integration</h4>
                      <p className="text-muted-foreground">Seamlessly integrate with existing ministries and volunteer programs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Church Leader Resources</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to successfully launch and manage ChurchConnect in your community
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {resources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <Card key={resource.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-accent" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-3">{resource.type}</Badge>
                          <CardTitle className="text-xl font-bold mb-2">{resource.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-6">{resource.description}</p>
                      <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download Resource
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Success Stories</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how churches across the country are using ChurchConnect to strengthen their communities
              </p>
            </div>
            
            <div className="space-y-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <Church className="w-8 h-8 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{study.church}</h3>
                            <p className="text-muted-foreground mb-2">{study.location}</p>
                            <Badge variant="secondary">{study.highlight}</Badge>
                          </div>
                        </div>
                        <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                          "{study.testimonial}"
                        </blockquote>
                        <p className="font-semibold text-foreground">— {study.pastor}</p>
                      </div>
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-accent mb-2">{study.members.toLocaleString()}</div>
                          <p className="text-sm text-muted-foreground">Church Members</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-accent mb-2">{study.needsFulfilled}</div>
                          <p className="text-sm text-muted-foreground">Needs Fulfilled</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-accent mb-2">{study.monthsActive}</div>
                          <p className="text-sm text-muted-foreground">Months Active</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="text-center mt-20 animate-fade-in">
          <div className="relative bg-warm-gradient rounded-3xl p-16 lg:p-24 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-5xl lg:text-6xl font-bold mb-8">Ready to Get Started?</h2>
              <p className="text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed">
                Join hundreds of churches already strengthening their communities with ChurchConnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-foreground font-bold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift" 
                  asChild
                >
                  <Link to="/register">Register Your Church</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl rounded-xl" 
                  asChild
                >
                  <Link to="#contact">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}