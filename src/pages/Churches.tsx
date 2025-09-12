import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Church, Users, BookOpen, Shield, BarChart3, Settings, Download, Video, MessageSquare, CheckCircle, Crown, Award } from "lucide-react";

export default function Churches() {

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

  const leadershipStories = [
    {
      id: 1,
      pastor: "Pastor Michael Roberts",
      title: "Senior Pastor",
      church: "Grace Community Church",
      location: "Austin, TX",
      yearsInMinistry: 15,
      testimonial: "As a church leader, ChurchConnect has revolutionized our approach to community ministry. The administrative tools have freed up countless hours, allowing our staff to focus on pastoral care. We've seen unprecedented engagement from our congregation.",
      impact: "300% increase in volunteer participation",
      keyMetric: "240 families served monthly"
    },
    {
      id: 2,
      pastor: "Pastor Sarah Johnson",
      title: "Lead Pastor",
      church: "First Baptist Church", 
      location: "Denver, CO",
      yearsInMinistry: 22,
      testimonial: "From an administrative perspective, ChurchConnect has been transformational. The reporting features help me present clear ministry impact to our board. Our deacon team now has data-driven insights to guide our outreach decisions.",
      impact: "Elder care ministry expanded by 400%",
      keyMetric: "1,200 members actively engaged"
    },
    {
      id: 3,
      pastor: "Rev. David Chen",
      title: "Executive Pastor",
      church: "Community Fellowship",
      location: "Nashville, TN", 
      yearsInMinistry: 18,
      testimonial: "The platform has given our pastoral team visibility into needs we never knew existed in our congregation. The safety features and member verification give us confidence as church leaders that we're maintaining a secure environment.",
      impact: "Strengthened pastoral care reach",
      keyMetric: "180 pastoral visits coordinated"
    },
    {
      id: 4,
      pastor: "Pastor Maria Gonzalez",
      title: "Associate Pastor",
      church: "New Hope Community",
      location: "Phoenix, AZ",
      yearsInMinistry: 12,
      testimonial: "As someone responsible for coordinating our ministries, ChurchConnect has streamlined everything. Our leadership team can now track ministry effectiveness and allocate resources more strategically. The impact reporting helps with our annual planning.",
      impact: "Ministry coordination improved by 250%",
      keyMetric: "500+ ministry touchpoints monthly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
          <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group h-full">
            <CardContent className="p-8 text-center h-full flex flex-col">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Crown className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Church Administrator Login</h3>
              <p className="text-muted-foreground mb-6 flex-grow">Access your church's dashboard, manage members, and view community impact reports.</p>
              <Button className="bg-primary hover:bg-primary-hover text-white w-full" asChild>
                <Link to="/login">Admin Sign In</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group h-full">
            <CardContent className="p-8 text-center h-full flex flex-col">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Church className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Register Your Church</h3>
              <p className="text-muted-foreground mb-6 flex-grow">Get started with ChurchConnect and bring your congregation together in new ways.</p>
              <Button className="bg-accent hover:bg-accent/90 text-foreground w-full" asChild>
                <Link to="/register">Register Church</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Overview Section */}
        <section className="space-y-16 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">Why Churches Choose ChurchConnect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how ChurchConnect strengthens church communities and increases member engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
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
        </section>

        {/* Resources Section */}
        <section className="space-y-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Church Leader Resources</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to successfully launch and manage ChurchConnect in your community
            </p>
          </div>
          
          <ScrollArea className="max-h-[800px] rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 pr-4">
              {resources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <Card key={resource.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
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
          </ScrollArea>
        </section>

        {/* Leadership Stories Section */}
        <section className="space-y-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear directly from pastors and church leaders about how ChurchConnect has transformed their ministry
            </p>
          </div>
          
          <ScrollArea className="max-h-[800px] rounded-3xl">
            <div className="space-y-8 pr-4">
            {leadershipStories.map((story) => (
              <Card key={story.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Church className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{story.pastor}</h3>
                          <p className="text-accent font-medium mb-2">{story.title}</p>
                          <p className="text-muted-foreground mb-2">{story.church}, {story.location}</p>
                          <Badge variant="secondary">{story.yearsInMinistry} years in ministry</Badge>
                        </div>
                      </div>
                      <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                        "{story.testimonial}"
                      </blockquote>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-accent/10 px-3 py-1 rounded-full">{story.impact}</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent mb-2">{story.yearsInMinistry}</div>
                        <p className="text-sm text-muted-foreground">Years in Ministry</p>
                      </div>
                      <div className="text-center border-t pt-4">
                        <p className="text-sm font-medium text-foreground mb-1">Key Achievement</p>
                        <p className="text-sm text-muted-foreground">{story.keyMetric}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </ScrollArea>
        </section>

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