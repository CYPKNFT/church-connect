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
      <div className="container mx-auto px-4 py-24 flex flex-col gap-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-8">
            <Church className="w-5 h-5" />
            <span>For Church Leaders</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Empower Your<br />
            <span className="bg-accent-gradient bg-clip-text text-transparent">Church Community</span>
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
            {/* Increase Engagement - Strong Community style (blue) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-blue-500/20">
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Increase Engagement</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  Churches report 300% increase in volunteer participation within the first year.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Built-in Safety - Trust & Safety style (green) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-green-500/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-green-500/20">
                  <Shield className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Built-in Safety</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  Church-verified members and comprehensive safety guidelines protect your community.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Track Impact - Purposeful Service style (purple) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-purple-500/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-purple-500/20">
                  <BarChart3 className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Track Impact</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  Detailed analytics help you measure and share your church's community impact.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Easy Management - Love in Action style (accent) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-accent/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-accent/20">
                  <Settings className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Easy Management</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  Simple admin tools make it easy to manage your church community and volunteer programs.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
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
          <div className="grid md:grid-cols-2 gap-8 px-2">
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card key={resource.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group relative h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-3">{resource.type}</Badge>
                        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{resource.description}</p>
                    <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Leadership Stories Section */}
  <section className="space-y-8 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear directly from pastors and church leaders about how ChurchConnect has transformed their ministry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 px-2">
            {leadershipStories.map((story) => (
              <Card key={story.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="grid lg:grid-cols-3 gap-8 items-center h-full">
                    <div className="lg:col-span-2">
                      <h4 className="text-xl font-bold text-foreground mb-2">{story.pastor}, {story.title}</h4>
                      <div className="text-muted-foreground mb-2">{story.church} &mdash; {story.location}</div>
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
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20 animate-fade-in">
          <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-16 lg:p-24 text-foreground overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl lg:text-6xl font-bold mb-8">Ready to Get Started?</h2>
              <p className="text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed">
                Join hundreds of churches already strengthening their communities with ChurchConnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift" 
                  asChild
                >
                  <Link to="/register">Register Your Church</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent px-12 py-6 text-xl rounded-xl transition-all duration-200 hover-lift" 
                  asChild
                >
                  <Link to="/contact">
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