import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Users, UserCheck, Mail, Settings, Heart, Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GettingStarted() {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Set up your personal information and connect with your church",
      icon: Users,
      details: [
        "Upload a profile photo to help church members recognize you",
        "Add your contact information and preferred communication method",
        "Write a brief introduction about yourself and your interests",
        "Verify your church membership through your pastoral staff"
      ]
    },
    {
      number: 2,
      title: "Complete Church Verification",
      description: "Get verified by your church leadership to start participating",
      icon: UserCheck,
      details: [
        "Submit your membership verification request",
        "Wait for pastoral approval (usually within 24-48 hours)",
        "Check your email for verification confirmation",
        "Complete any additional church-specific requirements"
      ]
    },
    {
      number: 3,
      title: "Explore Community Needs",
      description: "Browse available opportunities to serve in your community",
      icon: Heart,
      details: [
        "Visit the 'Community Needs' page to see current requests",
        "Use filters to find opportunities that match your skills",
        "Read through need descriptions carefully before volunteering",
        "Consider your availability and commitment level"
      ]
    },
    {
      number: 4,
      title: "Start Connecting",
      description: "Begin helping others or posting your own needs",
      icon: MessageSquare,
      details: [
        "Volunteer for needs that align with your abilities",
        "Post your own needs when you require assistance",
        "Communicate clearly and respectfully with church members",
        "Follow up on commitments and maintain good relationships"
      ]
    }
  ];

  const quickTips = [
    {
      title: "Profile Photo Tips",
      description: "Use a clear, friendly photo that helps others recognize you at church"
    },
    {
      title: "Communication Preferences", 
      description: "Set how you prefer to be contacted (email, phone, or in-app messaging)"
    },
    {
      title: "Availability Settings",
      description: "Update your availability regularly to help others know when you can help"
    },
    {
      title: "Privacy Controls",
      description: "Review your privacy settings to control what information is shared"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/help')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Help
          </Button>
        </div>

        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>Getting Started</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Welcome to ChurchConnect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn how to set up your profile and start connecting with your church community in just a few simple steps
          </p>
        </div>

        {/* Main Steps */}
        <section className="mb-16 animate-slide-up">
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="border-0 shadow-card bg-card overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 lg:mb-0">
                          <Icon className="w-8 h-8 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="secondary" className="text-sm">
                            Step {step.number}
                          </Badge>
                          <h3 className="text-2xl font-bold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                          {step.description}
                        </p>
                        <div className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Tips for Success</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {quickTips.map((tip, index) => (
                <Card key={index} className="border-0 shadow-card bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="animate-scale-in">
          <div className="max-w-4xl mx-auto">
            <div className="bg-warm-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
              <div className="relative z-10">
                <Users className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join your church community and start making meaningful connections today
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => navigate('/register')}
                  >
                    Create Account
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}