import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, Shield, BarChart3, Settings, Download, Video, MessageSquare, CheckCircle, Crown, Award, HandHeart, Target, TrendingUp } from "lucide-react";

export default function Charities() {

  const resources = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Your step-by-step setup to launch with ease.",
      type: "PDF Guide",
      downloadUrl: "#",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Safety & Trust Best Practices",
      description: "Essential guidance for maintaining a secure environment.",
      type: "PDF Document",
      downloadUrl: "#",
      icon: Shield
    },
    {
      id: 3,
      title: "Leadership Training Video",
      description: "A concise walkthrough for coordinators and team leads.",
      type: "Video",
      downloadUrl: "#",
      icon: Video
    },
    {
      id: 4,
      title: "Monthly Impact Report Template",
      description: "A ready-to-use format for sharing your story of service.",
      type: "Template",
      downloadUrl: "#",
      icon: BarChart3
    }
  ];

  const charityStories = [
    {
      id: 1,
      leader: "Emma Thompson",
      title: "Executive Director",
      organization: "Hope for Tomorrow Foundation",
      location: "Seattle, WA",
      yearsInService: 12,
      testimonial: "ChurchConnect has transformed how we coordinate with our network of volunteers and partner organizations. The unified platform means less time on administration and more time making real impact in our community.",
      impact: "Volunteer engagement up 350%",
      keyMetric: "450 families reached monthly"
    },
    {
      id: 2,
      leader: "Marcus Williams",
      title: "Operations Director",
      organization: "Community Care Alliance", 
      location: "Portland, OR",
      yearsInService: 18,
      testimonial: "The transparency features have strengthened donor relationships significantly. We can now show real-time impact reports that demonstrate exactly how contributions are making a difference.",
      impact: "Donor retention increased 280%",
      keyMetric: "1,800 service hours coordinated"
    },
    {
      id: 3,
      leader: "Sofia Rodriguez",
      title: "Volunteer Coordinator",
      organization: "Hearts United",
      location: "San Diego, CA", 
      yearsInService: 9,
      testimonial: "Managing volunteers used to be overwhelming. Now everything from scheduling to verification is streamlined. Our team can focus on the people we serve instead of paperwork.",
      impact: "Administrative time reduced 60%",
      keyMetric: "320 active volunteers"
    },
    {
      id: 4,
      leader: "James Patterson",
      title: "Founder & CEO",
      organization: "Bridges to Better",
      location: "Chicago, IL",
      yearsInService: 15,
      testimonial: "As a founding partner, we helped shape features that truly meet charity needs. The platform understands the unique challenges we face and provides solutions that actually work in real-world scenarios.",
      impact: "Operations efficiency up 400%",
      keyMetric: "850+ community partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 flex flex-col gap-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 text-emerald-600 dark:text-emerald-400 font-medium mb-8">
            <Heart className="w-5 h-5" />
            <span>ChurchConnect for Charities</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Empower Every<br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Act of Goodness</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A new way for charities to organize, mobilize, and grow their impact — all in one beautiful, secure platform. Built for those who turn compassion into action.
          </p>
        </div>

        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            The Vision
          </h2>
          <h3 className="text-3xl font-semibold text-foreground mb-6">
            Less Management. More Mission.
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ChurchConnect was designed to free charities from paperwork and fragmented tools. We believe good people deserve great systems — ones that simplify operations so more energy can go toward what truly matters: changing lives.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">For Charity Leaders</h2>
            <p className="text-xl text-muted-foreground">Lead with Clarity and Confidence</p>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Manage your volunteers, donations, and outreach effortlessly. Stay organized. Stay connected. Stay focused on your purpose.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group h-full">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <Crown className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Admin Sign In</h3>
                <p className="text-muted-foreground mb-6 flex-grow">Access your charity's dashboard, manage volunteers, and track impact reports.</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white w-full" asChild>
                  <Link to="/login">Admin Sign In</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group h-full">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <Heart className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Register Your Charity</h3>
                <p className="text-muted-foreground mb-6 flex-grow">Get started with ChurchConnect and transform how your organization serves.</p>
                <Button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white w-full" asChild>
                  <Link to="/register">Register Your Charity</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Charities Choose Section */}
        <section className="space-y-16 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">Why Charities Choose ChurchConnect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how ChurchConnect empowers charitable organizations to maximize their impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group text-center h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                  <Target className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Unified Platform</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  All your operations — volunteers, donors, events — organized in one clean dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group text-center h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Built on Trust</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Verified volunteers, secure data handling, and transparent permissions at every level.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group text-center h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                  <Users className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Effortless Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Keep your team and partners aligned with real-time updates and communication tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group text-center h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Impact Visibility</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  See progress at a glance. Share your mission story through intuitive reports and visuals.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Complete Tools Section */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-12 lg:p-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Complete Tools for Charitable Organizations</h3>
              <p className="text-xl text-muted-foreground">Everything you need to organize, mobilize, and amplify your impact</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Volunteer Management</h4>
                    <p className="text-muted-foreground">Organize schedules, verify participants, and keep service opportunities filled.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Donation Oversight</h4>
                    <p className="text-muted-foreground">Track resources, ensure transparency, and celebrate generosity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Admin Dashboard</h4>
                    <p className="text-muted-foreground">Everything you need — centralized, simple, and secure.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Custom Branding</h4>
                    <p className="text-muted-foreground">Bring your identity forward with your charity's colors, logo, and message.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Training & Support</h4>
                    <p className="text-muted-foreground">Clear guides and onboarding help your team start strong and stay aligned.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Partnership Integration</h4>
                    <p className="text-muted-foreground">Collaborate with local churches, nonprofits, and community initiatives effortlessly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Built on Integrity Section */}
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Built on Integrity</h2>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Safety. Transparency. Accountability.</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every feature is designed with responsibility in mind. From encrypted donation data to volunteer verification, your organization and supporters are protected by enterprise-grade standards.
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="space-y-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Resources for Charities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to successfully launch and grow your impact
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 px-2">
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card key={resource.id} className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group relative h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-3">{resource.type}</Badge>
                        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{resource.description}</p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Founding Partner CTA */}
        <section className="mb-20">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm">
            <CardContent className="p-12 lg:p-16 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Become a Founding Partner</h2>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Shape the Future of Charitable Technology</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                We're inviting select organizations to join our early access program. Founding partners receive personalized onboarding, early feature access, and a voice in the evolution of the platform.
              </p>
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift"
                asChild
              >
                <Link to="/contact">Join as a Founding Partner</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Charity Stories Section */}
        <section className="space-y-8 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shared Purpose, Diverse Missions</h2>
            <h3 className="text-2xl font-semibold text-foreground mb-6">United by Compassion</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From small community groups to national organizations — every mission belongs here. Together, we're creating a network that empowers people to help people.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 px-2">
            {charityStories.map((story) => (
              <Card key={story.id} className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="grid lg:grid-cols-3 gap-8 items-center h-full">
                    <div className="lg:col-span-2">
                      <h4 className="text-xl font-bold text-foreground mb-2">{story.leader}, {story.title}</h4>
                      <div className="text-muted-foreground mb-2">{story.organization} — {story.location}</div>
                      <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                        "{story.testimonial}"
                      </blockquote>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-emerald-500/10 px-3 py-1 rounded-full">{story.impact}</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{story.yearsInService}</div>
                        <p className="text-sm text-muted-foreground">Years in Service</p>
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

        {/* Final CTA Section */}
        <section className="text-center mt-20 animate-fade-in">
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-16 lg:p-24 text-foreground overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Stay Connected</h2>
              <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
                Sign up for early updates, launch news, and partnership opportunities. Because the future of charity deserves better tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift" 
                  asChild
                >
                  <Link to="/register">Launch Your Charity</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-border text-foreground hover:bg-emerald-500/10 hover:border-emerald-500 px-12 py-6 text-xl rounded-xl transition-all duration-200 hover-lift" 
                  asChild
                >
                  <Link to="/contact">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Subscribe for Updates
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

