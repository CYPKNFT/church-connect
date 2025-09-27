import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Heart, Clock, Star, MessageSquare, Users, CheckCircle, Calendar, Phone, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BestPracticesVolunteers() {
  const navigate = useNavigate();

  const practiceCategories = [
    {
      title: "Communication Excellence",
      icon: MessageSquare,
      color: "bg-blue-100 dark:bg-blue-950/20 text-blue-600",
      practices: [
        "Respond to requests within 24 hours whenever possible",
        "Be clear about your availability and any limitations",
        "Ask clarifying questions if the need isn't completely clear",
        "Confirm details before arriving (time, location, what to bring)",
        "Follow up after completing a task to ensure satisfaction"
      ]
    },
    {
      title: "Reliability & Commitment",
      icon: Clock,
      color: "bg-green-100 dark:bg-green-950/20 text-green-600",
      practices: [
        "Only commit to what you can realistically accomplish",
        "Arrive on time or communicate if you're running late",
        "Follow through on all commitments made",
        "If you must cancel, give as much notice as possible",
        "Be prepared with necessary tools or supplies"
      ]
    },
    {
      title: "Building Trust",
      icon: Star,
      color: "bg-yellow-100 dark:bg-yellow-950/20 text-yellow-600",
      practices: [
        "Be respectful of people's homes and personal belongings",
        "Maintain confidentiality about personal situations",
        "Show genuine care and interest in those you help",
        "Be patient and understanding with different personalities",
        "Go above and beyond when reasonably possible"
      ]
    },
    {
      title: "Safety & Boundaries",
      icon: Users,
      color: "bg-purple-100 dark:bg-purple-950/20 text-purple-600",
      practices: [
        "Maintain appropriate personal boundaries",
        "Work in pairs for certain types of assistance when needed",
        "Respect privacy and don't ask unnecessary personal questions",
        "Know your limits and don't attempt tasks beyond your skill level",
        "Report any concerns to church leadership immediately"
      ]
    }
  ];

  const volunteerTips = [
    {
      title: "Before You Volunteer",
      tips: [
        "Read the entire need description carefully",
        "Assess if you have the necessary skills and time",
        "Consider any safety implications",
        "Check if you need to bring specific tools or supplies"
      ]
    },
    {
      title: "During Your Service",
      tips: [
        "Introduce yourself warmly and professionally",
        "Focus on the task at hand while being personable",
        "Ask before moving or handling personal items",
        "Work efficiently while maintaining quality"
      ]
    },
    {
      title: "After Completing Help",
      tips: [
        "Check if there's anything else they need assistance with",
        "Clean up your work area",
        "Exchange contact information if appropriate for future help",
        "Follow up within a few days to ensure everything is working well"
      ]
    }
  ];

  const recognitionProgram = [
    {
      level: "Helper",
      description: "Complete your first 3 volunteer opportunities",
      badge: "🌟",
      benefits: ["Recognition in church newsletter", "Special volunteer badge on profile"]
    },
    {
      level: "Community Champion",
      description: "Complete 10+ volunteer opportunities with high ratings",
      badge: "🏆", 
      benefits: ["Featured volunteer spotlight", "Priority access to special service events"]
    },
    {
      level: "Service Leader",
      description: "Exceptional long-term service and leadership",
      badge: "👑",
      benefits: ["Leadership opportunities", "Help mentor new volunteers"]
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
            <Heart className="w-4 h-4" />
            <span>Excellence in Service</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Best Practices for Volunteers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tips for being an effective and trusted volunteer in your church community
          </p>
        </div>

        {/* Core Practices */}
        <section className="mb-16 animate-slide-up">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Core Volunteer Practices</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {practiceCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="border-0 shadow-card bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {category.practices.map((practice, practiceIndex) => (
                        <div key={practiceIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-foreground text-sm">{practice}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Step-by-Step Tips */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Step-by-Step Volunteer Guide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {volunteerTips.map((section, index) => (
                <Card key={index} className="border-0 shadow-card bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{tip}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Program */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Volunteer Recognition Program</h2>
            <div className="space-y-6">
              {recognitionProgram.map((level, index) => (
                <Card key={index} className="border-0 shadow-card bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{level.badge}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{level.level}</h3>
                        <p className="text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Benefits:</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {level.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-accent" />
                            <span className="text-sm text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-card bg-card">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold text-foreground mb-2">Volunteer Training Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join monthly training sessions to improve your volunteer skills and meet other helpers
                  </p>
                  <Button variant="outline" size="sm">
                    View Schedule
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-card">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold text-foreground mb-2">Volunteer Support Line</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need help or have questions while volunteering? Our support line is available 24/7
                  </p>
                  <Button variant="outline" size="sm">
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="animate-scale-in">
          <div className="max-w-4xl mx-auto">
            <div className="bg-warm-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
              <div className="relative z-10">
                <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Start volunteering today and become a trusted helper in your church community
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => navigate('/browse-needs')}
                  >
                    Browse Volunteer Opportunities
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/volunteering')}
                  >
                    My Volunteer History
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